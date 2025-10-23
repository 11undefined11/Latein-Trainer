import { AddVocabulary, WordBundle } from "./src/add-vocabulary";
import { HomeMenu } from "./src/home-menu";
import { ShowVocabulary } from "./src/show-vocabulary";
import { VocabularyTraining } from "./src/vocabulary-training";
import { InflectVocabulary } from "./src/inflect-vocabulary"

export function createDiv(id?: string, c?: string, width?: string, height?: string): HTMLDivElement {
    let div = document.createElement('div');
    if (id) div.id = id;
    if (c) div.classList.add(c);
    if (height && width) {
        div.style.height = height;
        div.style.width = width;
    }
    return div;
}

export const addVocabulary = new AddVocabulary();

export const showVocabulary = new ShowVocabulary();

export const training = new VocabularyTraining();

export const inflectVocabulary = new InflectVocabulary();

export const home = new HomeMenu();

export function removeAllEventListeners(): void {
    document.removeEventListener('keydown', addVocabulary.keyDownFunction);
    document.removeEventListener('keydown', training.keyDownFunction);
    document.removeEventListener('keydown', home.keyDownFunction);
    document.removeEventListener('keydown', inflectVocabulary.keydownFunction);
    document.removeEventListener('mouseover', training.mouseOverFunction);
    window.removeEventListener('resize', home.resizeFunction);
    window.removeEventListener('resize', training.resizeFunction);
    window.removeEventListener('resize', inflectVocabulary.resizeFunction);
    window.removeEventListener('resize', addVocabulary.resizeFunction);
}