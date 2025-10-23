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
    window.removeEventListener('resize', addVocabulary.resizeFunction);
}

},{"./src/add-vocabulary":"gD3hq","./src/home-menu":"kONVW","./src/show-vocabulary":"hKazI","./src/vocabulary-training":"9B4CF","./src/inflect-vocabulary":"1keBs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gD3hq":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "AddVocabulary", ()=>AddVocabulary);
var _ = require("..");
var _vocabulary = require("./vocabulary");
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
        this.upgradeNeeded = false;
        const request = window.indexedDB.open('Vocabulary', 2);
        request.addEventListener('error', (_)=>{
            console.error('There is an error. Have fun fixing it. Details:' + request.error);
        });
        request.addEventListener('upgradeneeded', ()=>{
            const db = request.result;
            if (!db.objectStoreNames.contains('vocabulary')) {
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
            }
            if (!db.objectStoreNames.contains('inflected vocabulary')) {
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
            }
            this.database = request.result;
            this.upgradeNeeded = true;
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
                if (this.upgradeNeeded) {
                    this.vocabulary = (0, _vocabulary.VOCABULARY).concat(this.vocabulary);
                    const writeTransaction = this.database.transaction('vocabulary', 'readwrite');
                    writeTransaction.onerror = ()=>console.error(writeTransaction.error);
                    const objSt = writeTransaction.objectStore('vocabulary');
                    this.vocabulary.forEach((word, index)=>{
                        const req = objSt.put(word, index + 1);
                        req.onerror = ()=>console.error(req.error);
                    });
                }
            };
        });
        const notImportantRequest_____yet = window.indexedDB.open('player data', 2);
        notImportantRequest_____yet.addEventListener('upgradeneeded', (event)=>{
            const db = notImportantRequest_____yet.result;
            if (!db.objectStoreNames.contains('versions played')) db.createObjectStore('versions played', {
                autoIncrement: true
            });
            notImportantRequest_____yet.addEventListener('success', (event)=>{
                const db = notImportantRequest_____yet.result;
                const transaction = db.transaction('versions played', 'readwrite');
                const objectStore = transaction.objectStore('versions played');
                objectStore.add('Beta Reversion');
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
        const request = window.indexedDB.open('Vocabulary', 2);
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
                    if (this.vocabulary[this.wordIndex].latinWord.includes('^con^') && this.vocabulary[this.wordIndex - 1]) this.wordIndex--;
                    else if (this.vocabulary[this.wordIndex].latinWord.includes('^con^') && !this.vocabulary[this.wordIndex - 1]) this.wordIndex++;
                    this.currentWord = this.vocabulary[this.wordIndex];
                    for(let i = 0; i < this.container.childElementCount; i++){
                        let value = Object.values(this.currentWord)[i];
                        value = value.replaceAll("^ign^", "");
                        this.container.children[i].innerHTML = '';
                        for(let ii = 0; ii < value.length; ii++){
                            let object = document.createElement('object');
                            object.data = './keys/Reversion_T.svg';
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
                            this.adjustInputWidth(this.container.children[i], value, true);
                        }
                    });
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
                        if (this.vocabulary[this.wordIndex].latinWord.includes('^con^') && this.vocabulary[this.wordIndex - 1]) this.wordIndex--;
                        else if (this.vocabulary[this.wordIndex].latinWord.includes('^con^') && !this.vocabulary[this.wordIndex - 1]) this.wordIndex++;
                        this.currentWord = this.vocabulary[this.wordIndex];
                        for(let i = 0; i < this.container.childElementCount; i++){
                            let value = Object.values(this.currentWord)[i];
                            value = value.replaceAll("^ign^", "");
                            this.container.children[i].innerHTML = '';
                            for(let ii = 0; ii < value.length; ii++){
                                let object = document.createElement('object');
                                object.data = './keys/Reversion_T.svg';
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
            if (!this.vocabulary[this.wordIndex + 1] || this.vocabulary[this.wordIndex + 1].latinWord.includes('^con^') && !this.vocabulary[this.wordIndex + 2]) {
                this.vocabulary[this.wordIndex] = this.currentWord;
                const transaction = this.database.transaction(`vocabulary`, 'readwrite');
                transaction.onerror = ()=>console.error(transaction.error);
                const objectStore = transaction.objectStore(`vocabulary`);
                const req = objectStore.put(this.currentWord, this.wordIndex + 1);
                req.onerror = ()=>console.error(req.error);
                transaction.oncomplete = ()=>{
                    for(let i = 0; i < this.container.childElementCount; i++)this.container.children[i].classList.remove('shadow');
                    this.wordIndex++;
                    if (this.vocabulary[this.wordIndex] && this.vocabulary[this.wordIndex].latinWord.includes('^con^')) this.wordIndex++;
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
                        this.changeSelectedInput();
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
                    if (this.vocabulary[this.wordIndex].latinWord.includes('^con^')) this.wordIndex++;
                    this.currentWord = this.vocabulary[this.wordIndex];
                    for(let i = 0; i < this.container.childElementCount; i++){
                        let value = Object.values(this.currentWord)[i];
                        value = value.replaceAll("^ign^", "");
                        this.container.children[i].innerHTML = '';
                        for(let ii = 0; ii < value.length; ii++){
                            let object = document.createElement('object');
                            object.data = './keys/Reversion_T.svg';
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
                            if (!this.vocabulary[this.wordIndex + 1] || this.vocabulary[this.wordIndex + 1].latinWord.includes('^con^') && !this.vocabulary[this.wordIndex + 2]) {
                                this.vocabulary[this.wordIndex] = this.currentWord;
                                const transaction = this.database.transaction(`vocabulary`, 'readwrite');
                                transaction.onerror = ()=>console.error(transaction.error);
                                const objectStore = transaction.objectStore(`vocabulary`);
                                const req = objectStore.put(this.currentWord, this.wordIndex + 1);
                                req.onerror = ()=>console.error(req.error);
                                transaction.oncomplete = ()=>{
                                    for(let i = 0; i < this.container.childElementCount; i++)this.container.children[i].classList.remove('shadow');
                                    this.wordIndex++;
                                    if (this.vocabulary[this.wordIndex] && this.vocabulary[this.wordIndex].latinWord.includes('^con^')) this.wordIndex++;
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
                                        this.changeSelectedInput();
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
                                    if (this.vocabulary[this.wordIndex].latinWord.includes('^con^')) this.wordIndex++;
                                    this.currentWord = this.vocabulary[this.wordIndex];
                                    for(let i = 0; i < this.container.childElementCount; i++){
                                        let value = Object.values(this.currentWord)[i];
                                        value = value.replaceAll("^ign^", "");
                                        this.container.children[i].innerHTML = '';
                                        for(let ii = 0; ii < value.length; ii++){
                                            let object = document.createElement('object');
                                            object.data = './keys/Reversion_T.svg';
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
            object.data = './keys/Reversion_T.svg';
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
        let borderLeft = 0.005 * window.innerWidth - marginLeft;
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
        let borderLeft = 0.005 * window.innerWidth - marginLeft;
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
        let v = value.replaceAll("^ign^", "");
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
        let w = Math.round((window.innerWidth - parseFloat(window.getComputedStyle(input).paddingLeft) - parseFloat(window.getComputedStyle(input).paddingRight) - parseFloat(window.getComputedStyle(input).borderLeftWidth) - parseFloat(window.getComputedStyle(input).borderRightWidth) - parseFloat(window.getComputedStyle(input).marginLeft) - parseFloat(window.getComputedStyle(input).marginRight)) * 100) / 100;
        let object = input.firstElementChild;
        let id = parseInt(input.id.charAt(3));
        if (!object) {
            this.padding[id] = 0.05 * input.offsetHeight;
            return;
        }
        let width = object.getBoundingClientRect().width;
        if (w / width < v.length || this.automaticPaddingAdjustment) {
            w = Math.round((window.innerWidth - parseFloat(window.getComputedStyle(input).paddingLeft) - parseFloat(window.getComputedStyle(input).paddingRight) - parseFloat(window.getComputedStyle(input).borderLeftWidth) - parseFloat(window.getComputedStyle(input).borderRightWidth) - parseFloat(window.getComputedStyle(input).marginLeft) - parseFloat(window.getComputedStyle(input).marginRight)) * 100) / 100;
            object = input.lastElementChild;
            let aspectRatio = object.getBoundingClientRect().height / object.getBoundingClientRect().width;
            let h = w / v.length * aspectRatio;
            padding = Math.max((input.getBoundingClientRect().height - h) / 2, input.offsetHeight * 0.05);
            this.padding[id] = padding;
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
            let paddingLeft = 0.005 * window.innerWidth - marginLeft;
            let paddingTop = this.padding[this.animatedInputIndex];
            input.style.padding = `${paddingTop}px ${paddingLeft}px`;
            input.style.border = 'none';
        }
    }
}

},{"..":"1jwFz","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./vocabulary":"aYMbl"}],"gkKU3":[function(require,module,exports,__globalThis) {
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

},{}],"aYMbl":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "VOCABULARY", ()=>VOCABULARY);
const VOCABULARY = [
    // --- Unit 1 ---
    {
        latinWord: '^con^Lektion 1: De schola',
        inflections: '',
        germanTranslation: '',
        relatedForeignWords: '',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'schola f.',
        inflections: '2.F. scholae',
        germanTranslation: 'Schule',
        relatedForeignWords: 'engl. school, ital. scuola, span. escuela',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'hic (Adv.)',
        inflections: '',
        germanTranslation: 'hier',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'sedit',
        inflections: 'sedi, sessum*',
        germanTranslation: 'er/sie/es sitzt',
        relatedForeignWords: 'vgl. Sediment (= Ablagerung), Re-sidenz (= Wohnsitz)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'amica f.',
        inflections: '2.F. amicae',
        germanTranslation: 'Freundin',
        relatedForeignWords: 'frz. amie, ital. amica, span. amiga',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'meus/a/um',
        inflections: '',
        germanTranslation: 'mein',
        relatedForeignWords: "besitzanzeigendes F\xfcrwort (Possessivpronomen) frz. est, ital. \xe8, span. es",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'disciplina f.',
        inflections: '2.F. disciplinae',
        germanTranslation: "Sch\xfclerin",
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'bonus/a/um',
        inflections: '',
        germanTranslation: 'gut',
        relatedForeignWords: "frz. bon, ital. buono, span. bueno; vgl. Bona-\xd6l; der Bonus",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'semper (Adv.)',
        inflections: '',
        germanTranslation: 'immer',
        relatedForeignWords: 'ital. sempre, span. siempre; vgl. Semperit = "Es/Er geht immer"',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'sunt',
        inflections: 'fui, -',
        germanTranslation: 'sie sind',
        relatedForeignWords: 'frz. sont, ital. sono, span. son',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'et',
        inflections: '',
        germanTranslation: 'und',
        relatedForeignWords: 'frz. et, ital. e',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'amicus m.',
        inflections: '2.F. amici',
        germanTranslation: 'Freund',
        relatedForeignWords: 'frz. ami, ital. amico, span. amigo',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'sed',
        inflections: '',
        germanTranslation: '1) aber; 2) sondern',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'discipulus m.',
        inflections: '2.F. discipuli',
        germanTranslation: "Sch\xfcler",
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'malus/a/um',
        inflections: '',
        germanTranslation: 'schlecht',
        relatedForeignWords: 'span. malo;(a); vgl. Bonus-Malus-System',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'laetus/a/um',
        inflections: '',
        germanTranslation: "froh, fr\xf6hlich",
        relatedForeignWords: 'ital. lieto; vgl. die Vornamen Laetitia und Letizia',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'saepe (Adv.)',
        inflections: '',
        germanTranslation: 'oft',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'ridet',
        inflections: 'risi, risum',
        germanTranslation: 'er/sie/es lacht',
        relatedForeignWords: 'frz. rire, ital. ridere, span. reir; engl. ridiculous',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'cur?',
        inflections: '',
        germanTranslation: 'warum?',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'nunc (Adv.)',
        inflections: '',
        germanTranslation: 'jetzt, nun',
        relatedForeignWords: 'vgl. engl. now',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'non',
        inflections: '',
        germanTranslation: 'nicht',
        relatedForeignWords: 'frz. + ital. non, span. no',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'pensum n.',
        inflections: '2.F. pensi',
        germanTranslation: 'Aufgabe',
        relatedForeignWords: 'vgl. das Arbeitspensum',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'magnus/a/um',
        inflections: '',
        germanTranslation: "gro\xdf",
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'itaque',
        inflections: '',
        germanTranslation: 'deshalb, daher',
        relatedForeignWords: 'vgl. Magnum (Eis; Schusswaffe)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'gaudet',
        inflections: 'gavisus sum',
        germanTranslation: 'er/sie/es freut sich',
        relatedForeignWords: "vgl. die Gaudi (= Spa\xdf)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'diu (Adv.)',
        inflections: '',
        germanTranslation: 'lange',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'laborat',
        inflections: 'laboravi, laboratum',
        germanTranslation: 'er/sie/es arbeitet',
        relatedForeignWords: 'vgl. engl. lab(o)ur; das Labor',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'libenter (Adv.)',
        inflections: '',
        germanTranslation: 'gern',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'interrogat',
        inflections: 'interrogavi, -atum',
        germanTranslation: 'er/sie/es fragt',
        relatedForeignWords: 'vgl. engl. interrogation mark (= Fragezeichen)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'respondet',
        inflections: 'respondi, responsum',
        germanTranslation: 'er/sie/es antwortet',
        relatedForeignWords: 'ital. rispondere; vgl. Kor-respondent (= Briefeschreiber)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'tum (= tunc)',
        inflections: '',
        germanTranslation: 'dann, damals',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'clamat',
        inflections: 'clamavi, clamatum',
        germanTranslation: 'er/sie/es ruft, schreit',
        relatedForeignWords: 'ital. chiamare, span. llamar; vgl. re-Klamieren, Re-Klamation',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'laudat',
        inflections: 'laudavi, laudatum',
        germanTranslation: 'er/sie/es lobt',
        relatedForeignWords: 'vgl. Laudatio (= Lobrede)',
        selected: true,
        probability: 1
    },
    // --- Unit 2 ---
    {
        latinWord: '^con^Lektion 2: Quid grammaticus docet?',
        inflections: '',
        germanTranslation: '',
        relatedForeignWords: '',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'quid?',
        inflections: '',
        germanTranslation: 'was?',
        relatedForeignWords: 'vgl. doziere, Dozent (= Hochschullehrer)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'docet',
        inflections: 'docui, doctum',
        germanTranslation: 'er/sie/es lehrt, unterrichtet',
        relatedForeignWords: 'vgl. doziere, Dozent (= Hochschullehrer)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'ubi?',
        inflections: '',
        germanTranslation: 'wo?',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'iam',
        inflections: '',
        germanTranslation: 'schon',
        relatedForeignWords: 'span. ya',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'exspectat',
        inflections: 'exspectavi, -atum',
        germanTranslation: 'er/sie/es erwartet',
        relatedForeignWords: 'engl. to expect',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'intrat',
        inflections: 'intravi, intratum',
        germanTranslation: 'er/sie/es tritt ein, betritt',
        relatedForeignWords: 'engl. to enter, frz. entrer, ital. entrare, span. entrar, ital. salve',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'salve!/salvete!',
        inflections: '',
        germanTranslation: "sei/seid gegr\xfc\xdft!",
        relatedForeignWords: 'ital. salve',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'magister m.',
        inflections: '2.F. magistri',
        germanTranslation: 'Lehrer',
        relatedForeignWords: "frz. ma\xeetre; vgl. Maestro (= Dirigent)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'amat',
        inflections: 'amavi, amatum',
        germanTranslation: 'er/sie/es liebt',
        relatedForeignWords: 'vgl. Amateur (= "Liebhaber", <-> Profi)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'non solum - sed etiam',
        inflections: '',
        germanTranslation: 'nicht nur - sondern auch',
        relatedForeignWords: '<-> iam =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'etiam',
        inflections: '',
        germanTranslation: 'auch, sogar',
        relatedForeignWords: '<-> iam =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'lingua f.',
        inflections: '2.F. linguae',
        germanTranslation: '1) Zunge; 2) Sprache',
        relatedForeignWords: 'engl. language, frz. langue, ital. lingua',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'Latinus/a/um',
        inflections: '(Adjektiv!)',
        germanTranslation: 'lateinisch',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'Graecus/a/um',
        inflections: '(Adjektiv!)',
        germanTranslation: 'griechisch',
        relatedForeignWords: 'engl. Greek, Greece, span. griego',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'liber m.',
        inflections: '2.F. libri',
        germanTranslation: 'Buch',
        relatedForeignWords: 'ital. + span. libro; vgl. engl. library (= Bibliothek)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'quam',
        inflections: '',
        germanTranslation: 'wie',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'pulcher/chra/chrum',
        inflections: '',
        germanTranslation: "sch\xf6n, h\xfcbsch",
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'verbum n.',
        inflections: '2.F. verbi',
        germanTranslation: 'Wort',
        relatedForeignWords: 'vgl. verbal (= durch Worte)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'secum',
        inflections: '',
        germanTranslation: 'mit sich, bei sich',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'cogitat',
        inflections: 'cogitavi, cogitatum',
        germanTranslation: 'er/sie/es denkt',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'puer m.',
        inflections: '2.F. pueri',
        germanTranslation: 'Bub',
        relatedForeignWords: 'pueril (= kindlich)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'puella f.',
        inflections: '2.F. puellae',
        germanTranslation: "M\xe4dchen",
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'quod',
        inflections: '',
        germanTranslation: 'weil',
        relatedForeignWords: '<-> quid =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'quis?',
        inflections: '',
        germanTranslation: 'wer?',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'habet',
        inflections: 'habui, habitum',
        germanTranslation: 'er/sie/es hat',
        relatedForeignWords: 'engl. to have, frz. avoir, ital. avere, span. haber',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'spectat',
        inflections: 'spectavi, -atum',
        germanTranslation: 'er/sie/es schaut an, er/sie/es betrachtet',
        relatedForeignWords: "vgl. Spektakel, spektakul\xe4r; engl. spectator (= Zuschauer)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'oculus m.',
        inflections: '2.F. oculi',
        germanTranslation: 'Auge',
        relatedForeignWords: "vgl. Mon-okel (= Ein\xadglas), Okular",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'tuus/a/um',
        inflections: '',
        germanTranslation: 'dein',
        relatedForeignWords: 'ital. tuo, span. tu',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'monet',
        inflections: 'monui, monitum',
        germanTranslation: 'er/sie/es (er)mahnt',
        relatedForeignWords: "vgl. Monitor (= elektronisches Anzeigeger\xe4t)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'iratus/a/um',
        inflections: '',
        germanTranslation: "zornig, erz\xfcrnt",
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    // --- Unit 3 ---
    {
        latinWord: '^con^Lektion 3: Quam pulchra Roma est!',
        inflections: '',
        germanTranslation: '',
        relatedForeignWords: '',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'Roma f.',
        inflections: '2.F. Romae',
        germanTranslation: 'Rom',
        relatedForeignWords: "vgl. perforieren (= durchl\xf6chern), per\u2026 (Mail, Post etc.)",
        selected: true,
        probability: 1
    },
    {
        latinWord: "per (Pr\xe4p. + Akk.)",
        inflections: '',
        germanTranslation: 'durch',
        relatedForeignWords: "vgl. perforieren (= durchl\xf6chern), per\u2026 (Mail, Post etc.)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'via f.',
        inflections: '2.F. viae',
        germanTranslation: "Weg, Stra\xdfe",
        relatedForeignWords: "ital. via, span. v\xeda; vgl. Viadukt (= Br\xfccke \xfcber ein Tal)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'ambulo, -as',
        inflections: 'ambulavi, ambulatum',
        germanTranslation: 'gehen, spazieren',
        relatedForeignWords: 'vgl. Ambulatorium, Ambulanz (siehe unten)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'multi/ae/a (Plural)',
        inflections: '',
        germanTranslation: 'viele',
        relatedForeignWords: 'vgl. Multivitaminsoft, Multitasking, Multitalent',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'multum (n. Sg.)',
        inflections: '',
        germanTranslation: 'viel',
        relatedForeignWords: 'ital. molto',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'aedificium n.',
        inflections: '2.F. aedificii',
        germanTranslation: "Geb\xe4ude",
        relatedForeignWords: 'ital. + span. edificio',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'video, -es',
        inflections: 'vidi, visum',
        germanTranslation: 'sehen',
        relatedForeignWords: 'ital. vedere; vgl. das Video, Videorekorder',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'et',
        inflections: '',
        germanTranslation: 'und',
        relatedForeignWords: 'z. B. Quintus Gaiusque = Quintus et Gaius',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'clarus/a/um',
        inflections: '',
        germanTranslation: "1) ber\xfchmt; 2) hell",
        relatedForeignWords: 'vgl. klar; Clara (= "die Ber\xfchmte")',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'monstro, -as',
        inflections: 'monstravi, monstratum',
        germanTranslation: 'zeigen',
        relatedForeignWords: "vgl. Monstranz (= Beh\xe4lter, in dem die Hostie gezeigt wird)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'spectaculum n.',
        inflections: '2.F. spectaculi',
        germanTranslation: 'Schauspiel',
        relatedForeignWords: 'vgl. Spektakel; <-> spectat =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'ibi',
        inflections: '',
        germanTranslation: 'dort',
        relatedForeignWords: '<-> ubi =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'statua f.',
        inflections: '2.F. statuae',
        germanTranslation: 'Statue',
        relatedForeignWords: 'ital. statua, span. estatua',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'vir m.',
        inflections: '2.F. viri',
        germanTranslation: 'Mann',
        relatedForeignWords: "vgl. Triumvirat (= Dreim\xe4nnerbund); viril (= m\xe4nnlich)",
        selected: true,
        probability: 1
    },
    {
        latinWord: '-ne',
        inflections: '',
        germanTranslation: "(Fragepartikel, un\xfcbersetzt)",
        relatedForeignWords: 'z. B. Amasne Iuliam? = "Liebst du Julia?"',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'certe (Adv.)',
        inflections: '',
        germanTranslation: 'sicherlich',
        relatedForeignWords: 'ital. certo, span. cierto, engl. certainly',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'forum n.',
        inflections: '2.F. fori',
        germanTranslation: 'Forum; Marktplatz',
        relatedForeignWords: 'vgl. Forensik = Gerichtsmedizin (das Gericht tagte am Forum!)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'Romanus/a/um',
        inflections: '',
        germanTranslation: "r\xf6misch",
        relatedForeignWords: 'engl. Roman; vgl. Romanisierung',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'templum n.',
        inflections: '2.F. templi',
        germanTranslation: 'Tempel',
        relatedForeignWords: 'frz. temple, ital. tempio, span. templo',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'tam',
        inflections: '',
        germanTranslation: 'so',
        relatedForeignWords: '<-> tum =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'deus m.',
        inflections: '2.F. dei',
        germanTranslation: 'Gott',
        relatedForeignWords: 'frz. dieu, ital. dio, span. dios',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'dea f.',
        inflections: '2.F. deae',
        germanTranslation: "G\xf6ttin",
        relatedForeignWords: "frz. d\xe9esse, ital. dea, span. diosa",
        selected: true,
        probability: 1
    },
    {
        latinWord: "ante (Pr\xe4p. + Akk.)",
        inflections: '',
        germanTranslation: 'vor',
        relatedForeignWords: 'vgl. Antipasto (= Vorspeise), antizipieren (= vorwegnehmen)',
        selected: true,
        probability: 1
    },
    {
        latinWord: "post (Pr\xe4p. + Akk.)",
        inflections: '',
        germanTranslation: 'nach; hinter',
        relatedForeignWords: 'vgl. post mortem (= "nach dem Tod")',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'solum (Adv.)',
        inflections: '',
        germanTranslation: 'nur',
        relatedForeignWords: "ital. solo, span. s\xf3lo; vgl. non solum - sed etiam",
        selected: true,
        probability: 1
    },
    {
        latinWord: "ad (Pr\xe4p. + Akk.)",
        inflections: '',
        germanTranslation: 'zu, an, bei',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    // --- Unit 4 ---
    {
        latinWord: '^con^Lektion 4: De spectaculis',
        inflections: '',
        germanTranslation: '',
        relatedForeignWords: '',
        probability: 0,
        selected: false
    },
    {
        latinWord: "de (Pr\xe4p. + Abl.)",
        inflections: '',
        germanTranslation: "1) von (... herab); 2) \xfcber",
        relatedForeignWords: 'frz. de, ital. di, span. de',
        selected: true,
        probability: 1
    },
    {
        latinWord: "cum (Pr\xe4p. + Abl.)",
        inflections: '',
        germanTranslation: 'mit',
        relatedForeignWords: 'ital. + span. con',
        selected: true,
        probability: 1
    },
    {
        latinWord: "sine (Pr\xe4p. + Abl.)",
        inflections: '',
        germanTranslation: 'ohne',
        relatedForeignWords: 'frz. sons, ital. senza, span. sin',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'femina',
        inflections: 'feminae* f.',
        germanTranslation: 'Frau',
        relatedForeignWords: 'vgl. Feministin, feminin',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'gaudium',
        inflections: 'gaudii n.',
        germanTranslation: 'Freude',
        relatedForeignWords: 'vgl. "Mordsgaudi" (= ein riesiger Spa\xdf)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'narro, -as',
        inflections: 'narravi, narratum',
        germanTranslation: "erz\xe4hlen",
        relatedForeignWords: 'span. narrar; vgl. engl. narrator',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'Romani (Pl.)',
        inflections: 'Romanorum m.',
        germanTranslation: "die R\xf6mer",
        relatedForeignWords: 'engl. the Romans ("die R\xf6mer")',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'copia',
        inflections: 'copiae f.',
        germanTranslation: 'Menge, Vorrat',
        relatedForeignWords: 'ital. + span. copia; vgl. Kopie',
        selected: true,
        probability: 1
    },
    {
        latinWord: "e / ex (Pr\xe4p. + Abl.)",
        inflections: '',
        germanTranslation: 'aus, von',
        relatedForeignWords: '(siehe Grammatica)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'terra',
        inflections: 'terrae f.',
        germanTranslation: 'Land; Erde',
        relatedForeignWords: "vgl. Terrarium, Terrasse, Parterre (= Erdgescho\xdf)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'alienus/a/um',
        inflections: '',
        germanTranslation: 'fremd',
        relatedForeignWords: "vgl. Aliens (= die Au\xdferirdischen/Fremden)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'pugno, -as',
        inflections: 'pugnavi, -atum',
        germanTranslation: "k\xe4mpfen",
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'neco, -as',
        inflections: 'necavi, -atum',
        germanTranslation: "t\xf6ten",
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'placeo, -es',
        inflections: 'placui, -itum',
        germanTranslation: 'gefallen',
        relatedForeignWords: 'frz. plaire, ital. piacere',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'novus/a/um',
        inflections: '',
        germanTranslation: 'neu',
        relatedForeignWords: 'vgl. re-novieren (= erneuern), In-novation',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'alius/a/ud',
        inflections: '',
        germanTranslation: 'ein anderer',
        relatedForeignWords: '<-> alienus/a/um =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'alius - alius',
        inflections: '',
        germanTranslation: 'der eine - der andere',
        relatedForeignWords: 'z. B. alius interrogat, alius respondet =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'gladius',
        inflections: 'gladii m.',
        germanTranslation: 'Schwert',
        relatedForeignWords: 'vgl. Gladiator (= "Schwertk\xe4mpfer"), Gladiole',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'postremo (Adv.)',
        inflections: '',
        germanTranslation: "schlie\xdflich, endlich",
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'supero, -as',
        inflections: 'superavi, superatum',
        germanTranslation: "1) besiegen; 2) \xfcbertreffen",
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'si',
        inflections: '',
        germanTranslation: 'wenn, falls',
        relatedForeignWords: 'span. si, ital. se',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'bene (Adv.)',
        inflections: '',
        germanTranslation: 'gut',
        relatedForeignWords: 'frz. bien, ital. bene, span. bien; vgl. Benefizkonzert',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'vita',
        inflections: 'vitae f.',
        germanTranslation: 'Leben',
        relatedForeignWords: 'ital. vita, span. vida; vgl. Vitamine; vital (= lebendig)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'dono, -as',
        inflections: 'donavi, donatum',
        germanTranslation: 'schenken',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: "pro (Pr\xe4p. + Abl.)",
        inflections: '',
        germanTranslation: "f\xfcr",
        relatedForeignWords: "Pro und Kontra (= F\xfcr und Wider)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'suus/a/um',
        inflections: '',
        germanTranslation: 'sein, ihr',
        relatedForeignWords: 'Possessivpronomen; ital. suo, span. su',
        selected: true,
        probability: 1
    },
    {
        latinWord: "a / ab (Pr\xe4p. + Abl.)",
        inflections: '',
        germanTranslation: 'von',
        relatedForeignWords: '(siehe Grammatica)',
        selected: true,
        probability: 1
    },
    {
        latinWord: "prae (Pr\xe4p. + Abl.)",
        inflections: '',
        germanTranslation: 'vor',
        relatedForeignWords: "vgl. Pr\xe4position (= Vorwort)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'neque (= nec)',
        inflections: '',
        germanTranslation: 'und nicht',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    // --- Unit 5 ---
    {
        latinWord: '^con^Lektion 5: De thermis',
        inflections: '',
        germanTranslation: '',
        relatedForeignWords: '',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'mihi / tibi / sibi (Dativ)',
        inflections: '',
        germanTranslation: 'mir / dir / sich',
        relatedForeignWords: '(siehe Grammatica)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'me / te / se (Akkusativ)',
        inflections: '',
        germanTranslation: 'mich / dich / sich',
        relatedForeignWords: '(siehe Grammatica)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'delectare',
        inflections: 'delecto 1, -avi, -atum',
        germanTranslation: '(jemanden) erfreuen',
        relatedForeignWords: 'sich an etwas delektieren (= erfreuen)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'nonne?',
        inflections: '',
        germanTranslation: 'nicht?',
        relatedForeignWords: 'aus: non-ne? (Frage)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'ego / tu',
        inflections: '',
        germanTranslation: 'ich / du',
        relatedForeignWords: '(siehe Grammatica); vgl. Egoist',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'Graeci (Pl.)',
        inflections: 'Graecorum m.',
        germanTranslation: 'die Griechen',
        relatedForeignWords: '<-> Graecus/a/um =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'ita',
        inflections: '',
        germanTranslation: 'so',
        relatedForeignWords: 'ita est = "ja" (w\xf6rtlich?)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'inquit',
        inflections: '',
        germanTranslation: 'er/sie sagte',
        relatedForeignWords: '(in die direkte Rede eingeschoben)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'num?',
        inflections: '',
        germanTranslation: 'etwa?',
        relatedForeignWords: 'z. B. Num rides? = "Lachst du etwa?"',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'vester/tra/trum',
        inflections: '',
        germanTranslation: 'euer, eure',
        relatedForeignWords: "franz. v\xf4tre, ital. vostra/a",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'quoque (nachgestellt)',
        inflections: '',
        germanTranslation: 'auch',
        relatedForeignWords: 'z. B. etiam tu = tu quoque',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'nobis / vobis (Dativ)',
        inflections: '',
        germanTranslation: 'uns / euch',
        relatedForeignWords: '(siehe Grammatica)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'noster/tra/trum',
        inflections: '',
        germanTranslation: 'unser, unsere',
        relatedForeignWords: "franz. n\xf4tre; vgl. Pater noster =",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'in (+ Abl.)',
        inflections: '',
        germanTranslation: 'in, auf',
        relatedForeignWords: 'in aedificio (WO?) = "im Geb\xe4ude"',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'animus',
        inflections: 'animi m.',
        germanTranslation: '1) Sinn, Geist; 2) Mut',
        relatedForeignWords: 'vgl. animieren (= "anregen")',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'in animo habere',
        inflections: '',
        germanTranslation: 'vorhaben',
        relatedForeignWords: 'w\xf6rtl.: "im Sinn haben"',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'nos / vos (Nom. + Akk.)',
        inflections: '',
        germanTranslation: 'wir; uns / ihr; euch',
        relatedForeignWords: '(siehe Grammatica)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'quis nostrum',
        inflections: '',
        germanTranslation: 'wer von uns',
        relatedForeignWords: '(siehe Grammatica)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'quis vestrum',
        inflections: '',
        germanTranslation: 'wer von euch',
        relatedForeignWords: '(siehe Grammatica)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'nobiscum / vobiscum',
        inflections: '',
        germanTranslation: 'mit uns / mit euch',
        relatedForeignWords: '(siehe Grammatica)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'in (+ Akk.)',
        inflections: '',
        germanTranslation: 'in, nach; gegen',
        relatedForeignWords: 'in aedificium (WOHIN?) = ""ins Geb\xe4ude"',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'manere',
        inflections: 'maneo 2, mansi, mansum',
        germanTranslation: 'bleiben',
        relatedForeignWords: 'vgl. permanent (= dauerhaft)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'properare',
        inflections: 'propero 1, -avi, -atum',
        germanTranslation: 'eilen',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'aqua',
        inflections: 'aquae f.',
        germanTranslation: 'Wasser',
        relatedForeignWords: 'ital. acqua, span. agua; vgl. Aquarium',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'iterum (Adv.)',
        inflections: '',
        germanTranslation: 'wieder(um)',
        relatedForeignWords: 'Eselsbr\xfccke: "iterum = wiederum"',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'minime (Adv.)',
        inflections: '',
        germanTranslation: 'keineswegs; nein',
        relatedForeignWords: 'vgl. minimal = sehr klein, sehr gering',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'licet (nur 3.P. Sg.)',
        inflections: '',
        germanTranslation: "es ist erlaubt, es ist m\xf6glich",
        relatedForeignWords: 'vgl. die Lizenz = Erlaubnis, Berechtigung',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'otium',
        inflections: 'otii n.',
        germanTranslation: "Freizeit, Erholung, Mu\xdfe",
        relatedForeignWords: 'ital. ozio, span. ocio',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'sub (+ Akk.)',
        inflections: '',
        germanTranslation: 'unter (...hin)',
        relatedForeignWords: 'vgl. Subvention = finanzielle Hilfe',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'terrere',
        inflections: 'terreo 2, terrui, territum',
        germanTranslation: '(jemanden) erschrecken',
        relatedForeignWords: 'vgl. engl. subdue, submarine; vgl. jemanden terrorisieren, Terrorist',
        selected: true,
        probability: 1
    },
    // --- Unit 6 ---
    {
        latinWord: '^con^Lektion 6: De Romulo et Remo',
        inflections: '',
        germanTranslation: '',
        relatedForeignWords: '',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'filia',
        inflections: 'filiae f.',
        germanTranslation: 'Tochter',
        relatedForeignWords: 'vgl. Filiale (-> Tochterunternehmen)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'tamen',
        inflections: '',
        germanTranslation: 'dennoch, trotzdem',
        relatedForeignWords: '<-> tam =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'duo/duae/duo',
        inflections: '',
        germanTranslation: 'zwei',
        relatedForeignWords: 'ital. due, span. dos; vgl. Duett, Duo',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'filius',
        inflections: 'filii m.',
        germanTranslation: 'Sohn',
        relatedForeignWords: 'frz. fils, ital. figlio',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'parvus/a/um',
        inflections: '',
        germanTranslation: 'klein',
        relatedForeignWords: '<-> magnus =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'paulo post',
        inflections: '',
        germanTranslation: "wenig sp\xe4ter",
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'post (nach Abl.)',
        inflections: '',
        germanTranslation: "sp\xe4ter",
        relatedForeignWords: '<-> post + Akk. =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'appropinquare',
        inflections: 'appropinquo 1, -avi, -atum',
        germanTranslation: "sich n\xe4hern",
        relatedForeignWords: 'engl. to approach',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'liberi (Pl.)',
        inflections: 'liberorum m.',
        germanTranslation: 'die Kinder',
        relatedForeignWords: '<-> libri, librorum =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'autem',
        inflections: '',
        germanTranslation: 'aber',
        relatedForeignWords: 'immer nachgestellt: ego autem = sed ego ("aber ich")',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'deinde',
        inflections: '',
        germanTranslation: 'dann',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'portare',
        inflections: 'porto 1, portavi, -atum',
        germanTranslation: 'tragen, bringen',
        relatedForeignWords: 'franz. porter, ital. portare; vgl. trans-portieren, ap-portieren (=heranbringen")',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'annus',
        inflections: 'anni m.',
        germanTranslation: 'Jahr',
        relatedForeignWords: "frz. an, ital. anno, span. a\xf1o; vgl. Annalen (= Jahrb\xfccher)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'oppidum',
        inflections: 'oppidi n.',
        germanTranslation: 'Stadt',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'aedificare',
        inflections: 'aedifico 1, -avi, -atum',
        germanTranslation: 'erbauen',
        relatedForeignWords: "frz. \xe9difier, ital. edificare; vgl. aedificium =",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'regnare',
        inflections: 'regno 1, regnavi, -atum',
        germanTranslation: 'herrschen, regieren',
        relatedForeignWords: "frz. r\xe9gner, ital. regnare, span. reinar, engl. to reign",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'posse',
        inflections: 'possum, potui, -',
        germanTranslation: "k\xf6nnen",
        relatedForeignWords: '(siehe Grammatica); vgl. engl. possible',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'sex',
        inflections: '',
        germanTranslation: 'sechs',
        relatedForeignWords: 'vgl. Sextett',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'duodecim',
        inflections: '',
        germanTranslation: "zw\xf6lf",
        relatedForeignWords: "ital. dodici; vgl. das Dutzend (= zw\xf6lf St\xfcck)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'dis = deis',
        inflections: '(3./6.F. Pl. m.)',
        germanTranslation: "den G\xf6ttern",
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'di = dei (= dii)',
        inflections: '(1.F. Pl. m.)',
        germanTranslation: "die G\xf6tter",
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'gratus/a/um',
        inflections: '',
        germanTranslation: '1) dankbar 2) lieb, angenehm',
        relatedForeignWords: 'ital. grato',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'esse',
        inflections: 'sum, fui, -',
        germanTranslation: '(zu) sein',
        relatedForeignWords: '(siehe Grammatica)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'auxilium',
        inflections: 'auxilii n.',
        germanTranslation: 'Hilfe',
        relatedForeignWords: "span. auxilio; vgl. engl. auxiliary verbs (= Hilfszeitw\xf6rter)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'nonnulli/ae/a (Pl.)',
        inflections: '',
        germanTranslation: 'einige',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'magnificus/a/um',
        inflections: '',
        germanTranslation: "gro\xdfartig, pr\xe4chtig",
        relatedForeignWords: "frz. magnifique, ital. magnifico, span. magn\xedfico",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'trans (+ Akk.)',
        inflections: '',
        germanTranslation: "\xfcber; jenseits von",
        relatedForeignWords: 'vgl. Transit, Transfer, Transformator, "Transdanubien"',
        selected: true,
        probability: 1
    },
    // --- Unit 7 ---
    {
        latinWord: '^con^Lektion 7: De Romanis et Sabinis',
        inflections: '',
        germanTranslation: '',
        relatedForeignWords: '',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'venire',
        inflections: 'venio 4, veni, ventum',
        germanTranslation: 'kommen',
        relatedForeignWords: 'frz. venir, ital. venire, span. venir',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'habitare',
        inflections: 'habito 1, -avi, -atum',
        germanTranslation: 'wohnen; bewohnen',
        relatedForeignWords: 'frz. habiter, ital. abitare, span. habitar',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'ut',
        inflections: '',
        germanTranslation: '1) wie; 2) als',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'apud (+ Akk.)',
        inflections: '',
        germanTranslation: 'bei',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'legere',
        inflections: 'lego 3, legi, lectum',
        germanTranslation: 'lesen',
        relatedForeignWords: "ital. leggere; vgl. Lekt\xfcre, Legende",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'consilium',
        inflections: 'consilii n.',
        germanTranslation: 'Plan, Beschluss; Rat',
        relatedForeignWords: 'frz. conseil, ital. consiglio, span. consejo',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'capere',
        inflections: 'capio M, cepi, captum',
        germanTranslation: '1) fassen, ergreifen; 2) fangen; 3) nehmen',
        relatedForeignWords: 'vgl. S. 53f; ital. capire; vgl. kapern, kapieren (= verstehen)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'nuntius',
        inflections: 'nuntii m.',
        germanTranslation: 'Bote; Nachricht',
        relatedForeignWords: "vgl. Nuntius (= p\xe4pstlicher Botschafter)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'populus',
        inflections: 'populi m.',
        germanTranslation: 'Volk',
        relatedForeignWords: "vgl. popul\xe4r (= beim Volk beliebt), Populismus",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'mittere',
        inflections: 'mitto 3, misi, missum',
        germanTranslation: 'schicken',
        relatedForeignWords: 'vgl. Missionar (= einer, der ausgeschickt wurde)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'dicere',
        inflections: 'dico 3, dixi, dictum',
        germanTranslation: '1) sagen; 2) nennen',
        relatedForeignWords: 'vgl. Diktat; Diktion (= Ausdrucksweise)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'parare',
        inflections: 'paro 1, paravi, -atum',
        germanTranslation: '1) vorbereiten, bereiten; 2) erwerben',
        relatedForeignWords: 'vgl. etwas parat haben (= etwas vorbereitet haben)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'audire',
        inflections: 'audio 4, audivi, -itum',
        germanTranslation: "h\xf6ren",
        relatedForeignWords: "vgl. Audio-Datei, Audienz; Auditorium (= H\xf6rsaal)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'nam',
        inflections: '',
        germanTranslation: "denn, n\xe4mlich",
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: "dum (+ Pr\xe4sens)",
        inflections: '',
        germanTranslation: "w\xe4hrend",
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'subito (Adv.)',
        inflections: '',
        germanTranslation: "pl\xf6tzlich",
        relatedForeignWords: '<-> ital. subito = "sofort"!',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'rapere',
        inflections: 'rapio M, rapui, raptum',
        germanTranslation: 'rauben',
        relatedForeignWords: 'frz. ravir, ital. rapire',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'domum',
        inflections: '',
        germanTranslation: 'nach Hause',
        relatedForeignWords: '<-> domum =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'arma (Pl.)',
        inflections: 'armorum n.',
        germanTranslation: 'Waffen',
        relatedForeignWords: 'frz. arme, ital. + span. arma; vgl. Armee, Alarm (aus "Ad arma!" = "Zu den Waffen!"), Armada',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'adiuvare',
        inflections: 'adiuvo 1, -iuvi, -iutum',
        germanTranslation: "unterst\xfctzen, helfen",
        relatedForeignWords: 'vgl. Adjutant (= Hilfsoffizier eines Kommandanten)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'relinquere',
        inflections: 'relinquo 3, reliqui, relictum',
        germanTranslation: "1) verlassen; 2) zur\xfccklassen",
        relatedForeignWords: "vgl. Reliquien (= \xdcberreste von Heiligen), Relikt (= \xdcberbleibsel)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'domi',
        inflections: '',
        germanTranslation: 'zu Hause',
        relatedForeignWords: '<-> domum =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'iniuria',
        inflections: 'iniuriae f.',
        germanTranslation: 'Unrecht',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'tolerare',
        inflections: 'tolero 1, -avi, -atum',
        germanTranslation: 'ertragen',
        relatedForeignWords: 'vgl. tolerant sein (= nachsichtig sein)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'bellum',
        inflections: 'belli n.',
        germanTranslation: 'Krieg',
        relatedForeignWords: 'vgl. Rebellion, Duell (duellum = bellum)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'bellum gerere',
        inflections: 'gerere 3, gessi, gestum',
        germanTranslation: "Krieg f\xfchren",
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'inter (+ Akk.)',
        inflections: '',
        germanTranslation: 'zwischen',
        relatedForeignWords: 'vgl. international, Intercity-Zug, Intervall, interaktiv',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'contendere',
        inflections: 'contendo 3, -tendi, -tentum',
        germanTranslation: "1) eilen; 2) k\xe4mpfen",
        relatedForeignWords: 'Grundbedeutung: "die Kr\xe4fte anspannen"',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'necesse est',
        inflections: '',
        germanTranslation: 'es ist notwendig',
        relatedForeignWords: "engl. necessary; vgl. das Necessaire (= Beh\xe4lter mit Reisebedarf)",
        selected: true,
        probability: 1
    },
    // --- Unit 8 ---
    {
        latinWord: '^con^Lektion 8: De Lucretia',
        inflections: '',
        germanTranslation: '',
        relatedForeignWords: '',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'tres (m./f.)',
        inflections: 'tria (n.)',
        germanTranslation: 'drei',
        relatedForeignWords: "frz. trois, ital. tre, span. tres; vgl. Triathlon; Triumvirat (= Dreim\xe4nnerbund)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'hora',
        inflections: 'horae f.',
        germanTranslation: 'Stunde',
        relatedForeignWords: 'engl. hour, frz. heure, ital. ora, span. hora',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'facere',
        inflections: 'facio M, feci, factum',
        germanTranslation: 'tun, machen',
        relatedForeignWords: 'frz. faire, ital. fare',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'neque - neque',
        inflections: '(= nec - nec)',
        germanTranslation: 'weder - noch',
        relatedForeignWords: 'vgl. neque =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'dormire',
        inflections: 'dormio 4, -ivi, -itum',
        germanTranslation: 'schlafen',
        relatedForeignWords: 'frz. dormir, ital. dormire, span. dormir',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'solus/a/um',
        inflections: '2.F. solius, 3.F. soli',
        germanTranslation: 'allein',
        relatedForeignWords: 'ital. + span. solo/a; vgl. Solo, Solist',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'duo/duae/duo',
        inflections: '',
        germanTranslation: 'zwei',
        relatedForeignWords: '(siehe Grammatica); ital. due; vgl. Duett, Duo',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'unus/a/um',
        inflections: '2.F. unius, 3.F. uni',
        germanTranslation: '1) ein; 2) einzig',
        relatedForeignWords: "frz. un, ital. uno, span. un; Unikat (= Einzelst\xfcck)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'primus/a/um',
        inflections: '',
        germanTranslation: 'der erste',
        relatedForeignWords: "ital. primo; vgl. Primel, Primat, prima, prim\xe4r",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'castra (Pl.)',
        inflections: 'castrorum n.',
        germanTranslation: 'das Lager (Sg.)',
        relatedForeignWords: 'vgl. Kastell (= kleines Lager), engl. castle',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'resistere',
        inflections: 'resisto 3, restiti, -',
        germanTranslation: 'sich widersetzen, Widerstand leisten',
        relatedForeignWords: "engl. to resist; vgl. resistent (= widerstandsf\xe4hig)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'committere',
        inflections: 'committo 3, commisi, commissum',
        germanTranslation: 'begehen (ein Verbrechen); beginnen (einen Krieg)',
        relatedForeignWords: 'engl. to commit (a crime)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'nisi',
        inflections: '',
        germanTranslation: 'wenn nicht, falls nicht',
        relatedForeignWords: '<-> si =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'parere',
        inflections: 'pareo 2, parui, -',
        germanTranslation: 'gehorchen',
        relatedForeignWords: 'vgl. parieren; <-> parare 1 =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'servus',
        inflections: 'servi m.',
        germanTranslation: 'Sklave',
        relatedForeignWords: 'Servus! (erg. sum) = "Ich bin dein Diener"',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'non iam',
        inflections: '',
        germanTranslation: 'nicht mehr',
        relatedForeignWords: '<-> iam =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'culpa',
        inflections: 'culpae f.',
        germanTranslation: 'Schuld',
        relatedForeignWords: 'ital. colpa, span. culpa',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'nullus/a/um',
        inflections: '2.F. nullius, 3.F. nulli',
        germanTranslation: 'kein',
        relatedForeignWords: 'vgl. Null; <-> nonnulli =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'exemplum',
        inflections: 'exempli n.',
        germanTranslation: 'Beispiel',
        relatedForeignWords: 'engl. for example ("zum Beispiel")',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'maxime (Adv.)',
        inflections: '',
        germanTranslation: 'sehr; am meisten',
        relatedForeignWords: 'vgl. maximal',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'familia',
        inflections: 'familiae f.',
        germanTranslation: 'Familie',
        relatedForeignWords: 'engl. family, frz. famille, ital. famiglia',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'expellere',
        inflections: 'expello 3, expuli, expulsum',
        germanTranslation: '1) vertreiben; 2) verjagen',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    // --- Unit 9 ---
    {
        latinWord: '^con^Lektion 9: Quem Romani maxime timent?',
        inflections: '',
        germanTranslation: '',
        relatedForeignWords: '',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'quem?',
        inflections: '',
        germanTranslation: 'wen?',
        relatedForeignWords: '(siehe Grammatica)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'timere',
        inflections: 'timeo 2, timui, -',
        germanTranslation: "f\xfcrchten; sich f\xfcrchten",
        relatedForeignWords: 'ital. temere, span. temer',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'Galli',
        inflections: 'Gallorum m.',
        germanTranslation: 'die Gallier (= Kelten)',
        relatedForeignWords: 'frz. Gaulois',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'flumen',
        inflections: 'fluminis n.',
        germanTranslation: 'Fluss',
        relatedForeignWords: 'ital. fiume',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'miles',
        inflections: 'militis m.',
        germanTranslation: 'Soldat',
        relatedForeignWords: "vgl. Milit\xe4r",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'fugere (+ Akk.)',
        inflections: 'fugio M, fugi, -',
        germanTranslation: "fl\xfcchten (vor), fliehen",
        relatedForeignWords: "vgl. Zentrifuge, Refugium (= R\xfcckzugsort)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'occupare',
        inflections: 'occupo 1, -avi, -atum',
        germanTranslation: 'besetzen',
        relatedForeignWords: 'frz. occuper, ital. occupare; vgl. okkupieren',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'delere',
        inflections: 'deleo 2, delevi, deletum',
        germanTranslation: "zerst\xf6ren",
        relatedForeignWords: 'vgl. engl. to delete = "l\xf6schen"',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'oppugnare',
        inflections: 'oppugno 1, -avi, -atum',
        germanTranslation: "best\xfcrmen, belagern",
        relatedForeignWords: 'w\xf6rtlich: "dagegenk\xe4mpfen"',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'expugnare',
        inflections: 'expugno 1, -avi, -atum',
        germanTranslation: 'erobern',
        relatedForeignWords: 'w\xf6rtlich: "herausk\xe4mpfen"',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'nox',
        inflections: 'noctis f. (2. F. Pl. -ium)',
        germanTranslation: 'Nacht',
        relatedForeignWords: 'frz. nuit, ital. notte, span. noche',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'constituere',
        inflections: 'constituo 3, constitui, constitutum',
        germanTranslation: "beschlie\xdfen, festsetzen",
        relatedForeignWords: 'vgl. Konstitution (= Verfassung)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'clam (Adv.)',
        inflections: '',
        germanTranslation: 'heimlich',
        relatedForeignWords: 'vgl. klammheimlich (= ganz heimlich)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'ascendere',
        inflections: 'ascendo 3, ascendi, ascensum',
        germanTranslation: 'hinaufsteigen, besteigen',
        relatedForeignWords: 'vgl. Aszendent; vgl. frz. ascenseur, ital. ascensore, span. ascensor',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'homo',
        inflections: 'hominis m.',
        germanTranslation: 'Mensch',
        relatedForeignWords: 'frz. homme; Homo sapiens =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'canis',
        inflections: 'canis m.',
        germanTranslation: 'Hund',
        relatedForeignWords: 'frz. chien, ital. cane; Cave canem (siehe unten)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'Iuno',
        inflections: 'Iunonis f.',
        germanTranslation: 'Juno (griech. Hera)',
        relatedForeignWords: 'Gattin des Jupiter (griech. Hera -> S. 9)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'sacer/cra/crum',
        inflections: '',
        germanTranslation: '1) heilig; 2) geweiht',
        relatedForeignWords: 'vgl. Sakristei, Sakrament, sakral',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'quamquam',
        inflections: '',
        germanTranslation: 'obwohl',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'carere (+ Abl.)',
        inflections: 'careo 2, carui, -',
        germanTranslation: 'frei sein (von ...), nicht haben',
        relatedForeignWords: "z. B. dico careo = (ich bin frei von Freizeit \u2794 ich habe keine Freizeit); vgl. Karenz",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'vox',
        inflections: 'vocis f.',
        germanTranslation: 'Stimme',
        relatedForeignWords: 'engl. voice, frz. voix, ital. voce, span. voz',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'clamor',
        inflections: 'clamoris m.',
        germanTranslation: "Geschrei, L\xe4rm",
        relatedForeignWords: 'frz. clameur, ital. clamore; vgl. clamare =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'statim (Adv.)',
        inflections: '',
        germanTranslation: 'sofort, sogleich',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'ceteri/ae/a (Pl.)',
        inflections: '',
        germanTranslation: "die \xfcbrigen",
        relatedForeignWords: 'etc. (et cetera) = "und das \xdcbrige"',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'servare',
        inflections: 'servo 1, -avi, -atum',
        germanTranslation: '1) retten; 2) bewahren',
        relatedForeignWords: 'vgl. konservieren',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'gloria',
        inflections: 'gloriae f.',
        germanTranslation: 'Ruhm, Ehre',
        relatedForeignWords: 'vgl. Gloria; glorreich (= ruhmreich)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'nomen',
        inflections: 'nominis n.',
        germanTranslation: 'Name',
        relatedForeignWords: 'vgl. Nomen est omen = "Der Name ist Vorzeichen"',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'accipere',
        inflections: 'accipio M, accepi, acceptum',
        germanTranslation: '1) erhalten, 2) aufnehmen, 3) annehmen',
        relatedForeignWords: 'vgl. akzeptieren (= etwas annehmen)',
        selected: true,
        probability: 1
    },
    // --- Unit 10 ---
    {
        latinWord: '^con^Lektion 10: De Hannibale',
        inflections: '',
        germanTranslation: '',
        relatedForeignWords: '',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'imperator',
        inflections: 'imperatoris m.',
        germanTranslation: '1) Feldherr; 2) Kaiser',
        relatedForeignWords: 'eigntl.: "Befehlshaber" (vgl. imperare!)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'virtus',
        inflections: 'virtutis f.',
        germanTranslation: '1) Tapferkeit; 2) Tugend',
        relatedForeignWords: 'eigntl.: "Mannhaftigkeit" (vgl. vir = Mann)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'copiae (Pl.)',
        inflections: 'copiarum f.',
        germanTranslation: 'Truppen',
        relatedForeignWords: '<-> copia, -ae (Sg.) =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'ducere',
        inflections: 'duco 3, duxi, ductum',
        germanTranslation: "f\xfchren",
        relatedForeignWords: 'vgl. reduzieren',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'navis',
        inflections: 'navis f.',
        germanTranslation: 'Schiff',
        relatedForeignWords: 'Navigation = Steuerung des Schiffs); vgl. engl. navy',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'mare',
        inflections: 'maris n.',
        germanTranslation: 'Meer',
        relatedForeignWords: 'frz. mer, ital. mare, vgl. Marine =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'audere',
        inflections: 'audeo 2, ausus sum',
        germanTranslation: 'wagen',
        relatedForeignWords: 'frz. oser, ital. osare, span. osar',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'amittere',
        inflections: 'amitto 3, amisi, amissum',
        germanTranslation: 'verlieren',
        relatedForeignWords: 'w\xf6rt.: "wegschicken"',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'pugna',
        inflections: 'pugnae f.',
        germanTranslation: 'Kampf',
        relatedForeignWords: 'vgl. pugnare =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'vincere',
        inflections: 'vinco 3, vici, victum',
        germanTranslation: 'siegen, besiegen',
        relatedForeignWords: 'frz. vaincre, ital. vincere, span. vencer',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'pars',
        inflections: 'partis f.',
        germanTranslation: 'Teil',
        relatedForeignWords: 'engl. part; vgl. partiell (= teilweise)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'timor',
        inflections: 'timoris m.',
        germanTranslation: 'Furcht, Angst',
        relatedForeignWords: 'ital. timore, span. temor; vgl. timere =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'ne ... quidem',
        inflections: '',
        germanTranslation: 'nicht einmal ...',
        relatedForeignWords: 'z.B. ne tu quidem =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'prohibere',
        inflections: 'prohibeo 2, -ui, -itum',
        germanTranslation: '1) ab-, fernhalten; 2) hindern, verhindern',
        relatedForeignWords: 'ital. proibire, span. prohibir; vgl. engl. to prohibit ("verbieten")',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'occidere',
        inflections: 'occido 3, occidi, occisum',
        germanTranslation: "t\xf6ten",
        relatedForeignWords: 'ital. uccidere',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'porta',
        inflections: 'portae f.',
        germanTranslation: "Tor, T\xfcr",
        relatedForeignWords: 'frz. porte, ital. porta; vgl. Portal, Portier',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'urbs',
        inflections: 'urbis f.',
        germanTranslation: 'Stadt',
        relatedForeignWords: "vgl. engl. suburb; urban (= st\xe4dtisch)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'summus/a/um',
        inflections: '',
        germanTranslation: "der h\xf6chste; sehr hoch",
        relatedForeignWords: "vgl. Summe; engl. summit (= H\xf6hepunkt)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'honor',
        inflections: 'honoris m.',
        germanTranslation: 'Ehre, Ansehen',
        relatedForeignWords: 'vgl. honorieren (= belohnen); engl. honour',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'facere',
        inflections: '(mit doppeltem Akk.)',
        germanTranslation: 'zu etwas machen',
        relatedForeignWords: 'z. B. te amicam meam facio =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'patria',
        inflections: 'patriae f.',
        germanTranslation: 'Heimat',
        relatedForeignWords: 'ital. + span. patria; vgl. Patriot =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'pax',
        inflections: 'pacis f.',
        germanTranslation: 'Friede',
        relatedForeignWords: 'engl. peace; vgl. Pazifist (= Kriegsgegner), Pazifik',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'hostis',
        inflections: 'hostis m.',
        germanTranslation: 'Feind',
        relatedForeignWords: 'vgl. engl. hostile (= feindlich)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'liberare (+ Abl.)',
        inflections: 'libero 1, -avi, -atum',
        germanTranslation: 'befreien (von)',
        relatedForeignWords: 'vgl. liberalisieren (= von Regelungen befreien)',
        selected: true,
        probability: 1
    },
    // --- Unit 11 ---
    {
        latinWord: '^con^Lektion 11: Quis Iovem non amat?',
        inflections: '',
        germanTranslation: '',
        relatedForeignWords: '',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'Iuppiter',
        inflections: 'Iovis m.',
        germanTranslation: 'Jupiter',
        relatedForeignWords: 'griech. Zeus (S. 9)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'scire',
        inflections: 'scio 4, scivi, scitum',
        germanTranslation: 'wissen',
        relatedForeignWords: 'vgl. engl. science =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'is, ea, id',
        inflections: '',
        germanTranslation: '1) dieser/e/es 2) er, sie, es',
        relatedForeignWords: "hinweisendes F\xfcrwort (siehe Grammatica)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'vocare',
        inflections: 'voco 1, -avi, -atum',
        germanTranslation: '1) rufen; 2) nennen',
        relatedForeignWords: 'vgl. vox, vocis; vgl. Vokativ (= Ruf-Fall), Advokat',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'imperare',
        inflections: 'impero 1, -avi, -atum',
        germanTranslation: 'befehlen',
        relatedForeignWords: 'vgl. Imperator, Imperativ =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'mons',
        inflections: 'montis m.',
        germanTranslation: 'Berg',
        relatedForeignWords: 'engl. mount, frz. mont, ital. + span. monte',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'rex',
        inflections: 'regis m.',
        germanTranslation: "K\xf6nig",
        relatedForeignWords: 'frz. roi, ital. re, span. rey',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'litus',
        inflections: 'litoris n.',
        germanTranslation: "K\xfcste, Strand",
        relatedForeignWords: 'ital. lido, span. litoral',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'eius',
        inflections: '(2.F. Sg.)',
        germanTranslation: 'dessen/deren',
        relatedForeignWords: '(siehe Grammatica)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'eorum/earum',
        inflections: '(2.F. Pl.)',
        germanTranslation: 'deren',
        relatedForeignWords: '(siehe Grammatica)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'iussum',
        inflections: 'iussi n.',
        germanTranslation: 'Befehl',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'conficere',
        inflections: 'conficio M, confeci, confectum',
        germanTranslation: "1) ausf\xfchren, anfertigen 2) beenden",
        relatedForeignWords: 'vgl. facere M =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'solere',
        inflections: 'soleo 2, solitus sum',
        germanTranslation: 'gewohnt sein, pflegen',
        relatedForeignWords: 'span. soler',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'idem, eadem, idem',
        inflections: '',
        germanTranslation: 'der-, die-, dasselbe',
        relatedForeignWords: 'siehe Grammatica; vgl. ident, identisch',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'locus',
        inflections: 'loci m.',
        germanTranslation: 'Ort, Stelle, Platz',
        relatedForeignWords: 'vgl. Lokal, lokalisieren; der Lokus (= WC)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'virgo',
        inflections: 'virginis f.',
        germanTranslation: "M\xe4dchen, Jungfrau",
        relatedForeignWords: 'engl. virgin, frz. vierge, ital. vergine, span. virgen',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'ludere',
        inflections: 'ludo 3, lusi, lusum',
        germanTranslation: 'spielen',
        relatedForeignWords: "vgl. Pr\xe4ludium (= Vorspiel)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'taurus',
        inflections: 'tauri m.',
        germanTranslation: 'Stier',
        relatedForeignWords: "ital. + span. toro, vgl. Torero (= Stierk\xe4mpfer)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'multitudo',
        inflections: 'multitudinis f.',
        germanTranslation: 'Menge',
        relatedForeignWords: 'vgl. multi/ae/a =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'conspicere',
        inflections: 'conspicio M, conspexi, conspectum',
        germanTranslation: 'erblicken',
        relatedForeignWords: 'vgl. in-spezieren (= genau untersuchen)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'pulchritudo',
        inflections: 'pulchritudinis f.',
        germanTranslation: "Sch\xf6nheit",
        relatedForeignWords: 'vgl. pulcher/a/um',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'primo (Adv.)',
        inflections: '',
        germanTranslation: 'zuerst',
        relatedForeignWords: 'vgl. Prime!; <-> primus/a/um (Adj.) =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'tangere',
        inflections: 'tango 3, tetigi, tactum',
        germanTranslation: "ber\xfchren",
        relatedForeignWords: 'vgl. Tangente, tangieren, Tangens; engl. contact',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'corpus',
        inflections: 'corporis n.',
        germanTranslation: "K\xf6rper",
        relatedForeignWords: "vgl. der Korpus; das Corpus delicti (= Beweisst\xfcck)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'mox (Adv.)',
        inflections: '',
        germanTranslation: 'bald',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'insula',
        inflections: 'insulae f.',
        germanTranslation: 'Insel',
        relatedForeignWords: "engl. island, frz. \xeele, ital. isola, span. isla",
        selected: true,
        probability: 1
    },
    // --- Unit 12 ---
    {
        latinWord: '^con^Lektion 12: De Minotauro',
        inflections: '',
        germanTranslation: '',
        relatedForeignWords: '',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'pater',
        inflections: 'patris m.',
        germanTranslation: 'Vater',
        relatedForeignWords: 'vgl. Patriarch (= Familienoberhaupt); <-> patria, -ae = "Vaterland"',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'quaerere',
        inflections: 'quaero 3, quaesivi, quaesitum',
        germanTranslation: '1) suchen (+ Akk.) 2) fragen (+ ab/ex)',
        relatedForeignWords: 'quaero amicam = ich suche die Freundin; quaero ab amica = ich frage die Freundin',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'parentes (Pl.)',
        inflections: 'parentum m.',
        germanTranslation: 'Eltern',
        relatedForeignWords: 'engl. + franz. parents',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'qui, quae, quod',
        inflections: '',
        germanTranslation: '1) welcher/e/s; 2) der/die/das',
        relatedForeignWords: 'Relativpronomen, siehe Grammatica',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'nihil',
        inflections: '',
        germanTranslation: 'nichts',
        relatedForeignWords: 'vgl. Nihilist (= einer, der an nichts glaubt)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'nihil nisi',
        inflections: '',
        germanTranslation: "nichts au\xdfer; nur",
        relatedForeignWords: 'w\xf6rtl.: "nichts, wenn nicht"',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'debere (+ Inf.)',
        inflections: 'debeo 2, -ui, -itum',
        germanTranslation: "m\xfcssen",
        relatedForeignWords: 'frz. devoir, ital. dovere, span. deber',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'caput',
        inflections: 'capitis n.',
        germanTranslation: 'Kopf, Haupt',
        relatedForeignWords: "vgl. engl. capital; vgl. Kapuze, Kapit\xe4n",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'periculum',
        inflections: 'periculi n.',
        germanTranslation: 'Gefahr',
        relatedForeignWords: 'vgl. ital. pericoloso',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'interficere',
        inflections: 'interficio M, interfeci, interfectum',
        germanTranslation: "t\xf6ten",
        relatedForeignWords: '= necare, occidere',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'miser/era/erum',
        inflections: '',
        germanTranslation: "1) arm, elend; 2) ungl\xfccklich",
        relatedForeignWords: 'vgl. miserable; die Misere (= Notlage)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'navigare',
        inflections: 'navigo 1, -avi, -atum',
        germanTranslation: 'segeln, mit dem Schiff fahren',
        relatedForeignWords: 'vgl. navis, -is = navigieren (= "steuern")',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'adulescens',
        inflections: 'adulescentis m.',
        germanTranslation: 'junger Mann',
        relatedForeignWords: 'vgl. die Adoleszenz (= Jugendalter)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'iuvare',
        inflections: 'iuvo 1, iuvi, iutum',
        germanTranslation: "unterst\xfctzen, helfen",
        relatedForeignWords: '= adiuvare (Lec. 7)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'nemo',
        inflections: '',
        germanTranslation: 'niemand',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'invenire',
        inflections: 'invenio 4, inveni, inventum',
        germanTranslation: '1) finden; 2) erfinden',
        relatedForeignWords: 'w\xf6rtl.: "daraufkommen"; engl. invention, to invent',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'cura',
        inflections: 'curae f.',
        germanTranslation: 'Sorge',
        relatedForeignWords: 'vgl. Kur',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'quomodo',
        inflections: '',
        germanTranslation: 'wie',
        relatedForeignWords: 'W\xf6rtlich: "auf welche Weise?"',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'modus',
        inflections: 'modi m.',
        germanTranslation: 'Art, Weise',
        relatedForeignWords: 'vgl. Mode = Art, sich anzuziehen',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'dare',
        inflections: 'do 1, dedi, datum',
        germanTranslation: 'geben',
        relatedForeignWords: 'ital. dare, dar; vgl. Dativ (Gib-Fall)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'medius/a/um',
        inflections: '',
        germanTranslation: 'der mittlere; in der Mitte',
        relatedForeignWords: "vgl. engl. medium (z. B. Kleidergr\xf6\xdfe, Steak), meditieren",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'medio in labyrintho',
        inflections: '',
        germanTranslation: 'mitten im Labyrinth',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'paratus/a/um',
        inflections: '',
        germanTranslation: 'bereit',
        relatedForeignWords: 'vgl. parare (Lec. 7); vgl. "etwas parat haben"',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'atque (= ac)',
        inflections: '',
        germanTranslation: 'und',
        relatedForeignWords: '= et, -que',
        selected: true,
        probability: 1
    },
    // --- Unit 13 ---
    {
        latinWord: '^con^Lektion 13: De Daedalo et Icaro',
        inflections: '',
        germanTranslation: '',
        relatedForeignWords: '',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'amor',
        inflections: 'amoris m.',
        germanTranslation: 'Liebe',
        relatedForeignWords: 'frz. amour, ital. amore, span. amor; vgl. Amor',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'cupere',
        inflections: 'cupio M, cupivi, -itum',
        germanTranslation: "w\xfcnschen, begehren",
        relatedForeignWords: '<-> capere M =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'petere a/ab',
        inflections: 'peto 3, petivi, petitum (+ Abl.)',
        germanTranslation: 'bitten, erbitten',
        relatedForeignWords: 'peto a te auxilium = "ich bitte dich um Hilfe"; "ich erbitte Hilfe von dir"',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'manus',
        inflections: 'manus f.',
        germanTranslation: 'Hand',
        relatedForeignWords: "vgl. manuell, Manufaktur, Manik\xfcre",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'artificium',
        inflections: 'artificii n.',
        germanTranslation: 'Kunstwerk',
        relatedForeignWords: 'zusammengesetzt aus: ars + facere',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'res',
        inflections: 'rei f.',
        germanTranslation: 'Sache',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'ars',
        inflections: 'artis f.',
        germanTranslation: '1) Kunst; 2) Technik',
        relatedForeignWords: 'engl. + frz. art, ital. + span. arte; vgl. Artist',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'casus',
        inflections: 'casus m.',
        germanTranslation: "1) Fall; 2) Zufall; 3) Ungl\xfccksfall",
        relatedForeignWords: 'engl. case (= Fall), frz. cas, ital. + span. caso',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'coniungere',
        inflections: 'coniunxo 3, coniunxi, coniunctum',
        germanTranslation: '1) verbinden; 2) vereinigen',
        relatedForeignWords: 'vgl. Konjunktion (= Bindewort)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'dies',
        inflections: 'diei m.',
        germanTranslation: 'Tag',
        relatedForeignWords: "span. d\xeda; vgl. engl. diary (= Tagebuch)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'opus',
        inflections: 'operis n.',
        germanTranslation: 'Werk',
        relatedForeignWords: 'ital. opera; vgl. das Opus (= Musikwerk)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'meridies',
        inflections: 'meridiei m.',
        germanTranslation: 'Mittag',
        relatedForeignWords: 'vgl. Meridian (= "Mittagslinie"), a. m. (siehe unten)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'sol',
        inflections: 'solis m.',
        germanTranslation: 'Sonne',
        relatedForeignWords: 'frz. soleil, ital. sole, span. sol; vgl. Solanum',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'caelum',
        inflections: 'caeli n.',
        germanTranslation: 'Himmel',
        relatedForeignWords: 'engl. ceiling, frz. ciel, ital. + span. cielo',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'metus',
        inflections: 'metus m.',
        germanTranslation: 'Furcht, Angst',
        relatedForeignWords: '= timor, -oris',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'denique (Adv.)',
        inflections: '',
        germanTranslation: "schlie\xdflich, endlich",
        relatedForeignWords: '= postremo',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'negligere',
        inflections: 'neglego 3, neglexi, neglectum',
        germanTranslation: 'missachten, ignorieren',
        relatedForeignWords: "engl. to neglect, frz. n\xe9gliger",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'solvere',
        inflections: 'solvo 3, solvi, solutum',
        germanTranslation: "aufl\xf6sen, l\xf6sen",
        relatedForeignWords: "engl. to solve (a problem); solution (= L\xf6sung)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'cadere',
        inflections: 'cado 3, cecidi, -',
        germanTranslation: 'fallen',
        relatedForeignWords: 'de-kadent (= verfallen, entartet); vgl. casus, -us (s. oben)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'mortuus/a/um',
        inflections: '',
        germanTranslation: 'tot, gestorben',
        relatedForeignWords: "frz. mort; vgl. Mortalit\xe4t (= Sterblichkeit)",
        selected: true,
        probability: 1
    },
    // --- Unit 14 ---
    {
        latinWord: '^con^Lektion 14: De Tartaro',
        inflections: '',
        germanTranslation: '',
        relatedForeignWords: '',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'fuit',
        inflections: '',
        germanTranslation: 'Perfekt von est',
        relatedForeignWords: '(siehe Grammatica)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'hic, haec, hoc',
        inflections: '',
        germanTranslation: 'dieser/e/es',
        relatedForeignWords: "hinweisendes F\xfcrwort (siehe Grammatica)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'cena',
        inflections: 'cenae f.',
        germanTranslation: 'Mahlzeit, Mahl',
        relatedForeignWords: "frz. c\xe8ne, ital. + span. cena (= Abendessen)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'invitare',
        inflections: 'invito 1, -avi, invitatus',
        germanTranslation: 'einladen',
        relatedForeignWords: 'engl. to invite, frz. inviter, ital. invitare',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'quidam, quaedam, quoddam',
        inflections: '2.F. cuiusdam, 3.F. cuidam',
        germanTranslation: 'Sg.: ein (gewisser); Pl.: einige',
        relatedForeignWords: 'Deklination wie qui/quae/quod + -dam',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'facinus',
        inflections: 'facinoris n.',
        germanTranslation: '1) Tat; 2) Untat',
        relatedForeignWords: 'abgeleitet vom Verbum facere = tun',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'prudentia',
        inflections: 'prudentiae f.',
        germanTranslation: 'Klugheit',
        relatedForeignWords: 'engl. + frz. prudence, ital. prudenza, span. prudencia',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'intellegere',
        inflections: 'intellego 3, intellexi, intellectum',
        germanTranslation: 'erkennen, einsehen',
        relatedForeignWords: 'vgl. Intelligenz, intelligent',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'reddere',
        inflections: 'reddo 3, reddidi, redditum',
        germanTranslation: "zur\xfcckgeben",
        relatedForeignWords: "aus: re- (zur\xfcck-) + dare",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'poena',
        inflections: 'poenae f.',
        germanTranslation: 'Strafe',
        relatedForeignWords: "vgl. P\xf6nale (= Strafgeld), Penalty (= Strafsto\xdf)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'poenas solvere',
        inflections: '',
        germanTranslation: "eine Strafe verb\xfc\xdfen",
        relatedForeignWords: 'w\xf6rtlich: "Strafgeld zahlen"',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'stare',
        inflections: 'sto 1, steti, statum',
        germanTranslation: 'stehen',
        relatedForeignWords: 'vgl. Station, Statue; statisch (= stillstehend)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'arbor',
        inflections: 'arboris f.',
        germanTranslation: 'Baum',
        relatedForeignWords: "Nota bene: B\xe4ume galten als weiblich!",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'sitis',
        inflections: 'sitis f. (i-Stamm)',
        germanTranslation: 'Durst',
        relatedForeignWords: 'ital. sete, span. sed',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'fames',
        inflections: 'famis f.',
        germanTranslation: 'Hunger',
        relatedForeignWords: 'frz. faim, ital. fame',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'cum (Konjunktion)',
        inflections: '',
        germanTranslation: '1) wenn, sooft; 2) als',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'bibere',
        inflections: 'bibo 3, bibi, -',
        germanTranslation: 'trinken',
        relatedForeignWords: 'frz. boire, ital. bere, span. beber',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'improbus/a/um',
        inflections: '',
        germanTranslation: "schlecht, b\xf6se",
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'scelus',
        inflections: 'sceleris n.',
        germanTranslation: 'Verbrechen',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'mors',
        inflections: 'mortis f.',
        germanTranslation: 'Tod',
        relatedForeignWords: 'frz. mort, ital. morte, span. muerte',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'contra (+ Akk.)',
        inflections: '',
        germanTranslation: 'gegen',
        relatedForeignWords: "vgl. Kontrast; Pro und Kontra (= F\xfcr und Wider)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'natura',
        inflections: 'naturae f.',
        germanTranslation: 'Natur',
        relatedForeignWords: 'engl. + frz. nature, ital. natura',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'genus',
        inflections: 'generis n.',
        germanTranslation: '1) Art; 2) Geschlecht',
        relatedForeignWords: 'engl. gender, frz. genre, ital. genere',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'punire',
        inflections: 'punio 4, punivi, -itum',
        germanTranslation: 'bestrafen',
        relatedForeignWords: 'frz. punir, ital. punire; vgl. poena =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'saxum',
        inflections: 'saxi n.',
        germanTranslation: 'Fels',
        relatedForeignWords: 'ital. sasso',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'vis (Sg.)',
        inflections: 'vim (4.F.), vi (6.F.) f.',
        germanTranslation: '1) Kraft; 2) Gewalt',
        relatedForeignWords: 'vgl. vis, viri (= Mann)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'vires (Pl.)',
        inflections: 'virium f.',
        germanTranslation: "die Kr\xe4fte",
        relatedForeignWords: 'Viribus unitis (siehe links)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'paene (Adv.)',
        inflections: '',
        germanTranslation: 'fast, beinahe',
        relatedForeignWords: 'engl. quasi, pen-insula ("Fast-Insel" = Halbinsel)',
        selected: true,
        probability: 1
    },
    // --- Unit 15 ---
    {
        latinWord: '^con^Lektion 15: De Orpheo et Eurydice',
        inflections: '',
        germanTranslation: '',
        relatedForeignWords: '',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'ille, illa, illud',
        inflections: '',
        germanTranslation: 'jener/e/es',
        relatedForeignWords: 'vgl. die Artikel: frz. le/la, ital. il/la, span. el/la',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'et ... et',
        inflections: '',
        germanTranslation: 'sowohl ... als auch',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'animal (i-Stamm)',
        inflections: 'animalis n.',
        germanTranslation: '1) Tier; 2) Lebewesen',
        relatedForeignWords: 'engl. + frz. + span. animal, ital. animale',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'carmen',
        inflections: 'carminis n.',
        germanTranslation: 'Lied',
        relatedForeignWords: 'vgl. Carmina Burana (Carl Orff)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'canere',
        inflections: 'cano 3, cecini, -',
        germanTranslation: 'singen, besingen',
        relatedForeignWords: 'frz. chanter, ital. cantare, span. cantar',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'olim (Adv.)',
        inflections: '',
        germanTranslation: 'einst',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'matrimonium',
        inflections: 'matrimonii n.',
        germanTranslation: 'Ehe',
        relatedForeignWords: 'ital. + span. matrimonio, engl. matrimony',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'in matrimonium ducere',
        inflections: '',
        germanTranslation: 'heiraten (vom Mann aus)',
        relatedForeignWords: 'w\xf6rtl.: "die Frau in die Ehe f\xfchren"',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'dolor',
        inflections: 'doloris m.',
        germanTranslation: 'Schmerz',
        relatedForeignWords: 'frz. douleur, ital. dolore, span. dolor',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'flere',
        inflections: 'fleo 2, flevi, fletum',
        germanTranslation: 'weinen',
        relatedForeignWords: 'vgl. flennen',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'dolere',
        inflections: 'doleo 2, dolui, -',
        germanTranslation: 'trauern, Schmerz empfinden',
        relatedForeignWords: 'vgl. dolor =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'ipse, ipsa, ipsum',
        inflections: '',
        germanTranslation: 'selbst',
        relatedForeignWords: '(siehe Grammatica)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'regina',
        inflections: 'reginae f.',
        germanTranslation: "K\xf6nigin",
        relatedForeignWords: 'ital. regina',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'movere',
        inflections: 'moveo 2, movi, motum',
        germanTranslation: 'bewegen; beeindrucken',
        relatedForeignWords: 'engl. to move, movie; vgl. motivieren, Motor',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'postquam',
        inflections: '',
        germanTranslation: 'nachdem',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'cuncti/ae/a (Pl.)',
        inflections: '',
        germanTranslation: 'alle; alles (n.)',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'frustra (Adv.)',
        inflections: '',
        germanTranslation: 'vergeblich',
        relatedForeignWords: "vgl. Frustration (= entt\xe4uschte Erwartung)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'desinere',
        inflections: 'desino 3, desii, -',
        germanTranslation: "aufh\xf6ren, ablassen",
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'considerere',
        inflections: 'consido 3, consedi, -',
        germanTranslation: 'sich niedersetzen',
        relatedForeignWords: '<-> sedere 2 =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'ignotus/a/um',
        inflections: '',
        germanTranslation: 'unbekannt',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'eram, eras, ... (etc.)',
        inflections: '',
        germanTranslation: 'ich war, du warst ... (etc.)',
        relatedForeignWords: '(Imperfekt von esse, siehe Grammatica)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'condicio',
        inflections: 'condicionis f.',
        germanTranslation: 'Bedingung',
        relatedForeignWords: 'vgl. Konditionalsatz (= Bedingungssatz)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'uxor',
        inflections: 'uxoris f.',
        germanTranslation: 'Gattin, Ehefrau',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'iter',
        inflections: 'itineris n.',
        germanTranslation: '1) Weg; 2) Reise',
        relatedForeignWords: 'ital. + span. itinerario',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'iter facere',
        inflections: '',
        germanTranslation: 'reisen, marschieren',
        relatedForeignWords: 'w\xf6rtl.: "eine Reise machen"',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'vertere',
        inflections: 'verto 3, verti, versum',
        germanTranslation: 'wenden, drehen',
        relatedForeignWords: 'vgl. konvertieren (= die Religion wechseln)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'domus',
        inflections: 'domus f.',
        germanTranslation: 'Haus',
        relatedForeignWords: 'vgl. Dom, Domizil (= Wohnsitz)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'longus/a/um',
        inflections: '',
        germanTranslation: 'lang',
        relatedForeignWords: "engl. long; vgl. Longinus (= gro\xdfer Mensch)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'lux',
        inflections: 'lucis f.',
        germanTranslation: 'Licht',
        relatedForeignWords: 'engl. luce, span. luz; vgl. Luzifer ("Lichtbringer")',
        selected: true,
        probability: 1
    },
    // --- Unit 16 ---
    {
        latinWord: '^con^Lektion 16: De Spartaco',
        inflections: '',
        germanTranslation: '',
        relatedForeignWords: '',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'natio',
        inflections: 'nationis f.',
        germanTranslation: 'Volk',
        relatedForeignWords: 'vgl. inter-national, Nation, Nationalismus',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'nobilis/e',
        inflections: '',
        germanTranslation: '1) vornehm; 2) adelig',
        relatedForeignWords: 'frz. noble, ital. nobile, span. noble; vgl. nobel',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'natus/a/um',
        inflections: '',
        germanTranslation: '1) geboren; 2) abstammend',
        relatedForeignWords: 'vgl. engl. native speaker',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'fortis/e',
        inflections: '',
        germanTranslation: 'tapfer',
        relatedForeignWords: '<-> frz. fort + ital. forte ("stark")!',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'gladiator',
        inflections: 'gladiatoris m.',
        germanTranslation: 'Gladiator',
        relatedForeignWords: 'w\xf6rtl.: "Schwertk\xe4mpfer" (vgl. gladius)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'crudelis/e',
        inflections: '',
        germanTranslation: 'grausam',
        relatedForeignWords: 'engl. + frz. + span. cruel, ital. crudele',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'varius/a/um',
        inflections: '',
        germanTranslation: 'verschieden',
        relatedForeignWords: 'vgl. variieren (= abwechseln), Variante, Variation',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'discere',
        inflections: 'disco 3, didici, -',
        germanTranslation: 'lernen',
        relatedForeignWords: 'vgl. discipulus =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'difficilis/e',
        inflections: '',
        germanTranslation: 'schwierig',
        relatedForeignWords: "engl. difficult, frz. + ital. difficile, span. dif\xedcil",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'exercitus',
        inflections: 'exercitus m.',
        germanTranslation: 'Heer',
        relatedForeignWords: 'ital. esercito, span. ejercito; vgl. exercere (s.u.)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'brevis/e',
        inflections: '',
        germanTranslation: 'kurz',
        relatedForeignWords: 'engl. brief, frz. bref, ital. + span. breve',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'tempus',
        inflections: 'temporis n.',
        germanTranslation: 'Zeit',
        relatedForeignWords: "frz. temps, ital. tempo; vgl. Temporalzsatz, tempor\xe4r",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'agere',
        inflections: 'ago 3, egi, actum',
        germanTranslation: '1) tun; 2) verbringen',
        relatedForeignWords: 'vgl. agieren, reagieren; agil (= beweglich, flink)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'vitam agere',
        inflections: '',
        germanTranslation: 'das Leben verbringen',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'exercere',
        inflections: 'exerceo 2, -ui, -itum',
        germanTranslation: "trainieren, \xfcben",
        relatedForeignWords: 'engl. exercise; vgl. exerzieren =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'celer/eris/ere',
        inflections: '',
        germanTranslation: 'schnell',
        relatedForeignWords: 'ital. celere; vgl. engl. celerity',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'ager',
        inflections: 'agri m.',
        germanTranslation: 'Feld; Pl.: Gebiet(e)',
        relatedForeignWords: 'vgl. Aqar; vgl. engl. agriculture =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'latus/a/um',
        inflections: '',
        germanTranslation: 'weit, breit',
        relatedForeignWords: "vgl. Latifundien (= gro\xdfe Landg\xfcter)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'recipere',
        inflections: 'recipio M, recepi, receptum',
        germanTranslation: 'aufnehmen',
        relatedForeignWords: 'vgl. Rezept, Rezept',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'se recipere',
        inflections: '',
        germanTranslation: "sich zur\xfcckziehen",
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'continere',
        inflections: 'contineo 2, continui, -',
        germanTranslation: '1) zusammenhalten; 2) enthalten',
        relatedForeignWords: 'vgl. Kontinent; Container',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'cupiditas',
        inflections: 'cupiditatis f.',
        germanTranslation: 'Gier',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'adductus/a/um',
        inflections: '',
        germanTranslation: 'veranlasst',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'senatus',
        inflections: 'senatus m.',
        germanTranslation: 'Senat',
        relatedForeignWords: 'eig.: "\xc4ltestenrat" (vgl. senex = "alter Mann")',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'cognoscere',
        inflections: 'cognosco 3, cognovi, cognitum',
        germanTranslation: 'erkennen; erfahren',
        relatedForeignWords: 'vgl. engl. to recognize; incognito (= unerkannt)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'atrox (m./f./n.)',
        inflections: 'atrocis (2.F.)',
        germanTranslation: 'grausam, wild',
        relatedForeignWords: 'ital. atroce, span. atroz',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'crux',
        inflections: 'crucis f.',
        germanTranslation: 'Kreuz',
        relatedForeignWords: 'ital. croce, span. cruz; vgl. Kreuzigung',
        selected: true,
        probability: 1
    },
    // --- Unit 17 ---
    {
        latinWord: '^con^Lektion 17: De Cicerone',
        inflections: '',
        germanTranslation: '',
        relatedForeignWords: '',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'littera',
        inflections: 'litterae f.',
        germanTranslation: 'Buchstabe',
        relatedForeignWords: "vgl. die Lettern (= gro\xdfe Buchstaben)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'litterae (Pl.)',
        inflections: 'litterarum f.',
        germanTranslation: '1) Wissenschaft; 2) Brief',
        relatedForeignWords: 'engl. letter; vgl. Literatur',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'iuvenis',
        inflections: 'iuvenis m.',
        germanTranslation: 'junger Mann (30-45 Jahre)',
        relatedForeignWords: 'ital. giovane; <-> adulescens (ca. 18-30 Jahre)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'orator',
        inflections: 'oratoris m.',
        germanTranslation: 'Redner',
        relatedForeignWords: 'vgl. orare =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'res publica',
        inflections: 'rei publicae f.',
        germanTranslation: 'Staat',
        relatedForeignWords: 'w\xf6rtl.: "\xf6ffentliche Sache"; vgl. Republik',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'iustitia',
        inflections: 'iustitiae f.',
        germanTranslation: 'Gerechtigkeit',
        relatedForeignWords: 'vgl. Justiz (= staatliche Rechtspflege)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'incola',
        inflections: 'incolae m.',
        germanTranslation: 'Bewohner, Einwohner',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'provincia',
        inflections: 'provinciae f.',
        germanTranslation: 'Provinz',
        relatedForeignWords: 'vgl. die Provence (Region in S-Frankreich)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'divitiae (Pl.)',
        inflections: 'divitiarum f.',
        germanTranslation: 'Reichtum',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'antiquus/a/um',
        inflections: '',
        germanTranslation: 'alt',
        relatedForeignWords: "antik; vgl. Antiquit\xe4ten (= alte Kunstgegenst\xe4nde)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'ferre',
        inflections: 'fero, fers, tuli, latum',
        germanTranslation: 'tragen, bringen; ertragen',
        relatedForeignWords: '(siehe Grammatica); vgl. Transfer',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'nobilitas',
        inflections: 'nobilitatis f.',
        germanTranslation: 'Adel',
        relatedForeignWords: 'vgl. Snob (= sine nobilitate); nobilis/e =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'ius',
        inflections: 'iuris n.',
        germanTranslation: 'Recht',
        relatedForeignWords: 'Jus, Jura, Jurisdiktion = Rechtsprechung',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'oratio',
        inflections: 'orationis f.',
        germanTranslation: 'Rede',
        relatedForeignWords: 'vgl. orator (siehe oben) =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'iudicium',
        inflections: 'iudicii n.',
        germanTranslation: 'Urteil',
        relatedForeignWords: 'ital. giudizio, span. juicio',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'sponte sua',
        inflections: '',
        germanTranslation: 'freiwillig',
        relatedForeignWords: 'vgl. spontan (= aus eigenem Antrieb)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'exilium',
        inflections: 'exilii n.',
        germanTranslation: 'Exil, Verbannung',
        relatedForeignWords: 'vgl. S. 82); vgl. Semperit = "Es geht immer"',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'ire',
        inflections: 'eo, is, ii, itum',
        germanTranslation: 'gehen',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'Romae',
        inflections: '(Lokativ)',
        germanTranslation: 'in Rom',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'studere (+ Dat.)',
        inflections: 'studeo 2, studui, -',
        germanTranslation: "sich bem\xfchen (um), streben (nach)",
        relatedForeignWords: 'studieren, Student',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'cogere',
        inflections: 'cogo 3, coegi, coactum',
        germanTranslation: '1) sammeln; 2) zwingen',
        relatedForeignWords: 'aus: co-agere = w\xf6rtl.: "zusammentreiben"',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'consul',
        inflections: 'consulis m.',
        germanTranslation: 'Konsul',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'convocare',
        inflections: 'convoco 1, -avi, -atum',
        germanTranslation: 'zusammenrufen',
        relatedForeignWords: 'con- = "zusammen-" (vgl. S. 118)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'senator',
        inflections: 'senatoris m.',
        germanTranslation: 'Senator',
        relatedForeignWords: 'vgl. senatus (Lec. 16) =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'ferre',
        inflections: "1) ungef\xe4hr; 2) fast",
        germanTranslation: '<-> ferre = "tragen"',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'exire',
        inflections: 'exeo, exis, exii, exitum',
        germanTranslation: 'hinausgehen',
        relatedForeignWords: 'vgl. engl. exit; vgl. Exitus (= Tod)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'iubere (+ Akk.)',
        inflections: 'iubeo 2, iussi, iussum',
        germanTranslation: 'befehlen; lassen (+ Inf.)',
        relatedForeignWords: 'iubeo te (Akk.) = ich befehle dir (Dativ)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'socius',
        inflections: 'socii m.',
        germanTranslation: "Gef\xe4hrte",
        relatedForeignWords: 'vgl. sozial, Sozialismus; Sozius (= Beifahrersitz)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'comprehendere',
        inflections: 'comprehendo 3, comprehendi, -prehensum',
        germanTranslation: '1) ergreifen; 2) erfassen (auch geistig)',
        relatedForeignWords: 'vgl. engl. listening comprehension',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'afficere',
        inflections: 'afficio M, affeci, affectum',
        germanTranslation: "erf\xfcllen, versehen (mit)",
        relatedForeignWords: "vgl. Affekt (= Gef\xfchlsregung)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'priusquam',
        inflections: '',
        germanTranslation: 'bevor',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'adire',
        inflections: 'adeo, adis, adii, aditum',
        germanTranslation: '1) hingehen; 2) sich wenden (an); 3) angreifen',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    // --- Unit 18 ---
    {
        latinWord: '^con^Lektion 18: Caesar Gallos superat',
        inflections: '',
        germanTranslation: '',
        relatedForeignWords: '',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'C. Iulius Caesar',
        inflections: 'Iulii Caesaris',
        germanTranslation: "Gaius Julius C\xe4sar",
        relatedForeignWords: "vgl. Kaiser, Zar; C. = altlateinisch f\xfcr Gaius",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'prudens (m./f./n.)',
        inflections: 'prudentis (2.F.)',
        germanTranslation: 'klug',
        relatedForeignWords: 'frz. prudent, ital. + span. prudente',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'quam',
        inflections: '',
        germanTranslation: 'als (nach Komparativ)',
        relatedForeignWords: 'vgl. Plusquamperfekt (= mehr als vergangen?)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'civitas',
        inflections: 'civitatis f.',
        germanTranslation: '1) Stamm; 2) Gemeinde; 3) Staat',
        relatedForeignWords: "vgl. engl. city, frz. cit\xe9, ital. citt\xe0, span. ciudad",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'Gallia',
        inflections: 'Galliae f.',
        germanTranslation: 'Gallien',
        relatedForeignWords: '-> das heutige Frankreich; frz. Gaule',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'tradere',
        inflections: 'trado 3, tradidi, traditum',
        germanTranslation: "1) ausliefern; 2) \xfcberliefern",
        relatedForeignWords: "vgl. Tradition (= \xdcberlieferung)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'se tradere',
        inflections: '',
        germanTranslation: 'sich ergeben',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'amicitia',
        inflections: 'amicitiae f.',
        germanTranslation: 'Freundschaft',
        relatedForeignWords: 'ital. amicizia; vgl. amicus, amica',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'legio',
        inflections: 'legionis f.',
        germanTranslation: 'Legion',
        relatedForeignWords: 'ca. 4000-6000 Mann',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'pauci/ae/a',
        inflections: '',
        germanTranslation: 'wenige',
        relatedForeignWords: 'frz. peu, ital. tutto; vgl. total',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'totus/a/um',
        inflections: '2.F. totius, 3.F. toti',
        germanTranslation: 'ganz',
        relatedForeignWords: 'frz. tout, ital. tutto; vgl. total',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'at',
        inflections: '',
        germanTranslation: 'aber',
        relatedForeignWords: '= autem, sed; <-> atque (ac) = "und"',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'auctoritas',
        inflections: 'auctoritatis f.',
        germanTranslation: 'Ansehen, Einfluss',
        relatedForeignWords: "vgl. Autorit\xe4t",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'omnis/e (Sg.)',
        inflections: '',
        germanTranslation: '1) jeder; 2) ganz',
        relatedForeignWords: "ital. ogni; vgl. omnipr\xe4sent",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'omnes (Pl. m./f.)',
        inflections: '2.F. omnium',
        germanTranslation: 'alle (Pl. m./f.)',
        relatedForeignWords: 'vgl. Omnibus (wortl. = "f\xfcr alle")',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'omnia (Pl. neutrum)',
        inflections: '',
        germanTranslation: 'alles (Sg. neutrum!)',
        relatedForeignWords: 'z. B. omnia scio = "ich wei\xdf alles"',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'proelium',
        inflections: 'proelii n.',
        germanTranslation: 'Schlacht',
        relatedForeignWords: 'z. B. proelium committere =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'qui, quae, quod',
        inflections: '(am Satzanfang)',
        germanTranslation: 'dieser, diese, dieses',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'circumvenire',
        inflections: 'circumvenio 4, circumveni, -ventum',
        germanTranslation: 'umzingeln',
        relatedForeignWords: 'circum ("herum-") + venire',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'advenire',
        inflections: 'advenio 4, -veni, -ventum',
        germanTranslation: 'hinkommen, ankommen',
        relatedForeignWords: 'vgl. Advent (= Ankunft Christi)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'frumentum',
        inflections: 'frumenti n.',
        germanTranslation: 'Getreide',
        relatedForeignWords: 'ital. frumento',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'concilium',
        inflections: 'concilii n.',
        germanTranslation: 'Versammlung',
        relatedForeignWords: 'vgl. Konzil; <-> consilium =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'honestus/a/um',
        inflections: '',
        germanTranslation: 'ehrenhaft, ehrenvoll',
        relatedForeignWords: 'engl. honest = "anst\xe4ndig", "ehrlich"',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'servitus',
        inflections: 'servitutis f.',
        germanTranslation: 'Sklaverei',
        relatedForeignWords: 'vgl. servus =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'aetas',
        inflections: 'aetatis f.',
        germanTranslation: '1) Alter; 2) Zeitalter, Zeit',
        relatedForeignWords: 'engl. span. edad',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'aut',
        inflections: '',
        germanTranslation: 'oder',
        relatedForeignWords: 'sobald',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'ubi (+ Perfekt)',
        inflections: '',
        germanTranslation: 'sobald',
        relatedForeignWords: 'wird als Fragewort =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'prior (m./f.), prius (n.)',
        inflections: '',
        germanTranslation: "der/die/das fr\xfchere",
        relatedForeignWords: "vgl. Priorit\xe4t (= Vorrang, Vorzug)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'acer/acris/acre',
        inflections: '',
        germanTranslation: '1) heftig; 2) spitz, scharf',
        relatedForeignWords: '<-> cepi (von capere M) = "ich habe gefangen"',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'incipere',
        inflections: 'incipio M, coepi, coeptum',
        germanTranslation: 'beginnen, anfangen',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    // --- Unit 19 ---
    {
        latinWord: '^con^Lektion 19: De Caesaris morte',
        inflections: '',
        germanTranslation: '',
        relatedForeignWords: '',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'maximus/a/um',
        inflections: '',
        germanTranslation: "der gr\xf6\xdfte, sehr gro\xdf",
        relatedForeignWords: 'vgl. maximal, maximieren, Maximum',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'potestas',
        inflections: 'potestatis f.',
        germanTranslation: 'Macht',
        relatedForeignWords: 'vgl. posse =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'dictator',
        inflections: 'dictatoris m.',
        germanTranslation: 'Diktator',
        relatedForeignWords: "Oberbefehlshaber in Kriegszeiten f\xfcr max. 6 Monate",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'perpetuus/a/um',
        inflections: '',
        germanTranslation: 'ununterbrochen, ewig',
        relatedForeignWords: 'dictator perpetuus = "Diktator auf Lebenszeit"',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'civis',
        inflections: 'civis m.',
        germanTranslation: "B\xfcrger",
        relatedForeignWords: 'vgl. Zivilist; civis =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'persuadere',
        inflections: 'persuadeo 2, persuasi, persuasum',
        germanTranslation: "1) \xfcberreden; 2) \xfcberzeugen",
        relatedForeignWords: 'engl. to persuade, frz. persuader, ital. persuadere',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'persuadeo tibi',
        inflections: '',
        germanTranslation: "ich \xfcberrede dich (Akk.!)",
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'mos',
        inflections: 'moris m.',
        germanTranslation: 'Sitte, Brauch',
        relatedForeignWords: 'vgl. Moral (Sittenlehre); mos, mortis =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'lex',
        inflections: 'legis f.',
        germanTranslation: 'Gesetz',
        relatedForeignWords: 'frz. loi, ital. legge, span. ley; vgl. legal, Legislative (= gesetzgebende Gewalt im Staat)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'libertas',
        inflections: 'libertatis f.',
        germanTranslation: 'Freiheit',
        relatedForeignWords: "engl. liberty, frz. libert\xe9, span. libertad; vgl. liberare =",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'melior (m./f.)',
        inflections: 'melius (n.)',
        germanTranslation: 'besser',
        relatedForeignWords: 'frz. meilleur, ital. miglior, span. mejor',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'caedes',
        inflections: 'caedis f.',
        germanTranslation: 'Ermordung, Mord',
        relatedForeignWords: 'frz. homicide, ital. omicidio; engl. homicide',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'vivere',
        inflections: 'vivo 3, vixi, -',
        germanTranslation: 'leben',
        relatedForeignWords: 'frz. vivre, ital. vivere, span. vivir; engl. to survive',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'facilis/e',
        inflections: '',
        germanTranslation: 'leicht',
        relatedForeignWords: 'frz. facile, ital. facile, span. facil; <-> difficilis =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'plurimi/ae/a',
        inflections: '',
        germanTranslation: 'die meisten',
        relatedForeignWords: 'Superlativ zu multi/ae/a, siehe Lec. 17',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'statuere',
        inflections: 'statuto 3, statui, statutum',
        germanTranslation: "1) beschlie\xdfen; 2) aufstellen",
        relatedForeignWords: 'vgl. constituere; vgl. Statuten (= beschlossene Richtlinien)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'futurus/a/um',
        inflections: '',
        germanTranslation: "zuk\xfcnftig",
        relatedForeignWords: 'vgl. engl. future, frz. futur, ital. + span. futuro',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'adesse',
        inflections: 'adsum, ades, adfui, -',
        germanTranslation: 'da sein, anwesend sein',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'quidem',
        inflections: '',
        germanTranslation: 'zwar, freilich',
        relatedForeignWords: '<-> ne ... quidem =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'iste, ista, istud',
        inflections: '',
        germanTranslation: 'dieser/es (da)',
        relatedForeignWords: "absch\xe4tzig gemeint! (Deklination wie ille/illa/illud, S. 72)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'defendere',
        inflections: 'defendo 3, defendi, defensum',
        germanTranslation: 'verteidigen',
        relatedForeignWords: "frz. d\xe9fendre, ital. difendere, span. defender; vgl. defensiv",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'vulnus',
        inflections: 'vulneris n.',
        germanTranslation: 'Wunde',
        relatedForeignWords: 'engl. vulnerable (= verletzlich, verwundbar)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'ultimus/a/um',
        inflections: '',
        germanTranslation: 'der/die/das letzte',
        relatedForeignWords: 'vgl. Ultimatum (= letzte Aufforderung)',
        selected: true,
        probability: 1
    },
    // --- Unit 20 ---
    {
        latinWord: '^con^Lektion 20: De Cleopatra',
        inflections: '',
        germanTranslation: '',
        relatedForeignWords: '',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'convenire',
        inflections: 'convenio 4, conveni, conventum',
        germanTranslation: 'zusammenkommen',
        relatedForeignWords: 'vgl. Konvent (= Klostergemeinde; Zusammenkunft)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'mulier',
        inflections: 'mulieris f.',
        germanTranslation: 'Frau',
        relatedForeignWords: 'span. mujer, vgl. ital. moglie (= "Ehefrau")',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'finis (Sg.)',
        inflections: 'finis m.',
        germanTranslation: '1) Grenze; 2) Ende',
        relatedForeignWords: 'vgl. Finale (= Endspiel)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'fines (Pl.)',
        inflections: 'finium m.',
        germanTranslation: 'Gebiet(e)',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'regnum',
        inflections: 'regni n.',
        germanTranslation: "1) K\xf6nigreich, Reich; 2) Herrschaft",
        relatedForeignWords: 'vgl. engl. reign ("Herrschaft")',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'augere',
        inflections: 'augeo 2, auxi, auctum',
        germanTranslation: "vergr\xf6\xdfern, steigern, vermehren",
        relatedForeignWords: 'vgl. Auktion (= Versteigerung)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'donum',
        inflections: 'doni n.',
        germanTranslation: 'Geschenk',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'mihi gaudio est',
        inflections: '',
        germanTranslation: 'es bereitet mir Freude',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'ingens (m./f./n.)',
        inflections: 'ingentis (2.F.)',
        germanTranslation: 'riesig, gewaltig',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'ante (Adv.)',
        inflections: '',
        germanTranslation: "vorher, fr\xfcher",
        relatedForeignWords: "span. antes; <-> ante (Pr\xe4p.)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'clades',
        inflections: 'cladis f.',
        germanTranslation: 'Niederlage',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'classis',
        inflections: 'classis f.',
        germanTranslation: 'Flotte',
        relatedForeignWords: 'auch: "Abteilung" (davon "Klasse")',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'animadvertere',
        inflections: 'animadverto 3, animadverti, -versum',
        germanTranslation: 'bemerken, wahrnehmen',
        relatedForeignWords: 'aus: animum ad ... vertere (w\xf6rtl.: "den Geist hinwenden zu ...")',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'cedere',
        inflections: 'cedo 3, cessi, cessum',
        germanTranslation: 'weggehen, weichen',
        relatedForeignWords: "vgl. Rezession (= R\xfcckgang der Wirtschaft)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'claudere',
        inflections: 'claudo 3, clausi, clausum',
        germanTranslation: "einschlie\xdfen; schlie\xdfen",
        relatedForeignWords: 'ital. chiudere; vgl. Klausur, Numerus clausus',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'custos',
        inflections: 'custodis m.',
        germanTranslation: "W\xe4chter",
        relatedForeignWords: "ital. custode; vgl. K\xfcster (= Kirchendiener)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'ponere',
        inflections: 'pono 3, posui, positum',
        germanTranslation: 'stellen, legen',
        relatedForeignWords: 'engl. to put, span. poner; vgl. Position (= Lage)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'enim',
        inflections: '(nachgestellt!)',
        germanTranslation: "denn, n\xe4mlich",
        relatedForeignWords: 'z. B. tu enim = nam tu ("denn du")',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'auferre',
        inflections: 'aufero, aufers, abstuli, ablatum',
        germanTranslation: 'wegtragen, wegnehmen',
        relatedForeignWords: 'aus: ab + ferre (= davontragen) vgl. "Ablativ" (dr\xfcckt eine Trennung aus)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'serva',
        inflections: 'servae f.',
        germanTranslation: 'Sklavin',
        relatedForeignWords: 'vgl. servus, -i =',
        selected: true,
        probability: 1
    },
    // --- Unit 21 ---
    {
        latinWord: '^con^Lektion 21: De Paridis iudicio',
        inflections: '',
        germanTranslation: '',
        relatedForeignWords: '',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'praeter (+ Akk.)',
        inflections: '',
        germanTranslation: "au\xdfer",
        relatedForeignWords: 'ital. + span. discordia; <=> concordia =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'discordia',
        inflections: 'discordiae f.',
        germanTranslation: 'Zwietracht, Streit',
        relatedForeignWords: 'ital. + span. discordia; <=> concordia =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'controversia',
        inflections: 'controversiae f.',
        germanTranslation: 'Auseinandersetzung',
        relatedForeignWords: 'vgl. Kontroverse; aus: contra + verterel',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'iacere',
        inflections: 'iacio M, ieci, iactum',
        germanTranslation: 'werfen, schleudern',
        relatedForeignWords: 'vgl. projizieren, Projektor',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'Venus',
        inflections: 'Veneris f.',
        germanTranslation: "G\xf6ttin der Liebe (griech.: Aphrodite)",
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'certare',
        inflections: 'certo 1, -avi, -atum',
        germanTranslation: '1) streiten; 2) wetteifern',
        relatedForeignWords: 'vgl. Kon-zert',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'iudicare',
        inflections: 'iudico 1, -avi, -atum',
        germanTranslation: '1) urteilen, beurteilen; 2) richten',
        relatedForeignWords: 'vgl. iudicium, -i =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'deligere',
        inflections: 'deligo 3, -legi, -lectum',
        germanTranslation: "ausw\xe4hlen",
        relatedForeignWords: 'engl. election (= Wahl)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'praemium',
        inflections: 'praemii n.',
        germanTranslation: 'Belohnung, Preis',
        relatedForeignWords: "Pr\xe4mie, pr\xe4mieren",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'praeterea (Adv.)',
        inflections: '',
        germanTranslation: "au\xdferdem",
        relatedForeignWords: 'aus: praeter + ea (w\xf6rtl.: "au\xdfer diesem")',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'dives (m./f./n.)',
        inflections: 'divitis (2.F.)',
        germanTranslation: 'reich',
        relatedForeignWords: 'vgl. divitate, -arum =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'fortitudo',
        inflections: 'fortitudinis f.',
        germanTranslation: 'Tapferkeit',
        relatedForeignWords: 'vgl. fortis/e =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'quia',
        inflections: '',
        germanTranslation: 'weil',
        relatedForeignWords: '= quod (Einleitung eines Kausalsatzes)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'Graecia',
        inflections: 'Graeciae f.',
        germanTranslation: 'Griechenland',
        relatedForeignWords: '<=> Graeci, -orum =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'decernere',
        inflections: 'decerno 3, decrevi, decretum',
        germanTranslation: "beschlie\xdfen",
        relatedForeignWords: 'vgl. Dekret (= amtlicher Beschluss)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'eo (Adv.)',
        inflections: '',
        germanTranslation: 'dorthin',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'fides',
        inflections: 'fidei f.',
        germanTranslation: 'Treue, Vertrauen (hier: Schutz)',
        relatedForeignWords: 'ital. fede',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'mandare',
        inflections: 'mando 1, -avi, -atum',
        germanTranslation: 'anvertrauen',
        relatedForeignWords: 'vgl. Mandant; eigentl.: in manum dare',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'occasio',
        inflections: 'occasionis f.',
        germanTranslation: 'Gelegenheit',
        relatedForeignWords: "engl. occasion, frz. occasion, span. ocasi\xf3n",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'iungere',
        inflections: 'iungo 3, iunxi, iunctum',
        germanTranslation: 'verbinden',
        relatedForeignWords: 'vgl. con-iungere =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'maritus',
        inflections: 'mariti m.',
        germanTranslation: 'Gatte, Ehemann',
        relatedForeignWords: 'frz. mari, ital. marito, span. marido',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'aut ... aut',
        inflections: '',
        germanTranslation: 'entweder ... oder',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'eiusmodi',
        inflections: '(= huiusmodi)',
        germanTranslation: 'derartig',
        relatedForeignWords: 'w\xf6rtl.: "dieser Art"; vgl. modus, Lec. 12',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'Troia',
        inflections: 'Troiae f.',
        germanTranslation: 'Troja',
        relatedForeignWords: '(siehe De Graecis S. 106)',
        selected: true,
        probability: 1
    },
    // --- Unit 22 ---
    {
        latinWord: '^con^Lektion 22: De ira Achillis',
        inflections: '',
        germanTranslation: '',
        relatedForeignWords: '',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'ira',
        inflections: 'irae f.',
        germanTranslation: 'Zorn',
        relatedForeignWords: 'ital. + span. ira; vgl. iratus/a/um =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'moenia (Pl.)',
        inflections: 'moenium n. (3. Dekl.)',
        germanTranslation: '(Stadt-)Mauern',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'altus/a/um',
        inflections: '',
        germanTranslation: '1) hoch; 2) tief',
        relatedForeignWords: 'ital. alto; vgl. Altstimme (tiefe Frauenstimme)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'ut (+ Konj.)',
        inflections: '',
        germanTranslation: 'dass; damit; sodass',
        relatedForeignWords: '(siehe Grammatica)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'Troiani (Pl.)',
        inflections: 'Troianorum m.',
        germanTranslation: 'die Trojaner',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'tenere',
        inflections: 'teneo 2, tenui, -',
        germanTranslation: 'halten',
        relatedForeignWords: 'ital. tenere, span. tener',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'abstinere',
        inflections: 'abstineo 2, abstinui, -',
        germanTranslation: '(sich) fernhalten (von)',
        relatedForeignWords: 'vgl. abstinent (= enthaltsam)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'imperium',
        inflections: 'imperii n.',
        germanTranslation: '1) Befehl; 2) Herrschaft; 3) Reich',
        relatedForeignWords: 'engl. empire, frz. empire, vgl. Imperativ, Imperialismus',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'obtinere',
        inflections: 'obtineo 2, obtinui, -',
        germanTranslation: 'innehalten, besitzen',
        relatedForeignWords: 'engl. to obtain',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'incendere',
        inflections: 'incendo 3, incendi, incensum',
        germanTranslation: "anz\xfcnden",
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'ne (+ Konj.)',
        inflections: '',
        germanTranslation: 'dass nicht; damit nicht',
        relatedForeignWords: '(siehe Grammatica)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'putare',
        inflections: 'puto 1, putavi, putatum',
        germanTranslation: "1) glauben; 2) halten f\xfcr",
        relatedForeignWords: 'puto te amicum = "ich halte dich f\xfcr einen Freund"',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'interesse (+ Dat.)',
        inflections: 'intersum, interfui, -',
        germanTranslation: 'bewohnen, teilnehmen (an)',
        relatedForeignWords: 'Interesse (geistig bei etwas dabei sein)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'complures (m./f.), complura (n.)',
        inflections: '',
        germanTranslation: 'mehrere',
        relatedForeignWords: '<-> plurimi/ae/a = "die meisten"',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'caedere',
        inflections: 'caedo 3, cecidi, caesum',
        germanTranslation: "(f\xe4llen =) t\xf6ten",
        relatedForeignWords: 'vgl. caedes, -is =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'deponere',
        inflections: 'depono 3, deposui, depositum',
        germanTranslation: 'ablegen, weglegen',
        relatedForeignWords: 'vgl. deponieren, Deponie',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'equus',
        inflections: 'equi m.',
        germanTranslation: 'Pferd',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'trahere',
        inflections: 'traho 3, traxi, tractum',
        germanTranslation: 'ziehen',
        relatedForeignWords: 'vgl. Traktor, subtrahieren ("ab-ziehen")',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'magis (Adv.)',
        inflections: '',
        germanTranslation: 'mehr',
        relatedForeignWords: 'vgl. magister (w\xf6rt.: einer, der "mehr" ist)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'preces (Pl.)',
        inflections: 'precum f. (3. Dekl.)',
        germanTranslation: 'die Bitten',
        relatedForeignWords: 'vgl. ital. pregare',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'aurum',
        inflections: 'auri n.',
        germanTranslation: 'Gold',
        relatedForeignWords: "chem. Zeichen f\xfcr Gold = Au",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'frater',
        inflections: 'fratris m.',
        germanTranslation: 'Bruder',
        relatedForeignWords: "frz. fr\xe8re, ital. fratello",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'Apollo',
        inflections: 'Apollinis m.',
        germanTranslation: 'Apoll',
        relatedForeignWords: "griech.-r\xf6m. Gott der Weissagungskunst",
        selected: true,
        probability: 1
    },
    // --- Unit 23 ---
    {
        latinWord: '^con^Lektion 23: De equo Troiano',
        inflections: '',
        germanTranslation: '',
        relatedForeignWords: '',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'Troianus/a/um',
        inflections: '',
        germanTranslation: 'trojanisch',
        relatedForeignWords: '<-> Troiani, -orum =',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'Ulixes',
        inflections: "Uli\u0445is m.",
        germanTranslation: 'Odysseus',
        relatedForeignWords: 'vgl. James Joyces Roman "Ulysses"',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'etsi',
        inflections: '',
        germanTranslation: 'wenn auch, obwohl',
        relatedForeignWords: '',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'firmus/a/um',
        inflections: '',
        germanTranslation: 'stark',
        relatedForeignWords: 'vgl. Firmung (= "St\xe4rkung" im Glauben)',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'numquam (Adv.)',
        inflections: '',
        germanTranslation: 'niemals',
        relatedForeignWords: 'span. nunca',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'includere',
        inflections: 'includo 3, inclusi, inclusum',
        germanTranslation: "einschlie\xdfen",
        relatedForeignWords: 'vgl. Inkludieren; inklusive',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'cum (+ Konj.)',
        inflections: '',
        germanTranslation: '1) als; 2) weil; 3) obwohl',
        relatedForeignWords: '(siehe Grammatica)',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'apparere',
        inflections: 'appareo 2, apparui, -',
        germanTranslation: 'erscheinen',
        relatedForeignWords: 'engl. to appear, ital. apparire, span. aparecer',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'intra (+ Akk.)',
        inflections: '',
        germanTranslation: 'innerhalb',
        relatedForeignWords: "vgl. internus, intramuskul\xe4r etc.",
        probability: 0,
        selected: false
    },
    {
        latinWord: 'favere (+ Dat.)',
        inflections: 'faveo 2, favi, fautum',
        germanTranslation: "beg\xfcnstigen, bevorzugen",
        relatedForeignWords: 'vgl. favorisieren',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'arx',
        inflections: 'arcis f.',
        germanTranslation: 'Burg',
        relatedForeignWords: 'ars, artis =',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'victoria',
        inflections: 'victoriae f.',
        germanTranslation: 'Sieg',
        relatedForeignWords: 'frz. victoire, ital. vittoria, span. victoria',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'vinum',
        inflections: 'vini n.',
        germanTranslation: 'Wein',
        relatedForeignWords: 'frz. vin, ital. + span. vino',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'celebrare',
        inflections: 'celebro 1, -avi, -atum',
        germanTranslation: 'feiern',
        relatedForeignWords: 'vgl. zelebrieren, engl. celebrities',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'universus/a/um',
        inflections: '',
        germanTranslation: 'alle (gemeinsam)',
        relatedForeignWords: 'ital. universale; vgl. universal',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'interea (Adv.)',
        inflections: '',
        germanTranslation: 'inzwischen',
        relatedForeignWords: 'aus: inter + ea = "zwischen diesen (Dingen)"',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'redire',
        inflections: 'redeo, redii, reditum',
        germanTranslation: "zur\xfcckkehren",
        relatedForeignWords: '-> reddere 3, reddidi, redditum =',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'aperire',
        inflections: 'aperio 4, aperui, apertum',
        germanTranslation: "\xf6ffnen",
        relatedForeignWords: 'frz. ouvrir, ital. aprire, span. abrir, vgl. Aperitif',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'flamma',
        inflections: 'flammae f.',
        germanTranslation: 'Flamme',
        relatedForeignWords: 'ital. fiamma (fiammifero = Streichholz)',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'consumere',
        inflections: 'consumo 3, consumpsi, consumptum',
        germanTranslation: '1) vernichten; 2) verbrauchen',
        relatedForeignWords: 'vgl. konsumieren, Konsument, Konsum',
        probability: 0,
        selected: false
    },
    // --- Unit 24 ---
    {
        latinWord: '^con^Lektion 24: De Cassandra',
        inflections: '',
        germanTranslation: '',
        relatedForeignWords: '',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'velle',
        inflections: 'volo, vis, volui, -',
        germanTranslation: 'wollen',
        relatedForeignWords: '(siehe Grammatica); frz. vouloir, ital. volere',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'nolle',
        inflections: 'nolo, non vis, nolui, -',
        germanTranslation: 'nicht wollen',
        relatedForeignWords: '(siehe Grammatica)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'Noli me tangere!',
        inflections: '(Verbot mit noli)',
        germanTranslation: "Ber\xfchr mich nicht!",
        relatedForeignWords: 'Das sagte Jesus nach seiner Auferstehung zu Maria Magdalena.',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'verus/a/um',
        inflections: '',
        germanTranslation: 'wahr, echt',
        relatedForeignWords: 'frz. vrai, ital. vero, span. verdadero',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'promittere',
        inflections: 'promitto 3, promisi, promissum',
        germanTranslation: 'versprechen',
        relatedForeignWords: 'engl. to promise, frz. promettre, ital. promettere, span. prometer',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'sperare',
        inflections: 'spero 1, -avi, -atum',
        germanTranslation: 'hoffen, erhoffen',
        relatedForeignWords: "frz. esp\xe9rer, ital. sperare, span. esperar",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'praebere',
        inflections: 'praebeo 2, -ui, -itum',
        germanTranslation: 'bieten, anbieten, geben',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'scientia',
        inflections: 'scientiae f.',
        germanTranslation: 'Wissen, Kenntnis',
        relatedForeignWords: 'vgl. scire; engl. science, frz. science, ital. scienza, span. ciencia',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'usus',
        inflections: 'usus m.',
        germanTranslation: '1) Nutzen; 2) Gebrauch',
        relatedForeignWords: 'engl. use, frz. utilit\xe9; vgl. "es ist Usus" =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'usui esse',
        inflections: '(Zweckdativ)',
        germanTranslation: "n\xfctzlich sein",
        relatedForeignWords: 'w\xf6rtl. = "zum Nutzen sein"',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'veritas',
        inflections: 'veritatis f.',
        germanTranslation: 'Wahrheit',
        relatedForeignWords: "frz. v\xe9rit\xe9, ital. verit\xe0, span. verdad",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'credere',
        inflections: 'credo 3, credidi, creditum',
        germanTranslation: 'glauben',
        relatedForeignWords: "ital. credere; vgl. Credo, Kredit (Gl\xe4ubiger)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'inde (Adv.)',
        inflections: '',
        germanTranslation: '1) von da an; 2) von dort',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'ardere',
        inflections: 'ardeo 2, arsi, -',
        germanTranslation: 'brennen',
        relatedForeignWords: 'vgl. ital. ardente, span. ardiente = brennend',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'tacere',
        inflections: 'taceo 2, -ui, -',
        germanTranslation: 'schweigen',
        relatedForeignWords: 'frz. taire, ital. tacere',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'interire',
        inflections: 'intereo, interii, interitum',
        germanTranslation: 'sterben, untergehen',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'errare',
        inflections: 'erro 1, -avi, -atum',
        germanTranslation: 'irren, sich irren',
        relatedForeignWords: 'ital. errare; vgl. engl. error',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'tollere',
        inflections: 'tollo 3, sustuli, sublatum',
        germanTranslation: 'aufheben, (er)heben',
        relatedForeignWords: '<-> tolerare 1 = ertragen',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'orare',
        inflections: 'oro 1, -avi, -atum',
        germanTranslation: '1) (er)bitten; 2) beten',
        relatedForeignWords: 'ital. orare, span. orar; vgl. Oratorium',
        selected: true,
        probability: 1
    },
    // --- Unit 25 ---
    {
        latinWord: '^con^Lektion 25: De Ulixe',
        inflections: '',
        germanTranslation: '',
        relatedForeignWords: '',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'poeta',
        inflections: 'poetae m.',
        germanTranslation: 'Dichter',
        relatedForeignWords: "Poet; frz. po\xe8te, ital. + span. poeta",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'pervenire',
        inflections: 'pervenio 4, perveni, perventum',
        germanTranslation: 'kommen, gelangen',
        relatedForeignWords: 'w\xf6rtl.: "durchkommen"',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'inire',
        inflections: 'ineo, inii, initum',
        germanTranslation: 'hineingehen, betreten',
        relatedForeignWords: 'vgl. etwas initiieren (= in Angriff nehmen), Initiative, Initialen (= Anfangsbuchstaben)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'exitus',
        inflections: 'exitus m.',
        germanTranslation: '1) Ausgang; 2) Ende, Tod',
        relatedForeignWords: 'engl. exit',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'dulcis/e',
        inflections: '',
        germanTranslation: "s\xfc\xdf",
        relatedForeignWords: 'frz. doux/douce, ital. dolce (= Nachspeise)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'forte (Adv.)',
        inflections: '',
        germanTranslation: "zuf\xe4llig",
        relatedForeignWords: '<=> fortis/e =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'postulare',
        inflections: 'postulo 1, -avi, -atum',
        germanTranslation: 'fordern',
        relatedForeignWords: 'vgl. postulieren, Postulat (= Forderung)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'gratia',
        inflections: 'gratiae f.',
        germanTranslation: 'Dank',
        relatedForeignWords: 'ital. grazie, span. gracias; vgl. gratis (Abl.): "um den (blo\xdfen) Dank"',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'gratias agere',
        inflections: '',
        germanTranslation: 'danken, Dank sagen',
        relatedForeignWords: 'w\xf6rtl.: "Dank tun"',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'tandem',
        inflections: '',
        germanTranslation: "endlich, schlie\xdflich",
        relatedForeignWords: '= postremo, denique; <=> tamen =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'plenus/a/um',
        inflections: '(+ Gen.)',
        germanTranslation: 'voll (mit/von)',
        relatedForeignWords: 'frz. plein, ital. pieno, span. lleno; vgl. das Plenum (= die Vollversammlung)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'ignis',
        inflections: 'ignis m.',
        germanTranslation: 'Feuer',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'sumere',
        inflections: 'sumo 3, sumpsi, sumptum',
        germanTranslation: 'nehmen',
        relatedForeignWords: 'vgl. consumere =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'frons',
        inflections: 'frontis f.',
        germanTranslation: 'Stirn',
        relatedForeignWords: 'ital. fronte, span. frente; vgl. Front, frontal',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'laedere',
        inflections: 'laedo 3, laesi, laesum',
        germanTranslation: 'verletzen',
        relatedForeignWords: "vgl. l\xe4diert =",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'vero',
        inflections: '',
        germanTranslation: 'aber',
        relatedForeignWords: 'versus/a/um (Adjektiv) =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'constat',
        inflections: 'constitit, -',
        germanTranslation: 'es steht fest (+ ACI: dass)',
        relatedForeignWords: "vgl. konstant, Konstante (= unver\xe4nderbarer Wert)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'posterus/a/um',
        inflections: '',
        germanTranslation: 'folgend, nachfolgend',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'postero die',
        inflections: '(Zeitablativ)',
        germanTranslation: 'am folgenden Tag',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'diligens (m./f./n.)',
        inflections: 'diligentis (2.F.)',
        germanTranslation: "sorgf\xe4ltig, genau",
        relatedForeignWords: 'engl. diligent, ital. + span. diligente',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'prodesse',
        inflections: 'prosum, prodes, profui, -',
        germanTranslation: "n\xfctzen",
        relatedForeignWords: 'vgl. Prosit! (= "Es soll dir n\xfctzen!")',
        selected: true,
        probability: 1
    },
    // --- Unit 26 ---
    {
        latinWord: '^con^Lektion 26: De incendio Romae',
        inflections: '',
        germanTranslation: '',
        relatedForeignWords: '',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'incendium',
        inflections: 'incendii n.',
        germanTranslation: 'Brand',
        relatedForeignWords: 'ital. + span. incendio; vgl. incendere =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'princeps',
        inflections: 'principis m.',
        germanTranslation: '1) der Erste; 2) Prinzeps, Kaiser',
        relatedForeignWords: "vgl. Prinz, der Prinzipat (= r\xf6mische Kaiserzeit)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'gravis/e',
        inflections: '',
        germanTranslation: 'schwer; schwerwiegend',
        relatedForeignWords: 'gravierend, frz. grave, ital. + span. grave',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'existere',
        inflections: 'existo 3, exstiti, -',
        germanTranslation: 'entstehen',
        relatedForeignWords: 'engl. to exist, ital. esistere, span. existir; vgl. existieren, Existenz',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'auctor',
        inflections: 'auctoris m.',
        germanTranslation: '1) Autor; 2) Urheber, Anstifter',
        relatedForeignWords: '(> S. 141); frz. auteur, ital. autore, span. autor; vgl. auctoritas, -atis =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'vastare',
        inflections: 'vasto 1, -avi, -atum',
        germanTranslation: "verw\xfcsten",
        relatedForeignWords: "vgl. devastieren (= v\xf6llig zerst\xf6ren)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'numerus',
        inflections: 'numeri m.',
        germanTranslation: 'Zahl, Anzahl',
        relatedForeignWords: 'Nummer; vgl. Numerus clausus',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'privatus/a/um',
        inflections: '',
        germanTranslation: 'privat',
        relatedForeignWords: "frz. priv\xe9, ital. privato, span. privado",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'publicus/a/um',
        inflections: '',
        germanTranslation: "\xf6ffentlich",
        relatedForeignWords: "engl. public; vgl. publizieren (= ver\xf6ffentlichen)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'fama',
        inflections: 'famae f.',
        germanTranslation: "1) Ger\xfccht; 2) Ruf",
        relatedForeignWords: "ital. + span. fama; vgl. famos (= gro\xdfartig)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'fama erat',
        inflections: '',
        germanTranslation: "es gab das Ger\xfccht",
        relatedForeignWords: 'est sunt kann auch "es gibt" bedeuten!',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'magnitudo',
        inflections: 'magnitudinis f.',
        germanTranslation: "Gr\xf6\xdfe",
        relatedForeignWords: 'frz. magnitude',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'ornare',
        inflections: 'orno 1, -avi, -atum',
        germanTranslation: "schm\xfccken",
        relatedForeignWords: 'ital. ornare, vgl. Ornament (= Verzierung)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'postea (Adv.)',
        inflections: '',
        germanTranslation: "sp\xe4ter",
        relatedForeignWords: '<=> post (+ Akk.) =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'appellare',
        inflections: 'appello 1, -avi, -atum (+ Gen.)',
        germanTranslation: '1) nennen; 2) rufen',
        relatedForeignWords: 'frz. appeler, vgl. Appell (= Aufruf)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'cupidus/a/um',
        inflections: '',
        germanTranslation: 'gierig (nach)',
        relatedForeignWords: 'vgl. cupiditas, -atis =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'cupidus gloriae',
        inflections: '',
        germanTranslation: 'gierig nach Ruhm',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'condere',
        inflections: 'condo 3, condidi, conditum',
        germanTranslation: "gr\xfcnden",
        relatedForeignWords: 'vgl. urbe condita (a. u. c., siehe unten)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'usque ad (+ Akk.)',
        inflections: '',
        germanTranslation: 'bis zu',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'iussu',
        inflections: '',
        germanTranslation: 'auf Befehl',
        relatedForeignWords: 'vgl. iubere, iussi, iussum =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'Christianus/i',
        inflections: 'Christianorum m.',
        germanTranslation: 'die Christen',
        relatedForeignWords: "frz. chr\xe9tiens, ital. cristiani, span. cristianos",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'crimen',
        inflections: 'criminis n.',
        germanTranslation: '1) Verbrechen; 2) Vorwurf',
        relatedForeignWords: "frz. crime, ital. crimine, span. crimen, engl. crime; vgl. Kriminalit\xe4t, kriminell",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'accusare',
        inflections: 'accuso 1, -avi, -atum',
        germanTranslation: 'anklagen',
        relatedForeignWords: 'engl. to accuse, frz. accuser, ital. accusare',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'quasi',
        inflections: '',
        germanTranslation: 'gleichsam (als), wie',
        relatedForeignWords: '<=> ital. quasi, span. casi = "fast"!',
        selected: true,
        probability: 1
    },
    // --- Unit 27 ---
    {
        latinWord: '^con^Lektion 27: De martyrio sancti Petri',
        inflections: '',
        germanTranslation: '',
        relatedForeignWords: '',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'sanctus/a/um',
        inflections: '',
        germanTranslation: 'heilig',
        relatedForeignWords: 'engl. saint, frz. saint; vgl. Sankt Stefan (etc.)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'cultus',
        inflections: 'cultus m.',
        germanTranslation: 'Verehrung',
        relatedForeignWords: "vgl. Kult (= religi\xf6se Verehrung)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'dubitare',
        inflections: 'dubito 1, -avi, -atum',
        germanTranslation: "1) z\xf6gern; 2) zweifeln",
        relatedForeignWords: 'engl. to doubt, ital. dubitare, span. dudar',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'commovere',
        inflections: 'commoveo 2, commovi, commotum',
        germanTranslation: '1) (heftig) bewegen; 2) veranlassen',
        relatedForeignWords: 'vgl. movere =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'fuga',
        inflections: 'fugae f.',
        germanTranslation: 'Flucht',
        relatedForeignWords: 'vgl. fugere; Refugium (= Zufluchtsort), Zentrifuge',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'proximus/a/um',
        inflections: '',
        germanTranslation: "der n\xe4chste",
        relatedForeignWords: "frz. prochain, ital. prossimo, span. pr\xf3ximo",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'repente (Adv.)',
        inflections: '',
        germanTranslation: "pl\xf6tzlich",
        relatedForeignWords: '= subito; span. de repente',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'obviam (Adv.)',
        inflections: '',
        germanTranslation: 'entgegen',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'videtur (+ Inf.)',
        inflections: '',
        germanTranslation: 'er/sie/es scheint',
        relatedForeignWords: '(NCI, siehe Grammatica)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'dominus',
        inflections: 'domini m.',
        germanTranslation: 'Herr',
        relatedForeignWords: 'vgl. dominieren =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'quo',
        inflections: '',
        germanTranslation: 'wohin',
        relatedForeignWords: '<=> eo =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'vadere',
        inflections: 'vado 3, -',
        germanTranslation: 'gehen',
        relatedForeignWords: 'vgl. Invasion (= kriegerischer Einmarsch)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'dicitur (+ Inf.)',
        inflections: '',
        germanTranslation: 'er/sie/es soll (angeblich)',
        relatedForeignWords: '(NCI, siehe Grammatica)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'lacrima',
        inflections: 'lacrimae f.',
        germanTranslation: "Tr\xe4ne",
        relatedForeignWords: 'frz. larme, ital. lacrima',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'referre',
        inflections: 'refero, rettuli, relatum',
        germanTranslation: "1) zur\xfcckbringen; 2) berichten",
        relatedForeignWords: 'vgl. referieren, Referent',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'sic',
        inflections: '',
        germanTranslation: 'so',
        relatedForeignWords: '= ita, tam',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'salus',
        inflections: 'salutis f.',
        germanTranslation: "1) Heil, Rettung; 2) Gru\xdf",
        relatedForeignWords: 'vgl. salutieren; Salut!',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'mundus',
        inflections: 'mundi m.',
        germanTranslation: 'Welt',
        relatedForeignWords: 'frz. monde, ital. mondo, span. mundo; vgl. Minimmundus',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'dignus/a/um',
        inflections: '(+ Abl.)',
        germanTranslation: "w\xfcrdig (+ Gen.)",
        relatedForeignWords: 'ital. degno, frz. digne, span. digno; vgl. engl. dignity =',
        selected: true,
        probability: 1
    },
    // --- Unit 28 ---
    {
        latinWord: '^con^Lektion 28: De Marco Aurelio',
        inflections: '',
        germanTranslation: '',
        relatedForeignWords: '',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'dividere',
        inflections: 'divido 3, divisi, divisum',
        germanTranslation: 'trennen, teilen',
        relatedForeignWords: 'engl. to divide; vgl. dividieren, Division',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'transire',
        inflections: 'transeo, transii, transitum',
        germanTranslation: "\xfcberqueren, hin\xfcbergehen",
        relatedForeignWords: 'aus: trans + ire; vgl. Transitverkehr',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'gens',
        inflections: 'gentis f.',
        germanTranslation: 'Volk',
        relatedForeignWords: 'frz. gens, ital. + span. gente (= Leute) -> genus, -eris n.',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'traducere',
        inflections: 'traduco 3, traduxi, traductum',
        germanTranslation: "hin\xfcberf\xfchren",
        relatedForeignWords: 'aus: trans + ducere',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'adhuc (Adv.)',
        inflections: '',
        germanTranslation: 'bis jetzt; bisher',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'felix (m./f./n.)',
        inflections: 'felicis (2.F.)',
        germanTranslation: "gl\xfccklich, erfolgreich",
        relatedForeignWords: "ital. felice, span. feliz; vgl. frz. f\xe9licit\xe9",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'fortuna',
        inflections: 'fortunae f.',
        germanTranslation: "1) Gl\xfcck; 2) Schicksal",
        relatedForeignWords: 'engl. + frz. fortune, ital. + span. fortuna',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'eques',
        inflections: 'equitis m.',
        germanTranslation: 'Reiter; Ritter',
        relatedForeignWords: '<=> equus, -i',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'campus',
        inflections: 'campi m.',
        germanTranslation: 'Feld',
        relatedForeignWords: 'frz. champ, vgl. Camping, der Uni-Campus',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'aestas',
        inflections: 'aestatis f.',
        germanTranslation: 'Sommer',
        relatedForeignWords: "frz. \xe9t\xe9, ital. estate; <=> aetas, -atis f. =",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'deesse',
        inflections: 'desum, dees, defui, -',
        germanTranslation: 'fehlen',
        relatedForeignWords: 'w\xf6rtl.: "weg sein"',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'fessus/a/um',
        inflections: '',
        germanTranslation: "ersch\xf6pft, m\xfcde",
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'vix (Adv.)',
        inflections: '',
        germanTranslation: 'kaum',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'ullus/a/um',
        inflections: 'ullius (2.F.), ulli (3.F.)',
        germanTranslation: 'irgend ein(e)',
        relatedForeignWords: '<=> nullus =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'spes',
        inflections: 'spei f.',
        germanTranslation: 'Hoffnung',
        relatedForeignWords: 'frz. espoir, ital. speranza, span. esperanza; vgl. sperare =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'rogare',
        inflections: 'rogo 1, -avi, -atum',
        germanTranslation: '1) bitten; 2) fragen',
        relatedForeignWords: 'vgl. interrogare =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'divinus/a/um',
        inflections: '',
        germanTranslation: "g\xf6ttlich",
        relatedForeignWords: 'engl. divine, frz. divin, ital. + span. divino; vgl. Diva',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'ecce!',
        inflections: '',
        germanTranslation: 'siehe!',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'miraculum',
        inflections: 'miraculi n.',
        germanTranslation: 'Wunder',
        relatedForeignWords: 'engl. miracle; vgl. Mirakel, Miraculus (Zauberei!)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'accidere',
        inflections: 'accido 3, accidi, -',
        germanTranslation: 'geschehen',
        relatedForeignWords: 'vgl. engl. accident =',
        selected: true,
        probability: 1
    },
    // --- Unit 29 ---
    {
        latinWord: '^con^Lektion 29: De Constantino victore',
        inflections: '',
        germanTranslation: '',
        relatedForeignWords: '',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'victor',
        inflections: 'victoris m.',
        germanTranslation: 'siegreich; Sieger',
        relatedForeignWords: 'vgl. Viktor; <=> victoria, -ae =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'civilis/e',
        inflections: '',
        germanTranslation: "b\xfcrgerlich; B\xfcrger-",
        relatedForeignWords: 'vgl. zivil, engl. + frz. civil, ital. civile, span. civil',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'metuere',
        inflections: 'metuo 3, metui, -',
        germanTranslation: "f\xfcrchten",
        relatedForeignWords: 'ital. temere, span. temer',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'oraculum',
        inflections: 'oraculi n.',
        germanTranslation: 'Orakel(spruch)',
        relatedForeignWords: 'frz. oracle, ital. oracolo, span. oraculo',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'extra (+ Akk.)',
        inflections: '',
        germanTranslation: "au\xdferhalb",
        relatedForeignWords: 'vgl. E.T. = Extraterrestris, das Extra, extravagant Pronominale Deklination (S. 72)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'uterque, utraque, utrumque',
        inflections: 'utriusque (2.F.), utrique (3.F.)',
        germanTranslation: 'jeder von beiden, beide',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'notus/a/um',
        inflections: '',
        germanTranslation: 'bekannt',
        relatedForeignWords: '<=> ignotus/a/um =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'signum',
        inflections: 'signi n.',
        germanTranslation: 'Zeichen',
        relatedForeignWords: "engl. sign, frz. signe, ital. segno, span. se\xf1al",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'scribere',
        inflections: 'scribo 3, scripsi, scriptum',
        germanTranslation: 'schreiben',
        relatedForeignWords: "frz. \xe9crire, ital. scrivere, span. escribir; vgl. Skriptum, Manuskript",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'prope (+ Akk.)',
        inflections: '',
        germanTranslation: 'nahe bei',
        relatedForeignWords: 'vgl. app-propinquare =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'pons',
        inflections: 'pontis m.',
        germanTranslation: "Br\xfccke",
        relatedForeignWords: 'vgl. Pontifex maximus (= der Papst)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'plebs',
        inflections: 'plebis f.',
        germanTranslation: '(niedriges) Volk',
        relatedForeignWords: 'vgl. Plebiszit (= Volksabstimmung)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'causa',
        inflections: 'causae f.',
        germanTranslation: 'Grund, Ursache',
        relatedForeignWords: "vgl. Kausalsatz (= Begr\xfcndungssatz)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'qua de causa',
        inflections: '',
        germanTranslation: '1) deshalb; 2) weshalb',
        relatedForeignWords: 'w\xf6rtl.: "aus welchem Grund"',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'consulere',
        inflections: 'consulo 3, consului, consultum',
        germanTranslation: 'befragen, um Rat fragen',
        relatedForeignWords: 'vgl. konsultieren, Konsul (= "Berater")',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'nuntiare',
        inflections: 'nuntio 1, -avi, -atum',
        germanTranslation: 'melden',
        relatedForeignWords: 'vgl. nuntius, -i =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'hodie (Adv.)',
        inflections: '',
        germanTranslation: 'heute',
        relatedForeignWords: 'aus: hoc + die =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'adducere',
        inflections: 'adduco 3, adduxi, adductum',
        germanTranslation: "1) hinf\xfchren; 2) veranlassen",
        relatedForeignWords: 'vgl. adductus/a/um =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'studium',
        inflections: 'studii n.',
        germanTranslation: 'Eifer, Begeisterung',
        relatedForeignWords: 'vgl. Studium; vgl. studere =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'premere',
        inflections: 'premo 3, pressi, pressum',
        germanTranslation: "1) dr\xfccken; 2) bedr\xe4ngen",
        relatedForeignWords: 'vgl. pressen; frz. presser; vgl. engl. pressure',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'pellere',
        inflections: 'pello 3, pepuli, pulsum',
        germanTranslation: "schlagen, sto\xdfen",
        relatedForeignWords: 'vgl. Puls; vgl. expellere =',
        selected: true,
        probability: 1
    },
    // --- Unit 30 ---
    {
        latinWord: '^con^Lektion 30: De beneficio sancti Martini',
        inflections: '',
        germanTranslation: '',
        relatedForeignWords: '',
        probability: 0,
        selected: false
    },
    {
        latinWord: 'beneficium',
        inflections: 'beneficii n.',
        germanTranslation: 'Wohltat',
        relatedForeignWords: 'vgl. Benefizveranstaltung; aus: bene + facere',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'hiems',
        inflections: 'hiemis f.',
        germanTranslation: 'Winter',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'pauper (m./f./n.)',
        inflections: 'pauperis (2.F.)',
        germanTranslation: 'arm',
        relatedForeignWords: 'frz. pauvre, ital. povero, span. pobre',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'vestis',
        inflections: 'vestis f.',
        germanTranslation: 'Gewand',
        relatedForeignWords: 'ital. vestiti; vgl. Weste, Transvestit, Investitur',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'pati (D)',
        inflections: 'patior M, passus sum',
        germanTranslation: '1) ertragen; 2) erleiden',
        relatedForeignWords: 'vgl. passiv, Patient, Passion (= Leidensgeschichte)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'misericordia',
        inflections: 'misericordiae f.',
        germanTranslation: 'Mitleid',
        relatedForeignWords: 'ital. misericordia; vgl. miser =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'nudus/a/um',
        inflections: '',
        germanTranslation: 'nackt',
        relatedForeignWords: 'frz. nu, ital. nudo, span. desnudo; vgl. Nudist',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'reliquus/a/um',
        inflections: '',
        germanTranslation: "\xfcbrig",
        relatedForeignWords: '<=> relictus (PPP von relinquere) =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'similis/e',
        inflections: '',
        germanTranslation: "\xe4hnlich",
        relatedForeignWords: 'engl. similar, ital. simile, frz. similaire, span. similar; vgl. As-similation ("Anpassung", S. 119)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'militaris/e',
        inflections: '',
        germanTranslation: "milit\xe4risch, Milit\xe4r-",
        relatedForeignWords: '<=> miles, -itis =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'alter/era/erum',
        inflections: 'alterius (2.F.), alteri (3.F.)',
        germanTranslation: 'der andere (von zweien)',
        relatedForeignWords: 'vgl. Alternative, das Alter Ego (= zweites Ich), Altruismus (= Selbstlosigkeit)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'alter - alter',
        inflections: '',
        germanTranslation: 'der eine - der andere',
        relatedForeignWords: '(siehe Grammatica)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'mens',
        inflections: 'mentis f.',
        germanTranslation: 'Geist, Verstand, Sinn',
        relatedForeignWords: "vgl. mental, Mentalit\xe4t (= Geisteshaltung)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'sanus/a/um',
        inflections: '',
        germanTranslation: "gesund; vern\xfcnftig",
        relatedForeignWords: "<=> sanare; vgl. Sanit\xe4ter; SPA (siehe S. 27)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'queri (D)',
        inflections: 'queror 3, questus sum',
        germanTranslation: 'klagen',
        relatedForeignWords: '<=> quaerere, quaesivi, quaesitum =',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'humanus/a/um',
        inflections: '',
        germanTranslation: 'menschlich',
        relatedForeignWords: 'engl. human, frz. humain; vgl. Humanbiologie',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'possidere',
        inflections: 'possideo 2, possedi, possessum',
        germanTranslation: 'besitzen',
        relatedForeignWords: 'engl. to possess, vgl. Possessivpronomen (= besitzanzeigendes F\xfcrwort, z.B. "mein" etc.)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'sequi (D)',
        inflections: 'sequor 3, secutus sum',
        germanTranslation: 'folgen',
        relatedForeignWords: 'vgl. Sequenz (= Abfolge); Con-secutio temporum',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'sequi te (Akk.!)',
        inflections: '',
        germanTranslation: 'ich folge dir (Dativ!)',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'tegere',
        inflections: 'tego 3, texi, tectum',
        germanTranslation: 'bedecken',
        relatedForeignWords: "vgl. Toga (= K\xf6rperbedeckung)",
        selected: true,
        probability: 1
    },
    {
        latinWord: 'loqui (D)',
        inflections: 'loquor 3, locutus sum',
        germanTranslation: 'sprechen',
        relatedForeignWords: 'vgl. eloquent (= redegewandt)',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'vereri (D)',
        inflections: 'vereor 2, veritus sum',
        germanTranslation: "1) f\xfcrchten; 2) sich scheuen",
        relatedForeignWords: 'vereri = timere / metuere',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'quidquid',
        inflections: '',
        germanTranslation: 'was auch immer; alles was',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'hortari (D)',
        inflections: 'hortor 1, hortatus sum',
        germanTranslation: 'auffordern, ermuntern',
        relatedForeignWords: '',
        selected: true,
        probability: 1
    },
    {
        latinWord: 'servire',
        inflections: 'servio 4, -ivi, -itum',
        germanTranslation: 'dienen',
        relatedForeignWords: 'frz. + span. servir, vgl. servieren; <=> servare =',
        selected: true,
        probability: 1
    },
    {
        latinWord: '^con^Eigene Vokabeln:',
        inflections: '',
        germanTranslation: '',
        relatedForeignWords: '',
        selected: false,
        probability: 0
    }
];

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kONVW":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "HomeMenu", ()=>HomeMenu);
var _ = require("..");
class HomeMenu {
    constructor(){
        this.loaded = false;
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
        window.addEventListener('load', ()=>{
            console.log("servas");
            this.loaded = true;
            let icon = document.createElement('object');
            icon.data = './icon.svg';
            icon.id = 'icon';
            this.iconPlaceholder.insertAdjacentElement('beforeend', icon);
            icon.addEventListener('load', ()=>{
                const svgDoc = icon.contentDocument;
                if (!svgDoc) return;
                // Animation was created by COPILOT (GPT-5)
                // collect groups l1..l13
                const groups = [];
                for(let i = 1; i <= 13; i++){
                    const g = svgDoc.querySelector(`#l${i}`);
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
                    wrapper.style.transformBox = 'fill-box';
                    wrapper.style.transformOrigin = `50% 50%`;
                    // start invisible and twice the final size
                    wrapper.style.opacity = '0';
                    wrapper.style.transform = 'scale(3)';
                    groups.push(wrapper);
                }
                // stamp animation: scale from 2 -> 1 without moving the element
                groups.forEach((g, idx)=>{
                    const delay = idx * 250 + 100; // stagger each letter slightly
                    const anim = g.animate([
                        {
                            transform: 'scale(3)',
                            opacity: 1
                        },
                        {
                            transform: 'scale(1)',
                            opacity: 1
                        }
                    ], {
                        duration: 250,
                        delay,
                        fill: 'forwards'
                    });
                    // ensure final styles are applied after the animation completes
                    if (anim && anim.finished && typeof anim.finished.then === 'function') anim.finished.then(()=>{
                        g.style.transform = 'scale(1)';
                        g.style.opacity = '1';
                    }).catch(()=>{
                        // ignore cancellation errors but still set the final state
                        g.style.transform = 'scale(1)';
                        g.style.opacity = '1';
                    });
                    else {
                        // fallback if finished promise isn't available
                        g.style.transform = 'scale(1)';
                        g.style.opacity = '1';
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
                version.addEventListener('load', ()=>{
                    setTimeout(()=>{
                        const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
                        // Access the embedded SVG document (must be same-origin)
                        const svgDoc = version.contentDocument;
                        if (!svgDoc) {
                            version.style.opacity = '1';
                            console.warn('[fade-l5-l6] No contentDocument. Is the object same-origin?');
                            return;
                        }
                        // Helper: get the <g id="..."> or nearest <g> ancestor (if the id is on a child)
                        const getGroup = (id)=>{
                            const el = svgDoc.getElementById(id);
                            if (!el) return null;
                            if (el.nodeName.toLowerCase() === 'g') return el;
                            let p = el.parentElement;
                            while(p && p.nodeName.toLowerCase() !== 'g')p = p.parentElement;
                            return p && p.nodeName.toLowerCase() === 'g' ? p : null;
                        };
                        const l5 = getGroup('l5');
                        const l6 = getGroup('l6');
                        if (!l5 || !l6) {
                            console.warn('[fade-l5-l6] Missing l5 and/or l6 in the SVG.', {
                                l5: !!l5,
                                l6: !!l6
                            });
                            if (l5) l5.style.opacity = '1';
                            if (l6) l6.style.opacity = '1';
                            version.style.opacity = '1';
                            return;
                        }
                        // Ensure l5/l6 are present but transparent (no layout impact in SVG anyway)
                        const prep = (el)=>{
                            el.style.transition = 'none';
                            // Don’t touch display/visibility/transform to avoid surprises
                            el.style.opacity = '0';
                        };
                        prep(l5);
                        prep(l6);
                        // ⬅️ NEW: Build a wrapper <g id="tail"> around l7..l13 so we can move them together
                        const SVG_NS = 'http://www.w3.org/2000/svg'; // ⬅️ NEW
                        const tailIds = [
                            'l7',
                            'l8',
                            'l9',
                            'l10',
                            'l11',
                            'l12',
                            'l13'
                        ]; // ⬅️ NEW
                        const tailChildren = tailIds.map(getGroup).filter((x)=>!!x); // ⬅️ NEW
                        let tail = null; // ⬅️ NEW
                        let tileWidth = 0; // ⬅️ NEW
                        if (tailChildren.length) {
                            // Estimate one tile width from any tile (they're identical squares)
                            const l1 = getGroup('l1'); // use l1 if present, else any of tail children // ⬅️ NEW
                            const ref = l1 ?? tailChildren[0]; // ⬅️ NEW
                            try {
                                tileWidth = ref.getBBox().width; // SVG user units // ⬅️ NEW
                            } catch  {
                                // Fallback: try l5
                                try {
                                    tileWidth = l5.getBBox().width;
                                } catch  {
                                    tileWidth = 0;
                                }
                            }
                            // Only proceed if we could measure something sensible // ⬅️ NEW
                            if (tileWidth > 0) {
                                // Create wrapper
                                tail = svgDoc.createElementNS(SVG_NS, 'g'); // ⬅️ NEW
                                tail.setAttribute('id', 'tail'); // ⬅️ NEW
                                const parent = tailChildren[0].parentNode; // ⬅️ NEW
                                // Insert wrapper right before l7 (to preserve z-order) // ⬅️ NEW
                                parent.insertBefore(tail, tailChildren[0]); // ⬅️ NEW
                                // Move l7..l13 into the wrapper (preserves their own transforms) // ⬅️ NEW
                                tailChildren.forEach((child)=>tail.appendChild(child)); // ⬅️ NEW
                                // Initial shift: exactly two tile widths to the left // ⬅️ NEW
                                const offset = -2 * tileWidth; // ⬅️ NEW
                                tail.setAttribute('transform', `translate(${offset},0)`); // ⬅️ NEW
                            } else console.warn('[fade-l5-l6] Could not determine tile width; skipping tail shift.'); // ⬅️ NEW
                        } else console.warn('[fade-l5-l6] Could not find l7..l13; skipping tail shift.'); // ⬅️ NEW
                        version.animate([
                            {
                                opacity: '0'
                            },
                            {
                                opacity: '.25'
                            },
                            {
                                opacity: '1'
                            }
                        ], {
                            duration: 2500,
                            fill: "forwards"
                        }).finished.then(()=>{
                            this.type();
                        });
                        // Small utility: cubic-bezier evaluator for JS fallback // ⬅️ NEW
                        const cubicBezier = (p0, p1, p2, p3)=>{
                            // x = t; y = bezier(t)
                            const cx = 3 * p0, bx = 3 * (p2 - p0) - cx, ax = 1 - cx - bx;
                            const cy = 3 * p1, by = 3 * (p3 - p1) - cy, ay = 1 - cy - by;
                            return (t)=>{
                                const y = ((ay * t + by) * t + cy) * t; // we just use y(t) with t as time fraction
                                return y;
                            };
                        };
                        const ease = cubicBezier(0.25, 0.1, 0.25, 1); // ⬅️ NEW
                        // JS fallback for animateTransform (in user units) // ⬅️ NEW
                        const animateTranslateAttr = (el, fromX, toX, duration, delay)=>{
                            setTimeout(()=>{
                                const start = performance.now();
                                const step = (now)=>{
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
                        requestAnimationFrame(()=>{
                            version.style.opacity = '1'; // ensure host visible
                            // Reduced motion: show immediately (no animation, no shift)
                            if (reduceMotion) {
                                l5.style.opacity = '1';
                                l6.style.opacity = '1';
                                if (tail) tail.setAttribute('transform', 'translate(0,0)'); // reset instantly // ⬅️ NEW
                                return;
                            }
                            const fadeDuration = 800; // ms
                            const fadeDelay = 400; // ms
                            const moveDuration = fadeDuration; // keep in sync with fade // ⬅️ NEW
                            const moveDelay = fadeDelay; // ⬅️ NEW
                            // Try Web Animations API first (most reliable on SVG opacity)
                            const fade = (el)=>{
                                let usedWAAPI = false;
                                try {
                                    const anim = el.animate?.([
                                        {
                                            opacity: 0
                                        },
                                        {
                                            opacity: 1
                                        }
                                    ], {
                                        duration: fadeDuration,
                                        delay: fadeDelay,
                                        easing: 'ease',
                                        fill: 'forwards'
                                    });
                                    if (anim) {
                                        usedWAAPI = true;
                                        anim.finished.then(()=>{
                                            el.style.opacity = '1';
                                        }).catch(()=>{
                                            el.style.opacity = '1';
                                        });
                                    }
                                } catch  {
                                // ignore and fall back
                                }
                                if (!usedWAAPI) {
                                    // Fallback: CSS transition
                                    el.style.transition = `opacity ${fadeDuration}ms ease ${fadeDelay}ms`;
                                    // Trigger transition next tick to ensure transition is applied
                                    requestAnimationFrame(()=>{
                                        el.style.opacity = '1';
                                    });
                                    // Last-resort safeguard: force final state after duration+delay+buffer
                                    setTimeout(()=>{
                                        el.style.opacity = '1';
                                    }, fadeDelay + fadeDuration + 50);
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
                                    setTimeout(()=>{
                                        try {
                                            // Start the animation
                                            anim.beginElement?.();
                                        } catch  {
                                            // If beginElement fails, fallback to JS tween
                                            animateTranslateAttr(tail, fromX, toX, moveDuration, 0);
                                        }
                                    }, moveDelay);
                                } catch  {
                                    // As a safety net, JS tween (no SMIL)
                                    animateTranslateAttr(tail, fromX, toX, moveDuration, moveDelay);
                                }
                            }
                        });
                    }, 3200);
                }, {
                    once: true
                });
            });
        });
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
            object.data = './keys/Reversion_T.svg';
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
    constructor(){
        this.containers = [];
    }
    modifyDocument() {
        const request = window.indexedDB.open('Vocabulary', 2);
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
                this.renderVocabulary();
            };
        });
    }
    renderVocabulary() {
        const ignFunction = (event)=>{
            event.preventDefault();
            event.stopPropagation();
            let element = event.target;
            let attribute;
            let id;
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
                element = element.parentElement;
            }
            if (id != undefined && attribute != undefined && this.vocabulary[id]) {
                let value = Object.values(this.vocabulary[id])[attribute];
                if (value.includes('^ign^')) {
                    value = value.replaceAll('^ign^', '');
                    element.classList.remove('ign');
                } else {
                    value = '^ign^' + value;
                    element.classList.add('ign');
                }
                this.vocabulary[id][Object.keys(this.vocabulary[id])[attribute]] = value;
                const transaction = this.database.transaction('vocabulary', 'readwrite');
                transaction.onerror = (_)=>console.error(transaction.error);
                const objectStore = transaction.objectStore('vocabulary');
                const request = objectStore.get(id + 1);
                request.onerror = (_)=>console.error(request.error);
                request.onsuccess = (_)=>{
                    const data = request.result;
                    if (!data) return;
                    Object.defineProperty(data, Object.keys(data)[attribute], {
                        value: value
                    });
                    let cdiv = document.getElementById(`checkboxDiv${id}`);
                    let ignWords = Object.values(data).slice(0, 4).filter((w)=>w.includes('^ign^')).length;
                    if (ignWords === 4) {
                        data.selected = false;
                        this.vocabulary[id].selected = false;
                        let cdiv = this.container.querySelector("#checkboxDiv" + id);
                        cdiv.classList.add('ign');
                        cdiv.innerHTML = "";
                        let img = document.createElement('img');
                        img.src = './ign.svg';
                        cdiv.append(img);
                    } else if (ignWords === 3) {
                        let cdiv = this.container.querySelector("#checkboxDiv" + id);
                        cdiv.innerHTML = "";
                        cdiv.classList.remove("ign");
                        let img = document.createElement('img');
                        img.src = './ign.svg';
                        img.classList.add("white");
                        cdiv.append(img);
                    } else if (ignWords === 0) {
                        data.selected = true;
                        this.vocabulary[id].selected = true;
                        let cdiv = this.container.querySelector("#checkboxDiv" + id);
                        cdiv.innerHTML = "";
                        cdiv.classList.remove("ign");
                        let img = document.createElement('img');
                        img.src = './fully-selected.svg';
                        cdiv.append(img);
                    } else {
                        let cdiv = this.container.querySelector("#checkboxDiv" + id);
                        cdiv.innerHTML = "";
                        cdiv.classList.remove("ign");
                        let img = document.createElement('img');
                        img.src = './selected.svg';
                        cdiv.append(img);
                    }
                    const req = objectStore.put(data, id + 1);
                    req.onerror = (_)=>console.error(req.error);
                };
            }
        };
        const selectFunction = (event)=>{
            event.preventDefault();
            event.stopPropagation();
            let element = event.target;
            if (element.classList.contains('cdiv')) {
                let id = parseInt(element.id.replaceAll('checkboxDiv', ''));
                if (this.vocabulary[id]) {
                    let value = !this.vocabulary[id].selected;
                    this.vocabulary[id].selected = value;
                    if (!value) for(let i = 0; i < 4; i++){
                        if (!Object.values(this.vocabulary[id])[i].includes('^ign^')) this.vocabulary[id][Object.keys(this.vocabulary[id])[i]] = '^ign^' + this.vocabulary[id][Object.keys(this.vocabulary[id])[i]];
                        let word = document.getElementById(Object.keys(this.vocabulary[id])[i] + id);
                        if (word && !word.classList.contains('ign')) word.classList.add('ign');
                        element.classList.add('ign');
                        element.innerHTML = "";
                        let img = document.createElement('img');
                        img.src = './ign.svg';
                        element.append(img);
                    }
                    else for(let i = 0; i < 4; i++){
                        if (Object.values(this.vocabulary[id])[i].includes('^ign^')) this.vocabulary[id][Object.keys(this.vocabulary[id])[i]] = Object.values(this.vocabulary[id])[i].replaceAll('^ign^', '');
                        let word = document.getElementById(Object.keys(this.vocabulary[id])[i] + id);
                        if (word && word.classList.contains('ign')) word.classList.remove('ign');
                        element.classList.remove('ign');
                        element.innerHTML = "";
                        let img = document.createElement('img');
                        img.src = './fully-selected.svg';
                        element.append(img);
                    }
                    const transaction = this.database.transaction('vocabulary', 'readwrite');
                    transaction.onerror = (_)=>console.error(transaction.error);
                    const objectStore = transaction.objectStore('vocabulary');
                    const request = objectStore.get(id + 1);
                    request.onerror = (_)=>console.error(request.error);
                    request.onsuccess = (_)=>{
                        const data = request.result;
                        if (data) {
                            this.vocabulary[id].probability = data.probability;
                            const req = objectStore.put(this.vocabulary[id], id + 1);
                            req.onerror = (_)=>console.error(req.error);
                        }
                    };
                }
            }
        };
        const headerFunction = (event)=>{
            event.preventDefault();
            event.stopPropagation();
            let element = event.target;
            if (element.classList.contains('header')) {
                let header = element;
                let key;
                switch(header.id){
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
                transaction.onerror = (_)=>console.error(transaction.error);
                const objectStore = transaction.objectStore('vocabulary');
                const request = objectStore.openCursor();
                request.onerror = (_)=>console.error(request.error);
                request.onsuccess = (_)=>{
                    const cursor = request.result;
                    if (cursor) {
                        let k = cursor.key;
                        const updatedData = cursor.value;
                        if (updatedData.latinWord.includes('^con^')) cursor.continue();
                        else {
                            if (header.classList.contains('ign')) {
                                if (updatedData.selected) {
                                    updatedData[key] = updatedData[key].replaceAll('^ign^', '');
                                    this.vocabulary[k - 1][key] = updatedData[key];
                                    let div = document.querySelector(`#${key}${k - 1}`);
                                    if (div) div.classList.remove('ign');
                                }
                            } else {
                                if (!updatedData[key].includes('^ign^')) updatedData[key] = '^ign^' + updatedData[key];
                                this.vocabulary[k - 1][key] = updatedData[key];
                                let div = document.querySelector(`#${key}${k - 1}`);
                                if (!div.classList.contains('ign')) div.classList.add('ign');
                            }
                            let ignWords = Object.values(updatedData).slice(0, 4).filter((w)=>w.includes('^ign^')).length;
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
                };
                transaction.oncomplete = (_)=>{
                    if (header.classList.contains('ign')) header.classList.remove('ign');
                    else header.classList.add('ign');
                };
            }
        };
        const conFunction = (event)=>{
            event.preventDefault();
            event.stopPropagation();
            let element = event.target;
            if (element.parentElement.classList.contains('unit') && element.tagName != "IMG") element = element.parentElement;
            if (element.classList.contains('unit')) {
                let unit = element;
                let id = parseInt(unit.id.replaceAll('unit', '')) - 1;
                let index = this.containers[id];
                let nextIndex = index === this.containers[this.containers.length - 1] ? this.vocabulary.length : this.containers[id + 1];
                const transaction = this.database.transaction('vocabulary', 'readwrite');
                transaction.onerror = (_)=>console.error(transaction.error);
                const objectStore = transaction.objectStore('vocabulary');
                const request = objectStore.openCursor();
                request.onerror = (_)=>console.error(request.error);
                request.onsuccess = (_)=>{
                    const cursor = request.result;
                    if (cursor) {
                        let k = cursor.key - 1;
                        if (k === index) {
                            const updatedData = cursor.value;
                            let l = updatedData.latinWord;
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
                                for(let a = 0; a < 4; a++){
                                    if (!Object.values(this.vocabulary[k])[a].includes('^ign^')) {
                                        Object.defineProperty(this.vocabulary[k], Object.keys(this.vocabulary[k])[a], {
                                            value: '^ign^' + this.vocabulary[k][Object.keys(this.vocabulary[k])[a]]
                                        });
                                        Object.defineProperty(updatedData, Object.keys(updatedData)[a], {
                                            value: '^ign^' + updatedData[Object.keys(updatedData)[a]]
                                        });
                                    }
                                    let div = document.getElementById(Object.keys(this.vocabulary[k])[a] + k);
                                    if (div && !div.classList.contains('ign')) div.classList.add('ign');
                                }
                                this.vocabulary[k].selected = false;
                                updatedData.selected = false;
                                let cdiv = document.getElementById(`checkboxDiv${k}`);
                                if (cdiv && !cdiv.classList.contains('ign')) {
                                    cdiv.classList.add('ign');
                                    cdiv.innerHTML = "";
                                    let img = document.createElement('img');
                                    img.src = './ign.svg';
                                    cdiv.append(img);
                                }
                            } else {
                                for(let a = 0; a < 4; a++){
                                    if (Object.values(this.vocabulary[k])[a].includes('^ign^')) {
                                        Object.defineProperty(this.vocabulary[k], Object.keys(this.vocabulary[k])[a], {
                                            value: Object.values(this.vocabulary[k])[a].replaceAll('^ign^', '')
                                        });
                                        Object.defineProperty(updatedData, Object.keys(updatedData)[a], {
                                            value: this.vocabulary[k][Object.keys(this.vocabulary[k])[a]]
                                        });
                                    }
                                    let div = document.getElementById(Object.keys(this.vocabulary[k])[a] + k);
                                    if (div && div.classList.contains('ign')) div.classList.remove('ign');
                                }
                                this.vocabulary[k].selected = true;
                                updatedData.selected = true;
                                let cdiv = document.getElementById(`checkboxDiv${k}`);
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
                };
                transaction.oncomplete = (_)=>{
                    if (unit.classList.contains('ign')) unit.classList.remove('ign');
                    else unit.classList.add('ign');
                };
            }
        };
        let str = '';
        let decoration = (0, _.createDiv)('decoration', 'header');
        let latinWord = (0, _.createDiv)('latin-word', 'header');
        latinWord.innerHTML = 'Latein';
        let inflections = (0, _.createDiv)('inflections', 'header');
        inflections.innerHTML = 'Formen';
        let germanTranslation = (0, _.createDiv)('german-translation', 'header');
        germanTranslation.innerHTML = 'Deutsch';
        let relatedForeignWords = (0, _.createDiv)('related-foreign-words', 'header');
        relatedForeignWords.innerHTML = "Fremdw\xf6rter";
        [
            decoration,
            latinWord,
            inflections,
            germanTranslation,
            relatedForeignWords
        ].forEach((header)=>{
            header.addEventListener('contextmenu', headerFunction);
            this.container.append(header);
        });
        let unit = 1;
        this.vocabulary.forEach((word, i)=>{
            if (word.latinWord.includes('^con^')) {
                let n_unit = (0, _.createDiv)(`unit${unit}`, 'unit');
                this.container.append(n_unit);
                n_unit.innerHTML = `<div></div><span>${word.latinWord.replaceAll('^con^', '').replaceAll('^ign^', '')}</span>`;
                let img = document.createElement('img');
                img.src = './arrow_down.svg';
                img.id = 'arrowDown';
                img.style.cursor = 'pointer';
                n_unit.append(img);
                n_unit.classList.add('down');
                n_unit.addEventListener('contextmenu', conFunction);
                if (word.latinWord.includes('^ign^')) n_unit.classList.add("ign");
                unit++;
                this.containers.push(i);
                img.addEventListener('click', (_)=>{
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
                let Cdiv = (0, _.createDiv)(`checkboxDiv${i}`, 'word');
                let div1 = (0, _.createDiv)(`latinWord${i}`, 'word');
                let div2 = (0, _.createDiv)(`inflections${i}`, 'word');
                let div3 = (0, _.createDiv)(`germanTranslation${i}`, 'word');
                let div4 = (0, _.createDiv)(`relatedForeignWords${i}`, 'word');
                Cdiv.classList.add('cdiv');
                div1.innerHTML = `<input type="text" id="0-${i}" class="edit" value="${word.latinWord === '' ? ' ' : word.latinWord.replaceAll('"', "&QUOT;")}"></input>`;
                div2.innerHTML = `<input type="text" id="1-${i}" class="edit" value="${word.inflections === '' ? ' ' : word.inflections.replaceAll('"', "&QUOT;")}"></input>`;
                div3.innerHTML = `<input type="text" id="2-${i}" class="edit" value="${word.germanTranslation === '' ? ' ' : word.germanTranslation.replaceAll('"', "&QUOT;")}"></input>`;
                div4.innerHTML = `<input type="text" id="3-${i}" class="edit" value="${word.relatedForeignWords === '' ? ' ' : word.relatedForeignWords.replaceAll('"', "&QUOT;")}"></input>`;
                [
                    div1,
                    div2,
                    div3,
                    div4
                ].forEach((div)=>{
                    if (div.querySelector('input')?.value.includes('^ign^')) {
                        div.classList.add('ign');
                        div.querySelector('input').value = div.querySelector('input')?.value.replaceAll('^ign^', '');
                    }
                });
                let ignWords = Object.values(word).slice(0, 4).filter((w)=>w.includes('^ign^')).length;
                if (!word.selected || ignWords === 4) {
                    [
                        Cdiv,
                        div1,
                        div2,
                        div3,
                        div4
                    ].forEach((div)=>div.classList.add('ign'));
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
                const autoScaleInput = (input)=>{
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
                    while(ctx.measureText(text).width > parentWidth && fontSize > 1){
                        fontSize--;
                        ctx.font = [
                            style.fontStyle || 'normal',
                            style.fontVariant || 'normal',
                            style.fontWeight || 'normal',
                            `${fontSize}px`,
                            style.fontFamily || 'inherit'
                        ].join(' ');
                    }
                    while(ctx.measureText(text).width < parentWidth - 10 && fontSize < maxFontSize){
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
                const inputs = [
                    div1,
                    div2,
                    div3,
                    div4
                ].map((div)=>div.querySelector('input')).filter(Boolean);
                this.resizeFunction = ()=>{
                    inputs.forEach((input)=>autoScaleInput(input));
                };
                inputs.forEach((input)=>{
                    input.style.width = '22vw';
                    input.addEventListener('input', ()=>autoScaleInput(input));
                });
                window.addEventListener("resize", this.resizeFunction);
                this.container.append(Cdiv, div1, div2, div3, div4);
                inputs.forEach((input)=>autoScaleInput(input));
            }
        });
        for(let i = 1; i < unit; i++){
            let i_unit = this.container.querySelector('#unit' + i);
            let img = i_unit.querySelector("#arrowDown");
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
        wordList.forEach((div)=>{
            div.addEventListener('contextmenu', ignFunction);
        });
        let inputList = document.getElementsByClassName('edit');
        for(let i = 0; i < inputList.length; i++){
            let input = inputList.item(i);
            input.addEventListener('contextmenu', ignFunction);
            input.onblur = (_)=>{
                const transaction = this.database.transaction('vocabulary', 'readwrite');
                transaction.onerror = (_)=>console.error(transaction.error);
                const objectStore = transaction.objectStore('vocabulary');
                const request = objectStore.get(parseInt(input.id.split('-')[1]) + 1);
                request.onerror = (_)=>console.error(request.error);
                request.onsuccess = (_)=>{
                    const data = request.result;
                    Object.defineProperty(data, Object.keys(data)[parseInt(input.id.split('-')[0])], {
                        value: input.value.replaceAll("&QUOT;", '"').trim()
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
        let checkboxDivList = document.getElementsByClassName('cdiv');
        for(let i = 0; i < checkboxDivList.length; i++){
            let element = checkboxDivList[i];
            let id = element.id.slice(11);
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
                    setTimeout((_)=>{
                        if (mouseover) {
                            element.classList.add('mouseon');
                            indicator = setTimeout((_)=>{
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
            element.addEventListener('mouseleave', (_)=>{
                mouseover = false;
                element.classList.remove('mouseon');
                clearTimeout(indicator);
                document.querySelectorAll('.danger').forEach((e)=>e.classList.remove('danger'));
                element.removeEventListener('click', clickFunction);
                let ignWords = Object.values(this.vocabulary[id]).slice(0, 4).filter((w)=>w.includes('^ign^')).length;
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
    clickUnit(unit, index) {
        if (unit.classList.contains('down')) {
            unit.classList.remove('down');
            unit.classList.add('up');
            let nextIndex = index === this.containers[this.containers.length - 1] ? undefined : this.containers[this.containers.indexOf(index) + 1];
            let hiddenWords = nextIndex ? this.vocabulary.slice(index + 1, nextIndex) : this.vocabulary.slice(index + 1);
            hiddenWords.forEach((hWord, i)=>{
                let Cdiv = document.querySelector(`#checkboxDiv${index + 1 + i}`);
                let div1 = document.querySelector(`#latinWord${index + 1 + i}`);
                let div2 = document.querySelector(`#inflections${index + 1 + i}`);
                let div3 = document.querySelector(`#germanTranslation${index + 1 + i}`);
                let div4 = document.querySelector(`#relatedForeignWords${index + 1 + i}`);
                [
                    Cdiv,
                    div1,
                    div2,
                    div3,
                    div4
                ].forEach((div)=>{
                    if (div) div.style.display = 'none';
                });
            });
        } else if (unit.classList.contains('up')) {
            unit.classList.remove('up');
            unit.classList.add('down');
            let nextIndex = index === this.containers[this.containers.length - 1] ? undefined : this.containers[this.containers.indexOf(index) + 1];
            let shownWords = nextIndex ? this.vocabulary.slice(index + 1, nextIndex) : this.vocabulary.slice(index + 1);
            shownWords.forEach((sWord, i)=>{
                let Cdiv = document.querySelector(`#checkboxDiv${index + 1 + i}`);
                let div1 = document.querySelector(`#latinWord${index + 1 + i}`);
                let div2 = document.querySelector(`#inflections${index + 1 + i}`);
                let div3 = document.querySelector(`#germanTranslation${index + 1 + i}`);
                let div4 = document.querySelector(`#relatedForeignWords${index + 1 + i}`);
                [
                    Cdiv,
                    div1,
                    div2,
                    div3,
                    div4
                ].forEach((div)=>{
                    if (div) div.style.display = 'flex';
                });
            });
        }
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
                } else if (inp.classList.contains('not-editable') && inp.querySelector("span")) {
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
        const request = window.indexedDB.open('Vocabulary', 2);
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
                            object.data = './keys/Reversion_T.svg';
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
                                while(this.inputIndex + 1 < 4 && this.selectedInput.classList.contains('not-editable')){
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
                                    } else if (Object.values(this.vocabulary[this.currentWordIndex])[i].includes("^ign^")) {
                                        this.currentWord[Object.keys(this.currentWord)[i]] = Object.values(this.vocabulary[this.currentWordIndex])[i];
                                        let div = document.querySelector(`#div${inputs[i]}`);
                                        if (div && Object.values(this.vocabulary[this.currentWordIndex])[i].replaceAll("^ign^", '').trim() != "") {
                                            div.innerHTML = "";
                                            let span = div.appendChild(document.createElement('span'));
                                            span.innerHTML = Object.values(this.currentWord)[i].replaceAll("^ign^", "");
                                            span.classList.add("reveal");
                                            let max = div.clientHeight * 0.6;
                                            let fontSize;
                                            span.style.fontSize = max + 'px';
                                            span.style.whiteSpace = 'nowrap';
                                            span.style.display = 'inline-block';
                                            span.style.width = 'auto';
                                            span.style.fontSize = max + 'px';
                                            while(span.scrollWidth > div.clientWidth * 0.95 || span.clientHeight > max){
                                                fontSize = parseInt(span.style.fontSize.slice(0, -2));
                                                if (fontSize <= 1) break;
                                                span.style.fontSize = fontSize - 1 + 'px';
                                            }
                                            while(span.clientHeight > max){
                                                fontSize = parseInt(span.style.fontSize.slice(0, -2));
                                                span.style.fontSize = fontSize - 1 + 'px';
                                            }
                                        } else emptyLines[i] = true;
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
            object.data = './keys/Reversion_T.svg';
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
                if (event.key === '<') svg.querySelector('#tspan7').innerHTML = '&lt;';
                else if (event.key === '&') svg.querySelector('#tspan7').innerHTML = '&amp;';
                else {
                    if (event.key === '/') event.preventDefault();
                    svg.querySelector('#tspan7').innerHTML = event.key.charAt(0);
                }
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
        const isEmpty = (word)=>{
            if (Object.values(word).slice(0, 4).filter((w)=>w.trim() === "").length >= 3 || word.latinWord.includes('^con^') || !word.selected || Object.values(word).slice(0, 4).filter((w)=>w.includes("^ign^")).length >= 3) return true;
            else return false;
        };
        if (this.vocabulary.length === 0) {
            setTimeout((_)=>alert('Keine Vokabeln!'), 50);
            return;
        }
        this.round++;
        this.result = [
            undefined,
            undefined,
            undefined,
            undefined
        ];
        let overallProbabilty = 0;
        this.vocabulary.forEach((word)=>{
            if (!isEmpty(word)) overallProbabilty += word.probability;
        });
        if (overallProbabilty === 0) {
            setTimeout((_)=>alert('Keine Vokabeln!'), 50);
            return;
        }
        let randomNumber = Math.floor(Math.random() * overallProbabilty * 10) / 10;
        let lowestDifference;
        let lastProbability = 0;
        this.vocabulary.forEach((word, i)=>{
            if (!isEmpty(word)) {
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
            if (rn <= 0.5) savedProperty = [
                'latinWord',
                {
                    value: this.currentWord.latinWord
                }
            ];
            else if (rn <= 0.7) savedProperty = [
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
        }while (savedProperty[1].value.trim() === '' || savedProperty[1].value.includes('^ign^'));
        this.currentWord = {
            latinWord: '',
            inflections: '',
            germanTranslation: '',
            relatedForeignWords: '',
            selected: true,
            probability: this.currentWord.probability
        };
        Object.defineProperty(this.currentWord, savedProperty[0], savedProperty[1]);
        document.querySelectorAll('.t').forEach((t)=>t.innerHTML = '');
        document.querySelectorAll(".not-editable").forEach((div)=>div.classList.remove("not-editable"));
        Object.values(this.vocabulary[this.currentWordIndex]).slice(0, 4).forEach((w, i)=>{
            let div = document.getElementById("div" + i * 2);
            if (Object.keys(this.vocabulary[this.currentWordIndex])[i] != savedProperty[0]) {
                if (w.includes("^ign^")) div.classList.add("not-editable");
            } else {
                div.classList.add("not-editable");
                let max = div.clientHeight * 0.6;
                let fontSize;
                let span = document.createElement('span');
                span.style.fontSize = max + 'px';
                span.innerHTML = savedProperty[1].value;
                div.appendChild(span);
                span.style.whiteSpace = 'nowrap';
                span.style.display = 'inline-block';
                span.style.width = 'auto';
                span.style.fontSize = max + 'px';
                while(span.scrollWidth > div.clientWidth * 0.95 || span.clientHeight > max){
                    fontSize = parseInt(span.style.fontSize.slice(0, -2));
                    if (fontSize <= 1) break;
                    span.style.fontSize = fontSize - 1 + 'px';
                }
                while(span.clientHeight > max){
                    fontSize = parseInt(span.style.fontSize.slice(0, -2));
                    span.style.fontSize = fontSize - 1 + 'px';
                }
                this.result[i] = true;
            }
        });
        let i = 0;
        while(this.container.querySelector("#div" + i * 2).classList.contains("not-editable"))i++;
        this.inputIndex = i;
        this.selectedInput = this.container.querySelector("#div" + i * 2);
        this.inputStyling();
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
        this.splitMode = false;
        this.command = "";
        this.tabulator = "";
        this.tabCount = 0;
        this.v = 1;
        this.padding = [];
        this.splitPadding = new Array(3).fill(new Array(3).fill(0));
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
                const request = window.indexedDB.open('Vocabulary', 2);
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
                        this.padding = [];
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
                        const homeFunction = ()=>{
                            (0, _.removeAllEventListeners)();
                            if (this.tabMode) this.cancelTabMode();
                            if (param.includes('add') && !(this.currentWord.singular.filter((value)=>value === '').length === (param.includes('verb') ? 3 : 6) && this.currentWord.plural.filter((value)=>value === '').length === (param.includes('verb') ? 3 : 6))) {
                                const transaction = this.database.transaction(`inflected vocabulary`, 'readwrite');
                                transaction.onerror = ()=>console.error(transaction.error);
                                const objectStore = transaction.objectStore(`inflected vocabulary`);
                                const req = objectStore.put(this.currentWord, this.wordIndex + 1);
                                req.onerror = ()=>console.error(req.error);
                                document.querySelectorAll('.editable').forEach((el)=>el.classList.add('savedElement'));
                                setTimeout(()=>{
                                    document.querySelectorAll('.editable').forEach((el)=>el.classList.remove('savedElement'));
                                    this.splitMode = false;
                                    this.tabulator = '';
                                    (0, _.home).modifyDocument();
                                    this.commandMode = false;
                                }, 200);
                                return;
                            }
                            this.splitMode = false;
                            this.tabulator = '';
                            (0, _.home).modifyDocument();
                            this.commandMode = false;
                        };
                        icon.addEventListener('load', (_)=>{
                            icon.contentDocument.addEventListener('click', homeFunction);
                        });
                        this.homeButton.addEventListener('click', homeFunction);
                        this.homeButton.insertAdjacentElement('beforeend', icon);
                        this.navbar.appendChild(this.homeButton);
                        if (param.startsWith('add')) {
                            this.deletionButton = document.createElement('button');
                            this.deletionButton.classList.add('roundButton', 'deletionButton');
                            this.deletionButton.innerHTML = 'X';
                            this.deletionButton.tabIndex = -1;
                            if (param.includes('verb')) this.deletionButton.classList.add('v');
                            this.navbar.appendChild(this.deletionButton);
                            if (param == 'add nouns') {
                                this.genderSplitButton = document.createElement('button');
                                this.genderSplitButton.classList.add('roundButton', 'genderSplitButton');
                                let svg = document.createElement('img');
                                svg.src = '/split-genders.svg';
                                this.genderSplitButton.append(svg);
                                this.navbar.appendChild(this.genderSplitButton);
                                [
                                    svg,
                                    this.genderSplitButton
                                ].forEach((el)=>el.addEventListener('click', ()=>this.splitGenders(this.currentWord)));
                            }
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
                if (!this.splitMode) {
                    let div = this.container.children[i];
                    let array = Object.values(this.currentWord)[i % 3 - 1];
                    let n = Math.floor(i / 3) - 1;
                    this.adjustInputWidth(div, array[n], false);
                } else for(let ii = 0; ii < 3; ii++){
                    let div = this.container.children[i].children[ii];
                    let array = Object.values(this.currentWord)[i % 3 - 1];
                    let n = Math.floor(i / 3 - 1);
                    this.adjustInputWidth(div, array[n].split(mfORn)[ii + 1], false);
                }
            }
            animation = setTimeout(()=>{
                for(let j = 4; j < this.container.childElementCount; j++)if (j % 3 > 0) {
                    if (this.automaticPaddingAdjustment) {
                        if (this.splitMode) for(let k = 0; k < 3; k++){
                            let input = this.container.children[j].children[k];
                            let array = Object.values(this.currentWord)[j % 3 - 1];
                            let n = Math.floor(j / 3) - 1;
                            let splitto = array[n].split(mfORn).slice(1);
                            this.adjustInputWidth(input, splitto[k], false);
                            this.automaticPaddingAnimation(input, false, false);
                        }
                        this.automaticPaddingAnimation(this.container.children[j], false, false);
                    } else this.paddingAnimation(this.container.children[j]);
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
                    element.addEventListener('click', (event)=>{
                        if (this.splitMode) {
                            let source = event.target;
                            if (source === element) return;
                            let count;
                            for(let q = 0; q < element.childElementCount; q++)if (element.children[q] === source) {
                                count = q;
                                break;
                            }
                            this.inputSubIndex = count;
                        }
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
                    let inp = this.splitMode ? this.selectedInput.children[this.inputSubIndex] : this.selectedInput;
                    if (this.commandMode) {
                        forbiddenCharacters.push('#');
                        if (event.key === 'Enter') {
                            if (this.command.endsWith('%') && !this.automaticPaddingAdjustment) {
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
                                            if (div && i > 3 && i % 3 != 0) {
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
                                            if (div && i > 3 && i % 3 != 0) {
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
                                    this.splitMode = false;
                                    this.tabulator = '';
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
                                    if (!this.splitMode) {
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
                                    }
                                default:
                                    this.command.split('').forEach((_)=>{
                                        inp.lastElementChild.remove();
                                        this.keys--;
                                    });
                                    this.commandMode = false;
                                    this.changeSelectedInput();
                                    break;
                            }
                            return;
                        } else if (event.key === 'ArrowUp') {
                            this.command.split('').forEach((_)=>{
                                inp.removeChild(inp.lastElementChild);
                                this.keys--;
                            });
                            if (this.inputIndex > 6) this.inputIndex -= 3;
                            this.changeSelectedInput();
                            this.command = '';
                            this.commandMode = false;
                            return;
                        } else if (event.key === 'ArrowDown') {
                            this.command.split('').forEach((_)=>{
                                inp.removeChild(inp.lastElementChild);
                                this.keys--;
                            });
                            this.command = '';
                            this.commandMode = false;
                            if (this.inputIndex < 18 - this.v) this.inputIndex += 3;
                            this.changeSelectedInput();
                            return;
                        } else if (event.key === 'ArrowLeft') {
                            this.command.split('').forEach((_)=>{
                                inp.removeChild(inp.lastElementChild);
                                this.keys--;
                            });
                            this.command = '';
                            this.commandMode = false;
                            if (this.inputIndex > 4) {
                                if (this.splitMode && this.inputSubIndex > 0) this.inputSubIndex--;
                                else {
                                    this.inputIndex--;
                                    if (this.inputIndex % 3 === 0) this.inputIndex--;
                                    if (this.splitMode && this.inputSubIndex === 0) this.inputSubIndex = 2;
                                }
                                this.changeSelectedInput();
                            } else if (this.inputIndex == 4 && this.inputSubIndex > 0 && this.splitMode) {
                                this.inputSubIndex--;
                                this.changeSelectedInput();
                            }
                            return;
                        } else if (event.key === 'ArrowRight') {
                            this.command.split('').forEach((_)=>{
                                inp.removeChild(inp.lastElementChild);
                                this.keys--;
                            });
                            this.command = '';
                            this.commandMode = false;
                            if (this.inputIndex < 20 - this.v) {
                                if (this.splitMode && this.inputSubIndex < 2) this.inputSubIndex++;
                                else {
                                    this.inputIndex++;
                                    if (this.inputIndex % 3 === 0) this.inputIndex++;
                                    if (this.splitMode && this.inputSubIndex === 2) this.inputSubIndex = 0;
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
                                let w = Math.round((inp.getBoundingClientRect().width - parseFloat(window.getComputedStyle(inp).paddingLeft) - parseFloat(window.getComputedStyle(inp).paddingRight)) * 100) / 100;
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
                        if (this.commandMode && (inp.classList.contains('known-case') || forbiddenCharacters.includes(event.key) || event.key.length > 1)) return;
                    }
                    if (!this.commandMode) {
                        if (event.key === 'ArrowRight') {
                            if (this.inputIndex < 20 - this.v) {
                                if (this.splitMode && this.inputSubIndex < 2) this.inputSubIndex++;
                                else {
                                    this.inputIndex++;
                                    if (this.inputIndex % 3 === 0) this.inputIndex++;
                                    if (this.splitMode && this.inputSubIndex === 2) this.inputSubIndex = 0;
                                }
                                this.changeSelectedInput();
                            } else if (this.splitMode && this.inputIndex == 20 - this.v && this.inputSubIndex < 2) {
                                this.inputSubIndex++;
                                this.changeSelectedInput();
                            }
                            return;
                        } else if (event.key === 'ArrowLeft') {
                            if (this.inputIndex > 4) {
                                if (this.splitMode && this.inputSubIndex > 0) this.inputSubIndex--;
                                else {
                                    this.inputIndex--;
                                    if (this.inputIndex % 3 === 0) this.inputIndex--;
                                    if (this.splitMode && this.inputSubIndex === 0) this.inputSubIndex = 2;
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
                                let array = Object.values(this.currentWord)[this.inputIndex % 3 - 1];
                                let n = Math.floor(this.inputIndex / 3) - 1;
                                let splitto = array[n].split(mfORn).slice(1);
                                splitto[this.inputSubIndex] = splitto[this.inputSubIndex - 1];
                                array[n] = `^^m^^${splitto[0]}^^f^^${splitto[1]}^^n^^${splitto[2]}`;
                                Object.defineProperty(this.currentWord, Object.keys(this.currentWord)[this.inputIndex % 3 - 1], {
                                    value: array
                                });
                                let phrase = splitto[this.inputSubIndex];
                                let tabulatorStyle = false;
                                let inp = this.selectedInput.children[this.inputSubIndex];
                                let objectCount = 0;
                                let objectsLoaded = 0;
                                const id = this.inputIndex;
                                const count = this.inputSubIndex;
                                for(let ii = 0; ii < phrase.length; ii++){
                                    let object = document.createElement('object');
                                    this.keys++;
                                    object.addEventListener('load', (_)=>{
                                        let svg = object.contentDocument;
                                        svg.querySelector('#tspan7').innerHTML = phrase.charAt(ii);
                                        if (object.classList.contains('tabulator')) this.tabulatorAnimation(object);
                                        objectsLoaded++;
                                        if (objectsLoaded === objectCount) {
                                            this.adjustInputWidth(inp, phrase, false);
                                            let pad = this.splitPadding[id][count];
                                            inp.style.padding = `${pad}px 0.25vw`;
                                        }
                                    });
                                    object.data = './keys/Reversion_T.svg';
                                    object.id = `key${this.keys}-inp${this.inputIndex}-sub${this.inputSubIndex}`;
                                    object.style.height = `100%`;
                                    objectCount++;
                                    inp.insertAdjacentElement('beforeend', object);
                                    if (this.selectedInput.children[id - 1]) object.classList.add('tabulator');
                                }
                            }
                            if (this.inputIndex < 20 - this.v || this.inputSubIndex != 2) {
                                if (event.key === 'Enter' && !inp.classList.contains('known-case')) {
                                    let attemptList = Object.values(this.currentWord)[this.inputIndex % 3 - 1];
                                    let solutionList = Object.values(this.vocabulary[this.currentWordIndex])[this.inputIndex % 3 - 1];
                                    let result = Object.values(this.result)[this.inputIndex % 3 - 1];
                                    let n = Math.floor(this.inputIndex / 3) - 1;
                                    let attempt = this.splitMode ? attemptList[n].split(mfORn)[sub + 1] : attemptList[n];
                                    let solution = this.splitMode ? solutionList[n].split(mfORn)[sub + 1] : solutionList[n];
                                    if (this.compare(attempt, solution)) {
                                        for(let i = 0; i < inp.childElementCount; i++){
                                            let object = inp.children[i];
                                            object.addEventListener('load', (_)=>{
                                                this.successAnimation(object);
                                            });
                                            if (object.contentDocument) this.successAnimation(object);
                                        }
                                        if ((!this.splitMode ? result[n] : result[n][sub]) === undefined) {
                                            if (this.splitMode) result[n][this.inputSubIndex] = true;
                                            else result[n] = true;
                                            Object.defineProperty(this.result, Object.keys(this.result)[this.inputIndex % 3 - 1], {
                                                value: result
                                            });
                                            setTimeout((_)=>{
                                                inp.classList.remove('shadowDesign');
                                                inp.classList.add('greenShadowDesign');
                                            }, 120);
                                        }
                                    } else if (attempt.replace('^tab^', '') != '') {
                                        for(let i = 0; i < inp.childElementCount; i++){
                                            let object = inp.children[i];
                                            object.addEventListener('load', (_)=>this.failureAnimation(object));
                                            if (object.contentDocument) this.failureAnimation(object);
                                        }
                                        if ((!this.splitMode ? result[n] : result[n][sub]) === undefined) {
                                            if (this.splitMode) result[n][sub] = false;
                                            else result[n] = false;
                                            Object.defineProperty(this.result, Object.keys(this.result)[this.inputIndex % 3 - 1], {
                                                value: result
                                            });
                                            setTimeout((_)=>{
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
                                    if (this.splitMode && this.inputSubIndex < 2 && enter) this.inputSubIndex++;
                                    else {
                                        this.inputIndex += 3;
                                        if (this.splitMode && this.inputSubIndex === 2 && enter) this.inputSubIndex = 0;
                                    }
                                    this.changeSelectedInput();
                                } else if (enter && this.inputIndex === 19 - this.v) {
                                    if (this.splitMode && this.inputSubIndex < 2) this.inputSubIndex++;
                                    else {
                                        this.inputIndex = 5;
                                        if (this.splitMode && this.inputSubIndex === 2) this.inputSubIndex = 0;
                                    }
                                    this.changeSelectedInput();
                                } else if (enter && this.inputIndex === 20 - this.v) {
                                    if (this.splitMode && this.inputSubIndex < 2) {
                                        this.inputSubIndex++;
                                        this.changeSelectedInput();
                                    } else {
                                        this.currentWord.singular.forEach((word, i)=>{
                                            let index = 1 + (i + 1) * 3;
                                            for(let ii = 0; ii < (this.splitMode ? 3 : 1); ii++){
                                                let m = index % 3 - 1;
                                                let n = Math.floor(index / 3) - 1;
                                                let wrd = this.splitMode ? word.split(mfORn)[ii + 1] : word;
                                                let sol = this.splitMode ? Object.values(this.vocabulary[this.currentWordIndex])[m][n].split(mfORn)[ii + 1] : Object.values(this.vocabulary[this.currentWordIndex])[m][n];
                                                if (this.compare(wrd, sol)) {
                                                    for(let iii = 0; iii < (this.splitMode ? this.container.children[index].children[ii] : this.container.children[index]).childElementCount; iii++)if (index % 3 != 0 && !(this.splitMode ? this.container.children[index].children[ii] : this.container.children[index]).classList.contains('known-case')) {
                                                        let object = (this.splitMode ? this.container.children[index].children[ii] : this.container.children[index]).children[iii];
                                                        this.successAnimation(object);
                                                    }
                                                    if ((this.splitMode ? Object.values(this.result)[m][n][ii] : Object.values(this.result)[m][n]) === undefined) {
                                                        let array = Object.values(this.result)[m];
                                                        if (this.splitMode) array[n][ii] = true;
                                                        else array[n] = true;
                                                        Object.defineProperty(this.result, Object.keys(this.result)[m], {
                                                            value: array
                                                        });
                                                        setTimeout((_)=>{
                                                            (this.splitMode ? this.container.children[index].children[ii] : this.container.children[index]).classList.remove('shadowDesign');
                                                            (this.splitMode ? this.container.children[index].children[ii] : this.container.children[index]).classList.add('greenShadowDesign');
                                                        }, 120);
                                                    }
                                                } else {
                                                    for(let iii = 0; iii < (this.splitMode ? this.container.children[index].children[ii] : this.container.children[index]).childElementCount; iii++)if (index % 3 != 0 && !(this.splitMode ? this.container.children[index].children[ii] : this.container.children[index]).classList.contains('known-case')) {
                                                        let object = (this.splitMode ? this.container.children[index].children[ii] : this.container.children[index]).children[iii];
                                                        this.failureAnimation(object);
                                                    }
                                                    if ((this.splitMode ? Object.values(this.result)[m][n][ii] : Object.values(this.result)[m][n]) === undefined) {
                                                        let array = Object.values(this.result)[m];
                                                        if (this.splitMode) array[n][ii] = false;
                                                        else array[n] = false;
                                                        Object.defineProperty(this.result, Object.keys(this.result)[m], {
                                                            value: array
                                                        });
                                                        setTimeout((_)=>{
                                                            (this.splitMode ? this.container.children[index].children[ii] : this.container.children[index]).classList.remove('shadowDesign');
                                                            (this.splitMode ? this.container.children[index].children[ii] : this.container.children[index]).classList.add('redShadowDesign');
                                                        }, 120);
                                                    }
                                                }
                                            }
                                        });
                                        this.currentWord.plural.forEach((word, i)=>{
                                            let index = 2 + (i + 1) * 3;
                                            for(let ii = 0; ii < (this.splitMode ? 3 : 1); ii++){
                                                let m = index % 3 - 1;
                                                let n = Math.floor(index / 3) - 1;
                                                let wrd = this.splitMode ? word.split(mfORn)[ii + 1] : word;
                                                let sol = this.splitMode ? Object.values(this.vocabulary[this.currentWordIndex])[m][n].split(mfORn)[ii + 1] : Object.values(this.vocabulary[this.currentWordIndex])[m][n];
                                                if (this.compare(wrd, sol)) {
                                                    for(let iii = 0; iii < (this.splitMode ? this.container.children[index].children[ii] : this.container.children[index]).childElementCount; iii++)if (index % 3 != 0 && !(this.splitMode ? this.container.children[index].children[ii] : this.container.children[index]).classList.contains('known-case')) {
                                                        let object = (this.splitMode ? this.container.children[index].children[ii] : this.container.children[index]).children[iii];
                                                        object.addEventListener('load', ()=>this.successAnimation(object));
                                                        if (object.contentDocument) this.successAnimation(object);
                                                    }
                                                    if ((this.splitMode ? Object.values(this.result)[m][n][ii] : Object.values(this.result)[m][n]) === undefined) {
                                                        let array = Object.values(this.result)[m];
                                                        if (this.splitMode) array[n][ii] = true;
                                                        else array[n] = true;
                                                        Object.defineProperty(this.result, Object.keys(this.result)[m], {
                                                            value: array
                                                        });
                                                        setTimeout((_)=>{
                                                            (this.splitMode ? this.container.children[index].children[ii] : this.container.children[index]).classList.remove('shadowDesign');
                                                            (this.splitMode ? this.container.children[index].children[ii] : this.container.children[index]).classList.add('greenShadowDesign');
                                                        }, 120);
                                                    }
                                                } else {
                                                    for(let iii = 0; iii < (this.splitMode ? this.container.children[index].children[ii] : this.container.children[index]).childElementCount; iii++)if (index % 3 != 0 && !(this.splitMode ? this.container.children[index].children[ii] : this.container.children[index]).classList.contains('known-case')) {
                                                        let object = (this.splitMode ? this.container.children[index].children[ii] : this.container.children[index]).children[iii];
                                                        this.failureAnimation(object);
                                                    }
                                                    if ((this.splitMode ? Object.values(this.result)[m][n][ii] : Object.values(this.result)[m][n]) === undefined) {
                                                        let array = Object.values(this.result)[m];
                                                        if (this.splitMode) array[n][ii] = false;
                                                        else array[n] = false;
                                                        Object.defineProperty(this.result, Object.keys(this.result)[m], {
                                                            value: array
                                                        });
                                                        setTimeout((_)=>{
                                                            (this.splitMode ? this.container.children[index].children[ii] : this.container.children[index]).classList.remove('shadowDesign');
                                                            (this.splitMode ? this.container.children[index].children[ii] : this.container.children[index]).classList.add('redShadowDesign');
                                                        }, 120);
                                                    }
                                                }
                                            }
                                        });
                                        if (this.compareObjects(this.currentWord, this.vocabulary[this.currentWordIndex])) {
                                            this.totalAttempts += 11 - this.v / 3 * 2;
                                            let addition = this.result.singular.filter((w)=>this.splitMode ? Array.isArray(w) && w.every((v)=>v === true) : w === true).length + this.result.plural.filter((w)=>this.splitMode ? Array.isArray(w) && w.every((v)=>v === true) : w === true).length;
                                            this.totalPoints += addition;
                                            if (addition != 12 - this.v / 3 * 2) this.vocabulary[this.currentWordIndex].probability *= 1.2;
                                            else this.vocabulary[this.currentWordIndex].probability *= 0.8;
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
                                        break;
                                    }
                                }
                            }while (enter && (this.splitMode ? this.selectedInput.children[this.inputSubIndex] : this.selectedInput).classList.contains('known-case'));
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
                                let array = Object.values(this.currentWord)[this.inputIndex % 3 - 1];
                                let n = Math.floor(this.inputIndex / 3) - 1;
                                let index;
                                if (this.splitMode) {
                                    if (this.inputSubIndex == 0) index = array[n].search(F);
                                    else if (this.inputSubIndex == 1) index = array[n].search(N);
                                    else index = array[n].length;
                                }
                                if (!this.splitMode && array[n].slice(-5) === '^tab^') {
                                    array[n] = array[n].slice(0, array[n].length - 6);
                                    if (this.tabCount > 1) this.tabCount--;
                                    this.tabMode = !this.tabMode;
                                    inp.classList.add('tab');
                                    if (!this.tabMode) inp.classList.remove('tab');
                                } else if (this.splitMode && index != -1 && index !== undefined) {
                                    if (array[n].slice(index - 5, index) === '^tab^') {
                                        array[n] = array[n].slice(0, index - 6) + array[n].slice(index);
                                        if (this.tabCount > 1) this.tabCount--;
                                        this.tabMode = !this.tabMode;
                                        inp.classList.add('tab');
                                        if (!this.tabMode) inp.classList.remove('tab');
                                    }
                                    array[n] = array[n].slice(0, index - 1) + array[n].slice(index);
                                } else array[n] = array[n].slice(0, array[n].length - 1);
                                Object.defineProperty(this.currentWord, Object.keys(this.currentWord)[this.inputIndex % 3 - 1], {
                                    value: array
                                });
                                this.keys--;
                                if (this.tabMode) this.tabulator = this.tabulator.slice(0, this.tabulator.length - 1);
                            } else if (this.tabMode) this.cancelTabMode();
                            let pad = this.splitMode ? this.splitPadding[this.inputIndex][this.inputSubIndex] : this.padding[this.inputIndex];
                            if (this.automaticPaddingAdjustment && pad > inp.offsetHeight * 0.05) {
                                let object = inp.lastElementChild;
                                if (!object) return;
                                let w = Math.round((inp.getBoundingClientRect().width - parseFloat(window.getComputedStyle(inp).paddingLeft) - parseFloat(window.getComputedStyle(inp).paddingRight)) * 100) / 100;
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
                        } else if (inp.classList.contains('known-case')) return;
                        else if (event.key === '#') {
                            this.command = '';
                            this.commandMode = true;
                        } else if (event.key === 'Tab') {
                            if (this.tabulator) {
                                if (this.keys + this.tabulator.length >= this.selectedInput.clientWidth / (this.selectedInput.clientHeight - parseFloat(this.selectedInput.style.padding)) && !this.automaticPaddingAdjustment) this.selectedInput.childNodes.forEach((v, i)=>{
                                    this.failureAnimation(this.selectedInput.children[i]);
                                });
                                else {
                                    let array = Object.values(this.currentWord)[this.inputIndex % 3 - 1];
                                    let n = Math.floor(this.inputIndex / 3) - 1;
                                    let index;
                                    if (this.splitMode) {
                                        if (this.inputSubIndex == 0) index = array[n].search(F);
                                        else if (this.inputSubIndex == 1) index = array[n].search(N);
                                        else index = array[n].length;
                                    }
                                    if (this.splitMode) array[n] = array[n].slice(0, index) + this.tabulator + array[n].slice(index);
                                    else array[n] += this.tabulator;
                                    Object.defineProperty(this.currentWord, Object.keys(this.currentWord)[this.inputIndex % 3 - 1], {
                                        value: array
                                    });
                                    let objectsLoaded = 0;
                                    let objectCount = 0;
                                    this.tabulator.split('').forEach((letter)=>{
                                        let object = document.createElement('object');
                                        object.data = './keys/Reversion_T.svg';
                                        object.id = `key${this.keys}-inp${this.inputIndex}`;
                                        object.style.height = `100%`;
                                        this.selectedInput.insertAdjacentElement('beforeend', object);
                                        object.hidden = true;
                                        objectCount++;
                                        object.addEventListener('load', (_)=>{
                                            object.hidden = false;
                                            objectsLoaded++;
                                            let svg = object.contentDocument;
                                            svg.querySelector('#tspan7').innerHTML = letter;
                                            this.keys++;
                                            this.tabulatorAnimation(object);
                                            if (objectsLoaded === objectCount) this.adjustInputWidth(inp, array[n]);
                                        });
                                    });
                                }
                            }
                            return;
                        } else if (forbiddenCharacters.includes(event.key) || event.key.length > 1) return;
                    }
                    let object = document.createElement('object');
                    object.data = './keys/Reversion_T.svg';
                    object.id = `key${this.keys}-inp${this.inputIndex}`;
                    object.style.height = `100%`;
                    inp.insertAdjacentElement('beforeend', object);
                    object.hidden = true;
                    object.addEventListener('load', (_1)=>{
                        object.hidden = false;
                        let width = Math.round(object.getBoundingClientRect().width * 100) / 100;
                        object.hidden = true;
                        let w = Math.round((inp.getBoundingClientRect().width - parseFloat(window.getComputedStyle(inp).paddingLeft) - parseFloat(window.getComputedStyle(inp).paddingRight) - parseFloat(window.getComputedStyle(inp).borderLeftWidth) - parseFloat(window.getComputedStyle(inp).borderRightWidth)) * 100) / 100;
                        if (!this.automaticPaddingAdjustment && this.keys + 1 > w / width) {
                            object.remove();
                            for(let i = 0; i < this.keys; i++)this.failureAnimation(this.selectedInput.children[i]);
                            return;
                        } else if (this.automaticPaddingAdjustment) {
                            object.hidden = false;
                            let aspectRatio = object.getBoundingClientRect().height / object.getBoundingClientRect().width;
                            object.hidden = true;
                            let h = w / (this.keys + 1) * aspectRatio;
                            let padding = (inp.getBoundingClientRect().height - h) / 2;
                            if (padding > inp.getBoundingClientRect().height / 2 * 0.85) {
                                object.remove();
                                for(let i = 0; i < this.keys; i++)this.failureAnimation(inp.children[i]);
                                return;
                            } else {
                                const prev = this.splitMode ? this.splitPadding[this.inputIndex][this.inputSubIndex] : this.padding[this.inputIndex];
                                if (this.splitMode && this.inputSubIndex != undefined) this.splitPadding[this.inputIndex][this.inputSubIndex] = Math.max(padding, inp.offsetHeight * 0.05);
                                else this.padding[this.inputIndex] = Math.max(padding, inp.offsetHeight * 0.05);
                                this.animatedBorderWidth = parseFloat(window.getComputedStyle(inp).borderTopWidth);
                                let now = this.splitMode ? this.splitPadding[this.inputIndex][this.inputSubIndex] : this.padding[this.inputIndex];
                                if (prev !== now) this.automaticPaddingAnimation(inp, true, true);
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
                            let index;
                            if (this.splitMode) {
                                if (this.inputSubIndex == 0) index = array[n].search(F);
                                else if (this.inputSubIndex == 1) index = array[n].search(N);
                                else index = array[n].length;
                                array[n] = array[n].slice(0, index) + event.key + array[n].slice(index);
                            } else array[n] += event.key;
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
                window.addEventListener('keydown', (event)=>{
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
                document.querySelectorAll('.editable').forEach((element)=>{
                    element.addEventListener('click', (event)=>{
                        if (this.tabMode) this.cancelTabMode();
                        if (this.splitMode) {
                            let source = event.target;
                            if (source === element) return;
                            let count;
                            for(let q = 0; q < element.childElementCount; q++)if (element.children[q] === source) {
                                count = q;
                                break;
                            }
                            this.inputSubIndex = count;
                        }
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
                                    if (this.splitMode) {
                                        this.splitMode = false;
                                        document.querySelectorAll('.split').forEach((split)=>{
                                            split.innerHTML = '';
                                            split.classList.remove('split');
                                        });
                                    }
                                    if (this.genderSplitButton) this.genderSplitButton.style.display = 'block';
                                    if (this.currentWord.singular[0].search(mfANDn) != -1) {
                                        this.splitGenders(this.currentWord);
                                        return;
                                    }
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
                                                object.data = './keys/Reversion_T.svg';
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
                                                object.data = './keys/Reversion_T.svg';
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
                                    if (this.splitMode) {
                                        this.splitMode = false;
                                        document.querySelectorAll('.split').forEach((split)=>{
                                            split.innerHTML = '';
                                            split.classList.remove('split');
                                        });
                                    }
                                    if (this.genderSplitButton) this.genderSplitButton.style.display = 'block';
                                    if (this.currentWord.singular[0].search(mfANDn) != -1) {
                                        this.splitGenders(this.currentWord);
                                        return;
                                    }
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
                                                object.data = './keys/Reversion_T.svg';
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
                                                object.data = './keys/Reversion_T.svg';
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
                                        if (i % 3 != 0) {
                                            this.container.children[i].innerHTML = '';
                                            this.container.children[i].classList.remove('split');
                                        }
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
                            if (element === this.buttonLeft) {
                                let vocab = this.vocabulary.slice(0, this.wordIndex);
                                let wi = vocab.findLastIndex((w)=>w.verb === param.includes('verb'));
                                if (this.vocabulary[wi]) {
                                    if (this.currentWord.singular.filter((value)=>value === '').length === (param.includes('verb') ? 3 : 6) && this.currentWord.plural.filter((value)=>value === '').length === (param.includes('verb') ? 3 : 6) && this.wordIndex === this.vocabulary.length) return;
                                }
                            }
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
                    this.commandMode = false;
                    this.command = '';
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
                            let objectCount = 0;
                            let objectsLoaded = 0;
                            if (this.splitMode) {
                                this.splitMode = false;
                                document.querySelectorAll('.split').forEach((split)=>{
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
                                        object.data = './keys/Reversion_T.svg';
                                        object.id = `key${ii}-inp${i}`;
                                        object.style.height = `100%`;
                                        objectCount++;
                                        this.container.children[i].insertAdjacentElement('beforeend', object);
                                        if (tabulatorStyle) tabulatorIndexes.push(ii);
                                        object.addEventListener('load', (_)=>{
                                            let svg = object.contentDocument;
                                            svg.querySelector('#tspan7').innerHTML = singular[Math.floor(i / 3) - 1].charAt(ii);
                                            if (overallIndexes.find((indexes)=>indexes[0] === parseInt(object.parentElement.id.slice(3))) != undefined && overallIndexes.find((indexes)=>indexes[0] === parseInt(object.parentElement.id.slice(3)))[1].includes(parseInt(object.id.slice(3)))) {
                                                this.tabulatorAnimation(object);
                                                object.classList.add('tabulator');
                                            }
                                            objectsLoaded++;
                                            if (objectCount === objectsLoaded) {
                                                let objects = this.container.querySelectorAll('object');
                                                objects.forEach((obj)=>obj.hidden = false);
                                                for(let i = 4; i < this.container.children.length; i++)if (i % 3 > 0) {
                                                    let div = this.container.children[i];
                                                    let array = Object.values(this.currentWord)[i % 3 - 1];
                                                    let n = Math.floor(i / 3) - 1;
                                                    this.adjustInputWidth(div, array[n]);
                                                }
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
                                        object.data = './keys/Reversion_T.svg';
                                        object.id = `key${ii}-inp${i}`;
                                        object.style.height = `100%`;
                                        objectCount++;
                                        this.container.children[i].insertAdjacentElement('beforeend', object);
                                        if (tabulatorStyle) tabulatorIndexes.push(ii);
                                        object.addEventListener('load', (_)=>{
                                            let svg = object.contentDocument;
                                            svg.querySelector('#tspan7').innerHTML = plural[Math.floor(i / 3) - 1].charAt(ii);
                                            if (overallIndexes.find((indexes)=>indexes[0] === parseInt(object.parentElement.id.slice(3))) != undefined && overallIndexes.find((indexes)=>indexes[0] === parseInt(object.parentElement.id.slice(3)))[1].includes(parseInt(object.id.slice(3)))) {
                                                this.tabulatorAnimation(object);
                                                object.classList.add('tabulator');
                                            }
                                            objectsLoaded++;
                                            if (objectCount === objectsLoaded) {
                                                let objects = this.container.querySelectorAll('object');
                                                objects.forEach((obj)=>obj.hidden = false);
                                                for(let i = 4; i < this.container.children.length; i++)if (i % 3 > 0) {
                                                    let div = this.container.children[i];
                                                    let array = Object.values(this.currentWord)[i % 3 - 1];
                                                    let n = Math.floor(i / 3) - 1;
                                                    this.adjustInputWidth(div, array[n]);
                                                }
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
                                if (this.splitMode) {
                                    this.splitMode = false;
                                    document.querySelectorAll('.split').forEach((split)=>{
                                        split.innerHTML = '';
                                        split.classList.remove('split');
                                    });
                                }
                                if (this.genderSplitButton) this.genderSplitButton.style.display = 'block';
                                if (this.currentWord.singular[0].search(mfANDn) != -1) {
                                    this.splitGenders(this.currentWord);
                                    return;
                                }
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
                                            object.data = './keys/Reversion_T.svg';
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
                                            object.data = './keys/Reversion_T.svg';
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
                                else window.resizeBy(0, 0);
                            };
                        }
                    }
                };
                this.buttonLeft.addEventListener('mouseup', this.buttonLeftFunction);
                this.buttonRightFunction = ()=>{
                    this.commandMode = false;
                    this.command = '';
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
                                if (i % 3 != 0) {
                                    this.container.children[i].innerHTML = '';
                                    this.container.children[i].classList.remove('split');
                                }
                                this.container.children[i].classList.remove('selectedElement');
                            }
                            this.splitMode = false;
                            if (this.genderSplitButton) this.genderSplitButton.style.display = 'block';
                            this.inputIndex = 4;
                            this.selectedInput = this.container.children[4];
                            this.tabCount = 0;
                            this.selectedInput.classList.add('selectedElement');
                        };
                        window.resizeBy(0, 0);
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
                            if (this.splitMode) {
                                this.splitMode = false;
                                document.querySelectorAll('.split').forEach((split)=>{
                                    split.innerHTML = '';
                                    split.classList.remove('split');
                                });
                            }
                            if (this.genderSplitButton) this.genderSplitButton.style.display = 'block';
                            if (this.currentWord.singular[0].search(mfANDn) != -1) {
                                this.splitGenders(this.currentWord);
                                return;
                            }
                            let overallIndexes = [];
                            let tabulatorStyle = false;
                            let objectCount = 0;
                            let objectsLoaded = 0;
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
                                        object.data = './keys/Reversion_T.svg';
                                        object.id = `key${ii}-inp${i}`;
                                        object.style.height = `100%`;
                                        this.container.children[i].insertAdjacentElement('beforeend', object);
                                        if (tabulatorStyle) tabulatorIndexes.push(ii);
                                        objectCount++;
                                        object.addEventListener('load', (_)=>{
                                            let svg = object.contentDocument;
                                            svg.querySelector('#tspan7').innerHTML = singular[Math.floor(i / 3) - 1].charAt(ii);
                                            if (overallIndexes.find((indexes)=>indexes[0] === parseInt(object.parentElement.id.slice(3))) && overallIndexes.find((indexes)=>indexes[0] === parseInt(object.parentElement.id.slice(3)))[1].includes(parseInt(object.id.slice(3)))) {
                                                this.tabulatorAnimation(object);
                                                object.classList.add('tabulator');
                                            }
                                            objectsLoaded++;
                                            if (objectCount === objectsLoaded) {
                                                let objects = this.container.querySelectorAll('object');
                                                for(let i = 4; i < this.container.children.length; i++)if (i % 3 > 0) {
                                                    let div = this.container.children[i];
                                                    let array = Object.values(this.currentWord)[i % 3 - 1];
                                                    let n = Math.floor(i / 3) - 1;
                                                    this.adjustInputWidth(div, array[n]);
                                                }
                                            }
                                        });
                                    }
                                    overallIndexes.push([
                                        i,
                                        tabulatorIndexes
                                    ]);
                                } else if (i % 3 === 2) {
                                    this.container.children[i].innerHTML = '';
                                    for(let ii = 0; ii < plural[Math.floor(i / 3) - 1].length; ii++){
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
                                            object.addEventListener('load', (_)=>{
                                                let svg = object.contentDocument;
                                                svg.querySelector('#tspan7').innerHTML = plural[Math.floor(i / 3) - 1].charAt(ii);
                                                if (overallIndexes.find((indexes)=>indexes[0] === parseInt(object.parentElement.id.slice(3))) && overallIndexes.find((indexes)=>indexes[0] === parseInt(object.parentElement.id.slice(3)))[1].includes(parseInt(object.id.slice(3)))) {
                                                    this.tabulatorAnimation(object);
                                                    object.classList.add('tabulator');
                                                }
                                                objectsLoaded++;
                                                if (objectCount === objectsLoaded) {
                                                    for(let i = 4; i < this.container.children.length; i++)if (i % 3 > 0) {
                                                        let div = this.container.children[i];
                                                        let array = Object.values(this.currentWord)[i % 3 - 1];
                                                        let n = Math.floor(i / 3) - 1;
                                                        this.adjustInputWidth(div, array[n]);
                                                    }
                                                }
                                            });
                                            objectCount++;
                                        }
                                        overallIndexes.push([
                                            i,
                                            tabulatorIndexes
                                        ]);
                                    }
                                }
                                this.changeSelectedInput();
                            }
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
                        let inp = this.splitMode ? this.selectedInput.children[this.inputSubIndex] : this.selectedInput;
                        if (event.key === 'Enter') {
                            if (this.command.endsWith('%') && !this.automaticPaddingAdjustment) {
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
                                            if (i > 3 && i % 3 != 0) {
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
                                    this.command.split('').forEach((_)=>{
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
                                case "#n\xe4chstes":
                                    this.command.split('').forEach((_)=>{
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
                                case "#hauptmen\xfc":
                                case '#home menu':
                                case '#h':
                                    this.command = '';
                                    this.commandMode = false;
                                    (0, _.removeAllEventListeners)();
                                    this.splitMode = false;
                                    this.tabulator = '';
                                    (0, _.home).modifyDocument();
                                    return;
                                case '#geschlechtertrennung':
                                case '#teilen':
                                case '#splitto':
                                case '#split':
                                case '#sp':
                                    if (!this.splitMode) this.splitGenders(this.currentWord);
                                    else {
                                        this.command.split('').forEach((_)=>{
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
                                    this.command.split('').forEach((_)=>{
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
                                    if (!this.splitMode) this.automaticPaddingAdjustment = false;
                                    if (!param.includes('add')) this.borderColor = param.includes('verb') ? '#ff5e01' : 'rgba(138, 43, 226, 1)';
                                default:
                                    this.command.split('').forEach((_)=>{
                                        inp.lastElementChild.remove();
                                        this.keys--;
                                    });
                                    if (this.automaticPaddingAdjustment) {
                                        let array = Object.values(this.currentWord)[this.inputIndex % 3 - 1];
                                        let n = Math.floor(this.inputIndex / 3) - 1;
                                        let word = this.splitMode ? array[n].split(mfORn)[this.inputSubIndex + 1] : array[n];
                                        this.adjustInputWidth(inp, word, true);
                                    } else this.paddingAnimation(inp);
                            }
                            this.command = '';
                            this.commandMode = false;
                            return;
                        } else if (event.key === 'ArrowUp') {
                            this.command.split('').forEach((_)=>{
                                inp.removeChild(inp.lastElementChild);
                                this.keys--;
                            });
                            if (this.inputIndex > 6) this.inputIndex -= 3;
                            this.changeSelectedInput();
                            this.command = '';
                            this.commandMode = false;
                            return;
                        } else if (event.key === 'ArrowDown') {
                            this.command.split('').forEach((_)=>{
                                inp.removeChild(inp.lastElementChild);
                                this.keys--;
                            });
                            this.command = '';
                            this.commandMode = false;
                            if (this.inputIndex < 18 - this.v) this.inputIndex += 3;
                            this.changeSelectedInput();
                            return;
                        } else if (event.key === 'ArrowLeft') {
                            this.command.split('').forEach((_)=>{
                                inp.removeChild(inp.lastElementChild);
                                this.keys--;
                            });
                            this.command = '';
                            this.commandMode = false;
                            if (this.inputIndex > 4) {
                                if (this.splitMode && this.inputSubIndex > 0) this.inputSubIndex--;
                                else {
                                    this.inputIndex--;
                                    if (this.inputIndex % 3 === 0) this.inputIndex--;
                                    if (this.splitMode && this.inputSubIndex === 0) this.inputSubIndex = 2;
                                }
                                this.changeSelectedInput();
                            } else if (this.inputIndex == 4 && this.inputSubIndex > 0 && this.splitMode) {
                                this.inputSubIndex--;
                                this.changeSelectedInput();
                            }
                            return;
                        } else if (event.key === 'ArrowRight') {
                            this.command.split('').forEach((_)=>{
                                inp.removeChild(inp.lastElementChild);
                                this.keys--;
                            });
                            this.command = '';
                            this.commandMode = false;
                            if (this.inputIndex < 20 - this.v) {
                                if (this.splitMode && this.inputSubIndex < 2) this.inputSubIndex++;
                                else {
                                    this.inputIndex++;
                                    if (this.inputIndex % 3 === 0) this.inputIndex++;
                                    if (this.splitMode && this.inputSubIndex === 2) this.inputSubIndex = 0;
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
                                let w = Math.round((inp.getBoundingClientRect().width - parseFloat(window.getComputedStyle(inp).paddingLeft) - parseFloat(window.getComputedStyle(inp).paddingRight)) * 100) / 100;
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
                        if (this.commandMode && (this.selectedInput.classList.contains('known-case') || forbiddenCharacters.includes(event.key) || event.key.length > 1)) return;
                    }
                    if (!this.commandMode) {
                        if (event.key === 'ArrowRight') {
                            if (this.tabMode) this.cancelTabMode();
                            if (this.inputIndex < 20 - this.v) {
                                if (this.splitMode && this.inputSubIndex < 2) this.inputSubIndex++;
                                else {
                                    this.inputIndex++;
                                    if (this.inputIndex % 3 === 0) this.inputIndex++;
                                    if (this.splitMode && this.inputSubIndex === 2) this.inputSubIndex = 0;
                                }
                                this.changeSelectedInput();
                            } else if (this.splitMode && this.inputIndex == 20 - this.v && this.inputSubIndex < 2) {
                                this.inputSubIndex++;
                                this.changeSelectedInput();
                            }
                            return;
                        } else if (event.key === 'ArrowLeft') {
                            if (this.tabMode) this.cancelTabMode();
                            if (this.inputIndex > 4) {
                                if (this.splitMode && this.inputSubIndex > 0) this.inputSubIndex--;
                                else {
                                    this.inputIndex--;
                                    if (this.inputIndex % 3 === 0) this.inputIndex--;
                                    if (this.splitMode && this.inputSubIndex === 0) this.inputSubIndex = 2;
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
                                if (this.inputIndex === 19) return;
                            }
                            const enter = event.key === 'Enter';
                            if (this.splitMode && enter && Object.values(this.currentWord)[this.inputIndex % 3 - 1][Math.floor(this.inputIndex / 3) - 1].split(mfORn)[this.inputSubIndex + 1] === '' && this.inputSubIndex > 0) {
                                let array = Object.values(this.currentWord)[this.inputIndex % 3 - 1];
                                let n = Math.floor(this.inputIndex / 3) - 1;
                                let splitto = array[n].split(mfORn).slice(1);
                                splitto[this.inputSubIndex] = splitto[this.inputSubIndex - 1];
                                array[n] = `^^m^^${splitto[0]}^^f^^${splitto[1]}^^n^^${splitto[2]}`;
                                Object.defineProperty(this.currentWord, Object.keys(this.currentWord)[this.inputIndex % 3 - 1], {
                                    value: array
                                });
                                let phrase = splitto[this.inputSubIndex];
                                let tabulatorStyle = false;
                                let inp = this.selectedInput.children[this.inputSubIndex];
                                let objectCount = 0;
                                let objectsLoaded = 0;
                                const id = this.inputIndex;
                                const count = this.inputSubIndex;
                                for(let ii = 0; ii < phrase.length; ii++)if (phrase.slice(ii, ii + 5) === '^tab^') {
                                    tabulatorStyle = !tabulatorStyle;
                                    ii += 4;
                                } else {
                                    let object = document.createElement('object');
                                    this.keys++;
                                    object.addEventListener('load', (_)=>{
                                        let svg = object.contentDocument;
                                        svg.querySelector('#tspan7').innerHTML = phrase.charAt(ii);
                                        if (object.classList.contains('tabulator')) this.tabulatorAnimation(object);
                                        objectsLoaded++;
                                        if (objectsLoaded === objectCount) {
                                            this.adjustInputWidth(inp, phrase, false);
                                            let pad = this.splitPadding[id][count];
                                            inp.style.padding = `${pad}px 0.25vw`;
                                        }
                                    });
                                    object.data = './keys/Reversion_T.svg';
                                    object.id = `key${this.keys}-inp${this.inputIndex}-sub${this.inputSubIndex}`;
                                    object.style.height = `100%`;
                                    objectCount++;
                                    inp.insertAdjacentElement('beforeend', object);
                                    if (tabulatorStyle) object.classList.add('tabulator');
                                }
                            }
                            if (this.inputIndex < 18 - this.v) {
                                if (this.splitMode && this.inputSubIndex < 2 && enter) this.inputSubIndex++;
                                else {
                                    this.inputIndex += 3;
                                    if (this.splitMode && this.inputSubIndex === 2 && enter) this.inputSubIndex = 0;
                                }
                                this.changeSelectedInput();
                            } else if (enter && this.inputIndex === 19 - this.v) {
                                if (this.splitMode && this.inputSubIndex < 2) this.inputSubIndex++;
                                else {
                                    this.inputIndex = 5;
                                    if (this.splitMode && this.inputSubIndex === 2) this.inputSubIndex = 0;
                                }
                                this.changeSelectedInput();
                            } else if (enter && this.inputIndex === 20 - this.v) {
                                if (this.splitMode && this.inputSubIndex < 2) {
                                    this.inputSubIndex++;
                                    this.changeSelectedInput();
                                    return;
                                }
                                document.querySelectorAll('.editable').forEach((element)=>{
                                    element.classList.add('savedElement');
                                });
                                if (this.enterMode) {
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
                                            for(let i = 0; i < this.container.childElementCount; i++)this.container.children[i].classList.remove('savedElement');
                                            this.wordIndex = this.vocabulary.length;
                                            this.keys = 0;
                                            this.currentWord = {
                                                singular: this.empty(param),
                                                plural: this.empty(param),
                                                verb: param.includes('verb'),
                                                probability: 1
                                            };
                                            for(let i = 3; i < this.container.childElementCount; i++){
                                                if (i % 3 != 0) {
                                                    this.container.children[i].innerHTML = '';
                                                    this.container.children[i].classList.remove('split');
                                                }
                                                this.container.children[i].classList.remove('selectedElement');
                                            }
                                            this.inputIndex = 4;
                                            this.selectedInput = this.container.children[4];
                                            this.tabCount = 0;
                                            this.genderSplitButton.style.display = 'block';
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
                                            if (this.splitMode) {
                                                this.splitMode = false;
                                                document.querySelectorAll('.split').forEach((split)=>{
                                                    split.innerHTML = '';
                                                    split.classList.remove('split');
                                                });
                                            }
                                            if (this.genderSplitButton) this.genderSplitButton.style.display = 'block';
                                            if (this.currentWord.singular[0].search(mfANDn) != -1) {
                                                this.splitGenders(this.currentWord);
                                                return;
                                            }
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
                                                        object.data = './keys/Reversion_T.svg';
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
                                                        object.data = './keys/Reversion_T.svg';
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
                            }
                            return;
                        } else if (event.key === 'Backspace') {
                            let inp = this.splitMode && this.inputSubIndex != undefined ? this.selectedInput.children[this.inputSubIndex] : this.selectedInput;
                            if (inp.lastElementChild) {
                                inp.lastElementChild.remove();
                                let array = Object.values(this.currentWord)[this.inputIndex % 3 - 1];
                                let n = Math.floor(this.inputIndex / 3) - 1;
                                let index;
                                if (this.splitMode) {
                                    if (this.inputSubIndex == 0) index = array[n].search(F);
                                    else if (this.inputSubIndex === 1) index = array[n].search(N);
                                    else index = array[n].length;
                                }
                                if (!this.splitMode && array[n].slice(-5) === '^tab^') {
                                    array[n] = array[n].slice(0, array[n].length - 6);
                                    if (this.tabCount > 1) this.tabCount--;
                                    this.tabMode = !this.tabMode;
                                    inp.classList.add('tab');
                                    if (!this.tabMode) inp.classList.remove('tab');
                                } else if (this.splitMode && index != -1 && index !== undefined) {
                                    if (array[n].slice(index - 5, index) === '^tab^') {
                                        array[n] = array[n].slice(0, index - 6) + array[n].slice(index);
                                        if (this.tabCount > 1) this.tabCount--;
                                        this.tabMode = !this.tabMode;
                                        inp.classList.add('tab');
                                        if (!this.tabMode) inp.classList.remove('tab');
                                    } else array[n] = array[n].slice(0, index - 1) + array[n].slice(index);
                                } else array[n] = array[n].slice(0, array[n].length - 1);
                                Object.defineProperty(this.currentWord, Object.keys(this.currentWord)[this.inputIndex % 3 - 1], {
                                    value: array
                                });
                                this.keys--;
                                if (this.tabMode) this.tabulator = this.tabulator.slice(0, this.tabulator.length - 1);
                            } else if (this.tabMode) this.cancelTabMode();
                            let pad = this.splitMode ? this.splitPadding[this.inputIndex][this.inputSubIndex] : this.padding[this.inputIndex];
                            if (this.automaticPaddingAdjustment && pad > inp.offsetHeight * 0.05) {
                                let object = inp.lastElementChild;
                                if (!object) return;
                                let w = Math.round((inp.getBoundingClientRect().width - parseFloat(window.getComputedStyle(inp).paddingLeft) - parseFloat(window.getComputedStyle(inp).paddingRight)) * 100) / 100;
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
                            let inp = this.splitMode ? this.selectedInput.children[this.inputSubIndex] : this.selectedInput;
                            if (!this.tabMode) {
                                if (this.tabCount >= 2) {
                                    let array = Object.values(this.currentWord)[this.inputIndex % 3 - 1];
                                    let n = Math.floor(this.inputIndex / 3) - 1;
                                    let word = this.splitMode ? array[n].split(mfORn)[this.inputSubIndex + 1] : array[n];
                                    let index;
                                    while(word.search('\\^tab\\^') !== -1){
                                        let c = word.search('\\^tab\\^');
                                        if (index === undefined) index = c;
                                        word = word.slice(0, c) + word.slice(c + 5, word.length);
                                    }
                                    word = word.slice(0, index) + '^tab^' + word.slice(index, word.length);
                                    Object.defineProperty(this.currentWord, Object.keys(this.currentWord)[this.inputIndex % 3 - 1], {
                                        value: array
                                    });
                                    let tabulatorStyle = false;
                                    for(let i = 0; i < word.length; i++){
                                        if (word.slice(i, i + 5) === '^tab^') {
                                            tabulatorStyle = !tabulatorStyle;
                                            i += 4;
                                        } else if (inp.children[i > index ? i - 5 : i]) {
                                            let object = inp.children[i > index ? i - 5 : i];
                                            let svg = object.contentDocument;
                                            svg.querySelector('#tspan7').innerHTML = word.charAt(i);
                                            if (tabulatorStyle) {
                                                this.tabulatorAnimation(object);
                                                object.classList.add('tabulator');
                                            } else object.classList.remove('tabulator');
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
                                    let array = Object.values(this.currentWord)[this.inputIndex % 3 - 1];
                                    let n = Math.floor(this.inputIndex / 3) - 1;
                                    let index;
                                    if (this.splitMode) {
                                        if (this.inputSubIndex == 0) index = array[n].search(F);
                                        else if (this.inputSubIndex == 1) index = array[n].search(N);
                                        else index = array[n].length;
                                    }
                                    if (index !== -1 && index !== undefined) array[n] = array[n].slice(0, index) + "^tab^" + array[n].slice(index);
                                    else array[n] += "^tab^";
                                    Object.defineProperty(this.currentWord, Object.keys(this.currentWord)[this.inputIndex % 3 - 1], {
                                        value: array
                                    });
                                    this.tabCount++;
                                }
                            } else if (this.tabulator.length > 0) {
                                let array = Object.values(this.currentWord)[this.inputIndex % 3 - 1];
                                let n = Math.floor(this.inputIndex / 3) - 1;
                                let index;
                                if (this.splitMode) {
                                    if (this.inputSubIndex == 0) index = array[n].search(F);
                                    else if (this.inputSubIndex == 1) index = array[n].search(N);
                                    else index = array[n].length;
                                }
                                let phrase = this.splitMode ? array[n].slice(index - 5, index) : array[n].slice(-5);
                                if (phrase != '^tab^') {
                                    this.tabMode = false;
                                    inp.classList.remove('tab');
                                    if (this.splitMode && this.inputSubIndex != undefined) array[n] = array[n].slice(0, index) + "^tab^" + array[n].slice(index);
                                    else array[n] += "^tab^";
                                    Object.defineProperty(this.currentWord, Object.keys(this.currentWord)[this.inputIndex % 3 - 1], {
                                        value: array
                                    });
                                    this.tabCount++;
                                } else {
                                    const previous = array[n];
                                    const ID = this.inputIndex;
                                    const subID = this.inputSubIndex;
                                    let objectCount = 0;
                                    let objectsLoaded = 0;
                                    if (this.splitMode && this.inputSubIndex != undefined) array[n] = array[n].slice(0, index) + this.tabulator + "^tab^" + array[n].slice(index);
                                    else array[n] += this.tabulator + "^tab^";
                                    const word = this.splitMode ? array[n].split(mfORn).at(this.inputSubIndex + 1) : array[n];
                                    if (this.keys + this.tabulator.length <= Math.floor(inp.clientWidth / (inp.clientHeight - parseFloat(inp.style.padding))) || this.keys + this.tabulator.length > Math.floor(inp.clientWidth / (inp.clientHeight - parseFloat(inp.style.padding))) && this.automaticPaddingAdjustment) for(let i = 0; i < this.tabulator.length; i++){
                                        let object = document.createElement('object');
                                        object.data = './keys/Reversion_T.svg';
                                        object.id = `key${this.keys}-inp${this.inputIndex}${this.splitMode ? `-sub${this.inputSubIndex}` : ''}`;
                                        object.style.height = `100%`;
                                        objectCount++;
                                        inp.insertAdjacentElement('beforeend', object);
                                        object.hidden = true;
                                        object.addEventListener('load', (_)=>{
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
                                    else {
                                        for(let ii = 0; ii < this.keys; ii++){
                                            this.failureAnimation(inp.children[ii]);
                                            array[n] = previous;
                                        }
                                        return;
                                    }
                                    Object.defineProperty(this.currentWord, Object.keys(this.currentWord)[this.inputIndex % 3 - 1], {
                                        value: array
                                    });
                                    this.tabMode = false;
                                    this.tabCount++;
                                    inp.classList.remove('tab');
                                }
                            } else {
                                this.tabCount = 0;
                                this.cancelTabMode();
                            }
                            return;
                        } else if (forbiddenCharacters.includes(event.key) || event.key.length > 1) return;
                    }
                    this.enterMode = false;
                    let inp = this.splitMode && this.inputSubIndex != undefined ? this.selectedInput.children[this.inputSubIndex] : this.selectedInput;
                    let object = document.createElement('object');
                    object.data = './keys/Reversion_T.svg';
                    object.id = `key${this.keys}-inp${this.inputIndex}${this.splitMode ? `-sub${this.inputSubIndex}` : ''}`;
                    object.style.height = `100%`;
                    inp.insertAdjacentElement('beforeend', object);
                    object.hidden = true;
                    object.addEventListener('load', (_1)=>{
                        object.hidden = false;
                        let width = Math.round(object.getBoundingClientRect().width * 100) / 100;
                        object.hidden = true;
                        let w = Math.round((inp.getBoundingClientRect().width - parseFloat(window.getComputedStyle(inp).paddingLeft) - parseFloat(window.getComputedStyle(inp).paddingRight) - parseFloat(window.getComputedStyle(inp).borderLeftWidth) - parseFloat(window.getComputedStyle(inp).borderRightWidth)) * 100) / 100;
                        if (!this.automaticPaddingAdjustment && this.keys + 1 > w / width) {
                            object.remove();
                            for(let i = 0; i < this.keys; i++)this.failureAnimation(this.selectedInput.children[i]);
                            return;
                        } else if (this.automaticPaddingAdjustment) {
                            object.hidden = false;
                            let aspectRatio = object.getBoundingClientRect().height / object.getBoundingClientRect().width;
                            object.hidden = true;
                            let h = w / (this.keys + 1) * aspectRatio;
                            let padding = (inp.getBoundingClientRect().height - h) / 2;
                            if (padding > inp.getBoundingClientRect().height / 2 * 0.85) {
                                object.remove();
                                for(let i = 0; i < this.keys; i++)this.failureAnimation(inp.children[i]);
                                return;
                            } else {
                                const prev = this.splitMode ? this.splitPadding[this.inputIndex][this.inputSubIndex] : this.padding[this.inputIndex];
                                if (this.splitMode && this.inputSubIndex != undefined) this.splitPadding[this.inputIndex][this.inputSubIndex] = Math.max(padding, inp.offsetHeight * 0.05);
                                else this.padding[this.inputIndex] = Math.max(padding, inp.offsetHeight * 0.05);
                                this.animatedBorderWidth = parseFloat(window.getComputedStyle(inp).borderTopWidth);
                                let now = this.splitMode ? this.splitPadding[this.inputIndex][this.inputSubIndex] : this.padding[this.inputIndex];
                                if (prev !== now) this.automaticPaddingAnimation(inp, true, true);
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
                            let index;
                            if (this.splitMode) {
                                if (this.inputSubIndex == 0) index = array[n].search(F);
                                else if (this.inputSubIndex == 1) index = array[n].search(N);
                                else index = array[n].length;
                            }
                            if (index !== -1 && index !== undefined) array[n] = array[n].slice(0, index) + event.key + array[n].slice(index);
                            else array[n] += event.key;
                            Object.defineProperty(this.currentWord, Object.keys(this.currentWord)[this.inputIndex % 3 - 1], {
                                value: array
                            });
                            if (this.tabMode) {
                                if (this.splitMode && this.inputSubIndex != undefined && array[n].split(mfORn)[this.inputSubIndex + 1].slice(-6, -1) === '^tab^' || !this.splitMode && array[n].slice(-6, -1) === '^tab^') this.tabulator = '';
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
        let array = Object.values(this.currentWord)[this.inputIndex % 3 - 1];
        let n = Math.floor(this.inputIndex / 3) - 1;
        let word = this.splitMode ? array[n].split(mfORn)[this.inputSubIndex + 1] : array[n];
        let regex = new RegExp('\\^tab\\^', 'g');
        let matches = word.match(regex);
        this.tabCount = matches ? matches.length : 0;
        let inp = this.splitMode ? this.selectedInput.children[this.inputSubIndex] : this.selectedInput;
        if (!matches ? false : matches.length % 2 === 0) inp.classList.remove('tab');
        this.selectedInput.classList.add('selectedElement');
        this.keys = this.selectedInput.childElementCount;
        if (this.splitMode && this.inputSubIndex != undefined) {
            inp.classList.add('selectedElement');
            this.keys = inp.childElementCount;
        }
        if (this.automaticPaddingAdjustment) {
            this.adjustInputWidth(inp, word, false);
            this.automaticPaddingAnimation(inp);
        } else this.paddingAnimation(this.selectedInput);
    }
    cancelTabMode() {
        // Simplified using COPILOT
        let array = Object.values(this.currentWord)[this.inputIndex % 3 - 1];
        let n = Math.floor(this.inputIndex / 3) - 1;
        let word = array[n];
        if (this.splitMode && this.inputSubIndex != undefined) word = word.split(mfORn).at(this.inputSubIndex + 1);
        if (word.includes('^tab^')) {
            let start = word.indexOf('^tab^');
            word = word.slice(0, start) + word.slice(start + 5);
            let end = word.indexOf('^tab^');
            if (end != -1) word = word.slice(0, end) + word.slice(end + 5);
            else end = word.length;
            let tabbedContent = word.slice(start, end);
            for(let i = 0; i < tabbedContent.length; i++)if (this.splitMode && this.inputSubIndex != undefined) this.selectedInput.children[this.inputSubIndex].children[start].remove();
            else this.selectedInput.children[start].remove();
            // not the problem
            if (this.splitMode && this.inputSubIndex != undefined) {
                let splitto = array[n].split(mfORn).slice(1);
                splitto[this.inputSubIndex] = word.slice(0, start) + word.slice(end + 5);
                array[n] = `^^m^^${splitto[0]}^^f^^${splitto[1]}^^n^^${splitto[2]}`;
                if (this.automaticPaddingAdjustment) this.adjustInputWidth(this.selectedInput.children[this.inputSubIndex], splitto[this.inputSubIndex], false);
            } else {
                array[n] = word.slice(0, start) + word.slice(end + 5);
                if (this.automaticPaddingAdjustment) this.adjustInputWidth(this.selectedInput, array[n], false);
            }
            this.keys -= tabbedContent.length;
        }
        this.tabMode = false;
        let inp = this.splitMode && this.inputSubIndex != undefined ? this.selectedInput.children[this.inputSubIndex] : this.selectedInput;
        inp.classList.remove('tab');
    }
    findMostUsedTabulator(inflectedWord) {
        let tabulators = inflectedWord.singular.map((word)=>word.split(/\^tab\^/g).filter((v, i)=>i % 2 === 1)).concat(inflectedWord.plural.map((word)=>word.split(/\^tab\^/g).filter((v, i)=>i % 2 === 1)));
        let tabs = [];
        tabulators.forEach((wordList)=>wordList.forEach((word)=>tabs.push(word)));
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
        return checkedTabs.length ? checkedTabs[0][0] : undefined;
    }
    startNewTrainingRound(param) {
        this.splitMode = false;
        document.querySelectorAll('.split').forEach((el)=>el.classList.remove('split'));
        let vocab = this.vocabulary.filter((w)=>w.verb === param.includes('verb'));
        if (vocab.length === 0) {
            setTimeout((_)=>alert(`Keine ${param.includes('verb') ? 'Konjugationen' : 'Deklinationen'}!`), 250);
            return;
        } else if (vocab.filter((w)=>!isEmpty(w)).length === 0) {
            setTimeout((_)=>alert(`Nur leere ${param.includes('verb') ? 'Konjugationen' : 'Deklinationen'}!`), 250);
            return;
        }
        function isEmpty(w) {
            return w.singular.filter((s)=>s.replaceAll(/\^\^m\^\^|\^\^f\^\^|\^\^n\^\^/g, '').trim() === '').length === (!param.includes('verb') ? 6 : 3) && w.plural.filter((p)=>p.replaceAll(/\^\^m\^\^|\^\^f\^\^|\^\^n\^\^/g, '').trim() === '').length === (!param.includes('verb') ? 6 : 3);
        }
        this.round++;
        // Optimized using COPILOT
        const validWords = vocab.filter((w)=>!isEmpty(w));
        const overallProbability = validWords.reduce((sum, word)=>sum + word.probability, 0);
        const randomNumber = Math.random() * overallProbability;
        this.failures = 0;
        let runningSum = 0;
        for(let i = 0; i < this.vocabulary.length; i++){
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
        document.querySelectorAll('.editable').forEach((div)=>{
            div.innerHTML = '';
            div.classList.remove('redShadowDesign');
            div.classList.remove('greenShadowDesign');
            div.classList.remove('known-case');
            div.classList.add('shadowDesign');
        });
        // - 
        let knownCase;
        let rn;
        let randi;
        let v = this.v / 3;
        do {
            rn = Math.floor(Math.random() * (param.includes('verb') ? 6 : 12));
            knownCase = Object.values(this.vocabulary[this.currentWordIndex])[rn > 5 - v ? 1 : 0][rn > 5 - v ? rn - 6 + v : rn];
            if (knownCase.search(mfANDn) != -1) {
                randi = Math.floor(Math.random() * 2);
                knownCase = knownCase.split(mfORn)[randi + 1];
            }
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
        if (randi || randi === 0) this.emptySplit(knownCase, randi);
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
        cancelable = cancelable === undefined || cancelable === true;
        clearInterval(this.firstInterval);
        clearInterval(this.secondInterval);
        clearTimeout(this.firstTimeout);
        if (cancelable && this.animatedInputIndex != undefined && adjustment === undefined) {
            let inp = document.querySelector(`#div${this.animatedInputIndex}`);
            inp = this.splitMode && this.animatedInputSubIndex != undefined ? inp.children[this.animatedInputSubIndex] : inp;
            let paddingLeft = 0.05 * inp.offsetHeight;
            let paddingTop = this.splitMode ? this.splitPadding[this.animatedInputIndex][this.animatedInputSubIndex] : this.padding[this.animatedInputIndex];
            inp.style.padding = `${paddingTop}px ${paddingLeft}px`;
            inp.style.border = 'none';
        }
        if (input.classList.contains('known-case')) return;
        let id;
        let count;
        if (this.splitMode) {
            if (input.parentElement == this.container) return;
            id = parseInt(input.parentElement?.id.slice(3));
            for(let q = 0; q < input.parentElement?.childElementCount; q++)if (input.parentElement.children[q] === input) {
                count = q;
                break;
            }
        } else id = parseInt(input.id.slice(3));
        let borderLeft = 0.05 * input.offsetHeight;
        let newPadding = this.splitMode ? this.splitPadding[id][count] : this.padding[id];
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
    adjustInputWidth(input, value, animation) {
        animation = animation === undefined || animation === true;
        if (input.classList.contains('known-case')) return;
        let v = value.replaceAll('^tab^', '');
        if (!input.hasChildNodes() && v.length == 0) {
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
        let id;
        let count;
        if (this.splitMode) {
            if (input.parentElement == this.container) return;
            id = parseInt(input.parentElement?.id.slice(3));
            for(let q = 0; q < input.parentElement?.childElementCount; q++)if (input.parentElement.children[q] === input) {
                count = q;
                break;
            }
        } else id = parseInt(input.id.slice(3));
        if (!object) return;
        object.hidden = false;
        let width = object.getBoundingClientRect().width;
        if (w / width < v.length || this.automaticPaddingAdjustment) {
            w = Math.round((input.getBoundingClientRect().width - parseFloat(window.getComputedStyle(input).paddingLeft) - parseFloat(window.getComputedStyle(input).paddingRight) - parseFloat(window.getComputedStyle(input).borderLeftWidth) - parseFloat(window.getComputedStyle(input).borderRightWidth)) * 100) / 100;
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
        if (this.automaticPaddingAdjustment) this.automaticPaddingAnimation(input, false, false);
        else this.paddingAnimation(input);
        return;
    }
    splitGenders(currentWord) {
        this.splitMode = true;
        this.commandMode = false;
        let container = document.querySelector('#container');
        this.automaticPaddingAdjustment = true;
        let objectCount = 0;
        let objectsLoaded = 0;
        for(let i = 3; i < container.childElementCount; i++){
            let div = container.children[i];
            let singular = this.currentWord.singular;
            let tabulatorStyle = false;
            let plural = this.currentWord.plural;
            let divs = Array.from({
                length: 3
            }, ()=>document.createElement('div'));
            let z = 0;
            let k = 0;
            this.splitPadding.push(new Array(3).fill(undefined));
            if (i % 3 === 1) {
                div.classList.add('split');
                let array = Object.values(currentWord)[i % 3 - 1], n = Math.floor(i / 3) - 1;
                if (array[n].search(mfANDn) === -1) array[n] = `^^m^^${array[n]}^^f^^^^n^^`;
                let content = array[n].split(mfORn);
                content.splice(0, 1);
                if (singular[n].search(mfANDn) != -1) {
                    divs[z].innerHTML = '';
                    for(let ii = 5; ii < singular[n].length; ii++){
                        if (singular[n].slice(ii, ii + 5) === '^tab^') {
                            tabulatorStyle = !tabulatorStyle;
                            ii += 4;
                        } else if (singular[n].slice(ii, ii + 5) == '^^n^^' || singular[n].slice(ii, ii + 5) == '^^f^^') {
                            z++;
                            ii += 4;
                            k = 0;
                        } else {
                            let object = document.createElement('object');
                            object.addEventListener('load', (_)=>{
                                let svg = object.contentDocument;
                                svg.querySelector('#tspan7').innerHTML = singular[n].charAt(ii);
                                if (object.classList.contains('tabulator')) this.tabulatorAnimation(object);
                                objectsLoaded++;
                                if (objectsLoaded === objectCount) {
                                    document.querySelectorAll('object').forEach((o)=>o.hidden = false);
                                    for(let i = 4; i < this.container.children.length; i++)if (i % 3 > 0) {
                                        let div = this.container.children[i];
                                        let array = Object.values(this.currentWord)[i % 3 - 1];
                                        let n = Math.floor(i / 3) - 1;
                                        let splitto = array[n].split(mfORn).slice(1);
                                        splitto.forEach((s, o)=>{
                                            let input = div.children[o];
                                            input.style.padding = 0.05 * input.offsetHeight + 'px';
                                            this.adjustInputWidth(input, s, true);
                                        });
                                    }
                                }
                            });
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
                divs.forEach((d)=>div.appendChild(d));
            } else if (i % 3 === 2) {
                div.classList.add('split');
                let array = Object.values(currentWord)[i % 3 - 1], n = Math.floor(i / 3) - 1;
                if (array[n].search(mfANDn) === -1) array[n] = `^^m^^${array[n]}^^f^^^^n^^`;
                let content = array[n].split(mfORn);
                content.splice(0, 1);
                if (plural[n].search(mfANDn) != 1) {
                    this.container.children[i].innerHTML = '';
                    divs[z].innerHTML = '';
                    for(let ii = 5; ii < plural[n].length; ii++){
                        if (plural[n].slice(ii, ii + 5) === '^tab^') {
                            tabulatorStyle = !tabulatorStyle;
                            ii += 4;
                        } else if (plural[n].slice(ii, ii + 5) == '^^n^^' || plural[n].slice(ii, ii + 5) == '^^f^^') {
                            z++;
                            ii += 4;
                        } else {
                            let object = document.createElement('object');
                            object.addEventListener('load', (_)=>{
                                let svg = object.contentDocument;
                                svg.querySelector('#tspan7').innerHTML = plural[n].charAt(ii);
                                if (object.classList.contains('tabulator')) this.tabulatorAnimation(object);
                                objectsLoaded++;
                                if (objectsLoaded === objectCount) {
                                    document.querySelectorAll('object').forEach((o)=>o.hidden = false);
                                    for(let i = 4; i < this.container.children.length; i++)if (i % 3 > 0) {
                                        let div = this.container.children[i];
                                        let array = Object.values(this.currentWord)[i % 3 - 1];
                                        let n = Math.floor(i / 3) - 1;
                                        let splitto = array[n].split(mfORn).slice(1);
                                        splitto.forEach((s, o)=>{
                                            let input = div.children[o];
                                            input.style.padding = 0.05 * input.offsetHeight + 'px';
                                            this.adjustInputWidth(input, s, true);
                                        });
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
                divs.forEach((d)=>div.appendChild(d));
            }
        }
        let sel = this.selectedInput.firstChild;
        sel.classList.add('selectedElement');
        this.inputSubIndex = 0;
        this.genderSplitButton.style.display = 'none';
        this.borderColor = 'orange';
        this.changeSelectedInput();
    }
    emptySplit(knownCase, randi) {
        for(let i = 3; i < this.container.childElementCount; i++){
            let div = this.container.children[i];
            this.splitPadding[i] = new Array(3).fill(undefined);
            if (div.classList.contains('editable')) {
                div.classList.add('split');
                div.innerHTML = Array.from({
                    length: 3
                }, (v, ii)=>`<div class="shadowDesign ${div.classList.contains('known-case') && ii === randi ? 'known-case' : ''}">${div.classList.contains('known-case') && ii === randi ? '<span>' + knownCase + '</span>' : ''}</div>`).join('');
                let array = Object.values(this.currentWord)[i % 3 - 1];
                let n = Math.floor(i / 3) - 1;
                array[n] = '^^m^^^^f^^^^n^^';
                if (div.classList.contains('known-case')) {
                    let splitto = [
                        '',
                        '',
                        ''
                    ];
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
        for(let i = 0; i < 6; i++){
            singleResult[i] = [
                undefined,
                undefined,
                undefined
            ];
            singleResult2[i] = [
                undefined,
                undefined,
                undefined
            ];
        }
        let s = singleResult;
        let s2 = singleResult2;
        this.result.singular = s;
        this.result.plural = s2;
        this.changeSelectedInput();
    }
}
const mfORn = /\^\^m\^\^|\^\^f\^\^|\^\^n\^\^/;
const mfANDn = /\^\^m\^\^.*\^\^f\^\^.*\^\^n\^\^/g;
const F = /\^\^f\^\^/g;
const N = /\^\^n\^\^/g;

},{"..":"1jwFz","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["gpxX8","1jwFz"], "1jwFz", "parcelRequire94c2")

//# sourceMappingURL=index.8e9bd240.js.map
