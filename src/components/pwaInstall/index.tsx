import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

let deferredPrompt: any = null

const PWAInstall: React.FC = () => {
  const { t } = useTranslation()
  const [showInstallButton, setShowInstallButton] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      // 阻止 Chrome 67 及更早版本自动显示的安装提示
      e.preventDefault()
      // 保存事件
      deferredPrompt = e
      // 更新 UI 显示安装按钮
      setShowInstallButton(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return
    }
    // 显示安装提示
    deferredPrompt.prompt()
    // 等待用户响应
    const { outcome } = await deferredPrompt.userChoice
    // 无论结果如何，清空 deferredPrompt
    deferredPrompt = null
    // 隐藏安装按钮
    setShowInstallButton(false)
    console.log(`User ${outcome} the installation`)
  }

  if (!showInstallButton) return null

  return (
    <div className="toast toast-end">
      <div className="alert alert-info">
        <div>
          <span>{t('pwa.installTip')}</span>
          <button
            className="btn btn-sm btn-primary"
            onClick={handleInstallClick}
          >
            {t('pwa.install')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PWAInstall
