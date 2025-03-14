import { createDiv, home, removeAllEventListeners, showVocabulary, training } from "..";

export class AddVocabulary {
    container: HTMLDivElement;
    iconPlaceholder: HTMLDivElement;
    navbar: HTMLDivElement;
    buttonLeft: HTMLButtonElement
    buttonRight: HTMLButtonElement;
    homeButton: HTMLButtonElement;

    vocabulary: WordBundle[] = [];
    wordIndex = 0;
    database: IDBDatabase;

    enterMode = false;
    commandMode = false;
    command = '';
    padding: [number, number, number, number] = [undefined, undefined, undefined, undefined]

    inputIndex = 0;
    keys = 0;
    selectedInput: HTMLDivElement;
    currentWord: WordBundle = {
        latinWord: '',
        inflections: '',
        germanTranslation: '',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    }

    keyDownFunction: EventListenerOrEventListenerObject;
    maxCharacters: number;
    buttonLeftFunction: (_: any) => void;
    buttonRightFunction: (_: any) => void;
    timeout: number;

    constructor() {
        const request = window.indexedDB.open('Vocabulary', 1);

        request.addEventListener('error', _ => {
            console.error('There is an error. Have fun fixing it. Details:' + request.error);
        })

        request.addEventListener('success', _ => {
            this.database = request.result;

            const transaction = this.database.transaction('vocabulary', 'readonly');
            transaction.onerror = _ => console.error(transaction.error);
            const objectStore = transaction.objectStore('vocabulary');
            const req = objectStore.getAll();
            req.onerror = _ => console.error(req.error);
            req.onsuccess = _ => {
                this.vocabulary = req.result;
                this.wordIndex = this.vocabulary.length;
            }
        })

        request.addEventListener('upgradeneeded', (event: IDBVersionChangeEvent) => {
            const db = request.result;
            const objectStore = db.createObjectStore(`vocabulary`, { autoIncrement: true });
            objectStore.createIndex("latinWord", "latinWord", { unique: false });
            objectStore.createIndex("inflections", "inflections", { unique: false });
            objectStore.createIndex("germanTranslation", "germanTranslation", { unique: false });
            objectStore.createIndex("relatedForeignWords", "relatedForeignWords", { unique: false });
            objectStore.createIndex("selected", "selected", { unique: false });
            objectStore.createIndex("probability", "probability", { unique: false });
            const objectStore2 = db.createObjectStore(`inflected vocabulary`, { autoIncrement: true });
            objectStore2.createIndex("singular", "singular", { unique: false });
            objectStore2.createIndex("plural", "plural", { unique: false });
            objectStore2.createIndex("verb", "verb", { unique: false });
            objectStore2.createIndex("probability", "probability", { unique: false });
            this.database = request.result;
        })

        const notImportantRequest_____yet = window.indexedDB.open('player data', 1);

        notImportantRequest_____yet.addEventListener('upgradeneeded', (event) => {
            const db = notImportantRequest_____yet.result;
            if (!db.objectStoreNames.contains('versions played')) {
                db.createObjectStore('versions played', { autoIncrement: true });
            }

            notImportantRequest_____yet.addEventListener('success', (event) => {
                const db = notImportantRequest_____yet.result;
                const transaction = db.transaction('versions played', 'readwrite');
                const objectStore = transaction.objectStore('versions played');
                objectStore.add('Beta');

                transaction.oncomplete = () => {
                    console.log('Data added successfully');
                };

                transaction.onerror = (event) => {
                    console.error('Transaction error:', notImportantRequest_____yet.error);
                };
            });

            notImportantRequest_____yet.addEventListener('error', (event) => {
                console.error('Database error:', notImportantRequest_____yet.error);
            });
        });

    }

    modifyDocument(): void {
        const request = window.indexedDB.open('Vocabulary', 1);

        request.addEventListener('error', _ => {
            console.error('There is an error. Have fun fixing it. Details:' + request.error);
        })

        request.addEventListener('success', _ => {
            this.database = request.result;

            const transaction = this.database.transaction('vocabulary', 'readonly');
            transaction.onerror = _ => console.error(transaction.error);
            const objectStore = transaction.objectStore('vocabulary');
            const req = objectStore.getAll();
            req.onerror = _ => console.error(req.error);
            req.onsuccess = _ => {
                this.vocabulary = req.result;
                this.wordIndex = this.vocabulary.length;

                this.container = document.querySelector('#container');
                this.iconPlaceholder = document.querySelector('#icon-placeholder');
                this.navbar = document.querySelector('#navbar');

                this.container.style.padding = '0';
                document.body.style.backgroundImage = 'none';

                document.body.setAttribute('class', '');
                this.container.setAttribute('class', '');
                this.iconPlaceholder.setAttribute('class', '');
                this.navbar.setAttribute('class', '');

                this.container.innerHTML = '';
                this.iconPlaceholder.innerHTML = '';
                this.navbar.innerHTML = '';

                document.querySelector('body').classList.add('addVocabularyBody');

                this.iconPlaceholder.classList.add('addVocabularyIconPlaceholder');
                let addVocabularyIcon = document.createElement('object');
                addVocabularyIcon.data = './add_vocabulary.svg';
                addVocabularyIcon.id = 'addVocabularyIcon';
                this.iconPlaceholder.insertAdjacentElement('beforeend', addVocabularyIcon);

                this.container.classList.add('addVocabularyContainer');

                for (let i = 0; i < 4; i++) {
                    let div = createDiv(`div${i}`, 'addVocabularyInput');
                    this.container.appendChild(div);
                    this.padding[i] = 0.05 * div.offsetHeight;
                    div.style.padding = `${0.05 * div.offsetHeight}px 0.5vw`;
                }

                this.navbar.classList.add('addVocabularyNavbar');

                this.buttonLeft = document.createElement('button');
                this.buttonLeft.classList.add('navButton');
                this.buttonLeft.innerHTML = '<';
                this.navbar.appendChild(this.buttonLeft);

                this.homeButton = document.createElement('button');
                this.homeButton.classList.add('navButton');
                let icon = document.createElement('object');
                icon.classList.add('homeIcon');
                icon.data = './home.svg';
                icon.style.height = '9vh';
                icon.addEventListener('load', _ => {
                    icon.contentDocument.addEventListener('click', _ => {
                        removeAllEventListeners();
                        home.modifyDocument();
                    })
                })
                this.homeButton.insertAdjacentElement('beforeend', icon);
                this.navbar.appendChild(this.homeButton);

                this.buttonRight = document.createElement('button');
                this.buttonRight.classList.add('navButton');
                this.buttonRight.innerHTML = '>';
                this.navbar.appendChild(this.buttonRight);

                this.type();
            }
        })

    }

    type(): void {
        for (let i = 0; i < this.container.childElementCount; i++) {
            this.container.children[i].addEventListener('click', _ => {
                this.inputIndex = i;
                this.changeSelectedInput();
                this.enterMode = false;
            });
        };

        this.container.children[this.inputIndex].classList.add('selected');
        this.selectedInput = <HTMLDivElement>this.container.children[this.inputIndex];
        this.changeSelectedInput();

        this.homeButton.addEventListener('click', _ => {
            removeAllEventListeners();
            home.modifyDocument();
        });

        this.buttonLeft.addEventListener('mousedown', _ => {
            for (let i = 0; i < this.container.childElementCount; i++) {
                this.container.children[i].classList.add('shadow');
                this.buttonLeft.classList.add('clicked');
            }
        })

        this.buttonRight.addEventListener('mousedown', _ => {
            for (let i = 0; i < this.container.childElementCount; i++) {
                this.container.children[i].classList.add('shadow');
                this.buttonRight.classList.add('clicked');
            }
        })

        this.buttonLeft.addEventListener('mouseout', _ => {
            for (let i = 0; i < this.container.childElementCount; i++) {
                this.container.children[i].classList.remove('shadow');
                this.buttonLeft.classList.remove('clicked');
            }
        })

        this.buttonRight.addEventListener('mouseout', _ => {
            for (let i = 0; i < this.container.childElementCount; i++) {
                this.container.children[i].classList.remove('shadow');
                this.buttonRight.classList.remove('clicked');
            }
        });

        this.buttonLeftFunction = _ => {
            if (this.vocabulary[this.wordIndex - 1]) {
                if (
                    Object.values(this.currentWord).filter((value) => value === '').length === 4
                    && this.wordIndex === this.vocabulary.length
                ) {
                    for (let i = 0; i < this.container.childElementCount; i++) {
                        this.container.children[i].classList.remove('shadow');
                    }

                    this.wordIndex--;
                    this.currentWord = this.vocabulary[this.wordIndex];

                    for (let i = 0; i < this.container.childElementCount; i++) {
                        let value = Object.values(this.currentWord)[i];
                        this.container.children[i].innerHTML = '';
                        for (let ii = 0; ii < value.length; ii++) {
                            let object = document.createElement('object');
                            object.data = './keys/OG_T.svg';
                            object.id = `key${ii}-inp${i}`;
                            object.style.height = `100%`;
                            this.container.children[i].insertAdjacentElement('beforeend', object);

                            object.addEventListener('load', _ => {
                                let svg = object.contentDocument;
                                svg.querySelector('#tspan7').innerHTML = value.charAt(ii);
                            })
                        }
                    }
                } else {
                    this.vocabulary[this.wordIndex] = this.currentWord;

                    const transaction = this.database.transaction(`vocabulary`, 'readwrite');
                    transaction.onerror = _ => console.error(transaction.error);
                    const objectStore = transaction.objectStore(`vocabulary`);
                    const req = objectStore.get(this.wordIndex);
                    req.onerror = _ => console.error(req.error);
                    req.onsuccess = _ => {
                        for (let i = 0; i < this.container.childElementCount; i++) {
                            this.container.children[i].classList.remove('shadow');
                        }

                        const idontcare = objectStore.put(this.currentWord, this.wordIndex + 1);
                        idontcare.onerror = _ => console.error(idontcare.error);

                        this.wordIndex--;

                        this.currentWord = this.vocabulary[this.wordIndex];
                        for (let i = 0; i < this.container.childElementCount; i++) {
                            let value = Object.values(this.currentWord)[i];
                            this.container.children[i].innerHTML = '';
                            for (let ii = 0; ii < value.length; ii++) {
                                let object = document.createElement('object');
                                object.data = './keys/OG_T.svg';
                                object.id = `key${ii}-inp${i}`;
                                object.style.height = `100%`;
                                this.container.children[i].insertAdjacentElement('beforeend', object);

                                object.addEventListener('load', _ => {
                                    let svg = object.contentDocument;
                                    svg.querySelector('#tspan7').innerHTML = value.charAt(ii);
                                })
                            }
                        }
                    }
                }
            }
        };
        this.buttonLeft.addEventListener('mouseup', this.buttonLeftFunction);

        this.buttonRightFunction = _ => {
            this.buttonRight.classList.remove('clicked');
            if (!this.vocabulary[this.wordIndex + 1]) {
                this.vocabulary[this.wordIndex] = this.currentWord;

                const transaction = this.database.transaction(`vocabulary`, 'readwrite');
                transaction.onerror = _ => console.error(transaction.error);
                const objectStore = transaction.objectStore(`vocabulary`);
                const req = objectStore.put(this.currentWord, this.wordIndex + 1);
                req.onerror = _ => console.error(req.error)
                transaction.oncomplete = _ => {
                    for (let i = 0; i < this.container.childElementCount; i++) {
                        this.container.children[i].classList.remove('shadow');
                    }

                    this.wordIndex++;
                    this.keys = 0;
                    this.currentWord = {
                        latinWord: '',
                        inflections: '',
                        germanTranslation: '',
                        relatedForeignWords: '',
                        selected: true,
                        probability: 1
                    };

                    for (let i = 0; i < this.container.childElementCount; i++) {
                        this.container.children[i].innerHTML = '';

                        this.inputIndex = 0;
                        this.selectedInput = <HTMLDivElement>this.container.children[0];
                        this.selectedInput.classList.add('selected');
                        if (i != 0) {
                            let div = <HTMLDivElement>this.container.children[i];
                            div.classList.remove('selected');
                            div.style.padding = `${this.padding[i]}px 0.5vw`;
                        }
                    }
                }
            } else {
                this.vocabulary[this.wordIndex] = this.currentWord;

                for (let i = 0; i < this.container.childElementCount; i++) {
                    this.container.children[i].classList.remove('shadow');
                }

                const transaction = this.database.transaction(`vocabulary`, 'readwrite');
                transaction.onerror = _ => console.error(transaction.error);
                const objectStore = transaction.objectStore(`vocabulary`);
                const req = objectStore.get(this.wordIndex);
                req.onerror = _ => console.error(req.error);
                req.onsuccess = _ => {
                    const idontcare = objectStore.put(this.currentWord, this.wordIndex + 1);
                    idontcare.onerror = _ => console.error(idontcare.error);

                    this.wordIndex++;
                    this.currentWord = this.vocabulary[this.wordIndex];

                    for (let i = 0; i < this.container.childElementCount; i++) {
                        let value = Object.values(this.currentWord)[i];
                        this.container.children[i].innerHTML = '';
                        for (let ii = 0; ii < value.length; ii++) {
                            let object = document.createElement('object');
                            object.data = './keys/OG_T.svg';
                            object.id = `key${ii}-inp${i}`;
                            object.style.height = `100%`;
                            this.container.children[i].insertAdjacentElement('beforeend', object);

                            object.addEventListener('load', _ => {
                                let svg = object.contentDocument;
                                svg.querySelector('#tspan7').innerHTML = value.charAt(ii);
                            })
                        }
                    }
                }
            }
        };

        this.buttonRight.addEventListener('mouseup', this.buttonRightFunction);

        this.keyDownFunction = (event: KeyboardEvent) => {
            let forbiddenCharacters = ['´', '`', '^'];
            if (this.commandMode) {
                if (event.key === 'Enter') {
                    if (this.command.endsWith('%')) {
                        if (this.command.startsWith('#p-')) {
                            let percentage = parseInt(this.command.slice(3, this.command.length - 1));
                            if (percentage >= 0 && percentage <= 100) {
                                this.padding[this.inputIndex] = Math.round(Math.max(Math.min(this.padding[this.inputIndex] * (1 - percentage / 100), this.selectedInput.clientHeight / 2 * 0.85), 1));
                                this.paddingAnimation(this.selectedInput);
                                this.command.split('').forEach(_ => {
                                    this.selectedInput.lastElementChild.remove();
                                    this.keys--;
                                });

                                this.command = '';
                                this.commandMode = false;
                                return;
                            }
                        } else if (this.command.startsWith('#p+')) {
                            let percentage = parseInt(this.command.slice(3, this.command.length - 1));
                            if (percentage >= 0) {
                                this.padding[this.inputIndex] = Math.round(Math.max(Math.min(this.padding[this.inputIndex] * (1 + percentage / 100), this.selectedInput.clientHeight / 2 * 0.85), 1));
                                this.paddingAnimation(this.selectedInput);
                                this.command.split('').forEach(_ => {
                                    this.selectedInput.lastElementChild.remove();
                                    this.keys--;
                                });
                                this.command = '';
                                this.commandMode = false;
                                return;
                            }
                        }
                    }

                    switch (this.command) {
                        case '#<':
                        case '#<-':
                        case '#previous':
                        case '#prvs':
                        case '#vorheriges':
                        case '#voriges':
                        case '#Vorheriges':
                        case '#Voriges':
                        case '#Previous':
                        case '#Prev':
                        case '#prev':
                            this.command = '';
                            this.commandMode = false;
                            this.buttonLeftFunction(event);
                            return;
                        case '#>':
                        case '#->':
                        case '#next':
                        case '#nxt':
                        case '#nächstes':
                        case '#Nächstes':
                        case '#Next':
                        case '#Nxt':
                            this.command = '';
                            this.commandMode = false;
                            this.buttonRightFunction(event);
                            return;
                        case '#exit':
                        case '#quit':
                        case '#stop':
                        case '#home':
                        case '#stopp':
                        case '#beenden':
                        case '#Stopp':
                        case '#hauptmenü':
                        case '#Hauptmenü':
                        case '#home menu':
                        case '#h':
                            this.command = '';
                            this.commandMode = false;
                            removeAllEventListeners();
                            home.modifyDocument();
                            return;
                        default: {
                            this.command.split('').forEach(_ => {
                                this.selectedInput.lastElementChild.remove();
                                this.keys--;
                            });
                        }
                    }

                    this.command = '';
                    this.commandMode = false;
                    return;
                } else if (event.key === 'ArrowUp') {
                    this.command.split('').forEach(_ => {
                        this.selectedInput.lastElementChild.remove();
                        this.keys--;
                    });

                    this.command = '';
                    this.commandMode = false;

                    if (this.inputIndex > 0) {
                        this.inputIndex--;
                        this.selectedInput.classList.remove('selected');
                        this.selectedInput.style.padding = `${this.padding[this.inputIndex]}px 0.5vw`;
                        this.selectedInput = <HTMLDivElement>this.container.children[this.inputIndex];
                        this.keys = this.selectedInput.childElementCount;
                    }
                    this.selectedInput.classList.add('selected');
                    return;
                } else if (event.key === 'ArrowDown') {
                    this.command.split('').forEach(_ => {
                        this.selectedInput.lastElementChild.remove();
                        this.keys--;
                    });

                    this.command = '';
                    this.commandMode = false;

                    if (this.inputIndex + 1 < 4) {
                        this.inputIndex++;
                        this.selectedInput.classList.remove('selected');
                        this.selectedInput.style.padding = `${this.padding[this.inputIndex]}px 0.5vw`;
                        this.selectedInput = <HTMLDivElement>this.container.children[this.inputIndex];
                        this.keys = this.selectedInput.childElementCount;
                    }
                    this.selectedInput.classList.add('selected');
                    return;
                } else if (event.key === 'Backspace') {
                    if (this.selectedInput.lastElementChild) {
                        this.selectedInput.lastElementChild.remove();
                        this.command = this.command.slice(0, this.command.length - 1);
                        this.keys--;

                        if (this.command === '') {
                            this.commandMode = false;
                        }
                    }
                    return;
                }

                if (
                    this.commandMode && (
                        forbiddenCharacters.includes(event.key) ||
                        event.key.length > 1
                    )
                ) {
                    return;
                }
            }
            
            if (!this.commandMode) {
                if (event.key === 'Backspace') {
                    if (this.selectedInput.lastElementChild) {
                        this.selectedInput.lastElementChild.remove();

                        Object.defineProperty(
                            this.currentWord,
                            Object.keys(this.currentWord)[this.inputIndex],
                            { value: Object.values(this.currentWord)[this.inputIndex].slice(0, this.keys - 1) }
                        );

                        this.keys--;
                    }
                    return;
                } else if (event.key === 'Enter' || event.key === 'ArrowDown') {
                    if (this.inputIndex + 1 < 4) {
                        this.inputIndex++;
                        this.changeSelectedInput();
                    } else {
                        for (let i = 0; i < this.container.childElementCount; i++) {
                            this.container.children[i].classList.add('shadow');
                        }

                        if (this.enterMode) {
                            this.buttonRight.classList.remove('clicked');
                            if (!this.vocabulary[this.wordIndex + 1]) {
                                this.vocabulary[this.wordIndex] = this.currentWord;

                                const transaction = this.database.transaction(`vocabulary`, 'readwrite');
                                transaction.onerror = _ => console.error(transaction.error);
                                const objectStore = transaction.objectStore(`vocabulary`);
                                const req = objectStore.put(this.currentWord, this.wordIndex + 1);
                                req.onerror = _ => console.error(req.error)
                                transaction.oncomplete = _ => {
                                    for (let i = 0; i < this.container.childElementCount; i++) {
                                        this.container.children[i].classList.remove('shadow');
                                    }

                                    this.wordIndex++;
                                    this.keys = 0;
                                    this.currentWord = {
                                        latinWord: '',
                                        inflections: '',
                                        germanTranslation: '',
                                        relatedForeignWords: '',
                                        selected: true,
                                        probability: 1
                                    };

                                    for (let i = 0; i < this.container.childElementCount; i++) {
                                        this.container.children[i].innerHTML = '';

                                        this.inputIndex = 0;
                                        this.selectedInput = <HTMLDivElement>this.container.children[0];
                                        this.selectedInput.classList.add('selected');
                                        if (i != 0) {
                                            let div = <HTMLDivElement>this.container.children[i];
                                            div.classList.remove('selected');
                                            div.style.padding = `${this.padding[i]}px 0.5vw`;
                                        };
                                    }
                                }
                            } else {
                                this.vocabulary[this.wordIndex] = this.currentWord;

                                for (let i = 0; i < this.container.childElementCount; i++) {
                                    this.container.children[i].classList.remove('shadow');
                                }

                                const transaction = this.database.transaction(`vocabulary`, 'readwrite');
                                transaction.onerror = _ => console.error(transaction.error);
                                const objectStore = transaction.objectStore(`vocabulary`);
                                const req = objectStore.get(this.wordIndex);
                                req.onerror = _ => console.error(req.error);
                                req.onsuccess = _ => {
                                    const idontcare = objectStore.put(this.currentWord, this.wordIndex + 1);
                                    idontcare.onerror = _ => console.error(idontcare.error);

                                    this.wordIndex++;
                                    this.currentWord = this.vocabulary[this.wordIndex];

                                    for (let i = 0; i < this.container.childElementCount; i++) {
                                        let value = Object.values(this.currentWord)[i];
                                        this.container.children[i].innerHTML = '';
                                        for (let ii = 0; ii < value.length; ii++) {
                                            let object = document.createElement('object');
                                            object.data = './keys/OG_T.svg';
                                            object.id = `key${ii}-inp${i}`;
                                            object.style.height = `100%`;
                                            this.container.children[i].insertAdjacentElement('beforeend', object);

                                            object.addEventListener('load', _ => {
                                                let svg = object.contentDocument;
                                                svg.querySelector('#tspan7').innerHTML = value.charAt(ii);
                                            })
                                        }
                                    }
                                }
                            }
                            this.enterMode = false;
                        } else {
                            this.enterMode = true;
                        }

                        const transaction = this.database.transaction(`vocabulary`, 'readwrite');
                        transaction.onerror = _ => console.error(transaction.error);
                        const objectStore = transaction.objectStore(`vocabulary`);
                        const req = objectStore.put(this.currentWord, this.wordIndex + 1);
                        req.onerror = _ => console.error(req.error);

                        setTimeout(_ => {
                            for (let i = 0; i < this.container.childElementCount; i++) {
                                this.container.children[i].classList.remove('shadow');
                            }
                        }, 250);
                    }

                    return;
                } else if (event.key === 'ArrowUp') {
                    if (this.inputIndex > 0) this.inputIndex--;
                    this.changeSelectedInput();
                    this.enterMode = false;
                    return;
                } else if (event.key === '#') {
                    this.command = '';
                    this.commandMode = true;
                } else if (forbiddenCharacters.includes(event.key) || event.key.length > 1) {
                    return;
                }
            }

            let object = document.createElement('object');
            object.data = './keys/OG_T.svg';
            object.id = `key${this.keys}-inp${this.inputIndex}`;
            object.style.height = `100%`;
            this.selectedInput.insertAdjacentElement('beforeend', object);
            let width = object.clientHeight;
            object.hidden = true;

            object.addEventListener('load', _ => {
                if (this.keys >= Math.floor(window.innerWidth / width)) {
                    object.remove();
                    for (let i = 0; i < this.keys; i++) {
                        this.failureAnimation(<HTMLObjectElement>this.selectedInput.children[i]);
                    }
                    return;
                }
                object.hidden = false;

                let svg = object.contentDocument;
                if (event.key === '<') {
                    svg.querySelector('#tspan7').innerHTML = '&lt;';
                } else if (event.key === '&') {
                    svg.querySelector('#tspan7').innerHTML = '&amp;';
                } else {
                    svg.querySelector('#tspan7').innerHTML = event.key.charAt(0);
                }

                if (!this.commandMode) {
                    Object.defineProperty(
                        this.currentWord,
                        Object.keys(this.currentWord)[this.inputIndex],
                        { value: Object.values(this.currentWord)[this.inputIndex] + event.key.charAt(0) }
                    );
                    this.idleAnimation(object);
                } else {
                    this.command += event.key;
                    training.commandAnimation(object);
                }

                this.keys++;
            });
        }

        document.addEventListener('keydown', this.keyDownFunction);

    }

    changeSelectedInput(): void {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        document.querySelectorAll('.selected').forEach((elem: HTMLDivElement) => {
            elem.classList.remove('selected');
            elem.style.padding = `${this.padding[parseInt(elem.id.charAt(3))]}px 0.5vw`;
            elem.style.border = 'none';
            elem.style.transition = 'none';
        });
        this.selectedInput = <HTMLDivElement>this.container.children[this.inputIndex];
        this.selectedInput.classList.add('selected');
        this.keys = this.selectedInput.childElementCount;
        this.selectedInput.style.padding = `${this.padding[this.inputIndex]}px 0.25vw`;
        this.paddingAnimation(this.selectedInput);
    }

    failureAnimation(object: HTMLObjectElement): void {
        if (!object) {
            return;
        }
        let svg = object.contentDocument;
        let rect = svg.querySelector('#mainRect');
        let text = svg.querySelector('#text7');
        let animationKeyframes: Keyframe[] = [
            { stroke: "rgb(186, 2, 70)", offset: 0.025 },

            { rotate: "10deg z", offset: 0.25 },

            { rotate: "0deg z", offset: 0.5 },

            { rotate: "-10deg z", offset: 0.75, stroke: "rgb(186, 2, 70)" },

            { stroke: "#eeeeeeff", offset: 0.925 },

            { rotate: "0deg z", offset: 1 }
        ];

        let animationOptions: KeyframeAnimationOptions = {
            duration: 500
        }

        rect.animate(animationKeyframes, animationOptions);
        text.animate(animationKeyframes, animationOptions);
    }

    idleAnimation(object: HTMLObjectElement): void {
        let svg = object.contentDocument;
        let rect = svg.querySelector('#mainRect');
        let text = svg.querySelector('#text7');
        let animationKeyframes: PropertyIndexedKeyframes = {
            stroke: ['#8f8f8f', '#fff', '#eeeeeeff'],
            offset: [0, 1]
        }

        let animationOptions: KeyframeAnimationOptions = {
            duration: 250
        }

        rect.animate(animationKeyframes, animationOptions);
        text.animate(animationKeyframes, animationOptions);
    }

    paddingAnimation(input: HTMLDivElement): void {
        let id = parseInt(input.id.charAt(3));
        let marginLeft = parseInt(window.getComputedStyle(input).marginLeft.slice(0, -2));
        let borderLeft = 0.005 * input.offsetWidth - marginLeft;

        input.style.padding = '0';
        input.style.willChange = 'border-width';
        input.style.borderTopWidth = `calc(${this.padding[id]}px)`;
        input.style.borderRightWidth = `${borderLeft}px`;
        input.style.borderBottomWidth = `calc(${this.padding[id]}px)`;
        input.style.borderLeftWidth = `${borderLeft}px`;
        input.style.borderStyle = 'solid';
        input.style.borderColor = '#12dada';
        input.style.transition = 'none';
        input.style.paddingLeft = 0.005 * window.innerWidth - (parseInt(window.getComputedStyle(input).marginLeft.slice(0, -2)) + parseFloat(window.getComputedStyle(input).borderLeftWidth.slice(0, -2))) + 'px';


        setTimeout(_ => {
            input.style.borderColor = '#06011b';
            input.style.transition = 'none';
            input.style.transition = "border-color 1.5s";

            this.timeout = setTimeout(_ => {
                if (input.classList.contains('selected')) {
                    input.style.padding = `${this.padding[id]}px 0.25vw`;
                } else {
                    input.style.padding = `${this.padding[id]}px 0.5vw`;
                }

                input.style.border = 'none';
            }, 1500)
        }, 1);
    }
}

export interface WordBundle {
    latinWord: string;
    inflections: string;
    germanTranslation: string;
    relatedForeignWords: string;
    selected: boolean;
    probability: number;
}