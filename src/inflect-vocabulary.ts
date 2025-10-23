import { addVocabulary, createDiv, home, removeAllEventListeners, training } from "..";

export class InflectVocabulary {
    container: HTMLDivElement;
    iconPlaceholder: HTMLDivElement;
    navbar: HTMLDivElement;
    buttonLeft: HTMLButtonElement;
    buttonRight: HTMLButtonElement;
    homeButton: HTMLButtonElement;
    deletionButton: HTMLButtonElement;
    genderSplitButton: HTMLButtonElement;

    keydownFunction: EventListener;
    buttonRightFunction: EventListener;
    buttonLeftFunction: EventListener;
    resizeFunction: EventListener;

    selectedInput: HTMLDivElement;
    inputSubIndex: number;
    inputIndex: number;

    currentWord: InflectedWord;
    currentWordIndex: number;
    wordIndex: number;
    vocabulary: InflectedWord[];

    database: IDBDatabase;
    enterMode = false;
    tabMode = false;
    commandMode = false;
    automaticPaddingAdjustment = false;
    splitMode = false;
    command = "";
    tabulator = "";
    tabCount = 0;
    keys: number;
    v = 1;
    padding: number[] = [];
    splitPadding: [number, number, number][] = new Array(3).fill(new Array(3).fill(0));
    firstInterval: number;
    secondInterval: number;
    firstTimeout: number;
    animatedInputIndex: number;
    animatedInputSubIndex: number;
    animatedBorderWidth = 0;
    borderColor: string = '#12dada';

    round = 0;
    failures = 0;
    totalAttempts = 0;
    totalPoints = 0;
    result: Result;

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
                const request = window.indexedDB.open('Vocabulary', 2);
                request.onerror = () => console.error(request.error);
                request.onsuccess = () => {
                    this.database = request.result;
                    this.tabulator = '';

                    const transaction = this.database.transaction('inflected vocabulary', 'readonly');
                    transaction.onerror = () => console.error(transaction.error);
                    const objectStore = transaction.objectStore('inflected vocabulary');
                    const req = objectStore.getAll();
                    req.onerror = () => console.error(req.error);
                    req.onsuccess = () => {
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
                        this.padding = [];
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

                        const homeFunction = () => {
                            removeAllEventListeners();
                            if (this.tabMode) {
                                this.cancelTabMode();
                            }

                            if (param.includes('add') && !(
                                this.currentWord.singular.filter((value) => value === '').length === (param.includes('verb') ? 3 : 6) &&
                                this.currentWord.plural.filter((value) => value === '').length === (param.includes('verb') ? 3 : 6)
                            )) {
                                const transaction = this.database.transaction(`inflected vocabulary`, 'readwrite');
                                transaction.onerror = () => console.error(transaction.error);
                                const objectStore = transaction.objectStore(`inflected vocabulary`);
                                const req = objectStore.put(this.currentWord, this.wordIndex + 1);
                                req.onerror = () => console.error(req.error);

                                document.querySelectorAll('.editable').forEach(el => el.classList.add('savedElement'));
                                setTimeout(() => {
                                    document.querySelectorAll('.editable').forEach(el => el.classList.remove('savedElement'));
                                    this.splitMode = false;
                                    this.tabulator = '';
                                    home.modifyDocument();
                                    this.commandMode = false;
                                }, 200);
                                return;
                            }
                            this.splitMode = false;
                            this.tabulator = '';
                            home.modifyDocument();
                            this.commandMode = false;
                        }

                        icon.addEventListener('load', _ => {
                            icon.contentDocument.addEventListener('click', homeFunction);
                        })

                        this.homeButton.addEventListener('click', homeFunction);


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

                            if (param == 'add nouns') {
                                this.genderSplitButton = document.createElement('button');
                                this.genderSplitButton.classList.add('roundButton', 'genderSplitButton');
                                let svg = document.createElement('img');
                                svg.src = '/split-genders.svg';
                                this.genderSplitButton.append(svg);
                                this.navbar.appendChild(this.genderSplitButton);

                                [svg, this.genderSplitButton].forEach(el => el.addEventListener('click', () => this.splitGenders(this.currentWord)));
                            }

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

        let animation: number | null = null;
        this.resizeFunction = () => {
            if (animation !== null) {
                clearTimeout(animation);
                animation = null;
            }

            for (let i = 4; i < this.container.children.length; i++) {
                if (i % 3 > 0) {
                    if (!this.splitMode) {
                        let div = <HTMLDivElement>this.container.children[i];
                        let array = Object.values(this.currentWord)[i % 3 - 1];
                        let n = Math.floor(i / 3) - 1;
                        this.adjustInputWidth(div, array[n], false);
                    } else {
                        for (let ii = 0; ii < 3; ii++) {
                            let div = this.container.children[i].children[ii];
                            let array = Object.values(this.currentWord)[i % 3 - 1];
                            let n = Math.floor(i / 3 - 1);
                            this.adjustInputWidth(div as HTMLDivElement, array[n].split(mfORn)[ii + 1], false);
                        }
                    }
                }
            }

            animation = setTimeout((): void => {
                for (let j = 4; j < this.container.childElementCount; j++) {
                    if (j % 3 > 0) {
                        if (this.automaticPaddingAdjustment) {
                            if (this.splitMode) {
                                for (let k = 0; k < 3; k++) {
                                    let input = <HTMLDivElement>this.container.children[j].children[k];
                                    let array = Object.values(this.currentWord)[j % 3 - 1];
                                    let n = Math.floor(j / 3) - 1;
                                    let splitto = array[n].split(mfORn).slice(1);
                                    this.adjustInputWidth(input, splitto[k], false);
                                    this.automaticPaddingAnimation(input, false, false);
                                }
                            }
                            this.automaticPaddingAnimation(<HTMLDivElement>this.container.children[j], false, false);
                        } else {
                            this.paddingAnimation(<HTMLDivElement>this.container.children[j]);
                        }
                    }
                }
            }, 200);
        }

        window.addEventListener("resize", this.resizeFunction);
    }

    type(param?: Parameter): void {
        switch (param) {
            case 'verbs':
            case 'nouns':
                this.keys = 0;
                this.borderColor = param.includes('verb') ? '#ff5e01' : 'rgba(138, 43, 226, 1)';

                document.querySelectorAll('.editable').forEach((element: HTMLDivElement) => {
                    element.addEventListener('click', (event: MouseEvent) => {
                        if (this.splitMode) {
                            let source = event.target as Element;
                            if (source === element) return;
                            let count: number;
                            for (let q = 0; q < element.childElementCount; q++) {
                                if (element.children[q] === source) {
                                    count = q;
                                    break;
                                }
                            }
                            this.inputSubIndex = count;
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

                this.keydownFunction = (event: KeyboardEvent) => {
                    let forbiddenCharacters = ['´', '`', '^'];
                    let inp = this.splitMode ? this.selectedInput.children[this.inputSubIndex] as HTMLDivElement : this.selectedInput;
                    if (this.commandMode) {
                        forbiddenCharacters.push('#');
                        if (event.key === 'Enter') {
                            if (this.command.endsWith('%') && !this.automaticPaddingAdjustment) {
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
                                            if (div && i > 3 && i % 3 != 0) {
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
                                            if (div && i > 3 && i % 3 != 0) {
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

                            switch (this.command.toLowerCase()) {
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
                                    this.splitMode = false;
                                    this.tabulator = '';
                                    home.modifyDocument();
                                    return;
                                case '#automaticpaddingadjustment':
                                case '#auto':
                                case '#automatic-padding-adjustment':
                                case '#automatische padding-anpassung':
                                case '#automatischepaddinganpassung':
                                case '#automatische-padding-anpassung':
                                case '#apa':
                                    this.automaticPaddingAdjustment = true;
                                    this.command.split('').forEach(_ => {
                                        this.selectedInput.lastElementChild.remove();
                                        this.keys--;
                                    });
                                    this.command = '';
                                    this.commandMode = false;
                                    this.adjustInputWidth(this.selectedInput, Object.values(this.currentWord)[this.inputIndex % 3 - 1][Math.floor(this.inputIndex / 3) - 1], true);
                                    this.borderColor = 'orange';
                                    if (!param.includes('add')) this.borderColor = param.includes('verb') ? '#ff5e01' : 'rgba(138, 43, 226, 1)';
                                    return;
                                case '#manualpaddingadjustment':
                                case '#manual':
                                case '#normalpaddingadjustment':
                                case '#normal':
                                case '#manual-padding-adjustment':
                                case '#mpa':
                                case '#npa':
                                    if (!this.splitMode) {
                                        this.automaticPaddingAdjustment = false;
                                        this.command.split('').forEach(_ => {
                                            this.selectedInput.lastElementChild.remove();
                                            this.keys--;
                                        });
                                        this.command = '';
                                        this.commandMode = false;
                                        this.borderColor = '#12dada';
                                        if (!param.includes('add')) this.borderColor = param.includes('verb') ? '#ff5e01' : 'rgba(138, 43, 226, 1)';
                                        return;
                                    }
                                default: {
                                    this.command.split('').forEach(_ => {
                                        inp.lastElementChild.remove();
                                        this.keys--;
                                    });
                                    this.commandMode = false;
                                    this.changeSelectedInput();
                                    break;
                                }
                            }
                            return;
                        } else if (event.key === 'ArrowUp') {
                            this.command.split('').forEach(_ => {
                                inp.removeChild(inp.lastElementChild);
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
                                inp.removeChild(inp.lastElementChild);
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
                                inp.removeChild(inp.lastElementChild);
                                this.keys--;
                            });

                            this.command = '';
                            this.commandMode = false;

                            if (this.inputIndex > 4) {
                                if (this.splitMode && this.inputSubIndex > 0) {
                                    this.inputSubIndex--;
                                } else {
                                    this.inputIndex--;
                                    if (this.inputIndex % 3 === 0) {
                                        this.inputIndex--;
                                    }
                                    if (this.splitMode && this.inputSubIndex === 0) {
                                        this.inputSubIndex = 2;
                                    }
                                }

                                this.changeSelectedInput();
                            } else if (this.inputIndex == 4 && this.inputSubIndex > 0 && this.splitMode) {
                                this.inputSubIndex--;
                                this.changeSelectedInput();
                            }
                            return;
                        } else if (event.key === 'ArrowRight') {
                            this.command.split('').forEach(_ => {
                                inp.removeChild(inp.lastElementChild);
                                this.keys--;
                            });

                            this.command = '';
                            this.commandMode = false;

                            if (this.inputIndex < 20 - this.v) {
                                if (this.splitMode && this.inputSubIndex < 2) {
                                    this.inputSubIndex++;
                                } else {
                                    this.inputIndex++;
                                    if (this.inputIndex % 3 === 0) {
                                        this.inputIndex++;
                                    }
                                    if (this.splitMode && this.inputSubIndex === 2) {
                                        this.inputSubIndex = 0;
                                    }
                                }
                                this.changeSelectedInput();
                            } else if (this.splitMode && this.inputIndex == 20 - this.v && this.inputSubIndex < 2) {
                                this.inputSubIndex++;
                                this.changeSelectedInput();
                            }
                            return;
                        } else if (event.key === 'Backspace') {
                            if (inp.lastElementChild) {
                                inp.lastElementChild.remove();
                                this.command = this.command.slice(0, this.command.length - 1);
                                this.keys--;


                                if (this.command === '') {
                                    this.commandMode = false;
                                    return;
                                }
                            }

                            if (this.automaticPaddingAdjustment && this.padding[this.inputIndex] > inp.offsetHeight * 0.05) {
                                let object = inp.lastElementChild;
                                let w = Math.round((inp.getBoundingClientRect().width -
                                    parseFloat(window.getComputedStyle(inp).paddingLeft) -
                                    parseFloat(window.getComputedStyle(inp).paddingRight)) * 100) / 100;
                                let aspectRatio = object.getBoundingClientRect().height / object.getBoundingClientRect().width;
                                let h = w / this.keys * aspectRatio;
                                let padding = Math.max((inp.getBoundingClientRect().height - h) / 2, inp.offsetHeight * 0.05);
                                if (!this.splitMode) {
                                    this.padding[this.inputIndex] = Math.max(padding, 1);
                                    inp.style.padding = `${this.padding[this.inputIndex]}px 0.25vw`;

                                } else {
                                    this.splitPadding[this.inputIndex][this.inputSubIndex] = Math.max(padding, 1);
                                    inp.style.padding = `${this.splitPadding[this.inputIndex][this.inputSubIndex]}px 0.25vw`;
                                }
                            }
                        }

                        if (
                            this.commandMode && (
                                inp.classList.contains('known-case') ||
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
                                if (this.splitMode && this.inputSubIndex < 2) {
                                    this.inputSubIndex++;
                                } else {
                                    this.inputIndex++;
                                    if (this.inputIndex % 3 === 0) {
                                        this.inputIndex++;
                                    }
                                    if (this.splitMode && this.inputSubIndex === 2) {
                                        this.inputSubIndex = 0;
                                    }
                                }
                                this.changeSelectedInput();
                            } else if (this.splitMode && this.inputIndex == 20 - this.v && this.inputSubIndex < 2) {
                                this.inputSubIndex++;
                                this.changeSelectedInput();
                            }
                            return;
                        } else if (event.key === 'ArrowLeft') {
                            if (this.inputIndex > 4) {
                                if (this.splitMode && this.inputSubIndex > 0) {
                                    this.inputSubIndex--;
                                } else {
                                    this.inputIndex--;
                                    if (this.inputIndex % 3 === 0) {
                                        this.inputIndex--;
                                    }
                                    if (this.splitMode && this.inputSubIndex === 0) {
                                        this.inputSubIndex = 2;
                                    }
                                }

                                this.changeSelectedInput();
                            } else if (this.inputIndex == 4 && this.inputSubIndex > 0 && this.splitMode) {
                                this.inputSubIndex--;
                                this.changeSelectedInput();
                            }
                            return;
                        } else if (event.key === 'ArrowDown' || event.key === 'Enter') {
                            const enter = event.key === 'Enter';
                            const sub = this.inputSubIndex;
                            let delay = false;
                            if (this.splitMode && enter && Object.values(this.currentWord)[this.inputIndex % 3 - 1][Math.floor(this.inputIndex / 3) - 1].split(mfORn)[this.inputSubIndex + 1] === '' && this.inputSubIndex > 0) {
                                delay = true;
                                let array = <string[]>Object.values(this.currentWord)[this.inputIndex % 3 - 1];
                                let n = Math.floor(this.inputIndex / 3) - 1;
                                let splitto = array[n].split(mfORn).slice(1);
                                splitto[this.inputSubIndex] = splitto[this.inputSubIndex - 1];
                                array[n] = `^^m^^${splitto[0]}^^f^^${splitto[1]}^^n^^${splitto[2]}`;
                                Object.defineProperty(
                                    this.currentWord,
                                    Object.keys(this.currentWord)[this.inputIndex % 3 - 1],
                                    { value: array }
                                );
                                let phrase = splitto[this.inputSubIndex];
                                let tabulatorStyle = false;
                                let inp = this.selectedInput.children[this.inputSubIndex] as HTMLDivElement;
                                let objectCount = 0;
                                let objectsLoaded = 0;
                                const id = this.inputIndex;
                                const count = this.inputSubIndex;
                                for (let ii = 0; ii < phrase.length; ii++) {

                                    let object = document.createElement('object');
                                    this.keys++;
                                    object.addEventListener('load', _ => {
                                        let svg = object.contentDocument;
                                        svg.querySelector('#tspan7').innerHTML = phrase.charAt(ii);
                                        if (object.classList.contains('tabulator')) {
                                            this.tabulatorAnimation(object);
                                        }
                                        objectsLoaded++;
                                        if (objectsLoaded === objectCount) {
                                            this.adjustInputWidth(inp, phrase, false);
                                            let pad = this.splitPadding[id][count];
                                            inp.style.padding = `${pad}px 0.25vw`;
                                        }
                                    })
                                    object.data = './keys/Reversion_T.svg';
                                    object.id = `key${this.keys}-inp${this.inputIndex}-sub${this.inputSubIndex}`;
                                    object.style.height = `100%`;
                                    objectCount++;
                                    inp.insertAdjacentElement('beforeend', object);
                                    if (this.selectedInput.children[id - 1]) {
                                        object.classList.add('tabulator');
                                    }
                                }
                            }

                            if (this.inputIndex < 20 - this.v || this.inputSubIndex != 2) {
                                if (event.key === 'Enter' && !inp.classList.contains('known-case')) {
                                    let attemptList: string[] = Object.values(this.currentWord)[this.inputIndex % 3 - 1];
                                    let solutionList: string[] = Object.values(this.vocabulary[this.currentWordIndex])[this.inputIndex % 3 - 1];
                                    let result: SingleResult = Object.values(this.result)[this.inputIndex % 3 - 1];
                                    let n = Math.floor(this.inputIndex / 3) - 1;
                                    let attempt: string = this.splitMode ? attemptList[n].split(mfORn)[sub + 1] : attemptList[n];
                                    let solution: string = this.splitMode ? solutionList[n].split(mfORn)[sub + 1] : solutionList[n];
                                    if (this.compare(attempt, solution)) {
                                        for (let i = 0; i < inp.childElementCount; i++) {
                                            let object = <HTMLObjectElement>inp.children[i];
                                            object.addEventListener('load', _ => {
                                                this.successAnimation(object);
                                            });
                                            if (object.contentDocument) {
                                                this.successAnimation(object);
                                            }
                                        }

                                        if ((!this.splitMode ? result[n] : result[n][sub]) === undefined) {
                                            if (this.splitMode) {
                                                result[n][this.inputSubIndex] = true;
                                            } else result[n] = true;

                                            Object.defineProperty(
                                                this.result,
                                                Object.keys(this.result)[this.inputIndex % 3 - 1],
                                                { value: result }
                                            );

                                            setTimeout(_ => {
                                                inp.classList.remove('shadowDesign');
                                                inp.classList.add('greenShadowDesign');
                                            }, 120)
                                        }
                                    } else if (attempt.replace('^tab^', '') != '') {
                                        for (let i = 0; i < inp.childElementCount; i++) {
                                            let object = <HTMLObjectElement>inp.children[i];
                                            object.addEventListener('load', _ => this.failureAnimation(object));
                                            if (object.contentDocument) this.failureAnimation(object);
                                        }

                                        if ((!this.splitMode ? result[n] : result[n][sub]) === undefined) {
                                            if (this.splitMode) {
                                                result[n][sub] = false;
                                            } else result[n] = false;

                                            Object.defineProperty(
                                                this.result,
                                                Object.keys(this.result)[this.inputIndex % 3 - 1],
                                                { value: result }
                                            );

                                            setTimeout(_ => {
                                                inp.classList.remove('shadowDesign');
                                                inp.classList.add('redShadowDesign');
                                            }, 120);
                                        }
                                        return;
                                    }
                                }

                            }

                            do {
                                if (this.inputIndex < 18 - this.v) {
                                    if (this.splitMode && this.inputSubIndex < 2 && enter) {
                                        this.inputSubIndex++;
                                    } else {
                                        this.inputIndex += 3;
                                        if (this.splitMode && this.inputSubIndex === 2 && enter) {
                                            this.inputSubIndex = 0;
                                        }
                                    }

                                    this.changeSelectedInput();
                                } else if (enter && this.inputIndex === 19 - this.v) {
                                    if (this.splitMode && this.inputSubIndex < 2) {
                                        this.inputSubIndex++;
                                    } else {
                                        this.inputIndex = 5;
                                        if (this.splitMode && this.inputSubIndex === 2) {
                                            this.inputSubIndex = 0;
                                        }
                                    }

                                    this.changeSelectedInput();
                                } else if (enter && this.inputIndex === 20 - this.v) {
                                    if (this.splitMode && this.inputSubIndex < 2) {
                                        this.inputSubIndex++;
                                        this.changeSelectedInput();
                                    } else {
                                        this.currentWord.singular.forEach((word, i) => {
                                            let index = 1 + (i + 1) * 3;
                                            for (let ii = 0; ii < (this.splitMode ? 3 : 1); ii++) {
                                                let m = index % 3 - 1;
                                                let n = Math.floor(index / 3) - 1;
                                                let wrd = this.splitMode ? word.split(mfORn)[ii + 1] : word;
                                                let sol = this.splitMode ? Object.values(this.vocabulary[this.currentWordIndex])[m][n].split(mfORn)[ii + 1] : Object.values(this.vocabulary[this.currentWordIndex])[m][n];
                                                if (this.compare(wrd, sol)) {
                                                    for (let iii = 0; iii < (this.splitMode ? this.container.children[index].children[ii] : this.container.children[index]).childElementCount; iii++) {
                                                        if (index % 3 != 0 && !(this.splitMode ? this.container.children[index].children[ii] : this.container.children[index]).classList.contains('known-case')) {
                                                            let object = <HTMLObjectElement>(this.splitMode ? this.container.children[index].children[ii] : this.container.children[index]).children[iii];
                                                            this.successAnimation(object);
                                                        }
                                                    }

                                                    if ((this.splitMode ? Object.values(this.result)[m][n][ii] : Object.values(this.result)[m][n]) === undefined) {
                                                        let array = Object.values(this.result)[m];
                                                        if (this.splitMode) {
                                                            array[n][ii] = true;
                                                        } else array[n] = true;

                                                        Object.defineProperty(
                                                            this.result,
                                                            Object.keys(this.result)[m],
                                                            { value: array }
                                                        )

                                                        setTimeout(_ => {
                                                            (this.splitMode ? this.container.children[index].children[ii] : this.container.children[index]).classList.remove('shadowDesign');
                                                            (this.splitMode ? this.container.children[index].children[ii] : this.container.children[index]).classList.add('greenShadowDesign');
                                                        }, 120)
                                                    }
                                                } else {
                                                    for (let iii = 0; iii < (this.splitMode ? this.container.children[index].children[ii] : this.container.children[index]).childElementCount; iii++) {
                                                        if (index % 3 != 0 && !(this.splitMode ? this.container.children[index].children[ii] : this.container.children[index]).classList.contains('known-case')) {
                                                            let object = <HTMLObjectElement>(this.splitMode ? this.container.children[index].children[ii] : this.container.children[index]).children[iii];
                                                            this.failureAnimation(object);
                                                        }
                                                    }

                                                    if ((this.splitMode ? Object.values(this.result)[m][n][ii] : Object.values(this.result)[m][n]) === undefined) {
                                                        let array = Object.values(this.result)[m];
                                                        if (this.splitMode) {
                                                            array[n][ii] = false;
                                                        } else array[n] = false;
                                                        Object.defineProperty(
                                                            this.result,
                                                            Object.keys(this.result)[m],
                                                            { value: array }
                                                        )

                                                        setTimeout(_ => {
                                                            (this.splitMode ? this.container.children[index].children[ii] : this.container.children[index]).classList.remove('shadowDesign');
                                                            (this.splitMode ? this.container.children[index].children[ii] : this.container.children[index]).classList.add('redShadowDesign');
                                                        }, 120);
                                                    }
                                                }
                                            }
                                        })
                                        this.currentWord.plural.forEach((word, i) => {
                                            let index = 2 + (i + 1) * 3;
                                            for (let ii = 0; ii < (this.splitMode ? 3 : 1); ii++) {
                                                let m = index % 3 - 1;
                                                let n = Math.floor(index / 3) - 1;
                                                let wrd = this.splitMode ? word.split(mfORn)[ii + 1] : word;
                                                let sol = this.splitMode ? Object.values(this.vocabulary[this.currentWordIndex])[m][n].split(mfORn)[ii + 1] : Object.values(this.vocabulary[this.currentWordIndex])[m][n];
                                                if (this.compare(wrd, sol)) {
                                                    for (let iii = 0; iii < (this.splitMode ? this.container.children[index].children[ii] : this.container.children[index]).childElementCount; iii++) {
                                                        if (index % 3 != 0 && !(this.splitMode ? this.container.children[index].children[ii] : this.container.children[index]).classList.contains('known-case')) {
                                                            let object = <HTMLObjectElement>(this.splitMode ? this.container.children[index].children[ii] : this.container.children[index]).children[iii];
                                                            object.addEventListener('load', () => this.successAnimation(object));
                                                            if (object.contentDocument) this.successAnimation(object);
                                                        }
                                                    }
                                                    if ((this.splitMode ? Object.values(this.result)[m][n][ii] : Object.values(this.result)[m][n]) === undefined) {
                                                        let array = Object.values(this.result)[m];
                                                        if (this.splitMode) {
                                                            array[n][ii] = true;
                                                        } else array[n] = true;
                                                        Object.defineProperty(
                                                            this.result,
                                                            Object.keys(this.result)[m],
                                                            { value: array }
                                                        )

                                                        setTimeout(_ => {
                                                            (this.splitMode ? this.container.children[index].children[ii] : this.container.children[index]).classList.remove('shadowDesign');
                                                            (this.splitMode ? this.container.children[index].children[ii] : this.container.children[index]).classList.add('greenShadowDesign');
                                                        }, 120)
                                                    }
                                                } else {
                                                    for (let iii = 0; iii < (this.splitMode ? this.container.children[index].children[ii] : this.container.children[index]).childElementCount; iii++) {
                                                        if (index % 3 != 0 && !(this.splitMode ? this.container.children[index].children[ii] : this.container.children[index]).classList.contains('known-case')) {
                                                            let object = <HTMLObjectElement>(this.splitMode ? this.container.children[index].children[ii] : this.container.children[index]).children[iii];
                                                            this.failureAnimation(object);
                                                        }
                                                    }

                                                    if ((this.splitMode ? Object.values(this.result)[m][n][ii] : Object.values(this.result)[m][n]) === undefined) {
                                                        let array = Object.values(this.result)[m];
                                                        if (this.splitMode) {
                                                            array[n][ii] = false;
                                                        } else array[n] = false;
                                                        Object.defineProperty(
                                                            this.result,
                                                            Object.keys(this.result)[m],
                                                            { value: array }
                                                        )

                                                        setTimeout(_ => {
                                                            (this.splitMode ? this.container.children[index].children[ii] : this.container.children[index]).classList.remove('shadowDesign');
                                                            (this.splitMode ? this.container.children[index].children[ii] : this.container.children[index]).classList.add('redShadowDesign');
                                                        }, 120);
                                                    }
                                                }
                                            }
                                        });

                                        if (this.compareObjects(this.currentWord, this.vocabulary[this.currentWordIndex])) {
                                            this.totalAttempts += 11 - this.v / 3 * 2;
                                            let addition = this.result.singular.filter(w => this.splitMode ? Array.isArray(w) && w.every(v => v === true) : w === true).length +
                                                this.result.plural.filter(w => this.splitMode ? Array.isArray(w) && w.every(v => v === true) : w === true).length;
                                            this.totalPoints += addition;

                                            if (addition != 12 - this.v / 3 * 2) {
                                                this.vocabulary[this.currentWordIndex].probability *= 1.2;
                                            } else {
                                                this.vocabulary[this.currentWordIndex].probability *= 0.8;
                                            }

                                            const transaction = this.database.transaction('inflected vocabulary', 'readwrite');
                                            const objectStore = transaction.objectStore('inflected vocabulary');
                                            const request = objectStore.put(this.vocabulary[this.currentWordIndex], this.currentWordIndex + 1);
                                            request.onerror = () => console.error(request.error);

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
                                        break;
                                    }
                                }
                            } while (enter && (this.splitMode ? this.selectedInput.children[this.inputSubIndex] : this.selectedInput).classList.contains('known-case'));
                            return;
                        } else if (event.key === 'ArrowUp') {
                            if (this.inputIndex > 6) {
                                this.inputIndex -= 3;

                                this.changeSelectedInput();
                            }
                            return;
                        } else if (event.key === 'Backspace') {
                            if (inp.lastElementChild) {
                                inp.lastElementChild.remove();

                                let array = <string[]>Object.values(this.currentWord)[this.inputIndex % 3 - 1];
                                let n = Math.floor(this.inputIndex / 3) - 1;
                                let index: number;
                                if (this.splitMode) {
                                    if (this.inputSubIndex == 0) {
                                        index = array[n].search(F);
                                    } else if (this.inputSubIndex == 1) {
                                        index = array[n].search(N);
                                    } else {
                                        index = array[n].length;
                                    }
                                }
                                if (!this.splitMode && array[n].slice(-5) === '^tab^') {
                                    array[n] = array[n].slice(0, array[n].length - 6);
                                    if (this.tabCount > 1) this.tabCount--;
                                    this.tabMode = !this.tabMode;
                                    inp.classList.add('tab');
                                    if (!this.tabMode) {
                                        inp.classList.remove('tab');
                                    }
                                } else if (this.splitMode && index != -1 && index !== undefined) {
                                    if (array[n].slice(index - 5, index) === '^tab^') {
                                        array[n] = array[n].slice(0, index - 6) + array[n].slice(index);
                                        if (this.tabCount > 1) this.tabCount--;
                                        this.tabMode = !this.tabMode;
                                        inp.classList.add('tab');
                                        if (!this.tabMode) {
                                            inp.classList.remove('tab');
                                        }
                                    }
                                    array[n] = array[n].slice(0, index - 1) + array[n].slice(index);
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

                            let pad = this.splitMode ? this.splitPadding[this.inputIndex][this.inputSubIndex] : this.padding[this.inputIndex];
                            if (this.automaticPaddingAdjustment && pad > inp.offsetHeight * 0.05) {
                                let object = inp.lastElementChild;
                                if (!object) return;
                                let w = Math.round((inp.getBoundingClientRect().width -
                                    parseFloat(window.getComputedStyle(inp).paddingLeft) -
                                    parseFloat(window.getComputedStyle(inp).paddingRight)) * 100) / 100;
                                let aspectRatio = object.getBoundingClientRect().height / object.getBoundingClientRect().width;
                                let h = w / this.keys * aspectRatio;
                                let padding = Math.max((inp.getBoundingClientRect().height - h) / 2, inp.offsetHeight * 0.05);
                                if (this.splitMode) {
                                    this.splitPadding[this.inputIndex][this.inputSubIndex] = Math.max(padding, 1);
                                    inp.style.padding = `${this.splitPadding[this.inputIndex][this.inputSubIndex]}px 0.25vw`;
                                } else {
                                    this.padding[this.inputIndex] = Math.max(padding, 1);
                                    inp.style.padding = `${this.padding[this.inputIndex]}px 0.25vw`;
                                }
                            }
                            return;
                        } else if (inp.classList.contains('known-case')) {
                            return;
                        } else if (event.key === '#') {
                            this.command = '';
                            this.commandMode = true;
                        } else if (event.key === 'Tab') {
                            if (this.tabulator) {
                                if (this.keys + this.tabulator.length >=
                                    this.selectedInput.clientWidth /
                                    (this.selectedInput.clientHeight - parseFloat(this.selectedInput.style.padding)) && !this.automaticPaddingAdjustment) {
                                    this.selectedInput.childNodes.forEach((v, i) => {
                                        this.failureAnimation(<HTMLObjectElement>this.selectedInput.children[i]);
                                    });
                                } else {
                                    let array = Object.values(this.currentWord)[this.inputIndex % 3 - 1];
                                    let n = Math.floor(this.inputIndex / 3) - 1;
                                    let index: number;
                                    if (this.splitMode) {
                                        if (this.inputSubIndex == 0) {
                                            index = array[n].search(F);
                                        } else if (this.inputSubIndex == 1) {
                                            index = array[n].search(N);
                                        } else {
                                            index = array[n].length;
                                        }
                                    }

                                    if (this.splitMode) {
                                        array[n] = array[n].slice(0, index) + this.tabulator + array[n].slice(index);
                                    } else {
                                        array[n] += this.tabulator;
                                    }
                                    Object.defineProperty(
                                        this.currentWord,
                                        Object.keys(this.currentWord)[this.inputIndex % 3 - 1],
                                        { value: array }
                                    );

                                    let objectsLoaded = 0;
                                    let objectCount = 0;
                                    this.tabulator.split('').forEach(letter => {
                                        let object = document.createElement('object');
                                        object.data = './keys/Reversion_T.svg';
                                        object.id = `key${this.keys}-inp${this.inputIndex}`;
                                        object.style.height = `100%`;
                                        this.selectedInput.insertAdjacentElement('beforeend', object);
                                        object.hidden = true;
                                        objectCount++;

                                        object.addEventListener('load', _ => {
                                            object.hidden = false;
                                            objectsLoaded++;

                                            let svg = object.contentDocument;
                                            svg.querySelector('#tspan7').innerHTML = letter;
                                            this.keys++;

                                            this.tabulatorAnimation(object);
                                            if (objectsLoaded === objectCount) {
                                                this.adjustInputWidth(inp, array[n])
                                            }
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
                    object.data = './keys/Reversion_T.svg';
                    object.id = `key${this.keys}-inp${this.inputIndex}`;
                    object.style.height = `100%`;
                    inp.insertAdjacentElement('beforeend', object);
                    object.hidden = true;

                    object.addEventListener('load', _ => {
                        object.hidden = false;
                        let width = Math.round(object.getBoundingClientRect().width * 100) / 100;
                        object.hidden = true;
                        let w = Math.round((inp.getBoundingClientRect().width -
                            parseFloat(window.getComputedStyle(inp).paddingLeft) -
                            parseFloat(window.getComputedStyle(inp).paddingRight) -
                            parseFloat(window.getComputedStyle(inp).borderLeftWidth) -
                            parseFloat(window.getComputedStyle(inp).borderRightWidth)) * 100) / 100;
                        if (!this.automaticPaddingAdjustment && this.keys + 1 > w / width) {
                            object.remove();
                            for (let i = 0; i < this.keys; i++) {
                                this.failureAnimation(<HTMLObjectElement>this.selectedInput.children[i]);
                            }
                            return;
                        } else if (this.automaticPaddingAdjustment) {
                            object.hidden = false;
                            let aspectRatio = object.getBoundingClientRect().height / object.getBoundingClientRect().width;
                            object.hidden = true;
                            let h = (w / (this.keys + 1)) * aspectRatio;
                            let padding = (inp.getBoundingClientRect().height - h) / 2;
                            if (padding > inp.getBoundingClientRect().height / 2 * 0.85) {
                                object.remove();
                                for (let i = 0; i < this.keys; i++) {
                                    this.failureAnimation(<HTMLObjectElement>inp.children[i]);
                                }
                                return;
                            } else {
                                const prev = this.splitMode ? this.splitPadding[this.inputIndex][this.inputSubIndex] : this.padding[this.inputIndex];
                                if (this.splitMode && this.inputSubIndex != undefined) {
                                    this.splitPadding[this.inputIndex][this.inputSubIndex] = Math.max(padding, inp.offsetHeight * 0.05);
                                } else {
                                    this.padding[this.inputIndex] = Math.max(padding, inp.offsetHeight * 0.05);
                                }
                                this.animatedBorderWidth = parseFloat(window.getComputedStyle(inp).borderTopWidth);
                                let now = this.splitMode ? this.splitPadding[this.inputIndex][this.inputSubIndex] : this.padding[this.inputIndex];
                                if (prev !== now) {
                                    this.automaticPaddingAnimation(inp as HTMLDivElement, true, true);
                                }
                            }
                        }

                        setTimeout(_ => { object.hidden = false; }, 10);
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
                            let n = Math.floor(this.inputIndex / 3) - 1
                            let index: number;
                            if (this.splitMode) {
                                if (this.inputSubIndex == 0) {
                                    index = array[n].search(F);
                                } else if (this.inputSubIndex == 1) {
                                    index = array[n].search(N);
                                } else {
                                    index = array[n].length;
                                }
                                array[n] = array[n].slice(0, index) + event.key + array[n].slice(index);
                            } else {
                                array[n] += event.key;
                            }

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

                window.addEventListener('keydown', (event: KeyboardEvent) => {
                    if (event.key === 'Tab') {
                        event.preventDefault();
                        this.container.focus();
                    }
                });

                this.startNewTrainingRound(param ? param : 'nouns');
                break;
            case 'add verbs':
            case 'add nouns':
                this.keys = 0;
                this.borderColor = '#12dada';

                document.querySelectorAll('.editable').forEach((element: HTMLDivElement) => {
                    element.addEventListener('click', event => {
                        if (this.tabMode) {
                            this.cancelTabMode();
                        }

                        if (this.splitMode) {
                            let source = event.target as Element;
                            if (source === element) return;
                            let count: number;
                            for (let q = 0; q < element.childElementCount; q++) {
                                if (element.children[q] === source) {
                                    count = q;
                                    break;
                                }
                            }
                            this.inputSubIndex = count;
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
                let deletionFunction = () => {
                    this.vocabulary.splice(this.wordIndex, 1);
                    const transaction = this.database.transaction('inflected vocabulary', 'readwrite');
                    const objectStore = transaction.objectStore('inflected vocabulary');
                    const request = objectStore.openCursor();
                    request.onsuccess = () => {
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
                                    if (this.splitMode) {
                                        this.splitMode = false;
                                        document.querySelectorAll('.split').forEach(split => {
                                            split.innerHTML = '';
                                            split.classList.remove('split');
                                        });
                                    }
                                    if (this.genderSplitButton) this.genderSplitButton.style.display = 'block';
                                    if (this.currentWord.singular[0].search(mfANDn) != -1) {
                                        this.splitGenders(this.currentWord);
                                        return;
                                    }
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
                                                    object.data = './keys/Reversion_T.svg';
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
                                                    object.data = './keys/Reversion_T.svg';
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

                                    if (this.splitMode) {
                                        this.splitMode = false;
                                        document.querySelectorAll('.split').forEach(split => {
                                            split.innerHTML = '';
                                            split.classList.remove('split');
                                        });
                                    }
                                    if (this.genderSplitButton) this.genderSplitButton.style.display = 'block';
                                    if (this.currentWord.singular[0].search(mfANDn) != -1) {
                                        this.splitGenders(this.currentWord);
                                        return;
                                    }
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
                                                    object.data = './keys/Reversion_T.svg';
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
                                                    object.data = './keys/Reversion_T.svg';
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
                                            this.container.children[i].classList.remove('split');
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
                        if (!object.contentDocument) {
                            return;
                        }
                        this.deletionAnimation(object, 2000, 'normal');

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
                        if (!object.contentDocument) {
                            return;
                        }
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
                            if (element === this.buttonLeft) {
                                let vocab = this.vocabulary.slice(0, this.wordIndex);
                                let wi = vocab.findLastIndex(w => w.verb === param.includes('verb'));

                                if (this.vocabulary[wi]) {
                                    if (
                                        this.currentWord.singular.filter((value) => value === '').length === (param.includes('verb') ? 3 : 6) &&
                                        this.currentWord.plural.filter((value) => value === '').length === (param.includes('verb') ? 3 : 6) &&
                                        this.wordIndex === this.vocabulary.length
                                    ) {
                                        return;
                                    }
                                }
                            }
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

                this.buttonLeftFunction = () => {
                    this.commandMode = false;
                    this.command = '';
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
                            let objectCount = 0;
                            let objectsLoaded = 0;

                            if (this.splitMode) {
                                this.splitMode = false;
                                document.querySelectorAll('.split').forEach(split => {
                                    split.innerHTML = '';
                                    split.classList.remove('split');
                                });
                            }
                            if (this.genderSplitButton) this.genderSplitButton.style.display = 'block';
                            if (this.currentWord.singular[0].search(mfANDn) != -1) {
                                this.splitGenders(this.currentWord);
                                return;
                            }

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
                                            object.data = './keys/Reversion_T.svg';
                                            object.id = `key${ii}-inp${i}`;
                                            object.style.height = `100%`;
                                            objectCount++;
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
                                                objectsLoaded++;
                                                if (objectCount === objectsLoaded) {
                                                    let objects = this.container.querySelectorAll('object');
                                                    objects.forEach(obj => obj.hidden = false);
                                                    for (let i = 4; i < this.container.children.length; i++) {
                                                        if (i % 3 > 0) {
                                                            let div = <HTMLDivElement>this.container.children[i];
                                                            let array = Object.values(this.currentWord)[i % 3 - 1];
                                                            let n = Math.floor(i / 3) - 1;
                                                            this.adjustInputWidth(div, array[n]);
                                                        }
                                                    }
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
                                            object.data = './keys/Reversion_T.svg';
                                            object.id = `key${ii}-inp${i}`;
                                            object.style.height = `100%`;
                                            objectCount++;
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
                                                objectsLoaded++;
                                                if (objectCount === objectsLoaded) {
                                                    let objects = this.container.querySelectorAll('object');
                                                    objects.forEach(obj => obj.hidden = false);
                                                    for (let i = 4; i < this.container.children.length; i++) {
                                                        if (i % 3 > 0) {
                                                            let div = <HTMLDivElement>this.container.children[i];
                                                            let array = Object.values(this.currentWord)[i % 3 - 1];
                                                            let n = Math.floor(i / 3) - 1;
                                                            this.adjustInputWidth(div, array[n]);
                                                        }
                                                    }
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
                            transaction.onerror = () => console.error(transaction.error);
                            const objectStore = transaction.objectStore(`inflected vocabulary`);
                            const req = objectStore.get(this.wordIndex);
                            req.onerror = () => console.error(req.error);
                            req.onsuccess = () => {
                                for (let i = 0; i < this.container.childElementCount; i++) {
                                    this.container.children[i].classList.remove('savedElement');
                                    this.buttonLeft.classList.remove('click');
                                }

                                const idontcare = objectStore.put(this.currentWord, this.wordIndex + 1);
                                idontcare.onerror = () => console.error(idontcare.error);

                                this.wordIndex = wi;

                                let tabulatorStyle = false;
                                this.currentWord = this.vocabulary[wi];
                                let overallIndexes: [number, number[]][] = [];

                                if (this.splitMode) {
                                    this.splitMode = false;
                                    document.querySelectorAll('.split').forEach(split => {
                                        split.innerHTML = '';
                                        split.classList.remove('split');
                                    });
                                }
                                if (this.genderSplitButton) this.genderSplitButton.style.display = 'block';
                                if (this.currentWord.singular[0].search(mfANDn) != -1) {
                                    this.splitGenders(this.currentWord);
                                    return;
                                }
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
                                                object.data = './keys/Reversion_T.svg';
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
                                                object.data = './keys/Reversion_T.svg';
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

                                let objects = this.container.querySelectorAll('object');
                                if (objects.length > 0) {
                                    objects[objects.length - 1].addEventListener('load', _ => {
                                        objects.forEach(obj => obj.hidden = false);
                                        for (let i = 4; i < this.container.children.length; i++) {
                                            if (i % 3 > 0) {
                                                let div = <HTMLDivElement>this.container.children[i];
                                                let array = Object.values(this.currentWord)[i % 3 - 1];
                                                let n = Math.floor(i / 3) - 1;
                                                this.adjustInputWidth(div, array[n]);
                                            }
                                        }
                                    });
                                } else {
                                    window.resizeBy(0, 0);
                                }
                            }
                        }
                    }
                };
                this.buttonLeft.addEventListener('mouseup', this.buttonLeftFunction);

                this.buttonRightFunction = () => {
                    this.commandMode = false;
                    this.command = '';

                    if (this.tabMode) {
                        this.cancelTabMode();
                    }

                    let vocab = this.vocabulary.slice(this.wordIndex + 1);
                    let wi = (vocab.findIndex(w => w.verb === param.includes('verb'))) >= 0 ? vocab.findIndex(w => w.verb === param.includes('verb')) + this.wordIndex + 1 : -1;

                    if (!this.vocabulary[wi]) {
                        this.vocabulary[this.wordIndex] = this.currentWord;

                        const transaction = this.database.transaction(`inflected vocabulary`, 'readwrite');
                        transaction.onerror = () => console.error(transaction.error);
                        const objectStore = transaction.objectStore(`inflected vocabulary`);
                        const req = objectStore.put(this.currentWord, this.wordIndex + 1);
                        req.onerror = () => console.error(req.error)
                        transaction.oncomplete = () => {
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
                                    this.container.children[i].classList.remove('split');
                                }

                                this.container.children[i].classList.remove('selectedElement');
                            }
                            this.splitMode = false;
                            if (this.genderSplitButton) this.genderSplitButton.style.display = 'block';
                            this.inputIndex = 4;
                            this.selectedInput = <HTMLDivElement>this.container.children[4];
                            this.tabCount = 0;
                            this.selectedInput.classList.add('selectedElement');
                        }

                        window.resizeBy(0, 0);
                    } else {
                        this.vocabulary[this.wordIndex] = this.currentWord;

                        for (let i = 0; i < this.container.childElementCount; i++) {
                            this.container.children[i].classList.remove('savedElement');
                            this.buttonRight.classList.remove('click');
                        }

                        const transaction = this.database.transaction(`inflected vocabulary`, 'readwrite');
                        transaction.onerror = () => console.error(transaction.error);
                        const objectStore = transaction.objectStore(`inflected vocabulary`);
                        const req = objectStore.get(this.wordIndex);
                        req.onerror = () => console.error(req.error);
                        req.onsuccess = () => {
                            const idontcare = objectStore.put(this.currentWord, this.wordIndex + 1);
                            idontcare.onerror = () => console.error(idontcare.error);

                            this.wordIndex = wi;
                            this.currentWord = <InflectedWord>this.vocabulary[wi];

                            if (this.splitMode) {
                                this.splitMode = false;
                                document.querySelectorAll('.split').forEach(split => {
                                    split.innerHTML = '';
                                    split.classList.remove('split');
                                });
                            }
                            if (this.genderSplitButton) this.genderSplitButton.style.display = 'block';
                            if (this.currentWord.singular[0].search(mfANDn) != -1) {
                                this.splitGenders(this.currentWord);
                                return;
                            }
                            let overallIndexes: [number, number[]][] = [];
                            let tabulatorStyle = false;
                            let objectCount = 0;
                            let objectsLoaded = 0;
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
                                            object.data = './keys/Reversion_T.svg';
                                            object.id = `key${ii}-inp${i}`;
                                            object.style.height = `100%`;
                                            this.container.children[i].insertAdjacentElement('beforeend', object);
                                            if (tabulatorStyle) tabulatorIndexes.push(ii);
                                            objectCount++;

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
                                                objectsLoaded++;
                                                if (objectCount === objectsLoaded) {
                                                    let objects = this.container.querySelectorAll('object');
                                                    for (let i = 4; i < this.container.children.length; i++) {
                                                        if (i % 3 > 0) {
                                                            let div = <HTMLDivElement>this.container.children[i];
                                                            let array = Object.values(this.currentWord)[i % 3 - 1];
                                                            let n = Math.floor(i / 3) - 1;
                                                            this.adjustInputWidth(div, array[n]);
                                                        }
                                                    }
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
                                            object.data = './keys/Reversion_T.svg';
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
                                                objectsLoaded++;
                                                if (objectCount === objectsLoaded) {
                                                    for (let i = 4; i < this.container.children.length; i++) {
                                                        if (i % 3 > 0) {
                                                            let div = <HTMLDivElement>this.container.children[i];
                                                            let array = Object.values(this.currentWord)[i % 3 - 1];
                                                            let n = Math.floor(i / 3) - 1;
                                                            this.adjustInputWidth(div, array[n]);
                                                        }
                                                    }
                                                }
                                            });
                                            objectCount++;
                                        }
                                        overallIndexes.push([i, tabulatorIndexes]);
                                    }
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
                        let inp = this.splitMode ? this.selectedInput.children[this.inputSubIndex] as HTMLDivElement : this.selectedInput;
                        if (event.key === 'Enter') {
                            if (this.command.endsWith('%') && !this.automaticPaddingAdjustment) {
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
                                            if (i > 3 && i % 3 != 0) {
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

                            switch (this.command.toLowerCase()) {
                                case '#<':
                                case '#<-':
                                case '#previous':
                                case '#prvs':
                                case '#vorheriges':
                                case '#voriges':
                                case '#prev':
                                    this.command.split('').forEach(_ => {
                                        inp.lastElementChild.remove();
                                        this.keys--;
                                    });

                                    this.command = '';
                                    this.commandMode = false;
                                    this.buttonLeftFunction(event);
                                    return;
                                case '#>':
                                case '#->':
                                case '#next':
                                case '#nxt':
                                case '#nächstes':
                                    this.command.split('').forEach(_ => {
                                        inp.lastElementChild.remove();
                                        this.keys--;
                                    });
                                    
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
                                case '#hauptmenü':
                                case '#home menu':
                                case '#h':
                                    this.command = '';
                                    this.commandMode = false;
                                    removeAllEventListeners();
                                    this.splitMode = false;
                                    this.tabulator = '';
                                    home.modifyDocument();
                                    return;
                                case '#geschlechtertrennung':
                                case '#teilen':
                                case '#splitto':
                                case '#split':
                                case '#sp':
                                    if (!this.splitMode) {
                                        this.splitGenders(this.currentWord);
                                    } else {
                                        this.command.split('').forEach(_ => {
                                            inp.lastElementChild.remove();
                                            this.keys--;
                                        });
                                        let array = Object.values(this.currentWord)[this.inputIndex % 3 - 1];
                                        let n = Math.floor(this.inputIndex / 3) - 1;
                                        let word = array[n].split(mfORn)[this.inputSubIndex + 1];
                                        this.adjustInputWidth(inp, word, true);
                                        this.command = '';
                                        this.commandMode = false;
                                    }
                                    return;
                                case '#automaticpaddingadjustment':
                                case '#auto':
                                case '#automatic-padding-adjustment':
                                case '#automatische padding-anpassung':
                                case '#automatischepaddinganpassung':
                                case '#automatische-padding-anpassung':
                                case '#apa':
                                    this.automaticPaddingAdjustment = true;
                                    this.command.split('').forEach(_ => {
                                        inp.lastElementChild.remove();
                                        this.keys--;
                                    });
                                    this.command = '';
                                    this.commandMode = false;
                                    this.borderColor = 'orange';
                                    let array = Object.values(this.currentWord)[this.inputIndex % 3 - 1];
                                    let n = Math.floor(this.inputIndex / 3) - 1;
                                    let word = this.splitMode ? array[n].split(mfORn)[this.inputSubIndex + 1] : array[n];
                                    this.adjustInputWidth(inp, word, true);
                                    return;
                                case '#manualpaddingadjustment':
                                case '#manual':
                                case '#normalpaddingadjustment':
                                case '#normal':
                                case '#manual-padding-adjustment':
                                case '#mpa':
                                case '#npa':
                                    if (!this.splitMode) {
                                        this.automaticPaddingAdjustment = false;
                                    }
                                    if (!param.includes('add')) this.borderColor = param.includes('verb') ? '#ff5e01' : 'rgba(138, 43, 226, 1)';
                                default: {
                                    this.command.split('').forEach(_ => {
                                        inp.lastElementChild.remove();
                                        this.keys--;
                                    });
                                    if (this.automaticPaddingAdjustment) {
                                        let array = Object.values(this.currentWord)[this.inputIndex % 3 - 1];
                                        let n = Math.floor(this.inputIndex / 3) - 1;
                                        let word = this.splitMode ? array[n].split(mfORn)[this.inputSubIndex + 1] : array[n];
                                        this.adjustInputWidth(inp, word, true);
                                    } else {
                                        this.paddingAnimation(inp);
                                    }
                                }
                            }

                            this.command = '';
                            this.commandMode = false;
                            return;
                        } else if (event.key === 'ArrowUp') {
                            this.command.split('').forEach(_ => {
                                inp.removeChild(inp.lastElementChild);
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
                                inp.removeChild(inp.lastElementChild);
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
                                inp.removeChild(inp.lastElementChild);
                                this.keys--;
                            });

                            this.command = '';
                            this.commandMode = false;

                            if (this.inputIndex > 4) {
                                if (this.splitMode && this.inputSubIndex > 0) {
                                    this.inputSubIndex--;
                                } else {
                                    this.inputIndex--;
                                    if (this.inputIndex % 3 === 0) {
                                        this.inputIndex--;
                                    }
                                    if (this.splitMode && this.inputSubIndex === 0) {
                                        this.inputSubIndex = 2;
                                    }
                                }

                                this.changeSelectedInput();
                            } else if (this.inputIndex == 4 && this.inputSubIndex > 0 && this.splitMode) {
                                this.inputSubIndex--;
                                this.changeSelectedInput();
                            }
                            return;
                        } else if (event.key === 'ArrowRight') {
                            this.command.split('').forEach(_ => {
                                inp.removeChild(inp.lastElementChild);
                                this.keys--;
                            });

                            this.command = '';
                            this.commandMode = false;

                            if (this.inputIndex < 20 - this.v) {
                                if (this.splitMode && this.inputSubIndex < 2) {
                                    this.inputSubIndex++;
                                } else {
                                    this.inputIndex++;
                                    if (this.inputIndex % 3 === 0) {
                                        this.inputIndex++;
                                    }
                                    if (this.splitMode && this.inputSubIndex === 2) {
                                        this.inputSubIndex = 0;
                                    }
                                }
                                this.changeSelectedInput();
                            } else if (this.splitMode && this.inputIndex == 20 - this.v && this.inputSubIndex < 2) {
                                this.inputSubIndex++;
                                this.changeSelectedInput();
                            }
                            return;
                        } else if (event.key === 'Backspace') {
                            if (inp.lastElementChild) {
                                inp.lastElementChild.remove();
                                this.command = this.command.slice(0, this.command.length - 1);
                                this.keys--;


                                if (this.command === '') {
                                    this.commandMode = false;
                                    return;
                                }
                            }

                            let pad = this.splitMode ? this.splitPadding[this.inputIndex][this.inputSubIndex] : this.padding[this.inputIndex];
                            if (this.automaticPaddingAdjustment && pad > inp.offsetHeight * 0.05) {
                                let object = inp.lastElementChild;
                                if (!object) return;
                                let w = Math.round((inp.getBoundingClientRect().width -
                                    parseFloat(window.getComputedStyle(inp).paddingLeft) -
                                    parseFloat(window.getComputedStyle(inp).paddingRight)) * 100) / 100;
                                let aspectRatio = object.getBoundingClientRect().height / object.getBoundingClientRect().width;
                                let h = w / this.keys * aspectRatio;
                                let padding = Math.max((inp.getBoundingClientRect().height - h) / 2, inp.offsetHeight * 0.05);
                                if (this.splitMode) {
                                    this.splitPadding[this.inputIndex][this.inputSubIndex] = Math.max(padding, 1);
                                    inp.style.padding = `${this.splitPadding[this.inputIndex][this.inputSubIndex]}px 0.25vw`;
                                } else {
                                    this.padding[this.inputIndex] = Math.max(padding, 1);
                                    inp.style.padding = `${this.padding[this.inputIndex]}px 0.25vw`;
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
                                if (this.splitMode && this.inputSubIndex < 2) {
                                    this.inputSubIndex++;
                                } else {
                                    this.inputIndex++;
                                    if (this.inputIndex % 3 === 0) {
                                        this.inputIndex++;
                                    }
                                    if (this.splitMode && this.inputSubIndex === 2) {
                                        this.inputSubIndex = 0;
                                    }
                                }
                                this.changeSelectedInput();
                            } else if (this.splitMode && this.inputIndex == 20 - this.v && this.inputSubIndex < 2) {
                                this.inputSubIndex++;
                                this.changeSelectedInput();
                            }

                            return;
                        } else if (event.key === 'ArrowLeft') {
                            if (this.tabMode) {
                                this.cancelTabMode();
                            }

                            if (this.inputIndex > 4) {
                                if (this.splitMode && this.inputSubIndex > 0) {
                                    this.inputSubIndex--;
                                } else {
                                    this.inputIndex--;
                                    if (this.inputIndex % 3 === 0) {
                                        this.inputIndex--;
                                    }
                                    if (this.splitMode && this.inputSubIndex === 0) {
                                        this.inputSubIndex = 2;
                                    }
                                }

                                this.changeSelectedInput();
                            } else if (this.inputIndex == 4 && this.inputSubIndex > 0 && this.splitMode) {
                                this.inputSubIndex--;
                                this.changeSelectedInput();
                            }
                            return;
                        } else if (event.key === 'ArrowDown' || event.key === 'Enter') {
                            if (this.tabMode) {
                                this.cancelTabMode();
                                if (this.inputIndex === 19) {
                                    return;
                                }
                            }

                            const enter = event.key === 'Enter';


                            if (this.splitMode && enter && Object.values(this.currentWord)[this.inputIndex % 3 - 1][Math.floor(this.inputIndex / 3) - 1].split(mfORn)[this.inputSubIndex + 1] === '' && this.inputSubIndex > 0) {
                                let array = <string[]>Object.values(this.currentWord)[this.inputIndex % 3 - 1];
                                let n = Math.floor(this.inputIndex / 3) - 1;
                                let splitto = array[n].split(mfORn).slice(1);
                                splitto[this.inputSubIndex] = splitto[this.inputSubIndex - 1];
                                array[n] = `^^m^^${splitto[0]}^^f^^${splitto[1]}^^n^^${splitto[2]}`;
                                Object.defineProperty(
                                    this.currentWord,
                                    Object.keys(this.currentWord)[this.inputIndex % 3 - 1],
                                    { value: array }
                                );
                                let phrase = splitto[this.inputSubIndex];
                                let tabulatorStyle = false;
                                let inp = this.selectedInput.children[this.inputSubIndex] as HTMLDivElement;
                                let objectCount = 0;
                                let objectsLoaded = 0;
                                const id = this.inputIndex;
                                const count = this.inputSubIndex;
                                for (let ii = 0; ii < phrase.length; ii++) {
                                    if (phrase.slice(ii, ii + 5) === '^tab^') {
                                        tabulatorStyle = !tabulatorStyle;
                                        ii += 4;
                                    } else {
                                        let object = document.createElement('object');
                                        this.keys++;
                                        object.addEventListener('load', _ => {
                                            let svg = object.contentDocument;
                                            svg.querySelector('#tspan7').innerHTML = phrase.charAt(ii);
                                            if (object.classList.contains('tabulator')) {
                                                this.tabulatorAnimation(object);
                                            }
                                            objectsLoaded++;
                                            if (objectsLoaded === objectCount) {
                                                this.adjustInputWidth(inp, phrase, false);
                                                let pad = this.splitPadding[id][count];
                                                inp.style.padding = `${pad}px 0.25vw`;
                                            }
                                        })
                                        object.data = './keys/Reversion_T.svg';
                                        object.id = `key${this.keys}-inp${this.inputIndex}-sub${this.inputSubIndex}`;
                                        object.style.height = `100%`;
                                        objectCount++;
                                        inp.insertAdjacentElement('beforeend', object);
                                        if (tabulatorStyle) object.classList.add('tabulator');
                                    }
                                }
                            }

                            if (this.inputIndex < 18 - this.v) {
                                if (this.splitMode && this.inputSubIndex < 2 && enter) {
                                    this.inputSubIndex++;
                                } else {
                                    this.inputIndex += 3;
                                    if (this.splitMode && this.inputSubIndex === 2 && enter) {
                                        this.inputSubIndex = 0;
                                    }
                                }

                                this.changeSelectedInput();
                            } else if (enter && this.inputIndex === 19 - this.v) {
                                if (this.splitMode && this.inputSubIndex < 2) {
                                    this.inputSubIndex++;
                                } else {
                                    this.inputIndex = 5;
                                    if (this.splitMode && this.inputSubIndex === 2) {
                                        this.inputSubIndex = 0;
                                    }
                                }

                                this.changeSelectedInput();
                            } else if (enter && this.inputIndex === 20 - this.v) {
                                if (this.splitMode && this.inputSubIndex < 2) {
                                    this.inputSubIndex++;
                                    this.changeSelectedInput();
                                    return;
                                }

                                document.querySelectorAll('.editable').forEach((element: HTMLDivElement) => {
                                    element.classList.add('savedElement');
                                });

                                if (this.enterMode) {
                                    let vocab = this.vocabulary.slice(this.wordIndex + 1);
                                    let wi = (vocab.findIndex(w => w.verb === param.includes('verb'))) >= 0 ? vocab.findIndex(w => w.verb === param.includes('verb')) + this.wordIndex + 1 : -1;

                                    if (!this.vocabulary[wi]) {
                                        this.vocabulary[this.wordIndex] = this.currentWord;

                                        const transaction = this.database.transaction(`inflected vocabulary`, 'readwrite');
                                        transaction.onerror = () => console.error(transaction.error);
                                        const objectStore = transaction.objectStore(`inflected vocabulary`);
                                        const req = objectStore.put(this.currentWord, this.wordIndex + 1);
                                        req.onerror = () => console.error(req.error)
                                        transaction.oncomplete = () => {
                                            for (let i = 0; i < this.container.childElementCount; i++) {
                                                this.container.children[i].classList.remove('savedElement');
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
                                                    this.container.children[i].classList.remove('split');
                                                }

                                                this.container.children[i].classList.remove('selectedElement');
                                            }
                                            this.inputIndex = 4;
                                            this.selectedInput = <HTMLDivElement>this.container.children[4];
                                            this.tabCount = 0;
                                            this.genderSplitButton.style.display = 'block';
                                            this.selectedInput.classList.add('selectedElement');
                                        }
                                    } else {
                                        this.vocabulary[this.wordIndex] = this.currentWord;

                                        for (let i = 0; i < this.container.childElementCount; i++) {
                                            this.container.children[i].classList.remove('savedElement');
                                        }

                                        const transaction = this.database.transaction(`inflected vocabulary`, 'readwrite');
                                        transaction.onerror = () => console.error(transaction.error);
                                        const objectStore = transaction.objectStore(`inflected vocabulary`);
                                        const req = objectStore.get(this.wordIndex);
                                        req.onerror = () => console.error(req.error);
                                        req.onsuccess = () => {
                                            const idontcare = objectStore.put(this.currentWord, this.wordIndex + 1);
                                            idontcare.onerror = () => console.error(idontcare.error);

                                            this.wordIndex = wi;
                                            this.currentWord = <InflectedWord>this.vocabulary[wi];
                                            if (this.splitMode) {
                                                this.splitMode = false;
                                                document.querySelectorAll('.split').forEach(split => {
                                                    split.innerHTML = '';
                                                    split.classList.remove('split');
                                                });
                                            }
                                            if (this.genderSplitButton) this.genderSplitButton.style.display = 'block';
                                            if (this.currentWord.singular[0].search(mfANDn) != -1) {
                                                this.splitGenders(this.currentWord);
                                                return;
                                            }
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
                                                            object.data = './keys/Reversion_T.svg';
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
                                                            object.data = './keys/Reversion_T.svg';
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
                                req.onerror = () => console.error(req.error);
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
                            }

                            return;
                        } else if (event.key === 'Backspace') {
                            let inp = (this.splitMode && this.inputSubIndex != undefined ? this.selectedInput.children[this.inputSubIndex] : this.selectedInput) as HTMLDivElement;
                            if (inp.lastElementChild) {
                                inp.lastElementChild.remove();

                                let array = <string[]>Object.values(this.currentWord)[this.inputIndex % 3 - 1];
                                let n = Math.floor(this.inputIndex / 3) - 1;
                                let index: number;
                                if (this.splitMode) {
                                    if (this.inputSubIndex == 0) {
                                        index = array[n].search(F);
                                    } else if (this.inputSubIndex === 1) {
                                        index = array[n].search(N);
                                    } else {
                                        index = array[n].length;
                                    }
                                }
                                if (!this.splitMode && array[n].slice(-5) === '^tab^') {
                                    array[n] = array[n].slice(0, array[n].length - 6);
                                    if (this.tabCount > 1) this.tabCount--;
                                    this.tabMode = !this.tabMode;
                                    inp.classList.add('tab');
                                    if (!this.tabMode) {
                                        inp.classList.remove('tab');
                                    }
                                } else if (this.splitMode && index != -1 && index !== undefined) {
                                    if (array[n].slice(index - 5, index) === '^tab^') {
                                        array[n] = array[n].slice(0, index - 6) + array[n].slice(index);
                                        if (this.tabCount > 1) this.tabCount--;
                                        this.tabMode = !this.tabMode;
                                        inp.classList.add('tab');
                                        if (!this.tabMode) {
                                            inp.classList.remove('tab');
                                        }
                                    } else {
                                        array[n] = array[n].slice(0, index - 1) + array[n].slice(index);
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

                            let pad = this.splitMode ? this.splitPadding[this.inputIndex][this.inputSubIndex] : this.padding[this.inputIndex];
                            if (this.automaticPaddingAdjustment && pad > inp.offsetHeight * 0.05) {
                                let object = inp.lastElementChild;
                                if (!object) return;
                                let w = Math.round((inp.getBoundingClientRect().width -
                                    parseFloat(window.getComputedStyle(inp).paddingLeft) -
                                    parseFloat(window.getComputedStyle(inp).paddingRight)) * 100) / 100;
                                let aspectRatio = object.getBoundingClientRect().height / object.getBoundingClientRect().width;
                                let h = w / this.keys * aspectRatio;
                                let padding = Math.max((inp.getBoundingClientRect().height - h) / 2, inp.offsetHeight * 0.05);
                                if (this.splitMode) {
                                    this.splitPadding[this.inputIndex][this.inputSubIndex] = Math.max(padding, 1);
                                    inp.style.padding = `${this.splitPadding[this.inputIndex][this.inputSubIndex]}px 0.25vw`;
                                } else {
                                    this.padding[this.inputIndex] = Math.max(padding, 1);
                                    inp.style.padding = `${this.padding[this.inputIndex]}px 0.25vw`;
                                }
                            }
                            return;
                        } else if (event.key === '#') {
                            this.command = '';
                            this.commandMode = true;
                        } else if (event.key === 'Tab') {
                            let inp = this.splitMode ? this.selectedInput.children[this.inputSubIndex] as HTMLDivElement : this.selectedInput;
                            if (!this.tabMode) {
                                if (this.tabCount >= 2) {
                                    let array = <string[]>Object.values(this.currentWord)[this.inputIndex % 3 - 1];
                                    let n = Math.floor(this.inputIndex / 3) - 1;
                                    let word = this.splitMode ? array[n].split(mfORn)[this.inputSubIndex + 1] : array[n];
                                    let index: number;
                                    while (word.search('\\^tab\\^') !== -1) {
                                        let c = word.search('\\^tab\\^');
                                        if (index === undefined) index = c;
                                        word = word.slice(0, c) + word.slice(c + 5, word.length);
                                    }

                                    word = word.slice(0, index) + '^tab^' + word.slice(index, word.length);
                                    Object.defineProperty(
                                        this.currentWord,
                                        Object.keys(this.currentWord)[this.inputIndex % 3 - 1],
                                        { value: array }
                                    );

                                    let tabulatorStyle = false;
                                    for (let i = 0; i < word.length; i++) {
                                        if (word.slice(i, i + 5) === '^tab^') {
                                            tabulatorStyle = !tabulatorStyle;
                                            i += 4;
                                        } else if (inp.children[i > index ? i - 5 : i]) {
                                            let object = <HTMLObjectElement>inp.children[i > index ? i - 5 : i];
                                            let svg = object.contentDocument;
                                            svg.querySelector('#tspan7').innerHTML = word.charAt(i);
                                            if (tabulatorStyle) {
                                                this.tabulatorAnimation(object);
                                                object.classList.add('tabulator');
                                            } else {
                                                object.classList.remove('tabulator');
                                            }
                                        }
                                    }
                                    this.tabulator = word.slice(index + 5, word.length);
                                    this.tabCount = 1;
                                    this.tabMode = true;
                                    inp.classList.add('tab');

                                    let splitto = this.splitMode ? array[n].split(mfORn).slice(1) : undefined;
                                    if (splitto) splitto[this.inputSubIndex] = word;
                                    array[n] = !this.splitMode ? word : `^^m^^${splitto[0]}^^f^^${splitto[1]}^^n^^${splitto[2]}`;
                                } else {
                                    this.tabMode = true;
                                    inp.classList.add('tab');
                                    let array = Object.values(this.currentWord)[this.inputIndex % 3 - 1] as string[];
                                    let n = Math.floor(this.inputIndex / 3) - 1;
                                    let index: number;
                                    if (this.splitMode) {
                                        if (this.inputSubIndex == 0) {
                                            index = array[n].search(F);
                                        } else if (this.inputSubIndex == 1) {
                                            index = array[n].search(N);
                                        } else {
                                            index = array[n].length;
                                        }
                                    }
                                    if (index !== -1 && index !== undefined) {
                                        array[n] = array[n].slice(0, index) + "^tab^" + array[n].slice(index);
                                    } else {
                                        array[n] += "^tab^";
                                    }
                                    Object.defineProperty(
                                        this.currentWord,
                                        Object.keys(this.currentWord)[this.inputIndex % 3 - 1],
                                        { value: array }
                                    );
                                    this.tabCount++;
                                }
                            } else if (this.tabulator.length > 0) {
                                let array = Object.values(this.currentWord)[this.inputIndex % 3 - 1] as string[];
                                let n = Math.floor(this.inputIndex / 3) - 1;
                                let index: number;
                                if (this.splitMode) {
                                    if (this.inputSubIndex == 0) {
                                        index = array[n].search(F);
                                    } else if (this.inputSubIndex == 1) {
                                        index = array[n].search(N);
                                    } else {
                                        index = array[n].length;
                                    }
                                }
                                let phrase = this.splitMode ? array[n].slice(index - 5, index) : array[n].slice(-5);
                                if (phrase != '^tab^') {
                                    this.tabMode = false;
                                    inp.classList.remove('tab');
                                    if (this.splitMode && this.inputSubIndex != undefined) {
                                        array[n] = array[n].slice(0, index) + "^tab^" + array[n].slice(index);
                                    } else {
                                        array[n] += "^tab^";
                                    }
                                    Object.defineProperty(
                                        this.currentWord,
                                        Object.keys(this.currentWord)[this.inputIndex % 3 - 1],
                                        { value: array }
                                    );
                                    this.tabCount++;
                                } else {
                                    const previous = array[n];
                                    const ID = this.inputIndex;
                                    const subID = this.inputSubIndex;

                                    let objectCount = 0;
                                    let objectsLoaded = 0;

                                    if (this.splitMode && this.inputSubIndex != undefined) {
                                        array[n] = array[n].slice(0, index) + this.tabulator + "^tab^" + array[n].slice(index);
                                    } else {
                                        array[n] += this.tabulator + "^tab^";
                                    }
                                    const word = this.splitMode ? array[n].split(mfORn).at(this.inputSubIndex + 1) : array[n];
                                    if (
                                        this.keys + this.tabulator.length <=
                                        Math.floor(inp.clientWidth / (inp.clientHeight - parseFloat(inp.style.padding))) ||
                                        (this.keys + this.tabulator.length >
                                            Math.floor(inp.clientWidth / (inp.clientHeight - parseFloat(inp.style.padding))) &&
                                            this.automaticPaddingAdjustment)
                                    ) {
                                        for (let i = 0; i < this.tabulator.length; i++) {
                                            let object = document.createElement('object');
                                            object.data = './keys/Reversion_T.svg';
                                            object.id = `key${this.keys}-inp${this.inputIndex}${(this.splitMode) ? `-sub${this.inputSubIndex}` : ''}`;
                                            object.style.height = `100%`;
                                            objectCount++;
                                            inp.insertAdjacentElement('beforeend', object);
                                            object.hidden = true;
                                            object.addEventListener('load', _ => {
                                                object.hidden = false;
                                                this.tabulatorAnimation(object);
                                                object.classList.add('tabulator');
                                                let svg = object.contentDocument;
                                                svg.querySelector('#tspan7').innerHTML = this.tabulator.charAt(i);
                                                this.keys++;
                                                objectsLoaded++;
                                                if (objectsLoaded === objectCount && this.automaticPaddingAdjustment) {
                                                    this.adjustInputWidth(inp, word, false);
                                                    let pad = this.splitMode ? this.splitPadding[ID][subID] : this.padding[ID];
                                                    inp.style.padding = `${pad}px 0.25vw`;
                                                    inp.style.border = 'none';
                                                }
                                            });
                                        }
                                    } else {
                                        for (let ii = 0; ii < this.keys; ii++) {
                                            this.failureAnimation(<HTMLObjectElement>inp.children[ii]);
                                            array[n] = previous;
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
                                    inp.classList.remove('tab');
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

                    let inp = (this.splitMode && this.inputSubIndex != undefined ? this.selectedInput.children[this.inputSubIndex] : this.selectedInput) as HTMLDivElement;

                    let object = document.createElement('object');
                    object.data = './keys/Reversion_T.svg';
                    object.id = `key${this.keys}-inp${this.inputIndex}${this.splitMode ? `-sub${this.inputSubIndex}` : ''}`;
                    object.style.height = `100%`;
                    inp.insertAdjacentElement('beforeend', object);
                    object.hidden = true;

                    object.addEventListener('load', _ => {
                        object.hidden = false;
                        let width = Math.round(object.getBoundingClientRect().width * 100) / 100;
                        object.hidden = true;
                        let w = Math.round((inp.getBoundingClientRect().width -
                            parseFloat(window.getComputedStyle(inp).paddingLeft) -
                            parseFloat(window.getComputedStyle(inp).paddingRight) -
                            parseFloat(window.getComputedStyle(inp).borderLeftWidth) -
                            parseFloat(window.getComputedStyle(inp).borderRightWidth)) * 100) / 100;
                        if (!this.automaticPaddingAdjustment && this.keys + 1 > w / width) {
                            object.remove();
                            for (let i = 0; i < this.keys; i++) {
                                this.failureAnimation(<HTMLObjectElement>this.selectedInput.children[i]);
                            }
                            return;
                        } else if (this.automaticPaddingAdjustment) {
                            object.hidden = false;
                            let aspectRatio = object.getBoundingClientRect().height / object.getBoundingClientRect().width;
                            object.hidden = true;
                            let h = (w / (this.keys + 1)) * aspectRatio;
                            let padding = (inp.getBoundingClientRect().height - h) / 2;
                            if (padding > inp.getBoundingClientRect().height / 2 * 0.85) {
                                object.remove();
                                for (let i = 0; i < this.keys; i++) {
                                    this.failureAnimation(<HTMLObjectElement>inp.children[i]);
                                }
                                return;
                            } else {
                                const prev = this.splitMode ? this.splitPadding[this.inputIndex][this.inputSubIndex] : this.padding[this.inputIndex];
                                if (this.splitMode && this.inputSubIndex != undefined) {
                                    this.splitPadding[this.inputIndex][this.inputSubIndex] = Math.max(padding, inp.offsetHeight * 0.05);
                                } else {
                                    this.padding[this.inputIndex] = Math.max(padding, inp.offsetHeight * 0.05);
                                }
                                this.animatedBorderWidth = parseFloat(window.getComputedStyle(inp).borderTopWidth);
                                let now = this.splitMode ? this.splitPadding[this.inputIndex][this.inputSubIndex] : this.padding[this.inputIndex];
                                if (prev !== now) {
                                    this.automaticPaddingAnimation(inp as HTMLDivElement, true, true);
                                }
                            }
                        }

                        setTimeout(_ => { object.hidden = false; }, 10);
                        let svg = object.contentDocument;
                        if (event.key === '<') {
                            svg.querySelector('#tspan7').innerHTML = '&lt;';
                        } else if (event.key === '&') {
                            svg.querySelector('#tspan7').innerHTML = '&amp;';
                        } else {
                            svg.querySelector('#tspan7').innerHTML = event.key.charAt(0);
                        }

                        if (!this.commandMode) {
                            let array = Object.values(this.currentWord)[this.inputIndex % 3 - 1] as string[];
                            let n = Math.floor(this.inputIndex / 3) - 1;
                            let index: number;
                            if (this.splitMode) {
                                if (this.inputSubIndex == 0) {
                                    index = array[n].search(F);
                                } else if (this.inputSubIndex == 1) {
                                    index = array[n].search(N);
                                } else {
                                    index = array[n].length;
                                }
                            }
                            if (index !== -1 && index !== undefined) {
                                array[n] = array[n].slice(0, index) + event.key + array[n].slice(index);
                            } else {
                                array[n] += event.key;
                            }
                            Object.defineProperty(
                                this.currentWord,
                                Object.keys(this.currentWord)[this.inputIndex % 3 - 1],
                                { value: array }
                            );

                            if (this.tabMode) {
                                if (
                                    (this.splitMode && this.inputSubIndex != undefined && array[n].split(mfORn)[this.inputSubIndex + 1].slice(-6, -1) === '^tab^') ||
                                    (!this.splitMode && array[n].slice(-6, -1) === '^tab^')
                                ) {
                                    this.tabulator = '';
                                }
                                this.tabulator += event.key;
                                this.tabulatorAnimation(object);
                                object.classList.add('tabulator');
                            } else {
                                this.idleAnimation(object);
                            }

                        } else {
                            this.command += event.key;
                            training.commandAnimation(object);
                        }

                        this.keys++;

                    });
                }

                document.addEventListener('keydown', this.keydownFunction);

                window.addEventListener('keydown', (event: KeyboardEvent) => {
                    if (event.key === 'Tab') {
                        event.preventDefault();
                        this.container.focus();
                    } else if (event.key === '/') {
                        event.preventDefault();
                        this.container.focus();
                    }
                });

                break;
            default:
                break;
        }

    }

    empty(param: Parameter): [string, string, string] | [string, string, string, string, string, string] {
        let l = param.includes('verb') ? 3 : 6;
        return <[string, string, string] | [string, string, string, string, string, string]>new Array(l).fill('');
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
        let array = Object.values(this.currentWord)[this.inputIndex % 3 - 1] as string[];

        let n = Math.floor(this.inputIndex / 3) - 1;
        let word = this.splitMode ? array[n].split(mfORn)[this.inputSubIndex + 1] : array[n];
        let regex = new RegExp('\\^tab\\^', 'g');
        let matches = word.match(regex);
        this.tabCount = matches ? matches.length : 0;
        let inp = <HTMLDivElement>(this.splitMode ? this.selectedInput.children[this.inputSubIndex] : this.selectedInput);
        if (!matches ? false : matches.length % 2 === 0) {
            inp.classList.remove('tab');
        }
        this.selectedInput.classList.add('selectedElement');
        this.keys = this.selectedInput.childElementCount;
        if (this.splitMode && this.inputSubIndex != undefined) {
            inp.classList.add('selectedElement');
            this.keys = inp.childElementCount;
        }

        if (this.automaticPaddingAdjustment) {
            this.adjustInputWidth(inp, word, false);
            this.automaticPaddingAnimation(inp);
        } else {
            this.paddingAnimation(this.selectedInput);
        }
    }

    cancelTabMode(): void {
        // Simplified using COPILOT
        let array = Object.values(this.currentWord)[this.inputIndex % 3 - 1] as string[];
        let n = Math.floor(this.inputIndex / 3) - 1;
        let word = array[n];

        if (this.splitMode && this.inputSubIndex != undefined) {
            word = word.split(mfORn).at(this.inputSubIndex + 1);
        }

        if (word.includes('^tab^')) {
            let start = word.indexOf('^tab^');
            word = word.slice(0, start) + word.slice(start + 5);

            let end = word.indexOf('^tab^');
            if (end != -1) {
                word = word.slice(0, end) + word.slice(end + 5);
            } else end = word.length;

            let tabbedContent = word.slice(start, end);

            for (let i = 0; i < tabbedContent.length; i++) {
                if (this.splitMode && this.inputSubIndex != undefined) {
                    this.selectedInput.children[this.inputSubIndex].children[start].remove();
                } else {
                    this.selectedInput.children[start].remove();
                }
            }

            // not the problem
            if (this.splitMode && this.inputSubIndex != undefined) {
                let splitto = array[n].split(mfORn).slice(1);
                splitto[this.inputSubIndex] = word.slice(0, start) + word.slice(end + 5);
                array[n] = `^^m^^${splitto[0]}^^f^^${splitto[1]}^^n^^${splitto[2]}`;
                if (this.automaticPaddingAdjustment) this.adjustInputWidth(this.selectedInput.children[this.inputSubIndex] as HTMLDivElement, splitto[this.inputSubIndex], false);
            } else {
                array[n] = word.slice(0, start) + word.slice(end + 5);
                if (this.automaticPaddingAdjustment) this.adjustInputWidth(this.selectedInput, array[n], false)
            }

            this.keys -= tabbedContent.length;
        }

        this.tabMode = false;
        let inp = this.splitMode && this.inputSubIndex != undefined ? this.selectedInput.children[this.inputSubIndex] as HTMLDivElement : this.selectedInput;
        inp.classList.remove('tab');
    }

    findMostUsedTabulator(inflectedWord: InflectedWord): string {
        let tabulators = inflectedWord.singular.map(word => word.split(/\^tab\^/g).filter((v, i) => i % 2 === 1)).concat(inflectedWord.plural.map(word => word.split(/\^tab\^/g).filter((v, i) => i % 2 === 1)));
        let tabs: string[] = []; tabulators.forEach(wordList => wordList.forEach(word => tabs.push(word)));
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

        return checkedTabs.length ? checkedTabs[0][0] : undefined;
    }

    startNewTrainingRound(param: Parameter): void {
        this.splitMode = false;
        document.querySelectorAll('.split').forEach(el => el.classList.remove('split'));

        let vocab = this.vocabulary.filter(w => w.verb === param.includes('verb'));
        if (vocab.length === 0) {
            setTimeout(_ => alert(`Keine ${param.includes('verb') ? 'Konjugationen' : 'Deklinationen'}!`), 250);
            return;
        } else if (vocab.filter(w => !isEmpty(w)).length === 0) {
            setTimeout(_ => alert(`Nur leere ${param.includes('verb') ? 'Konjugationen' : 'Deklinationen'}!`), 250);
            return;
        }

        function isEmpty(w: InflectedWord) {
            return w.singular.filter(s => s.replaceAll(/\^\^m\^\^|\^\^f\^\^|\^\^n\^\^/g, '').trim() === '').length === (!param.includes('verb') ? 6 : 3) &&
                w.plural.filter(p => p.replaceAll(/\^\^m\^\^|\^\^f\^\^|\^\^n\^\^/g, '').trim() === '').length === (!param.includes('verb') ? 6 : 3);
        }

        this.round++;

        // Optimized using COPILOT
        const validWords = vocab.filter(w => !isEmpty(w));
        const overallProbability = validWords.reduce((sum, word) => sum + word.probability, 0);
        const randomNumber = Math.random() * overallProbability;

        this.failures = 0;
        let runningSum = 0;

        for (let i = 0; i < this.vocabulary.length; i++) {
            const word = this.vocabulary[i];
            if (!isEmpty(word) && word.verb === param.includes('verb')) {
                runningSum += word.probability;
                if (runningSum >= randomNumber) {
                    this.currentWord = word;
                    this.currentWordIndex = i;
                    break;
                }
            }
        }

        this.tabulator = this.findMostUsedTabulator(this.currentWord);
        document.querySelectorAll('.editable').forEach(div => {
            div.innerHTML = '';
            div.classList.remove('redShadowDesign');
            div.classList.remove('greenShadowDesign');
            div.classList.remove('known-case');
            div.classList.add('shadowDesign');
        });
        // - 

        let knownCase: string;
        let rn: number;
        let randi: number | undefined;
        let v = this.v / 3;
        do {
            rn = Math.floor(Math.random() * (param.includes('verb') ? 6 : 12));
            knownCase = Object.values(this.vocabulary[this.currentWordIndex])[rn > 5 - v ? 1 : 0][rn > 5 - v ? rn - 6 + v : rn];
            if (knownCase.search(mfANDn) != -1) {
                randi = Math.floor(Math.random() * 2);
                knownCase = knownCase.split(mfORn)[randi + 1];
            }
        } while (knownCase === '');

        knownCase = knownCase.replaceAll('^tab^', '');

        let specificationDiv = document.getElementById(`div${rn > 5 - v ? 2 + (rn - 5 + v) * 3 : 1 + (rn + 1) * 3}`);
        specificationDiv.classList.add('known-case');
        specificationDiv.innerHTML = `<span>${knownCase}</span>`;

        if (document.getElementById('div4') === specificationDiv) {
            this.inputIndex = 7;
            this.changeSelectedInput();
        }

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

        if (randi || randi === 0) {
            this.emptySplit(knownCase, randi);
        }
    }

    compare(string1: string, string2: string): boolean {
        return string1.replaceAll('^tab^', '') === string2.replaceAll('^tab^', '');
    }


    compareObjects(obj1: InflectedWord, obj2: InflectedWord): boolean {
        let object1 = JSON.parse(JSON.stringify(obj1));
        let object2 = JSON.parse(JSON.stringify(obj2));

        object1.singular.forEach((word, i) => {
            object1.singular[i] = word.replaceAll('^tab^', '');
        });

        object1.plural.forEach((word, i) => {
            object1.plural[i] = word.replaceAll('^tab^', '');
        });

        object2.singular.forEach((word, i) => {
            object2.singular[i] = word.replaceAll('^tab^', '');
        });

        object2.plural.forEach((word, i) => {
            object2.plural[i] = word.replaceAll('^tab^', '');
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
        input.style.borderColor = this.borderColor;
        input.style.paddingLeft = `${borderLeft - parseInt(window.getComputedStyle(input).borderLeftWidth.slice(0, -2))}px`;
        input.style.paddingTop = this.padding[id] - parseFloat(window.getComputedStyle(input).borderTopWidth.slice(0, -2)) + 'px';
        input.style.paddingRight = borderLeft - parseFloat(window.getComputedStyle(input).borderRightWidth.slice(0, -2)) + 'px';
        input.style.paddingBottom = this.padding[id] - parseFloat(window.getComputedStyle(input).borderBottomWidth.slice(0, -2)) + 'px';
        input.style.transition = 'none';
        input.style.paddingLeft = borderLeft - parseInt(window.getComputedStyle(input).borderLeft.slice(0, -2)) + 'px';

        setTimeout(_ => {
            input.style.borderColor = 'transparent';
            input.style.transition = "border-color 1.5s";

            this.timeout = setTimeout(_ => {
                input.style.padding = `${this.padding[id]}px ${0.05 * input.offsetHeight}px`;
                input.style.border = 'none';
                input.style.transition = 'none';
            }, 1500);
        }, 1);
    }

    automaticPaddingAnimation(input: HTMLDivElement, adjustment?: boolean, cancelable?: boolean): void {
        cancelable = cancelable === undefined || cancelable === true;
        clearInterval(this.firstInterval);
        clearInterval(this.secondInterval);
        clearTimeout(this.firstTimeout);

        if (cancelable && this.animatedInputIndex != undefined && adjustment === undefined) {
            let inp = <HTMLDivElement>document.querySelector(`#div${this.animatedInputIndex}`);
            inp = this.splitMode && this.animatedInputSubIndex != undefined ? inp.children[this.animatedInputSubIndex] as HTMLInputElement : inp;
            let paddingLeft = 0.05 * inp.offsetHeight;
            let paddingTop = this.splitMode ? this.splitPadding[this.animatedInputIndex][this.animatedInputSubIndex] : this.padding[this.animatedInputIndex];
            inp.style.padding = `${paddingTop}px ${paddingLeft}px`;
            inp.style.border = 'none';
        }


        if (input.classList.contains('known-case')) return;

        let id: number;
        let count: number;
        if (this.splitMode) {
            if (input.parentElement == this.container) return;
            id = parseInt(input.parentElement?.id.slice(3));
            for (let q = 0; q < input.parentElement?.childElementCount; q++) {
                if (input.parentElement.children[q] === input) {
                    count = q;
                    break;
                }
            }
        } else id = parseInt(input.id.slice(3));
        let borderLeft = 0.05 * input.offsetHeight;
        let newPadding = this.splitMode ? this.splitPadding[id][count] : this.padding[id];
        let borderWidth = adjustment ? this.animatedBorderWidth : 0;
        let $tepSize = (newPadding - borderWidth) / 20;
        let stepSize = newPadding / 20;
        let step = 0;
        let timeout1 = adjustment ? 1 : 250 / 20;
        let timeout2 = 250 / 20;
        let timeout: number;
        let interval1: number;
        let interval2: number;

        if (cancelable) this.firstInterval = setInterval(intervalFunction1.bind(this), timeout1);
        else interval1 = setInterval(intervalFunction1.bind(this), timeout1);

        window.addEventListener('resize', resizeHandler.bind(this), { passive: true });

        function intervalFunction1() {
            for (let i = 0; i < ((adjustment) ? 4 : 1); i++) {
                this.animatedInputIndex = id;
                this.animatedInputSubIndex = count;
                borderWidth += $tepSize;
                this.animatedBorderWidth = borderWidth;
                input.style.borderTopWidth = `${borderWidth}px`;
                input.style.borderRightWidth = `${20 - step === 0 ? borderLeft : borderLeft / (20 - step)}px`;
                input.style.borderBottomWidth = `${borderWidth}px`;
                input.style.borderLeftWidth = `${20 - step === 0 ? borderLeft : borderLeft / (20 - step)}px`;
                input.style.borderStyle = 'solid';
                input.style.borderColor = this.borderColor;
                input.style.transition = 'none';
                let paddingLeft = borderLeft - parseFloat(window.getComputedStyle(input).borderLeftWidth);
                let paddingTop = newPadding - parseFloat(window.getComputedStyle(input).borderTopWidth);
                input.style.padding = `${paddingTop}px ${paddingLeft}px`;
                step++;
                if (step === 20) {
                    if (cancelable) {
                        clearInterval(this.firstInterval);
                        this.firstTimeout = setTimeout(timeoutFunction.bind(this), timeout1 * 20);
                    } else {
                        clearInterval(interval1);
                        timeout = setTimeout(timeoutFunction.bind(this), timeout1 * 20);
                    }
                    break;
                }
            }
        }

        function timeoutFunction() {
            if (cancelable) this.secondInterval = setInterval(intervalFunction2.bind(this), timeout2);
            else interval2 = setInterval(intervalFunction2.bind(this), timeout2);
        }

        function intervalFunction2() {
            borderWidth -= stepSize;
            this.animatedBorderWidth = borderWidth;
            input.style.borderTopWidth = `${borderWidth}px`;
            input.style.borderRightWidth = `${20 - step === 0 ? borderLeft : borderLeft / (20 - step)}px`;
            input.style.borderBottomWidth = `${borderWidth}px`;
            input.style.borderLeftWidth = `${20 - step === 0 ? borderLeft : borderLeft / (20 - step)}px`;
            input.style.borderStyle = 'solid';
            input.style.borderColor = this.borderColor;
            let paddingLeft = borderLeft - parseFloat(window.getComputedStyle(input).borderLeft);
            let paddingTop = newPadding - parseFloat(window.getComputedStyle(input).borderTop);
            input.style.padding = `${paddingTop}px ${paddingLeft}px`;
            step--;
            if (step === 0) {
                input.style.border = 'none';
                input.style.paddingTop = `${newPadding}px`;
                input.style.paddingRight = `${borderLeft}px`;
                input.style.paddingBottom = `${newPadding}px`;
                input.style.paddingLeft = `${borderLeft}px`;
                window.removeEventListener('resize', resizeHandler.bind(this));
                clearInterval(cancelable ? this.secondInterval : interval2);
            }
        }

        function resizeHandler() {
            clearInterval(interval1);
            clearInterval(interval2);
            clearTimeout(timeout);

            let paddingLeft = borderLeft - parseFloat(window.getComputedStyle(input).borderLeft);
            let paddingTop = newPadding - parseFloat(window.getComputedStyle(input).borderTop);
            input.style.padding = `${paddingTop}px ${paddingLeft}px`;
            input.style.border = 'none';
            input.style.paddingTop = `${newPadding}px`;
            input.style.paddingRight = `${borderLeft}px`;
            input.style.paddingBottom = `${newPadding}px`;
            input.style.paddingLeft = `${borderLeft}px`;
        }
    }

    adjustInputWidth(input: HTMLDivElement, value: string, animation?: boolean): void {
        animation = animation === undefined || animation === true;
        if (input.classList.contains('known-case')) return;

        let v = value.replaceAll('^tab^', '');

        if (!input.hasChildNodes() && v.length == 0) {
            if (this.automaticPaddingAdjustment) {
                if (input.classList.contains('selected')) {
                    input.style.padding = 0.05 * input.offsetHeight + 'px';
                } else {
                    input.style.padding = 0.05 * input.offsetHeight + 'px';
                }

                input.style.border = 'none';
                this.padding[parseInt(input.id.slice(3))] = 0.05 * input.offsetHeight;
                if (animation) this.automaticPaddingAnimation(input, false, false);
                return;
            }

            if (animation) this.paddingAnimation(input);
            return;
        }

        let padding: number;
        let w = Math.round(input.getBoundingClientRect().width -
            parseFloat(window.getComputedStyle(input).paddingLeft) -
            parseFloat(window.getComputedStyle(input).paddingRight) -
            parseFloat(window.getComputedStyle(input).borderLeftWidth) -
            parseFloat(window.getComputedStyle(input).borderRightWidth)) * 100 / 100;
        let object = <HTMLObjectElement>input.lastElementChild;
        let id: number;
        let count: number;
        if (this.splitMode) {
            if (input.parentElement == this.container) return;
            id = parseInt(input.parentElement?.id.slice(3));
            for (let q = 0; q < input.parentElement?.childElementCount; q++) {
                if (input.parentElement.children[q] === input) {
                    count = q;
                    break;
                }
            }
        } else id = parseInt(input.id.slice(3));

        if (!object) return;
        object.hidden = false;
        let width = object.getBoundingClientRect().width;

        if (w / width < v.length || this.automaticPaddingAdjustment) {
            w = Math.round((input.getBoundingClientRect().width -
                parseFloat(window.getComputedStyle(input).paddingLeft) -
                parseFloat(window.getComputedStyle(input).paddingRight) -
                parseFloat(window.getComputedStyle(input).borderLeftWidth) -
                parseFloat(window.getComputedStyle(input).borderRightWidth)) * 100) / 100;
            let aspectRatio = object.getBoundingClientRect().height / object.getBoundingClientRect().width;
            let h = w / v.length * aspectRatio;
            padding = Math.max((input.getBoundingClientRect().height - h) / 2, input.offsetHeight * 0.05);


            if (!this.splitMode) this.padding[id] = padding;
            else this.splitPadding[id][count] = padding;

            this.animatedBorderWidth = parseFloat(window.getComputedStyle(input).borderTopWidth);
        }

        if (!animation) {
            clearInterval(this.firstInterval);
            clearInterval(this.secondInterval);
            clearTimeout(this.firstTimeout);
            return;
        }

        if (this.automaticPaddingAdjustment) {
            this.automaticPaddingAnimation(input, false, false);
        } else {
            this.paddingAnimation(input);
        }

        return;
    }

    splitGenders(currentWord: InflectedWord) {
        this.splitMode = true;
        this.commandMode = false;
        let container = document.querySelector('#container') as HTMLDivElement;
        this.automaticPaddingAdjustment = true;
        let objectCount = 0;
        let objectsLoaded = 0;
        for (let i = 3; i < container.childElementCount; i++) {
            let div = container.children[i] as HTMLDivElement;
            let singular = this.currentWord.singular;
            let tabulatorStyle = false;
            let plural = this.currentWord.plural;
            let divs: HTMLDivElement[] = Array.from({ length: 3 }, () => document.createElement('div'));
            let z = 0;
            let k = 0;
            this.splitPadding.push(new Array(3).fill(undefined) as [number, number, number]);
            if (i % 3 === 1) {
                div.classList.add('split')
                let array = Object.values(currentWord)[i % 3 - 1] as string[], n = Math.floor(i / 3) - 1;
                if (array[n].search(mfANDn) === -1) array[n] = `^^m^^${array[n]}^^f^^^^n^^`;
                let content = array[n].split(mfORn);
                content.splice(0, 1);
                if (singular[n].search(mfANDn) != -1) {
                    divs[z].innerHTML = '';
                    for (let ii = 5; ii < singular[n].length; ii++) {
                        if (singular[n].slice(ii, ii + 5) === '^tab^') {
                            tabulatorStyle = !tabulatorStyle;
                            ii += 4;
                        } else if (singular[n].slice(ii, ii + 5) == '^^n^^' || singular[n].slice(ii, ii + 5) == '^^f^^') {
                            z++;
                            ii += 4;
                            k = 0;
                        } else {
                            let object = document.createElement('object');
                            object.addEventListener('load', _ => {
                                let svg = object.contentDocument;
                                svg.querySelector('#tspan7').innerHTML = singular[n].charAt(ii);
                                if (object.classList.contains('tabulator')) {
                                    this.tabulatorAnimation(object);
                                }
                                objectsLoaded++;
                                if (objectsLoaded === objectCount) {
                                    document.querySelectorAll('object').forEach(o => o.hidden = false);
                                    for (let i = 4; i < this.container.children.length; i++) {
                                        if (i % 3 > 0) {
                                            let div = <HTMLDivElement>this.container.children[i];
                                            let array = Object.values(this.currentWord)[i % 3 - 1];
                                            let n = Math.floor(i / 3) - 1;
                                            let splitto = array[n].split(mfORn).slice(1);
                                            splitto.forEach((s, o) => {
                                                let input = <HTMLDivElement>div.children[o];
                                                input.style.padding = 0.05 * input.offsetHeight + 'px';
                                                this.adjustInputWidth(input, s, true);
                                            });
                                        }
                                    }
                                }
                            })
                            object.data = './keys/Reversion_T.svg';
                            object.id = `key${k}-inp${i}-sub${z}`;
                            object.style.height = `100%`;
                            divs[z].insertAdjacentElement('beforeend', object);
                            if (tabulatorStyle) object.classList.add('tabulator');
                            objectCount++;
                            k++;
                        }
                    }
                }
                div.innerHTML = '';
                divs.forEach((d) => div.appendChild(d));

            } else if (i % 3 === 2) {
                div.classList.add('split')
                let array = Object.values(currentWord)[i % 3 - 1] as string[], n = Math.floor(i / 3) - 1;
                if (array[n].search(mfANDn) === -1) array[n] = `^^m^^${array[n]}^^f^^^^n^^`;
                let content = array[n].split(mfORn);
                content.splice(0, 1);
                if (plural[n].search(mfANDn) != 1) {
                    this.container.children[i].innerHTML = '';
                    divs[z].innerHTML = '';
                    for (let ii = 5; ii < plural[n].length; ii++) {
                        if (plural[n].slice(ii, ii + 5) === '^tab^') {
                            tabulatorStyle = !tabulatorStyle;
                            ii += 4;
                        } else if (plural[n].slice(ii, ii + 5) == '^^n^^' || plural[n].slice(ii, ii + 5) == '^^f^^') {
                            z++;
                            ii += 4;
                        } else {
                            let object = document.createElement('object');
                            object.addEventListener('load', _ => {
                                let svg = object.contentDocument;
                                svg.querySelector('#tspan7').innerHTML = plural[n].charAt(ii);
                                if (object.classList.contains('tabulator')) {
                                    this.tabulatorAnimation(object);
                                }
                                objectsLoaded++;
                                if (objectsLoaded === objectCount) {
                                    document.querySelectorAll('object').forEach(o => o.hidden = false);
                                    for (let i = 4; i < this.container.children.length; i++) {
                                        if (i % 3 > 0) {
                                            let div = <HTMLDivElement>this.container.children[i];
                                            let array = Object.values(this.currentWord)[i % 3 - 1];
                                            let n = Math.floor(i / 3) - 1;
                                            let splitto = array[n].split(mfORn).slice(1);
                                            splitto.forEach((s, o) => {
                                                let input = <HTMLDivElement>div.children[o];
                                                input.style.padding = 0.05 * input.offsetHeight + 'px';
                                                this.adjustInputWidth(input, s, true);
                                            });
                                        }
                                    }
                                }
                            });
                            object.data = './keys/Reversion_T.svg';
                            object.id = `key${ii}-inp${i}`;
                            object.style.height = `100%`;
                            divs[z].insertAdjacentElement('beforeend', object);
                            objectCount++;
                            if (tabulatorStyle) object.classList.add('tabulator');
                        }
                    }
                }
                div.innerHTML = '';
                divs.forEach(d => div.appendChild(d));
            }
        }

        let sel = this.selectedInput.firstChild as HTMLDivElement;
        sel.classList.add('selectedElement');
        this.inputSubIndex = 0;
        this.genderSplitButton.style.display = 'none';
        this.borderColor = 'orange';
        this.changeSelectedInput();
    }

    emptySplit(knownCase: string, randi: number) {
        for (let i = 3; i < this.container.childElementCount; i++) {
            let div = this.container.children[i] as HTMLDivElement;
            this.splitPadding[i] = new Array(3).fill(undefined) as [number, number, number];
            if (div.classList.contains('editable')) {
                div.classList.add('split');
                div.innerHTML = Array.from({ length: 3 }, (v, ii) => `<div class="shadowDesign ${div.classList.contains('known-case') && ii === randi ? 'known-case' : ''}">${div.classList.contains('known-case') && ii === randi ? '<span>' + knownCase + '</span>' : ''}</div>`).join('');
                let array = Object.values(this.currentWord)[i % 3 - 1];
                let n = Math.floor(i / 3) - 1;
                array[n] = '^^m^^^^f^^^^n^^';
                if (div.classList.contains('known-case')) {
                    let splitto = ['', '', ''];
                    splitto[randi] = knownCase;
                    array[n] = `^^m^^${splitto[0]}^^f^^${splitto[1]}^^n^^${splitto[2]}`;
                    div.classList.remove('known-case');
                }
            }
        }
        this.inputSubIndex = 0;
        this.inputIndex = 4;
        this.splitMode = true;
        this.automaticPaddingAdjustment = true;
        let singleResult = [];
        let singleResult2 = [];
        for (let i = 0; i < 6; i++) {
            singleResult[i] = [undefined, undefined, undefined];
            singleResult2[i] = [undefined, undefined, undefined];
        }
        let s = singleResult as SingleResult;
        let s2 = singleResult2 as SingleResult;

        this.result.singular = s;
        this.result.plural = s2;
        this.changeSelectedInput();
    }
}

type Parameter = 'nouns' | 'verbs' | 'add nouns' | 'add verbs';

type SingleResult = [boolean, boolean, boolean] |
[boolean, boolean, boolean, boolean, boolean, boolean] |
[
    [boolean, boolean, boolean],
    [boolean, boolean, boolean],
    [boolean, boolean, boolean],
    [boolean, boolean, boolean],
    [boolean, boolean, boolean],
    [boolean, boolean, boolean],
    [boolean, boolean, boolean],
]
type Result = {
    singular: SingleResult,
    plural: SingleResult
}

const mfORn = /\^\^m\^\^|\^\^f\^\^|\^\^n\^\^/;
const mfANDn = /\^\^m\^\^.*\^\^f\^\^.*\^\^n\^\^/g;
const F = /\^\^f\^\^/g;
const N = /\^\^n\^\^/g;

export interface InflectedWord {
    singular: [string, string, string, string, string, string] | [string, string, string];
    plural: [string, string, string, string, string, string] | [string, string, string];
    verb: boolean;
    probability: number;
}