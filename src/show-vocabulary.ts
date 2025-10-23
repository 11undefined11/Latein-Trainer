import { addVocabulary, createDiv, home, removeAllEventListeners } from "..";
import { AddVocabulary, WordBundle } from "./add-vocabulary";

export class ShowVocabulary {
    container: HTMLDivElement;
    iconPlaceholder: HTMLDivElement;
    navbar: HTMLDivElement;

    vocabulary: WordBundle[];
    containers: number[] = [];
    database: IDBDatabase;
    resizeFunction: EventListener;

    constructor() { }

    modifyDocument(): void {
        const request = window.indexedDB.open('Vocabulary', 2);

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

                let showVocabularyIcon = document.createElement('object');
                showVocabularyIcon.data = './show_vocabulary.svg';
                showVocabularyIcon.id = 'showVocabularyIcon';
                this.iconPlaceholder.insertAdjacentElement('beforeend', showVocabularyIcon);

                for (let i = 0, str = 'HOME MENU'; i < str.length; i++) {
                    let span = document.createElement('span');
                    span.innerText = str[i];
                    this.navbar.insertAdjacentElement('beforeend', span);
                }

                let navbarClickFunction = _ => {
                    removeAllEventListeners();
                    this.navbar.removeEventListener('click', navbarClickFunction);
                    home.modifyDocument();
                }
                this.navbar.addEventListener('click', navbarClickFunction);

                document.body.classList.add('showVocabularyBody');
                this.container.classList.add('showVocabularyContainer');
                this.iconPlaceholder.classList.add('showVocabularyIconPlaceholder');
                this.navbar.classList.add('showVocabularyNavbar');
                this.renderVocabulary();
            }
        });
    }

    renderVocabulary(): void {
        const ignFunction: EventListener = (event: MouseEvent) => {
            event.preventDefault();
            event.stopPropagation();
            let element = <HTMLDivElement>event.target;
            let attribute: number;
            let id: number;

            if (element.id.includes('latinWord')) {
                attribute = 0;
                id = parseInt(element.id.replaceAll('latinWord', ''));
            } else if (element.id.includes('inflections')) {
                attribute = 1;
                id = parseInt(element.id.replaceAll('inflections', ''));
            } else if (element.id.includes('germanTranslation')) {
                attribute = 2;
                id = parseInt(element.id.replaceAll('germanTranslation', ''));
            } else if (element.id.includes('relatedForeignWords')) {
                attribute = 3;
                id = parseInt(element.id.replaceAll('relatedForeignWords', ''));
            } else if (element.tagName === 'INPUT' && element.parentElement.classList.contains('word')) {
                attribute = parseInt(element.id.split('-')[0]);
                id = parseInt(element.id.split('-')[1]);
                element.blur();
                element = <HTMLDivElement>element.parentElement;
            }


            if (id != undefined && attribute != undefined && this.vocabulary[id]) {
                let value = <string>Object.values(this.vocabulary[id])[attribute];
                if (value.includes('^ign^')) {
                    value = value.replaceAll('^ign^', '');
                    element.classList.remove('ign');
                } else {
                    value = '^ign^' + value;
                    element.classList.add('ign');
                }
                this.vocabulary[id][Object.keys(this.vocabulary[id])[attribute]] = value;
                const transaction = this.database.transaction('vocabulary', 'readwrite');
                transaction.onerror = _ => console.error(transaction.error);
                const objectStore = transaction.objectStore('vocabulary');
                const request = objectStore.get(id + 1);
                request.onerror = _ => console.error(request.error);
                request.onsuccess = _ => {
                    const data = request.result;
                    if (!data) return;
                    Object.defineProperty(
                        data,
                        Object.keys(data)[attribute],
                        { value: value }
                    );

                    let cdiv = <HTMLDivElement>document.getElementById(`checkboxDiv${id}`);
                    let ignWords: number = Object.values(data).slice(0, 4).filter((w: string) => w.includes('^ign^')).length;
                    if (ignWords === 4) {
                        data.selected = false;
                        this.vocabulary[id].selected = false;
                        let cdiv = this.container.querySelector("#checkboxDiv" + (id));
                        cdiv.classList.add('ign');
                        cdiv.innerHTML = "";
                        let img = document.createElement('img');
                        img.src = './ign.svg';
                        cdiv.append(img);
                    } else if (ignWords === 3) {
                        let cdiv = this.container.querySelector("#checkboxDiv" + (id));
                        cdiv.innerHTML = "";
                        cdiv.classList.remove("ign");
                        let img = document.createElement('img');
                        img.src = './ign.svg';
                        img.classList.add("white");
                        cdiv.append(img);
                    } else if (ignWords === 0) {
                        data.selected = true;
                        this.vocabulary[id].selected = true;
                        let cdiv = this.container.querySelector("#checkboxDiv" + (id));
                        cdiv.innerHTML = "";
                        cdiv.classList.remove("ign");
                        let img = document.createElement('img');
                        img.src = './fully-selected.svg';
                        cdiv.append(img);
                    } else {
                        let cdiv = this.container.querySelector("#checkboxDiv" + (id));
                        cdiv.innerHTML = "";
                        cdiv.classList.remove("ign");
                        let img = document.createElement('img');
                        img.src = './selected.svg';
                        cdiv.append(img);
                    }

                    const req = objectStore.put(data, id + 1);
                    req.onerror = _ => console.error(req.error);
                }
            }
        }

        const selectFunction: EventListener = (event: MouseEvent) => {
            event.preventDefault();
            event.stopPropagation();
            let element = <HTMLDivElement>event.target;
            if (element.classList.contains('cdiv')) {
                let id = parseInt(element.id.replaceAll('checkboxDiv', ''));
                if (this.vocabulary[id]) {
                    let value = !this.vocabulary[id].selected;
                    this.vocabulary[id].selected = value;

                    if (!value) {
                        for (let i = 0; i < 4; i++) {
                            if (!Object.values(this.vocabulary[id])[i].includes('^ign^')) {
                                this.vocabulary[id][Object.keys(this.vocabulary[id])[i]] = '^ign^' + this.vocabulary[id][Object.keys(this.vocabulary[id])[i]];
                            }
                            let word: HTMLDivElement = <HTMLDivElement>document.getElementById(Object.keys(this.vocabulary[id])[i] + id);
                            if (word && !word.classList.contains('ign')) {
                                word.classList.add('ign');
                            }
                            element.classList.add('ign');
                            element.innerHTML = "";
                            let img = document.createElement('img');
                            img.src = './ign.svg';
                            element.append(img);
                        }
                    } else {
                        for (let i = 0; i < 4; i++) {
                            if (Object.values(this.vocabulary[id])[i].includes('^ign^')) {
                                this.vocabulary[id][Object.keys(this.vocabulary[id])[i]] = Object.values(this.vocabulary[id])[i].replaceAll('^ign^', '');
                            }
                            let word: HTMLDivElement = <HTMLDivElement>document.getElementById(Object.keys(this.vocabulary[id])[i] + id);
                            if (word && word.classList.contains('ign')) {
                                word.classList.remove('ign');
                            }
                            element.classList.remove('ign');
                            element.innerHTML = "";
                            let img = document.createElement('img');
                            img.src = './fully-selected.svg';
                            element.append(img);
                        }
                    }

                    const transaction = this.database.transaction('vocabulary', 'readwrite');
                    transaction.onerror = _ => console.error(transaction.error);
                    const objectStore = transaction.objectStore('vocabulary');
                    const request = objectStore.get(id + 1);
                    request.onerror = _ => console.error(request.error);
                    request.onsuccess = _ => {
                        const data = request.result;
                        if (data) {
                            this.vocabulary[id].probability = data.probability;
                            const req = objectStore.put(this.vocabulary[id], id + 1);
                            req.onerror = _ => console.error(req.error);
                        }
                    }
                }
            }
        }

        const headerFunction: EventListener = (event: MouseEvent) => {
            event.preventDefault();
            event.stopPropagation();
            let element = <HTMLElement>event.target;
            if (element.classList.contains('header')) {
                let header = <HTMLDivElement>element;
                let key: 'latinWord' | 'inflections' | 'germanTranslation' | 'relatedForeignWords';
                switch (header.id) {
                    case 'latin-word':
                        key = 'latinWord';
                        break;
                    case 'inflections':
                        key = 'inflections';
                        break;
                    case 'german-translation':
                        key = 'germanTranslation';
                        break;
                    case 'related-foreign-words':
                        key = 'relatedForeignWords';
                        break;
                    default:
                        return;
                }

                const transaction = this.database.transaction('vocabulary', 'readwrite');
                transaction.onerror = _ => console.error(transaction.error);
                const objectStore = transaction.objectStore('vocabulary');
                const request = objectStore.openCursor();
                request.onerror = _ => console.error(request.error);
                request.onsuccess = _ => {
                    const cursor = request.result;
                    if (cursor) {
                        let k = <number>cursor.key;
                        const updatedData = cursor.value;
                        if (updatedData.latinWord.includes('^con^')) {
                            cursor.continue();
                        } else {
                            if (header.classList.contains('ign')) {
                                if (updatedData.selected) {
                                    updatedData[key] = updatedData[key].replaceAll('^ign^', '');
                                    this.vocabulary[k - 1][key] = updatedData[key];
                                    let div = document.querySelector(`#${key}${k - 1}`) as HTMLDivElement;
                                    if (div) div.classList.remove('ign');
                                }
                            } else {
                                if (!updatedData[key].includes('^ign^')) {
                                    updatedData[key] = '^ign^' + updatedData[key];
                                }
                                this.vocabulary[k - 1][key] = updatedData[key];
                                let div = document.querySelector(`#${key}${k - 1}`) as HTMLDivElement;
                                if (!div.classList.contains('ign')) div.classList.add('ign');
                            }

                            let ignWords: number = Object.values(updatedData).slice(0, 4).filter((w: string) => w.includes('^ign^')).length;
                            if (ignWords === 4) {
                                updatedData.selected = false;
                                this.vocabulary[k - 1].selected = false;
                                let cdiv = this.container.querySelector("#checkboxDiv" + (k - 1));
                                cdiv.classList.add('ign');
                                cdiv.innerHTML = "";
                                let img = document.createElement('img');
                                img.src = './ign.svg';
                                cdiv.append(img);
                            } else if (ignWords === 3) {
                                let cdiv = this.container.querySelector("#checkboxDiv" + (k - 1));
                                cdiv.classList.remove('ign');
                                cdiv.innerHTML = "";
                                let img = document.createElement('img');
                                img.src = './ign.svg';
                                img.classList.remove("white");
                                cdiv.append(img);
                            } else if (ignWords === 0) {
                                let cdiv = this.container.querySelector("#checkboxDiv" + (k - 1));
                                cdiv.classList.remove('ign');
                                cdiv.innerHTML = "";
                                let img = document.createElement('img');
                                img.src = './fully-selected.svg';
                                cdiv.append(img);
                            } else {
                                let cdiv = this.container.querySelector("#checkboxDiv" + (k - 1));
                                cdiv.classList.remove('ign');
                                cdiv.innerHTML = "";
                                let img = document.createElement('img');
                                img.src = './selected.svg';
                                cdiv.append(img);
                            }
                            cursor.update(updatedData);
                            cursor.continue();
                        }
                    }
                }

                transaction.oncomplete = _ => {
                    if (header.classList.contains('ign')) {
                        header.classList.remove('ign');
                    } else {
                        header.classList.add('ign');
                    }
                }
            }
        }

        const conFunction: EventListener = (event: MouseEvent) => {
            event.preventDefault();
            event.stopPropagation();

            let element = <HTMLElement>event.target;
            if (element.parentElement.classList.contains('unit') && element.tagName != "IMG") {
                element = element.parentElement;
            }
            if (element.classList.contains('unit')) {
                let unit = <HTMLDivElement>element;
                let id = parseInt(unit.id.replaceAll('unit', '')) - 1;
                let index = this.containers[id];


                let nextIndex = (index === this.containers[this.containers.length - 1]) ? this.vocabulary.length : this.containers[id + 1];
                const transaction = this.database.transaction('vocabulary', 'readwrite');
                transaction.onerror = _ => console.error(transaction.error);
                const objectStore = transaction.objectStore('vocabulary');
                const request = objectStore.openCursor();
                request.onerror = _ => console.error(request.error);
                request.onsuccess = _ => {
                    const cursor = request.result;
                    if (cursor) {
                        let k = <number>cursor.key - 1;
                        if (k === index) {
                            const updatedData = cursor.value;
                            let l: string = <string>updatedData.latinWord;
                            if (l.includes('^ign^')) {
                                l = l.replaceAll('^ign^', '');
                                updatedData.latinWord = l;
                            } else if (!l.includes('^ign^')) {
                                l = '^ign^' + l;
                                updatedData.latinWord = l;
                            }
                            cursor.update(updatedData);
                        }
                        if (k > index && k < nextIndex) {
                            const updatedData = cursor.value;
                            if (!unit.classList.contains('ign')) {
                                for (let a = 0; a < 4; a++) {
                                    if (!Object.values(this.vocabulary[k])[a].includes('^ign^')) {
                                        Object.defineProperty(
                                            this.vocabulary[k],
                                            Object.keys(this.vocabulary[k])[a],
                                            { value: '^ign^' + this.vocabulary[k][Object.keys(this.vocabulary[k])[a]] }
                                        );
                                        Object.defineProperty(
                                            updatedData,
                                            Object.keys(updatedData)[a],
                                            { value: '^ign^' + updatedData[Object.keys(updatedData)[a]] }
                                        );
                                    }
                                    let div: HTMLDivElement = <HTMLDivElement>document.getElementById(Object.keys(this.vocabulary[k])[a] + k);
                                    if (div && !div.classList.contains('ign')) {
                                        div.classList.add('ign');
                                    }
                                }
                                this.vocabulary[k].selected = false;
                                updatedData.selected = false;
                                let cdiv: HTMLDivElement = <HTMLDivElement>document.getElementById(`checkboxDiv${k}`);
                                if (cdiv && !cdiv.classList.contains('ign')) {
                                    cdiv.classList.add('ign');
                                    cdiv.innerHTML = "";
                                    let img = document.createElement('img');
                                    img.src = './ign.svg';
                                    cdiv.append(img);
                                }
                            } else {
                                for (let a = 0; a < 4; a++) {
                                    if (Object.values(this.vocabulary[k])[a].includes('^ign^')) {
                                        Object.defineProperty(
                                            this.vocabulary[k],
                                            Object.keys(this.vocabulary[k])[a],
                                            { value: Object.values(this.vocabulary[k])[a].replaceAll('^ign^', '') }
                                        );
                                        Object.defineProperty(
                                            updatedData,
                                            Object.keys(updatedData)[a],
                                            { value: this.vocabulary[k][Object.keys(this.vocabulary[k])[a]] }
                                        );
                                    }
                                    let div: HTMLDivElement = <HTMLDivElement>document.getElementById(Object.keys(this.vocabulary[k])[a] + k);
                                    if (div && div.classList.contains('ign')) {
                                        div.classList.remove('ign');
                                    }
                                }
                                this.vocabulary[k].selected = true;
                                updatedData.selected = true;
                                let cdiv: HTMLDivElement = <HTMLDivElement>document.getElementById(`checkboxDiv${k}`);
                                if (cdiv && cdiv.classList.contains('ign')) {
                                    cdiv.classList.remove('ign');
                                    cdiv.innerHTML = "";
                                    let img = document.createElement('img');
                                    img.src = './fully-selected.svg';
                                    cdiv.append(img);
                                }
                            }
                            cursor.update(updatedData);
                        }
                        cursor.continue();
                    }
                }

                transaction.oncomplete = _ => {
                    if (unit.classList.contains('ign')) {
                        unit.classList.remove('ign');
                    } else {
                        unit.classList.add('ign');
                    }
                }
            }
        }

        let str = '';
        let decoration = createDiv('decoration', 'header');
        let latinWord = createDiv('latin-word', 'header');
        latinWord.innerHTML = 'Latein';
        let inflections = createDiv('inflections', 'header');
        inflections.innerHTML = 'Formen';
        let germanTranslation = createDiv('german-translation', 'header');
        germanTranslation.innerHTML = 'Deutsch';
        let relatedForeignWords = createDiv('related-foreign-words', 'header');
        relatedForeignWords.innerHTML = 'Fremdwörter';
        [decoration, latinWord, inflections, germanTranslation, relatedForeignWords].forEach(header => {
            header.addEventListener('contextmenu', headerFunction);
            this.container.append(header);
        });


        let unit: number = 1;
        this.vocabulary.forEach((word, i) => {
            if (word.latinWord.includes('^con^')) {
                let n_unit = createDiv(`unit${unit}`, 'unit');
                this.container.append(n_unit);
                n_unit.innerHTML = `<div></div><span>${word.latinWord.replaceAll('^con^', '').replaceAll('^ign^', '')}</span>`;
                let img = document.createElement('img');
                img.src = './arrow_down.svg';
                img.id = 'arrowDown';
                img.style.cursor = 'pointer';
                n_unit.append(img);
                n_unit.classList.add('down');
                n_unit.addEventListener('contextmenu', conFunction);
                if (word.latinWord.includes('^ign^')) {
                    n_unit.classList.add("ign");
                }
                unit++;
                this.containers.push(i);

                img.addEventListener('click', _ => {
                    if (img.classList.contains('rotated')) {
                        img.style.transform = 'rotate(0deg)';
                        img.classList.remove('rotated');
                    } else {
                        img.style.transform = 'rotate(90deg)';
                        img.classList.add('rotated');
                    }
                    this.clickUnit(n_unit, i);
                });
            } else {
                str += 'auto ';

                let Cdiv = createDiv(`checkboxDiv${i}`, 'word');
                let div1 = createDiv(`latinWord${i}`, 'word');
                let div2 = createDiv(`inflections${i}`, 'word');
                let div3 = createDiv(`germanTranslation${i}`, 'word');
                let div4 = createDiv(`relatedForeignWords${i}`, 'word');

                Cdiv.classList.add('cdiv');

                div1.innerHTML = `<input type="text" id="0-${i}" class="edit" value="${(word.latinWord === '') ? ' ' : word.latinWord.replaceAll('"', "&QUOT;")}"></input>`;
                div2.innerHTML = `<input type="text" id="1-${i}" class="edit" value="${(word.inflections === '') ? ' ' : word.inflections.replaceAll('"', "&QUOT;")}"></input>`;
                div3.innerHTML = `<input type="text" id="2-${i}" class="edit" value="${(word.germanTranslation === '') ? ' ' : word.germanTranslation.replaceAll('"', "&QUOT;")}"></input>`;
                div4.innerHTML = `<input type="text" id="3-${i}" class="edit" value="${(word.relatedForeignWords === '') ? ' ' : word.relatedForeignWords.replaceAll('"', "&QUOT;")}"></input>`;

                [div1, div2, div3, div4].forEach(div => {
                    if (div.querySelector('input')?.value.includes('^ign^')) {
                        div.classList.add('ign');
                        div.querySelector('input')!.value = div.querySelector('input')?.value.replaceAll('^ign^', '');
                    }
                });


                let ignWords: number = Object.values(word).slice(0, 4).filter((w: string) => w.includes('^ign^')).length;
                if (!word.selected || ignWords === 4) {
                    [Cdiv, div1, div2, div3, div4].forEach(div => div.classList.add('ign'));
                    let img = document.createElement('img');
                    img.src = './ign.svg';
                    Cdiv.append(img);
                } else if (ignWords === 3) {
                    let img = document.createElement('img');
                    img.src = './ign.svg';
                    img.classList.add('white');
                    Cdiv.append(img);
                } else if (ignWords === 0) {
                    Cdiv.innerHTML = "";
                    let img = document.createElement('img');
                    img.src = './fully-selected.svg';
                    Cdiv.append(img);
                } else {
                    Cdiv.innerHTML = "";
                    let img = document.createElement('img');
                    img.src = './selected.svg';
                    Cdiv.append(img);
                }



                Cdiv.addEventListener('contextmenu', selectFunction);

                // COPILOT
                const autoScaleInput = (input: HTMLInputElement) => {
                    const parentWidth = window.innerWidth * 0.22;
                    const maxFontSize = 0.015 * window.innerHeight;
                    let fontSize = maxFontSize;

                    const ctx = document.createElement('canvas').getContext('2d');
                    if (!ctx) return;

                    const style = window.getComputedStyle(input);
                    const fontProps = [
                        style.fontStyle || 'normal',
                        style.fontVariant || 'normal',
                        style.fontWeight || 'normal',
                        `${fontSize}px`,
                        style.fontFamily || 'inherit'
                    ].join(' ');

                    ctx.font = fontProps;
                    const text = input.value.replaceAll('"', "&QUOT;") || input.placeholder || '';

                    while (ctx.measureText(text).width > parentWidth && fontSize > 1) {
                        fontSize--;
                        ctx.font = [
                            style.fontStyle || 'normal',
                            style.fontVariant || 'normal',
                            style.fontWeight || 'normal',
                            `${fontSize}px`,
                            style.fontFamily || 'inherit'
                        ].join(' ');
                    }

                    while (ctx.measureText(text).width < parentWidth - 10 && fontSize < maxFontSize) {
                        fontSize++;
                        ctx.font = [
                            style.fontStyle || 'normal',
                            style.fontVariant || 'normal',
                            style.fontWeight || 'normal',
                            `${fontSize}px`,
                            style.fontFamily || 'inherit'
                        ].join(' ');
                        if (ctx.measureText(text).width > parentWidth) {
                            fontSize--;
                            ctx.font = [
                                style.fontStyle || 'normal',
                                style.fontVariant || 'normal',
                                style.fontWeight || 'normal',
                                `${fontSize}px`,
                                style.fontFamily || 'inherit'
                            ].join(' ');
                            break;
                        }
                    }

                    input.style.fontSize = `${fontSize}px`;
                };
                const inputs = [div1, div2, div3, div4].map(div => div.querySelector('input') as HTMLInputElement).filter(Boolean);

                this.resizeFunction = () => {
                    inputs.forEach(input => autoScaleInput(input));
                }

                inputs.forEach(input => {
                    input.style.width = '22vw';
                    input.addEventListener('input', () => autoScaleInput(input));
                });
                window.addEventListener("resize", this.resizeFunction);


                this.container.append(Cdiv, div1, div2, div3, div4);
                inputs.forEach(input => autoScaleInput(input));
            }
        });

        for (let i = 1; i < unit; i++) {
            let i_unit = this.container.querySelector('#unit' + i) as HTMLDivElement;
            let img = i_unit.querySelector("#arrowDown") as HTMLImageElement;
            if (img.classList.contains('rotated')) {
                img.style.transform = 'rotate(0deg)';
                img.classList.remove('rotated');
            } else {
                img.style.transform = 'rotate(90deg)';
                img.classList.add('rotated');
            }
            this.clickUnit(i_unit, this.containers[i - 1]);
        }

        this.container.style.gridTemplateRows = str;


        let wordList = document.querySelectorAll('.word');
        wordList.forEach((div: HTMLDivElement) => {
            div.addEventListener('contextmenu', ignFunction);
        });

        let inputList = document.getElementsByClassName('edit');
        for (let i = 0; i < inputList.length; i++) {
            let input: HTMLInputElement = <HTMLInputElement>inputList.item(i);
            input.addEventListener('contextmenu', ignFunction);

            input.onblur = _ => {
                const transaction = this.database.transaction('vocabulary', 'readwrite');
                transaction.onerror = _ => console.error(transaction.error);
                const objectStore = transaction.objectStore('vocabulary');
                const request = objectStore.get(parseInt(input.id.split('-')[1]) + 1);
                request.onerror = _ => console.error(request.error);
                request.onsuccess = _ => {
                    const data = request.result;

                    Object.defineProperty(
                        data,
                        Object.keys(data)[parseInt(input.id.split('-')[0])],
                        { value: input.value.replaceAll("&QUOT;", '"').trim() }
                    );

                    const req = objectStore.put(data, parseInt(input.id.split('-')[1]) + 1);
                    req.onerror = _ => console.error(req.error);
                }
            }

            input.onkeydown = (event: KeyboardEvent) => {
                if (event.key === 'Enter') {
                    input.blur();
                }
            }

            input.onkeyup = _ => {
                if (input.value.includes('^')) {
                    let str = '';
                    input.value.split('').forEach(letter => {
                        if (letter != '^') {
                            str += letter;
                        }
                    })
                    input.value = str;
                }
            }
        }

        let checkboxDivList = document.getElementsByClassName('cdiv');
        for (let i = 0; i < checkboxDivList.length; i++) {
            let element = <HTMLDivElement>checkboxDivList[i];
            let id = element.id.slice(11);
            let mouseover = false;
            let saved;
            let clickFunction = (event: MouseEvent) => {
                let cdiv = <HTMLDivElement>event.target;
                let index = parseInt(cdiv.id.slice(11));
                this.deleteWord(index);
            }

            let indicator;
            element.addEventListener('mousemove', (event) => {
                if (event.target === element.querySelector('input')) {
                    mouseover = false;
                    element.classList.remove('mouseon');
                    clearTimeout(indicator);
                    element.removeEventListener('click', clickFunction);
                    document.querySelectorAll('.danger').forEach(e => e.classList.remove('danger'));
                } else if (!mouseover) {
                    mouseover = true;
                    saved = element.innerHTML;
                    setTimeout(_ => {
                        if (mouseover) {
                            element.classList.add('mouseon');
                            indicator = setTimeout(_ => {
                                if (mouseover) {
                                    element.innerHTML = "";
                                    let img = document.createElement('img');
                                    img.src = './delete.svg';
                                    element.append(img);
                                    element.addEventListener('click', clickFunction);
                                    document.querySelector(`#latinWord${id}`).classList.add('danger');
                                    document.querySelector(`#inflections${id}`).classList.add('danger');
                                    document.querySelector(`#germanTranslation${id}`).classList.add('danger');
                                    document.querySelector(`#relatedForeignWords${id}`).classList.add('danger');
                                }
                            }, 1500);
                        }
                    }, 1500);
                }
            });

            element.addEventListener('mouseleave', _ => {
                mouseover = false;
                element.classList.remove('mouseon');
                clearTimeout(indicator);
                document.querySelectorAll('.danger').forEach(e => e.classList.remove('danger'));
                element.removeEventListener('click', clickFunction);
                let ignWords: number = Object.values(this.vocabulary[id]).slice(0, 4).filter((w: string) => w.includes('^ign^')).length;
                if (ignWords === 4) {
                    let cdiv = element;
                    cdiv.innerHTML = "";
                    let img = document.createElement('img');
                    img.src = './ign.svg';
                    cdiv.append(img);
                } else if (ignWords === 3) {
                    let cdiv = element;
                    cdiv.innerHTML = "";
                    let img = document.createElement('img');
                    img.src = './ign.svg';
                    img.classList.add("white");
                    cdiv.append(img);
                } else if (ignWords === 0) {
                    let cdiv = element;
                    cdiv.innerHTML = "";
                    let img = document.createElement('img');
                    img.src = './fully-selected.svg';
                    cdiv.append(img);
                } else {
                    let cdiv = element;
                    cdiv.innerHTML = "";
                    let img = document.createElement('img');
                    img.src = './selected.svg';
                    cdiv.append(img);
                }
            });
        }
    }

    clickUnit(unit: HTMLDivElement, index: number) {
        if (unit.classList.contains('down')) {
            unit.classList.remove('down');
            unit.classList.add('up');
            let nextIndex = (index === this.containers[this.containers.length - 1]) ? undefined : this.containers[this.containers.indexOf(index) + 1];
            let hiddenWords = nextIndex ? this.vocabulary.slice(index + 1, nextIndex) : this.vocabulary.slice(index + 1);
            hiddenWords.forEach((hWord, i) => {
                let Cdiv = document.querySelector(`#checkboxDiv${index + 1 + i}`) as HTMLDivElement;
                let div1 = document.querySelector(`#latinWord${index + 1 + i}`) as HTMLDivElement;
                let div2 = document.querySelector(`#inflections${index + 1 + i}`) as HTMLDivElement;
                let div3 = document.querySelector(`#germanTranslation${index + 1 + i}`) as HTMLDivElement;
                let div4 = document.querySelector(`#relatedForeignWords${index + 1 + i}`) as HTMLDivElement;
                [Cdiv, div1, div2, div3, div4].forEach(div => { if (div) { div.style.display = 'none' } });
            });
        } else if (unit.classList.contains('up')) {
            unit.classList.remove('up');
            unit.classList.add('down');
            let nextIndex = (index === this.containers[this.containers.length - 1]) ? undefined : this.containers[this.containers.indexOf(index) + 1];
            let shownWords = nextIndex ? this.vocabulary.slice(index + 1, nextIndex) : this.vocabulary.slice(index + 1);
            shownWords.forEach((sWord, i) => {
                let Cdiv = document.querySelector(`#checkboxDiv${index + 1 + i}`) as HTMLDivElement;
                let div1 = document.querySelector(`#latinWord${index + 1 + i}`) as HTMLDivElement;
                let div2 = document.querySelector(`#inflections${index + 1 + i}`) as HTMLDivElement;
                let div3 = document.querySelector(`#germanTranslation${index + 1 + i}`) as HTMLDivElement;
                let div4 = document.querySelector(`#relatedForeignWords${index + 1 + i}`) as HTMLDivElement;
                [Cdiv, div1, div2, div3, div4].forEach(div => { if (div) { div.style.display = 'flex' } });
            });
        }
    }

    deleteWord(key: number): void {
        this.vocabulary.splice(key, 1);
        const transaction = this.database.transaction('vocabulary', 'readwrite');
        const objectStore = transaction.objectStore('vocabulary');
        const request = objectStore.openCursor();
        request.onsuccess = _ => {
            let cursor = request.result;
            if (cursor) {
                let k = <number>cursor.key;
                let word = this.vocabulary[k - 1];
                if (word) {
                    const updatedData = cursor.value;
                    updatedData.latinWord = word.latinWord;
                    updatedData.inflections = word.inflections;
                    updatedData.germanTranslation = word.germanTranslation;
                    updatedData.relatedForeignWords = word.relatedForeignWords;
                    updatedData.selected = word.selected;
                    updatedData.probability = word.probability;
                    cursor.update(updatedData);
                    cursor.continue();
                } else {
                    cursor.delete();
                    removeAllEventListeners();
                    this.modifyDocument();
                }
            }
        }
    }
}