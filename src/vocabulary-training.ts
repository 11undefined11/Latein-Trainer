import { addVocabulary, createDiv, home, removeAllEventListeners } from "..";
import { WordBundle } from "./add-vocabulary";

export class VocabularyTraining {
    container: HTMLDivElement;
    iconPlaceholder: HTMLDivElement;
    navbar: HTMLDivElement;

    vocabulary: WordBundle[];
    database: IDBDatabase;

    keyDownFunction: EventListenerOrEventListenerObject;
    mouseOverFunction: EventListenerOrEventListenerObject;
    resizeFunction: EventListenerOrEventListenerObject;

    currentWord: WordBundle;
    currentWordIndex: number;

    totalAttempts = 0;
    totalPoints = 0;
    result: [boolean, boolean, boolean, boolean];

    commandMode = false;
    command = '';

    selectedInput: HTMLDivElement;
    inputIndex = 0;

    time = 0;
    round = 0;
    backgroundColor = '#140063';

    constructor() {
        setInterval(_ => this.time += 1, 1);

        this.resizeFunction = _ => {
            let inputs = document.querySelectorAll('.inp');
            inputs.forEach((inp: HTMLDivElement) => {
                if (inp.firstChild && !inp.classList.contains('not-editable')) this.movementAnimation();
            });
        };
    }

    modifyDocument(): void {
        window.addEventListener('resize', this.resizeFunction);

        const request = window.indexedDB.open('Vocabulary', 1);

        request.addEventListener('error', _ => {
            this.vocabulary = [];
            this.modifyDocument();
            console.error(request.error);
        });

        request.addEventListener('success', _ => {
            this.database = request.result;

            const transaction = this.database.transaction('vocabulary', 'readonly');
            transaction.onerror = _ => console.error(transaction.error);
            const objectStore = transaction.objectStore('vocabulary');
            const req = objectStore.getAll();
            req.onerror = _ => console.error(req.error);
            req.onsuccess = _ => {
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

                let height: number;
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

                        let clickFunction = _ => {
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
        let keys = 0;

        for (let i = 0; i < this.container.childElementCount; i += 2) {
            this.container.children[i].addEventListener('click', _ => {
                this.inputIndex = i / 2;
                this.selectedInput = <HTMLDivElement>this.container.children[i];
                this.inputStyling();
                keys = this.selectedInput.childElementCount;
            });
        };

        for (let i = 1; i < this.container.childElementCount; i += 2) {
            this.container.children[i].addEventListener('click', (event: MouseEvent) => {
                if (event.offsetY > this.container.children[i].clientHeight / 2) {
                    this.inputIndex = (i + 1) / 2;
                    this.selectedInput = <HTMLDivElement>this.container.children[i + 1];
                    this.inputStyling();
                    keys = this.selectedInput.childElementCount;
                } else {
                    this.inputIndex = (i - 1) / 2;
                    this.selectedInput = <HTMLDivElement>this.container.children[i - 1];
                    this.inputStyling();
                    keys = this.selectedInput.childElementCount;
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
                    switch (this.command) {
                        case '#hint':
                        case '#t':
                        case '#tip':
                        case '#tipp':
                        case '#Tipp':
                            this.command.split('').forEach(_ => {
                                this.returnLastElement(this.selectedInput).remove();
                                keys--;
                                if (this.selectedInput.firstChild) {
                                    this.movementAnimation();
                                }
                            });

                            let object = document.createElement('object');
                            object.data = './keys/OG_T.svg';
                            object.id = `key${keys}-inp${this.inputIndex}`;
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
                                this.movementAnimation();
                                keys--;
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
                                keys--;
                                object.hidden = true;
                            } else {
                                this.selectedInput.insertAdjacentElement('beforeend', object);
                                object.hidden = true;
                            }

                            object.addEventListener('load', _ => {
                                if (keys >= Math.floor(window.innerWidth / width)) {
                                    object.remove();
                                    for (let i = 0; i < keys; i++) {
                                        addVocabulary.failureAnimation(<HTMLObjectElement>this.selectedInput.children[i]);
                                    }
                                    return;
                                }
                                object.hidden = false;
                                keys++;

                                let svg = object.contentDocument;
                                svg.querySelector('#tspan7').innerHTML = Object.values(this.vocabulary[this.currentWordIndex])[this.inputIndex][index];

                                this.fixedAnimation(object);
                                this.movementAnimation();
                            });
                            break;
                        case '#pensionistenmodus':
                        case '#Pensionistenmodus':
                            this.backgroundColor = '#7a4aff';
                            this.inputStyling();

                            this.command.split('').forEach(_ => {
                                this.returnLastElement(this.selectedInput).remove();
                                keys--;
                                if (this.selectedInput.firstChild) {
                                    this.movementAnimation();
                                }
                            });
                            break;
                        default: {
                            this.command.split('').forEach(_ => {
                                this.returnLastElement(this.selectedInput).remove();
                                keys--;
                                if (this.selectedInput.firstChild) {
                                    this.movementAnimation();
                                }
                            });

                            if (this.inputIndex + 1 < 4) {
                                this.inputIndex++;
                                this.selectedInput = <HTMLDivElement>this.container.children[inputs[this.inputIndex]];
                                if (this.inputIndex + 1 < 4 && this.selectedInput.classList.contains('not-editable')) {
                                    this.inputIndex += 1;
                                    this.selectedInput = <HTMLDivElement>this.container.children[this.inputIndex];
                                }
                                keys = this.selectedInput.childElementCount;
                                this.inputStyling();
                            }
                        }
                    }


                    this.command = '';
                    this.commandMode = false;
                } else if (event.key === 'ArrowUp') {
                    this.command.split('').forEach(_ => {
                        this.returnLastElement(this.selectedInput).remove();
                        keys--;
                        if (this.selectedInput.firstChild) {
                            this.movementAnimation();
                        }
                    });

                    this.command = '';
                    this.commandMode = false;
                } else if (event.key === 'ArrowDown') {
                    this.command.split('').forEach(_ => {
                        this.returnLastElement(this.selectedInput).remove();
                        keys--;
                        if (this.selectedInput.firstChild) {
                            this.movementAnimation();
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
                        keys = this.selectedInput.childElementCount;
                        this.inputStyling();
                    }
                } else if (event.key === 'Backspace') {
                    if (this.returnLastElement(this.selectedInput)) {
                        this.returnLastElement(this.selectedInput).remove();
                        this.command = this.command.slice(0, this.command.length - 1);
                        keys--;

                        if (this.selectedInput.firstChild) {
                            this.movementAnimation();
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
                            for (let i = 0; i < keys; i++) {
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
                                if (this.inputIndex + 1 < 4 && this.selectedInput.classList.contains('not-editable')) {
                                    this.inputIndex += 1;
                                    this.selectedInput = <HTMLDivElement>this.container.children[inputs[this.inputIndex]];
                                }
                                keys = this.selectedInput.childElementCount;
                                this.inputStyling();
                            } else if (this.inputIndex + 1 === 4) {
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
                                    transaction.onerror = _ => console.error(transaction.error);
                                    const objectStore = transaction.objectStore('vocabulary');
                                    const request = objectStore.get(this.currentWordIndex + 1);
                                    request.onerror = _ => console.error(request.error);
                                    request.onsuccess = _ => {
                                        const req = objectStore.put(this.vocabulary[this.currentWordIndex], this.currentWordIndex + 1);
                                        req.onerror = _ => console.error(req.error);
                                    }

                                    setTimeout(_ => {
                                        this.inputIndex = 0;
                                        this.selectedInput = <HTMLDivElement>document.querySelector(`#div${inputs[this.inputIndex]}`);
                                        keys = 0;
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
                                keys = this.selectedInput.childElementCount;
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
                            keys = this.selectedInput.childElementCount;
                            this.inputStyling();
                        }
                        return;
                    }
                    return;
                } else if (event.key === 'ArrowUp') {
                    if (this.inputIndex > 0) this.inputIndex--;
                    this.selectedInput = <HTMLDivElement>this.container.children[inputs[this.inputIndex]];
                    keys = this.selectedInput.childElementCount;
                    this.inputStyling();
                    return;
                } else if (this.selectedInput.classList.contains('not-editable')) {
                    return;
                } else if (event.key === 'Backspace' && !mode) {
                    if (this.returnLastElement(this.selectedInput)) {
                        this.returnLastElement(this.selectedInput).remove();
                        keys--;
                        if (this.selectedInput.firstChild) {
                            this.movementAnimation();
                        }

                        if (this.currentWord && !isNaN(this.currentWordIndex) && !this.commandMode) {
                            Object.defineProperty(
                                this.currentWord,
                                Object.keys(this.currentWord)[this.inputIndex],
                                { value: Object.values(this.currentWord)[this.inputIndex].slice(0, keys) }
                            );
                        }
                    }
                    return;
                } else if (forbiddenCharacters.includes(event.key) || event.key.length > 1) {
                    return;
                } else if (event.key === '#') {
                    this.commandMode = true;
                }
            }

            let object = document.createElement('object');
            object.data = './keys/OG_T.svg';
            object.id = `key${keys}-inp${this.inputIndex}`;
            object.style.height = `100%`;
            this.selectedInput.insertAdjacentElement('beforeend', object);
            let width = object.clientHeight;
            object.hidden = true;

            object.addEventListener('load', _ => {
                if (keys >= Math.floor(window.innerWidth / width)) {
                    object.remove();
                    for (let i = 0; i < keys; i++) {
                        addVocabulary.failureAnimation(<HTMLObjectElement>this.selectedInput.children[i]);
                    }
                    return;
                }
                object.hidden = false;

                let svg = object.contentDocument;
                svg.querySelector('#tspan7').innerHTML = event.key.charAt(0);

                if (this.currentWord && !isNaN(this.currentWordIndex) && !this.commandMode) {
                    Object.defineProperty(
                        this.currentWord,
                        Object.keys(this.currentWord)[this.inputIndex],
                        { value: Object.values(this.currentWord)[this.inputIndex] + event.key.charAt(0) }
                    );
                }

                keys++;

                addVocabulary.idleAnimation(object);
                this.movementAnimation();

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
        if (this.vocabulary.length === 0) {
            setTimeout(_ => alert('Keine Vokabeln!'), 50);
            return;
        }

        this.round++;

        let overallProbabilty = 0;
        this.vocabulary.forEach(word => { if (word.selected) { overallProbabilty += word.probability } });

        let randomNumber = Math.floor(Math.random() * overallProbabilty * 10) / 10;
        let lowestDifference: number;
        let lastProbability = 0;

        this.vocabulary.forEach((word, i) => {
            if (word.selected) {
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
                this.inputIndex = 1;
                this.selectedInput = <HTMLDivElement>this.container.children[this.inputIndex + 1];
                this.inputStyling();
            } else if (rn <= 0.7) {
                savedProperty = ['inflections', { value: this.currentWord.inflections }];
            } else if (rn <= 0.95) {
                savedProperty = ['germanTranslation', { value: this.currentWord.germanTranslation }];
            } else {
                savedProperty = ['relatedForeignWords', { value: this.currentWord.relatedForeignWords }];
            }
        } while (savedProperty[1].value.trim() === '');

        this.currentWord = {
            latinWord: '',
            inflections: '',
            germanTranslation: '',
            relatedForeignWords: '',
            selected: true,
            probability: this.currentWord.probability
        };

        Object.defineProperty(this.currentWord, savedProperty[0], savedProperty[1]);

        let previousFixedDiv = document.querySelector('.not-editable')
        if (previousFixedDiv) {
            previousFixedDiv.classList.remove('not-editable');
        }

        document.querySelectorAll('.t').forEach(t => t.innerHTML = '');

        let specificationDiv = document.getElementById(`div${Object.keys(this.currentWord).findIndex(k => k === savedProperty[0]) * 2}`);
        specificationDiv.classList.add('not-editable');

        specificationDiv.innerHTML = `<span style="font-size:${specificationDiv.clientHeight * 0.6}px">${savedProperty[1].value}</span>`;

        this.result = [undefined, undefined, undefined, undefined];
    }

    movementAnimation(): void {
        let object = <HTMLObjectElement>this.selectedInput.firstChild;
        let inp = this.selectedInput;
        if (this.selectedInput.firstChild) {
            if (inp.childElementCount > 1) {
                inp.style.transition = 'padding 250ms';
            }
            inp.style.paddingLeft = `${(window.innerWidth - inp.childElementCount * object.clientHeight) / 2}px`
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