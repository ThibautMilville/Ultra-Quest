import React, { useState } from 'react'
import { Gift, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { useQuestRewards } from '../hooks/useQuestRewards'
import { useTranslationWithFlags } from '../hooks/useTranslation'
import { Quest } from '../data/questsData'

interface ClaimRewardsButtonProps {
  quest: Quest
  className?: string
  customColors?: {
    default: string
    success: string
    error: string
  }
  onSuccess?: () => void
  onError?: (error: string) => void
}

const ClaimRewardsButton: React.FC<ClaimRewardsButtonProps> = ({
  quest,
  className = '',
  customColors,
  onSuccess,
  onError
}) => {
  const { t } = useTranslationWithFlags()
  const { isClaimingRewards, claimError, claimRewards, canClaimRewards } = useQuestRewards()
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

  // Couleurs par défaut basées sur la catégorie de la quête
  const getDefaultColors = () => {
    switch (quest.category) {
      case 'ashes':
        return {
          default: 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700',
          success: 'bg-green-600 hover:bg-green-700',
          error: 'bg-red-600 hover:bg-red-700'
        }
      case 'ultra':
        return {
          default: 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700',
          success: 'bg-green-600 hover:bg-green-700',
          error: 'bg-red-600 hover:bg-red-700'
        }
      case 'champion':
        return {
          default: 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700',
          success: 'bg-green-600 hover:bg-green-700',
          error: 'bg-red-600 hover:bg-red-700'
        }
      case 'social':
        return {
          default: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700',
          success: 'bg-green-600 hover:bg-green-700',
          error: 'bg-red-600 hover:bg-red-700'
        }
      default:
        return {
          default: 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700',
          success: 'bg-green-600 hover:bg-green-700',
          error: 'bg-red-600 hover:bg-red-700'
        }
    }
  }

  const colors = customColors || getDefaultColors()

  const handleClaimRewards = async (e?: React.MouseEvent) => {
    // Empêcher la propagation de l'événement pour éviter la redirection
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!canClaimRewards) {
      const error = t('wallet.notConnected')
      setShowError(true)
      onError?.(error)
      setTimeout(() => setShowError(false), 3000)
      return
    }

    if (!quest.completed) {
      const error = 'Quest must be completed first'
      setShowError(true)
      onError?.(error)
      setTimeout(() => setShowError(false), 3000)
      return
    }

    try {
      const success = await claimRewards(quest)
      
      if (success) {
        setShowSuccess(true)
        onSuccess?.()
        setTimeout(() => setShowSuccess(false), 3000)
      } else {
        setShowError(true)
        onError?.(claimError || t('wallet.claimError'))
        setTimeout(() => setShowError(false), 3000)
      }
    } catch (error: any) {
      setShowError(true)
      onError?.(error.message || t('wallet.claimError'))
      setTimeout(() => setShowError(false), 3000)
    }
  }

  // Si la quête n'est pas complétée, ne pas afficher le bouton
  if (!quest.completed) {
    return null
  }

  return (
    <div className="relative">
      <button
        onClick={handleClaimRewards}
        disabled={isClaimingRewards || !canClaimRewards}
        className={`
          w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold 
          transition-all duration-200 shadow-lg hover-lift-sm
          ${isClaimingRewards || !canClaimRewards
            ? 'bg-gray-600 cursor-not-allowed opacity-50'
            : showSuccess
            ? colors.success
            : showError
            ? colors.error
            : colors.default
          }
          text-white ${className}
        `}
      >
        {isClaimingRewards ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            <span>{t('wallet.claimingRewards')}</span>
          </>
        ) : showSuccess ? (
          <>
            <CheckCircle size={18} />
            <span>Claimed!</span>
          </>
        ) : showError ? (
          <>
            <AlertCircle size={18} />
            <span>Error</span>
          </>
        ) : (
          <>
            <Gift size={18} />
            <span>{t('button.claimRewards')}</span>
          </>
        )}
      </button>

      {/* Tooltip d'erreur */}
      {showError && claimError && (
        <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-red-600/90 backdrop-blur-sm border border-red-500/50 rounded-lg text-white text-sm z-10">
          {claimError}
        </div>
      )}

      {/* Tooltip de succès */}
      {showSuccess && (
        <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-green-600/90 backdrop-blur-sm border border-green-500/50 rounded-lg text-white text-sm z-10">
          {t('wallet.rewardsClaimed')}
        </div>
      )}
    </div>
  )
}

export default ClaimRewardsButton 