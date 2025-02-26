import { createDiv, home, removeAllEventListeners, training } from "..";

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

    keyDownFunction: EventListenerOrEventListenerObject;
    maxCharacters: number;
    buttonLeftFunction: (_: any) => void;
    buttonRightFunction: (_: any) => void;

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

                let classes = 'inp bg inp bg inp bg inp'.split(' ');
                for (let i = 0; i < classes.length; i++) {
                    let div = createDiv(`div${i}`, `${classes[i]}`, `100%`, `${100 / classes.length}%`);
                    this.container.appendChild(div);
                    div.style.padding = `${0.05 * div.offsetHeight}px`;
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
        let inputs = [0, 2, 4, 6];
        let inputIndex = 0;
        let keys = 0;
        let selectedInput: HTMLDivElement;
        let currentWord: WordBundle = {
            latinWord: '',
            inflections: '',
            germanTranslation: '',
            relatedForeignWords: '',
            selected: true,
            probability: 1
        }

        for (let i = 0; i < this.container.childElementCount; i += 2) {
            this.container.children[i].addEventListener('click', _ => {
                for (let ii = 0; ii < this.container.childElementCount; ii += 2) {
                    if (this.container.children[ii] === this.container.children[i]) {
                        inputIndex = ii / 2;
                        selectedInput = <HTMLDivElement>this.container.children[ii];
                        selectedInput.classList.add('selected');
                        keys = selectedInput.childElementCount;
                    } else {
                        this.container.children[ii].classList.remove('selected');
                    }
                }
            });
        };

        this.container.children[inputs[inputIndex]].classList.add('selected');
        selectedInput = <HTMLDivElement>this.container.children[inputs[inputIndex]];

        let object = selectedInput.appendChild(createDiv('temporary'));
        let width = selectedInput.offsetHeight - (selectedInput.clientHeight - object.clientHeight) - parseFloat(selectedInput.style.padding);
        this.maxCharacters = Math.floor(window.innerWidth / width);
        object.remove();

        this.homeButton.addEventListener('click', _ => {
            removeAllEventListeners();
            home.modifyDocument();
        });

        this.buttonLeft.addEventListener('mousedown', _ => {
            for (let i = 0; i < this.container.childElementCount; i += 2) {
                this.container.children[i].classList.add('shadow');
                this.buttonLeft.classList.add('clicked');
            }
        })

        this.buttonRight.addEventListener('mousedown', _ => {
            for (let i = 0; i < this.container.childElementCount; i += 2) {
                this.container.children[i].classList.add('shadow');
                this.buttonRight.classList.add('clicked');
            }
        })

        this.buttonLeft.addEventListener('mouseout', _ => {
            for (let i = 0; i < this.container.childElementCount; i += 2) {
                this.container.children[i].classList.remove('shadow');
                this.buttonLeft.classList.remove('clicked');
            }
        })

        this.buttonRight.addEventListener('mouseout', _ => {
            for (let i = 0; i < this.container.childElementCount; i += 2) {
                this.container.children[i].classList.remove('shadow');
                this.buttonRight.classList.remove('clicked');
            }
        });

        this.buttonLeftFunction = _ => {
            if (this.vocabulary[this.wordIndex - 1]) {
                if (
                    Object.values(currentWord).filter((value) => value === '').length === 4
                    && this.wordIndex === this.vocabulary.length
                ) {
                    for (let i = 0; i < this.container.childElementCount; i += 2) {
                        this.container.children[i].classList.remove('shadow');
                    }

                    this.wordIndex--;
                    currentWord = this.vocabulary[this.wordIndex];

                    for (let i = 0; i < this.container.childElementCount; i += 2) {
                        let value = Object.values(currentWord)[i / 2];
                        this.container.children[i].innerHTML = '';
                        for (let ii = 0; ii < value.length; ii++) {
                            let object = document.createElement('object');
                            object.data = './keys/OG_T.svg';
                            object.id = `key${ii}-inp${i / 2}`;
                            object.style.height = `100%`;
                            this.container.children[i].insertAdjacentElement('beforeend', object);

                            object.addEventListener('load', _ => {
                                let svg = object.contentDocument;
                                svg.querySelector('#tspan7').innerHTML = value.charAt(ii);
                            })
                        }
                    }
                } else {
                    this.vocabulary[this.wordIndex] = currentWord;

                    const transaction = this.database.transaction(`vocabulary`, 'readwrite');
                    transaction.onerror = _ => console.error(transaction.error);
                    const objectStore = transaction.objectStore(`vocabulary`);
                    const req = objectStore.get(this.wordIndex);
                    req.onerror = _ => console.error(req.error);
                    req.onsuccess = _ => {
                        for (let i = 0; i < this.container.childElementCount; i += 2) {
                            this.container.children[i].classList.remove('shadow');
                        }

                        const idontcare = objectStore.put(currentWord, this.wordIndex + 1);
                        idontcare.onerror = _ => console.error(idontcare.error);

                        this.wordIndex--;

                        currentWord = this.vocabulary[this.wordIndex];
                        for (let i = 0; i < this.container.childElementCount; i += 2) {
                            let value = Object.values(currentWord)[i / 2];
                            this.container.children[i].innerHTML = '';
                            for (let ii = 0; ii < value.length; ii++) {
                                let object = document.createElement('object');
                                object.data = './keys/OG_T.svg';
                                object.id = `key${ii}-inp${i / 2}`;
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
                this.vocabulary[this.wordIndex] = currentWord;

                const transaction = this.database.transaction(`vocabulary`, 'readwrite');
                transaction.onerror = _ => console.error(transaction.error);
                const objectStore = transaction.objectStore(`vocabulary`);
                const req = objectStore.put(currentWord, this.wordIndex + 1);
                req.onerror = _ => console.error(req.error)
                transaction.oncomplete = _ => {
                    for (let i = 0; i < this.container.childElementCount; i += 2) {
                        this.container.children[i].classList.remove('shadow');
                    }

                    this.wordIndex++;
                    keys = 0;
                    currentWord = {
                        latinWord: '',
                        inflections: '',
                        germanTranslation: '',
                        relatedForeignWords: '',
                        selected: true,
                        probability: 1
                    };

                    for (let i = 0; i < this.container.childElementCount; i += 2) {
                        this.container.children[i].innerHTML = '';

                        inputIndex = 0;
                        selectedInput = <HTMLDivElement>this.container.children[0];
                        selectedInput.classList.add('selected');
                        if (i != 0) this.container.children[i].classList.remove('selected');
                    }
                }
            } else {
                this.vocabulary[this.wordIndex] = currentWord;

                for (let i = 0; i < this.container.childElementCount; i += 2) {
                    this.container.children[i].classList.remove('shadow');
                }

                const transaction = this.database.transaction(`vocabulary`, 'readwrite');
                transaction.onerror = _ => console.error(transaction.error);
                const objectStore = transaction.objectStore(`vocabulary`);
                const req = objectStore.get(this.wordIndex);
                req.onerror = _ => console.error(req.error);
                req.onsuccess = _ => {
                    const idontcare = objectStore.put(currentWord, this.wordIndex + 1);
                    idontcare.onerror = _ => console.log(idontcare.error);

                    this.wordIndex++;
                    currentWord = this.vocabulary[this.wordIndex];

                    for (let i = 0; i < this.container.childElementCount; i += 2) {
                        let value = Object.values(currentWord)[i / 2];
                        this.container.children[i].innerHTML = '';
                        for (let ii = 0; ii < value.length; ii++) {
                            let object = document.createElement('object');
                            object.data = './keys/OG_T.svg';
                            object.id = `key${ii}-inp${i / 2}`;
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
                        case '#p':
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
                        case '#n':
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
                                selectedInput.lastElementChild.remove();
                                keys--;
                            });
                        }
                    }

                    this.command = '';
                    this.commandMode = false;
                    return;
                } else if (event.key === 'ArrowUp') {
                    this.command.split('').forEach(_ => {
                        selectedInput.lastElementChild.remove();
                        keys--;
                    });

                    this.command = '';
                    this.commandMode = false;

                    if (inputIndex > 0) {
                        inputIndex--;
                        selectedInput.classList.remove('selected');
                        selectedInput = <HTMLDivElement>this.container.children[inputs[inputIndex]];
                        keys = selectedInput.childElementCount;
                    }
                    selectedInput.classList.add('selected');
                    return;
                } else if (event.key === 'ArrowDown') {
                    this.command.split('').forEach(_ => {
                        selectedInput.lastElementChild.remove();
                        keys--;
                    });

                    this.command = '';
                    this.commandMode = false;

                    if (inputIndex + 1 < 4) {
                        inputIndex++;
                        selectedInput.classList.remove('selected');
                        selectedInput = <HTMLDivElement>this.container.children[inputs[inputIndex]];
                        keys = selectedInput.childElementCount;
                    }
                    selectedInput.classList.add('selected');
                    return;
                } else if (event.key === 'Backspace') {
                    if (selectedInput.lastElementChild) {
                        selectedInput.lastElementChild.remove();
                        this.command = this.command.slice(0, this.command.length - 1);
                        keys--;

                        if (this.command === '') {
                            this.commandMode = false;
                        }
                    }
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
            //TODO: enable commands in add vocabulary
            if (!this.commandMode) {
                if (event.key === 'Backspace') {
                    if (selectedInput.lastElementChild) {
                        selectedInput.lastElementChild.remove();

                        Object.defineProperty(
                            currentWord,
                            Object.keys(currentWord)[inputIndex],
                            { value: Object.values(currentWord)[inputIndex].slice(0, keys - 1) }
                        );

                        keys--;
                    }
                    return;
                } else if (event.key === 'Enter' || event.key === 'ArrowDown') {
                    if (inputIndex + 1 < 4) {
                        inputIndex++;
                        selectedInput = <HTMLDivElement>this.container.children[inputs[inputIndex]];
                        for (let i = 0; i < this.container.childElementCount; i++) {
                            if (this.container.children[i] != selectedInput) {
                                this.container.children[i].classList.remove('selected');
                            } else {
                                selectedInput.classList.add('selected');
                                keys = selectedInput.childElementCount;
                            }
                        }
                    } else {
                        for (let i = 0; i < this.container.childElementCount; i += 2) {
                            this.container.children[i].classList.add('shadow');
                        }

                        if (this.enterMode) {
                            this.buttonRight.classList.remove('clicked');
                            if (!this.vocabulary[this.wordIndex + 1]) {
                                this.vocabulary[this.wordIndex] = currentWord;

                                const transaction = this.database.transaction(`vocabulary`, 'readwrite');
                                transaction.onerror = _ => console.error(transaction.error);
                                const objectStore = transaction.objectStore(`vocabulary`);
                                const req = objectStore.put(currentWord, this.wordIndex + 1);
                                req.onerror = _ => console.error(req.error)
                                transaction.oncomplete = _ => {
                                    for (let i = 0; i < this.container.childElementCount; i += 2) {
                                        this.container.children[i].classList.remove('shadow');
                                    }

                                    this.wordIndex++;
                                    keys = 0;
                                    currentWord = {
                                        latinWord: '',
                                        inflections: '',
                                        germanTranslation: '',
                                        relatedForeignWords: '',
                                        selected: true,
                                        probability: 1
                                    };

                                    for (let i = 0; i < this.container.childElementCount; i += 2) {
                                        this.container.children[i].innerHTML = '';

                                        inputIndex = 0;
                                        selectedInput = <HTMLDivElement>this.container.children[0];
                                        selectedInput.classList.add('selected');
                                        if (i != 0) this.container.children[i].classList.remove('selected');
                                    }
                                }
                            } else {
                                this.vocabulary[this.wordIndex] = currentWord;

                                for (let i = 0; i < this.container.childElementCount; i += 2) {
                                    this.container.children[i].classList.remove('shadow');
                                }

                                const transaction = this.database.transaction(`vocabulary`, 'readwrite');
                                transaction.onerror = _ => console.error(transaction.error);
                                const objectStore = transaction.objectStore(`vocabulary`);
                                const req = objectStore.get(this.wordIndex);
                                req.onerror = _ => console.error(req.error);
                                req.onsuccess = _ => {
                                    const idontcare = objectStore.put(currentWord, this.wordIndex + 1);
                                    idontcare.onerror = _ => console.log(idontcare.error);

                                    this.wordIndex++;
                                    currentWord = this.vocabulary[this.wordIndex];

                                    for (let i = 0; i < this.container.childElementCount; i += 2) {
                                        let value = Object.values(currentWord)[i / 2];
                                        this.container.children[i].innerHTML = '';
                                        for (let ii = 0; ii < value.length; ii++) {
                                            let object = document.createElement('object');
                                            object.data = './keys/OG_T.svg';
                                            object.id = `key${ii}-inp${i / 2}`;
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
                        const req = objectStore.put(currentWord, this.wordIndex + 1);
                        req.onerror = _ => console.error(req.error);

                        setTimeout(_ => {
                            for (let i = 0; i < this.container.childElementCount; i += 2) {
                                this.container.children[i].classList.remove('shadow');
                            }
                        }, 250);
                    }

                    return;
                } else if (event.key === 'ArrowUp') {
                    if (inputIndex > 0) inputIndex--;
                    selectedInput = <HTMLDivElement>this.container.children[inputs[inputIndex]];
                    for (let i = 0; i < this.container.childElementCount; i++) {
                        if (this.container.children[i] != selectedInput) {
                            this.container.children[i].classList.remove('selected');
                        } else {
                            selectedInput.classList.add('selected');
                            keys = selectedInput.childElementCount;
                        }
                    }
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
            object.id = `key${keys}-inp${inputIndex}`;
            object.style.height = `100%`;
            selectedInput.insertAdjacentElement('beforeend', object);
            let width = object.clientHeight;
            object.hidden = true;

            object.addEventListener('load', _ => {
                if (keys >= Math.floor(window.innerWidth / width)) {
                    object.remove();
                    for (let i = 0; i < keys; i++) {
                        this.failureAnimation(<HTMLObjectElement>selectedInput.children[i]);
                    }
                    return;
                }
                object.hidden = false;

                let svg = object.contentDocument;
                if (event.key === '<') {
                    svg.querySelector('#tspan7').innerHTML = '&lt;';
                } else {
                    svg.querySelector('#tspan7').innerHTML = event.key.charAt(0);
                }

                if (!this.commandMode) {
                    Object.defineProperty(
                        currentWord,
                        Object.keys(currentWord)[inputIndex],
                        { value: Object.values(currentWord)[inputIndex] + event.key.charAt(0) }
                    );
                    this.idleAnimation(object);
                } else {
                    this.command += event.key;
                    training.commandAnimation(object);
                }

                keys++;
            });
        }

        document.addEventListener('keydown', this.keyDownFunction);

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
}

export interface WordBundle {
    latinWord: string;
    inflections: string;
    germanTranslation: string;
    relatedForeignWords: string;
    selected: boolean;
    probability: number;
}