// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"gpxX8":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "78fcd0ac8e9bd240";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && ![
        'localhost',
        '127.0.0.1',
        '0.0.0.0'
    ].includes(hostname) ? 'wss' : 'ws';
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        disposedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === 'reload') fullReload();
        else if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
                await hmrApplyUpdates(assets);
                hmrDisposeQueue();
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                let processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    if (ws instanceof WebSocket) {
        ws.onerror = function(e) {
            if (e.message) console.error(e.message);
        };
        ws.onclose = function() {
            console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
        };
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ('reload' in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"1jwFz":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "createDiv", ()=>createDiv);
parcelHelpers.export(exports, "addVocabulary", ()=>addVocabulary);
parcelHelpers.export(exports, "showVocabulary", ()=>showVocabulary);
parcelHelpers.export(exports, "training", ()=>training);
parcelHelpers.export(exports, "inflectVocabulary", ()=>inflectVocabulary);
parcelHelpers.export(exports, "home", ()=>home);
parcelHelpers.export(exports, "removeAllEventListeners", ()=>removeAllEventListeners);
var _addVocabulary = require("./src/add-vocabulary");
var _homeMenu = require("./src/home-menu");
var _showVocabulary = require("./src/show-vocabulary");
var _vocabularyTraining = require("./src/vocabulary-training");
var _inflectVocabulary = require("./src/inflect-vocabulary");
function createDiv(id, c, width, height) {
    let div = document.createElement('div');
    if (id) div.id = id;
    if (c) div.classList.add(c);
    if (height && width) {
        div.style.height = height;
        div.style.width = width;
    }
    return div;
}
const addVocabulary = new (0, _addVocabulary.AddVocabulary)();
const showVocabulary = new (0, _showVocabulary.ShowVocabulary)();
const training = new (0, _vocabularyTraining.VocabularyTraining)();
const inflectVocabulary = new (0, _inflectVocabulary.InflectVocabulary)();
const home = new (0, _homeMenu.HomeMenu)();
function removeAllEventListeners() {
    document.removeEventListener('keydown', addVocabulary.keyDownFunction);
    document.removeEventListener('keydown', training.keyDownFunction);
    document.removeEventListener('keydown', home.keyDownFunction);
    document.removeEventListener('keydown', inflectVocabulary.keydownFunction);
    document.removeEventListener('mouseover', training.mouseOverFunction);
    window.removeEventListener('resize', home.resizeFunction);
    window.removeEventListener('resize', training.resizeFunction);
    window.removeEventListener('resize', inflectVocabulary.resizeFunction);
}

},{"./src/add-vocabulary":"gD3hq","./src/home-menu":"kONVW","./src/show-vocabulary":"hKazI","./src/vocabulary-training":"9B4CF","./src/inflect-vocabulary":"1keBs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gD3hq":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "AddVocabulary", ()=>AddVocabulary);
var _ = require("..");
class AddVocabulary {
    constructor(){
        this.vocabulary = [];
        this.wordIndex = 0;
        this.enterMode = false;
        this.commandMode = false;
        this.automaticPaddingAdjustment = false;
        this.command = '';
        this.padding = [
            undefined,
            undefined,
            undefined,
            undefined
        ];
        this.inputIndex = 0;
        this.keys = 0;
        this.currentWord = {
            latinWord: '',
            inflections: '',
            germanTranslation: '',
            relatedForeignWords: '',
            selected: true,
            probability: 1
        };
        this.animatedBorderWidth = 0;
        const request = window.indexedDB.open('Vocabulary', 1);
        request.addEventListener('error', (_)=>{
            console.error('There is an error. Have fun fixing it. Details:' + request.error);
        });
        request.addEventListener('success', (_)=>{
            this.database = request.result;
            const transaction = this.database.transaction('vocabulary', 'readonly');
            transaction.onerror = ()=>console.error(transaction.error);
            const objectStore = transaction.objectStore('vocabulary');
            const req = objectStore.getAll();
            req.onerror = ()=>console.error(req.error);
            req.onsuccess = ()=>{
                this.vocabulary = req.result;
                this.wordIndex = this.vocabulary.length;
            };
        });
        request.addEventListener('upgradeneeded', (event)=>{
            const db = request.result;
            const objectStore = db.createObjectStore(`vocabulary`, {
                autoIncrement: true
            });
            objectStore.createIndex("latinWord", "latinWord", {
                unique: false
            });
            objectStore.createIndex("inflections", "inflections", {
                unique: false
            });
            objectStore.createIndex("germanTranslation", "germanTranslation", {
                unique: false
            });
            objectStore.createIndex("relatedForeignWords", "relatedForeignWords", {
                unique: false
            });
            objectStore.createIndex("selected", "selected", {
                unique: false
            });
            objectStore.createIndex("probability", "probability", {
                unique: false
            });
            const objectStore2 = db.createObjectStore(`inflected vocabulary`, {
                autoIncrement: true
            });
            objectStore2.createIndex("singular", "singular", {
                unique: false
            });
            objectStore2.createIndex("plural", "plural", {
                unique: false
            });
            objectStore2.createIndex("verb", "verb", {
                unique: false
            });
            objectStore2.createIndex("probability", "probability", {
                unique: false
            });
            this.database = request.result;
        });
        const notImportantRequest_____yet = window.indexedDB.open('player data', 1);
        notImportantRequest_____yet.addEventListener('upgradeneeded', (event)=>{
            const db = notImportantRequest_____yet.result;
            if (!db.objectStoreNames.contains('versions played')) db.createObjectStore('versions played', {
                autoIncrement: true
            });
            notImportantRequest_____yet.addEventListener('success', (event)=>{
                const db = notImportantRequest_____yet.result;
                const transaction = db.transaction('versions played', 'readwrite');
                const objectStore = transaction.objectStore('versions played');
                objectStore.add('Beta');
                transaction.oncomplete = ()=>{
                    console.log('Data added successfully');
                };
                transaction.onerror = (event)=>{
                    console.error('Transaction error:', notImportantRequest_____yet.error);
                };
            });
            notImportantRequest_____yet.addEventListener('error', (event)=>{
                console.error('Database error:', notImportantRequest_____yet.error);
            });
        });
    }
    modifyDocument() {
        const request = window.indexedDB.open('Vocabulary', 1);
        request.addEventListener('error', (_)=>{
            console.error('There is an error. Have fun fixing it. Details:' + request.error);
        });
        request.addEventListener('success', (_1)=>{
            this.database = request.result;
            const transaction = this.database.transaction('vocabulary', 'readonly');
            transaction.onerror = ()=>console.error(transaction.error);
            const objectStore = transaction.objectStore('vocabulary');
            const req = objectStore.getAll();
            req.onerror = ()=>console.error(req.error);
            req.onsuccess = ()=>{
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
                for(let i = 0; i < 4; i++){
                    let div = (0, _.createDiv)(`div${i}`, 'addVocabularyInput');
                    this.container.appendChild(div);
                    this.padding[i] = 0.05 * div.offsetHeight;
                    div.style.padding = `${0.05 * div.offsetHeight}px 0.5vw`;
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
                icon.addEventListener('load', (_1)=>{
                    icon.contentDocument.addEventListener('click', (_1)=>{
                        (0, _.removeAllEventListeners)();
                        (0, _.home).modifyDocument();
                    });
                });
                this.homeButton.insertAdjacentElement('beforeend', icon);
                this.navbar.appendChild(this.homeButton);
                this.buttonRight = document.createElement('button');
                this.buttonRight.classList.add('navButton');
                this.buttonRight.innerHTML = '>';
                this.navbar.appendChild(this.buttonRight);
                this.type();
            };
        });
        let animation = null;
        this.resizeFunction = ()=>{
            if (animation !== null) {
                clearTimeout(animation);
                animation = null;
            }
            for(let i = 0; i < this.container.children.length; i++){
                let div = this.container.children[i];
                let value = Object.values(this.currentWord)[i];
                this.adjustInputWidth(div, value, false);
            }
            animation = setTimeout(()=>{
                for(let i = 0; i < this.container.childElementCount; i++)if (this.automaticPaddingAdjustment) this.automaticPaddingAnimation(this.container.children[i], false, false);
                else this.paddingAnimation(this.container.children[i]);
            }, 200);
        };
        window.addEventListener("resize", this.resizeFunction);
    }
    type() {
        for(let i = 0; i < this.container.childElementCount; i++)this.container.children[i].addEventListener('click', (_)=>{
            if (this.commandMode) {
                this.command.split('').forEach((_)=>{
                    this.selectedInput.lastElementChild.remove();
                    this.keys--;
                });
                this.command = '';
                this.commandMode = false;
            }
            this.inputIndex = i;
            this.changeSelectedInput();
            this.enterMode = false;
        });
        this.container.children[this.inputIndex].classList.add('selected');
        this.selectedInput = this.container.children[this.inputIndex];
        this.changeSelectedInput();
        this.homeButton.addEventListener('click', (_1)=>{
            (0, _.removeAllEventListeners)();
            (0, _.home).modifyDocument();
        });
        this.buttonLeft.addEventListener('mousedown', (_)=>{
            for(let i = 0; i < this.container.childElementCount; i++){
                this.container.children[i].classList.add('shadow');
                this.buttonLeft.classList.add('clicked');
            }
        });
        this.buttonRight.addEventListener('mousedown', (_)=>{
            for(let i = 0; i < this.container.childElementCount; i++){
                this.container.children[i].classList.add('shadow');
                this.buttonRight.classList.add('clicked');
            }
        });
        this.buttonLeft.addEventListener('mouseout', (_)=>{
            for(let i = 0; i < this.container.childElementCount; i++){
                this.container.children[i].classList.remove('shadow');
                this.buttonLeft.classList.remove('clicked');
            }
        });
        this.buttonRight.addEventListener('mouseout', (_)=>{
            for(let i = 0; i < this.container.childElementCount; i++){
                this.container.children[i].classList.remove('shadow');
                this.buttonRight.classList.remove('clicked');
            }
        });
        this.buttonLeftFunction = ()=>{
            if (this.vocabulary[this.wordIndex - 1]) {
                if (Object.values(this.currentWord).filter((value)=>value === '').length === 4 && this.wordIndex === this.vocabulary.length) {
                    for(let i = 0; i < this.container.childElementCount; i++)this.container.children[i].classList.remove('shadow');
                    this.wordIndex--;
                    this.currentWord = this.vocabulary[this.wordIndex];
                    for(let i = 0; i < this.container.childElementCount; i++){
                        let value = Object.values(this.currentWord)[i];
                        this.container.children[i].innerHTML = '';
                        for(let ii = 0; ii < value.length; ii++){
                            let object = document.createElement('object');
                            object.data = './keys/OG_T.svg';
                            object.id = `key${ii}-inp${i}`;
                            object.style.height = `100%`;
                            this.container.children[i].insertAdjacentElement('beforeend', object);
                            object.hidden = true;
                            object.addEventListener('load', (_)=>{
                                let svg = object.contentDocument;
                                if (value.charAt(ii) === '<') svg.querySelector('#tspan7').innerHTML = '&lt;';
                                else if (value.charAt(ii) === '&') svg.querySelector('#tspan7').innerHTML = '&amp;';
                                else svg.querySelector('#tspan7').innerHTML = value.charAt(ii);
                            });
                        }
                        let objects = this.container.querySelectorAll('object');
                        if (objects.length > 0) objects[objects.length - 1].addEventListener('load', (_)=>{
                            objects.forEach((obj)=>obj.hidden = false);
                            for(let i = 0; i < this.container.childElementCount; i++){
                                let value = Object.values(this.currentWord)[i];
                                this.adjustInputWidth(this.container.children[i], value);
                            }
                        });
                    }
                } else {
                    this.vocabulary[this.wordIndex] = this.currentWord;
                    const transaction = this.database.transaction(`vocabulary`, 'readwrite');
                    transaction.onerror = ()=>console.error(transaction.error);
                    const objectStore = transaction.objectStore(`vocabulary`);
                    const req = objectStore.get(this.wordIndex);
                    req.onerror = ()=>console.error(req.error);
                    req.onsuccess = ()=>{
                        for(let i = 0; i < this.container.childElementCount; i++)this.container.children[i].classList.remove('shadow');
                        const idontcare = objectStore.put(this.currentWord, this.wordIndex + 1);
                        idontcare.onerror = ()=>console.error(idontcare.error);
                        this.wordIndex--;
                        this.currentWord = this.vocabulary[this.wordIndex];
                        for(let i = 0; i < this.container.childElementCount; i++){
                            let value = Object.values(this.currentWord)[i];
                            this.container.children[i].innerHTML = '';
                            for(let ii = 0; ii < value.length; ii++){
                                let object = document.createElement('object');
                                object.data = './keys/OG_T.svg';
                                object.id = `key${ii}-inp${i}`;
                                object.style.height = `100%`;
                                this.container.children[i].insertAdjacentElement('beforeend', object);
                                object.hidden = true;
                                object.addEventListener('load', (_)=>{
                                    let svg = object.contentDocument;
                                    if (value.charAt(ii) === '<') svg.querySelector('#tspan7').innerHTML = '&lt;';
                                    else if (value.charAt(ii) === '&') svg.querySelector('#tspan7').innerHTML = '&amp;';
                                    else svg.querySelector('#tspan7').innerHTML = value.charAt(ii);
                                });
                            }
                        }
                        let objects = this.container.querySelectorAll('object');
                        if (objects.length > 0) objects[objects.length - 1].addEventListener('load', (_)=>{
                            objects.forEach((obj)=>obj.hidden = false);
                            for(let i = 0; i < this.container.childElementCount; i++){
                                let value = Object.values(this.currentWord)[i];
                                this.adjustInputWidth(this.container.children[i], value);
                            }
                        });
                    };
                }
            }
        };
        this.buttonLeft.addEventListener('mouseup', this.buttonLeftFunction);
        this.buttonRightFunction = ()=>{
            this.buttonRight.classList.remove('clicked');
            if (!this.vocabulary[this.wordIndex + 1]) {
                this.vocabulary[this.wordIndex] = this.currentWord;
                const transaction = this.database.transaction(`vocabulary`, 'readwrite');
                transaction.onerror = ()=>console.error(transaction.error);
                const objectStore = transaction.objectStore(`vocabulary`);
                const req = objectStore.put(this.currentWord, this.wordIndex + 1);
                req.onerror = ()=>console.error(req.error);
                transaction.oncomplete = ()=>{
                    for(let i = 0; i < this.container.childElementCount; i++)this.container.children[i].classList.remove('shadow');
                    this.wordIndex++;
                    this.keys = 0;
                    this.currentWord = {
                        latinWord: '',
                        inflections: '',
                        germanTranslation: '',
                        relatedForeignWords: '',
                        selected: true,
                        probability: 1
                    };
                    for(let i = 0; i < this.container.childElementCount; i++){
                        this.container.children[i].innerHTML = '';
                        this.inputIndex = 0;
                        this.selectedInput = this.container.children[0];
                        this.selectedInput.classList.add('selected');
                        if (i != 0) {
                            let div = this.container.children[i];
                            div.classList.remove('selected');
                            div.style.padding = `${this.padding[i]}px 0.5vw`;
                        }
                    }
                };
                for(let i = 0; i < this.container.childElementCount; i++){
                    let value = Object.values(this.currentWord)[i];
                    this.adjustInputWidth(this.container.children[i], value);
                }
            } else {
                this.vocabulary[this.wordIndex] = this.currentWord;
                for(let i = 0; i < this.container.childElementCount; i++)this.container.children[i].classList.remove('shadow');
                const transaction = this.database.transaction(`vocabulary`, 'readwrite');
                transaction.onerror = ()=>console.error(transaction.error);
                const objectStore = transaction.objectStore(`vocabulary`);
                const req = objectStore.get(this.wordIndex);
                req.onerror = ()=>console.error(req.error);
                req.onsuccess = ()=>{
                    const idontcare = objectStore.put(this.currentWord, this.wordIndex + 1);
                    idontcare.onerror = ()=>console.error(idontcare.error);
                    this.wordIndex++;
                    this.currentWord = this.vocabulary[this.wordIndex];
                    for(let i = 0; i < this.container.childElementCount; i++){
                        let value = Object.values(this.currentWord)[i];
                        this.container.children[i].innerHTML = '';
                        for(let ii = 0; ii < value.length; ii++){
                            let object = document.createElement('object');
                            object.data = './keys/OG_T.svg';
                            object.id = `key${ii}-inp${i}`;
                            object.style.height = `100%`;
                            this.container.children[i].insertAdjacentElement('beforeend', object);
                            object.hidden = true;
                            object.addEventListener('load', (_)=>{
                                let svg = object.contentDocument;
                                if (value.charAt(ii) === '<') svg.querySelector('#tspan7').innerHTML = '&lt;';
                                else if (value.charAt(ii) === '&') svg.querySelector('#tspan7').innerHTML = '&amp;';
                                else svg.querySelector('#tspan7').innerHTML = value.charAt(ii);
                            });
                        }
                    }
                    let objects = this.container.querySelectorAll('object');
                    if (objects.length > 0) objects[objects.length - 1].addEventListener('load', (_)=>{
                        objects.forEach((obj)=>obj.hidden = false);
                        for(let i = 0; i < this.container.childElementCount; i++){
                            let value = Object.values(this.currentWord)[i];
                            this.adjustInputWidth(this.container.children[i], value);
                        }
                    });
                };
            }
        };
        this.buttonRight.addEventListener('mouseup', this.buttonRightFunction);
        this.keyDownFunction = (event)=>{
            let forbiddenCharacters = [
                "\xb4",
                '`',
                '^'
            ];
            if (this.commandMode) {
                if (event.key === 'Enter') {
                    if (this.command.endsWith('%')) {
                        if (this.command.startsWith('#p-')) {
                            let percentage = parseInt(this.command.slice(3, this.command.length - 1));
                            if (percentage >= 0 && percentage <= 100) {
                                this.padding[this.inputIndex] = Math.round(Math.max(Math.min(this.padding[this.inputIndex] * (1 - percentage / 100), this.selectedInput.clientHeight / 2 * 0.85), 1));
                                this.paddingAnimation(this.selectedInput);
                                this.command.split('').forEach((_)=>{
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
                                this.padding[this.inputIndex] = Math.round(Math.max(Math.min(this.padding[this.inputIndex] * (1 + percentage / 100), this.selectedInput.clientHeight / 2 * 0.85), 1));
                                this.paddingAnimation(this.selectedInput);
                                this.command.split('').forEach((_)=>{
                                    this.selectedInput.lastElementChild.remove();
                                    this.keys--;
                                });
                                this.command = '';
                                this.commandMode = false;
                                return;
                            }
                        }
                    }
                    switch(this.command.toLowerCase()){
                        case '#<':
                        case '#<-':
                        case '#previous':
                        case '#prvs':
                        case '#vorheriges':
                        case '#voriges':
                        case '#prev':
                            this.command = '';
                            this.commandMode = false;
                            this.buttonLeftFunction(event);
                            return;
                        case '#>':
                        case '#->':
                        case '#next':
                        case '#nxt':
                        case "#n\xe4chstes":
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
                        case "#hauptmen\xfc":
                        case '#home menu':
                        case '#h':
                            this.command = '';
                            this.commandMode = false;
                            (0, _.removeAllEventListeners)();
                            (0, _.home).modifyDocument();
                            return;
                        case '#automaticpaddingadjustment':
                        case '#auto':
                        case '#automatic-padding-adjustment':
                        case '#automatische padding-anpassung':
                        case '#automatischepaddinganpassung':
                        case '#automatische-padding-anpassung':
                        case '#apa':
                            this.automaticPaddingAdjustment = true;
                            this.command.split('').forEach((_)=>{
                                this.selectedInput.lastElementChild.remove();
                                this.keys--;
                            });
                            this.command = '';
                            this.commandMode = false;
                            let value = Object.values(this.currentWord)[this.inputIndex];
                            this.adjustInputWidth(this.selectedInput, value, true);
                            return;
                        case '#manualpaddingadjustment':
                        case '#manual':
                        case '#normalpaddingadjustment':
                        case '#normal':
                        case '#manual-padding-adjustment':
                        case '#mpa':
                        case '#npa':
                            this.automaticPaddingAdjustment = false;
                        default:
                            this.paddingAnimation(this.selectedInput);
                            this.command.split('').forEach((_)=>{
                                this.selectedInput.lastElementChild.remove();
                                this.keys--;
                            });
                    }
                    this.command = '';
                    this.commandMode = false;
                    return;
                } else if (event.key === 'ArrowUp') {
                    this.command.split('').forEach((_)=>{
                        this.selectedInput.lastElementChild.remove();
                        this.keys--;
                    });
                    this.command = '';
                    this.commandMode = false;
                    if (this.inputIndex > 0) {
                        this.inputIndex--;
                        this.changeSelectedInput();
                    }
                    this.selectedInput.classList.add('selected');
                    return;
                } else if (event.key === 'ArrowDown') {
                    this.command.split('').forEach((_)=>{
                        this.selectedInput.lastElementChild.remove();
                        this.keys--;
                    });
                    this.command = '';
                    this.commandMode = false;
                    if (this.inputIndex + 1 < 4) {
                        this.inputIndex++;
                        this.changeSelectedInput();
                    }
                    return;
                } else if (event.key === 'Backspace') {
                    if (this.selectedInput.lastElementChild) {
                        this.selectedInput.lastElementChild.remove();
                        this.command = this.command.slice(0, this.command.length - 1);
                        this.keys--;
                        if (this.command === '') this.commandMode = false;
                        if (this.automaticPaddingAdjustment && this.padding[this.inputIndex] > this.selectedInput.offsetHeight * 0.05) {
                            let object = this.selectedInput.lastElementChild;
                            let w = Math.round((this.selectedInput.getBoundingClientRect().width - parseFloat(window.getComputedStyle(this.selectedInput).paddingLeft) - parseFloat(window.getComputedStyle(this.selectedInput).paddingRight)) * 100) / 100;
                            let aspectRatio = object.getBoundingClientRect().height / object.getBoundingClientRect().width;
                            let h = w / this.keys * aspectRatio;
                            let padding = Math.max((this.selectedInput.getBoundingClientRect().height - h) / 2, this.selectedInput.offsetHeight * 0.05);
                            this.padding[this.inputIndex] = Math.max(padding, 1);
                            this.selectedInput.style.padding = `${this.padding[this.inputIndex]}px 0.25vw`;
                        }
                    }
                    return;
                }
                if (this.commandMode && (forbiddenCharacters.includes(event.key) || event.key.length > 1)) return;
            }
            if (!this.commandMode) {
                if (event.key === 'Backspace') {
                    if (this.selectedInput.lastElementChild) {
                        this.selectedInput.lastElementChild.remove();
                        Object.defineProperty(this.currentWord, Object.keys(this.currentWord)[this.inputIndex], {
                            value: Object.values(this.currentWord)[this.inputIndex].slice(0, this.keys - 1)
                        });
                        this.keys--;
                        if (this.automaticPaddingAdjustment && this.padding[this.inputIndex] > this.selectedInput.offsetHeight * 0.05) {
                            let object = this.selectedInput.lastElementChild;
                            let w = Math.round((this.selectedInput.getBoundingClientRect().width - parseFloat(window.getComputedStyle(this.selectedInput).paddingLeft) - parseFloat(window.getComputedStyle(this.selectedInput).paddingRight) - parseFloat(window.getComputedStyle(this.selectedInput).borderLeftWidth) - parseFloat(window.getComputedStyle(this.selectedInput).borderRightWidth)) * 100) / 100;
                            let aspectRatio = object.getBoundingClientRect().height / object.getBoundingClientRect().width;
                            let h = w / this.keys * aspectRatio;
                            let padding = Math.max((this.selectedInput.getBoundingClientRect().height - h) / 2, this.selectedInput.offsetHeight * 0.05);
                            this.padding[this.inputIndex] = Math.max(padding, 1);
                            this.selectedInput.style.padding = `${this.padding[this.inputIndex]}px 0.25vw`;
                        }
                    }
                    return;
                } else if (event.key === 'Enter' || event.key === 'ArrowDown') {
                    if (this.inputIndex + 1 < 4) {
                        this.inputIndex++;
                        this.changeSelectedInput();
                    } else {
                        for(let i = 0; i < this.container.childElementCount; i++)this.container.children[i].classList.add('shadow');
                        if (this.enterMode) {
                            this.buttonRight.classList.remove('clicked');
                            if (!this.vocabulary[this.wordIndex + 1]) {
                                this.vocabulary[this.wordIndex] = this.currentWord;
                                const transaction = this.database.transaction(`vocabulary`, 'readwrite');
                                transaction.onerror = ()=>console.error(transaction.error);
                                const objectStore = transaction.objectStore(`vocabulary`);
                                const req = objectStore.put(this.currentWord, this.wordIndex + 1);
                                req.onerror = ()=>console.error(req.error);
                                transaction.oncomplete = ()=>{
                                    for(let i = 0; i < this.container.childElementCount; i++)this.container.children[i].classList.remove('shadow');
                                    this.wordIndex++;
                                    this.keys = 0;
                                    this.currentWord = {
                                        latinWord: '',
                                        inflections: '',
                                        germanTranslation: '',
                                        relatedForeignWords: '',
                                        selected: true,
                                        probability: 1
                                    };
                                    for(let i = 0; i < this.container.childElementCount; i++){
                                        this.container.children[i].innerHTML = '';
                                        this.inputIndex = 0;
                                        this.selectedInput = this.container.children[0];
                                        this.selectedInput.classList.add('selected');
                                        if (i != 0) {
                                            let div = this.container.children[i];
                                            div.classList.remove('selected');
                                            div.style.padding = `${this.padding[i]}px 0.5vw`;
                                        }
                                    }
                                };
                            } else {
                                this.vocabulary[this.wordIndex] = this.currentWord;
                                for(let i = 0; i < this.container.childElementCount; i++)this.container.children[i].classList.remove('shadow');
                                const transaction = this.database.transaction(`vocabulary`, 'readwrite');
                                transaction.onerror = ()=>console.error(transaction.error);
                                const objectStore = transaction.objectStore(`vocabulary`);
                                const req = objectStore.get(this.wordIndex);
                                req.onerror = ()=>console.error(req.error);
                                req.onsuccess = ()=>{
                                    const idontcare = objectStore.put(this.currentWord, this.wordIndex + 1);
                                    idontcare.onerror = ()=>console.error(idontcare.error);
                                    this.wordIndex++;
                                    this.currentWord = this.vocabulary[this.wordIndex];
                                    for(let i = 0; i < this.container.childElementCount; i++){
                                        let value = Object.values(this.currentWord)[i];
                                        this.container.children[i].innerHTML = '';
                                        for(let ii = 0; ii < value.length; ii++){
                                            let object = document.createElement('object');
                                            object.data = './keys/OG_T.svg';
                                            object.id = `key${ii}-inp${i}`;
                                            object.style.height = `100%`;
                                            this.container.children[i].insertAdjacentElement('beforeend', object);
                                            object.addEventListener('load', (_)=>{
                                                let svg = object.contentDocument;
                                                svg.querySelector('#tspan7').innerHTML = value.charAt(ii);
                                            });
                                        }
                                    }
                                };
                            }
                            this.enterMode = false;
                        } else this.enterMode = true;
                        const transaction = this.database.transaction(`vocabulary`, 'readwrite');
                        transaction.onerror = ()=>console.error(transaction.error);
                        const objectStore = transaction.objectStore(`vocabulary`);
                        const req = objectStore.put(this.currentWord, this.wordIndex + 1);
                        req.onerror = ()=>console.error(req.error);
                        setTimeout((_)=>{
                            for(let i = 0; i < this.container.childElementCount; i++)this.container.children[i].classList.remove('shadow');
                        }, 250);
                    }
                    return;
                } else if (event.key === 'ArrowUp') {
                    if (this.inputIndex > 0) this.inputIndex--;
                    this.changeSelectedInput();
                    this.enterMode = false;
                    return;
                } else if (event.key === '#') {
                    this.command = '';
                    this.commandMode = true;
                } else if (forbiddenCharacters.includes(event.key) || event.key.length > 1) return;
            }
            let object = document.createElement('object');
            object.data = './keys/OG_T.svg';
            object.id = `key${this.keys}-inp${this.inputIndex}`;
            object.style.height = `100%`;
            this.selectedInput.insertAdjacentElement('beforeend', object);
            object.hidden = true;
            object.addEventListener('load', (_1)=>{
                object.hidden = false;
                let width = Math.round(object.getBoundingClientRect().width * 100) / 100;
                object.hidden = true;
                let w = Math.round((this.selectedInput.getBoundingClientRect().width - parseFloat(window.getComputedStyle(this.selectedInput).paddingLeft) - parseFloat(window.getComputedStyle(this.selectedInput).paddingRight) - parseFloat(window.getComputedStyle(this.selectedInput).borderLeftWidth) - parseFloat(window.getComputedStyle(this.selectedInput).borderRightWidth)) * 100) / 100;
                if (this.keys + 1 > w / width) {
                    if (!this.automaticPaddingAdjustment) {
                        object.remove();
                        for(let i = 0; i < this.keys; i++)this.failureAnimation(this.selectedInput.children[i]);
                        return;
                    } else {
                        object.hidden = false;
                        let aspectRatio = object.getBoundingClientRect().height / object.getBoundingClientRect().width;
                        object.hidden = true;
                        let h = w / (this.keys + 1) * aspectRatio;
                        let padding = (this.selectedInput.getBoundingClientRect().height - h) / 2;
                        console.log(padding);
                        if (padding > this.selectedInput.getBoundingClientRect().height / 2 * 0.85) {
                            object.remove();
                            for(let i = 0; i < this.keys; i++)this.failureAnimation(this.selectedInput.children[i]);
                            return;
                        } else {
                            this.padding[this.inputIndex] = Math.max(padding, 1);
                            this.animatedBorderWidth = parseFloat(window.getComputedStyle(this.selectedInput).borderTopWidth);
                            this.automaticPaddingAnimation(this.selectedInput, true);
                        }
                    }
                }
                setTimeout((_)=>{
                    object.hidden = false;
                }, 10);
                let svg = object.contentDocument;
                if (event.key === '<') svg.querySelector('#tspan7').innerHTML = '&lt;';
                else if (event.key === '&') svg.querySelector('#tspan7').innerHTML = '&amp;';
                else svg.querySelector('#tspan7').innerHTML = event.key.charAt(0);
                if (!this.commandMode) {
                    Object.defineProperty(this.currentWord, Object.keys(this.currentWord)[this.inputIndex], {
                        value: Object.values(this.currentWord)[this.inputIndex] + event.key.charAt(0)
                    });
                    this.idleAnimation(object);
                } else {
                    this.command += event.key;
                    (0, _.training).commandAnimation(object);
                }
                this.keys++;
            });
        };
        document.addEventListener('keydown', this.keyDownFunction);
    }
    changeSelectedInput() {
        if (this.secondTimeout) clearTimeout(this.secondTimeout);
        document.querySelectorAll('.selected').forEach((elem)=>{
            elem.classList.remove('selected');
            elem.style.padding = `${this.padding[parseInt(elem.id.charAt(3))]}px 0.5vw`;
            elem.style.border = 'none';
            elem.style.transition = 'none';
        });
        this.selectedInput = this.container.children[this.inputIndex];
        this.selectedInput.classList.add('selected');
        this.keys = this.selectedInput.childElementCount;
        this.selectedInput.style.padding = `${this.padding[this.inputIndex]}px 0.25vw`;
        if (this.automaticPaddingAdjustment) this.automaticPaddingAnimation(this.selectedInput);
        else this.paddingAnimation(this.selectedInput);
    }
    failureAnimation(object) {
        if (!object || object.classList.contains("animationActive")) return;
        let svg = object.contentDocument;
        let rect = svg.querySelector('#mainRect');
        let text = svg.querySelector('#text7');
        let animationKeyframes = [
            {
                stroke: "rgb(186, 2, 70)",
                offset: 0.025
            },
            {
                rotate: "10deg z",
                offset: 0.25
            },
            {
                rotate: "0deg z",
                offset: 0.5
            },
            {
                rotate: "-10deg z",
                offset: 0.75,
                stroke: "rgb(186, 2, 70)"
            },
            {
                stroke: "#eeeeeeff",
                offset: 0.925
            },
            {
                rotate: "0deg z",
                offset: 1
            }
        ];
        object.classList.add("animationActive");
        let animationOptions = {
            duration: 500
        };
        rect.animate(animationKeyframes, animationOptions);
        text.animate(animationKeyframes, animationOptions);
        setTimeout((_)=>{
            object.classList.remove("animationActive");
        }, 500);
    }
    idleAnimation(object) {
        let svg = object.contentDocument;
        let rect = svg.querySelector('#mainRect');
        let text = svg.querySelector('#text7');
        let animationKeyframes = {
            stroke: [
                '#8f8f8f',
                '#fff',
                '#eeeeeeff'
            ],
            offset: [
                0,
                1
            ]
        };
        let animationOptions = {
            duration: 250
        };
        rect.animate(animationKeyframes, animationOptions);
        text.animate(animationKeyframes, animationOptions);
    }
    paddingAnimation(input) {
        let id = parseInt(input.id.charAt(3));
        let marginLeft = parseInt(window.getComputedStyle(input).marginLeft.slice(0, -2));
        let borderLeft = 0.005 * input.offsetWidth - marginLeft;
        input.style.padding = '0';
        input.style.willChange = 'border-width';
        input.style.borderTopWidth = `calc(${this.padding[id]}px)`;
        input.style.borderRightWidth = `${borderLeft}px`;
        input.style.borderBottomWidth = `calc(${this.padding[id]}px)`;
        input.style.borderLeftWidth = `${borderLeft}px`;
        input.style.borderStyle = 'solid';
        input.style.borderColor = '#12dada';
        input.style.transition = 'none';
        input.style.paddingLeft = 0.005 * window.innerWidth - (parseInt(window.getComputedStyle(input).marginLeft.slice(0, -2)) + parseFloat(window.getComputedStyle(input).borderLeftWidth.slice(0, -2))) + 'px';
        input.style.paddingTop = this.padding[id] - parseFloat(window.getComputedStyle(input).borderTopWidth.slice(0, -2)) + 'px';
        input.style.paddingRight = 0.005 * window.innerWidth - (parseInt(window.getComputedStyle(input).marginLeft.slice(0, -2)) + parseFloat(window.getComputedStyle(input).borderLeftWidth.slice(0, -2))) + 'px';
        input.style.paddingBottom = this.padding[id] - parseFloat(window.getComputedStyle(input).borderBottomWidth.slice(0, -2)) + 'px';
        setTimeout((_)=>{
            input.style.borderColor = '#06011b';
            input.style.transition = 'none';
            input.style.transition = "border-color 1.5s";
            this.secondTimeout = setTimeout((_)=>{
                if (input.classList.contains('selected')) input.style.padding = `${this.padding[id]}px 0.25vw`;
                else input.style.padding = `${this.padding[id]}px 0.5vw`;
                input.style.border = 'none';
            }, 1500);
        }, 1);
    }
    automaticPaddingAnimation(input, adjustment, cancelable) {
        cancelable = cancelable === undefined || cancelable === true;
        this.clearIntervals(adjustment == undefined);
        let id = parseInt(input.id.charAt(3));
        let marginLeft = parseInt(window.getComputedStyle(input).marginLeft.slice(0, -2));
        let borderLeft = 0.005 * input.offsetWidth - marginLeft;
        let newPadding = this.padding[id];
        let borderWidth = adjustment ? this.animatedBorderWidth : 0;
        let $tepSize = (newPadding - borderWidth) / 20;
        let stepSize = newPadding / 20;
        let step = 0;
        let timeout1 = adjustment ? 1 : 12.5;
        let timeout2 = 12.5;
        let timeout;
        let interval1;
        let interval2;
        if (cancelable) this.firstInterval = setInterval(intervalFunction1.bind(this), timeout1);
        else interval1 = setInterval(intervalFunction1.bind(this), timeout1);
        window.addEventListener('resize', resizeHandler.bind(this), {
            passive: true
        });
        if (!cancelable) {
            this.buttonLeft.addEventListener('mouseup', removeAll.bind(this));
            this.buttonRight.addEventListener('mouseup', removeAll.bind(this));
        }
        function intervalFunction1() {
            for(let i = 0; i < (adjustment ? 4 : 1); i++){
                this.animatedInputIndex = id;
                borderWidth += $tepSize;
                this.animatedBorderWidth = borderWidth;
                input.style.borderWidth = `${borderWidth}px ${borderLeft / (20 - step)}px`;
                input.style.borderStyle = 'solid';
                input.style.borderColor = 'orange';
                input.style.transition = 'none';
                let paddingLeft = borderLeft - parseFloat(window.getComputedStyle(input).borderLeft);
                let paddingTop = newPadding - parseFloat(window.getComputedStyle(input).borderTop);
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
        function removeAll() {
            clearInterval(interval1);
            clearInterval(interval2);
            clearTimeout(timeout);
        }
        function timeoutFunction() {
            if (cancelable) this.secondInterval = setInterval(intervalFunction2.bind(this), timeout2);
            else interval2 = setInterval(intervalFunction2.bind(this), timeout2);
        }
        function intervalFunction2() {
            borderWidth -= stepSize;
            this.animatedBorderWidth = borderWidth;
            input.style.borderWidth = `${borderWidth}px ${borderLeft / (20 - step)}px`;
            input.style.borderStyle = 'solid';
            input.style.borderColor = 'orange';
            let paddingLeft = borderLeft - parseFloat(window.getComputedStyle(input).borderLeft);
            let paddingTop = newPadding - parseFloat(window.getComputedStyle(input).borderTop);
            input.style.padding = `${paddingTop}px ${paddingLeft}px`;
            step--;
            if (step === 0) {
                input.style.border = 'none';
                input.style.padding = `${newPadding}px ${borderLeft}px`;
                clearInterval(cancelable ? this.secondInterval : interval2);
                if (!cancelable) {
                    this.buttonLeft.removeEventListener('mouseup', removeAll.bind(this));
                    this.buttonRight.removeEventListener('mouseup', removeAll.bind(this));
                }
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
    adjustInputWidth(input, value, animation) {
        animation = animation === undefined || animation === true;
        if (!input.hasChildNodes() && value.length == 0) {
            if (this.automaticPaddingAdjustment) {
                if (input.classList.contains('selected')) input.style.padding = 0.05 * input.offsetHeight + 'px 0.25vw';
                else input.style.padding = 0.05 * input.offsetHeight + 'px 0.5vw';
                input.style.border = 'none';
                this.padding[parseInt(input.id.charAt(3))] = 0.05 * input.offsetHeight;
                if (animation) this.automaticPaddingAnimation(input, false, false);
                return value;
            }
            if (animation) this.paddingAnimation(input);
            return value;
        }
        let padding;
        let w = Math.round(input.getBoundingClientRect().width - parseFloat(window.getComputedStyle(input).paddingLeft) - parseFloat(window.getComputedStyle(input).paddingRight) - parseFloat(window.getComputedStyle(input).borderLeftWidth) - parseFloat(window.getComputedStyle(input).borderRightWidth) * 100) / 100;
        let object = input.firstElementChild;
        let id = parseInt(input.id.charAt(3));
        let width = object.getBoundingClientRect().width;
        if (w / width < value.length || this.automaticPaddingAdjustment) {
            w = Math.round((input.getBoundingClientRect().width - parseFloat(window.getComputedStyle(input).paddingLeft) - parseFloat(window.getComputedStyle(input).paddingRight) - parseFloat(window.getComputedStyle(input).borderLeftWidth) - parseFloat(window.getComputedStyle(input).borderRightWidth)) * 100) / 100;
            object = input.lastElementChild;
            let aspectRatio = object.getBoundingClientRect().height / object.getBoundingClientRect().width;
            let h = w / value.length * aspectRatio;
            padding = Math.max((input.getBoundingClientRect().height - h) / 2, input.offsetHeight * 0.05);
            this.padding[id] = Math.max(padding, 1);
            this.animatedBorderWidth = parseFloat(window.getComputedStyle(input).borderTopWidth);
        }
        if (this.automaticPaddingAdjustment && animation) this.automaticPaddingAnimation(input, false, false);
        else if (animation) this.paddingAnimation(input);
        return value;
    }
    clearIntervals(param) {
        clearInterval(this.firstInterval);
        clearInterval(this.secondInterval);
        clearTimeout(this.firstTimeout);
        if (this.animatedInputIndex != undefined && param) {
            let input = document.querySelector(`#div${this.animatedInputIndex}`);
            let marginLeft = parseInt(window.getComputedStyle(input).marginLeft.slice(0, -2));
            let paddingLeft = 0.005 * input.offsetWidth - marginLeft;
            let paddingTop = this.padding[this.animatedInputIndex];
            input.style.padding = `${paddingTop}px ${paddingLeft}px`;
            input.style.border = 'none';
        }
    }
}

},{"..":"1jwFz","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"kONVW":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "HomeMenu", ()=>HomeMenu);
var _ = require("..");
class HomeMenu {
    constructor(){
        this.padding = 0;
        this.command = '';
        this.modifyDocument();
    }
    modifyDocument() {
        this.resizeFunction = ()=>{
            let object = this.input.lastElementChild;
            if (!object) return;
            let w = window.innerWidth;
            let aspectRatio = object.getBoundingClientRect().height / object.getBoundingClientRect().width;
            let h = w / (this.input.childElementCount + 1) * aspectRatio;
            let padding = (this.input.getBoundingClientRect().height - h) / 2;
            this.padding = Math.max(padding, 1);
            this.movementAnimation();
            this.movementAnimation();
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
    type() {
        let keys = 0;
        this.keyDownFunction = (event)=>{
            let forbiddenCharacters = [
                '<',
                "\xb4",
                '`',
                '^'
            ];
            if (event.key === 'Backspace' && this.input.lastElementChild) {
                this.input.lastElementChild.remove();
                this.command = this.command.slice(0, this.command.length - 1);
                keys--;
                let object = this.input.lastElementChild;
                if (!object) return;
                let w = window.innerWidth;
                let aspectRatio = object.getBoundingClientRect().height / object.getBoundingClientRect().width;
                let h = w / (keys + 1) * aspectRatio;
                let padding = (this.input.getBoundingClientRect().height - h) / 2;
                this.padding = Math.max(padding, 1);
                this.movementAnimation();
                return;
            } else if (event.key === 'Enter') {
                switch(this.command){
                    case 'add vocabulary':
                    case 'add':
                    case 'add vocabulary':
                    case 'neu':
                    case "hinzuf\xfcgen":
                    case 'neues wort':
                    case 'neues Wort':
                    case "Vokabeln hinzuf\xfcgen":
                        (0, _.removeAllEventListeners)();
                        (0, _.addVocabulary).modifyDocument();
                        break;
                    case 'show vocabulary':
                    case 'show':
                    case 'tabelle':
                    case 'Tabelle':
                    case 'Vokabeln anzeigen':
                        (0, _.removeAllEventListeners)();
                        (0, _.showVocabulary).modifyDocument();
                        break;
                    case 'training':
                    case 'Training':
                    case 'trainer':
                    case 'Training':
                    case "\xfcben":
                    case "\xdcben":
                    case 'vocabuary training':
                        (0, _.removeAllEventListeners)();
                        (0, _.training).modifyDocument();
                        break;
                    case 'declinations':
                    case 'deklinationen':
                    case 'Deklinationen':
                    case 'conj':
                    case 'add declinations':
                        (0, _.removeAllEventListeners)();
                        (0, _.inflectVocabulary).modifyDocument('add nouns');
                        break;
                    case 'deklinieren':
                    case 'deklinationstraining':
                    case 'Deklinationstraining':
                    case 'decline nouns':
                    case 'decline':
                    case 'ct':
                        (0, _.removeAllEventListeners)();
                        (0, _.inflectVocabulary).modifyDocument('nouns');
                        break;
                    case 'v':
                    case 'conjugations':
                    case 'konjugationen':
                    case 'Konjugationen':
                        (0, _.removeAllEventListeners)();
                        (0, _.inflectVocabulary).modifyDocument('add verbs');
                        break;
                    case 'conjugate':
                    case 'konjugieren':
                    case 'konjugationstraining':
                    case 'Konjugationstraining':
                    case 'vt':
                        (0, _.removeAllEventListeners)();
                        (0, _.inflectVocabulary).modifyDocument('verbs');
                        break;
                    default:
                        break;
                }
                keys = 0;
                this.command = '';
                this.padding = 0;
                this.input.innerHTML = '';
                return;
            } else if (forbiddenCharacters.includes(event.key) || event.key.length > 1) return;
            let object = document.createElement('object');
            object.data = './keys/OG_T.svg';
            object.id = `key${keys}`;
            object.style.height = `100%`;
            this.input.insertAdjacentElement('beforeend', object);
            object.hidden = true;
            object.addEventListener('load', (_1)=>{
                object.hidden = false;
                let width = Math.floor(object.getBoundingClientRect().width * 100) / 100;
                let w = window.innerWidth;
                object.hidden = true;
                if (keys + 2 > Math.floor(w / width)) {
                    object.hidden = false;
                    let aspectRatio = object.getBoundingClientRect().height / object.getBoundingClientRect().width;
                    object.hidden = true;
                    let h = w / (keys + 2) * aspectRatio;
                    let padding = (this.input.getBoundingClientRect().height - h) / 2;
                    if (padding > this.input.getBoundingClientRect().height / 2 * 0.85) {
                        object.remove();
                        for(let i = 0; i < keys; i++)(0, _.addVocabulary).failureAnimation(this.input.children[i]);
                        return;
                    } else this.padding = Math.max(padding, 1);
                }
                object.hidden = false;
                let svg = object.contentDocument;
                svg.querySelector('#tspan7').innerHTML = event.key.charAt(0);
                this.command += event.key;
                keys++;
                this.idleAnimation(object);
                this.movementAnimation();
            });
        };
        document.addEventListener('keydown', this.keyDownFunction);
    }
    idleAnimation(object) {
        let svg = object.contentDocument;
        let rect = svg.querySelector('#mainRect');
        let text = svg.querySelector('#text7');
        let animationKeyframes = {
            stroke: [
                '#8f8f8f',
                '#fff',
                '#eeeeeeff'
            ],
            offset: [
                0,
                1
            ]
        };
        let animationOptions = {
            duration: 250
        };
        rect.animate(animationKeyframes, animationOptions);
        text.animate(animationKeyframes, animationOptions);
    }
    failureAnimation(object) {
        if (!object) return;
        let svg = object.contentDocument;
        let rect = svg.querySelector('#mainRect');
        let text = svg.querySelector('#text7');
        let animationKeyframes = [
            {
                stroke: "rgb(186, 2, 70)",
                offset: 0.025
            },
            {
                rotate: "10deg z",
                offset: 0.25
            },
            {
                rotate: "0deg z",
                offset: 0.5
            },
            {
                rotate: "-10deg z",
                offset: 0.75,
                stroke: "rgb(186, 2, 70)"
            },
            {
                stroke: "#eeeeeeff",
                offset: 0.925
            },
            {
                rotate: "0deg z",
                offset: 1
            }
        ];
        let animationOptions = {
            duration: 500
        };
        rect.animate(animationKeyframes, animationOptions);
        text.animate(animationKeyframes, animationOptions);
    }
    movementAnimation() {
        if (!this.input) return;
        let object = this.input.firstChild;
        let inp = this.input;
        if (object) {
            if (inp.childElementCount > 1) inp.style.transition = 'padding 250ms';
            inp.style.paddingTop = `${this.padding}px`;
            inp.style.paddingBottom = `${this.padding}px`;
            let height = inp.getBoundingClientRect().height - 2 * this.padding;
            inp.style.paddingRight = `${(window.innerWidth - inp.childElementCount * height) / 2}px`;
            inp.style.paddingLeft = `${(window.innerWidth - inp.childElementCount * height) / 2}px`;
        }
    }
}

},{"..":"1jwFz","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hKazI":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ShowVocabulary", ()=>ShowVocabulary);
var _ = require("..");
class ShowVocabulary {
    constructor(){}
    modifyDocument() {
        const request = window.indexedDB.open('Vocabulary', 1);
        request.addEventListener('error', (_)=>{
            this.vocabulary = [];
            this.modifyDocument();
            console.error(request.error);
        });
        request.addEventListener('success', (_1)=>{
            this.database = request.result;
            const transaction = this.database.transaction('vocabulary', 'readonly');
            transaction.onerror = (_)=>console.error(transaction.error);
            const objectStore = transaction.objectStore('vocabulary');
            const req = objectStore.getAll();
            req.onerror = (_)=>console.error(req.error);
            req.onsuccess = (_1)=>{
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
                for(let i = 0, str = 'HOME MENU'; i < str.length; i++){
                    let span = document.createElement('span');
                    span.innerText = str[i];
                    this.navbar.insertAdjacentElement('beforeend', span);
                }
                let navbarClickFunction = (_1)=>{
                    (0, _.removeAllEventListeners)();
                    this.navbar.removeEventListener('click', navbarClickFunction);
                    (0, _.home).modifyDocument();
                };
                this.navbar.addEventListener('click', navbarClickFunction);
                document.body.classList.add('showVocabularyBody');
                this.container.classList.add('showVocabularyContainer');
                this.iconPlaceholder.classList.add('showVocabularyIconPlaceholder');
                this.navbar.classList.add('showVocabularyNavbar');
                let str = '';
                this.vocabulary.forEach((word, i)=>{
                    str += 'auto ';
                    let Cdiv = (0, _.createDiv)(`checkboxDiv${i}`, 'word');
                    let div1 = (0, _.createDiv)(`latinWord${i}`, 'word');
                    let div2 = (0, _.createDiv)(`inflections${i}`, 'word');
                    let div3 = (0, _.createDiv)(`germanTranslation${i}`, 'word');
                    let div4 = (0, _.createDiv)(`relatedForeignWords${i}`, 'word');
                    Cdiv.classList.add('cdiv');
                    Cdiv.innerHTML = `<input type="checkbox" id="C${i}" class="checkbox" ${word.selected ? "checked" : ''}></input>`;
                    div1.innerHTML = `<input type="text" id="0-${i}" class="edit" value="${word.latinWord === '' ? ' ' : word.latinWord}"></input>`;
                    div2.innerHTML = `<input type="text" id="1-${i}" class="edit" value="${word.inflections === '' ? ' ' : word.inflections}"></input>`;
                    div3.innerHTML = `<input type="text" id="2-${i}" class="edit" value="${word.germanTranslation === '' ? ' ' : word.germanTranslation}"></input>`;
                    div4.innerHTML = `<input type="text" id="3-${i}" class="edit" value="${word.relatedForeignWords === '' ? ' ' : word.relatedForeignWords}"></input>`;
                    this.container.append(Cdiv, div1, div2, div3, div4);
                });
                this.container.style.gridTemplateRows = str;
                let inputList = document.getElementsByClassName('edit');
                for(let i = 0; i < inputList.length; i++){
                    let input = inputList.item(i);
                    input.size = input.maxLength;
                    input.onblur = (_)=>{
                        const transaction = this.database.transaction('vocabulary', 'readwrite');
                        transaction.onerror = (_)=>console.error(transaction.error);
                        const objectStore = transaction.objectStore('vocabulary');
                        const request = objectStore.get(parseInt(input.id.split('-')[1]) + 1);
                        request.onerror = (_)=>console.error(request.error);
                        request.onsuccess = (_)=>{
                            const data = request.result;
                            Object.defineProperty(data, Object.keys(data)[parseInt(input.id.split('-')[0])], {
                                value: input.value.trim()
                            });
                            const req = objectStore.put(data, parseInt(input.id.split('-')[1]) + 1);
                            req.onerror = (_)=>console.error(req.error);
                        };
                    };
                    input.onkeydown = (event)=>{
                        if (event.key === 'Enter') input.blur();
                    };
                    input.onkeyup = (_)=>{
                        if (input.value.includes('^')) {
                            let str = '';
                            input.value.split('').forEach((letter)=>{
                                if (letter != '^') str += letter;
                            });
                            input.value = str;
                        }
                    };
                }
                let checkboxList = document.getElementsByClassName('checkbox');
                for(let i = 0; i < checkboxList.length; i++){
                    let input = checkboxList.item(i);
                    input.addEventListener('change', (_)=>{
                        const transaction = this.database.transaction('vocabulary', 'readwrite');
                        transaction.onerror = (_)=>console.error(transaction.error);
                        const objectStore = transaction.objectStore('vocabulary');
                        const request = objectStore.get(parseInt(input.id.slice(1)) + 1);
                        request.onerror = (_)=>console.error(request.error);
                        request.onsuccess = (_)=>{
                            const data = request.result;
                            Object.defineProperty(data, 'selected', {
                                value: input.checked
                            });
                            const req = objectStore.put(data, parseInt(input.id.slice(1)) + 1);
                            req.onerror = (_)=>console.error(req.error);
                            this.vocabulary[i].selected = this.vocabulary[i].selected ? false : true;
                        };
                    });
                }
                let checkboxDivList = document.getElementsByClassName('cdiv');
                for(let i = 0; i < checkboxDivList.length; i++){
                    let element = checkboxDivList[i];
                    let mouseover = false;
                    let saved;
                    let clickFunction = (event)=>{
                        let cdiv = event.target;
                        let index = parseInt(cdiv.id.slice(11));
                        this.deleteWord(index);
                    };
                    let indicator;
                    element.addEventListener('mousemove', (event)=>{
                        if (event.target === element.querySelector('input')) {
                            mouseover = false;
                            element.classList.remove('mouseon');
                            clearTimeout(indicator);
                            element.removeEventListener('click', clickFunction);
                            document.querySelectorAll('.danger').forEach((e)=>e.classList.remove('danger'));
                        } else if (!mouseover) {
                            mouseover = true;
                            saved = element.innerHTML;
                            element.classList.add('mouseon');
                            indicator = setTimeout((_)=>{
                                if (mouseover) {
                                    element.innerHTML = '<span>X</span>';
                                    element.addEventListener('click', clickFunction);
                                    document.querySelector(`#latinWord${i}`).classList.add('danger');
                                    document.querySelector(`#inflections${i}`).classList.add('danger');
                                    document.querySelector(`#germanTranslation${i}`).classList.add('danger');
                                    document.querySelector(`#relatedForeignWords${i}`).classList.add('danger');
                                }
                            }, 1500);
                        }
                    });
                    element.addEventListener('mouseleave', (_)=>{
                        mouseover = false;
                        element.classList.remove('mouseon');
                        clearTimeout(indicator);
                        document.querySelectorAll('.danger').forEach((e)=>e.classList.remove('danger'));
                        if (saved && !element.querySelector('input')) {
                            element.innerHTML = saved;
                            let input = element.querySelector('input');
                            input.checked = this.vocabulary[i].selected;
                            input.addEventListener('change', (_)=>{
                                const transaction = this.database.transaction('vocabulary', 'readwrite');
                                transaction.onerror = (_)=>console.error(transaction.error);
                                const objectStore = transaction.objectStore('vocabulary');
                                const request = objectStore.get(parseInt(input.id[input.id.length - 1]) + 1);
                                request.onerror = (_)=>console.error(request.error);
                                request.onsuccess = (_)=>{
                                    const data = request.result;
                                    Object.defineProperty(data, 'selected', {
                                        value: input.checked
                                    });
                                    const req = objectStore.put(data, parseInt(input.id[input.id.length - 1]) + 1);
                                    req.onerror = (_)=>console.error(req.error);
                                    this.vocabulary[i].selected = input.checked;
                                };
                            });
                        }
                        element.removeEventListener('click', clickFunction);
                    });
                }
            };
        });
    }
    deleteWord(key) {
        this.vocabulary.splice(key, 1);
        const transaction = this.database.transaction('vocabulary', 'readwrite');
        const objectStore = transaction.objectStore('vocabulary');
        const request = objectStore.openCursor();
        request.onsuccess = (_1)=>{
            let cursor = request.result;
            if (cursor) {
                let k = cursor.key;
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
                    (0, _.removeAllEventListeners)();
                    this.modifyDocument();
                }
            }
        };
    }
}

},{"..":"1jwFz","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9B4CF":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "VocabularyTraining", ()=>VocabularyTraining);
var _ = require("..");
class VocabularyTraining {
    constructor(){
        this.totalAttempts = 0;
        this.totalPoints = 0;
        this.commandMode = false;
        this.command = '';
        this.padding = [
            0,
            0,
            0,
            0
        ];
        this.inputIndex = 0;
        this.time = 0;
        this.round = 0;
        this.keys = 0;
        this.backgroundColor = '#140063';
        this.resizeFunction = ()=>{
            let inputs = document.querySelectorAll('.inp');
            inputs.forEach((inp)=>{
                if (inp.firstChild && !inp.classList.contains('not-editable')) {
                    let object = inp.lastElementChild;
                    if (!object || !object.contentDocument) return;
                    let w = window.innerWidth;
                    let aspectRatio = object.getBoundingClientRect().height / object.getBoundingClientRect().width;
                    let h = w / (inp.childElementCount + 1) * aspectRatio;
                    let padding = (inp.getBoundingClientRect().height - h) / 2;
                    this.padding[inp.id.charAt(3)] = Math.max(padding, 0.1);
                    this.movementAnimation(inp);
                } else if (inp.classList.contains('not-editable')) {
                    let max = inp.clientHeight * 0.6;
                    let fontSize;
                    let span = document.querySelector(`#${inp.id} span`);
                    span.style.whiteSpace = 'nowrap';
                    span.style.display = 'inline-block';
                    span.style.width = 'auto';
                    span.style.fontSize = max + 'px';
                    while(span.scrollWidth > inp.clientWidth * 0.95 || span.clientHeight > max){
                        fontSize = parseInt(span.style.fontSize.slice(0, -2));
                        if (fontSize <= 1) break;
                        span.style.fontSize = fontSize - 1 + 'px';
                    }
                }
            });
        };
    }
    modifyDocument() {
        window.addEventListener('resize', this.resizeFunction);
        const request = window.indexedDB.open('Vocabulary', 1);
        request.addEventListener('error', (_)=>{
            this.vocabulary = [];
            this.modifyDocument();
            console.error(request.error);
        });
        request.addEventListener('success', (_1)=>{
            this.database = request.result;
            const transaction = this.database.transaction('vocabulary', 'readonly');
            transaction.onerror = ()=>console.error(transaction.error);
            const objectStore = transaction.objectStore('vocabulary');
            const req = objectStore.getAll();
            req.onerror = ()=>console.error(req.error);
            req.onsuccess = ()=>{
                this.vocabulary = req.result;
                this.backgroundColor = '#140063';
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
                for(let i = 0; i < classes.length; i++){
                    let div = (0, _.createDiv)(`div${i}`, `${classes[i]}`, `100%`, `${100 / classes.length}%`);
                    div.classList.add('t');
                    this.container.appendChild(div);
                    div.style.padding = `${0.05 * div.offsetHeight}px`;
                }
                this.mouseOverFunction = (event)=>{
                    let homeDiv = document.querySelector('.homeDiv');
                    if (homeDiv && homeDiv != event.target && event.target != this.navbar && !(document.querySelector('.homeButton') && event.target === document.querySelector('.homeButton')) && event.target != document.querySelector('.homeIcon')) {
                        homeDiv.classList.remove('moveUp');
                        setTimeout((_)=>homeDiv.classList.add('moveDown'), 0);
                    } else if (!(event.target != this.navbar && !(document.querySelector('.homeButton') && event.target === document.querySelector('.homeButton')) && event.target != document.querySelector('.homeIcon'))) {
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
                        let clickFunction = ()=>{
                            (0, _.removeAllEventListeners)();
                            (0, _.home).modifyDocument();
                            return;
                        };
                        button.addEventListener('click', clickFunction);
                        icon.addEventListener('load', (_)=>{
                            icon.contentDocument.addEventListener('click', clickFunction);
                        });
                    }
                };
                document.addEventListener('mouseover', this.mouseOverFunction);
                this.type();
            };
        });
    }
    type() {
        let inputs = [
            0,
            2,
            4,
            6
        ];
        for(let i = 0; i < this.container.childElementCount; i += 2)this.container.children[i].addEventListener('click', (_)=>{
            this.inputIndex = i / 2;
            this.selectedInput = this.container.children[i];
            this.inputStyling();
            this.keys = this.selectedInput.childElementCount;
        });
        for(let i = 1; i < this.container.childElementCount; i += 2)this.container.children[i].addEventListener('click', (event)=>{
            if (event.offsetY > this.container.children[i].clientHeight / 2) {
                this.inputIndex = (i + 1) / 2;
                this.selectedInput = this.container.children[i + 1];
                this.inputStyling();
                this.keys = this.selectedInput.childElementCount;
            } else {
                this.inputIndex = (i - 1) / 2;
                this.selectedInput = this.container.children[i - 1];
                this.inputStyling();
                this.keys = this.selectedInput.childElementCount;
            }
        });
        this.selectedInput = this.container.children[inputs[this.inputIndex]];
        this.inputStyling();
        this.keyDownFunction = (event)=>{
            let mode = this.commandMode;
            let forbiddenCharacters = [
                '<',
                "\xb4",
                '`',
                '^'
            ];
            if (this.commandMode) {
                if (event.key === 'Enter') {
                    switch(this.command.toLowerCase()){
                        case '#hint':
                        case '#t':
                        case '#tip':
                        case '#tipp':
                            this.command.split('').forEach((_)=>{
                                this.returnLastElement(this.selectedInput).remove();
                                this.keys--;
                                if (this.selectedInput.firstChild) this.movementAnimation(this.selectedInput);
                            });
                            let object = document.createElement('object');
                            object.data = './keys/OG_T.svg';
                            object.id = `key${this.keys}-inp${this.inputIndex}`;
                            object.style.height = `100%`;
                            let width = object.clientHeight;
                            let index = 0;
                            let word = Object.values(this.currentWord)[this.inputIndex];
                            let str = '';
                            let maxLength;
                            let changeMade = false;
                            for(let i = 0; i < word.length; i++)if (word[i] != Object.values(this.vocabulary[this.currentWordIndex])[this.inputIndex][i] && !changeMade) {
                                index = i;
                                if (this.vocabulary[this.currentWordIndex][Object.keys(this.vocabulary[this.currentWordIndex])[this.inputIndex]][index]) str += this.vocabulary[this.currentWordIndex][Object.keys(this.vocabulary[this.currentWordIndex])[this.inputIndex]][index];
                                else maxLength = word.length - 1;
                                changeMade = true;
                            } else str += word[i];
                            this.currentWord[Object.keys(this.currentWord)[this.inputIndex]] = maxLength ? str.slice(0, maxLength) : str;
                            word = maxLength ? str.slice(0, maxLength) : str;
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
                                if (word.length < Object.values(this.vocabulary[this.currentWordIndex])[this.inputIndex].length) this.currentWord[Object.keys(this.currentWord)[this.inputIndex]] += Object.values(this.vocabulary[this.currentWordIndex])[this.inputIndex][index];
                                else {
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
                            object.addEventListener('load', (_1)=>{
                                if (this.keys >= Math.floor(window.innerWidth / width)) {
                                    object.remove();
                                    for(let i = 0; i < this.keys; i++)(0, _.addVocabulary).failureAnimation(this.selectedInput.children[i]);
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
                            this.command.split('').forEach((_)=>{
                                this.returnLastElement(this.selectedInput).remove();
                                this.keys--;
                                if (this.selectedInput.firstChild) this.movementAnimation(this.selectedInput);
                            });
                            break;
                        case '#exit':
                        case '#quit':
                        case '#stop':
                        case '#home':
                        case '#stopp':
                        case '#beenden':
                        case "#hauptmen\xfc":
                        case '#home menu':
                        case '#h':
                            this.command = '';
                            this.commandMode = false;
                            (0, _.removeAllEventListeners)();
                            (0, _.home).modifyDocument();
                            return;
                        default:
                            this.command.split('').forEach((_)=>{
                                this.returnLastElement(this.selectedInput).remove();
                                this.keys--;
                                if (this.selectedInput.firstChild) this.movementAnimation(this.selectedInput);
                            });
                            if (this.inputIndex + 1 < 4) {
                                this.inputIndex++;
                                this.selectedInput = this.container.children[inputs[this.inputIndex]];
                                if (this.inputIndex + 1 < 4 && this.selectedInput.classList.contains('not-editable')) {
                                    this.inputIndex += 1;
                                    this.selectedInput = this.container.children[this.inputIndex];
                                }
                                this.keys = this.selectedInput.childElementCount;
                                this.inputStyling();
                            }
                    }
                    this.command = '';
                    this.commandMode = false;
                } else if (event.key === 'ArrowUp') {
                    this.command.split('').forEach((_)=>{
                        this.returnLastElement(this.selectedInput).remove();
                        this.keys--;
                        if (this.selectedInput.firstChild) this.movementAnimation(this.selectedInput);
                    });
                    this.command = '';
                    this.commandMode = false;
                } else if (event.key === 'ArrowDown') {
                    this.command.split('').forEach((_)=>{
                        this.returnLastElement(this.selectedInput).remove();
                        this.keys--;
                        if (this.selectedInput.firstChild) this.movementAnimation(this.selectedInput);
                    });
                    this.command = '';
                    this.commandMode = false;
                    if (this.inputIndex + 1 < 4) {
                        this.inputIndex++;
                        this.selectedInput = this.container.children[inputs[this.inputIndex]];
                        if (this.inputIndex + 1 < 4 && this.selectedInput.classList.contains('not-editable')) {
                            this.inputIndex += 1;
                            this.selectedInput = this.container.children[this.inputIndex];
                        }
                        this.keys = this.selectedInput.childElementCount;
                        this.inputStyling();
                    }
                } else if (event.key === 'Backspace') {
                    if (this.returnLastElement(this.selectedInput)) {
                        this.returnLastElement(this.selectedInput).remove();
                        this.command = this.command.slice(0, this.command.length - 1);
                        this.keys--;
                        if (this.selectedInput.firstChild) this.movementAnimation(this.selectedInput);
                        if (this.command === '') this.commandMode = false;
                    }
                }
                if (this.commandMode && (this.selectedInput.classList.contains('not-editable') || forbiddenCharacters.includes(event.key) || event.key.length > 1)) return;
            }
            if (!this.commandMode) {
                if ((event.key === 'Enter' || event.key === 'ArrowDown') && !mode) {
                    if (this.currentWord && !isNaN(this.currentWordIndex) && event.key === 'Enter') {
                        if (Object.values(this.currentWord)[this.inputIndex] === Object.values(this.vocabulary[this.currentWordIndex])[this.inputIndex] || Object.values(this.currentWord)[this.inputIndex] === '') {
                            for(let i = 0; i < this.keys; i++)if (this.selectedInput.children[i] && !this.selectedInput.classList.contains('not-editable')) this.successAnimation(this.selectedInput.children[i]);
                            if (!this.selectedInput.classList.contains('not-editable')) {
                                if (this.result[this.inputIndex] === undefined) this.result[this.inputIndex] = true;
                            }
                            if (this.inputIndex + 1 < 4) {
                                this.inputIndex++;
                                this.selectedInput = this.container.children[inputs[this.inputIndex]];
                                if (this.inputIndex + 1 < 4 && this.selectedInput.classList.contains('not-editable')) {
                                    this.inputIndex += 1;
                                    this.selectedInput = this.container.children[inputs[this.inputIndex]];
                                }
                                this.keys = this.selectedInput.childElementCount;
                                this.inputStyling();
                            } else if (this.inputIndex + 1 === 4) {
                                let emptyLines = [
                                    undefined,
                                    undefined,
                                    undefined,
                                    undefined
                                ];
                                Object.values(this.currentWord).slice(0, 4).forEach((value, i)=>{
                                    if (!document.querySelector(`#div${inputs[i]}`).classList.contains('not-editable')) {
                                        if (value === Object.values(this.vocabulary[this.currentWordIndex])[i]) {
                                            let inp = document.querySelector(`#div${inputs[i]}`);
                                            for(let ii = 0; ii < inp.childElementCount; ii++){
                                                let obj = inp.children[ii];
                                                this.successAnimation(obj);
                                            }
                                            if (value === '') emptyLines[i] = true;
                                            if (this.result[i] === undefined) this.result[i] = true;
                                        } else {
                                            let inp = document.querySelector(`#div${inputs[i]}`);
                                            for(let ii = 0; ii < inp.childElementCount; ii++){
                                                let obj = inp.children[ii];
                                                (0, _.addVocabulary).failureAnimation(obj);
                                            }
                                            if (value === '') emptyLines[i] = false;
                                            if (this.result[i] === undefined) this.result[i] = false;
                                        }
                                    }
                                });
                                this.resultStyling(emptyLines);
                                if (Object.values(this.currentWord).toLocaleString() === Object.values(this.vocabulary[this.currentWordIndex]).toLocaleString()) {
                                    let addition = this.result.filter((w)=>w === true).length;
                                    this.totalAttempts += 3;
                                    this.totalPoints += addition;
                                    if (addition === 3) this.vocabulary[this.currentWordIndex].probability *= 0.8;
                                    else this.vocabulary[this.currentWordIndex].probability *= 1.2;
                                    const transaction = this.database.transaction('vocabulary', 'readwrite');
                                    transaction.onerror = ()=>console.error(transaction.error);
                                    const objectStore = transaction.objectStore('vocabulary');
                                    const request = objectStore.get(this.currentWordIndex + 1);
                                    request.onerror = ()=>console.error(request.error);
                                    request.onsuccess = ()=>{
                                        const req = objectStore.put(this.vocabulary[this.currentWordIndex], this.currentWordIndex + 1);
                                        req.onerror = ()=>console.error(req.error);
                                    };
                                    setTimeout((_)=>{
                                        this.inputIndex = 0;
                                        this.selectedInput = document.querySelector(`#div${inputs[this.inputIndex]}`);
                                        this.keys = 0;
                                        this.inputStyling();
                                        this.startNewTrainingRound();
                                    }, 500);
                                } else setTimeout((_)=>this.inputStyling(), 500);
                            }
                        } else if (this.selectedInput.classList.contains('not-editable')) {
                            if (this.inputIndex + 1 < 4) {
                                this.inputIndex++;
                                this.selectedInput = this.container.children[inputs[this.inputIndex]];
                                if (this.inputIndex + 1 < 4 && this.selectedInput.classList.contains('not-editable')) {
                                    this.inputIndex += 1;
                                    this.selectedInput = this.container.children[inputs[this.inputIndex]];
                                }
                                this.keys = this.selectedInput.childElementCount;
                                this.inputStyling();
                            }
                            return;
                        } else {
                            if (this.inputIndex === 3) {
                                let emptyLines = [
                                    undefined,
                                    undefined,
                                    undefined,
                                    undefined
                                ];
                                Object.values(this.currentWord).slice(0, 4).forEach((value, i)=>{
                                    if (!document.querySelector(`#div${inputs[i]}`).classList.contains('not-editable')) {
                                        if (value === Object.values(this.vocabulary[this.currentWordIndex])[i]) {
                                            let inp = document.querySelector(`#div${inputs[i]}`);
                                            for(let ii = 0; ii < inp.childElementCount; ii++){
                                                let obj = inp.children[ii];
                                                this.successAnimation(obj);
                                            }
                                            if (value === '') emptyLines[i] = true;
                                            if (this.result[i] === undefined) this.result[i] = true;
                                        } else {
                                            let inp = document.querySelector(`#div${inputs[i]}`);
                                            for(let ii = 0; ii < inp.childElementCount; ii++){
                                                let obj = inp.children[ii];
                                                (0, _.addVocabulary).failureAnimation(obj);
                                            }
                                            if (value === '') emptyLines[i] = false;
                                            if (this.result[i] === undefined) this.result[i] = false;
                                        }
                                    }
                                });
                                this.resultStyling(emptyLines);
                                setTimeout((_)=>this.inputStyling(), 500);
                            } else for(let i = 0; i < this.selectedInput.childElementCount; i++)(0, _.addVocabulary).failureAnimation(this.selectedInput.children[i]);
                            if (this.result[this.inputIndex] === undefined) this.result[this.inputIndex] = true;
                            this.result[this.inputIndex] = false;
                        }
                    } else if (event.key === 'ArrowDown') {
                        if (this.inputIndex + 1 < 4) {
                            this.inputIndex++;
                            this.selectedInput = this.container.children[inputs[this.inputIndex]];
                            if (this.inputIndex + 1 < 4 && this.selectedInput.classList.contains('not-editable')) {
                                this.inputIndex += 1;
                                this.selectedInput = this.container.children[inputs[this.inputIndex]];
                            }
                            this.keys = this.selectedInput.childElementCount;
                            this.inputStyling();
                        }
                        return;
                    }
                    return;
                } else if (event.key === 'ArrowUp') {
                    if (this.inputIndex > 0) this.inputIndex--;
                    this.selectedInput = this.container.children[inputs[this.inputIndex]];
                    this.keys = this.selectedInput.childElementCount;
                    this.inputStyling();
                    return;
                } else if (this.selectedInput.classList.contains('not-editable')) return;
                else if (event.key === 'Backspace' && !mode) {
                    if (this.returnLastElement(this.selectedInput)) {
                        this.returnLastElement(this.selectedInput).remove();
                        this.keys--;
                        if (this.selectedInput.firstChild) this.movementAnimation(this.selectedInput);
                        if (this.currentWord && !isNaN(this.currentWordIndex) && !this.commandMode) Object.defineProperty(this.currentWord, Object.keys(this.currentWord)[this.inputIndex], {
                            value: Object.values(this.currentWord)[this.inputIndex].slice(0, this.keys)
                        });
                        let object = this.selectedInput.lastElementChild;
                        if (!object || !object.contentDocument) return;
                        let w = window.innerWidth;
                        let aspectRatio = object.getBoundingClientRect().height / object.getBoundingClientRect().width;
                        let h = w / (this.keys + 1) * aspectRatio;
                        let padding = (this.selectedInput.getBoundingClientRect().height - h) / 2;
                        this.padding[this.inputIndex] = Math.max(padding, 0.1);
                    }
                    return;
                } else if (forbiddenCharacters.includes(event.key) || event.key.length > 1) return;
                else if (event.key === '#') this.commandMode = true;
            }
            let object = document.createElement('object');
            object.data = './keys/OG_T.svg';
            object.id = `key${this.keys}-inp${this.inputIndex}`;
            object.style.height = `100%`;
            this.selectedInput.insertAdjacentElement('beforeend', object);
            let w = window.innerWidth;
            object.hidden = true;
            object.addEventListener('load', (_1)=>{
                object.hidden = false;
                let width = Math.floor(object.getBoundingClientRect().width * 100) / 100;
                object.hidden = true;
                if (this.keys + 2 > Math.floor(w / width)) {
                    object.hidden = false;
                    let aspectRatio = object.getBoundingClientRect().height / object.getBoundingClientRect().width;
                    object.hidden = true;
                    let h = w / (this.keys + 2) * aspectRatio;
                    let padding = (this.selectedInput.getBoundingClientRect().height - h) / 2;
                    if (padding > this.selectedInput.getBoundingClientRect().height / 2 * 0.85) {
                        object.remove();
                        for(let i = 0; i < this.keys; i++)(0, _.addVocabulary).failureAnimation(this.selectedInput.children[i]);
                        return;
                    } else this.padding[this.inputIndex] = Math.max(padding, 1);
                }
                object.hidden = false;
                let svg = object.contentDocument;
                svg.querySelector('#tspan7').innerHTML = event.key.charAt(0);
                if (this.currentWord && !isNaN(this.currentWordIndex) && !this.commandMode) Object.defineProperty(this.currentWord, Object.keys(this.currentWord)[this.inputIndex], {
                    value: Object.values(this.currentWord)[this.inputIndex] + event.key.charAt(0)
                });
                this.keys++;
                this.movementAnimation(this.selectedInput);
                (0, _.addVocabulary).idleAnimation(object);
                if (this.commandMode) {
                    this.commandAnimation(object);
                    this.command += event.key;
                }
            });
        };
        document.addEventListener('keydown', this.keyDownFunction);
        this.startNewTrainingRound();
    }
    startNewTrainingRound() {
        if (this.vocabulary.length === 0) {
            setTimeout((_)=>alert('Keine Vokabeln!'), 50);
            return;
        }
        this.round++;
        let overallProbabilty = 0;
        this.vocabulary.forEach((word)=>{
            if (word.selected) overallProbabilty += word.probability;
        });
        let randomNumber = Math.floor(Math.random() * overallProbabilty * 10) / 10;
        let lowestDifference;
        let lastProbability = 0;
        this.vocabulary.forEach((word, i)=>{
            if (word.selected) {
                if (lowestDifference === undefined) {
                    lowestDifference = Math.abs(randomNumber - (lastProbability + word.probability));
                    this.currentWord = word;
                    this.currentWordIndex = i;
                } else if (Math.abs(randomNumber - (lastProbability + word.probability)) < lowestDifference) {
                    lowestDifference = Math.abs(randomNumber - (lastProbability + word.probability));
                    this.currentWordIndex = i;
                    if (Object.values(word).toLocaleString().slice(0, 4) === Object.values(this.currentWord).toLocaleString().slice(0, 4)) word.probability = Math.max(0, word.probability - 1);
                    this.currentWord = word;
                }
                lastProbability += word.probability;
            }
        });
        let savedProperty;
        do {
            let rn = Math.random();
            if (rn <= 0.5) {
                savedProperty = [
                    'latinWord',
                    {
                        value: this.currentWord.latinWord
                    }
                ];
                this.inputIndex = 1;
                this.selectedInput = this.container.children[this.inputIndex + 1];
                this.inputStyling();
            } else if (rn <= 0.7) savedProperty = [
                'inflections',
                {
                    value: this.currentWord.inflections
                }
            ];
            else if (rn <= 0.95) savedProperty = [
                'germanTranslation',
                {
                    value: this.currentWord.germanTranslation
                }
            ];
            else savedProperty = [
                'relatedForeignWords',
                {
                    value: this.currentWord.relatedForeignWords
                }
            ];
        }while (savedProperty[1].value.trim() === '');
        this.currentWord = {
            latinWord: '',
            inflections: '',
            germanTranslation: '',
            relatedForeignWords: '',
            selected: true,
            probability: this.currentWord.probability
        };
        Object.defineProperty(this.currentWord, savedProperty[0], savedProperty[1]);
        let previousFixedDiv = document.querySelector('.not-editable');
        if (previousFixedDiv) previousFixedDiv.classList.remove('not-editable');
        document.querySelectorAll('.t').forEach((t)=>t.innerHTML = '');
        let specificationDiv = document.getElementById(`div${Object.keys(this.currentWord).findIndex((k)=>k === savedProperty[0]) * 2}`);
        specificationDiv.classList.add('not-editable');
        let max = specificationDiv.clientHeight * 0.6;
        let fontSize;
        let span = document.createElement('span');
        span.style.fontSize = max + 'px';
        span.innerHTML = savedProperty[1].value;
        specificationDiv.appendChild(span);
        while(span.clientHeight > max){
            fontSize = parseInt(span.style.fontSize.slice(0, -2));
            span.style.fontSize = fontSize - 1 + 'px';
        }
        this.result = [
            undefined,
            undefined,
            undefined,
            undefined
        ];
    }
    movementAnimation(inp) {
        let object = inp.firstChild;
        let id = parseInt(inp.id[3]);
        if (inp.firstChild) {
            if (inp.childElementCount > 1) inp.style.transition = 'padding 250ms';
            inp.style.paddingTop = `${this.padding[id / 2]}px`;
            inp.style.paddingBottom = `${this.padding[id / 2]}px`;
            let height = inp.getBoundingClientRect().height - 2 * this.padding[id / 2];
            inp.style.paddingLeft = `${(window.innerWidth - inp.childElementCount * height) / 2}px`;
            inp.style.paddingRight = `${(window.innerWidth - inp.childElementCount * height) / 2}px`;
        }
    }
    commandAnimation(object) {
        if (!object) return;
        let svg = object.contentDocument;
        let rect = svg.querySelector('#mainRect');
        let text = svg.querySelector('#text7');
        let animationKeyframes = {
            stroke: [
                '#eeeeeeff',
                '#ffa500'
            ],
            offset: [
                0,
                1
            ]
        };
        let animationOptions = {
            duration: 500,
            fill: 'forwards'
        };
        rect.animate(animationKeyframes, animationOptions);
        text.animate(animationKeyframes, animationOptions);
    }
    fixedAnimation(object) {
        if (!object) return;
        object.classList.add('fixed');
        let svg = object.contentDocument;
        let rect = svg.querySelector('#mainRect');
        let text = svg.querySelector('#text7');
        let animationKeyframes = {
            stroke: [
                '#eeeeeeff',
                '#ffff00'
            ],
            offset: [
                0,
                1
            ]
        };
        let animationOptions = {
            duration: 500,
            fill: 'forwards'
        };
        rect.animate(animationKeyframes, animationOptions);
        text.animate(animationKeyframes, animationOptions);
    }
    successAnimation(object) {
        if (!object) return;
        let svg = object.contentDocument;
        let rect = svg.querySelector('#mainRect');
        let text = svg.querySelector('#text7');
        let animationKeyframes = {
            stroke: [
                '#eeeeeeff',
                '#08a000',
                '#eeeeeeff'
            ],
            offset: [
                0,
                1
            ]
        };
        let animationOptions = {
            duration: 500
        };
        rect.animate(animationKeyframes, animationOptions);
        text.animate(animationKeyframes, animationOptions);
    }
    returnLastElement(input) {
        if (input.childElementCount > 0) {
            if (!input.lastElementChild.classList.contains('fixed')) return input.lastElementChild;
        }
        return undefined;
    }
    inputStyling() {
        document.body.style.backgroundImage = `
            linear-gradient(180deg, 
                ${this.backgroundColor} 0%, 
                #06011b ${20 + this.inputIndex * 2 * (window.innerHeight / document.body.scrollHeight) * (65 / 7)}%,
                #06011b ${20 + (this.inputIndex * 2 + 1) * (window.innerHeight / document.body.scrollHeight) * (65 / 7)}%, 
                ${this.backgroundColor} ${window.innerHeight / document.body.scrollHeight * 100}%
            )
        `;
    //#0d0043
    //#440075
    }
    resultStyling(result) {
        document.body.style.transition = 'background-image 250ms';
        let str = `linear-gradient(180deg,`;
        result.forEach((value, i)=>{
            let color;
            if (value === true) color = '#2be231';
            else if (value === false) color = '#e80000';
            else color = '#140063';
            str += `#140063 ${20 + i * 2 * (window.innerHeight / document.body.scrollHeight) * (65 / 7)}%,
                ${color} ${20 + (i * 2 + 0.5) * (window.innerHeight / document.body.scrollHeight) * (65 / 7)}%, 
                #140063 ${20 + (i * 2 + 1) * (window.innerHeight / document.body.scrollHeight) * (65 / 7)}%, `;
        });
        document.body.style.backgroundImage = str.slice(0, str.length - 2) + ')';
    }
}

},{"..":"1jwFz","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1keBs":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "InflectVocabulary", ()=>InflectVocabulary);
var _ = require("..");
class InflectVocabulary {
    constructor(){
        this.enterMode = false;
        this.tabMode = false;
        this.commandMode = false;
        this.automaticPaddingAdjustment = false;
        this.command = "";
        this.tabulator = "";
        this.tabCount = 0;
        this.v = 1;
        this.padding = [];
        this.animatedBorderWidth = 0;
        this.borderColor = '#12dada';
        this.round = 0;
        this.failures = 0;
        this.totalAttempts = 0;
        this.totalPoints = 0;
        this.badColor = 'rgb(186, 2, 70)';
    }
    modifyDocument(param) {
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
        if (!param) param = 'add nouns';
        let inflectVocabularyIcon;
        inflectVocabularyIcon = document.createElement('object');
        inflectVocabularyIcon.id = 'inflectVocabularyIcon';
        this.v = 0;
        this.badColor = 'rgb(186, 2, 70)';
        switch(param){
            case 'add verbs':
            case 'verbs':
                this.v = 9;
                this.badColor = '#ff00d4';
                if (param === 'add verbs') inflectVocabularyIcon.data = './conjugations.svg';
                else inflectVocabularyIcon.data = './conjugate_verbs.svg';
            case 'add nouns':
            case 'nouns':
            default:
                const request = window.indexedDB.open('Vocabulary', 1);
                request.onerror = ()=>console.error(request.error);
                request.onsuccess = ()=>{
                    this.database = request.result;
                    this.tabulator = '';
                    const transaction = this.database.transaction('inflected vocabulary', 'readonly');
                    transaction.onerror = ()=>console.error(transaction.error);
                    const objectStore = transaction.objectStore('inflected vocabulary');
                    const req = objectStore.getAll();
                    req.onerror = ()=>console.error(req.error);
                    req.onsuccess = ()=>{
                        this.vocabulary = req.result;
                        document.body.classList.add('inflectVocabularyBody');
                        this.iconPlaceholder.classList.add('inflectVocabularyIconPlaceholder');
                        if (param === 'add nouns') inflectVocabularyIcon.data = './declinations.svg';
                        else if (param === 'nouns') inflectVocabularyIcon.data = './decline_nouns.svg';
                        this.iconPlaceholder.insertAdjacentElement('beforeend', inflectVocabularyIcon);
                        if (param === 'add verbs' || param === 'verbs') this.container.classList.add('inflectVocabularyContainer', 'verbs');
                        else this.container.classList.add('inflectVocabularyContainer', 'nouns');
                        this.navbar.classList.add('inflectVocabularyNavbar');
                        this.container.tabIndex = 0;
                        for(let i = 0; i < 21 - this.v; i++){
                            let div = (0, _.createDiv)(`div${i}`, 'editable');
                            this.container.insertAdjacentElement('beforeend', div);
                            if (i < 3) {
                                div.classList.add('firstrow');
                                div.classList.remove('editable');
                                div.style.fontSize = `${div.offsetHeight * 0.75}px`;
                                if (i === 1) div.innerHTML = 'Singular';
                                else if (i === 2) div.innerHTML = 'Plural';
                            }
                            if (i % 3 === 0) {
                                div.classList.add('firstcolumn');
                                div.classList.remove('editable');
                                div.style.fontSize = `${0.25 * div.offsetHeight}px`;
                                if (i > 0) div.innerHTML = `${i / 3}. ${param.includes('verb') ? 'P' : 'F'}.`;
                            }
                            if (!(i < 3 || i % 3 === 0)) {
                                div.style.padding = `${Math.round(0.05 * div.offsetHeight)}px`;
                                if (!param.includes('add')) div.classList.add('shadowDesign');
                                this.padding.push(Math.round(div.offsetHeight * 0.05));
                            } else this.padding.push(0);
                            if (param.includes('verb')) div.classList.add('v');
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
                        icon.addEventListener('load', (_1)=>{
                            icon.contentDocument.addEventListener('click', (_1)=>{
                                (0, _.removeAllEventListeners)();
                                if (this.tabMode) this.cancelTabMode();
                                (0, _.home).modifyDocument();
                                this.commandMode = false;
                            });
                        });
                        this.homeButton.onclick = ()=>{
                            (0, _.removeAllEventListeners)();
                            if (this.tabMode) this.cancelTabMode();
                            (0, _.home).modifyDocument();
                            this.commandMode = false;
                        };
                        this.homeButton.insertAdjacentElement('beforeend', icon);
                        this.navbar.appendChild(this.homeButton);
                        if (param.startsWith('add')) {
                            this.deletionButton = document.createElement('button');
                            this.deletionButton.classList.add('roundButton', 'deletionButton');
                            this.deletionButton.innerHTML = 'X';
                            this.deletionButton.tabIndex = -1;
                            if (param.includes('verb')) this.deletionButton.classList.add('v');
                            this.navbar.appendChild(this.deletionButton);
                            this.buttonRight = document.createElement('button');
                            this.buttonRight.classList.add('roundButton', 'c');
                            this.buttonRight.innerHTML = '>';
                            this.buttonRight.tabIndex = -1;
                            this.navbar.appendChild(this.buttonRight);
                        }
                        if (param) this.type(param);
                        else this.type();
                    };
                };
                break;
        }
        let animation = null;
        this.resizeFunction = ()=>{
            if (animation !== null) {
                clearTimeout(animation);
                animation = null;
            }
            for(let i = 4; i < this.container.children.length; i++)if (i % 3 > 0) {
                let div = this.container.children[i];
                let array = Object.values(this.currentWord)[i % 3 - 1];
                let n = Math.floor(i / 3) - 1;
                this.adjustInputWidth(div, array[n], false);
            }
            animation = setTimeout(()=>{
                for(let j = 4; j < this.container.childElementCount; j++)if (j % 3 > 0) {
                    if (this.automaticPaddingAdjustment) this.automaticPaddingAnimation(this.container.children[j], false, false);
                    else this.paddingAnimation(this.container.children[j]);
                }
            }, 200);
        };
        window.addEventListener("resize", this.resizeFunction);
    }
    type(param) {
        switch(param){
            case 'verbs':
            case 'nouns':
                this.keys = 0;
                this.borderColor = param.includes('verb') ? '#ff5e01' : 'rgba(138, 43, 226, 1)';
                document.querySelectorAll('.editable').forEach((element)=>{
                    element.addEventListener('click', (_)=>{
                        this.inputIndex = parseInt(element.id.slice(3));
                        this.changeSelectedInput();
                    });
                });
                this.selectedInput = document.getElementById('div4');
                this.selectedInput.classList.add('selectedElement');
                this.inputIndex = 4;
                this.wordIndex = this.vocabulary.length;
                this.currentWord = {
                    singular: this.empty(param),
                    plural: this.empty(param),
                    verb: param.includes('verb'),
                    probability: 1
                };
                this.keydownFunction = (event)=>{
                    let forbiddenCharacters = [
                        "\xb4",
                        '`',
                        '^'
                    ];
                    if (this.commandMode) {
                        forbiddenCharacters.push('#');
                        if (event.key === 'Enter') {
                            if (this.command.endsWith('%')) {
                                if (this.command.startsWith('#p-')) {
                                    let percentage = parseInt(this.command.slice(3, this.command.length - 1));
                                    if (percentage >= 0 && percentage <= 100) {
                                        this.padding[this.inputIndex] = Math.round(Math.max(Math.min(this.padding[this.inputIndex] * (1 - percentage / 100), this.selectedInput.clientHeight / 2 * 0.7), 1));
                                        this.paddingAnimation(this.selectedInput);
                                        this.command.split('').forEach((_)=>{
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
                                        this.command.split('').forEach((_)=>{
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
                                        this.padding.forEach((p, i)=>{
                                            let div = document.querySelector(`#div${i}`);
                                            if (i > 3 && i % 3 != 0) {
                                                this.padding[i] = Math.round(Math.max(Math.min(this.padding[i] * (1 + percentage / 100), div.clientHeight / 2 * 0.7), 1));
                                                this.paddingAnimation(div);
                                            }
                                        });
                                        this.command.split('').forEach((_)=>{
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
                                        this.padding.forEach((p, i)=>{
                                            let div = document.querySelector(`#div${i}`);
                                            if (i % 3 != 0) {
                                                this.padding[i] = Math.round(Math.max(Math.min(this.padding[i] * (1 - percentage / 100), div.clientHeight / 2 * 0.7), 1));
                                                this.paddingAnimation(document.querySelector(`#div${i}`));
                                            }
                                        });
                                        this.command.split('').forEach((_)=>{
                                            this.selectedInput.lastElementChild.remove();
                                            this.keys--;
                                        });
                                        this.command = '';
                                        this.commandMode = false;
                                        return;
                                    }
                                }
                            }
                            switch(this.command.toLowerCase()){
                                case '#<':
                                case '#<-':
                                case '#previous':
                                case '#prvs':
                                case '#vorheriges':
                                case '#voriges':
                                case '#prev':
                                    this.command = '';
                                    this.commandMode = false;
                                    this.buttonLeftFunction(event);
                                    return;
                                case '#>':
                                case '#->':
                                case '#next':
                                case '#nxt':
                                case "#n\xe4chstes":
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
                                case "#hauptmen\xfc":
                                case '#home menu':
                                case '#h':
                                    this.command = '';
                                    this.commandMode = false;
                                    (0, _.removeAllEventListeners)();
                                    (0, _.home).modifyDocument();
                                    return;
                                case '#automaticpaddingadjustment':
                                case '#auto':
                                case '#automatic-padding-adjustment':
                                case '#automatische padding-anpassung':
                                case '#automatischepaddinganpassung':
                                case '#automatische-padding-anpassung':
                                case '#apa':
                                    this.automaticPaddingAdjustment = true;
                                    this.command.split('').forEach((_)=>{
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
                                    this.automaticPaddingAdjustment = false;
                                    this.command.split('').forEach((_)=>{
                                        this.selectedInput.lastElementChild.remove();
                                        this.keys--;
                                    });
                                    this.command = '';
                                    this.commandMode = false;
                                    this.borderColor = '#12dada';
                                    if (!param.includes('add')) this.borderColor = param.includes('verb') ? '#ff5e01' : 'rgba(138, 43, 226, 1)';
                                    return;
                                default:
                                    this.command.split('').forEach((_)=>{
                                        this.selectedInput.lastElementChild.remove();
                                        this.keys--;
                                    });
                                    this.commandMode = false;
                                    this.changeSelectedInput();
                                    break;
                            }
                            return;
                        } else if (event.key === 'ArrowUp') {
                            this.command.split('').forEach((_)=>{
                                this.selectedInput.removeChild(this.selectedInput.lastElementChild);
                                this.keys--;
                            });
                            if (this.inputIndex > 6) this.inputIndex -= 3;
                            this.changeSelectedInput();
                            this.command = '';
                            this.commandMode = false;
                            return;
                        } else if (event.key === 'ArrowDown') {
                            this.command.split('').forEach((_)=>{
                                this.selectedInput.removeChild(this.selectedInput.lastElementChild);
                                this.keys--;
                            });
                            this.command = '';
                            this.commandMode = false;
                            if (this.inputIndex < 18 - this.v) this.inputIndex += 3;
                            this.changeSelectedInput();
                            return;
                        } else if (event.key === 'ArrowLeft') {
                            this.command.split('').forEach((_)=>{
                                this.selectedInput.removeChild(this.selectedInput.lastElementChild);
                                this.keys--;
                            });
                            this.command = '';
                            this.commandMode = false;
                            if (this.inputIndex > 4) {
                                this.inputIndex--;
                                if (this.inputIndex % 3 === 0) this.inputIndex--;
                                this.changeSelectedInput();
                            }
                            return;
                        } else if (event.key === 'ArrowRight') {
                            this.command.split('').forEach((_)=>{
                                this.selectedInput.removeChild(this.selectedInput.lastElementChild);
                                this.keys--;
                            });
                            this.command = '';
                            this.commandMode = false;
                            if (this.inputIndex < 20 - this.v) {
                                this.inputIndex++;
                                if (this.inputIndex % 3 === 0) this.inputIndex++;
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
                                    return;
                                }
                            }
                            if (this.automaticPaddingAdjustment && this.padding[this.inputIndex] > this.selectedInput.offsetHeight * 0.05) {
                                let object = this.selectedInput.lastElementChild;
                                let w = Math.round((this.selectedInput.getBoundingClientRect().width - parseFloat(window.getComputedStyle(this.selectedInput).paddingLeft) - parseFloat(window.getComputedStyle(this.selectedInput).paddingRight)) * 100) / 100;
                                let aspectRatio = object.getBoundingClientRect().height / object.getBoundingClientRect().width;
                                let h = w / this.keys * aspectRatio;
                                let padding = Math.max((this.selectedInput.getBoundingClientRect().height - h) / 2, this.selectedInput.offsetHeight * 0.05);
                                this.padding[this.inputIndex] = Math.max(padding, 1);
                                this.selectedInput.style.padding = `${this.padding[this.inputIndex]}px 0.25vw`;
                            }
                        }
                        if (this.commandMode && (this.selectedInput.classList.contains('known-case') || forbiddenCharacters.includes(event.key) || event.key.length > 1)) return;
                    }
                    if (!this.commandMode) {
                        if (event.key === 'ArrowRight') {
                            if (this.inputIndex < 20 - this.v) {
                                this.inputIndex++;
                                if (this.inputIndex % 3 === 0) this.inputIndex++;
                                this.changeSelectedInput();
                                this.keys = this.selectedInput.childElementCount;
                            }
                            return;
                        } else if (event.key === 'ArrowLeft') {
                            if (this.inputIndex > 4) {
                                this.inputIndex--;
                                if (this.inputIndex % 3 === 0) this.inputIndex--;
                                this.changeSelectedInput();
                                this.keys = this.selectedInput.childElementCount;
                            }
                            return;
                        } else if (event.key === 'ArrowDown' || event.key === 'Enter') {
                            if (this.inputIndex < 20 - this.v) {
                                if (event.key === 'Enter' && !this.selectedInput.classList.contains('known-case')) {
                                    if (this.compare(Object.values(this.currentWord)[this.inputIndex % 3 - 1][Math.floor(this.inputIndex / 3) - 1], Object.values(this.vocabulary[this.currentWordIndex])[this.inputIndex % 3 - 1][Math.floor(this.inputIndex / 3) - 1])) {
                                        for(let i = 0; i < this.selectedInput.childElementCount; i++){
                                            let object = this.selectedInput.children[i];
                                            this.successAnimation(object);
                                        }
                                        if (Object.values(this.result)[this.inputIndex % 3 - 1][Math.floor(this.inputIndex / 3) - 1] === undefined) {
                                            let array = Object.values(this.result)[this.inputIndex % 3 - 1];
                                            array[Math.floor(this.inputIndex / 3) - 1] = true;
                                            Object.defineProperty(this.result, Object.keys(this.result)[this.inputIndex % 3 - 1], {
                                                value: array
                                            });
                                            let inp = this.selectedInput;
                                            setTimeout((_)=>{
                                                inp.classList.remove('shadowDesign');
                                                inp.classList.add('greenShadowDesign');
                                            }, 500);
                                        }
                                    } else {
                                        for(let i = 0; i < this.selectedInput.childElementCount; i++){
                                            let object = this.selectedInput.children[i];
                                            this.failureAnimation(object);
                                        }
                                        if (Object.values(this.result)[this.inputIndex % 3 - 1][Math.floor(this.inputIndex / 3) - 1] === undefined) {
                                            let array = Object.values(this.result)[this.inputIndex % 3 - 1];
                                            array[Math.floor(this.inputIndex / 3) - 1] = false;
                                            Object.defineProperty(this.result, Object.keys(this.result)[this.inputIndex % 3 - 1], {
                                                value: array
                                            });
                                        }
                                        let inp = this.selectedInput;
                                        setTimeout((_)=>{
                                            inp.classList.remove('shadowDesign');
                                            inp.classList.add('redShadowDesign');
                                        }, 500);
                                        return;
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
                                this.currentWord.singular.forEach((word, i)=>{
                                    let index = 1 + (i + 1) * 3;
                                    if (this.compare(word, Object.values(this.vocabulary[this.currentWordIndex])[index % 3 - 1][Math.floor(index / 3) - 1])) {
                                        for(let ii = 0; ii < this.container.children[index].childElementCount; ii++)if (index % 3 != 0 && !this.container.children[index].classList.contains('known-case')) {
                                            let object = this.container.children[index].children[ii];
                                            this.successAnimation(object);
                                        }
                                        if (Object.values(this.result)[index % 3 - 1][Math.floor(index / 3) - 1] === undefined) {
                                            let array = Object.values(this.result)[this.inputIndex % 3 - 1];
                                            array[Math.floor(this.inputIndex / 3) - 1] = true;
                                            Object.defineProperty(this.result, Object.keys(this.result)[index % 3 - 1], {
                                                value: array
                                            });
                                        }
                                    } else {
                                        for(let ii = 0; ii < this.container.children[index].childElementCount; ii++)if (index % 3 != 0 && !this.container.children[index].classList.contains('known-case')) {
                                            let object = this.container.children[index].children[ii];
                                            this.failureAnimation(object);
                                        }
                                        if (Object.values(this.result)[this.inputIndex % 3 - 1][Math.floor(this.inputIndex / 3) - 1] === undefined) {
                                            let array = Object.values(this.result)[this.inputIndex % 3 - 1];
                                            array[Math.floor(this.inputIndex / 3) - 1] = false;
                                            Object.defineProperty(this.result, Object.keys(this.result)[this.inputIndex % 3 - 1], {
                                                value: array
                                            });
                                        }
                                    }
                                });
                                this.currentWord.plural.forEach((word, i)=>{
                                    let index = 2 + (i + 1) * 3;
                                    if (this.compare(word, Object.values(this.vocabulary[this.currentWordIndex])[index % 3 - 1][Math.floor(index / 3) - 1])) {
                                        for(let ii = 0; ii < this.container.children[index].childElementCount; ii++)if (index % 3 != 0 && !this.container.children[index].classList.contains('known-case')) {
                                            let object = this.container.children[index].children[ii];
                                            this.successAnimation(object);
                                        }
                                        if (Object.values(this.result)[this.inputIndex % 3 - 1][Math.floor(this.inputIndex / 3) - 1] === undefined) {
                                            let array = Object.values(this.result)[this.inputIndex % 3 - 1];
                                            array[Math.floor(this.inputIndex / 3) - 1] = true;
                                            Object.defineProperty(this.result, Object.keys(this.result)[this.inputIndex % 3 - 1], {
                                                value: array
                                            });
                                        }
                                    } else {
                                        for(let ii = 0; ii < this.container.children[index].childElementCount; ii++)if (index % 3 != 0 && !this.container.children[index].classList.contains('known-case')) {
                                            let object = this.container.children[index].children[ii];
                                            this.failureAnimation(object);
                                        }
                                        if (Object.values(this.result)[this.inputIndex % 3 - 1][Math.floor(this.inputIndex / 3) - 1] === undefined) {
                                            let array = Object.values(this.result)[this.inputIndex % 3 - 1];
                                            array[Math.floor(this.inputIndex / 3) - 1] = false;
                                            Object.defineProperty(this.result, Object.keys(this.result)[this.inputIndex % 3 - 1], {
                                                value: array
                                            });
                                        }
                                    }
                                });
                                if (this.compareObjects(this.currentWord, this.vocabulary[this.currentWordIndex])) {
                                    this.totalAttempts += 11 - this.v / 3 * 2;
                                    let addition = this.result.singular.filter((w)=>w === true).length + this.result.plural.filter((w)=>w === true).length;
                                    this.totalPoints += addition;
                                    if (addition != 12 - this.v / 3 * 2) this.vocabulary[this.currentWordIndex].probability *= 0.8;
                                    else this.vocabulary[this.currentWordIndex].probability *= 1.2;
                                    const transaction = this.database.transaction('inflected vocabulary', 'readwrite');
                                    const objectStore = transaction.objectStore('inflected vocabulary');
                                    const request = objectStore.put(this.vocabulary[this.currentWordIndex], this.currentWordIndex + 1);
                                    request.onerror = ()=>console.error(request.error);
                                    setTimeout((_)=>{
                                        document.querySelectorAll('.selectedElement').forEach((div)=>{
                                            div.classList.remove('selectedElement');
                                        });
                                        this.keys = 0;
                                        this.inputIndex = 4;
                                        this.selectedInput = document.querySelector('#div4');
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
                                let array = Object.values(this.currentWord)[this.inputIndex % 3 - 1];
                                array[Math.floor(this.inputIndex / 3) - 1] = array[Math.floor(this.inputIndex / 3) - 1].slice(0, this.keys - 1);
                                Object.defineProperty(this.currentWord, Object.keys(this.currentWord)[this.inputIndex % 3 - 1], {
                                    value: array
                                });
                                this.keys--;
                            }
                            if (this.automaticPaddingAdjustment && this.padding[this.inputIndex] > this.selectedInput.offsetHeight * 0.05) {
                                let object = this.selectedInput.lastElementChild;
                                let w = Math.round((this.selectedInput.getBoundingClientRect().width - parseFloat(window.getComputedStyle(this.selectedInput).paddingLeft) - parseFloat(window.getComputedStyle(this.selectedInput).paddingRight)) * 100) / 100;
                                let aspectRatio = object.getBoundingClientRect().height / object.getBoundingClientRect().width;
                                let h = w / this.keys * aspectRatio;
                                let padding = Math.max((this.selectedInput.getBoundingClientRect().height - h) / 2, this.selectedInput.offsetHeight * 0.05);
                                this.padding[this.inputIndex] = Math.max(padding, 1);
                                this.selectedInput.style.padding = `${this.padding[this.inputIndex]}px 0.25vw`;
                            }
                            return;
                        } else if (this.selectedInput.classList.contains('known-case')) return;
                        else if (event.key === '#') {
                            this.command = '';
                            this.commandMode = true;
                        } else if (event.key === 'Tab') {
                            if (this.tabulator) {
                                if (this.keys + this.tabulator.length >= this.selectedInput.clientWidth / (this.selectedInput.clientHeight - parseFloat(this.selectedInput.style.padding))) this.selectedInput.childNodes.forEach((v, i)=>{
                                    this.failureAnimation(this.selectedInput.children[i]);
                                });
                                else {
                                    let array = Object.values(this.currentWord)[this.inputIndex % 3 - 1];
                                    let n = Math.floor(this.inputIndex / 3) - 1;
                                    array[n] += this.tabulator;
                                    Object.defineProperty(this.currentWord, Object.keys(this.currentWord)[this.inputIndex % 3 - 1], {
                                        value: array
                                    });
                                    this.tabulator.split('').forEach((letter)=>{
                                        let object = document.createElement('object');
                                        object.data = './keys/OG_T.svg';
                                        object.id = `key${this.keys}-inp${this.inputIndex}`;
                                        object.style.height = `100%`;
                                        this.selectedInput.insertAdjacentElement('beforeend', object);
                                        object.hidden = true;
                                        object.addEventListener('load', (_)=>{
                                            object.hidden = false;
                                            let svg = object.contentDocument;
                                            svg.querySelector('#tspan7').innerHTML = letter;
                                            this.keys++;
                                            this.tabulatorAnimation(object);
                                        });
                                    });
                                }
                            }
                            return;
                        } else if (forbiddenCharacters.includes(event.key) || event.key.length > 1) return;
                    }
                    let object = document.createElement('object');
                    object.data = './keys/OG_T.svg';
                    object.id = `key${this.keys}-inp${this.inputIndex}`;
                    object.style.height = `100%`;
                    this.selectedInput.insertAdjacentElement('beforeend', object);
                    object.hidden = true;
                    object.addEventListener('load', (_1)=>{
                        object.hidden = false;
                        let width = Math.round(object.getBoundingClientRect().width * 100) / 100;
                        object.hidden = true;
                        let w = Math.round((this.selectedInput.getBoundingClientRect().width - parseFloat(window.getComputedStyle(this.selectedInput).paddingLeft) - parseFloat(window.getComputedStyle(this.selectedInput).paddingRight) - parseFloat(window.getComputedStyle(this.selectedInput).borderLeftWidth) - parseFloat(window.getComputedStyle(this.selectedInput).borderRightWidth)) * 100) / 100;
                        if (this.keys + 1 > w / width) {
                            if (!this.automaticPaddingAdjustment) {
                                object.remove();
                                for(let i = 0; i < this.keys; i++)this.failureAnimation(this.selectedInput.children[i]);
                                return;
                            } else {
                                object.hidden = false;
                                let aspectRatio = object.getBoundingClientRect().height / object.getBoundingClientRect().width;
                                object.hidden = true;
                                let h = w / (this.keys + 1) * aspectRatio;
                                let padding = (this.selectedInput.getBoundingClientRect().height - h) / 2;
                                if (padding > this.selectedInput.getBoundingClientRect().height / 2 * 0.85) {
                                    object.remove();
                                    for(let i = 0; i < this.keys; i++)this.failureAnimation(this.selectedInput.children[i]);
                                    return;
                                } else {
                                    this.padding[this.inputIndex] = Math.max(padding, 1);
                                    console.log(this.padding[this.inputIndex]);
                                    this.animatedBorderWidth = parseFloat(window.getComputedStyle(this.selectedInput).borderTopWidth);
                                    this.automaticPaddingAnimation(this.selectedInput, true, true);
                                }
                            }
                        }
                        setTimeout((_)=>{
                            object.hidden = false;
                        }, 10);
                        let svg = object.contentDocument;
                        if (event.key === '<') svg.querySelector('#tspan7').innerHTML = '&lt;';
                        else if (event.key === '&') svg.querySelector('#tspan7').innerHTML = '&amp;';
                        else svg.querySelector('#tspan7').innerHTML = event.key.charAt(0);
                        if (!this.commandMode) {
                            let array = Object.values(this.currentWord)[this.inputIndex % 3 - 1];
                            array[Math.floor(this.inputIndex / 3) - 1] += event.key;
                            Object.defineProperty(this.currentWord, Object.keys(this.currentWord)[this.inputIndex % 3 - 1], {
                                value: array
                            });
                        } else {
                            this.command += event.key;
                            (0, _.training).commandAnimation(object);
                        }
                        this.keys++;
                        this.idleAnimation(object);
                    });
                };
                document.addEventListener('keydown', this.keydownFunction);
                window.onkeyup = (event)=>{
                    if (event.key === 'Tab') {
                        if (this.container instanceof HTMLElement) this.container.focus();
                    }
                };
                this.startNewTrainingRound(param ? param : 'nouns');
                break;
            case 'add verbs':
            case 'add nouns':
                this.keys = 0;
                this.borderColor = '#12dada';
                document.querySelectorAll('.editable').forEach((element)=>{
                    element.addEventListener('click', (_)=>{
                        if (this.tabMode) this.cancelTabMode();
                        this.inputIndex = parseInt(element.id.slice(3));
                        this.changeSelectedInput();
                    });
                });
                this.selectedInput = document.getElementById('div4');
                this.selectedInput.classList.add('selectedElement');
                this.inputIndex = 4;
                this.wordIndex = this.vocabulary.length;
                this.currentWord = {
                    singular: this.empty(param),
                    plural: this.empty(param),
                    verb: param.includes('verb'),
                    probability: 1
                };
                let deletionMode = false;
                let indicator;
                let deletionFunction = ()=>{
                    this.vocabulary.splice(this.wordIndex, 1);
                    const transaction = this.database.transaction('inflected vocabulary', 'readwrite');
                    const objectStore = transaction.objectStore('inflected vocabulary');
                    const request = objectStore.openCursor();
                    request.onsuccess = ()=>{
                        let cursor = request.result;
                        if (cursor) {
                            let k = cursor.key;
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
                                let wi1 = vocab1.findLastIndex((w)=>w.verb === param.includes('verb'));
                                let wi2 = vocab2.findIndex((w)=>w.verb === param.includes('verb')) + this.wordIndex;
                                if (this.vocabulary[wi1]) {
                                    this.wordIndex = wi1;
                                    this.currentWord = this.vocabulary[wi1];
                                    let overallIndexes = [];
                                    let tabulatorStyle = false;
                                    for(let i = 3; i < this.container.childElementCount; i++){
                                        let tabulatorIndexes = [];
                                        let n = Math.floor(i / 3) - 1;
                                        let singular = this.currentWord.singular;
                                        let plural = this.currentWord.plural;
                                        if (i % 3 === 1) {
                                            this.container.children[i].innerHTML = '';
                                            for(let ii = 0; ii < singular[Math.floor(i / 3) - 1].length; ii++)if (singular[n].slice(ii, ii + 5) === '^tab^') {
                                                tabulatorStyle = !tabulatorStyle;
                                                ii += 4;
                                            } else {
                                                let object = document.createElement('object');
                                                object.data = './keys/OG_T.svg';
                                                object.id = `key${ii}-inp${i}`;
                                                object.style.height = `100%`;
                                                this.container.children[i].insertAdjacentElement('beforeend', object);
                                                if (tabulatorStyle) tabulatorIndexes.push(ii);
                                                object.addEventListener('load', (_)=>{
                                                    let svg = object.contentDocument;
                                                    svg.querySelector('#tspan7').innerHTML = singular[Math.floor(i / 3) - 1].charAt(ii);
                                                    if (overallIndexes.find((indexes)=>indexes[0] === parseInt(object.parentElement.id.slice(3))) != undefined && overallIndexes.find((indexes)=>indexes[0] === parseInt(object.parentElement.id.slice(3)))[1].includes(parseInt(object.id.slice(3)))) {
                                                        this.tabulatorAnimation(object);
                                                        object.classList.add('tabulator');
                                                    }
                                                });
                                            }
                                            overallIndexes.push([
                                                i,
                                                tabulatorIndexes
                                            ]);
                                        } else if (i % 3 === 2) {
                                            this.container.children[i].innerHTML = '';
                                            for(let ii = 0; ii < plural[Math.floor(i / 3) - 1].length; ii++)if (plural[n].slice(ii, ii + 5) === '^tab^') {
                                                tabulatorStyle = !tabulatorStyle;
                                                ii += 4;
                                            } else {
                                                let object = document.createElement('object');
                                                object.data = './keys/OG_T.svg';
                                                object.id = `key${ii}-inp${i}`;
                                                object.style.height = `100%`;
                                                this.container.children[i].insertAdjacentElement('beforeend', object);
                                                if (tabulatorStyle) tabulatorIndexes.push(ii);
                                                object.addEventListener('load', (_)=>{
                                                    let svg = object.contentDocument;
                                                    svg.querySelector('#tspan7').innerHTML = plural[Math.floor(i / 3) - 1].charAt(ii);
                                                    if (overallIndexes.find((indexes)=>indexes[0] === parseInt(object.parentElement.id.slice(3))) != undefined && overallIndexes.find((indexes)=>indexes[0] === parseInt(object.parentElement.id.slice(3)))[1].includes(parseInt(object.id.slice(3)))) {
                                                        this.tabulatorAnimation(object);
                                                        object.classList.add('tabulator');
                                                    }
                                                });
                                            }
                                        }
                                        overallIndexes.push([
                                            i,
                                            tabulatorIndexes
                                        ]);
                                    }
                                    this.changeSelectedInput();
                                } else if (this.vocabulary[wi2]) {
                                    this.currentWord = this.vocabulary[wi2];
                                    let overallIndexes = [];
                                    let tabulatorStyle = false;
                                    for(let i = 3; i < this.container.childElementCount; i++){
                                        let tabulatorIndexes = [];
                                        let n = Math.floor(i / 3) - 1;
                                        let singular = this.currentWord.singular;
                                        let plural = this.currentWord.plural;
                                        if (i % 3 === 1) {
                                            this.container.children[i].innerHTML = '';
                                            for(let ii = 0; ii < singular[Math.floor(i / 3) - 1].length; ii++)if (singular[n].slice(ii, ii + 5) === '^tab^') {
                                                tabulatorStyle = !tabulatorStyle;
                                                ii += 4;
                                            } else {
                                                let object = document.createElement('object');
                                                object.data = './keys/OG_T.svg';
                                                object.id = `key${ii}-inp${i}`;
                                                object.style.height = `100%`;
                                                this.container.children[i].insertAdjacentElement('beforeend', object);
                                                if (tabulatorStyle) tabulatorIndexes.push(ii);
                                                object.addEventListener('load', (_)=>{
                                                    let svg = object.contentDocument;
                                                    svg.querySelector('#tspan7').innerHTML = singular[Math.floor(i / 3) - 1].charAt(ii);
                                                    if (overallIndexes.find((indexes)=>indexes[0] === parseInt(object.parentElement.id.slice(3))) && overallIndexes.find((indexes)=>indexes[0] === parseInt(object.parentElement.id.slice(3)))[1].includes(parseInt(object.id.slice(3)))) {
                                                        this.tabulatorAnimation(object);
                                                        object.classList.add('tabulator');
                                                    }
                                                });
                                            }
                                            overallIndexes.push([
                                                i,
                                                tabulatorIndexes
                                            ]);
                                        } else if (i % 3 === 2) {
                                            this.container.children[i].innerHTML = '';
                                            for(let ii = 0; ii < plural[Math.floor(i / 3) - 1].length; ii++)if (plural[n].slice(ii, ii + 5) === '^tab^') {
                                                tabulatorStyle = !tabulatorStyle;
                                                ii += 4;
                                            } else {
                                                let object = document.createElement('object');
                                                object.data = './keys/OG_T.svg';
                                                object.id = `key${ii}-inp${i}`;
                                                object.style.height = `100%`;
                                                this.container.children[i].insertAdjacentElement('beforeend', object);
                                                if (tabulatorStyle) tabulatorIndexes.push(ii);
                                                object.addEventListener('load', (_)=>{
                                                    let svg = object.contentDocument;
                                                    svg.querySelector('#tspan7').innerHTML = plural[Math.floor(i / 3) - 1].charAt(ii);
                                                    if (overallIndexes.find((indexes)=>indexes[0] === parseInt(object.parentElement.id.slice(3))) && overallIndexes.find((indexes)=>indexes[0] === parseInt(object.parentElement.id.slice(3)))[1].includes(parseInt(object.id.slice(3)))) {
                                                        this.tabulatorAnimation(object);
                                                        object.classList.add('tabulator');
                                                    }
                                                });
                                            }
                                            overallIndexes.push([
                                                i,
                                                tabulatorIndexes
                                            ]);
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
                                    for(let i = 0; i < this.container.childElementCount; i++){
                                        if (i % 3 != 0) this.container.children[i].innerHTML = '';
                                        this.container.children[i].classList.remove('selectedElement');
                                    }
                                    this.inputIndex = 4;
                                    this.selectedInput = this.container.children[4];
                                    this.tabCount = 0;
                                    this.selectedInput.classList.add('selectedElement');
                                }
                            }
                        }
                    };
                    deletionMode = false;
                    this.deletionButton.removeEventListener('click', deletionFunction);
                    this.deletionButton.classList.remove('click');
                    document.querySelectorAll('object').forEach((object)=>{
                        if (object.contentDocument.getElementById('tspan7')) this.deletionAnimation(object, 1, 'reverse');
                    });
                    Array.from(document.getElementsByClassName('editable')).forEach((div)=>{
                        div.classList.remove('redShadowDesign');
                    });
                };
                this.deletionButton.addEventListener('mousemove', (_)=>{
                    if (deletionMode) return;
                    deletionMode = true;
                    this.deletionAnimation(this.deletionButton, 2000, 'normal');
                    let broken = false;
                    this.container.querySelectorAll('object').forEach((object)=>{
                        if (!object.contentDocument) return;
                        this.deletionAnimation(object, 2000, 'normal');
                        if (object.contentDocument.getElementById('tspan7')) this.deletionAnimation(object, 2000, 'normal');
                        else {
                            broken = true;
                            return;
                        }
                    });
                    if (broken) this.container.querySelectorAll('object').forEach((object)=>{
                        if (object.contentDocument.getElementById('tspan7')) this.deletionAnimation(object, 1, 'reverse');
                    });
                    indicator = setTimeout((_)=>{
                        if (deletionMode) {
                            this.deletionButton.addEventListener('click', deletionFunction);
                            Array.from(document.getElementsByClassName('editable')).forEach((div)=>{
                                div.classList.add('redShadowDesign');
                            });
                        }
                    }, 2000);
                });
                this.deletionButton.addEventListener('mouseleave', (_)=>{
                    clearTimeout(indicator);
                    deletionMode = false;
                    this.deletionAnimation(this.deletionButton, 1, 'reverse');
                    this.container.querySelectorAll('object').forEach((object)=>{
                        if (!object.contentDocument) return;
                        if (object.contentDocument.getElementById('tspan7')) this.deletionAnimation(object, 1, 'reverse');
                    });
                    Array.from(document.getElementsByClassName('editable')).forEach((div)=>{
                        div.classList.remove('redShadowDesign');
                    });
                    this.deletionButton.removeEventListener('click', deletionFunction);
                });
                document.querySelectorAll('.c').forEach((element)=>{
                    element.addEventListener('mousedown', (_)=>{
                        element.classList.add('click');
                        document.querySelectorAll('.editable').forEach((div)=>{
                            div.classList.add('savedElement');
                        });
                    });
                    element.addEventListener('mouseout', (_)=>{
                        element.classList.remove('click');
                        document.querySelectorAll('.editable').forEach((div)=>{
                            div.classList.remove('savedElement');
                        });
                    });
                });
                this.buttonLeftFunction = ()=>{
                    if (this.tabMode) this.cancelTabMode();
                    let vocab = this.vocabulary.slice(0, this.wordIndex);
                    let wi = vocab.findLastIndex((w)=>w.verb === param.includes('verb'));
                    if (this.vocabulary[wi]) {
                        if (this.currentWord.singular.filter((value)=>value === '').length === (param.includes('verb') ? 3 : 6) && this.currentWord.plural.filter((value)=>value === '').length === (param.includes('verb') ? 3 : 6) && this.wordIndex === this.vocabulary.length) {
                            for(let i = 0; i < this.container.childElementCount; i++){
                                this.container.children[i].classList.remove('savedElement');
                                this.buttonLeft.classList.remove('click');
                            }
                            this.wordIndex = wi;
                            this.currentWord = this.vocabulary[wi];
                            let overallIndexes = [];
                            let tabulatorStyle = false;
                            for(let i = 3; i < this.container.childElementCount; i++){
                                let tabulatorIndexes = [];
                                let n = Math.floor(i / 3) - 1;
                                let singular = this.currentWord.singular;
                                let plural = this.currentWord.plural;
                                if (i % 3 === 1) {
                                    this.container.children[i].innerHTML = '';
                                    for(let ii = 0; ii < singular[Math.floor(i / 3) - 1].length; ii++)if (singular[n].slice(ii, ii + 5) === '^tab^') {
                                        tabulatorStyle = !tabulatorStyle;
                                        ii += 4;
                                    } else {
                                        let object = document.createElement('object');
                                        object.data = './keys/OG_T.svg';
                                        object.id = `key${ii}-inp${i}`;
                                        object.style.height = `100%`;
                                        this.container.children[i].insertAdjacentElement('beforeend', object);
                                        if (tabulatorStyle) tabulatorIndexes.push(ii);
                                        object.addEventListener('load', (_)=>{
                                            let svg = object.contentDocument;
                                            svg.querySelector('#tspan7').innerHTML = singular[Math.floor(i / 3) - 1].charAt(ii);
                                            if (overallIndexes.find((indexes)=>indexes[0] === parseInt(object.parentElement.id.slice(3))) != undefined && overallIndexes.find((indexes)=>indexes[0] === parseInt(object.parentElement.id.slice(3)))[1].includes(parseInt(object.id.slice(3)))) {
                                                this.tabulatorAnimation(object);
                                                object.classList.add('tabulator');
                                            }
                                        });
                                    }
                                    overallIndexes.push([
                                        i,
                                        tabulatorIndexes
                                    ]);
                                } else if (i % 3 === 2) {
                                    this.container.children[i].innerHTML = '';
                                    for(let ii = 0; ii < plural[Math.floor(i / 3) - 1].length; ii++)if (plural[n].slice(ii, ii + 5) === '^tab^') {
                                        tabulatorStyle = !tabulatorStyle;
                                        ii += 4;
                                    } else {
                                        let object = document.createElement('object');
                                        object.data = './keys/OG_T.svg';
                                        object.id = `key${ii}-inp${i}`;
                                        object.style.height = `100%`;
                                        this.container.children[i].insertAdjacentElement('beforeend', object);
                                        if (tabulatorStyle) tabulatorIndexes.push(ii);
                                        object.addEventListener('load', (_)=>{
                                            let svg = object.contentDocument;
                                            svg.querySelector('#tspan7').innerHTML = plural[Math.floor(i / 3) - 1].charAt(ii);
                                            if (overallIndexes.find((indexes)=>indexes[0] === parseInt(object.parentElement.id.slice(3))) != undefined && overallIndexes.find((indexes)=>indexes[0] === parseInt(object.parentElement.id.slice(3)))[1].includes(parseInt(object.id.slice(3)))) {
                                                this.tabulatorAnimation(object);
                                                object.classList.add('tabulator');
                                            }
                                        });
                                    }
                                }
                                overallIndexes.push([
                                    i,
                                    tabulatorIndexes
                                ]);
                            }
                            let objects = this.container.querySelectorAll('object');
                            if (objects.length > 0) objects[objects.length - 1].addEventListener('load', (_)=>{
                                objects.forEach((obj)=>obj.hidden = false);
                                for(let i = 4; i < this.container.children.length; i++)if (i % 3 > 0) {
                                    let div = this.container.children[i];
                                    let array = Object.values(this.currentWord)[i % 3 - 1];
                                    let n = Math.floor(i / 3) - 1;
                                    this.adjustInputWidth(div, array[n]);
                                }
                            });
                            else this.resizeFunction(null);
                            this.changeSelectedInput();
                        } else {
                            this.vocabulary[this.wordIndex] = this.currentWord;
                            const transaction = this.database.transaction(`inflected vocabulary`, 'readwrite');
                            transaction.onerror = ()=>console.error(transaction.error);
                            const objectStore = transaction.objectStore(`inflected vocabulary`);
                            const req = objectStore.get(this.wordIndex);
                            req.onerror = ()=>console.error(req.error);
                            req.onsuccess = ()=>{
                                for(let i = 0; i < this.container.childElementCount; i++){
                                    this.container.children[i].classList.remove('savedElement');
                                    this.buttonLeft.classList.remove('click');
                                }
                                const idontcare = objectStore.put(this.currentWord, this.wordIndex + 1);
                                idontcare.onerror = ()=>console.error(idontcare.error);
                                this.wordIndex = wi;
                                let tabulatorStyle = false;
                                this.currentWord = this.vocabulary[wi];
                                let overallIndexes = [];
                                for(let i = 3; i < this.container.childElementCount; i++){
                                    let tabulatorIndexes = [];
                                    let n = Math.floor(i / 3) - 1;
                                    let singular = this.currentWord.singular;
                                    let plural = this.currentWord.plural;
                                    if (i % 3 === 1) {
                                        this.container.children[i].innerHTML = '';
                                        for(let ii = 0; ii < singular[n].length; ii++)if (singular[n].slice(ii, ii + 5) === '^tab^') {
                                            tabulatorStyle = !tabulatorStyle;
                                            ii += 4;
                                        } else {
                                            let object = document.createElement('object');
                                            object.data = './keys/OG_T.svg';
                                            object.id = `key${ii}-inp${i}`;
                                            object.style.height = `100%`;
                                            this.container.children[i].insertAdjacentElement('beforeend', object);
                                            if (tabulatorStyle) tabulatorIndexes.push(ii);
                                            object.addEventListener('load', (_)=>{
                                                let svg = object.contentDocument;
                                                svg.querySelector('#tspan7').innerHTML = singular[Math.floor(i / 3) - 1].charAt(ii);
                                                if (overallIndexes.find((indexes)=>indexes[0] === parseInt(object.parentElement.id.slice(3))) != undefined && overallIndexes.find((indexes)=>indexes[0] === parseInt(object.parentElement.id.slice(3)))[1].includes(parseInt(object.id.slice(3)))) {
                                                    this.tabulatorAnimation(object);
                                                    object.classList.add('tabulator');
                                                }
                                            });
                                        }
                                        overallIndexes.push([
                                            i,
                                            tabulatorIndexes
                                        ]);
                                    } else if (i % 3 === 2) {
                                        this.container.children[i].innerHTML = '';
                                        for(let ii = 0; ii < plural[Math.floor(i / 3) - 1].length; ii++)if (plural[n].slice(ii, ii + 5) === '^tab^') {
                                            tabulatorStyle = !tabulatorStyle;
                                            ii += 4;
                                        } else {
                                            let object = document.createElement('object');
                                            object.data = './keys/OG_T.svg';
                                            object.id = `key${ii}-inp${i}`;
                                            object.style.height = `100%`;
                                            this.container.children[i].insertAdjacentElement('beforeend', object);
                                            if (tabulatorStyle) tabulatorIndexes.push(ii);
                                            object.addEventListener('load', (_)=>{
                                                let svg = object.contentDocument;
                                                svg.querySelector('#tspan7').innerHTML = plural[Math.floor(i / 3) - 1].charAt(ii);
                                                if (overallIndexes.find((indexes)=>indexes[0] === parseInt(object.parentElement.id.slice(3))) != undefined && overallIndexes.find((indexes)=>indexes[0] === parseInt(object.parentElement.id.slice(3)))[1].includes(parseInt(object.id.slice(3)))) {
                                                    this.tabulatorAnimation(object);
                                                    object.classList.add('tabulator');
                                                }
                                            });
                                        }
                                        overallIndexes.push([
                                            i,
                                            tabulatorIndexes
                                        ]);
                                    }
                                }
                                let objects = this.container.querySelectorAll('object');
                                if (objects.length > 0) objects[objects.length - 1].addEventListener('load', (_)=>{
                                    objects.forEach((obj)=>obj.hidden = false);
                                    for(let i = 4; i < this.container.children.length; i++)if (i % 3 > 0) {
                                        let div = this.container.children[i];
                                        let array = Object.values(this.currentWord)[i % 3 - 1];
                                        let n = Math.floor(i / 3) - 1;
                                        this.adjustInputWidth(div, array[n]);
                                    }
                                });
                                else this.resizeFunction(null);
                            };
                        }
                    }
                };
                this.buttonLeft.addEventListener('mouseup', this.buttonLeftFunction);
                this.buttonRightFunction = ()=>{
                    if (this.tabMode) this.cancelTabMode();
                    let vocab = this.vocabulary.slice(this.wordIndex + 1);
                    let wi = vocab.findIndex((w)=>w.verb === param.includes('verb')) >= 0 ? vocab.findIndex((w)=>w.verb === param.includes('verb')) + this.wordIndex + 1 : -1;
                    if (!this.vocabulary[wi]) {
                        this.vocabulary[this.wordIndex] = this.currentWord;
                        const transaction = this.database.transaction(`inflected vocabulary`, 'readwrite');
                        transaction.onerror = ()=>console.error(transaction.error);
                        const objectStore = transaction.objectStore(`inflected vocabulary`);
                        const req = objectStore.put(this.currentWord, this.wordIndex + 1);
                        req.onerror = ()=>console.error(req.error);
                        transaction.oncomplete = ()=>{
                            for(let i = 0; i < this.container.childElementCount; i++){
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
                            for(let i = 3; i < this.container.childElementCount; i++){
                                if (i % 3 != 0) this.container.children[i].innerHTML = '';
                                this.container.children[i].classList.remove('selectedElement');
                            }
                            this.inputIndex = 4;
                            this.selectedInput = this.container.children[4];
                            this.tabCount = 0;
                            this.selectedInput.classList.add('selectedElement');
                        };
                        this.resizeFunction(null);
                    } else {
                        this.vocabulary[this.wordIndex] = this.currentWord;
                        for(let i = 0; i < this.container.childElementCount; i++){
                            this.container.children[i].classList.remove('savedElement');
                            this.buttonRight.classList.remove('click');
                        }
                        const transaction = this.database.transaction(`inflected vocabulary`, 'readwrite');
                        transaction.onerror = ()=>console.error(transaction.error);
                        const objectStore = transaction.objectStore(`inflected vocabulary`);
                        const req = objectStore.get(this.wordIndex);
                        req.onerror = ()=>console.error(req.error);
                        req.onsuccess = ()=>{
                            const idontcare = objectStore.put(this.currentWord, this.wordIndex + 1);
                            idontcare.onerror = ()=>console.error(idontcare.error);
                            this.wordIndex = wi;
                            this.currentWord = this.vocabulary[wi];
                            let overallIndexes = [];
                            let tabulatorStyle = false;
                            for(let i = 3; i < this.container.childElementCount; i++){
                                let tabulatorIndexes = [];
                                let n = Math.floor(i / 3) - 1;
                                let singular = this.currentWord.singular;
                                let plural = this.currentWord.plural;
                                if (i % 3 === 1) {
                                    this.container.children[i].innerHTML = '';
                                    for(let ii = 0; ii < singular[Math.floor(i / 3) - 1].length; ii++)if (singular[n].slice(ii, ii + 5) === '^tab^') {
                                        tabulatorStyle = !tabulatorStyle;
                                        ii += 4;
                                    } else {
                                        let object = document.createElement('object');
                                        object.data = './keys/OG_T.svg';
                                        object.id = `key${ii}-inp${i}`;
                                        object.style.height = `100%`;
                                        this.container.children[i].insertAdjacentElement('beforeend', object);
                                        if (tabulatorStyle) tabulatorIndexes.push(ii);
                                        object.hidden = true;
                                        object.addEventListener('load', (_)=>{
                                            let svg = object.contentDocument;
                                            svg.querySelector('#tspan7').innerHTML = singular[Math.floor(i / 3) - 1].charAt(ii);
                                            if (overallIndexes.find((indexes)=>indexes[0] === parseInt(object.parentElement.id.slice(3))) && overallIndexes.find((indexes)=>indexes[0] === parseInt(object.parentElement.id.slice(3)))[1].includes(parseInt(object.id.slice(3)))) {
                                                this.tabulatorAnimation(object);
                                                object.classList.add('tabulator');
                                            }
                                        });
                                    }
                                    overallIndexes.push([
                                        i,
                                        tabulatorIndexes
                                    ]);
                                } else if (i % 3 === 2) {
                                    this.container.children[i].innerHTML = '';
                                    for(let ii = 0; ii < plural[Math.floor(i / 3) - 1].length; ii++)if (plural[n].slice(ii, ii + 5) === '^tab^') {
                                        tabulatorStyle = !tabulatorStyle;
                                        ii += 4;
                                    } else {
                                        let object = document.createElement('object');
                                        object.data = './keys/OG_T.svg';
                                        object.id = `key${ii}-inp${i}`;
                                        object.style.height = `100%`;
                                        this.container.children[i].insertAdjacentElement('beforeend', object);
                                        if (tabulatorStyle) tabulatorIndexes.push(ii);
                                        object.hidden = true;
                                        object.addEventListener('load', (_)=>{
                                            let svg = object.contentDocument;
                                            svg.querySelector('#tspan7').innerHTML = plural[Math.floor(i / 3) - 1].charAt(ii);
                                            if (overallIndexes.find((indexes)=>indexes[0] === parseInt(object.parentElement.id.slice(3))) && overallIndexes.find((indexes)=>indexes[0] === parseInt(object.parentElement.id.slice(3)))[1].includes(parseInt(object.id.slice(3)))) {
                                                this.tabulatorAnimation(object);
                                                object.classList.add('tabulator');
                                            }
                                        });
                                    }
                                    overallIndexes.push([
                                        i,
                                        tabulatorIndexes
                                    ]);
                                }
                                this.changeSelectedInput();
                            }
                            let objects = this.container.querySelectorAll('object');
                            if (objects.length > 0) objects[objects.length - 1].addEventListener('load', (_)=>{
                                objects.forEach((obj)=>obj.hidden = false);
                                for(let i = 4; i < this.container.children.length; i++)if (i % 3 > 0) {
                                    let div = this.container.children[i];
                                    let array = Object.values(this.currentWord)[i % 3 - 1];
                                    let n = Math.floor(i / 3) - 1;
                                    this.adjustInputWidth(div, array[n]);
                                }
                            });
                            else this.resizeFunction(null);
                        };
                    }
                };
                this.buttonRight.addEventListener('mouseup', this.buttonRightFunction);
                this.keydownFunction = (event)=>{
                    let forbiddenCharacters = [
                        "\xb4",
                        '`',
                        '^'
                    ];
                    if (this.commandMode) {
                        forbiddenCharacters.push('#');
                        if (event.key === 'Enter') {
                            if (this.command.endsWith('%')) {
                                if (this.command.startsWith('#p-')) {
                                    let percentage = parseInt(this.command.slice(3, this.command.length - 1));
                                    if (percentage >= 0 && percentage <= 100) {
                                        this.padding[this.inputIndex] = Math.round(Math.max(Math.min(this.padding[this.inputIndex] * (1 - percentage / 100), this.selectedInput.clientHeight / 2 * 0.7), 1));
                                        this.paddingAnimation(this.selectedInput);
                                        this.command.split('').forEach((_)=>{
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
                                        this.command.split('').forEach((_)=>{
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
                                        this.padding.forEach((p, i)=>{
                                            let div = document.querySelector(`#div${i}`);
                                            if (i > 3 && i % 3 != 0) {
                                                this.padding[i] = Math.round(Math.max(Math.min(this.padding[i] * (1 + percentage / 100), div.clientHeight / 2 * 0.7), 1));
                                                this.paddingAnimation(div);
                                            }
                                        });
                                        this.command.split('').forEach((_)=>{
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
                                        this.padding.forEach((p, i)=>{
                                            let div = document.querySelector(`#div${i}`);
                                            if (i % 3 != 0) {
                                                this.padding[i] = Math.round(Math.max(Math.min(this.padding[i] * (1 - percentage / 100), div.clientHeight / 2 * 0.7), 1));
                                                this.paddingAnimation(document.querySelector(`#div${i}`));
                                            }
                                        });
                                        this.command.split('').forEach((_)=>{
                                            this.selectedInput.lastElementChild.remove();
                                            this.keys--;
                                        });
                                        this.command = '';
                                        this.commandMode = false;
                                        return;
                                    }
                                }
                            }
                            switch(this.command.toLowerCase()){
                                case '#<':
                                case '#<-':
                                case '#previous':
                                case '#prvs':
                                case '#vorheriges':
                                case '#voriges':
                                case '#prev':
                                    this.command = '';
                                    this.commandMode = false;
                                    this.buttonLeftFunction(event);
                                    return;
                                case '#>':
                                case '#->':
                                case '#next':
                                case '#nxt':
                                case "#n\xe4chstes":
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
                                case "#hauptmen\xfc":
                                case '#home menu':
                                case '#h':
                                    this.command = '';
                                    this.commandMode = false;
                                    (0, _.removeAllEventListeners)();
                                    (0, _.home).modifyDocument();
                                    return;
                                case '#automaticpaddingadjustment':
                                case '#auto':
                                case '#automatic-padding-adjustment':
                                case '#automatische padding-anpassung':
                                case '#automatischepaddinganpassung':
                                case '#automatische-padding-anpassung':
                                case '#apa':
                                    this.automaticPaddingAdjustment = true;
                                    this.command.split('').forEach((_)=>{
                                        this.selectedInput.lastElementChild.remove();
                                        this.keys--;
                                    });
                                    this.command = '';
                                    this.commandMode = false;
                                    this.borderColor = 'orange';
                                    this.adjustInputWidth(this.selectedInput, Object.values(this.currentWord)[this.inputIndex % 3 - 1][Math.floor(this.inputIndex / 3) - 1], true);
                                    return;
                                case '#manualpaddingadjustment':
                                case '#manual':
                                case '#normalpaddingadjustment':
                                case '#normal':
                                case '#manual-padding-adjustment':
                                case '#mpa':
                                case '#npa':
                                    this.automaticPaddingAdjustment = false;
                                default:
                                    this.paddingAnimation(this.selectedInput);
                                    this.command.split('').forEach((_)=>{
                                        this.selectedInput.lastElementChild.remove();
                                        this.keys--;
                                    });
                            }
                            this.command = '';
                            this.commandMode = false;
                            return;
                        } else if (event.key === 'ArrowUp') {
                            this.command.split('').forEach((_)=>{
                                this.selectedInput.removeChild(this.selectedInput.lastElementChild);
                                this.keys--;
                            });
                            if (this.inputIndex > 6) this.inputIndex -= 3;
                            this.changeSelectedInput();
                            this.command = '';
                            this.commandMode = false;
                            return;
                        } else if (event.key === 'ArrowDown') {
                            this.command.split('').forEach((_)=>{
                                this.selectedInput.removeChild(this.selectedInput.lastElementChild);
                                this.keys--;
                            });
                            this.command = '';
                            this.commandMode = false;
                            if (this.inputIndex < 18 - this.v) this.inputIndex += 3;
                            this.changeSelectedInput();
                            return;
                        } else if (event.key === 'ArrowLeft') {
                            this.command.split('').forEach((_)=>{
                                this.selectedInput.removeChild(this.selectedInput.lastElementChild);
                                this.keys--;
                            });
                            this.command = '';
                            this.commandMode = false;
                            if (this.inputIndex > 4) {
                                this.inputIndex--;
                                if (this.inputIndex % 3 === 0) this.inputIndex--;
                                this.changeSelectedInput();
                            }
                            return;
                        } else if (event.key === 'ArrowRight') {
                            this.command.split('').forEach((_)=>{
                                this.selectedInput.removeChild(this.selectedInput.lastElementChild);
                                this.keys--;
                            });
                            this.command = '';
                            this.commandMode = false;
                            if (this.inputIndex < 20 - this.v) {
                                this.inputIndex++;
                                if (this.inputIndex % 3 === 0) this.inputIndex++;
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
                                    return;
                                }
                            }
                        }
                        if (this.commandMode && (this.selectedInput.classList.contains('known-case') || forbiddenCharacters.includes(event.key) || event.key.length > 1)) return;
                    }
                    if (!this.commandMode) {
                        if (event.key === 'ArrowRight') {
                            if (this.tabMode) this.cancelTabMode();
                            if (this.inputIndex < 20 - this.v) {
                                this.inputIndex++;
                                if (this.inputIndex % 3 === 0) this.inputIndex++;
                                this.changeSelectedInput();
                                this.keys = this.selectedInput.childElementCount;
                            }
                            return;
                        } else if (event.key === 'ArrowLeft') {
                            if (this.tabMode) this.cancelTabMode();
                            if (this.inputIndex > 4) {
                                this.inputIndex--;
                                if (this.inputIndex % 3 === 0) this.inputIndex--;
                                this.changeSelectedInput();
                                this.keys = this.selectedInput.childElementCount;
                            }
                            return;
                        } else if (event.key === 'ArrowDown' || event.key === 'Enter') {
                            if (this.tabMode) {
                                this.cancelTabMode();
                                if (this.inputIndex === 19) return;
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
                                document.querySelectorAll('.editable').forEach((element)=>{
                                    element.classList.add('savedElement');
                                });
                                if (this.enterMode) {
                                    let vocab = this.vocabulary.slice(this.wordIndex + 1);
                                    let wi = vocab.findIndex((w)=>w.verb === param.includes('verb'));
                                    if (!this.vocabulary[wi]) {
                                        this.vocabulary[this.wordIndex] = this.currentWord;
                                        const transaction = this.database.transaction(`inflected vocabulary`, 'readwrite');
                                        transaction.onerror = ()=>console.error(transaction.error);
                                        const objectStore = transaction.objectStore(`inflected vocabulary`);
                                        const req = objectStore.put(this.currentWord, this.wordIndex + 1);
                                        req.onerror = ()=>console.error(req.error);
                                        transaction.oncomplete = ()=>{
                                            for(let i = 0; i < this.container.childElementCount; i++)this.container.children[i].classList.remove('savedElement');
                                            this.wordIndex++;
                                            this.keys = 0;
                                            this.currentWord = {
                                                singular: this.empty(param),
                                                plural: this.empty(param),
                                                verb: param.includes('verb'),
                                                probability: 1
                                            };
                                            for(let i = 0; i < this.container.childElementCount; i++){
                                                if (i % 3 != 0) this.container.children[i].innerHTML = '';
                                                this.container.children[i].classList.remove('selectedElement');
                                            }
                                            this.inputIndex = 4;
                                            this.selectedInput = this.container.children[4];
                                            this.tabCount = 0;
                                            this.selectedInput.classList.add('selectedElement');
                                        };
                                    } else {
                                        this.vocabulary[this.wordIndex] = this.currentWord;
                                        for(let i = 0; i < this.container.childElementCount; i++)this.container.children[i].classList.remove('savedElement');
                                        const transaction = this.database.transaction(`inflected vocabulary`, 'readwrite');
                                        transaction.onerror = ()=>console.error(transaction.error);
                                        const objectStore = transaction.objectStore(`inflected vocabulary`);
                                        const req = objectStore.get(this.wordIndex);
                                        req.onerror = ()=>console.error(req.error);
                                        req.onsuccess = ()=>{
                                            const idontcare = objectStore.put(this.currentWord, this.wordIndex + 1);
                                            idontcare.onerror = ()=>console.error(idontcare.error);
                                            this.wordIndex = wi;
                                            this.currentWord = this.vocabulary[wi];
                                            let overallIndexes = [];
                                            let tabulatorStyle = false;
                                            for(let i = 3; i < this.container.childElementCount; i++){
                                                let tabulatorIndexes = [];
                                                let n = Math.floor(i / 3) - 1;
                                                let singular = this.currentWord.singular;
                                                let plural = this.currentWord.plural;
                                                if (i % 3 === 1) {
                                                    this.container.children[i].innerHTML = '';
                                                    for(let ii = 0; ii < singular[Math.floor(i / 3) - 1].length; ii++)if (singular[n].slice(ii, ii + 5) === '^tab^') {
                                                        tabulatorStyle = !tabulatorStyle;
                                                        ii += 4;
                                                    } else {
                                                        let object = document.createElement('object');
                                                        object.data = './keys/OG_T.svg';
                                                        object.id = `key${ii}-inp${i}`;
                                                        object.style.height = `100%`;
                                                        this.container.children[i].insertAdjacentElement('beforeend', object);
                                                        if (tabulatorStyle) tabulatorIndexes.push(ii);
                                                        object.addEventListener('load', (_)=>{
                                                            let svg = object.contentDocument;
                                                            svg.querySelector('#tspan7').innerHTML = singular[Math.floor(i / 3) - 1].charAt(ii);
                                                            if (overallIndexes.find((indexes)=>indexes[0] === parseInt(object.parentElement.id.slice(3))) && overallIndexes.find((indexes)=>indexes[0] === parseInt(object.parentElement.id.slice(3)))[1].includes(parseInt(object.id.slice(3)))) {
                                                                this.tabulatorAnimation(object);
                                                                object.classList.add('tabulator');
                                                            }
                                                        });
                                                    }
                                                    overallIndexes.push([
                                                        i,
                                                        tabulatorIndexes
                                                    ]);
                                                } else if (i % 3 === 2) {
                                                    this.container.children[i].innerHTML = '';
                                                    for(let ii = 0; ii < plural[Math.floor(i / 3) - 1].length; ii++)if (plural[n].slice(ii, ii + 5) === '^tab^') {
                                                        tabulatorStyle = !tabulatorStyle;
                                                        ii += 4;
                                                    } else {
                                                        let object = document.createElement('object');
                                                        object.data = './keys/OG_T.svg';
                                                        object.id = `key${ii}-inp${i}`;
                                                        object.style.height = `100%`;
                                                        this.container.children[i].insertAdjacentElement('beforeend', object);
                                                        if (tabulatorStyle) tabulatorIndexes.push(ii);
                                                        object.addEventListener('load', (_)=>{
                                                            let svg = object.contentDocument;
                                                            svg.querySelector('#tspan7').innerHTML = plural[Math.floor(i / 3) - 1].charAt(ii);
                                                            if (overallIndexes.find((indexes)=>indexes[0] === parseInt(object.parentElement.id.slice(3))) && overallIndexes.find((indexes)=>indexes[0] === parseInt(object.parentElement.id.slice(3)))[1].includes(parseInt(object.id.slice(3)))) {
                                                                this.tabulatorAnimation(object);
                                                                object.classList.add('tabulator');
                                                            }
                                                        });
                                                    }
                                                    overallIndexes.push([
                                                        i,
                                                        tabulatorIndexes
                                                    ]);
                                                }
                                                this.changeSelectedInput();
                                            }
                                        };
                                    }
                                    this.enterMode = false;
                                } else this.enterMode = true;
                                const transaction = this.database.transaction('inflected vocabulary', 'readwrite');
                                const objectStore = transaction.objectStore('inflected vocabulary');
                                const req = objectStore.put(this.currentWord, this.wordIndex + 1);
                                req.onerror = ()=>console.error(req.error);
                                setTimeout((_)=>{
                                    for(let i = 0; i < this.container.childElementCount; i++)this.container.children[i].classList.remove('savedElement');
                                }, 250);
                            }
                            return;
                        } else if (event.key === 'ArrowUp') {
                            if (this.tabMode) this.cancelTabMode();
                            if (this.inputIndex > 6) {
                                this.inputIndex -= 3;
                                this.changeSelectedInput();
                                this.keys = this.selectedInput.childElementCount;
                            }
                            return;
                        } else if (event.key === 'Backspace') {
                            if (this.selectedInput.lastElementChild) {
                                this.selectedInput.lastElementChild.remove();
                                let array = Object.values(this.currentWord)[this.inputIndex % 3 - 1];
                                let n = Math.floor(this.inputIndex / 3) - 1;
                                if (array[n].slice(-5) === '^tab^') {
                                    array[n] = array[n].slice(0, array[n].length - 6);
                                    if (this.tabCount > 1) this.tabCount--;
                                    this.tabMode = !this.tabMode;
                                    this.selectedInput.classList.add('tab');
                                    if (!this.tabMode) this.selectedInput.classList.remove('tab');
                                } else array[n] = array[n].slice(0, array[n].length - 1);
                                Object.defineProperty(this.currentWord, Object.keys(this.currentWord)[this.inputIndex % 3 - 1], {
                                    value: array
                                });
                                this.keys--;
                                if (this.tabMode) this.tabulator = this.tabulator.slice(0, this.tabulator.length - 1);
                            } else if (this.tabMode) this.cancelTabMode();
                            if (this.automaticPaddingAdjustment && this.padding[this.inputIndex] > this.selectedInput.offsetHeight * 0.05) {
                                let object = this.selectedInput.lastElementChild;
                                let w = Math.round((this.selectedInput.getBoundingClientRect().width - parseFloat(window.getComputedStyle(this.selectedInput).paddingLeft) - parseFloat(window.getComputedStyle(this.selectedInput).paddingRight)) * 100) / 100;
                                let aspectRatio = object.getBoundingClientRect().height / object.getBoundingClientRect().width;
                                let h = w / this.keys * aspectRatio;
                                let padding = Math.max((this.selectedInput.getBoundingClientRect().height - h) / 2, this.selectedInput.offsetHeight * 0.05);
                                this.padding[this.inputIndex] = Math.max(padding, 1);
                                this.selectedInput.style.padding = `${this.padding[this.inputIndex]}px 0.25vw`;
                            }
                            return;
                        } else if (event.key === '#') {
                            this.command = '';
                            this.commandMode = true;
                        } else if (event.key === 'Tab') {
                            console.log(this.tabulator);
                            if (!this.tabMode) {
                                if (this.tabCount >= 2) {
                                    let array = Object.values(this.currentWord)[this.inputIndex % 3 - 1];
                                    let n = Math.floor(this.inputIndex / 3) - 1;
                                    let index;
                                    while(array[n].search('\\^tab\\^') !== -1){
                                        let c = array[n].search('\\^tab\\^');
                                        if (index === undefined) index = c;
                                        array[n] = array[n].slice(0, c) + array[n].slice(c + 5, array[n].length);
                                    }
                                    array[n] = array[n].slice(0, index) + '^tab^' + array[n].slice(index, array[n].length);
                                    Object.defineProperty(this.currentWord, Object.keys(this.currentWord)[this.inputIndex % 3 - 1], {
                                        value: array
                                    });
                                    let tabulatorStyle = false;
                                    for(let i = 0; i < array[n].length; i++){
                                        if (array[n].slice(i, i + 5) === '^tab^') {
                                            tabulatorStyle = !tabulatorStyle;
                                            i += 4;
                                        } else if (this.selectedInput.children[i > index ? i - 5 : i]) {
                                            let object = this.selectedInput.children[i > index ? i - 5 : i];
                                            let svg = object.contentDocument;
                                            svg.querySelector('#tspan7').innerHTML = array[n].charAt(i);
                                            if (tabulatorStyle) {
                                                this.tabulatorAnimation(object);
                                                object.classList.add('tabulator');
                                            } else object.classList.remove('tabulator');
                                            this.selectedInput.children[i];
                                        }
                                    }
                                    this.tabulator = array[n].slice(index + 5, array[n].length);
                                    this.tabCount = 1;
                                    this.tabMode = true;
                                    this.selectedInput.classList.add('tab');
                                } else {
                                    this.tabMode = true;
                                    this.selectedInput.classList.add('tab');
                                    let array = Object.values(this.currentWord)[this.inputIndex % 3 - 1];
                                    array[Math.floor(this.inputIndex / 3) - 1] += "^tab^";
                                    Object.defineProperty(this.currentWord, Object.keys(this.currentWord)[this.inputIndex % 3 - 1], {
                                        value: array
                                    });
                                    this.tabCount++;
                                }
                            } else if (this.tabulator.length > 0) {
                                if (Object.values(this.currentWord)[this.inputIndex % 3 - 1][Math.floor(this.inputIndex / 3) - 1].slice(-5) != '^tab^') {
                                    this.tabMode = false;
                                    this.selectedInput.classList.remove('tab');
                                    let array = Object.values(this.currentWord)[this.inputIndex % 3 - 1];
                                    array[Math.floor(this.inputIndex / 3) - 1] += "^tab^";
                                    Object.defineProperty(this.currentWord, Object.keys(this.currentWord)[this.inputIndex % 3 - 1], {
                                        value: array
                                    });
                                    this.tabCount++;
                                } else {
                                    let array = Object.values(this.currentWord)[this.inputIndex % 3 - 1];
                                    let n = Math.floor(this.inputIndex / 3) - 1;
                                    array[n] += this.tabulator + "^tab^";
                                    let index = array[n].search(this.tabulator);
                                    if (index === -1) index = 0;
                                    if (this.keys + this.tabulator.length <= Math.floor(this.selectedInput.clientWidth / (this.selectedInput.clientHeight - parseFloat(this.selectedInput.style.padding)))) for(let i = 0; i < this.tabulator.length; i++){
                                        let object = document.createElement('object');
                                        object.data = './keys/OG_T.svg';
                                        object.id = `key${this.keys}-inp${this.inputIndex}`;
                                        object.style.height = `100%`;
                                        this.selectedInput.insertAdjacentElement('beforeend', object);
                                        object.hidden = true;
                                        object.addEventListener('load', (_)=>{
                                            object.hidden = false;
                                            this.tabulatorAnimation(object);
                                            object.classList.add('tabulator');
                                            let svg = object.contentDocument;
                                            svg.querySelector('#tspan7').innerHTML = this.tabulator.charAt(i);
                                            this.tabulator.length;
                                        });
                                        this.keys++;
                                    }
                                    else {
                                        for(let ii = 0; ii < this.keys; ii++)this.failureAnimation(this.selectedInput.children[ii]);
                                        return;
                                    }
                                    Object.defineProperty(this.currentWord, Object.keys(this.currentWord)[this.inputIndex % 3 - 1], {
                                        value: array
                                    });
                                    this.tabMode = false;
                                    this.tabCount++;
                                    this.selectedInput.classList.remove('tab');
                                }
                            } else {
                                this.tabCount = 0;
                                this.cancelTabMode();
                            }
                            return;
                        } else if (forbiddenCharacters.includes(event.key) || event.key.length > 1) return;
                    }
                    this.enterMode = false;
                    let object = document.createElement('object');
                    object.data = './keys/OG_T.svg';
                    object.id = `key${this.keys}-inp${this.inputIndex}`;
                    object.style.height = `100%`;
                    this.selectedInput.insertAdjacentElement('beforeend', object);
                    object.hidden = true;
                    object.addEventListener('load', (_1)=>{
                        object.hidden = false;
                        let width = Math.round(object.getBoundingClientRect().width * 100) / 100;
                        object.hidden = true;
                        let w = Math.round((this.selectedInput.getBoundingClientRect().width - parseFloat(window.getComputedStyle(this.selectedInput).paddingLeft) - parseFloat(window.getComputedStyle(this.selectedInput).paddingRight) - parseFloat(window.getComputedStyle(this.selectedInput).borderLeftWidth) - parseFloat(window.getComputedStyle(this.selectedInput).borderRightWidth)) * 100) / 100;
                        if (this.keys + 1 > w / width) {
                            if (!this.automaticPaddingAdjustment) {
                                object.remove();
                                for(let i = 0; i < this.keys; i++)this.failureAnimation(this.selectedInput.children[i]);
                                return;
                            } else {
                                object.hidden = false;
                                let aspectRatio = object.getBoundingClientRect().height / object.getBoundingClientRect().width;
                                object.hidden = true;
                                let h = w / (this.keys + 1) * aspectRatio;
                                let padding = (this.selectedInput.getBoundingClientRect().height - h) / 2;
                                if (padding > this.selectedInput.getBoundingClientRect().height / 2 * 0.85) {
                                    object.remove();
                                    for(let i = 0; i < this.keys; i++)this.failureAnimation(this.selectedInput.children[i]);
                                    return;
                                } else {
                                    this.padding[this.inputIndex] = Math.max(padding, 1);
                                    console.log(this.padding[this.inputIndex]);
                                    this.animatedBorderWidth = parseFloat(window.getComputedStyle(this.selectedInput).borderTopWidth);
                                    this.automaticPaddingAnimation(this.selectedInput, true, true);
                                }
                            }
                        }
                        setTimeout((_)=>{
                            object.hidden = false;
                        }, 10);
                        let svg = object.contentDocument;
                        if (event.key === '<') svg.querySelector('#tspan7').innerHTML = '&lt;';
                        else if (event.key === '&') svg.querySelector('#tspan7').innerHTML = '&amp;';
                        else svg.querySelector('#tspan7').innerHTML = event.key.charAt(0);
                        if (!this.commandMode) {
                            let array = Object.values(this.currentWord)[this.inputIndex % 3 - 1];
                            let n = Math.floor(this.inputIndex / 3) - 1;
                            array[Math.floor(this.inputIndex / 3) - 1] += event.key;
                            Object.defineProperty(this.currentWord, Object.keys(this.currentWord)[this.inputIndex % 3 - 1], {
                                value: array
                            });
                            if (this.tabMode) {
                                if (array[n].slice(-6, -1) === '^tab^') this.tabulator = '';
                                this.tabulator += event.key;
                                this.tabulatorAnimation(object);
                                object.classList.add('tabulator');
                            } else this.idleAnimation(object);
                        } else {
                            this.command += event.key;
                            (0, _.training).commandAnimation(object);
                        }
                        this.keys++;
                    });
                };
                document.addEventListener('keydown', this.keydownFunction);
                window.addEventListener('keydown', (event)=>{
                    if (event.key === 'Tab') {
                        event.preventDefault();
                        this.container.focus();
                    }
                });
                break;
            default:
                break;
        }
    }
    empty(param) {
        let l = param.includes('verb') ? 3 : 6;
        return new Array(l).fill('');
    }
    changeSelectedInput() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.selectedInput.style.padding = `${this.padding[parseInt(this.selectedInput.id.slice(3, 5))]}px ${0.05 * this.selectedInput.offsetHeight}px`;
            this.selectedInput.style.transition = 'none';
            this.selectedInput.style.border = 'none';
        }
        document.querySelectorAll('.selectedElement').forEach((elem)=>elem.classList.remove('selectedElement'));
        this.selectedInput = document.getElementById(`div${this.inputIndex}`);
        let word = Object.values(this.currentWord)[this.inputIndex % 3 - 1][Math.floor(this.inputIndex / 3) - 1];
        let regex = new RegExp('\\^tab\\^', 'g');
        let matches = word.match(regex);
        this.tabCount = matches ? matches.length : 0;
        if (!matches ? false : matches.length % 2 === 0) this.selectedInput.classList.remove('tab');
        this.selectedInput.classList.add('selectedElement');
        this.keys = this.selectedInput.childElementCount;
        if (this.automaticPaddingAdjustment) this.automaticPaddingAnimation(this.selectedInput);
        else this.paddingAnimation(this.selectedInput);
    }
    cancelTabMode() {
        let array = Object.values(this.currentWord)[this.inputIndex % 3 - 1];
        let n = Math.floor(this.inputIndex / 3) - 1;
        if (array[n].includes('^tab^')) {
            let start_end = [];
            while(array[n].search('\\^tab\\^') >= 0){
                let c = array[n].search('\\^tab\\^');
                array[n] = array[n].slice(0, c) + array[n].slice(c + 5, array[n].length);
                start_end.push(c);
            }
            if (start_end.length === 1) start_end.push(array[n].length);
            let tab = array[n].slice(start_end[0], start_end[1]);
            for(let i = 0; i < tab.length; i++)this.selectedInput.children[start_end[0]].remove();
            array[n] = array[n].slice(0, start_end[0]) + array[n].slice(start_end[1], array[n].length);
            this.keys -= tab.length;
        }
        this.tabMode = false;
        this.selectedInput.classList.remove('tab');
    }
    findMostUsedTabulator(inflectedWord) {
        if (inflectedWord.singular) {
            let tabs = inflectedWord.singular.map((word)=>{
                if (word.includes('^tab^')) {
                    let w = word;
                    let start;
                    let end = w.length;
                    while(w.includes('^tab^')){
                        let index = w.search('\\^tab\\^');
                        w = w.slice(0, index) + w.slice(index + 5, end);
                        if (start === undefined) start = index;
                        else end = index;
                    }
                    return w.slice(start ? start : 0, end);
                }
            }).concat(inflectedWord.plural.map((word)=>{
                if (word.includes('^tab^')) {
                    let w = word;
                    let start;
                    let end = w.length;
                    while(w.includes('^tab^')){
                        let index = w.search('\\^tab\\^');
                        w = w.slice(0, index) + w.slice(index + 5, end);
                        if (start === undefined) start = index;
                        else end = index;
                    }
                    return w.slice(start ? start : 0, end);
                }
            })).filter((word)=>word != undefined);
            let checkedTabs = [];
            tabs.forEach((tab)=>{
                if (!checkedTabs.map((t)=>t[0]).includes(tab)) checkedTabs.push([
                    tab,
                    1
                ]);
                else {
                    let i = checkedTabs.findIndex((t)=>t[0] === tab);
                    checkedTabs[i] = [
                        tab,
                        checkedTabs[i][1] + 1
                    ];
                }
            });
            for(let i = 0; i < checkedTabs.length; i++)checkedTabs.sort((a, b)=>b[1] - a[1]);
            return checkedTabs.length > 0 ? checkedTabs[0][0] : undefined;
        } else return undefined;
    }
    startNewTrainingRound(param) {
        let vocab = this.vocabulary.filter((w)=>w.verb === param.includes('verb'));
        if (vocab.length === 0) {
            setTimeout((_)=>alert(`Keine ${param.includes('verb') ? 'Konjugationen' : 'Deklinationen'}!`), 250);
            return;
        } else if (vocab.filter((w)=>!isEmpty(w)).length === 0) {
            setTimeout((_)=>alert(`Nur leere ${param.includes('verb') ? 'Konjugationen' : 'Deklinationen'}!`), 250);
            return;
        }
        function isEmpty(w) {
            return w.singular.filter((s)=>s.trim() === '').length === (!param.includes('verb') ? 6 : 3) && w.plural.filter((p)=>p.trim() === '').length === (!param.includes('verb') ? 6 : 3);
        }
        this.round++;
        let overallProbabilty = 0;
        vocab.forEach((word)=>{
            if (!isEmpty(word)) overallProbabilty += word.probability;
        });
        let randomNumber = Math.floor(Math.random() * overallProbabilty * 10) / 10;
        let lowestDifference;
        let lastProbability = 0;
        this.failures = 0;
        this.vocabulary.forEach((word, i)=>{
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
        document.querySelectorAll('.editable').forEach((div)=>{
            div.innerHTML = '';
            div.classList.remove('redShadowDesign');
            div.classList.remove('greenShadowDesign');
            div.classList.remove('known-case');
            div.classList.add('shadowDesign');
        });
        let knownCase;
        let rn;
        let v = this.v / 3;
        do {
            rn = Math.floor(Math.random() * (param.includes('verb') ? 6 : 12));
            knownCase = Object.values(this.vocabulary[this.currentWordIndex])[rn > 5 - v ? 1 : 0][rn > 5 - v ? rn - 6 + v : rn];
        }while (knownCase === '');
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
            singular: param.includes('verb') ? [
                undefined,
                undefined,
                undefined
            ] : [
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined
            ],
            plural: param.includes('verb') ? [
                undefined,
                undefined,
                undefined
            ] : [
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined
            ]
        };
    }
    compare(string1, string2) {
        return string1.replaceAll('^tab^', '') === string2.replaceAll('^tab^', '');
    }
    compareObjects(obj1, obj2) {
        let object1 = JSON.parse(JSON.stringify(obj1));
        let object2 = JSON.parse(JSON.stringify(obj2));
        object1.singular.forEach((word, i)=>{
            object1.singular[i] = word.replaceAll('^tab^', '');
        });
        object1.plural.forEach((word, i)=>{
            object1.plural[i] = word.replaceAll('^tab^', '');
        });
        object2.singular.forEach((word, i)=>{
            object2.singular[i] = word.replaceAll('^tab^', '');
        });
        object2.plural.forEach((word, i)=>{
            object2.plural[i] = word.replaceAll('^tab^', '');
        });
        return Object.values(object1).slice(0, 3).toLocaleString() === Object.values(object2).slice(0, 3).toLocaleString();
    }
    failureAnimation(object) {
        if (!object) return;
        let svg = object.contentDocument;
        let rect = svg.querySelector('#mainRect');
        let text = svg.querySelector('#text7');
        let animationKeyframes = [
            {
                stroke: this.badColor,
                offset: 0.025
            },
            {
                rotate: "10deg z",
                offset: 0.25
            },
            {
                rotate: "0deg z",
                offset: 0.5
            },
            {
                rotate: "-10deg z",
                offset: 0.75,
                stroke: this.badColor
            },
            {
                stroke: "#eeeeeeff",
                offset: 0.925
            },
            {
                rotate: "0deg z",
                offset: 1
            }
        ];
        let animationOptions = {
            duration: 500
        };
        rect.animate(animationKeyframes, animationOptions);
        text.animate(animationKeyframes, animationOptions);
    }
    idleAnimation(object) {
        let svg = object.contentDocument;
        let rect = svg.querySelector('#mainRect');
        let text = svg.querySelector('#text7');
        let animationKeyframes = {
            stroke: [
                '#8f8f8f',
                '#fff',
                '#eeeeeeff'
            ],
            offset: [
                0,
                1
            ]
        };
        let animationOptions = {
            duration: 250
        };
        rect.animate(animationKeyframes, animationOptions);
        text.animate(animationKeyframes, animationOptions);
    }
    tabulatorAnimation(object) {
        if (!object) return;
        let svg = object.contentDocument;
        let rect = svg.querySelector('#mainRect');
        let text = svg.querySelector('#text7');
        let animationKeyframes = {
            stroke: [
                '#eeeeeeff',
                this.badColor === 'rgb(186, 2, 70)' ? '#4400ff' : 'rgb(211, 0, 0)'
            ],
            offset: [
                0,
                1
            ]
        };
        let animationOptions = {
            duration: 250,
            fill: 'forwards'
        };
        rect.animate(animationKeyframes, animationOptions);
        text.animate(animationKeyframes, animationOptions);
    }
    successAnimation(object) {
        if (!object) return;
        let svg = object.contentDocument;
        let rect = svg.querySelector('#mainRect');
        let text = svg.querySelector('#text7');
        let animationKeyframes = {
            stroke: [
                '#eeeeeeff',
                '#08a000',
                '#eeeeeeff'
            ],
            offset: [
                0,
                1
            ]
        };
        let animationOptions = {
            duration: 500
        };
        rect.animate(animationKeyframes, animationOptions);
        text.animate(animationKeyframes, animationOptions);
    }
    deletionAnimation(element, duration, direction) {
        if (element.tagName === 'OBJECT') {
            let object = element;
            let svg = object.contentDocument;
            let rect = svg.querySelector('#mainRect');
            let text = svg.querySelector('#text7');
            let animationKeyframes = {
                stroke: [
                    object.classList.contains('tabulator') ? this.badColor === 'rgb(186, 2, 70)' ? '#4400ff' : 'rgb(211, 0, 0)' : '#eeeeeeff',
                    this.badColor
                ],
                offset: [
                    0,
                    1
                ]
            };
            let animationOptions = {
                duration: duration,
                fill: 'forwards',
                direction: direction
            };
            rect.animate(animationKeyframes, animationOptions);
            text.animate(animationKeyframes, animationOptions);
        } else if (element.tagName === 'BUTTON') {
            let animationKeyframes = {
                backgroundColor: [
                    this.badColor === 'rgb(186, 2, 70)' ? '#ff0000' : this.badColor,
                    this.badColor === 'rgb(186, 2, 70)' ? '#ba0303' : '#ad0668'
                ],
                boxShadow: [
                    `0 0 0 0 ${this.badColor === 'rgb(186, 2, 70)' ? '#ba0303' : '#ad0668'}`,
                    `0 0 1vh 1vh ${this.badColor === 'rgb(186, 2, 70)' ? '#ff0000' : this.badColor}`
                ],
                color: [
                    '#ffffff',
                    '#eeffff'
                ],
                border: [
                    'none',
                    'none'
                ],
                offset: [
                    0,
                    1
                ]
            };
            let animationOptions = {
                duration: duration,
                fill: 'forwards',
                direction: direction
            };
            element.animate(animationKeyframes, animationOptions);
        }
    }
    paddingAnimation(input) {
        if (input.classList.contains('known-case')) return;
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
        setTimeout((_)=>{
            input.style.borderColor = 'transparent';
            input.style.transition = "border-color 1.5s";
            this.timeout = setTimeout((_)=>{
                input.style.padding = `${this.padding[id]}px ${0.05 * input.offsetHeight}px`;
                input.style.border = 'none';
                input.style.transition = 'none';
            }, 1500);
        }, 1);
    }
    automaticPaddingAnimation(input, adjustment, cancelable) {
        console.log(this.padding);
        cancelable = cancelable === undefined || cancelable === true;
        clearInterval(this.firstInterval);
        clearInterval(this.secondInterval);
        clearTimeout(this.firstTimeout);
        if (cancelable && this.animatedInputIndex != undefined && adjustment === undefined) {
            let input = document.querySelector(`#div${this.animatedInputIndex}`);
            let paddingLeft = 0.05 * input.offsetHeight;
            let paddingTop = this.padding[this.animatedInputIndex];
            input.style.padding = `${paddingTop}px ${paddingLeft}px`;
            input.style.border = 'none';
        }
        if (input.classList.contains('known-case')) return;
        let id = parseInt(input.id.slice(3));
        let borderLeft = 0.05 * input.offsetHeight;
        let newPadding = this.padding[id];
        console.log(newPadding, this.padding);
        let borderWidth = adjustment ? this.animatedBorderWidth : 0;
        let $tepSize = (newPadding - borderWidth) / 20;
        let stepSize = newPadding / 20;
        let step = 0;
        let timeout1 = adjustment ? 1 : 12.5;
        let timeout2 = 12.5;
        let timeout;
        let interval1;
        let interval2;
        if (cancelable) this.firstInterval = setInterval(intervalFunction1.bind(this), timeout1);
        else interval1 = setInterval(intervalFunction1.bind(this), timeout1);
        window.addEventListener('resize', resizeHandler.bind(this), {
            passive: true
        });
        function intervalFunction1() {
            for(let i = 0; i < (adjustment ? 4 : 1); i++){
                this.animatedInputIndex = id;
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
                if (input == this.selectedInput) console.log(newPadding, input.offsetHeight / 2 * 0.05);
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
    adjustInputWidth(input, value, animation) {
        animation = animation === undefined || animation === true;
        if (input.classList.contains('known-case')) return;
        let v = value.replaceAll('^tab^', '');
        if (!input.hasChildNodes() && v.length == 0) {
            console.log('apparently empty');
            if (this.automaticPaddingAdjustment) {
                if (input.classList.contains('selected')) input.style.padding = 0.05 * input.offsetHeight + 'px';
                else input.style.padding = 0.05 * input.offsetHeight + 'px';
                input.style.border = 'none';
                this.padding[parseInt(input.id.slice(3))] = 0.05 * input.offsetHeight;
                if (animation) this.automaticPaddingAnimation(input, false, false);
                return;
            }
            if (animation) this.paddingAnimation(input);
            return;
        }
        let padding;
        let w = Math.round(input.getBoundingClientRect().width - parseFloat(window.getComputedStyle(input).paddingLeft) - parseFloat(window.getComputedStyle(input).paddingRight) - parseFloat(window.getComputedStyle(input).borderLeftWidth) - parseFloat(window.getComputedStyle(input).borderRightWidth)) * 100 / 100;
        let object = input.lastElementChild;
        let id = parseInt(input.id.slice(3));
        if (!object) return;
        let width = object.getBoundingClientRect().width;
        if (w / width < v.length || this.automaticPaddingAdjustment) {
            w = Math.round((input.getBoundingClientRect().width - parseFloat(window.getComputedStyle(input).paddingLeft) - parseFloat(window.getComputedStyle(input).paddingRight) - parseFloat(window.getComputedStyle(input).borderLeftWidth) - parseFloat(window.getComputedStyle(input).borderRightWidth)) * 100) / 100;
            let aspectRatio = object.getBoundingClientRect().height / object.getBoundingClientRect().width;
            let h = w / v.length * aspectRatio;
            padding = Math.max((input.getBoundingClientRect().height - h) / 2, input.offsetHeight * 0.05);
            this.padding[id] = padding;
            this.animatedBorderWidth = parseFloat(window.getComputedStyle(input).borderTopWidth);
        }
        if (!animation) {
            clearInterval(this.firstInterval);
            clearInterval(this.secondInterval);
            clearTimeout(this.firstTimeout);
            return;
        }
        if (this.automaticPaddingAdjustment) this.automaticPaddingAnimation(input, false, false);
        else this.paddingAnimation(input);
        return;
    }
}

},{"..":"1jwFz","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["gpxX8","1jwFz"], "1jwFz", "parcelRequire94c2")

//# sourceMappingURL=index.8e9bd240.js.map
