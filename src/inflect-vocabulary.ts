import { createDiv, home, removeAllEventListeners, training } from "..";

export class InflectVocabulary {
    container: HTMLDivElement;
    iconPlaceholder: HTMLDivElement;
    navbar: HTMLDivElement;
    buttonLeft: HTMLButtonElement;
    buttonRight: HTMLButtonElement;
    homeButton: HTMLButtonElement;
    deletionButton: HTMLButtonElement;

    keydownFunction: EventListenerOrEventListenerObject;
    buttonRightFunction: EventListener;
    buttonLeftFunction: EventListener;

    selectedInput: HTMLDivElement;
    inputIndex: number;

    currentWord: InflectedWord;
    currentWordIndex: number;
    wordIndex: number;
    vocabulary: InflectedWord[];

    database: IDBDatabase;

    enterMode = false;
    tabMode = false;
    commandMode = false;
    command = "";
    tabulator = "";
    tabCount = 0;
    keys: number;
    v = 1;
    padding: number[] = [];

    round = 0;
    failures = 0;
    totalAttempts = 0;
    totalPoints = 0;
    result: {
        singular: [boolean, boolean, boolean, boolean, boolean, boolean] | [boolean, boolean, boolean],
        plural: [boolean, boolean, boolean, boolean, boolean, boolean] | [boolean, boolean, boolean],
    };

    badColor = 'rgb(186, 2, 70)';
    timeout: number;

    constructor() {
    }

    modifyDocument(param?: Parameter): void {
        this.container = document.querySelector('#container');
        this.iconPlaceholder = document.querySelector('#icon-placeholder');
        this.navbar = document.querySelector('#navbar');

        this.container.setAttribute('style', '');
        document.body.style.backgroundImage = 'none';

        document.body.setAttribute('class', '');
        this.container.setAttribute('class', '');
        this.iconPlaceholder.setAttribute('class', '');
        this.navbar.setAttribute('class', '');

        this.container.innerHTML = '';
        this.iconPlaceholder.innerHTML = '';
        this.navbar.innerHTML = '';

        if (!param) {
            param = 'add nouns';
        }

        let inflectVocabularyIcon: HTMLObjectElement;
        inflectVocabularyIcon = document.createElement('object');
        inflectVocabularyIcon.id = 'inflectVocabularyIcon';

        this.v = 0;
        this.badColor = 'rgb(186, 2, 70)';
        switch (param) {
            case 'add verbs':
            case 'verbs':
                this.v = 9;
                this.badColor = '#ff00d4';
                if (param === 'add verbs') {
                    inflectVocabularyIcon.data = './conjugations.svg';
                } else {
                    inflectVocabularyIcon.data = './conjugate_verbs.svg';
                }
            case 'add nouns':
            case 'nouns':
            default:
                const request = window.indexedDB.open('Vocabulary', 1);
                request.onerror = _ => console.error(request.error);
                request.onsuccess = _ => {
                    this.database = request.result;
                    this.tabulator = '';

                    const transaction = this.database.transaction('inflected vocabulary', 'readonly');
                    transaction.onerror = _ => console.error(transaction.error);
                    const objectStore = transaction.objectStore('inflected vocabulary');
                    const req = objectStore.getAll();
                    req.onerror = _ => console.error(req.error);
                    req.onsuccess = _ => {
                        this.vocabulary = req.result;

                        document.body.classList.add('inflectVocabularyBody');
                        this.iconPlaceholder.classList.add('inflectVocabularyIconPlaceholder');
                        if (param === 'add nouns') {
                            inflectVocabularyIcon.data = './declinations.svg';
                        } else if (param === 'nouns') {
                            inflectVocabularyIcon.data = './decline_nouns.svg';
                        }
                        this.iconPlaceholder.insertAdjacentElement('beforeend', inflectVocabularyIcon);

                        if (param === 'add verbs' || param === 'verbs') {
                            this.container.classList.add('inflectVocabularyContainer', 'verbs');
                        } else {
                            this.container.classList.add('inflectVocabularyContainer', 'nouns');
                        }
                        this.navbar.classList.add('inflectVocabularyNavbar');

                        this.container.tabIndex = 0;
                        for (let i = 0; i < 21 - this.v; i++) {
                            let div = createDiv(`div${i}`, 'editable');
                            this.container.insertAdjacentElement('beforeend', div);
                            if (i < 3) {
                                div.classList.add('firstrow');
                                div.classList.remove('editable');
                                div.style.fontSize = `${div.offsetHeight * 0.75}px`;
                                if (i === 1) {
                                    div.innerHTML = 'Singular';
                                } else if (i === 2) {
                                    div.innerHTML = 'Plural';
                                }
                            }
                            if (i % 3 === 0) {
                                div.classList.add('firstcolumn');
                                div.classList.remove('editable');
                                div.style.fontSize = `${0.25 * div.offsetHeight}px`;
                                if (i > 0) div.innerHTML = `${i / 3}. ${param.includes('verb') ? 'P' : 'F'}.`;
                            }
                            if (!(i < 3 || i % 3 === 0)) {
                                div.style.padding = `${Math.round(0.05 * div.offsetHeight)}px`;
                                if (!param.includes('add')) {
                                    div.classList.add('shadowDesign');
                                }
                                this.padding.push(Math.round(div.offsetHeight * 0.05));
                            } else {
                                this.padding.push(0);
                            }

                            if (param.includes('verb')) {
                                div.classList.add('v');
                            }

                        }

                        if (param.startsWith('add')) {
                            this.buttonLeft = document.createElement('button');
                            this.buttonLeft.classList.add('roundButton', 'c');
                            this.buttonLeft.innerHTML = '<';
                            this.navbar.appendChild(this.buttonLeft);
                        }

                        this.homeButton = document.createElement('button');
                        this.homeButton.classList.add('roundButton');
                        this.homeButton.tabIndex = -1;
                        let icon = document.createElement('object');
                        icon.classList.add('homeIcon');
                        icon.data = './home.svg';
                        icon.style.height = '7.5vh';
                        icon.addEventListener('load', _ => {
                            icon.contentDocument.addEventListener('click', _ => {
                                removeAllEventListeners();
                                if (this.tabMode) {
                                    this.cancelTabMode();
                                }
                                home.modifyDocument();
                                this.commandMode = false;
                            })
                        })
                        this.homeButton.onclick = _ => {
                            removeAllEventListeners();
                            if (this.tabMode) {
                                this.cancelTabMode();
                            }
                            home.modifyDocument();
                            this.commandMode = false;
                        }
                        this.homeButton.insertAdjacentElement('beforeend', icon);
                        this.navbar.appendChild(this.homeButton);

                        if (param.startsWith('add')) {
                            this.deletionButton = document.createElement('button');
                            this.deletionButton.classList.add('roundButton', 'deletionButton');
                            this.deletionButton.innerHTML = 'X';
                            this.deletionButton.tabIndex = -1;
                            if (param.includes('verb')) {
                                this.deletionButton.classList.add('v');
                            }
                            this.navbar.appendChild(this.deletionButton);

                            this.buttonRight = document.createElement('button');
                            this.buttonRight.classList.add('roundButton', 'c');
                            this.buttonRight.innerHTML = '>';
                            this.buttonRight.tabIndex = -1;
                            this.navbar.appendChild(this.buttonRight);
                        }


                        if (param) {
                            this.type(param);
                        } else {
                            this.type();
                        }
                    }
                }
                break;
        }
    }

    type(param?: Parameter): void {
        switch (param) {
            case 'verbs':
            case 'nouns':
                this.keys = 0;

                document.querySelectorAll('.editable').forEach((element: HTMLDivElement) => {
                    element.addEventListener('click', _ => {
                        this.inputIndex = parseInt(element.id.slice(3));
                        this.changeSelectedInput();
                    });
                });

                this.selectedInput = <HTMLDivElement>document.getElementById('div4');
                this.selectedInput.classList.add('selectedElement');
                this.inputIndex = 4;
                this.wordIndex = this.vocabulary.length;

                this.currentWord = {
                    singular: this.empty(param),
                    plural: this.empty(param),
                    verb: param.includes('verb'),
                    probability: 1
                }

                this.keydownFunction = (event: KeyboardEvent) => {
                    let forbiddenCharacters = ['´', '`', '^'];
                    if (this.commandMode) {
                        forbiddenCharacters.push('#');
                        if (this.command.endsWith('%')) {
                            if (this.command.startsWith('#p-')) {
                                let percentage = parseInt(this.command.slice(3, this.command.length - 1));
                                if (percentage >= 0 && percentage <= 100) {
                                    this.padding[this.inputIndex] = Math.round(Math.max(Math.min(this.padding[this.inputIndex] * (1 - percentage / 100), this.selectedInput.clientHeight / 2 * 0.7), 1));
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
                                    this.padding[this.inputIndex] = Math.round(Math.max(Math.min(this.padding[this.inputIndex] * (1 + percentage / 100), this.selectedInput.clientHeight / 2 * 0.7), 1));
                                    this.paddingAnimation(this.selectedInput);
                                    this.command.split('').forEach(_ => {
                                        this.selectedInput.lastElementChild.remove();
                                        this.keys--;
                                    });
                                    this.command = '';
                                    this.commandMode = false;
                                    return;
                                }
                            } else if (this.command.startsWith('#P+')) {
                                let percentage = parseInt(this.command.slice(3, this.command.length - 1));
                                if (percentage >= 0) {
                                    this.padding.forEach((p, i) => {
                                        let div: HTMLDivElement = document.querySelector(`#div${i}`);
                                        if (i > 3 && i % 3 != 0) {
                                            this.padding[i] = Math.round(Math.max(Math.min(this.padding[i] * (1 + percentage / 100), div.clientHeight / 2 * 0.7), 1));
                                            this.paddingAnimation(div);
                                        }
                                    });
                                    this.command.split('').forEach(_ => {
                                        this.selectedInput.lastElementChild.remove();
                                        this.keys--;
                                    });
                                    this.command = '';
                                    this.commandMode = false;
                                    return;
                                }
                            } else if (this.command.startsWith('#P-')) {
                                let percentage = parseInt(this.command.slice(3, this.command.length - 1));
                                if (percentage >= 0) {
                                    this.padding.forEach((p, i) => {
                                        let div: HTMLDivElement = document.querySelector(`#div${i}`);
                                        if (i % 3 != 0) {
                                            this.padding[i] = Math.round(Math.max(Math.min(this.padding[i] * (1 - percentage / 100), div.clientHeight / 2 * 0.7), 1));
                                            this.paddingAnimation(document.querySelector(`#div${i}`));
                                        }
                                    });
                                    this.command.split('').forEach(_ => {
                                        this.selectedInput.lastElementChild.remove();
                                        this.keys--;
                                    });
                                    this.command = '';
                                    this.commandMode = false;
                                    return;
                                }
                            }

                            switch (this.command) {
                                default: {
                                    this.command.split('').forEach(_ => {
                                        this.selectedInput.lastElementChild.remove();
                                        this.keys--;
                                    });

                                    if (this.inputIndex < 18 - this.v) {
                                        this.inputIndex += 3;
                                    } else if (this.inputIndex === 19 - this.v) {
                                        this.inputIndex = 5;
                                    }
                                    this.commandMode = false;
                                    this.changeSelectedInput();
                                    break;
                                }
                            }
                            return;
                        } else if (event.key === 'ArrowUp') {
                            this.command.split('').forEach(_ => {
                                this.selectedInput.removeChild(this.selectedInput.lastElementChild);
                                this.keys--;
                            });

                            if (this.inputIndex > 6) {
                                this.inputIndex -= 3;
                            }
                            this.changeSelectedInput();

                            this.command = '';
                            this.commandMode = false;
                            return;
                        } else if (event.key === 'ArrowDown') {
                            this.command.split('').forEach(_ => {
                                this.selectedInput.removeChild(this.selectedInput.lastElementChild);
                                this.keys--;
                            });

                            this.command = '';
                            this.commandMode = false;

                            if (this.inputIndex < 18 - this.v) {
                                this.inputIndex += 3;
                            }
                            this.changeSelectedInput();
                            return;
                        } else if (event.key === 'ArrowLeft') {
                            this.command.split('').forEach(_ => {
                                this.selectedInput.removeChild(this.selectedInput.lastElementChild);
                                this.keys--;
                            });

                            this.command = '';
                            this.commandMode = false;

                            if (this.inputIndex > 4) {
                                this.inputIndex--;
                                if (this.inputIndex % 3 === 0) {
                                    this.inputIndex--;
                                }

                                this.changeSelectedInput();
                            }
                            return;
                        } else if (event.key === 'ArrowRight') {
                            this.command.split('').forEach(_ => {
                                this.selectedInput.removeChild(this.selectedInput.lastElementChild);
                                this.keys--;
                            });

                            this.command = '';
                            this.commandMode = false;

                            if (this.inputIndex < 20 - this.v) {
                                this.inputIndex++;
                                if (this.inputIndex % 3 === 0) {
                                    this.inputIndex++;
                                }

                                this.changeSelectedInput();
                            }
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
                        }

                        if (
                            this.commandMode && (
                                this.selectedInput.classList.contains('known-case') ||
                                forbiddenCharacters.includes(event.key) ||
                                event.key.length > 1
                            )
                        ) {
                            return;
                        }
                    }

                    if (!this.commandMode) {
                        if (event.key === 'ArrowRight') {
                            if (this.inputIndex < 20 - this.v) {
                                this.inputIndex++;
                                if (this.inputIndex % 3 === 0) {
                                    this.inputIndex++;
                                }
                                this.changeSelectedInput();
                                this.keys = this.selectedInput.childElementCount;
                            }
                            return;
                        } else if (event.key === 'ArrowLeft') {
                            if (this.inputIndex > 4) {
                                this.inputIndex--;
                                if (this.inputIndex % 3 === 0) {
                                    this.inputIndex--;
                                }

                                this.changeSelectedInput();
                                this.keys = this.selectedInput.childElementCount;
                            }
                            return;
                        } else if (event.key === 'ArrowDown' || event.key === 'Enter') {
                            if (this.inputIndex < 20 - this.v) {
                                if (event.key === 'Enter' && !this.selectedInput.classList.contains('known-case')) {
                                    if (this.compare(Object.values(this.currentWord)[this.inputIndex % 3 - 1][Math.floor(this.inputIndex / 3) - 1],
                                        Object.values(this.vocabulary[this.currentWordIndex])[this.inputIndex % 3 - 1][Math.floor(this.inputIndex / 3) - 1])
                                    ) {
                                        for (let i = 0; i < this.selectedInput.childElementCount; i++) {
                                            let object = <HTMLObjectElement>this.selectedInput.children[i];
                                            this.successAnimation(object);
                                        }
                                        if (Object.values(this.result)[this.inputIndex % 3 - 1][Math.floor(this.inputIndex / 3) - 1] === undefined) {
                                            let array = Object.values(this.result)[this.inputIndex % 3 - 1];
                                            array[Math.floor(this.inputIndex / 3) - 1] = true;
                                            Object.defineProperty(
                                                this.result,
                                                Object.keys(this.result)[this.inputIndex % 3 - 1],
                                                { value: array }
                                            );

                                            let inp = this.selectedInput;
                                            setTimeout(_ => {
                                                inp.classList.remove('shadowDesign');
                                                inp.classList.add('greenShadowDesign');
                                            }, 500)
                                        }
                                    } else {
                                        for (let i = 0; i < this.selectedInput.childElementCount; i++) {
                                            let object = <HTMLObjectElement>this.selectedInput.children[i];
                                            this.failureAnimation(object);
                                        }

                                        if (Object.values(this.result)[this.inputIndex % 3 - 1][Math.floor(this.inputIndex / 3) - 1] === undefined) {
                                            let array = Object.values(this.result)[this.inputIndex % 3 - 1];
                                            array[Math.floor(this.inputIndex / 3) - 1] = false;
                                            Object.defineProperty(
                                                this.result,
                                                Object.keys(this.result)[this.inputIndex % 3 - 1],
                                                { value: array }
                                            );
                                        }

                                        let inp = this.selectedInput;
                                        setTimeout(_ => {
                                            inp.classList.remove('shadowDesign');
                                            inp.classList.add('redShadowDesign');
                                        }, 500)
                                    }
                                }
                            }

                            if (this.inputIndex < 18 - this.v) {
                                this.inputIndex += 3;

                                this.changeSelectedInput();
                                this.keys = this.selectedInput.childElementCount;

                                if (event.key === 'Enter' && this.selectedInput.classList.contains('known-case')) {
                                    if (this.inputIndex < 18 - this.v) {
                                        this.inputIndex += 3;

                                        this.changeSelectedInput();
                                        this.keys = this.selectedInput.childElementCount;
                                    } else if (this.inputIndex === 19 - this.v) {
                                        this.inputIndex = 5;

                                        this.changeSelectedInput();
                                        this.keys = this.selectedInput.childElementCount;
                                    }
                                }

                            } else if (event.key === 'Enter' && this.inputIndex === 19 - this.v) {
                                this.inputIndex = 5;

                                this.changeSelectedInput();
                                this.keys = this.selectedInput.childElementCount;
                            } else if (event.key === 'Enter' && this.inputIndex === 20 - this.v) {
                                this.currentWord.singular.forEach((word, i) => {
                                    let index = 1 + (i + 1) * 3;
                                    if (this.compare(word, Object.values(this.vocabulary[this.currentWordIndex])[index % 3 - 1][Math.floor(index / 3) - 1])) {
                                        for (let ii = 0; ii < this.container.children[index].childElementCount; ii++) {
                                            if (index % 3 != 0 && !this.container.children[index].classList.contains('known-case')) {
                                                let object = <HTMLObjectElement>this.container.children[index].children[ii];
                                                this.successAnimation(object);
                                            }
                                        }
                                        if (Object.values(this.result)[index % 3 - 1][Math.floor(index / 3) - 1] === undefined) {
                                            let array = Object.values(this.result)[this.inputIndex % 3 - 1];
                                            array[Math.floor(this.inputIndex / 3) - 1] = true;
                                            Object.defineProperty(
                                                this.result,
                                                Object.keys(this.result)[index % 3 - 1],
                                                { value: array }
                                            )
                                        }

                                    } else {
                                        for (let ii = 0; ii < this.container.children[index].childElementCount; ii++) {
                                            if (index % 3 != 0 && !this.container.children[index].classList.contains('known-case')) {
                                                let object = <HTMLObjectElement>this.container.children[index].children[ii];
                                                this.failureAnimation(object);
                                            }
                                        }

                                        if (Object.values(this.result)[this.inputIndex % 3 - 1][Math.floor(this.inputIndex / 3) - 1] === undefined) {
                                            let array = Object.values(this.result)[this.inputIndex % 3 - 1];
                                            array[Math.floor(this.inputIndex / 3) - 1] = false;
                                            Object.defineProperty(
                                                this.result,
                                                Object.keys(this.result)[this.inputIndex % 3 - 1],
                                                { value: array }
                                            )
                                        }
                                    }
                                })
                                this.currentWord.plural.forEach((word, i) => {
                                    let index = 2 + (i + 1) * 3;
                                    if (this.compare(word, Object.values(this.vocabulary[this.currentWordIndex])[index % 3 - 1][Math.floor(index / 3) - 1])) {
                                        for (let ii = 0; ii < this.container.children[index].childElementCount; ii++) {
                                            if (index % 3 != 0 && !this.container.children[index].classList.contains('known-case')) {
                                                let object = <HTMLObjectElement>this.container.children[index].children[ii];
                                                this.successAnimation(object);
                                            }
                                        }

                                        if (Object.values(this.result)[this.inputIndex % 3 - 1][Math.floor(this.inputIndex / 3) - 1] === undefined) {
                                            let array = Object.values(this.result)[this.inputIndex % 3 - 1];
                                            array[Math.floor(this.inputIndex / 3) - 1] = true;
                                            Object.defineProperty(
                                                this.result,
                                                Object.keys(this.result)[this.inputIndex % 3 - 1],
                                                { value: array }
                                            )
                                        }
                                    } else {
                                        for (let ii = 0; ii < this.container.children[index].childElementCount; ii++) {
                                            if (index % 3 != 0 && !this.container.children[index].classList.contains('known-case')) {
                                                let object = <HTMLObjectElement>this.container.children[index].children[ii];
                                                this.failureAnimation(object);
                                            }
                                        }

                                        if (Object.values(this.result)[this.inputIndex % 3 - 1][Math.floor(this.inputIndex / 3) - 1] === undefined) {
                                            let array = Object.values(this.result)[this.inputIndex % 3 - 1];
                                            array[Math.floor(this.inputIndex / 3) - 1] = false;
                                            Object.defineProperty(
                                                this.result,
                                                Object.keys(this.result)[this.inputIndex % 3 - 1],
                                                { value: array }
                                            )
                                        }
                                    }
                                });

                                if (this.compareObjects(this.currentWord, this.vocabulary[this.currentWordIndex])) {
                                    this.totalAttempts += 11 - this.v / 3 * 2;
                                    let addition = this.result.singular.filter(w => w === true).length +
                                        this.result.plural.filter(w => w === true).length;
                                    this.totalPoints += addition;
                                    if (addition != 12 - this.v / 3 * 2) {
                                        this.vocabulary[this.currentWordIndex].probability *= 0.8;
                                    } else {
                                        this.vocabulary[this.currentWordIndex].probability *= 1.2;
                                    }
                                    const transaction = this.database.transaction('inflected vocabulary', 'readwrite');
                                    const objectStore = transaction.objectStore('inflected vocabulary');
                                    const request = objectStore.put(this.vocabulary[this.currentWordIndex], this.currentWordIndex + 1);
                                    request.onerror = _ => console.error(request.error);

                                    setTimeout(_ => {
                                        document.querySelectorAll('.selectedElement').forEach(div => {
                                            div.classList.remove('selectedElement');
                                        });
                                        this.keys = 0;
                                        this.inputIndex = 4;
                                        this.selectedInput = <HTMLDivElement>document.querySelector('#div4');
                                        this.selectedInput.classList.add('selectedElement');
                                        this.startNewTrainingRound(param || 'nouns');
                                    }, 500);
                                }
                            }
                            return;
                        } else if (event.key === 'ArrowUp') {
                            if (this.inputIndex > 6) {
                                this.inputIndex -= 3;

                                this.changeSelectedInput();
                                this.keys = this.selectedInput.childElementCount;
                            }
                            return;
                        } else if (event.key === 'Backspace') {
                            if (this.selectedInput.lastElementChild) {
                                this.selectedInput.lastElementChild.remove();

                                let array = <string[]>Object.values(this.currentWord)[this.inputIndex % 3 - 1];
                                array[Math.floor(this.inputIndex / 3) - 1] = array[Math.floor(this.inputIndex / 3) - 1].slice(0, this.keys - 1);
                                Object.defineProperty(
                                    this.currentWord,
                                    Object.keys(this.currentWord)[this.inputIndex % 3 - 1],
                                    { value: array }
                                );
                                this.keys--;
                            }
                            return;
                        } else if (this.selectedInput.classList.contains('known-case')) {
                            return;
                        } else if (event.key === '#') {
                            this.command = '';
                            this.commandMode = true;
                        } else if (event.key === 'Tab') {
                            if (this.tabulator) {
                                if (this.keys + this.tabulator.length >=
                                    this.selectedInput.clientWidth /
                                    (this.selectedInput.clientHeight - parseFloat(this.selectedInput.style.padding))
                                ) {
                                    this.selectedInput.childNodes.forEach((v, i) => {
                                        this.failureAnimation(<HTMLObjectElement>this.selectedInput.children[i]);
                                    });
                                } else {
                                    let array = Object.values(this.currentWord)[this.inputIndex % 3 - 1];
                                    let n = Math.floor(this.inputIndex / 3) - 1;
                                    array[n] += this.tabulator;
                                    Object.defineProperty(
                                        this.currentWord,
                                        Object.keys(this.currentWord)[this.inputIndex % 3 - 1],
                                        { value: array }
                                    );

                                    this.tabulator.split('').forEach(letter => {
                                        let object = document.createElement('object');
                                        object.data = './keys/OG_T.svg';
                                        object.id = `key${this.keys}-inp${this.inputIndex}`;
                                        object.style.height = `100%`;
                                        this.selectedInput.insertAdjacentElement('beforeend', object);
                                        object.hidden = true;

                                        object.addEventListener('load', _ => {
                                            object.hidden = false;

                                            let svg = object.contentDocument;
                                            svg.querySelector('#tspan7').innerHTML = letter;
                                            this.keys++;

                                            this.tabulatorAnimation(object);
                                        });
                                    })
                                }
                            }
                            return;
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
                        if (this.keys + 1 >= Math.floor(this.selectedInput.clientWidth / width)) {
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
                            let array = Object.values(this.currentWord)[this.inputIndex % 3 - 1];
                            array[Math.floor(this.inputIndex / 3) - 1] += event.key;
                            Object.defineProperty(
                                this.currentWord,
                                Object.keys(this.currentWord)[this.inputIndex % 3 - 1],
                                { value: array }
                            );
                        } else {
                            this.command += event.key;
                            training.commandAnimation(object);
                        }

                        this.keys++;

                        this.idleAnimation(object);
                    });
                }

                document.addEventListener('keydown', this.keydownFunction);

                window.onkeyup = (event) => {
                    if (event.key === 'Tab') {
                        this.container.focus();
                    }
                }

                this.startNewTrainingRound(param ? param : 'nouns');
                break;
            case 'add verbs':
            case 'add nouns':
                this.keys = 0;

                document.querySelectorAll('.editable').forEach((element: HTMLDivElement) => {
                    element.addEventListener('click', _ => {
                        if (this.tabMode) {
                            this.cancelTabMode();
                        }
                        this.inputIndex = parseInt(element.id.slice(3));
                        this.changeSelectedInput();
                    });
                });

                this.selectedInput = <HTMLDivElement>document.getElementById('div4');
                this.selectedInput.classList.add('selectedElement');
                this.inputIndex = 4;
                this.wordIndex = this.vocabulary.length;

                this.currentWord = {
                    singular: this.empty(param),
                    plural: this.empty(param),
                    verb: param.includes('verb'),
                    probability: 1
                }

                let deletionMode = false;
                let indicator;
                let deletionFunction = _ => {
                    this.vocabulary.splice(this.wordIndex, 1);
                    const transaction = this.database.transaction('inflected vocabulary', 'readwrite');
                    const objectStore = transaction.objectStore('inflected vocabulary');
                    const request = objectStore.openCursor();
                    request.onsuccess = _ => {
                        let cursor = request.result;
                        if (cursor) {
                            let k = <number>cursor.key;
                            let word = this.vocabulary[k - 1];
                            if (word) {
                                const updatedData = cursor.value;
                                updatedData.singular = word.singular;
                                updatedData.plural = word.plural;
                                updatedData.verb = word.verb;
                                updatedData.probability = word.probability;
                                cursor.update(updatedData);
                                cursor.continue();
                            } else {
                                cursor.delete();

                                let vocab1 = this.vocabulary.slice(0, this.wordIndex);
                                let vocab2 = this.vocabulary.slice(this.wordIndex);
                                let wi1 = vocab1.findLastIndex(w => w.verb === param.includes('verb'));
                                let wi2 = vocab2.findIndex(w => w.verb === param.includes('verb')) + this.wordIndex;
                                if (this.vocabulary[wi1]) {
                                    this.wordIndex = wi1;

                                    this.currentWord = this.vocabulary[wi1];
                                    let overallIndexes: [number, number[]][] = [];

                                    let tabulatorStyle = false;
                                    for (let i = 3; i < this.container.childElementCount; i++) {
                                        let tabulatorIndexes: number[] = [];
                                        let n = Math.floor(i / 3) - 1;
                                        let singular = this.currentWord.singular;
                                        let plural = this.currentWord.plural;
                                        if (i % 3 === 1) {
                                            this.container.children[i].innerHTML = '';
                                            for (let ii = 0; ii < singular[Math.floor(i / 3) - 1].length; ii++) {
                                                if (singular[n].slice(ii, ii + 5) === '^tab^') {
                                                    tabulatorStyle = !tabulatorStyle;
                                                    ii += 4;
                                                } else {
                                                    let object = document.createElement('object');
                                                    object.data = './keys/OG_T.svg';
                                                    object.id = `key${ii}-inp${i}`;
                                                    object.style.height = `100%`;
                                                    this.container.children[i].insertAdjacentElement('beforeend', object);
                                                    if (tabulatorStyle) tabulatorIndexes.push(ii)

                                                    object.addEventListener('load', _ => {
                                                        let svg = object.contentDocument;
                                                        svg.querySelector('#tspan7').innerHTML = singular[Math.floor(i / 3) - 1].charAt(ii);
                                                        if (
                                                            overallIndexes.find(indexes => indexes[0] === parseInt(object.parentElement.id.slice(3))) != undefined &&
                                                            overallIndexes.find(indexes => indexes[0] === parseInt(object.parentElement.id.slice(3)))[1]
                                                                .includes(parseInt(object.id.slice(3)))
                                                        ) {
                                                            this.tabulatorAnimation(object);
                                                            object.classList.add('tabulator');
                                                        }
                                                    })
                                                }
                                            }
                                            overallIndexes.push([i, tabulatorIndexes]);
                                        } else if (i % 3 === 2) {
                                            this.container.children[i].innerHTML = '';
                                            for (let ii = 0; ii < plural[Math.floor(i / 3) - 1].length; ii++) {
                                                if (plural[n].slice(ii, ii + 5) === '^tab^') {
                                                    tabulatorStyle = !tabulatorStyle;
                                                    ii += 4;
                                                } else {
                                                    let object = document.createElement('object');
                                                    object.data = './keys/OG_T.svg';
                                                    object.id = `key${ii}-inp${i}`;
                                                    object.style.height = `100%`;
                                                    this.container.children[i].insertAdjacentElement('beforeend', object);
                                                    if (tabulatorStyle) tabulatorIndexes.push(ii);

                                                    object.addEventListener('load', _ => {
                                                        let svg = object.contentDocument;
                                                        svg.querySelector('#tspan7').innerHTML = plural[Math.floor(i / 3) - 1].charAt(ii);
                                                        if (
                                                            overallIndexes.find(indexes => indexes[0] === parseInt(object.parentElement.id.slice(3))) != undefined &&
                                                            overallIndexes.find(indexes => indexes[0] === parseInt(object.parentElement.id.slice(3)))[1]
                                                                .includes(parseInt(object.id.slice(3)))
                                                        ) {
                                                            this.tabulatorAnimation(object);
                                                            object.classList.add('tabulator');
                                                        }
                                                    });
                                                }
                                            }
                                        }
                                        overallIndexes.push([i, tabulatorIndexes]);
                                    }
                                    this.changeSelectedInput();
                                } else if (this.vocabulary[wi2]) {
                                    this.currentWord = <InflectedWord>this.vocabulary[wi2];
                                    let overallIndexes: [number, number[]][] = [];
                                    let tabulatorStyle = false;
                                    for (let i = 3; i < this.container.childElementCount; i++) {
                                        let tabulatorIndexes: number[] = [];
                                        let n = Math.floor(i / 3) - 1;
                                        let singular = this.currentWord.singular;
                                        let plural = this.currentWord.plural;
                                        if (i % 3 === 1) {
                                            this.container.children[i].innerHTML = '';
                                            for (let ii = 0; ii < singular[Math.floor(i / 3) - 1].length; ii++) {
                                                if (singular[n].slice(ii, ii + 5) === '^tab^') {
                                                    tabulatorStyle = !tabulatorStyle;
                                                    ii += 4;
                                                } else {
                                                    let object = document.createElement('object');
                                                    object.data = './keys/OG_T.svg';
                                                    object.id = `key${ii}-inp${i}`;
                                                    object.style.height = `100%`;
                                                    this.container.children[i].insertAdjacentElement('beforeend', object);
                                                    if (tabulatorStyle) tabulatorIndexes.push(ii)

                                                    object.addEventListener('load', _ => {
                                                        let svg = object.contentDocument;
                                                        svg.querySelector('#tspan7').innerHTML = singular[Math.floor(i / 3) - 1].charAt(ii);
                                                        if (overallIndexes.find(indexes => indexes[0] === parseInt(object.parentElement.id.slice(3))) &&
                                                            overallIndexes.find(indexes => indexes[0] === parseInt(object.parentElement.id.slice(3)))[1]
                                                                .includes(parseInt(object.id.slice(3)))
                                                        ) {
                                                            this.tabulatorAnimation(object);
                                                            object.classList.add('tabulator');
                                                        }
                                                    })
                                                }
                                            }
                                            overallIndexes.push([i, tabulatorIndexes]);
                                        } else if (i % 3 === 2) {
                                            this.container.children[i].innerHTML = '';
                                            for (let ii = 0; ii < plural[Math.floor(i / 3) - 1].length; ii++) {
                                                if (plural[n].slice(ii, ii + 5) === '^tab^') {
                                                    tabulatorStyle = !tabulatorStyle;
                                                    ii += 4;
                                                } else {
                                                    let object = document.createElement('object');
                                                    object.data = './keys/OG_T.svg';
                                                    object.id = `key${ii}-inp${i}`;
                                                    object.style.height = `100%`;
                                                    this.container.children[i].insertAdjacentElement('beforeend', object);
                                                    if (tabulatorStyle) tabulatorIndexes.push(ii);

                                                    object.addEventListener('load', _ => {
                                                        let svg = object.contentDocument;
                                                        svg.querySelector('#tspan7').innerHTML = plural[Math.floor(i / 3) - 1].charAt(ii);
                                                        if (overallIndexes.find(indexes => indexes[0] === parseInt(object.parentElement.id.slice(3))) &&
                                                            overallIndexes.find(indexes => indexes[0] === parseInt(object.parentElement.id.slice(3)))[1]
                                                                .includes(parseInt(object.id.slice(3)))
                                                        ) {
                                                            this.tabulatorAnimation(object);
                                                            object.classList.add('tabulator');
                                                        }
                                                    });
                                                }
                                            }
                                            overallIndexes.push([i, tabulatorIndexes]);
                                        }
                                    }
                                    this.changeSelectedInput();
                                } else {
                                    this.keys = 0;
                                    this.currentWord = {
                                        singular: this.empty(param),
                                        plural: this.empty(param),
                                        verb: param.includes('verb'),
                                        probability: 1
                                    };

                                    for (let i = 0; i < this.container.childElementCount; i++) {
                                        if (i % 3 != 0) {
                                            this.container.children[i].innerHTML = '';
                                        }

                                        this.container.children[i].classList.remove('selectedElement');
                                    }
                                    this.inputIndex = 4;
                                    this.selectedInput = <HTMLDivElement>this.container.children[4];
                                    this.tabCount = 0;
                                    this.selectedInput.classList.add('selectedElement');
                                }
                            }
                        }
                    }

                    deletionMode = false;
                    this.deletionButton.removeEventListener('click', deletionFunction);
                    this.deletionButton.classList.remove('click');
                    document.querySelectorAll('object').forEach(object => {
                        if (object.contentDocument.getElementById('tspan7')) {
                            this.deletionAnimation(object, 1, 'reverse');
                        }
                    });
                    Array.from(document.getElementsByClassName('editable')).forEach((div: HTMLDivElement) => {
                        div.classList.remove('redShadowDesign');
                    });
                }

                this.deletionButton.addEventListener('mousemove', _ => {
                    if (deletionMode) {
                        return;
                    }
                    deletionMode = true;

                    this.deletionAnimation(this.deletionButton, 2000, 'normal');
                    let broken = false;
                    this.container.querySelectorAll('object').forEach((object) => {
                        if (object.contentDocument.getElementById('tspan7')) {
                            this.deletionAnimation(object, 2000, 'normal');
                        } else {
                            broken = true;
                            return;
                        }
                    });

                    if (broken) {
                        this.container.querySelectorAll('object').forEach((object) => {
                            if (object.contentDocument.getElementById('tspan7')) {
                                this.deletionAnimation(object, 1, 'reverse');
                            }
                        });
                    }

                    indicator = setTimeout(_ => {
                        if (deletionMode) {
                            this.deletionButton.addEventListener('click', deletionFunction);
                            Array.from(document.getElementsByClassName('editable')).forEach((div: HTMLDivElement) => {
                                div.classList.add('redShadowDesign');
                            });
                        }
                    }, 2000);
                });

                this.deletionButton.addEventListener('mouseleave', _ => {
                    clearTimeout(indicator);
                    deletionMode = false;
                    this.deletionAnimation(this.deletionButton, 1, 'reverse');
                    this.container.querySelectorAll('object').forEach((object) => {
                        if (object.contentDocument.getElementById('tspan7')) {
                            this.deletionAnimation(object, 1, 'reverse');
                        }
                    });
                    Array.from(document.getElementsByClassName('editable')).forEach((div: HTMLDivElement) => {
                        div.classList.remove('redShadowDesign');
                    });
                    this.deletionButton.removeEventListener('click', deletionFunction);
                });

                document.querySelectorAll('.c').forEach((element: HTMLButtonElement) => {
                    element.addEventListener('mousedown', _ => {
                        element.classList.add('click');
                        document.querySelectorAll('.editable').forEach((div: HTMLDivElement) => {
                            div.classList.add('savedElement');
                        });
                    });

                    element.addEventListener('mouseout', _ => {
                        element.classList.remove('click');
                        document.querySelectorAll('.editable').forEach((div: HTMLDivElement) => {
                            div.classList.remove('savedElement');
                        });
                    });
                });

                this.buttonLeftFunction = _ => {
                    if (this.tabMode) {
                        this.cancelTabMode();
                    }

                    let vocab = this.vocabulary.slice(0, this.wordIndex);
                    let wi = vocab.findLastIndex(w => w.verb === param.includes('verb'));

                    if (this.vocabulary[wi]) {
                        if (
                            this.currentWord.singular.filter((value) => value === '').length === (param.includes('verb') ? 3 : 6) &&
                            this.currentWord.plural.filter((value) => value === '').length === (param.includes('verb') ? 3 : 6) &&
                            this.wordIndex === this.vocabulary.length
                        ) {
                            for (let i = 0; i < this.container.childElementCount; i++) {
                                this.container.children[i].classList.remove('savedElement');
                                this.buttonLeft.classList.remove('click');
                            }

                            this.wordIndex = wi;
                            this.currentWord = this.vocabulary[wi];
                            let overallIndexes: [number, number[]][] = [];

                            let tabulatorStyle = false;
                            for (let i = 3; i < this.container.childElementCount; i++) {
                                let tabulatorIndexes: number[] = [];
                                let n = Math.floor(i / 3) - 1;
                                let singular = this.currentWord.singular;
                                let plural = this.currentWord.plural;
                                if (i % 3 === 1) {
                                    this.container.children[i].innerHTML = '';
                                    for (let ii = 0; ii < singular[Math.floor(i / 3) - 1].length; ii++) {
                                        if (singular[n].slice(ii, ii + 5) === '^tab^') {
                                            tabulatorStyle = !tabulatorStyle;
                                            ii += 4;
                                        } else {
                                            let object = document.createElement('object');
                                            object.data = './keys/OG_T.svg';
                                            object.id = `key${ii}-inp${i}`;
                                            object.style.height = `100%`;
                                            this.container.children[i].insertAdjacentElement('beforeend', object);
                                            if (tabulatorStyle) tabulatorIndexes.push(ii)

                                            object.addEventListener('load', _ => {
                                                let svg = object.contentDocument;
                                                svg.querySelector('#tspan7').innerHTML = singular[Math.floor(i / 3) - 1].charAt(ii);
                                                if (
                                                    overallIndexes.find(indexes => indexes[0] === parseInt(object.parentElement.id.slice(3))) != undefined &&
                                                    overallIndexes.find(indexes => indexes[0] === parseInt(object.parentElement.id.slice(3)))[1].includes(parseInt(object.id.slice(3)))
                                                ) {
                                                    this.tabulatorAnimation(object);
                                                    object.classList.add('tabulator');
                                                }
                                            })
                                        }
                                    }
                                    overallIndexes.push([i, tabulatorIndexes]);
                                } else if (i % 3 === 2) {
                                    this.container.children[i].innerHTML = '';
                                    for (let ii = 0; ii < plural[Math.floor(i / 3) - 1].length; ii++) {
                                        if (plural[n].slice(ii, ii + 5) === '^tab^') {
                                            tabulatorStyle = !tabulatorStyle;
                                            ii += 4;
                                        } else {
                                            let object = document.createElement('object');
                                            object.data = './keys/OG_T.svg';
                                            object.id = `key${ii}-inp${i}`;
                                            object.style.height = `100%`;
                                            this.container.children[i].insertAdjacentElement('beforeend', object);
                                            if (tabulatorStyle) tabulatorIndexes.push(ii);

                                            object.addEventListener('load', _ => {
                                                let svg = object.contentDocument;
                                                svg.querySelector('#tspan7').innerHTML = plural[Math.floor(i / 3) - 1].charAt(ii);
                                                if (
                                                    overallIndexes.find(indexes => indexes[0] === parseInt(object.parentElement.id.slice(3))) != undefined &&
                                                    overallIndexes.find(indexes => indexes[0] === parseInt(object.parentElement.id.slice(3)))[1]
                                                        .includes(parseInt(object.id.slice(3)))
                                                ) {
                                                    this.tabulatorAnimation(object);
                                                    object.classList.add('tabulator');
                                                }
                                            });
                                        }
                                    }
                                }
                                overallIndexes.push([i, tabulatorIndexes]);
                            }
                            this.changeSelectedInput();
                        } else {
                            this.vocabulary[this.wordIndex] = this.currentWord;

                            const transaction = this.database.transaction(`inflected vocabulary`, 'readwrite');
                            transaction.onerror = _ => console.error(transaction.error);
                            const objectStore = transaction.objectStore(`inflected vocabulary`);
                            const req = objectStore.get(this.wordIndex);
                            req.onerror = _ => console.error(req.error);
                            req.onsuccess = _ => {
                                for (let i = 0; i < this.container.childElementCount; i++) {
                                    this.container.children[i].classList.remove('savedElement');
                                    this.buttonLeft.classList.remove('click');
                                }

                                const idontcare = objectStore.put(this.currentWord, this.wordIndex + 1);
                                idontcare.onerror = _ => console.error(idontcare.error);

                                this.wordIndex = wi;

                                let tabulatorStyle = false;
                                this.currentWord = this.vocabulary[wi];
                                let overallIndexes: [number, number[]][] = [];
                                for (let i = 3; i < this.container.childElementCount; i++) {
                                    let tabulatorIndexes: number[] = [];
                                    let n = Math.floor(i / 3) - 1;
                                    let singular = this.currentWord.singular;
                                    let plural = this.currentWord.plural;
                                    if (i % 3 === 1) {
                                        this.container.children[i].innerHTML = '';
                                        for (let ii = 0; ii < singular[n].length; ii++) {
                                            if (singular[n].slice(ii, ii + 5) === '^tab^') {
                                                tabulatorStyle = !tabulatorStyle;
                                                ii += 4;
                                            } else {
                                                let object = document.createElement('object');
                                                object.data = './keys/OG_T.svg';
                                                object.id = `key${ii}-inp${i}`;
                                                object.style.height = `100%`;
                                                this.container.children[i].insertAdjacentElement('beforeend', object);
                                                if (tabulatorStyle) tabulatorIndexes.push(ii)

                                                object.addEventListener('load', _ => {
                                                    let svg = object.contentDocument;
                                                    svg.querySelector('#tspan7').innerHTML = singular[Math.floor(i / 3) - 1].charAt(ii);
                                                    if (overallIndexes.find(indexes => indexes[0] === parseInt(object.parentElement.id.slice(3))) != undefined &&
                                                        overallIndexes.find(indexes => indexes[0] === parseInt(object.parentElement.id.slice(3)))[1]
                                                            .includes(parseInt(object.id.slice(3)))
                                                    ) {
                                                        this.tabulatorAnimation(object);
                                                        object.classList.add('tabulator');
                                                    }
                                                })
                                            }
                                        }
                                        overallIndexes.push([i, tabulatorIndexes]);
                                    } else if (i % 3 === 2) {
                                        this.container.children[i].innerHTML = '';
                                        for (let ii = 0; ii < plural[Math.floor(i / 3) - 1].length; ii++) {
                                            if (plural[n].slice(ii, ii + 5) === '^tab^') {
                                                tabulatorStyle = !tabulatorStyle;
                                                ii += 4;
                                            } else {
                                                let object = document.createElement('object');
                                                object.data = './keys/OG_T.svg';
                                                object.id = `key${ii}-inp${i}`;
                                                object.style.height = `100%`;
                                                this.container.children[i].insertAdjacentElement('beforeend', object);
                                                if (tabulatorStyle) tabulatorIndexes.push(ii);

                                                object.addEventListener('load', _ => {
                                                    let svg = object.contentDocument;
                                                    svg.querySelector('#tspan7').innerHTML = plural[Math.floor(i / 3) - 1].charAt(ii);
                                                    if (overallIndexes.find(indexes => indexes[0] === parseInt(object.parentElement.id.slice(3))) != undefined &&
                                                        overallIndexes.find(indexes => indexes[0] === parseInt(object.parentElement.id.slice(3)))[1]
                                                            .includes(parseInt(object.id.slice(3)))
                                                    ) {
                                                        this.tabulatorAnimation(object);
                                                        object.classList.add('tabulator');
                                                    }
                                                });
                                            }
                                        }
                                        overallIndexes.push([i, tabulatorIndexes]);
                                    }
                                }
                            }
                        }
                    }
                };
                this.buttonLeft.addEventListener('mouseup', this.buttonLeftFunction);

                this.buttonRightFunction = _ => {
                    if (this.tabMode) {
                        this.cancelTabMode();
                    }

                    let vocab = this.vocabulary.slice(this.wordIndex + 1);
                    let wi = (vocab.findIndex(w => w.verb === param.includes('verb'))) >= 0 ? vocab.findIndex(w => w.verb === param.includes('verb')) + this.wordIndex + 1 : -1;

                    if (!this.vocabulary[wi]) {
                        this.vocabulary[this.wordIndex] = this.currentWord;

                        const transaction = this.database.transaction(`inflected vocabulary`, 'readwrite');
                        transaction.onerror = _ => console.error(transaction.error);
                        const objectStore = transaction.objectStore(`inflected vocabulary`);
                        const req = objectStore.put(this.currentWord, this.wordIndex + 1);
                        req.onerror = _ => console.error(req.error)
                        transaction.oncomplete = _ => {
                            for (let i = 0; i < this.container.childElementCount; i++) {
                                this.container.children[i].classList.remove('savedElement');
                                this.buttonRight.classList.remove('click');
                            }

                            this.wordIndex = this.vocabulary.length;
                            this.keys = 0;
                            this.currentWord = {
                                singular: this.empty(param),
                                plural: this.empty(param),
                                verb: param.includes('verb'),
                                probability: 1
                            };

                            for (let i = 3; i < this.container.childElementCount; i++) {
                                if (i % 3 != 0) {
                                    this.container.children[i].innerHTML = '';
                                }

                                this.container.children[i].classList.remove('selectedElement');
                            }
                            this.inputIndex = 4;
                            this.selectedInput = <HTMLDivElement>this.container.children[4];
                            this.tabCount = 0;
                            this.selectedInput.classList.add('selectedElement');
                        }
                    } else {
                        this.vocabulary[this.wordIndex] = this.currentWord;

                        for (let i = 0; i < this.container.childElementCount; i++) {
                            this.container.children[i].classList.remove('savedElement');
                            this.buttonRight.classList.remove('click');
                        }

                        const transaction = this.database.transaction(`inflected vocabulary`, 'readwrite');
                        transaction.onerror = _ => console.error(transaction.error);
                        const objectStore = transaction.objectStore(`inflected vocabulary`);
                        const req = objectStore.get(this.wordIndex);
                        req.onerror = _ => console.error(req.error);
                        req.onsuccess = _ => {
                            const idontcare = objectStore.put(this.currentWord, this.wordIndex + 1);
                            idontcare.onerror = _ => console.error(idontcare.error);

                            this.wordIndex = wi;
                            this.currentWord = <InflectedWord>this.vocabulary[wi];
                            let overallIndexes: [number, number[]][] = [];
                            let tabulatorStyle = false;
                            for (let i = 3; i < this.container.childElementCount; i++) {
                                let tabulatorIndexes: number[] = [];
                                let n = Math.floor(i / 3) - 1;
                                let singular = this.currentWord.singular;
                                let plural = this.currentWord.plural;
                                if (i % 3 === 1) {
                                    this.container.children[i].innerHTML = '';
                                    for (let ii = 0; ii < singular[Math.floor(i / 3) - 1].length; ii++) {
                                        if (singular[n].slice(ii, ii + 5) === '^tab^') {
                                            tabulatorStyle = !tabulatorStyle;
                                            ii += 4;
                                        } else {
                                            let object = document.createElement('object');
                                            object.data = './keys/OG_T.svg';
                                            object.id = `key${ii}-inp${i}`;
                                            object.style.height = `100%`;
                                            this.container.children[i].insertAdjacentElement('beforeend', object);
                                            if (tabulatorStyle) tabulatorIndexes.push(ii)

                                            object.addEventListener('load', _ => {
                                                let svg = object.contentDocument;
                                                svg.querySelector('#tspan7').innerHTML = singular[Math.floor(i / 3) - 1].charAt(ii);
                                                if (overallIndexes.find(indexes => indexes[0] === parseInt(object.parentElement.id.slice(3))) &&
                                                    overallIndexes.find(indexes => indexes[0] === parseInt(object.parentElement.id.slice(3)))[1]
                                                        .includes(parseInt(object.id.slice(3)))
                                                ) {
                                                    this.tabulatorAnimation(object);
                                                    object.classList.add('tabulator');
                                                }
                                            })
                                        }
                                    }
                                    overallIndexes.push([i, tabulatorIndexes]);
                                } else if (i % 3 === 2) {
                                    this.container.children[i].innerHTML = '';
                                    for (let ii = 0; ii < plural[Math.floor(i / 3) - 1].length; ii++) {
                                        if (plural[n].slice(ii, ii + 5) === '^tab^') {
                                            tabulatorStyle = !tabulatorStyle;
                                            ii += 4;
                                        } else {
                                            let object = document.createElement('object');
                                            object.data = './keys/OG_T.svg';
                                            object.id = `key${ii}-inp${i}`;
                                            object.style.height = `100%`;
                                            this.container.children[i].insertAdjacentElement('beforeend', object);
                                            if (tabulatorStyle) tabulatorIndexes.push(ii);

                                            object.addEventListener('load', _ => {
                                                let svg = object.contentDocument;
                                                svg.querySelector('#tspan7').innerHTML = plural[Math.floor(i / 3) - 1].charAt(ii);
                                                if (overallIndexes.find(indexes => indexes[0] === parseInt(object.parentElement.id.slice(3))) &&
                                                    overallIndexes.find(indexes => indexes[0] === parseInt(object.parentElement.id.slice(3)))[1]
                                                        .includes(parseInt(object.id.slice(3)))
                                                ) {
                                                    this.tabulatorAnimation(object);
                                                    object.classList.add('tabulator');
                                                }
                                            });
                                        }
                                    }
                                    overallIndexes.push([i, tabulatorIndexes]);
                                }
                                this.changeSelectedInput();
                            }
                        }
                    }
                };
                this.buttonRight.addEventListener('mouseup', this.buttonRightFunction);

                this.keydownFunction = (event: KeyboardEvent) => {
                    let forbiddenCharacters = ['´', '`', '^'];
                    if (this.commandMode) {
                        forbiddenCharacters.push('#');
                        if (event.key === 'Enter') {
                            if (this.command.endsWith('%')) {
                                if (this.command.startsWith('#p-')) {
                                    let percentage = parseInt(this.command.slice(3, this.command.length - 1));
                                    if (percentage >= 0 && percentage <= 100) {
                                        this.padding[this.inputIndex] = Math.round(Math.max(Math.min(this.padding[this.inputIndex] * (1 - percentage / 100), this.selectedInput.clientHeight / 2 * 0.7), 1));
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
                                        this.padding[this.inputIndex] = Math.round(Math.max(Math.min(this.padding[this.inputIndex] * (1 + percentage / 100), this.selectedInput.clientHeight / 2 * 0.7), 1));
                                        this.paddingAnimation(this.selectedInput);
                                        this.command.split('').forEach(_ => {
                                            this.selectedInput.lastElementChild.remove();
                                            this.keys--;
                                        });
                                        this.command = '';
                                        this.commandMode = false;
                                        return;
                                    }
                                } else if (this.command.startsWith('#P+')) {
                                    let percentage = parseInt(this.command.slice(3, this.command.length - 1));
                                    if (percentage >= 0) {
                                        this.padding.forEach((p, i) => {
                                            let div: HTMLDivElement = document.querySelector(`#div${i}`);
                                            if (i > 3 && i % 3 != 0) {
                                                this.padding[i] = Math.round(Math.max(Math.min(this.padding[i] * (1 + percentage / 100), div.clientHeight / 2 * 0.7), 1));
                                                this.paddingAnimation(div);
                                            }
                                        });
                                        this.command.split('').forEach(_ => {
                                            this.selectedInput.lastElementChild.remove();
                                            this.keys--;
                                        });
                                        this.command = '';
                                        this.commandMode = false;
                                        return;
                                    }
                                } else if (this.command.startsWith('#P-')) {
                                    let percentage = parseInt(this.command.slice(3, this.command.length - 1));
                                    if (percentage >= 0) {
                                        this.padding.forEach((p, i) => {
                                            let div: HTMLDivElement = document.querySelector(`#div${i}`);
                                            if (i % 3 != 0) {
                                                this.padding[i] = Math.round(Math.max(Math.min(this.padding[i] * (1 - percentage / 100), div.clientHeight / 2 * 0.7), 1));
                                                this.paddingAnimation(document.querySelector(`#div${i}`));
                                            }
                                        });
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
                                        this.selectedInput.lastElementChild.remove();
                                        this.keys--;
                                    });

                                    this.command = '';
                                    this.commandMode = false;
                                    this.changeSelectedInput();
                                    break;
                                }
                            }
                            return;
                        } else if (event.key === 'ArrowUp') {
                            this.command.split('').forEach(_ => {
                                this.selectedInput.removeChild(this.selectedInput.lastElementChild);
                                this.keys--;
                            });

                            if (this.inputIndex > 6) {
                                this.inputIndex -= 3;
                            }
                            this.changeSelectedInput();

                            this.command = '';
                            this.commandMode = false;
                            return;
                        } else if (event.key === 'ArrowDown') {
                            this.command.split('').forEach(_ => {
                                this.selectedInput.removeChild(this.selectedInput.lastElementChild);
                                this.keys--;
                            });

                            this.command = '';
                            this.commandMode = false;

                            if (this.inputIndex < 18 - this.v) {
                                this.inputIndex += 3;
                            }
                            this.changeSelectedInput();
                            return;
                        } else if (event.key === 'ArrowLeft') {
                            this.command.split('').forEach(_ => {
                                this.selectedInput.removeChild(this.selectedInput.lastElementChild);
                                this.keys--;
                            });

                            this.command = '';
                            this.commandMode = false;

                            if (this.inputIndex > 4) {
                                this.inputIndex--;
                                if (this.inputIndex % 3 === 0) {
                                    this.inputIndex--;
                                }

                                this.changeSelectedInput();
                            }
                            return;
                        } else if (event.key === 'ArrowRight') {
                            this.command.split('').forEach(_ => {
                                this.selectedInput.removeChild(this.selectedInput.lastElementChild);
                                this.keys--;
                            });

                            this.command = '';
                            this.commandMode = false;

                            if (this.inputIndex < 20 - this.v) {
                                this.inputIndex++;
                                if (this.inputIndex % 3 === 0) {
                                    this.inputIndex++;
                                }

                                this.changeSelectedInput();
                            }
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
                        }

                        if (
                            this.commandMode && (
                                this.selectedInput.classList.contains('known-case') ||
                                forbiddenCharacters.includes(event.key) ||
                                event.key.length > 1
                            )
                        ) {
                            return;
                        }
                    }

                    if (!this.commandMode) {
                        if (event.key === 'ArrowRight') {
                            if (this.tabMode) {
                                this.cancelTabMode();
                            }

                            if (this.inputIndex < 20 - this.v) {
                                this.inputIndex++;
                                if (this.inputIndex % 3 === 0) {
                                    this.inputIndex++;
                                }
                                this.changeSelectedInput();
                                this.keys = this.selectedInput.childElementCount;
                            }

                            return;
                        } else if (event.key === 'ArrowLeft') {
                            if (this.tabMode) {
                                this.cancelTabMode();
                            }

                            if (this.inputIndex > 4) {
                                this.inputIndex--;
                                if (this.inputIndex % 3 === 0) {
                                    this.inputIndex--;
                                }

                                this.changeSelectedInput();
                                this.keys = this.selectedInput.childElementCount;
                            }
                            return;
                        } else if (event.key === 'ArrowDown' || event.key === 'Enter') {
                            if (this.tabMode) {
                                this.cancelTabMode();
                                if (this.inputIndex === 19) {
                                    return;
                                }
                            }

                            if (this.inputIndex < 18 - this.v) {
                                this.inputIndex += 3;

                                this.changeSelectedInput();
                                this.keys = this.selectedInput.childElementCount;
                            } else if (event.key === 'Enter' && this.inputIndex === 19 - this.v) {
                                this.inputIndex = 5;

                                this.changeSelectedInput();
                                this.keys = this.selectedInput.childElementCount;
                            } else if (event.key === 'Enter' && this.inputIndex === 20 - this.v) {
                                document.querySelectorAll('.editable').forEach((element: HTMLDivElement) => {
                                    element.classList.add('savedElement');
                                });

                                if (this.enterMode) {
                                    let vocab = this.vocabulary.slice(this.wordIndex + 1);
                                    let wi = vocab.findIndex(w => w.verb === param.includes('verb'));

                                    if (!this.vocabulary[wi]) {
                                        this.vocabulary[this.wordIndex] = this.currentWord;

                                        const transaction = this.database.transaction(`inflected vocabulary`, 'readwrite');
                                        transaction.onerror = _ => console.error(transaction.error);
                                        const objectStore = transaction.objectStore(`inflected vocabulary`);
                                        const req = objectStore.put(this.currentWord, this.wordIndex + 1);
                                        req.onerror = _ => console.error(req.error)
                                        transaction.oncomplete = _ => {
                                            for (let i = 0; i < this.container.childElementCount; i++) {
                                                this.container.children[i].classList.remove('savedElement');
                                            }

                                            this.wordIndex++;
                                            this.keys = 0;
                                            this.currentWord = {
                                                singular: this.empty(param),
                                                plural: this.empty(param),
                                                verb: param.includes('verb'),
                                                probability: 1
                                            };

                                            for (let i = 0; i < this.container.childElementCount; i++) {
                                                if (i % 3 != 0) {
                                                    this.container.children[i].innerHTML = '';
                                                }

                                                this.container.children[i].classList.remove('selectedElement');
                                            }
                                            this.inputIndex = 4;
                                            this.selectedInput = <HTMLDivElement>this.container.children[4];
                                            this.tabCount = 0;
                                            this.selectedInput.classList.add('selectedElement');
                                        }
                                    } else {
                                        this.vocabulary[this.wordIndex] = this.currentWord;

                                        for (let i = 0; i < this.container.childElementCount; i++) {
                                            this.container.children[i].classList.remove('savedElement');
                                        }

                                        const transaction = this.database.transaction(`inflected vocabulary`, 'readwrite');
                                        transaction.onerror = _ => console.error(transaction.error);
                                        const objectStore = transaction.objectStore(`inflected vocabulary`);
                                        const req = objectStore.get(this.wordIndex);
                                        req.onerror = _ => console.error(req.error);
                                        req.onsuccess = _ => {
                                            const idontcare = objectStore.put(this.currentWord, this.wordIndex + 1);
                                            idontcare.onerror = _ => console.error(idontcare.error);

                                            this.wordIndex = wi;
                                            this.currentWord = <InflectedWord>this.vocabulary[wi];
                                            let overallIndexes: [number, number[]][] = [];
                                            let tabulatorStyle = false;
                                            for (let i = 3; i < this.container.childElementCount; i++) {
                                                let tabulatorIndexes: number[] = [];
                                                let n = Math.floor(i / 3) - 1;
                                                let singular = this.currentWord.singular;
                                                let plural = this.currentWord.plural;
                                                if (i % 3 === 1) {
                                                    this.container.children[i].innerHTML = '';
                                                    for (let ii = 0; ii < singular[Math.floor(i / 3) - 1].length; ii++) {
                                                        if (singular[n].slice(ii, ii + 5) === '^tab^') {
                                                            tabulatorStyle = !tabulatorStyle;
                                                            ii += 4;
                                                        } else {
                                                            let object = document.createElement('object');
                                                            object.data = './keys/OG_T.svg';
                                                            object.id = `key${ii}-inp${i}`;
                                                            object.style.height = `100%`;
                                                            this.container.children[i].insertAdjacentElement('beforeend', object);
                                                            if (tabulatorStyle) tabulatorIndexes.push(ii)

                                                            object.addEventListener('load', _ => {
                                                                let svg = object.contentDocument;
                                                                svg.querySelector('#tspan7').innerHTML = singular[Math.floor(i / 3) - 1].charAt(ii);
                                                                if (overallIndexes.find(indexes => indexes[0] === parseInt(object.parentElement.id.slice(3))) &&
                                                                    overallIndexes.find(indexes => indexes[0] === parseInt(object.parentElement.id.slice(3)))[1]
                                                                        .includes(parseInt(object.id.slice(3)))
                                                                ) {
                                                                    this.tabulatorAnimation(object);
                                                                    object.classList.add('tabulator');
                                                                }
                                                            })
                                                        }
                                                    }
                                                    overallIndexes.push([i, tabulatorIndexes]);
                                                } else if (i % 3 === 2) {
                                                    this.container.children[i].innerHTML = '';
                                                    for (let ii = 0; ii < plural[Math.floor(i / 3) - 1].length; ii++) {
                                                        if (plural[n].slice(ii, ii + 5) === '^tab^') {
                                                            tabulatorStyle = !tabulatorStyle;
                                                            ii += 4;
                                                        } else {
                                                            let object = document.createElement('object');
                                                            object.data = './keys/OG_T.svg';
                                                            object.id = `key${ii}-inp${i}`;
                                                            object.style.height = `100%`;
                                                            this.container.children[i].insertAdjacentElement('beforeend', object);
                                                            if (tabulatorStyle) tabulatorIndexes.push(ii);

                                                            object.addEventListener('load', _ => {
                                                                let svg = object.contentDocument;
                                                                svg.querySelector('#tspan7').innerHTML = plural[Math.floor(i / 3) - 1].charAt(ii);
                                                                if (overallIndexes.find(indexes => indexes[0] === parseInt(object.parentElement.id.slice(3))) &&
                                                                    overallIndexes.find(indexes => indexes[0] === parseInt(object.parentElement.id.slice(3)))[1]
                                                                        .includes(parseInt(object.id.slice(3)))
                                                                ) {
                                                                    this.tabulatorAnimation(object);
                                                                    object.classList.add('tabulator');
                                                                }
                                                            });
                                                        }
                                                    }
                                                    overallIndexes.push([i, tabulatorIndexes]);
                                                }
                                                this.changeSelectedInput();
                                            }
                                        }
                                    }

                                    this.enterMode = false;
                                } else {
                                    this.enterMode = true;
                                }

                                const transaction = this.database.transaction('inflected vocabulary', 'readwrite');
                                const objectStore = transaction.objectStore('inflected vocabulary');
                                const req = objectStore.put(this.currentWord, this.wordIndex + 1);
                                req.onerror = _ => console.error(req.error);
                                setTimeout(_ => {
                                    for (let i = 0; i < this.container.childElementCount; i++) {
                                        this.container.children[i].classList.remove('savedElement');
                                    }
                                }, 250);
                            }

                            return;
                        } else if (event.key === 'ArrowUp') {
                            if (this.tabMode) {
                                this.cancelTabMode();
                            }
                            if (this.inputIndex > 6) {
                                this.inputIndex -= 3;

                                this.changeSelectedInput();
                                this.keys = this.selectedInput.childElementCount;
                            }

                            return;
                        } else if (event.key === 'Backspace') {
                            if (this.selectedInput.lastElementChild) {
                                this.selectedInput.lastElementChild.remove();

                                let array = <string[]>Object.values(this.currentWord)[this.inputIndex % 3 - 1];
                                let n = Math.floor(this.inputIndex / 3) - 1;
                                if (array[n].slice(-5) === '^tab^') {
                                    array[n] = array[n].slice(0, array[n].length - 6);
                                    if (this.tabCount > 1) this.tabCount--;
                                    this.tabMode = !this.tabMode;
                                    this.selectedInput.classList.add('tab');
                                    if (!this.tabMode) {
                                        this.selectedInput.classList.remove('tab');
                                    }
                                } else {
                                    array[n] = array[n].slice(0, array[n].length - 1);
                                }
                                Object.defineProperty(
                                    this.currentWord,
                                    Object.keys(this.currentWord)[this.inputIndex % 3 - 1],
                                    { value: array }
                                );
                                this.keys--;

                                if (this.tabMode) {
                                    this.tabulator = this.tabulator.slice(0, this.tabulator.length - 1);
                                }
                            } else if (this.tabMode) {
                                this.cancelTabMode();
                            }

                            return;
                        } else if (event.key === '#') {
                            this.command = '';
                            this.commandMode = true;
                        } else if (event.key === 'Tab') {
                            if (!this.tabMode) {
                                if (this.tabCount >= 2) {
                                    let array = <string[]>Object.values(this.currentWord)[this.inputIndex % 3 - 1];
                                    let n = Math.floor(this.inputIndex / 3) - 1;
                                    let index: number;
                                    while (array[n].search('\\^tab\\^') !== -1) {
                                        let c = array[n].search('\\^tab\\^');
                                        if (index === undefined) index = c;
                                        array[n] = array[n].slice(0, c) + array[n].slice(c + 5, array[n].length);
                                    }

                                    array[n] = array[n].slice(0, index) + '^tab^' + array[n].slice(index, array[n].length);
                                    Object.defineProperty(
                                        this.currentWord,
                                        Object.keys(this.currentWord)[this.inputIndex % 3 - 1],
                                        { value: array }
                                    );

                                    let tabulatorStyle = false;
                                    for (let i = 0; i < array[n].length; i++) {
                                        if (array[n].slice(i, i + 5) === '^tab^') {
                                            tabulatorStyle = !tabulatorStyle;
                                            i += 4;
                                        } else if (this.selectedInput.children[i > index ? i - 5 : i]) {
                                            let object = <HTMLObjectElement>this.selectedInput.children[i > index ? i - 5 : i];
                                            let svg = object.contentDocument;
                                            svg.querySelector('#tspan7').innerHTML = array[n].charAt(i);
                                            if (tabulatorStyle) {
                                                this.tabulatorAnimation(object);
                                                object.classList.add('tabulator');
                                            } else {
                                                object.classList.remove('tabulator');
                                            }
                                            this.selectedInput.children[i]
                                        }
                                    }
                                    this.tabulator = array[n].slice(index + 5, array[n].length);
                                    this.tabCount = 1;
                                    this.tabMode = true;
                                    this.selectedInput.classList.add('tab');
                                } else {
                                    this.tabMode = true;
                                    this.selectedInput.classList.add('tab');
                                    let array = <string[]>Object.values(this.currentWord)[this.inputIndex % 3 - 1];
                                    array[Math.floor(this.inputIndex / 3) - 1] += "^tab^";
                                    Object.defineProperty(
                                        this.currentWord,
                                        Object.keys(this.currentWord)[this.inputIndex % 3 - 1],
                                        { value: array }
                                    );
                                    this.tabCount++;
                                }
                            } else if (this.tabulator.length > 0) {
                                if (Object.values(this.currentWord)[this.inputIndex % 3 - 1][Math.floor(this.inputIndex / 3) - 1].slice(-5) != '^tab^') {
                                    this.tabMode = false;
                                    this.selectedInput.classList.remove('tab');
                                    let array = <string[]>Object.values(this.currentWord)[this.inputIndex % 3 - 1];
                                    array[Math.floor(this.inputIndex / 3) - 1] += "^tab^";
                                    Object.defineProperty(
                                        this.currentWord,
                                        Object.keys(this.currentWord)[this.inputIndex % 3 - 1],
                                        { value: array }
                                    );
                                    this.tabCount++;
                                } else {
                                    let array = <string[]>Object.values(this.currentWord)[this.inputIndex % 3 - 1];
                                    let n = Math.floor(this.inputIndex / 3) - 1
                                    array[n] += this.tabulator + "^tab^";
                                    let index = array[n].search(this.tabulator);
                                    if (index === -1) { index = 0; }
                                    if (
                                        this.keys + this.tabulator.length <=
                                        Math.floor(this.selectedInput.clientWidth / (this.selectedInput.clientHeight - parseFloat(this.selectedInput.style.padding)))
                                    ) {
                                        for (let i = 0; i < this.tabulator.length; i++) {
                                            let object = document.createElement('object');
                                            object.data = './keys/OG_T.svg';
                                            object.id = `key${this.keys}-inp${this.inputIndex}`;
                                            object.style.height = `100%`;
                                            this.selectedInput.insertAdjacentElement('beforeend', object);
                                            object.hidden = true;
                                            object.addEventListener('load', _ => {
                                                object.hidden = false;
                                                this.tabulatorAnimation(object);
                                                object.classList.add('tabulator');
                                                let svg = object.contentDocument;
                                                svg.querySelector('#tspan7').innerHTML = this.tabulator.charAt(i);
                                                if (i === this.tabulator.length - 1) {
                                                }
                                            });
                                            this.keys++;
                                        }
                                    } else {
                                        for (let ii = 0; ii < this.keys; ii++) {
                                            this.failureAnimation(<HTMLObjectElement>this.selectedInput.children[ii]);
                                        }
                                        return;
                                    }


                                    Object.defineProperty(
                                        this.currentWord,
                                        Object.keys(this.currentWord)[this.inputIndex % 3 - 1],
                                        { value: array }
                                    );
                                    this.tabMode = false;
                                    this.tabCount++;
                                    this.selectedInput.classList.remove('tab');
                                }
                            } else {
                                this.tabCount = 0;
                                this.cancelTabMode();
                            }
                            return;
                        } else if (forbiddenCharacters.includes(event.key) || event.key.length > 1) {
                            return;
                        }
                    }
                    this.enterMode = false;

                    let object = document.createElement('object');
                    object.data = './keys/OG_T.svg';
                    object.id = `key${this.keys}-inp${this.inputIndex}`;
                    object.style.height = `100%`;
                    this.selectedInput.insertAdjacentElement('beforeend', object);
                    let width = object.clientHeight;
                    object.hidden = true;

                    object.addEventListener('load', _ => {
                        if (this.keys + 1 >= Math.floor(this.selectedInput.clientWidth / width)) {
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

                        let n = Math.floor(this.inputIndex / 3) - 1
                        let array = Object.values(this.currentWord)[this.inputIndex % 3 - 1];
                        if (!this.commandMode) {
                            let arr = Object.values(this.currentWord)[this.inputIndex % 3 - 1];
                            arr[Math.floor(this.inputIndex / 3) - 1] += event.key;
                            Object.defineProperty(
                                this.currentWord,
                                Object.keys(this.currentWord)[this.inputIndex % 3 - 1],
                                { value: array }
                            );
                        } else {
                            this.command += event.key;
                            training.commandAnimation(object);
                        }

                        if (this.tabMode) {
                            if (array[n].slice(-6, -1) === '^tab^') {
                                this.tabulator = '';
                            }
                            this.tabulator += event.key;
                            this.tabulatorAnimation(object);
                            object.classList.add('tabulator');
                        } else {
                            this.idleAnimation(object);
                        }

                        this.keys++;
                    });
                }

                document.addEventListener('keydown', this.keydownFunction);

                window.onkeyup = event => {
                    if (event.key === 'Tab') {
                        this.container.focus();
                    }
                }

                break;
            default:
                break;
        }

    }

    empty(param: Parameter): [string, string, string] | [string, string, string, string, string, string] {
        let l = param.includes('verb') ? 3 : 6;
        let array = [];
        for (let i = 0; i < l; i++) {
            array.push('');
        }
        return <[string, string, string] | [string, string, string, string, string, string]>array;
    }

    changeSelectedInput(): void {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.selectedInput.style.padding = `${this.padding[parseInt(this.selectedInput.id.slice(3, 5))]}px ${0.05 * this.selectedInput.offsetHeight}px`;
            this.selectedInput.style.transition = 'none';
            this.selectedInput.style.border = 'none';
        }
        document.querySelectorAll('.selectedElement').forEach(elem => elem.classList.remove('selectedElement'));
        this.selectedInput = <HTMLDivElement>document.getElementById(`div${this.inputIndex}`);
        let word = <string>Object.values(this.currentWord)[this.inputIndex % 3 - 1][(Math.floor(this.inputIndex / 3) - 1)];
        let regex = new RegExp('\\^tab\\^', 'g');
        let matches = word.match(regex);
        this.tabCount = matches ? matches.length : 0;
        if (!matches ? false : matches.length % 2 === 0) {
            this.selectedInput.classList.remove('tab');
        }
        this.selectedInput.classList.add('selectedElement');
        this.keys = this.selectedInput.childElementCount;
        this.paddingAnimation(this.selectedInput);
    }

    cancelTabMode(): void {
        let array = <[string, string, string, string, string, string]>Object.values(this.currentWord)[this.inputIndex % 3 - 1];
        let n = Math.floor(this.inputIndex / 3) - 1;
        if (array[n].includes('^tab^')) {
            let start_end: number[] = [];
            while (array[n].search('\\^tab\\^') >= 0) {
                let c = array[n].search('\\^tab\\^');
                array[n] = array[n].slice(0, c) + array[n].slice(c + 5, array[n].length);
                start_end.push(c);
            }

            if (start_end.length === 1) {
                start_end.push(array[n].length);
            }
            let tab = array[n].slice(start_end[0], start_end[1]);

            for (let i = 0; i < tab.length; i++) {
                this.selectedInput.children[start_end[0]].remove();
            }
            array[n] = array[n].slice(0, start_end[0]) + array[n].slice(start_end[1], array[n].length);
            this.keys -= tab.length;
        }
        this.tabMode = false;
        this.selectedInput.classList.remove('tab');
    }

    findMostUsedTabulator(inflectedWord: InflectedWord): string {
        if (inflectedWord.singular) {
            let tabs =
                inflectedWord.singular.map(word => {
                    if (word.includes('^tab^')) {
                        let w = word;
                        let start: number;
                        let end = w.length;
                        while (w.includes('^tab^')) {
                            let index = w.search('\\^tab\\^');
                            w = w.slice(0, index) + w.slice(index + 5, end);
                            if (start === undefined) {
                                start = index;
                            } else {
                                end = index;
                            }
                        }
                        return w.slice(start ? start : 0, end);
                    }
                }).concat(
                    inflectedWord.plural.map(word => {
                        if (word.includes('^tab^')) {
                            let w = word;
                            let start: number;
                            let end = w.length;
                            while (w.includes('^tab^')) {
                                let index = w.search('\\^tab\\^');
                                w = w.slice(0, index) + w.slice(index + 5, end);
                                if (start === undefined) {
                                    start = index;
                                } else {
                                    end = index;
                                }
                            }
                            return w.slice(start ? start : 0, end);
                        }
                    })
                ).filter(word => word != undefined);

            let checkedTabs: [string, number][] = [];
            tabs.forEach((tab) => {
                if (!checkedTabs.map(t => t[0]).includes(tab)) {
                    checkedTabs.push([tab, 1]);
                } else {
                    let i = checkedTabs.findIndex(t => t[0] === tab);
                    checkedTabs[i] = [tab, checkedTabs[i][1] + 1];
                }
            });

            for (let i = 0; i < checkedTabs.length; i++) {
                checkedTabs.sort((a, b) => b[1] - a[1]);
            }

            return checkedTabs.length > 0 ? checkedTabs[0][0] : undefined;
        } else return undefined;
    }

    startNewTrainingRound(param: Parameter): void {
        let vocab = this.vocabulary.filter(w => w.verb === param.includes('verb'));
        if (vocab.length === 0) {
            setTimeout(_ => alert(`Keine ${param.includes('verb') ? 'Konjugationen' : 'Deklinationen'}!`), 250);
            return;
        } else if (vocab.filter(w => !isEmpty(w)).length === 0) {
            setTimeout(_ => alert(`Nur leere ${param.includes('verb') ? 'Konjugationen' : 'Deklinationen'}!`), 250);
            return;
        }

        function isEmpty(w: InflectedWord) {
            return w.singular.filter(s => s.trim() === '').length === (param.includes('verb') ? 6 : 3) &&
                w.plural.filter(p => p.trim() === '').length === (param.includes('verb') ? 6 : 3);
        }

        this.round++;
        let overallProbabilty = 0;
        vocab.forEach(word => { if (!isEmpty(word)) overallProbabilty += word.probability });

        let randomNumber = Math.floor(Math.random() * overallProbabilty * 10) / 10;
        let lowestDifference: number;
        let lastProbability = 0;
        this.failures = 0;

        this.vocabulary.forEach((word, i) => {
            if (!isEmpty(word) && word.verb === param.includes('verb')) {
                if (lowestDifference === undefined) {
                    lowestDifference = Math.abs(randomNumber - (lastProbability + word.probability));
                    this.currentWord = word;
                    this.currentWordIndex = i;
                } else if (Math.abs(randomNumber - (lastProbability + word.probability)) < lowestDifference) {
                    lowestDifference = Math.abs(randomNumber - (lastProbability + word.probability));
                    this.currentWordIndex = i;
                    this.currentWord = word;
                }
                lastProbability += word.probability;
            }
        });

        this.tabulator = this.findMostUsedTabulator(this.currentWord);
        document.querySelectorAll('.editable').forEach(div => {
            div.innerHTML = '';
            div.classList.remove('redShadowDesign');
            div.classList.remove('greenShadowDesign');
            div.classList.remove('known-case');
            div.classList.add('shadowDesign');
        });

        let knownCase: string;
        let rn: number;
        let v = this.v / 3;
        do {
            rn = Math.floor(Math.random() * (param.includes('verb') ? 6 : 12));
            knownCase = Object.values(this.vocabulary[this.currentWordIndex])[rn > 5 - v ? 1 : 0][rn > 5 - v ? rn - 6 + v : rn];
        } while (knownCase === '');

        while (knownCase.includes('^tab^')) {
            let index = knownCase.search('\\^tab\\^');
            knownCase = knownCase.slice(0, index) + knownCase.slice(index + 5, knownCase.length);
        }

        let specificationDiv = document.getElementById(`div${rn > 5 - v ? 2 + (rn - 5 + v) * 3 : 1 + (rn + 1) * 3}`);
        specificationDiv.classList.add('known-case');
        specificationDiv.innerHTML = `<span>${knownCase}</span>`;

        let array = this.empty(param);
        array[rn > 5 - v ? rn - 6 + v : rn] = knownCase;
        this.currentWord = {
            singular: rn <= 5 - v ? array : this.empty(param),
            plural: rn > 5 - v ? array : this.empty(param),
            verb: param.includes('verb'),
            probability: this.currentWord.probability
        };

        this.result = {
            singular: param.includes('verb') ? [undefined, undefined, undefined] : [undefined, undefined, undefined, undefined, undefined, undefined],
            plural: param.includes('verb') ? [undefined, undefined, undefined] : [undefined, undefined, undefined, undefined, undefined, undefined]
        }
    }

    compare(string1: string, string2: string): boolean {
        while (string1.includes('^tab^')) {
            let index = string1.search('\\^tab\\^');
            string1 = string1.slice(0, index) + string1.slice(index + 5, string1.length);
        }

        while (string2.includes('^tab^')) {
            let index = string2.search('\\^tab\\^');
            string2 = string2.slice(0, index) + string2.slice(index + 5, string2.length);
        }
        return string1 === string2;
    }

    compareObjects(obj1: InflectedWord, obj2: InflectedWord): boolean {
        let object1 = JSON.parse(JSON.stringify(obj1));
        let object2 = JSON.parse(JSON.stringify(obj2));

        object1.singular.forEach((word, i) => {
            while (word.includes('^tab^')) {
                let index = word.search('\\^tab\\^');
                word = word.slice(0, index) + word.slice(index + 5, word.length);
            }
            object1.singular[i] = word;
        });

        object1.plural.forEach((word, i) => {
            while (word.includes('^tab^')) {
                let index = word.search('\\^tab\\^');
                word = word.slice(0, index) + word.slice(index + 5, word.length);
            }
            object1.plural[i] = word;
        });

        object2.singular.forEach((word, i) => {
            while (word.includes('^tab^')) {
                let index = word.search('\\^tab\\^');
                word = word.slice(0, index) + word.slice(index + 5, word.length);
            }
            object2.singular[i] = word;
        });

        object2.plural.forEach((word, i) => {
            while (word.includes('^tab^')) {
                let index = word.search('\\^tab\\^');
                word = word.slice(0, index) + word.slice(index + 5, word.length);
            }
            object2.plural[i] = word;
        });

        return Object.values(object1).slice(0, 3).toLocaleString() === Object.values(object2).slice(0, 3).toLocaleString();
    }

    failureAnimation(object: HTMLObjectElement): void {
        if (!object) {
            return;
        }

        let svg = object.contentDocument;
        let rect = svg.querySelector('#mainRect');
        let text = svg.querySelector('#text7');
        let animationKeyframes: Keyframe[] = [
            { stroke: this.badColor, offset: 0.025 },

            { rotate: "10deg z", offset: 0.25 },

            { rotate: "0deg z", offset: 0.5 },

            { rotate: "-10deg z", offset: 0.75, stroke: this.badColor },

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

    tabulatorAnimation(object: HTMLObjectElement): void {
        if (!object) {
            return;
        }

        let svg = object.contentDocument;
        let rect = svg.querySelector('#mainRect');
        let text = svg.querySelector('#text7');
        let animationKeyframes: PropertyIndexedKeyframes = {
            stroke: ['#eeeeeeff', this.badColor === 'rgb(186, 2, 70)' ? '#4400ff' : 'rgb(211, 0, 0)'],
            offset: [0, 1]
        }

        let animationOptions: KeyframeAnimationOptions = {
            duration: 250,
            fill: 'forwards'
        }

        rect.animate(animationKeyframes, animationOptions);
        text.animate(animationKeyframes, animationOptions);
    }

    successAnimation(object: HTMLObjectElement): void {
        if (!object) {
            return;
        }

        let svg = object.contentDocument;
        let rect = svg.querySelector('#mainRect');
        let text = svg.querySelector('#text7');
        let animationKeyframes: PropertyIndexedKeyframes = {
            stroke: ['#eeeeeeff', '#08a000', '#eeeeeeff'],
            offset: [0, 1]
        }

        let animationOptions: KeyframeAnimationOptions = {
            duration: 500
        }

        rect.animate(animationKeyframes, animationOptions);
        text.animate(animationKeyframes, animationOptions);
    }

    deletionAnimation(element: Element, duration: number, direction: PlaybackDirection): void {
        if (element.tagName === 'OBJECT') {
            let object = <HTMLObjectElement>element;
            let svg = object.contentDocument;
            let rect = svg.querySelector('#mainRect');
            let text = svg.querySelector('#text7');
            let animationKeyframes: PropertyIndexedKeyframes = {
                stroke: [object.classList.contains('tabulator') ? (this.badColor === 'rgb(186, 2, 70)' ? '#4400ff' : 'rgb(211, 0, 0)') : '#eeeeeeff', this.badColor],
                offset: [0, 1]
            }

            let animationOptions: KeyframeAnimationOptions = {
                duration: duration,
                fill: 'forwards',
                direction: direction
            }

            rect.animate(animationKeyframes, animationOptions);
            text.animate(animationKeyframes, animationOptions);
        } else if (element.tagName === 'BUTTON') {
            let animationKeyframes: PropertyIndexedKeyframes = {
                backgroundColor: [this.badColor === 'rgb(186, 2, 70)' ? '#ff0000' : this.badColor, this.badColor === 'rgb(186, 2, 70)' ? '#ba0303' : '#ad0668'],
                boxShadow: [`0 0 0 0 ${this.badColor === 'rgb(186, 2, 70)' ? '#ba0303' : '#ad0668'}`, `0 0 1vh 1vh ${this.badColor === 'rgb(186, 2, 70)' ? '#ff0000' : this.badColor}`],
                color: ['#ffffff', '#eeffff'],
                border: ['none', 'none',],
                offset: [0, 1]
            }

            let animationOptions: KeyframeAnimationOptions = {
                duration: duration,
                fill: 'forwards',
                direction: direction
            }

            element.animate(animationKeyframes, animationOptions);
        }
    }

    paddingAnimation(input: HTMLDivElement): void {
        if (input.classList.contains('known-case')) {
            return;
        }

        let id = parseInt(input.id.slice(3, 5));
        let borderLeft = 0.05 * input.offsetHeight;

        input.style.padding = '0';
        input.style.willChange = 'border-width';
        input.style.borderTopWidth = `${this.padding[id]}px`;
        input.style.borderRightWidth = `${borderLeft}px`;
        input.style.borderBottomWidth = `${this.padding[id]}px`;
        input.style.borderLeftWidth = `${borderLeft}px`;
        input.style.borderStyle = 'solid';
        input.style.borderColor = '#12dada';
        input.style.transition = 'none';
        input.style.paddingLeft = borderLeft - parseInt(window.getComputedStyle(input).borderLeft.slice(0, -2)) + 'px';

        setTimeout(_ => {
            input.style.borderColor = '#06011b';
            input.style.transition = "border-color 1.5s";

            this.timeout = setTimeout(_ => {
                input.style.padding = `${this.padding[id]}px ${0.05 * input.offsetHeight}px`;
                input.style.border = 'none';
                input.style.transition = 'none';
            }, 1500);
        }, 1);
    }
}

type Parameter = 'nouns' | 'verbs' | 'add nouns' | 'add verbs';

export interface InflectedWord {
    singular: [string, string, string, string, string, string] | [string, string, string];
    plural: [string, string, string, string, string, string] | [string, string, string];
    verb: boolean;
    probability: number;
}