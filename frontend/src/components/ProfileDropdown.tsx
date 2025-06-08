import React from 'react'
import { User, LogOut, Copy } from 'lucide-react'
import { useTranslation } from '../contexts/TranslationContext'

interface ProfileDropdownProps {
  isOpen: boolean
  blockchainId: string
  handleDisconnect: () => void
  setIsOpen: (isOpen: boolean) => void
  profileDropdownRef: React.RefObject<HTMLDivElement>
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  isOpen,
  blockchainId,
  handleDisconnect,
  setIsOpen,
  profileDropdownRef
}) => {
  const { t } = useTranslation()



  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // Optionally show a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const formatAddress = (address: string) => {
    if (address.length <= 12) return address
    return `${address.slice(0, 6)}...${address.slice(-6)}`
  }

  if (!isOpen) return null

  return (
    <div
      ref={profileDropdownRef}
      onClick={(e) => e.stopPropagation()}
      className="absolute right-0 top-full mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50"
    >
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
            <User size={20} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium text-sm">{t('wallet.connected')}</p>
            <div className="flex items-center gap-2">
              <p className="text-gray-400 text-xs font-mono truncate">
                {formatAddress(blockchainId)}
              </p>
              <button
                onClick={() => copyToClipboard(blockchainId)}
                className="text-gray-400 hover:text-white transition-colors"
                title={t('wallet.copyAddress')}
              >
                <Copy size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDisconnect()
            setIsOpen(false)
          }}
          className="w-full flex items-center gap-3 px-3 py-2 text-left text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <LogOut size={16} />
          <span className="text-sm">{t('wallet.disconnect')}</span>
        </button>
      </div>
    </div>
  )
}

export default ProfileDropdown 