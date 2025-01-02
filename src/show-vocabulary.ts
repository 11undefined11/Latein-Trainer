import { addVocabulary, createDiv, home, removeAllEventListeners } from "..";
import { AddVocabulary, WordBundle } from "./add-vocabulary";

export class ShowVocabulary {
    container: HTMLDivElement;
    iconPlaceholder: HTMLDivElement;
    navbar: HTMLDivElement;

    vocabulary: WordBundle[];
    database: IDBDatabase;

    constructor() { }

    modifyDocument(): void {
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

                let str = '';
                this.vocabulary.forEach((word, i) => {
                    str += 'auto ';

                    let Cdiv = createDiv(`checkboxDiv${i}`, 'word');
                    let div1 = createDiv(`latinWord${i}`, 'word');
                    let div2 = createDiv(`inflections${i}`, 'word');
                    let div3 = createDiv(`germanTranslation${i}`, 'word');
                    let div4 = createDiv(`relatedForeignWords${i}`, 'word');

                    Cdiv.classList.add('cdiv');

                    Cdiv.innerHTML = `<input type="checkbox" id="C${i}" class="checkbox" ${(word.selected) ? "checked" : ''}></input>`;
                    div1.innerHTML = `<input type="text" id="0-${i}" class="edit" value="${(word.latinWord === '') ? ' ' : word.latinWord}" maxlength="${(word.latinWord.length > addVocabulary.maxCharacters) ? word.latinWord.length : addVocabulary.maxCharacters}"></input>`;
                    div2.innerHTML = `<input type="text" id="1-${i}" class="edit" value="${(word.inflections === '') ? ' ' : word.inflections}" maxlength="${(word.inflections.length > addVocabulary.maxCharacters) ? word.inflections.length : addVocabulary.maxCharacters}"></input>`;
                    div3.innerHTML = `<input type="text" id="2-${i}" class="edit" value="${(word.germanTranslation === '') ? ' ' : word.germanTranslation}" maxlength="${(word.germanTranslation.length > addVocabulary.maxCharacters) ? word.germanTranslation.length : addVocabulary.maxCharacters}"></input>`;
                    div4.innerHTML = `<input type="text" id="3-${i}" class="edit" value="${(word.relatedForeignWords === '') ? ' ' : word.relatedForeignWords}" maxlength="${(word.relatedForeignWords.length > addVocabulary.maxCharacters) ? word.relatedForeignWords.length : addVocabulary.maxCharacters}"></input>`;

                    this.container.append(Cdiv, div1, div2, div3, div4);
                });
                this.container.style.gridTemplateRows = str;

                let inputList = document.getElementsByClassName('edit');
                for (let i = 0; i < inputList.length; i++) {
                    let input: HTMLInputElement = <HTMLInputElement>inputList.item(i);
                    input.size = input.maxLength;

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
                                { value: input.value.trim() }
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

                let checkboxList = document.getElementsByClassName('checkbox');
                for (let i = 0; i < checkboxList.length; i++) {
                    let input: HTMLInputElement = <HTMLInputElement>checkboxList.item(i);
                    input.addEventListener('change', _ => {
                        const transaction = this.database.transaction('vocabulary', 'readwrite');
                        transaction.onerror = _ => console.error(transaction.error);
                        const objectStore = transaction.objectStore('vocabulary');
                        const request = objectStore.get(parseInt(input.id.slice(1)) + 1);
                        request.onerror = _ => console.error(request.error);
                        request.onsuccess = _ => {
                            const data = request.result;

                            Object.defineProperty(
                                data,
                                'selected',
                                { value: input.checked }
                            );

                            const req = objectStore.put(data, parseInt(input.id.slice(1)) + 1);
                            req.onerror = _ => console.error(req.error);

                            this.vocabulary[i].selected = this.vocabulary[i].selected ? false : true;
                        }
                    })
                }

                let checkboxDivList = document.getElementsByClassName('cdiv');
                for (let i = 0; i < checkboxDivList.length; i++) {
                    let element = <HTMLDivElement>checkboxDivList[i];
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
                            element.classList.add('mouseon');
                            indicator = setTimeout(_ => {
                                if (mouseover) {
                                    element.innerHTML = '<span>X</span>';
                                    element.addEventListener('click', clickFunction);
                                    document.querySelector(`#latinWord${i}`).classList.add('danger');
                                    document.querySelector(`#inflections${i}`).classList.add('danger');
                                    document.querySelector(`#germanTranslation${i}`).classList.add('danger');
                                    document.querySelector(`#relatedForeignWords${i}`).classList.add('danger');
                                }
                            }, 1500)
                        }
                    });

                    element.addEventListener('mouseleave', _ => {
                        mouseover = false;
                        element.classList.remove('mouseon');
                        clearTimeout(indicator);
                        document.querySelectorAll('.danger').forEach(e => e.classList.remove('danger'));
                        if (saved && !element.querySelector('input')) {
                            element.innerHTML = saved;
                            let input = element.querySelector('input');
                            input.checked = this.vocabulary[i].selected;
                            input.addEventListener('change', _ => {
                                const transaction = this.database.transaction('vocabulary', 'readwrite');
                                transaction.onerror = _ => console.error(transaction.error);
                                const objectStore = transaction.objectStore('vocabulary');
                                const request = objectStore.get(parseInt(input.id[input.id.length - 1]) + 1);
                                request.onerror = _ => console.error(request.error);
                                request.onsuccess = _ => {
                                    const data = request.result;

                                    Object.defineProperty(
                                        data,
                                        'selected',
                                        { value: input.checked }
                                    );

                                    const req = objectStore.put(data, parseInt(input.id[input.id.length - 1]) + 1);
                                    req.onerror = _ => console.error(req.error);
                                    this.vocabulary[i].selected = input.checked;
                                }
                            })
                        }
                        element.removeEventListener('click', clickFunction);
                    });
                }
            }
        });
    }

    deleteWord(key: number): void {
        this.vocabulary.splice(key, 1)
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