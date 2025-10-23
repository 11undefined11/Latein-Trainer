import { addVocabulary, createDiv, home, removeAllEventListeners } from "..";
import { WordBundle } from "./add-vocabulary";
import { InflectedWord, InflectVocabulary } from "./inflect-vocabulary";

export class VocabularyTraining {
    container: HTMLDivElement;
    iconPlaceholder: HTMLDivElement;
    navbar: HTMLDivElement;

    vocabulary: WordBundle[];
    database: IDBDatabase;

    keyDownFunction: EventListener;
    mouseOverFunction: EventListener;
    resizeFunction: EventListener;

    currentWord: WordBundle;
    currentWordIndex: number;

    totalAttempts = 0;
    totalPoints = 0;
    result: [boolean, boolean, boolean, boolean];

    commandMode = false;
    command = '';
    padding: [number, number, number, number] = [0, 0, 0, 0];

    selectedInput: HTMLDivElement;
    inputIndex = 0;

    time = 0;
    round = 0;
    keys = 0;
    backgroundColor = '#140063';

    constructor() {
        this.resizeFunction = () => {
            let inputs = document.querySelectorAll('.inp');
            inputs.forEach((inp: HTMLDivElement) => {
                if (inp.firstChild && !inp.classList.contains('not-editable')) {
                    let object = <HTMLObjectElement>inp.lastElementChild;
                    if (!object || !object.contentDocument) return;
                    let w = window.innerWidth;
                    let aspectRatio = object.getBoundingClientRect().height / object.getBoundingClientRect().width;
                    let h = (w / (inp.childElementCount + 1)) * aspectRatio;
                    let padding = (inp.getBoundingClientRect().height - h) / 2;
                    this.padding[inp.id.charAt(3)] = Math.max(padding, 0.1);
                    this.movementAnimation(inp);
                } else if (inp.classList.contains('not-editable') && inp.querySelector("span")) {
                    let max = inp.clientHeight * 0.6;
                    let fontSize: number;

                    let span = <HTMLSpanElement>document.querySelector(`#${inp.id} span`);
                    span.style.whiteSpace = 'nowrap';
                    span.style.display = 'inline-block';
                    span.style.width = 'auto';
                    span.style.fontSize = max + 'px';
                    while (span.scrollWidth > inp.clientWidth * 0.95 || span.clientHeight > max) {
                        fontSize = parseInt(span.style.fontSize.slice(0, -2));
                        if (fontSize <= 1) break;
                        span.style.fontSize = (fontSize - 1) + 'px';
                    }
                }
            });
        }
    }

    modifyDocument(): void {
        window.addEventListener('resize', this.resizeFunction);

        const request = window.indexedDB.open('Vocabulary', 2);

        request.addEventListener('error', _ => {
            this.vocabulary = [];
            this.modifyDocument();
            console.error(request.error);
        });

        request.addEventListener('success', _ => {
            this.database = request.result;

            const transaction = this.database.transaction('vocabulary', 'readonly');
            transaction.onerror = () => console.error(transaction.error);
            const objectStore = transaction.objectStore('vocabulary');
            const req = objectStore.getAll();
            req.onerror = () => console.error(req.error);
            req.onsuccess = () => {
                this.vocabulary = req.result;
                this.backgroundColor = '#140063'
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

                let trainingIcon = document.createElement('object');
                trainingIcon.data = './training.svg';
                trainingIcon.id = 'trainingIcon';
                this.iconPlaceholder.insertAdjacentElement('beforeend', trainingIcon);

                document.body.classList.add("trainingBody");
                this.container.classList.add("trainingContainer");
                this.iconPlaceholder.classList.add("trainingIconPlaceholder");
                this.navbar.classList.add("trainingNavbar");

                let classes = 'inp bg inp bg inp bg inp'.split(' ');
                for (let i = 0; i < classes.length; i++) {
                    let div = createDiv(`div${i}`, `${classes[i]}`, `100%`, `${100 / classes.length}%`);
                    div.classList.add('t');
                    this.container.appendChild(div);
                    div.style.padding = `${0.05 * div.offsetHeight}px`;
                }

                this.mouseOverFunction = (event: MouseEvent) => {
                    let homeDiv = <HTMLDivElement>document.querySelector('.homeDiv');
                    if (
                        homeDiv &&
                        homeDiv != event.target &&
                        event.target != this.navbar &&
                        !(
                            document.querySelector('.homeButton') &&
                            event.target === document.querySelector('.homeButton')
                        ) &&
                        event.target != document.querySelector('.homeIcon')
                    ) {
                        homeDiv.classList.remove('moveUp');
                        setTimeout(_ => homeDiv.classList.add('moveDown'), 0);
                    } else if (!(
                        event.target != this.navbar &&
                        !(
                            document.querySelector('.homeButton') &&
                            event.target === document.querySelector('.homeButton')
                        ) &&
                        event.target != document.querySelector('.homeIcon')
                    )) {
                        if (!homeDiv.classList.contains('moveUp')) {
                            homeDiv.classList.remove('moveDown');
                            homeDiv.classList.add('moveUp');
                        }
                    }
                    if (!homeDiv) {
                        let hd = document.createElement('div');
                        hd.setAttribute('class', 'homeDiv');
                        this.navbar.insertAdjacentElement('afterend', hd);

                        let button = document.createElement('div');
                        button.classList.add('homeButton');

                        let icon = document.createElement('object');
                        icon.classList.add('homeIcon');
                        icon.data = './home.svg';
                        icon.style.height = '6vh';

                        hd.insertAdjacentElement('beforeend', button);
                        button.insertAdjacentElement('beforeend', icon);

                        let clickFunction = () => {
                            removeAllEventListeners();
                            home.modifyDocument();
                            return;
                        }

                        button.addEventListener('click', clickFunction);
                        icon.addEventListener('load', _ => {
                            icon.contentDocument.addEventListener('click', clickFunction);
                        })
                    }
                }
                document.addEventListener('mouseover', this.mouseOverFunction);

                this.type();
            }
        });
    }

    type(): void {
        let inputs = [0, 2, 4, 6];

        for (let i = 0; i < this.container.childElementCount; i += 2) {
            this.container.children[i].addEventListener('click', _ => {
                this.inputIndex = i / 2;
                this.selectedInput = <HTMLDivElement>this.container.children[i];
                this.inputStyling();
                this.keys = this.selectedInput.childElementCount;
            });
        };

        for (let i = 1; i < this.container.childElementCount; i += 2) {
            this.container.children[i].addEventListener('click', (event: MouseEvent) => {
                if (event.offsetY > this.container.children[i].clientHeight / 2) {
                    this.inputIndex = (i + 1) / 2;
                    this.selectedInput = <HTMLDivElement>this.container.children[i + 1];
                    this.inputStyling();
                    this.keys = this.selectedInput.childElementCount;
                } else {
                    this.inputIndex = (i - 1) / 2;
                    this.selectedInput = <HTMLDivElement>this.container.children[i - 1];
                    this.inputStyling();
                    this.keys = this.selectedInput.childElementCount;
                }
            });
        }

        this.selectedInput = <HTMLDivElement>this.container.children[inputs[this.inputIndex]];
        this.inputStyling();

        this.keyDownFunction = (event: KeyboardEvent) => {
            let mode = this.commandMode;
            let forbiddenCharacters = ['<', '´', '`', '^'];

            if (this.commandMode) {
                if (event.key === 'Enter') {
                    switch (this.command.toLowerCase()) {
                        case '#hint':
                        case '#t':
                        case '#tip':
                        case '#tipp':
                            this.command.split('').forEach(_ => {
                                this.returnLastElement(this.selectedInput).remove();
                                this.keys--;
                                if (this.selectedInput.firstChild) {
                                    this.movementAnimation(this.selectedInput);
                                }
                            });

                            let object = document.createElement('object');
                            object.data = './keys/Reversion_T.svg';
                            object.id = `key${this.keys}-inp${this.inputIndex}`;
                            object.style.height = `100%`;
                            let width = object.clientHeight;

                            let index = 0;
                            let word = <string>Object.values(this.currentWord)[this.inputIndex];
                            let str = '';
                            let maxLength: number;
                            let changeMade = false;
                            for (let i = 0; i < word.length; i++) {

                                if (word[i] != Object.values(this.vocabulary[this.currentWordIndex])[this.inputIndex][i] && !changeMade) {
                                    index = i;
                                    if (this.vocabulary[this.currentWordIndex][Object.keys(this.vocabulary[this.currentWordIndex])[this.inputIndex]][index]) {
                                        str += this.vocabulary[this.currentWordIndex][Object.keys(this.vocabulary[this.currentWordIndex])[this.inputIndex]][index];
                                    } else {
                                        maxLength = word.length - 1;
                                    }

                                    changeMade = true;
                                } else {
                                    str += word[i];
                                }
                            }

                            this.currentWord[Object.keys(this.currentWord)[this.inputIndex]] = (maxLength) ? str.slice(0, maxLength) : str;
                            word = (maxLength) ? str.slice(0, maxLength) : str;

                            if (maxLength) {
                                this.returnLastElement(this.selectedInput).remove();
                                this.movementAnimation(this.selectedInput);
                                this.keys--;
                                mode = false;
                                this.commandMode = false;
                                break;
                            }

                            if (!changeMade) {
                                index = word.length;
                                if (word.length < Object.values(this.vocabulary[this.currentWordIndex])[this.inputIndex].length) {
                                    this.currentWord[Object.keys(this.currentWord)[this.inputIndex]] +=
                                        Object.values(this.vocabulary[this.currentWordIndex])[this.inputIndex][index];
                                } else {
                                    mode = false;
                                    this.commandMode = false;
                                    break;
                                }
                            }

                            if (word.length > 0 && index < word.length) {
                                this.selectedInput.children[index].replaceWith(object);
                                this.keys--;
                                object.hidden = true;
                            } else {
                                this.selectedInput.insertAdjacentElement('beforeend', object);
                                object.hidden = true;
                            }

                            object.addEventListener('load', _ => {
                                if (this.keys >= Math.floor(window.innerWidth / width)) {
                                    object.remove();
                                    for (let i = 0; i < this.keys; i++) {
                                        addVocabulary.failureAnimation(<HTMLObjectElement>this.selectedInput.children[i]);
                                    }
                                    return;
                                }
                                object.hidden = false;
                                this.keys++;

                                let svg = object.contentDocument;
                                svg.querySelector('#tspan7').innerHTML = Object.values(this.vocabulary[this.currentWordIndex])[this.inputIndex][index];

                                this.fixedAnimation(object);
                                this.movementAnimation(this.selectedInput);
                            });
                            break;
                        case '#pensionistenmodus':
                            this.backgroundColor = '#7a4aff';
                            this.inputStyling();

                            this.command.split('').forEach(_ => {
                                this.returnLastElement(this.selectedInput).remove();
                                this.keys--;
                                if (this.selectedInput.firstChild) {
                                    this.movementAnimation(this.selectedInput);
                                }
                            });
                            break;
                        case '#exit':
                        case '#quit':
                        case '#stop':
                        case '#home':
                        case '#stopp':
                        case '#beenden':
                        case '#hauptmenü':
                        case '#home menu':
                        case '#h':
                            this.command = '';
                            this.commandMode = false;
                            removeAllEventListeners();
                            home.modifyDocument();
                            return;
                        default: {
                            this.command.split('').forEach(_ => {
                                this.returnLastElement(this.selectedInput).remove();
                                this.keys--;
                                if (this.selectedInput.firstChild) {
                                    this.movementAnimation(this.selectedInput);
                                }
                            });

                            if (this.inputIndex + 1 < 4) {
                                this.inputIndex++;
                                this.selectedInput = <HTMLDivElement>this.container.children[inputs[this.inputIndex]];
                                if (this.inputIndex + 1 < 4 && this.selectedInput.classList.contains('not-editable')) {
                                    this.inputIndex += 1;
                                    this.selectedInput = <HTMLDivElement>this.container.children[this.inputIndex];
                                }
                                this.keys = this.selectedInput.childElementCount;
                                this.inputStyling();
                            }
                        }
                    }


                    this.command = '';
                    this.commandMode = false;
                } else if (event.key === 'ArrowUp') {
                    this.command.split('').forEach(_ => {
                        this.returnLastElement(this.selectedInput).remove();
                        this.keys--;
                        if (this.selectedInput.firstChild) {
                            this.movementAnimation(this.selectedInput);
                        }
                    });

                    this.command = '';
                    this.commandMode = false;
                } else if (event.key === 'ArrowDown') {
                    this.command.split('').forEach(_ => {
                        this.returnLastElement(this.selectedInput).remove();
                        this.keys--;
                        if (this.selectedInput.firstChild) {
                            this.movementAnimation(this.selectedInput);
                        }
                    });

                    this.command = '';
                    this.commandMode = false;

                    if (this.inputIndex + 1 < 4) {
                        this.inputIndex++;
                        this.selectedInput = <HTMLDivElement>this.container.children[inputs[this.inputIndex]];
                        if (this.inputIndex + 1 < 4 && this.selectedInput.classList.contains('not-editable')) {
                            this.inputIndex += 1;
                            this.selectedInput = <HTMLDivElement>this.container.children[this.inputIndex];
                        }
                        this.keys = this.selectedInput.childElementCount;
                        this.inputStyling();
                    }
                } else if (event.key === 'Backspace') {
                    if (this.returnLastElement(this.selectedInput)) {
                        this.returnLastElement(this.selectedInput).remove();
                        this.command = this.command.slice(0, this.command.length - 1);
                        this.keys--;

                        if (this.selectedInput.firstChild) {
                            this.movementAnimation(this.selectedInput);
                        }

                        if (this.command === '') {
                            this.commandMode = false;
                        }
                    }
                }

                if (
                    this.commandMode && (
                        this.selectedInput.classList.contains('not-editable') ||
                        forbiddenCharacters.includes(event.key) ||
                        event.key.length > 1
                    )
                ) {
                    return;
                }
            }

            if (!this.commandMode) {
                if ((event.key === 'Enter' || event.key === 'ArrowDown') && !mode) {
                    if (this.currentWord && !isNaN(this.currentWordIndex) && event.key === 'Enter') {
                        if (
                            Object.values(this.currentWord)[this.inputIndex] === Object.values(this.vocabulary[this.currentWordIndex])[this.inputIndex] ||
                            Object.values(this.currentWord)[this.inputIndex] === ''
                        ) {
                            for (let i = 0; i < this.keys; i++) {
                                if (this.selectedInput.children[i] && !this.selectedInput.classList.contains('not-editable')) {
                                    this.successAnimation(<HTMLObjectElement>this.selectedInput.children[i]);
                                }
                            }

                            if (!this.selectedInput.classList.contains('not-editable')) {
                                if (this.result[this.inputIndex] === undefined) {
                                    this.result[this.inputIndex] = true;
                                }
                            }

                            if (this.inputIndex + 1 < 4) {
                                this.inputIndex++;
                                this.selectedInput = <HTMLDivElement>this.container.children[inputs[this.inputIndex]];
                                while (this.inputIndex + 1 < 4 && this.selectedInput.classList.contains('not-editable')) {
                                    this.inputIndex += 1;
                                    this.selectedInput = <HTMLDivElement>this.container.children[inputs[this.inputIndex]];
                                }
                                this.keys = this.selectedInput.childElementCount;
                                this.inputStyling();
                            } else if (this.inputIndex + 1 === 4) {
                                let emptyLines: [boolean, boolean, boolean, boolean] = [undefined, undefined, undefined, undefined];
                                Object.values(this.currentWord).slice(0, 4).forEach((value: string, i: number) => {
                                    if (!document.querySelector(`#div${inputs[i]}`).classList.contains('not-editable')) {
                                        if (value === Object.values(this.vocabulary[this.currentWordIndex])[i]) {
                                            let inp = <HTMLDivElement>document.querySelector(`#div${inputs[i]}`);
                                            for (let ii = 0; ii < inp.childElementCount; ii++) {
                                                let obj = <HTMLObjectElement>inp.children[ii];
                                                this.successAnimation(obj);
                                            }

                                            if (value === '') {
                                                emptyLines[i] = true;
                                            }

                                            if (this.result[i] === undefined) {
                                                this.result[i] = true;
                                            }
                                        } else {
                                            let inp = <HTMLDivElement>document.querySelector(`#div${inputs[i]}`);
                                            for (let ii = 0; ii < inp.childElementCount; ii++) {
                                                let obj = <HTMLObjectElement>inp.children[ii];
                                                addVocabulary.failureAnimation(obj);
                                            }

                                            if (value === '') {
                                                emptyLines[i] = false;
                                            }

                                            if (this.result[i] === undefined) {
                                                this.result[i] = false;
                                            }
                                        }
                                    } else if (Object.values(this.vocabulary[this.currentWordIndex])[i].includes("^ign^")) {
                                        this.currentWord[Object.keys(this.currentWord)[i]] = Object.values(this.vocabulary[this.currentWordIndex])[i];
                                        let div = <HTMLDivElement>document.querySelector(`#div${inputs[i]}`);
                                        if (div && Object.values(this.vocabulary[this.currentWordIndex])[i].replaceAll("^ign^", '').trim() != "") {
                                            div.innerHTML = "";
                                            let span = div.appendChild(document.createElement('span'));
                                            span.innerHTML = Object.values(this.currentWord)[i].replaceAll("^ign^", "");
                                            span.classList.add("reveal");

                                            let max = div.clientHeight * 0.6;
                                            let fontSize: number;

                                            span.style.fontSize = max + 'px';

                                            span.style.whiteSpace = 'nowrap';
                                            span.style.display = 'inline-block';
                                            span.style.width = 'auto';
                                            span.style.fontSize = max + 'px';
                                            while (span.scrollWidth > div.clientWidth * 0.95 || span.clientHeight > max) {
                                                fontSize = parseInt(span.style.fontSize.slice(0, -2));
                                                if (fontSize <= 1) break;
                                                span.style.fontSize = (fontSize - 1) + 'px';
                                            }
                                            while (span.clientHeight > max) {
                                                fontSize = parseInt(span.style.fontSize.slice(0, -2));
                                                span.style.fontSize = (fontSize - 1) + 'px';
                                            }
                                        } else {
                                            emptyLines[i] = true;
                                        }
                                    }
                                });
                                this.resultStyling(emptyLines);

                                if (Object.values(this.currentWord).toLocaleString() === Object.values(this.vocabulary[this.currentWordIndex]).toLocaleString()) {
                                    let addition = this.result.filter(w => w === true).length;
                                    this.totalAttempts += 3;
                                    this.totalPoints += addition;
                                    if (addition === 3) {
                                        this.vocabulary[this.currentWordIndex].probability *= 0.8;
                                    } else {
                                        this.vocabulary[this.currentWordIndex].probability *= 1.2;
                                    }

                                    const transaction = this.database.transaction('vocabulary', 'readwrite');
                                    transaction.onerror = () => console.error(transaction.error);
                                    const objectStore = transaction.objectStore('vocabulary');
                                    const request = objectStore.get(this.currentWordIndex + 1);
                                    request.onerror = () => console.error(request.error);
                                    request.onsuccess = () => {
                                        const req = objectStore.put(this.vocabulary[this.currentWordIndex], this.currentWordIndex + 1);
                                        req.onerror = () => console.error(req.error);
                                    }

                                    setTimeout(_ => {
                                        this.inputIndex = 0;
                                        this.selectedInput = <HTMLDivElement>document.querySelector(`#div${inputs[this.inputIndex]}`);
                                        this.keys = 0;
                                        this.inputStyling();
                                        this.startNewTrainingRound();
                                    }, 500);
                                } else {
                                    setTimeout(_ => this.inputStyling(), 500);
                                }
                            }
                        } else if (this.selectedInput.classList.contains('not-editable')) {
                            if (this.inputIndex + 1 < 4) {
                                this.inputIndex++;
                                this.selectedInput = <HTMLDivElement>this.container.children[inputs[this.inputIndex]];
                                if (this.inputIndex + 1 < 4 && this.selectedInput.classList.contains('not-editable')) {
                                    this.inputIndex += 1;
                                    this.selectedInput = <HTMLDivElement>this.container.children[inputs[this.inputIndex]];
                                }
                                this.keys = this.selectedInput.childElementCount;
                                this.inputStyling();
                            }
                            return;
                        } else {
                            if (this.inputIndex === 3) {
                                let emptyLines: [boolean, boolean, boolean, boolean] = [undefined, undefined, undefined, undefined];
                                Object.values(this.currentWord).slice(0, 4).forEach((value, i) => {
                                    if (!document.querySelector(`#div${inputs[i]}`).classList.contains('not-editable')) {
                                        if (value === Object.values(this.vocabulary[this.currentWordIndex])[i]) {
                                            let inp = <HTMLDivElement>document.querySelector(`#div${inputs[i]}`);
                                            for (let ii = 0; ii < inp.childElementCount; ii++) {
                                                let obj = <HTMLObjectElement>inp.children[ii];
                                                this.successAnimation(obj);
                                            }

                                            if (value === '') {
                                                emptyLines[i] = true;
                                            }

                                            if (this.result[i] === undefined) {
                                                this.result[i] = true;
                                            }
                                        } else {
                                            let inp = <HTMLDivElement>document.querySelector(`#div${inputs[i]}`);
                                            for (let ii = 0; ii < inp.childElementCount; ii++) {
                                                let obj = <HTMLObjectElement>inp.children[ii];
                                                addVocabulary.failureAnimation(obj);
                                            }

                                            if (value === '') {
                                                emptyLines[i] = false;
                                            }

                                            if (this.result[i] === undefined) {
                                                this.result[i] = false;
                                            }
                                        }
                                    }
                                });
                                this.resultStyling(emptyLines);
                                setTimeout(_ => this.inputStyling(), 500);
                            } else {
                                for (let i = 0; i < this.selectedInput.childElementCount; i++) {
                                    addVocabulary.failureAnimation(<HTMLObjectElement>this.selectedInput.children[i]);
                                }
                            }


                            if (this.result[this.inputIndex] === undefined) {
                                this.result[this.inputIndex] = true;
                            }

                            this.result[this.inputIndex] = false;
                        }
                    } else if (event.key === 'ArrowDown') {
                        if (this.inputIndex + 1 < 4) {
                            this.inputIndex++;
                            this.selectedInput = <HTMLDivElement>this.container.children[inputs[this.inputIndex]];
                            if (this.inputIndex + 1 < 4 && this.selectedInput.classList.contains('not-editable')) {
                                this.inputIndex += 1;
                                this.selectedInput = <HTMLDivElement>this.container.children[inputs[this.inputIndex]];
                            }
                            this.keys = this.selectedInput.childElementCount;
                            this.inputStyling();
                        }
                        return;
                    }
                    return;
                } else if (event.key === 'ArrowUp') {
                    if (this.inputIndex > 0) this.inputIndex--;
                    this.selectedInput = <HTMLDivElement>this.container.children[inputs[this.inputIndex]];
                    this.keys = this.selectedInput.childElementCount;
                    this.inputStyling();
                    return;
                } else if (this.selectedInput.classList.contains('not-editable')) {
                    return;
                } else if (event.key === 'Backspace' && !mode) {
                    if (this.returnLastElement(this.selectedInput)) {
                        this.returnLastElement(this.selectedInput).remove();
                        this.keys--;
                        if (this.selectedInput.firstChild) {
                            this.movementAnimation(this.selectedInput);
                        }

                        if (this.currentWord && !isNaN(this.currentWordIndex) && !this.commandMode) {
                            Object.defineProperty(
                                this.currentWord,
                                Object.keys(this.currentWord)[this.inputIndex],
                                { value: Object.values(this.currentWord)[this.inputIndex].slice(0, this.keys) }
                            );
                        }

                        let object = <HTMLObjectElement>this.selectedInput.lastElementChild;
                        if (!object || !object.contentDocument) return;
                        let w = window.innerWidth;
                        let aspectRatio = object.getBoundingClientRect().height / object.getBoundingClientRect().width;
                        let h = (w / (this.keys + 1)) * aspectRatio;
                        let padding = (this.selectedInput.getBoundingClientRect().height - h) / 2;
                        this.padding[this.inputIndex] = Math.max(padding, 0.1);
                    }
                    return;
                } else if (forbiddenCharacters.includes(event.key) || event.key.length > 1) {
                    return;
                } else if (event.key === '#') {
                    this.commandMode = true;
                }
            }

            let object = document.createElement('object');
            object.data = './keys/Reversion_T.svg';
            object.id = `key${this.keys}-inp${this.inputIndex}`;
            object.style.height = `100%`;
            this.selectedInput.insertAdjacentElement('beforeend', object);
            let w = window.innerWidth;
            object.hidden = true;

            object.addEventListener('load', _ => {
                object.hidden = false;
                let width = Math.floor(object.getBoundingClientRect().width * 100) / 100;
                object.hidden = true;
                if (this.keys + 2 > Math.floor(w / width)) {
                    object.hidden = false;
                    let aspectRatio = object.getBoundingClientRect().height / object.getBoundingClientRect().width;
                    object.hidden = true;
                    let h = (w / (this.keys + 2)) * aspectRatio;
                    let padding = (this.selectedInput.getBoundingClientRect().height - h) / 2;
                    if (padding > this.selectedInput.getBoundingClientRect().height / 2 * 0.85) {
                        object.remove();
                        for (let i = 0; i < this.keys; i++) {
                            addVocabulary.failureAnimation(<HTMLObjectElement>this.selectedInput.children[i]);
                        }
                        return;
                    } else {
                        this.padding[this.inputIndex] = Math.max(padding, 1);
                    }
                }
                object.hidden = false;

                let svg = object.contentDocument;
                if (event.key === '<') {
                    svg.querySelector('#tspan7').innerHTML = '&lt;';
                } else if (event.key === '&') {
                    svg.querySelector('#tspan7').innerHTML = '&amp;';
                } else {
                    if (event.key === '/') event.preventDefault();
                    svg.querySelector('#tspan7').innerHTML = event.key.charAt(0);
                }

                if (this.currentWord && !isNaN(this.currentWordIndex) && !this.commandMode) {
                    Object.defineProperty(
                        this.currentWord,
                        Object.keys(this.currentWord)[this.inputIndex],
                        { value: Object.values(this.currentWord)[this.inputIndex] + event.key.charAt(0) }
                    );
                }

                this.keys++;

                this.movementAnimation(this.selectedInput);
                addVocabulary.idleAnimation(object);

                if (this.commandMode) {
                    this.commandAnimation(object);
                    this.command += event.key;
                }
            });
        }

        document.addEventListener('keydown', this.keyDownFunction);
        this.startNewTrainingRound();
    }

    startNewTrainingRound(): void {
        const isEmpty = (word: WordBundle): boolean => {
            if ((
                Object.values(word).slice(0, 4).filter((w: string) => w.trim() === "").length >= 3
            ) || (
                    word.latinWord.includes('^con^')
                ) || (
                    !word.selected
                ) || (
                    Object.values(word).slice(0, 4).filter((w: string) => w.includes("^ign^")).length >= 3
                )) {
                return true;
            } else return false;
        }

        if (this.vocabulary.length === 0) {
            setTimeout(_ => alert('Keine Vokabeln!'), 50);
            return;
        }

        this.round++;
        this.result = [undefined, undefined, undefined, undefined];

        let overallProbabilty = 0;
        this.vocabulary.forEach(word => { if (!isEmpty(word)) { overallProbabilty += word.probability } });
        if (overallProbabilty === 0) {
            setTimeout(_ => alert('Keine Vokabeln!'), 50);
            return;
        }

        let randomNumber = Math.floor(Math.random() * overallProbabilty * 10) / 10;
        let lowestDifference: number;
        let lastProbability = 0;

        this.vocabulary.forEach((word, i) => {
            if (!isEmpty(word)) {
                if (lowestDifference === undefined) {
                    lowestDifference = Math.abs(randomNumber - (lastProbability + word.probability));
                    this.currentWord = word;
                    this.currentWordIndex = i;
                } else if (Math.abs(randomNumber - (lastProbability + word.probability)) < lowestDifference) {
                    lowestDifference = Math.abs(randomNumber - (lastProbability + word.probability));
                    this.currentWordIndex = i;
                    if (Object.values(word).toLocaleString().slice(0, 4) === Object.values(this.currentWord).toLocaleString().slice(0, 4)) {
                        word.probability = Math.max(0, word.probability - 1);
                    }
                    this.currentWord = word;
                }
                lastProbability += word.probability;
            }
        });

        let savedProperty: [string, { value: string }];
        do {
            let rn = Math.random();
            if (rn <= 0.5) {
                savedProperty = ['latinWord', { value: this.currentWord.latinWord }];
            } else if (rn <= 0.7) {
                savedProperty = ['inflections', { value: this.currentWord.inflections }];
            } else if (rn <= 0.95) {
                savedProperty = ['germanTranslation', { value: this.currentWord.germanTranslation }];
            } else {
                savedProperty = ['relatedForeignWords', { value: this.currentWord.relatedForeignWords }];
            }
        } while (savedProperty[1].value.trim() === '' || savedProperty[1].value.includes('^ign^'));

        this.currentWord = {
            latinWord: '',
            inflections: '',
            germanTranslation: '',
            relatedForeignWords: '',
            selected: true,
            probability: this.currentWord.probability
        };

        Object.defineProperty(this.currentWord, savedProperty[0], savedProperty[1]);

        document.querySelectorAll('.t').forEach(t => t.innerHTML = '');
        document.querySelectorAll(".not-editable").forEach(div => div.classList.remove("not-editable"));
        Object.values(this.vocabulary[this.currentWordIndex]).slice(0, 4).forEach((w: string, i: number) => {
            let div = document.getElementById("div" + i * 2);
            if (Object.keys(this.vocabulary[this.currentWordIndex])[i] != savedProperty[0]) {
                if (w.includes("^ign^")) {
                    div.classList.add("not-editable")
                }
            } else {
                div.classList.add("not-editable");
                let max = div.clientHeight * 0.6;
                let fontSize: number;

                let span = document.createElement('span');
                span.style.fontSize = max + 'px';
                span.innerHTML = savedProperty[1].value;
                div.appendChild(span);

                span.style.whiteSpace = 'nowrap';
                span.style.display = 'inline-block';
                span.style.width = 'auto';
                span.style.fontSize = max + 'px';
                while (span.scrollWidth > div.clientWidth * 0.95 || span.clientHeight > max) {
                    fontSize = parseInt(span.style.fontSize.slice(0, -2));
                    if (fontSize <= 1) break;
                    span.style.fontSize = (fontSize - 1) + 'px';
                }
                while (span.clientHeight > max) {
                    fontSize = parseInt(span.style.fontSize.slice(0, -2));
                    span.style.fontSize = (fontSize - 1) + 'px';
                }
                this.result[i] = true;
            }
        });

        let i = 0;
        while (this.container.querySelector("#div" + i * 2).classList.contains("not-editable")) i++;
        this.inputIndex = i;
        this.selectedInput = this.container.querySelector("#div" + i * 2);
        this.inputStyling();
    }

    movementAnimation(inp: HTMLDivElement): void {
        let object = <HTMLObjectElement>inp.firstChild;
        let id = parseInt(inp.id[3]);
        if (inp.firstChild) {
            if (inp.childElementCount > 1) {
                inp.style.transition = 'padding 250ms';
            }
            inp.style.paddingTop = `${this.padding[id / 2]}px`;
            inp.style.paddingBottom = `${this.padding[id / 2]}px`;

            let height = inp.getBoundingClientRect().height - 2 * this.padding[id / 2];
            inp.style.paddingLeft = `${(window.innerWidth - inp.childElementCount * height) / 2}px`;
            inp.style.paddingRight = `${(window.innerWidth - inp.childElementCount * height) / 2}px`;
        }
    }

    commandAnimation(object: HTMLObjectElement): void {
        if (!object) {
            return;
        }
        let svg = object.contentDocument;
        let rect = svg.querySelector('#mainRect');
        let text = svg.querySelector('#text7');
        let animationKeyframes: PropertyIndexedKeyframes = {
            stroke: ['#eeeeeeff', '#ffa500'],
            offset: [0, 1],
        }

        let animationOptions: KeyframeAnimationOptions = {
            duration: 500,
            fill: 'forwards'
        }

        rect.animate(animationKeyframes, animationOptions);
        text.animate(animationKeyframes, animationOptions);
    }

    fixedAnimation(object: HTMLObjectElement): void {
        if (!object) {
            return;
        }
        object.classList.add('fixed');

        let svg = object.contentDocument;
        let rect = svg.querySelector('#mainRect');
        let text = svg.querySelector('#text7');
        let animationKeyframes: PropertyIndexedKeyframes = {
            stroke: ['#eeeeeeff', '#ffff00'],
            offset: [0, 1],
        }

        let animationOptions: KeyframeAnimationOptions = {
            duration: 500,
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

    private returnLastElement(input: HTMLDivElement): HTMLObjectElement {
        if (input.childElementCount > 0) {
            if (!input.lastElementChild.classList.contains('fixed')) {
                return <HTMLObjectElement>input.lastElementChild;
            }
        }
        return undefined;
    }

    private inputStyling(): void {
        document.body.style.backgroundImage = `
            linear-gradient(180deg, 
                ${this.backgroundColor} 0%, 
                #06011b ${20 + (this.inputIndex * 2) * (window.innerHeight / document.body.scrollHeight) * (65 / 7)}%,
                #06011b ${20 + (this.inputIndex * 2 + 1) * (window.innerHeight / document.body.scrollHeight) * (65 / 7)}%, 
                ${this.backgroundColor} ${(window.innerHeight / document.body.scrollHeight) * 100}%
            )
        `;
        //#0d0043
        //#440075
    }

    private resultStyling(result: [boolean, boolean, boolean, boolean]): void {
        document.body.style.transition = 'background-image 250ms';
        let str = `linear-gradient(180deg,`;
        result.forEach((value, i) => {
            let color: string;
            if (value === true) {
                color = '#2be231';
            } else if (value === false) {
                color = '#e80000';
            } else {
                color = '#140063';
            }

            str +=
                `#140063 ${20 + (i * 2) * (window.innerHeight / document.body.scrollHeight) * (65 / 7)}%,
                ${color} ${20 + (i * 2 + 0.5) * (window.innerHeight / document.body.scrollHeight) * (65 / 7)}%, 
                #140063 ${20 + (i * 2 + 1) * (window.innerHeight / document.body.scrollHeight) * (65 / 7)}%, `;
        });

        document.body.style.backgroundImage = str.slice(0, str.length - 2) + ')';
    }
}