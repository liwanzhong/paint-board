(function(){"use strict";try{self["workbox:core:7.2.0"]&&_()}catch{}const z=(n,...e)=>{let t=n;return e.length>0&&(t+=` :: ${JSON.stringify(e)}`),t};class l extends Error{constructor(e,t){const s=z(e,t);super(s),this.name=e,this.details=t}}const d={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:typeof registration<"u"?registration.scope:""},E=n=>[d.prefix,n,d.suffix].filter(e=>e&&e.length>0).join("-"),J=n=>{for(const e of Object.keys(d))n(e)},b={updateDetails:n=>{J(e=>{typeof n[e]=="string"&&(d[e]=n[e])})},getGoogleAnalyticsName:n=>n||E(d.googleAnalytics),getPrecacheName:n=>n||E(d.precache),getPrefix:()=>d.prefix,getRuntimeName:n=>n||E(d.runtime),getSuffix:()=>d.suffix},Se=null;function N(n,e){const t=e();return n.waitUntil(t),t}try{self["workbox:precaching:7.2.0"]&&_()}catch{}const X="__WB_REVISION__";function Y(n){if(!n)throw new l("add-to-cache-list-unexpected-type",{entry:n});if(typeof n=="string"){const r=new URL(n,location.href);return{cacheKey:r.href,url:r.href}}const{revision:e,url:t}=n;if(!t)throw new l("add-to-cache-list-unexpected-type",{entry:n});if(!e){const r=new URL(t,location.href);return{cacheKey:r.href,url:r.href}}const s=new URL(t,location.href),a=new URL(t,location.href);return s.searchParams.set(X,e),{cacheKey:s.href,url:a.href}}class Z{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if(e.type==="install"&&t&&t.originalRequest&&t.originalRequest instanceof Request){const a=t.originalRequest.url;s?this.notUpdatedURLs.push(a):this.updatedURLs.push(a)}return s}}}class ee{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:t,params:s})=>{const a=(s==null?void 0:s.cacheKey)||this._precacheController.getCacheKeyForURL(t.url);return a?new Request(a,{headers:t.headers}):t},this._precacheController=e}}let g;function te(){if(g===void 0){const n=new Response("");if("body"in n)try{new Response(n.body),g=!0}catch{g=!1}g=!1}return g}async function se(n,e){let t=null;if(n.url&&(t=new URL(n.url).origin),t!==self.location.origin)throw new l("cross-origin-copy-response",{origin:t});const s=n.clone(),a={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},r=e?e(a):a,i=te()?s.body:await s.blob();return new Response(i,r)}const ne=n=>new URL(String(n),location.href).href.replace(new RegExp(`^${location.origin}`),"");function K(n,e){const t=new URL(n);for(const s of e)t.searchParams.delete(s);return t.href}async function ae(n,e,t,s){const a=K(e.url,t);if(e.url===a)return n.match(e,s);const r=Object.assign(Object.assign({},s),{ignoreSearch:!0}),i=await n.keys(e,r);for(const c of i){const o=K(c.url,t);if(a===o)return n.match(c,s)}}class re{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}const A=new Set;async function ie(){for(const n of A)await n()}function ce(n){return new Promise(e=>setTimeout(e,n))}try{self["workbox:strategies:7.2.0"]&&_()}catch{}function C(n){return typeof n=="string"?new Request(n):n}class oe{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new re,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const s of this._plugins)this._pluginStateMap.set(s,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:t}=this;let s=C(e);if(s.mode==="navigate"&&t instanceof FetchEvent&&t.preloadResponse){const i=await t.preloadResponse;if(i)return i}const a=this.hasCallback("fetchDidFail")?s.clone():null;try{for(const i of this.iterateCallbacks("requestWillFetch"))s=await i({request:s.clone(),event:t})}catch(i){if(i instanceof Error)throw new l("plugin-error-request-will-fetch",{thrownErrorMessage:i.message})}const r=s.clone();try{let i;i=await fetch(s,s.mode==="navigate"?void 0:this._strategy.fetchOptions);for(const c of this.iterateCallbacks("fetchDidSucceed"))i=await c({event:t,request:r,response:i});return i}catch(i){throw a&&await this.runCallbacks("fetchDidFail",{error:i,event:t,originalRequest:a.clone(),request:r.clone()}),i}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=C(e);let s;const{cacheName:a,matchOptions:r}=this._strategy,i=await this.getCacheKey(t,"read"),c=Object.assign(Object.assign({},r),{cacheName:a});s=await caches.match(i,c);for(const o of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await o({cacheName:a,matchOptions:r,cachedResponse:s,request:i,event:this.event})||void 0;return s}async cachePut(e,t){const s=C(e);await ce(0);const a=await this.getCacheKey(s,"write");if(!t)throw new l("cache-put-with-no-response",{url:ne(a.url)});const r=await this._ensureResponseSafeToCache(t);if(!r)return!1;const{cacheName:i,matchOptions:c}=this._strategy,o=await self.caches.open(i),h=this.hasCallback("cacheDidUpdate"),R=h?await ae(o,a.clone(),["__WB_REVISION__"],c):null;try{await o.put(a,h?r.clone():r)}catch(u){if(u instanceof Error)throw u.name==="QuotaExceededError"&&await ie(),u}for(const u of this.iterateCallbacks("cacheDidUpdate"))await u({cacheName:i,oldResponse:R,newResponse:r.clone(),request:a,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this._cacheKeys[s]){let a=e;for(const r of this.iterateCallbacks("cacheKeyWillBeUsed"))a=C(await r({mode:t,request:a,event:this.event,params:this.params}));this._cacheKeys[s]=a}return this._cacheKeys[s]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if(typeof t[e]=="function"){const s=this._pluginStateMap.get(t);yield r=>{const i=Object.assign(Object.assign({},r),{state:s});return t[e](i)}}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const a of this.iterateCallbacks("cacheWillUpdate"))if(t=await a({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&t.status!==200&&(t=void 0),t}}class S{constructor(e={}){this.cacheName=b.getRuntimeName(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s=typeof e.request=="string"?new Request(e.request):e.request,a="params"in e?e.params:void 0,r=new oe(this,{event:t,request:s,params:a}),i=this._getResponse(r,s,t),c=this._awaitComplete(i,r,s,t);return[i,c]}async _getResponse(e,t,s){await e.runCallbacks("handlerWillStart",{event:s,request:t});let a;try{if(a=await this._handle(t,e),!a||a.type==="error")throw new l("no-response",{url:t.url})}catch(r){if(r instanceof Error){for(const i of e.iterateCallbacks("handlerDidError"))if(a=await i({error:r,event:s,request:t}),a)break}if(!a)throw r}for(const r of e.iterateCallbacks("handlerWillRespond"))a=await r({event:s,request:t,response:a});return a}async _awaitComplete(e,t,s,a){let r,i;try{r=await e}catch{}try{await t.runCallbacks("handlerDidRespond",{event:a,request:s,response:r}),await t.doneWaiting()}catch(c){c instanceof Error&&(i=c)}if(await t.runCallbacks("handlerDidComplete",{event:a,request:s,response:r,error:i}),t.destroy(),i)throw i}}class p extends S{constructor(e={}){e.cacheName=b.getPrecacheName(e.cacheName),super(e),this._fallbackToNetwork=e.fallbackToNetwork!==!1,this.plugins.push(p.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const s=await t.cacheMatch(e);return s||(t.event&&t.event.type==="install"?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,t){let s;const a=t.params||{};if(this._fallbackToNetwork){const r=a.integrity,i=e.integrity,c=!i||i===r;s=await t.fetch(new Request(e,{integrity:e.mode!=="no-cors"?i||r:void 0})),r&&c&&e.mode!=="no-cors"&&(this._useDefaultCacheabilityPluginIfNeeded(),await t.cachePut(e,s.clone()))}else throw new l("missing-precache-entry",{cacheName:this.cacheName,url:e.url});return s}async _handleInstall(e,t){this._useDefaultCacheabilityPluginIfNeeded();const s=await t.fetch(e);if(!await t.cachePut(e,s.clone()))throw new l("bad-precaching-response",{url:e.url,status:s.status});return s}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,a]of this.plugins.entries())a!==p.copyRedirectedCacheableResponsesPlugin&&(a===p.defaultPrecacheCacheabilityPlugin&&(e=s),a.cacheWillUpdate&&t++);t===0?this.plugins.push(p.defaultPrecacheCacheabilityPlugin):t>1&&e!==null&&this.plugins.splice(e,1)}}p.defaultPrecacheCacheabilityPlugin={async cacheWillUpdate({response:n}){return!n||n.status>=400?null:n}},p.copyRedirectedCacheableResponsesPlugin={async cacheWillUpdate({response:n}){return n.redirected?await se(n):n}};class he{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new p({cacheName:b.getPrecacheName(e),plugins:[...t,new ee({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const t=[];for(const s of e){typeof s=="string"?t.push(s):s&&s.revision===void 0&&t.push(s.url);const{cacheKey:a,url:r}=Y(s),i=typeof s!="string"&&s.revision?"reload":"default";if(this._urlsToCacheKeys.has(r)&&this._urlsToCacheKeys.get(r)!==a)throw new l("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(r),secondEntry:a});if(typeof s!="string"&&s.integrity){if(this._cacheKeysToIntegrities.has(a)&&this._cacheKeysToIntegrities.get(a)!==s.integrity)throw new l("add-to-cache-list-conflicting-integrities",{url:r});this._cacheKeysToIntegrities.set(a,s.integrity)}if(this._urlsToCacheKeys.set(r,a),this._urlsToCacheModes.set(r,i),t.length>0){const c=`Workbox is precaching URLs without revision info: ${t.join(", ")}
This is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(c)}}}install(e){return N(e,async()=>{const t=new Z;this.strategy.plugins.push(t);for(const[r,i]of this._urlsToCacheKeys){const c=this._cacheKeysToIntegrities.get(i),o=this._urlsToCacheModes.get(r),h=new Request(r,{integrity:c,cache:o,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:i},request:h,event:e}))}const{updatedURLs:s,notUpdatedURLs:a}=t;return{updatedURLs:s,notUpdatedURLs:a}})}activate(e){return N(e,async()=>{const t=await self.caches.open(this.strategy.cacheName),s=await t.keys(),a=new Set(this._urlsToCacheKeys.values()),r=[];for(const i of s)a.has(i.url)||(await t.delete(i),r.push(i.url));return{deletedURLs:r}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s)return(await self.caches.open(this.strategy.cacheName)).match(s)}createHandlerBoundToURL(e){const t=this.getCacheKeyForURL(e);if(!t)throw new l("non-precached-url",{url:e});return s=>(s.request=new Request(e),s.params=Object.assign({cacheKey:t},s.params),this.strategy.handle(s))}}let D;const O=()=>(D||(D=new he),D);try{self["workbox:routing:7.2.0"]&&_()}catch{}const v="GET",x=n=>n&&typeof n=="object"?n:{handle:n};class m{constructor(e,t,s=v){this.handler=x(t),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=x(e)}}class le extends m{constructor(e,t,s){const a=({url:r})=>{const i=e.exec(r.href);if(!!i&&!(r.origin!==location.origin&&i.index!==0))return i.slice(1)};super(a,t,s)}}class ue{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&e.data.type==="CACHE_URLS"){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map(a=>{typeof a=="string"&&(a=[a]);const r=new Request(...a);return this.handleRequest({request:r,event:e})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const a=s.origin===location.origin,{params:r,route:i}=this.findMatchingRoute({event:t,request:e,sameOrigin:a,url:s});let c=i&&i.handler;const o=e.method;if(!c&&this._defaultHandlerMap.has(o)&&(c=this._defaultHandlerMap.get(o)),!c)return;let h;try{h=c.handle({url:s,request:e,event:t,params:r})}catch(u){h=Promise.reject(u)}const R=i&&i.catchHandler;return h instanceof Promise&&(this._catchHandler||R)&&(h=h.catch(async u=>{if(R)try{return await R.handle({url:s,request:e,event:t,params:r})}catch(Q){Q instanceof Error&&(u=Q)}if(this._catchHandler)return this._catchHandler.handle({url:s,request:e,event:t});throw u})),h}findMatchingRoute({url:e,sameOrigin:t,request:s,event:a}){const r=this._routes.get(s.method)||[];for(const i of r){let c;const o=i.match({url:e,sameOrigin:t,request:s,event:a});if(o)return c=o,(Array.isArray(c)&&c.length===0||o.constructor===Object&&Object.keys(o).length===0||typeof o=="boolean")&&(c=void 0),{route:i,params:c}}return{}}setDefaultHandler(e,t=v){this._defaultHandlerMap.set(t,x(e))}setCatchHandler(e){this._catchHandler=x(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new l("unregister-route-but-not-found-with-method",{method:e.method});const t=this._routes.get(e.method).indexOf(e);if(t>-1)this._routes.get(e.method).splice(t,1);else throw new l("unregister-route-route-not-registered")}}let w;const de=()=>(w||(w=new ue,w.addFetchListener(),w.addCacheListener()),w);function L(n,e,t){let s;if(typeof n=="string"){const r=new URL(n,location.href),i=({url:c})=>c.href===r.href;s=new m(i,e,t)}else if(n instanceof RegExp)s=new le(n,e,t);else if(typeof n=="function")s=new m(n,e,t);else if(n instanceof m)s=n;else throw new l("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});return de().registerRoute(s),s}function fe(n,e=[]){for(const t of[...n.searchParams.keys()])e.some(s=>s.test(t))&&n.searchParams.delete(t);return n}function*pe(n,{ignoreURLParametersMatching:e=[/^utm_/,/^fbclid$/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:a}={}){const r=new URL(n,location.href);r.hash="",yield r.href;const i=fe(r,e);if(yield i.href,t&&i.pathname.endsWith("/")){const c=new URL(i.href);c.pathname+=t,yield c.href}if(s){const c=new URL(i.href);c.pathname+=".html",yield c.href}if(a){const c=a({url:r});for(const o of c)yield o.href}}class ge extends m{constructor(e,t){const s=({request:a})=>{const r=e.getURLsToCacheKeys();for(const i of pe(a.url,t)){const c=r.get(i);if(c){const o=e.getIntegrityForCacheKey(c);return{cacheKey:c,integrity:o}}}};super(s,e.strategy)}}function me(n){const e=O(),t=new ge(e,n);L(t)}function we(n){O().precache(n)}function ye(n,e){we(n),me(e)}class W extends S{async _handle(e,t){let s=await t.cacheMatch(e),a;if(!s)try{s=await t.fetchAndCachePut(e)}catch(r){r instanceof Error&&(a=r)}if(!s)throw new l("no-response",{url:e.url,error:a});return s}}function B(n){n.then(()=>{})}const _e=(n,e)=>e.some(t=>n instanceof t);let j,F;function Re(){return j||(j=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function be(){return F||(F=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const q=new WeakMap,U=new WeakMap,H=new WeakMap,T=new WeakMap,k=new WeakMap;function Ce(n){const e=new Promise((t,s)=>{const a=()=>{n.removeEventListener("success",r),n.removeEventListener("error",i)},r=()=>{t(f(n.result)),a()},i=()=>{s(n.error),a()};n.addEventListener("success",r),n.addEventListener("error",i)});return e.then(t=>{t instanceof IDBCursor&&q.set(t,n)}).catch(()=>{}),k.set(e,n),e}function xe(n){if(U.has(n))return;const e=new Promise((t,s)=>{const a=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",i),n.removeEventListener("abort",i)},r=()=>{t(),a()},i=()=>{s(n.error||new DOMException("AbortError","AbortError")),a()};n.addEventListener("complete",r),n.addEventListener("error",i),n.addEventListener("abort",i)});U.set(n,e)}let P={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return U.get(n);if(e==="objectStoreNames")return n.objectStoreNames||H.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return f(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Ee(n){P=n(P)}function De(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const s=n.call(I(this),e,...t);return H.set(s,e.sort?e.sort():[e]),f(s)}:be().includes(n)?function(...e){return n.apply(I(this),e),f(q.get(this))}:function(...e){return f(n.apply(I(this),e))}}function Le(n){return typeof n=="function"?De(n):(n instanceof IDBTransaction&&xe(n),_e(n,Re())?new Proxy(n,P):n)}function f(n){if(n instanceof IDBRequest)return Ce(n);if(T.has(n))return T.get(n);const e=Le(n);return e!==n&&(T.set(n,e),k.set(e,n)),e}const I=n=>k.get(n);function Ue(n,e,{blocked:t,upgrade:s,blocking:a,terminated:r}={}){const i=indexedDB.open(n,e),c=f(i);return s&&i.addEventListener("upgradeneeded",o=>{s(f(i.result),o.oldVersion,o.newVersion,f(i.transaction),o)}),t&&i.addEventListener("blocked",o=>t(o.oldVersion,o.newVersion,o)),c.then(o=>{r&&o.addEventListener("close",()=>r()),a&&o.addEventListener("versionchange",h=>a(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}function Te(n,{blocked:e}={}){const t=indexedDB.deleteDatabase(n);return e&&t.addEventListener("blocked",s=>e(s.oldVersion,s)),f(t).then(()=>{})}const ke=["get","getKey","getAll","getAllKeys","count"],Pe=["put","add","delete","clear"],M=new Map;function V(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(M.get(e))return M.get(e);const t=e.replace(/FromIndex$/,""),s=e!==t,a=Pe.includes(t);if(!(t in(s?IDBIndex:IDBObjectStore).prototype)||!(a||ke.includes(t)))return;const r=async function(i,...c){const o=this.transaction(i,a?"readwrite":"readonly");let h=o.store;return s&&(h=h.index(c.shift())),(await Promise.all([h[t](...c),a&&o.done]))[0]};return M.set(e,r),r}Ee(n=>({...n,get:(e,t,s)=>V(e,t)||n.get(e,t,s),has:(e,t)=>!!V(e,t)||n.has(e,t)}));try{self["workbox:expiration:7.2.0"]&&_()}catch{}const Ie="workbox-expiration",y="cache-entries",$=n=>{const e=new URL(n,location.href);return e.hash="",e.href};class Me{constructor(e){this._db=null,this._cacheName=e}_upgradeDb(e){const t=e.createObjectStore(y,{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1})}_upgradeDbAndDeleteOldDbs(e){this._upgradeDb(e),this._cacheName&&Te(this._cacheName)}async setTimestamp(e,t){e=$(e);const s={url:e,timestamp:t,cacheName:this._cacheName,id:this._getId(e)},r=(await this.getDb()).transaction(y,"readwrite",{durability:"relaxed"});await r.store.put(s),await r.done}async getTimestamp(e){const s=await(await this.getDb()).get(y,this._getId(e));return s==null?void 0:s.timestamp}async expireEntries(e,t){const s=await this.getDb();let a=await s.transaction(y).store.index("timestamp").openCursor(null,"prev");const r=[];let i=0;for(;a;){const o=a.value;o.cacheName===this._cacheName&&(e&&o.timestamp<e||t&&i>=t?r.push(a.value):i++),a=await a.continue()}const c=[];for(const o of r)await s.delete(y,o.id),c.push(o.url);return c}_getId(e){return this._cacheName+"|"+$(e)}async getDb(){return this._db||(this._db=await Ue(Ie,1,{upgrade:this._upgradeDbAndDeleteOldDbs.bind(this)})),this._db}}class Ne{constructor(e,t={}){this._isRunning=!1,this._rerunRequested=!1,this._maxEntries=t.maxEntries,this._maxAgeSeconds=t.maxAgeSeconds,this._matchOptions=t.matchOptions,this._cacheName=e,this._timestampModel=new Me(e)}async expireEntries(){if(this._isRunning){this._rerunRequested=!0;return}this._isRunning=!0;const e=this._maxAgeSeconds?Date.now()-this._maxAgeSeconds*1e3:0,t=await this._timestampModel.expireEntries(e,this._maxEntries),s=await self.caches.open(this._cacheName);for(const a of t)await s.delete(a,this._matchOptions);this._isRunning=!1,this._rerunRequested&&(this._rerunRequested=!1,B(this.expireEntries()))}async updateTimestamp(e){await this._timestampModel.setTimestamp(e,Date.now())}async isURLExpired(e){if(this._maxAgeSeconds){const t=await this._timestampModel.getTimestamp(e),s=Date.now()-this._maxAgeSeconds*1e3;return t!==void 0?t<s:!0}else return!1}async delete(){this._rerunRequested=!1,await this._timestampModel.expireEntries(1/0)}}function Ke(n){A.add(n)}class G{constructor(e={}){this.cachedResponseWillBeUsed=async({event:t,request:s,cacheName:a,cachedResponse:r})=>{if(!r)return null;const i=this._isResponseDateFresh(r),c=this._getCacheExpiration(a);B(c.expireEntries());const o=c.updateTimestamp(s.url);if(t)try{t.waitUntil(o)}catch{}return i?r:null},this.cacheDidUpdate=async({cacheName:t,request:s})=>{const a=this._getCacheExpiration(t);await a.updateTimestamp(s.url),await a.expireEntries()},this._config=e,this._maxAgeSeconds=e.maxAgeSeconds,this._cacheExpirations=new Map,e.purgeOnQuotaError&&Ke(()=>this.deleteCacheAndMetadata())}_getCacheExpiration(e){if(e===b.getRuntimeName())throw new l("expire-custom-caches-only");let t=this._cacheExpirations.get(e);return t||(t=new Ne(e,this._config),this._cacheExpirations.set(e,t)),t}_isResponseDateFresh(e){if(!this._maxAgeSeconds)return!0;const t=this._getDateHeaderTimestamp(e);if(t===null)return!0;const s=Date.now();return t>=s-this._maxAgeSeconds*1e3}_getDateHeaderTimestamp(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),a=new Date(t).getTime();return isNaN(a)?null:a}async deleteCacheAndMetadata(){for(const[e,t]of this._cacheExpirations)await self.caches.delete(e),await t.delete();this._cacheExpirations=new Map}}ye([{"revision":null,"url":"assets/index.4a6859f9.js"},{"revision":null,"url":"assets/index.e56d31bd.css"},{"revision":null,"url":"assets/vendor.d7c73812.js"},{"revision":null,"url":"assets/workbox-window.prod.es5.c3f5c4fd.js"},{"revision":"9037c35cd3143a94525f1f2f148f34a4","url":"canvas.svg"},{"revision":"268c201344702e2b2b85123113868eda","url":"index.html"},{"revision":"c0f5b6ebf96dc6793e37cc0b4fb75f6d","url":"pattern/carbon.png"},{"revision":"97939a3f3ae4e22479facb3777365260","url":"pattern/cloth.png"},{"revision":"fd693e9513bc860387dd22cbdaba7e99","url":"pattern/crayon.png"},{"revision":"02464a71c93b4ed6a6ed1ed056c18481","url":"pattern/crayonDark.png"},{"revision":"5bef8d07b80ec85cd465031cbb69f61e","url":"pattern/oil.png"},{"revision":"9037c35cd3143a94525f1f2f148f34a4","url":"canvas.svg"},{"revision":"e304c007aa4789d0b370eac739fdc660","url":"manifest.webmanifest"}]),L(/^https:\/\/raw\.githubusercontent\.com\/.*/i,new W({cacheName:"github-images",plugins:[new G({maxEntries:100,maxAgeSeconds:60*60*24*7})]})),L(/^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,new W({cacheName:"google-fonts",plugins:[new G({maxEntries:10,maxAgeSeconds:60*60*24*365})]})),self.addEventListener("message",n=>{n.data&&n.data.type==="SKIP_WAITING"&&self.skipWaiting()})})();
