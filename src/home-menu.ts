import { addVocabulary, removeAllEventListeners, showVocabulary, inflectVocabulary, training } from "..";

export class HomeMenu {
    input: HTMLDivElement;
    iconPlaceholder: HTMLDivElement;
    navbar: HTMLDivElement;

    loaded = false;

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

        document.body.classList.add('homeBody');
        this.input.classList.add('homeInput');
        this.iconPlaceholder.classList.add('homeIconPlaceholder');
        this.navbar.classList.add('homeNavbar');
        
        if (this.loaded) {
            this.loaded = true;
            let icon = document.createElement('object');
            icon.data = './icon.svg';
            icon.id = 'icon';
            this.iconPlaceholder.insertAdjacentElement('beforeend', icon);
            
            let version = document.createElement('object');
            version.data = './version.svg';
            version.id = 'version';
            this.iconPlaceholder.insertAdjacentElement('beforeend', version);

            this.type();
        }

        window.addEventListener('load', () => {
            console.log("servas");
            this.loaded = true;
            let icon = document.createElement('object');
            icon.data = './icon.svg';
            icon.id = 'icon';
            this.iconPlaceholder.insertAdjacentElement('beforeend', icon);
            icon.addEventListener('load', () => {
                const svgDoc = icon.contentDocument;
                if (!svgDoc) return;

                // Animation was created by COPILOT (GPT-5)
                // collect groups l1..l13
                const groups: SVGElement[] = [];
                for (let i = 1; i <= 13; i++) {
                    const g = svgDoc.querySelector<SVGElement>(`#l${i}`);
                    if (!g) continue;

                    // We'll wrap the original group in a new <g> so we can scale around the group's visual center
                    // without disturbing its original transform (including any matrix(...) attributes).
                    const wrapper = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'g');

                    // move the original group into the wrapper
                    const parent = g.parentNode;
                    if (parent) {
                        parent.replaceChild(wrapper, g);
                        wrapper.appendChild(g);
                    }

                    // ensure transforms are applied around the element center
                    // use transform-box + transform-origin in pixels (viewport coords)
                    (wrapper as unknown as any).style.transformBox = 'fill-box';
                    (wrapper as unknown as any).style.transformOrigin = `50% 50%`;

                    // start invisible and twice the final size
                    (wrapper as any).style.opacity = '0';
                    (wrapper as any).style.transform = 'scale(3)';

                    groups.push(wrapper as unknown as SVGElement);
                }

                // stamp animation: scale from 2 -> 1 without moving the element
                groups.forEach((g, idx) => {
                    const delay = idx * 250 + 100; // stagger each letter slightly
                    const anim = (g as any).animate(
                        [
                            { transform: 'scale(3)', opacity: 1 },
                            { transform: 'scale(1)', opacity: 1 }
                        ],
                        {
                            duration: 250,
                            delay,
                            fill: 'forwards'
                        }
                    );

                    // ensure final styles are applied after the animation completes
                    if (anim && (anim as any).finished && typeof (anim as any).finished.then === 'function') {
                        (anim as any).finished.then(() => {
                            (g as any).style.transform = 'scale(1)';
                            (g as any).style.opacity = '1';
                        }).catch(() => {
                            // ignore cancellation errors but still set the final state
                            (g as any).style.transform = 'scale(1)';
                            (g as any).style.opacity = '1';
                        });
                    } else {
                        // fallback if finished promise isn't available
                        (g as any).style.transform = 'scale(1)';
                        (g as any).style.opacity = '1';
                    }
                });

                let version = document.createElement('object');
                version.data = './version.svg';
                version.id = 'version';
                version.style.opacity = '0';
                this.iconPlaceholder.insertAdjacentElement('beforeend', version);

                // Call this once your <object> (or <embed>) holding the SVG is ready.
                // `version` is the <object type="image/svg+xml"> element.
                // Assumes `version` is your <object type="image/svg+xml" id="version"> element.

                version.addEventListener('load', () => {
                    setTimeout(() => {
                        const reduceMotion =
                            window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;

                        // Access the embedded SVG document (must be same-origin)
                        const svgDoc = (version as HTMLObjectElement).contentDocument;
                        if (!svgDoc) {
                            (version as HTMLElement).style.opacity = '1';
                            console.warn('[fade-l5-l6] No contentDocument. Is the object same-origin?');
                            return;
                        }

                        // Helper: get the <g id="..."> or nearest <g> ancestor (if the id is on a child)
                        const getGroup = (id: string): SVGGElement | null => {
                            const el = svgDoc.getElementById(id) as unknown as SVGElement | null;
                            if (!el) return null;
                            if (el.nodeName.toLowerCase() === 'g') return el as unknown as SVGGElement;
                            let p: Element | null = el.parentElement;
                            while (p && p.nodeName.toLowerCase() !== 'g') p = p.parentElement;
                            return p && p.nodeName.toLowerCase() === 'g'
                                ? (p as unknown as SVGGElement)
                                : null;
                        };

                        const l5 = getGroup('l5');
                        const l6 = getGroup('l6');

                        if (!l5 || !l6) {
                            console.warn('[fade-l5-l6] Missing l5 and/or l6 in the SVG.', { l5: !!l5, l6: !!l6 });
                            if (l5) l5.style.opacity = '1';
                            if (l6) l6.style.opacity = '1';
                            (version as HTMLElement).style.opacity = '1';
                            return;
                        }

                        // Ensure l5/l6 are present but transparent (no layout impact in SVG anyway)
                        const prep = (el: SVGGElement) => {
                            el.style.transition = 'none';
                            // Don’t touch display/visibility/transform to avoid surprises
                            el.style.opacity = '0';
                        };
                        prep(l5);
                        prep(l6);

                        // ⬅️ NEW: Build a wrapper <g id="tail"> around l7..l13 so we can move them together
                        const SVG_NS = 'http://www.w3.org/2000/svg'; // ⬅️ NEW
                        const tailIds = ['l7', 'l8', 'l9', 'l10', 'l11', 'l12', 'l13']; // ⬅️ NEW
                        const tailChildren = tailIds.map(getGroup).filter((x): x is SVGGElement => !!x); // ⬅️ NEW

                        let tail: SVGGElement | null = null; // ⬅️ NEW
                        let tileWidth = 0; // ⬅️ NEW

                        if (tailChildren.length) { // ⬅️ NEW
                            // Estimate one tile width from any tile (they're identical squares)
                            const l1 = getGroup('l1'); // use l1 if present, else any of tail children // ⬅️ NEW
                            const ref = l1 ?? tailChildren[0]; // ⬅️ NEW
                            try {
                                tileWidth = ref.getBBox().width; // SVG user units // ⬅️ NEW
                            } catch {
                                // Fallback: try l5
                                try { tileWidth = l5.getBBox().width; } catch { tileWidth = 0; }
                            }

                            // Only proceed if we could measure something sensible // ⬅️ NEW
                            if (tileWidth > 0) {
                                // Create wrapper
                                tail = svgDoc.createElementNS(SVG_NS, 'g') as unknown as SVGGElement; // ⬅️ NEW
                                tail.setAttribute('id', 'tail'); // ⬅️ NEW
                                const parent = tailChildren[0].parentNode!; // ⬅️ NEW
                                // Insert wrapper right before l7 (to preserve z-order) // ⬅️ NEW
                                parent.insertBefore(tail, tailChildren[0]); // ⬅️ NEW
                                // Move l7..l13 into the wrapper (preserves their own transforms) // ⬅️ NEW
                                tailChildren.forEach(child => tail!.appendChild(child)); // ⬅️ NEW

                                // Initial shift: exactly two tile widths to the left // ⬅️ NEW
                                const offset = -2 * tileWidth; // ⬅️ NEW
                                tail.setAttribute('transform', `translate(${offset},0)`); // ⬅️ NEW
                            } else {
                                console.warn('[fade-l5-l6] Could not determine tile width; skipping tail shift.'); // ⬅️ NEW
                            }
                        } else {
                            console.warn('[fade-l5-l6] Could not find l7..l13; skipping tail shift.'); // ⬅️ NEW
                        }

                        version.animate([{
                            opacity: '0'
                        },
                        {
                            opacity: '.25'
                        },
                        {
                            opacity: '1'
                        }], {
                            duration: 2500,
                            fill: "forwards"
                        }).finished.then(() => {
                            this.type();
                        })

                        // Small utility: cubic-bezier evaluator for JS fallback // ⬅️ NEW
                        const cubicBezier = (p0: number, p1: number, p2: number, p3: number) => {
                            // x = t; y = bezier(t)
                            const cx = 3 * p0, bx = 3 * (p2 - p0) - cx, ax = 1 - cx - bx;
                            const cy = 3 * p1, by = 3 * (p3 - p1) - cy, ay = 1 - cy - by;
                            return (t: number) => {
                                const y = ((ay * t + by) * t + cy) * t; // we just use y(t) with t as time fraction
                                return y;
                            };
                        };
                        const ease = cubicBezier(0.25, 0.1, 0.25, 1); // ⬅️ NEW

                        // JS fallback for animateTransform (in user units) // ⬅️ NEW
                        const animateTranslateAttr = (
                            el: SVGGElement,
                            fromX: number,
                            toX: number,
                            duration: number,
                            delay: number
                        ) => {
                            setTimeout(() => {
                                const start = performance.now();
                                const step = (now: number) => {
                                    const t = Math.min(1, (now - start) / duration);
                                    const x = fromX + (toX - fromX) * ease(t);
                                    el.setAttribute('transform', `translate(${x},0)`);
                                    if (t < 1) requestAnimationFrame(step);
                                    else el.setAttribute('transform', 'translate(0,0)'); // snap-final
                                };
                                requestAnimationFrame(step);
                            }, delay);
                        };

                        // Paint the initial frame (so you first see l1..l4 [gap] l7..l13)
                        requestAnimationFrame(() => {
                            (version as HTMLElement).style.opacity = '1'; // ensure host visible

                            // Reduced motion: show immediately (no animation, no shift)
                            if (reduceMotion) {
                                l5.style.opacity = '1';
                                l6.style.opacity = '1';
                                if (tail) tail.setAttribute('transform', 'translate(0,0)'); // reset instantly // ⬅️ NEW
                                return;
                            }

                            const fadeDuration = 800; // ms
                            const fadeDelay = 400;    // ms
                            const moveDuration = fadeDuration; // keep in sync with fade // ⬅️ NEW
                            const moveDelay = fadeDelay;       // ⬅️ NEW

                            // Try Web Animations API first (most reliable on SVG opacity)
                            const fade = (el: SVGGElement) => {
                                let usedWAAPI = false;

                                try {
                                    const anim = (el as any).animate?.(
                                        [{ opacity: 0 }, { opacity: 1 }],
                                        { duration: fadeDuration, delay: fadeDelay, easing: 'ease', fill: 'forwards' }
                                    );

                                    if (anim) {
                                        usedWAAPI = true;
                                        anim.finished
                                            .then(() => { el.style.opacity = '1'; })
                                            .catch(() => { el.style.opacity = '1'; });
                                    }
                                } catch {
                                    // ignore and fall back
                                }

                                if (!usedWAAPI) {
                                    // Fallback: CSS transition
                                    el.style.transition = `opacity ${fadeDuration}ms ease ${fadeDelay}ms`;
                                    // Trigger transition next tick to ensure transition is applied
                                    requestAnimationFrame(() => { el.style.opacity = '1'; });

                                    // Last-resort safeguard: force final state after duration+delay+buffer
                                    setTimeout(() => { el.style.opacity = '1'; }, fadeDelay + fadeDuration + 50);
                                }
                            };

                            fade(l5);
                            fade(l6);

                            // ⬅️ NEW: Animate the tail wrapper from -2w → 0 in SVG user units
                            if (tail && tileWidth > 0) {
                                const fromX = -2 * tileWidth;
                                const toX = 0;

                                // Prefer SMIL animateTransform (works in all modern browsers)
                                try {
                                    const anim = svgDoc.createElementNS(SVG_NS, 'animateTransform');
                                    anim.setAttribute('attributeName', 'transform');
                                    anim.setAttribute('type', 'translate');
                                    anim.setAttribute('from', `${fromX} 0`);
                                    anim.setAttribute('to', `${toX} 0`);
                                    anim.setAttribute('dur', `${moveDuration}ms`);
                                    anim.setAttribute('begin', 'indefinite'); // we’ll trigger it after the delay
                                    anim.setAttribute('fill', 'freeze');
                                    anim.setAttribute('calcMode', 'spline');
                                    anim.setAttribute('keySplines', '.25 .1 .25 1');
                                    anim.setAttribute('keyTimes', '0;1');
                                    tail.appendChild(anim);

                                    setTimeout(() => {
                                        try {
                                            // Start the animation
                                            (anim as any).beginElement?.();
                                        } catch {
                                            // If beginElement fails, fallback to JS tween
                                            animateTranslateAttr(tail!, fromX, toX, moveDuration, 0);
                                        }
                                    }, moveDelay);
                                } catch {
                                    // As a safety net, JS tween (no SMIL)
                                    animateTranslateAttr(tail, fromX, toX, moveDuration, moveDelay);
                                }
                            }
                        });
                    }, 3200);
                }, { once: true });
            });
        });
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
            object.data = './keys/Reversion_T.svg';
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