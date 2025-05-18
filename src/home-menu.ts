import { addVocabulary, removeAllEventListeners, showVocabulary, inflectVocabulary, training } from "..";

export class HomeMenu {
    input: HTMLDivElement;
    iconPlaceholder: HTMLDivElement;
    navbar: HTMLDivElement;

    padding = 0;
    command = '';
    keyDownFunction: EventListener;
    resizeFunction: EventListener;

    constructor() {
        this.modifyDocument();
    }

    modifyDocument(): void {
        this.resizeFunction = () => {
            let object = <HTMLObjectElement>this.input.lastElementChild;
            if (!object) return;
            let w = window.innerWidth;
            let aspectRatio = object.getBoundingClientRect().height / object.getBoundingClientRect().width;
            let h = (w / (this.input.childElementCount + 1)) * aspectRatio;
            let padding = (this.input.getBoundingClientRect().height - h) / 2;
            this.padding = Math.max(padding, 1);
            this.movementAnimation();

            this.movementAnimation()
        };
        window.addEventListener('resize', this.resizeFunction);
        this.input = document.querySelector('#container');
        this.iconPlaceholder = document.querySelector('#icon-placeholder');
        this.navbar = document.querySelector('#navbar');

        if (document.querySelector('.homeDiv')) {
            let homeDiv = document.querySelector('.homeDiv');
            homeDiv.remove();
        }

        document.body.style.backgroundImage = 'none';
        document.body.style.backgroundImage = 'linear-gradient(180deg, #140063 0%, #06011b 65%, #06011b 77%, #140063 100%)';
        document.body.setAttribute('class', '');
        this.input.setAttribute('class', '');
        this.iconPlaceholder.setAttribute('class', '');
        this.navbar.setAttribute('class', '');
        this.input.innerHTML = '';
        this.iconPlaceholder.innerHTML = '';
        this.navbar.innerHTML = '';

        let icon = document.createElement('object');
        icon.data = './icon.svg';
        icon.id = 'icon';
        this.iconPlaceholder.insertAdjacentElement('beforeend', icon);
        console.log('servas');
        let version = document.createElement('object');
        version.data = './version.svg';
        version.id = 'version';
        this.iconPlaceholder.insertAdjacentElement('beforeend', version);

        document.body.classList.add('homeBody');
        this.input.classList.add('homeInput');
        this.iconPlaceholder.classList.add('homeIconPlaceholder');
        this.navbar.classList.add('homeNavbar');

        this.type();
    }

    type(): void {
        let keys = 0;
        this.keyDownFunction = (event: KeyboardEvent) => {
            let forbiddenCharacters = ['<', '´', '`', '^'];
            if (event.key === 'Backspace' && this.input.lastElementChild) {
                this.input.lastElementChild.remove();
                this.command = this.command.slice(0, this.command.length - 1);
                keys--;
                let object = <HTMLObjectElement>this.input.lastElementChild;
                if (!object) return;
                let w = window.innerWidth;
                let aspectRatio = object.getBoundingClientRect().height / object.getBoundingClientRect().width;
                let h = (w / (keys + 1)) * aspectRatio;
                let padding = (this.input.getBoundingClientRect().height - h) / 2;
                this.padding = Math.max(padding, 1);
                this.movementAnimation();
                return;
            } else if (event.key === 'Enter') {
                switch (this.command) {
                    case 'add vocabulary':
                    case 'add':
                    case 'add vocabulary':
                    case 'neu':
                    case 'hinzufügen':
                    case 'neues wort':
                    case 'neues Wort':
                    case 'Vokabeln hinzufügen':
                        removeAllEventListeners();
                        addVocabulary.modifyDocument();
                        break;
                    case 'show vocabulary':
                    case 'show':
                    case 'tabelle':
                    case 'Tabelle':
                    case 'Vokabeln anzeigen':
                        removeAllEventListeners();
                        showVocabulary.modifyDocument();
                        break;
                    case 'training':
                    case 'Training':
                    case 'trainer':
                    case 'Training':
                    case 'üben':
                    case 'Üben':
                    case 'vocabuary training':
                        removeAllEventListeners();
                        training.modifyDocument();
                        break;
                    case 'declinations':
                    case 'deklinationen':
                    case 'Deklinationen':
                    case 'conj':
                    case 'add declinations':
                        removeAllEventListeners();
                        inflectVocabulary.modifyDocument('add nouns');
                        break;
                    case 'deklinieren':
                    case 'deklinationstraining':
                    case 'Deklinationstraining':
                    case 'decline nouns':
                    case 'decline':
                    case 'ct':
                        removeAllEventListeners();
                        inflectVocabulary.modifyDocument('nouns');
                        break;
                    case 'v':
                    case 'conjugations':
                    case 'konjugationen':
                    case 'Konjugationen':
                        removeAllEventListeners();
                        inflectVocabulary.modifyDocument('add verbs');
                        break;
                    case 'conjugate':
                    case 'konjugieren':
                    case 'konjugationstraining':
                    case 'Konjugationstraining':
                    case 'vt':
                        removeAllEventListeners();
                        inflectVocabulary.modifyDocument('verbs');
                        break;
                    default:
                        break;
                }

                keys = 0;
                this.command = '';
                this.padding = 0;
                this.input.innerHTML = '';
                return;
            } else if (forbiddenCharacters.includes(event.key) || event.key.length > 1) {
                return;
            }

            let object = document.createElement('object');
            object.data = './keys/OG_T.svg';
            object.id = `key${keys}`;
            object.style.height = `100%`;
            this.input.insertAdjacentElement('beforeend', object);
            object.hidden = true;

            object.addEventListener('load', _ => {
                object.hidden = false;
                let width = Math.floor(object.getBoundingClientRect().width * 100) / 100;
                let w = window.innerWidth;
                object.hidden = true;
                if (keys + 2 > Math.floor(w / width)) {
                    object.hidden = false;
                    let aspectRatio = object.getBoundingClientRect().height / object.getBoundingClientRect().width;
                    object.hidden = true;
                    let h = (w / (keys + 2)) * aspectRatio;
                    let padding = (this.input.getBoundingClientRect().height - h) / 2;
                    if (padding > this.input.getBoundingClientRect().height / 2 * 0.85) {
                        object.remove();
                        for (let i = 0; i < keys; i++) {
                            addVocabulary.failureAnimation(<HTMLObjectElement>this.input.children[i]);
                        }
                        return;
                    } else {
                        this.padding = Math.max(padding, 1);
                    }
                }
                object.hidden = false;

                let svg = object.contentDocument;
                svg.querySelector('#tspan7').innerHTML = event.key.charAt(0);

                this.command += event.key;

                keys++;

                this.idleAnimation(object);
                this.movementAnimation();
            });
        }

        document.addEventListener('keydown', this.keyDownFunction);
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

    movementAnimation(): void {
        if (!this.input) {
            return;
        }

        let object = <HTMLObjectElement>this.input.firstChild;
        let inp = this.input;
        if (object) {
            if (inp.childElementCount > 1) {
                inp.style.transition = 'padding 250ms';
            }
            inp.style.paddingTop = `${this.padding}px`;
            inp.style.paddingBottom = `${this.padding}px`;

            let height = inp.getBoundingClientRect().height - 2 * this.padding;
            inp.style.paddingRight = `${(window.innerWidth - inp.childElementCount * height) / 2}px`;
            inp.style.paddingLeft = `${(window.innerWidth - inp.childElementCount * height) / 2}px`;
        }
    }
}

