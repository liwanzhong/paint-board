import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './i18n'
import { registerSW } from 'virtual:pwa-register'
import i18next from 'i18next'

// Register service worker with periodic updates
registerSW({
  immediate: true,
  onOfflineReady() {
    // 创建一个 toast 提示
    const toast = document.createElement('div')
    toast.className = 'toast toast-top toast-center'
    toast.innerHTML = `
      <div class="alert alert-success">
        <span>${i18next.t('pwa.offlineReady')}</span>
      </div>
    `
    document.body.appendChild(toast)
    setTimeout(() => {
      document.body.removeChild(toast)
    }, 3000)
  },
  onNeedRefresh() {
    // 创建一个更新提示
    const toast = document.createElement('div')
    toast.className = 'toast toast-top toast-center'
    toast.innerHTML = `
      <div class="alert alert-info">
        <div>
          <span>${i18next.t('pwa.updateTip')}</span>
          <button class="btn btn-sm btn-primary ml-2" onclick="window.location.reload()">
            ${i18next.t('pwa.update')}
          </button>
        </div>
      </div>
    `
    document.body.appendChild(toast)
  },
  onRegisteredSW(swUrl, r) {
    // 检查更新
    if (r) {
      setInterval(async () => {
        if (!(!r.installing && navigator.serviceWorker.controller)) {
          return
        }
        await r.update()
      }, 60 * 60 * 1000) // 每小时检查一次更新
    }
  }
})

if (import.meta.env.PROD) {
  const script = document.createElement('script')
  script.textContent = `
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "k06rclje17");
  `
  script.async = true
  document.body.appendChild(script)
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
