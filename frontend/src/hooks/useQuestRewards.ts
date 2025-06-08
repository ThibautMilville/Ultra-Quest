import { useState, useCallback } from 'react'
import { useUltraWallet } from './useUltraWallet'
import { Quest, Reward } from '../data/questsData'

interface ClaimRewardsParams {
  quest: Quest
  userAddress: string
}

export const useQuestRewards = () => {
  const { isConnected, blockchainId, signTransaction } = useUltraWallet()
  const [isClaimingRewards, setIsClaimingRewards] = useState(false)
  const [claimError, setClaimError] = useState<string | null>(null)

  // Créer une transaction pour claim les récompenses
  const createClaimRewardsTransaction = useCallback((quest: Quest, userAddress: string) => {
    // Transaction pour transférer les gems (UOS tokens)
    const gemsTransaction = {
      action: 'transfer',
      contract: 'eosio.token',
      data: {
        from: 'utquest.ultra', // Compte du système de quêtes
        to: userAddress,
        quantity: `${quest.gems.toFixed(4)} UOS`,
        memo: `Quest reward: ${quest.title} - ${quest.gems} gems`
      }
    }

    // Transactions pour les récompenses NFT/Uniq
    const rewardTransactions = quest.rewards?.map((reward: Reward) => {
      if (reward.type === 'nft') {
        return {
          action: 'issue',
          contract: 'eosio.nft.ft',
          data: {
            to: userAddress,
            token_configs: [{
              token_factory_id: 1, // ID de la factory pour les récompenses de quêtes
              amount: 1,
              custom_data: JSON.stringify({
                name: reward.name,
                description: reward.description,
                rarity: reward.rarity,
                quest_id: quest.id,
                reward_id: reward.id
              })
            }],
            memo: `Quest NFT reward: ${reward.name}`
          }
        }
      } else {
        // Pour les autres types de récompenses (skins, items, utility)
        return {
          action: 'transfer',
          contract: 'utquest.ultra',
          data: {
            from: 'utquest.ultra',
            to: userAddress,
            reward_type: reward.type,
            reward_data: JSON.stringify({
              name: reward.name,
              description: reward.description,
              rarity: reward.rarity,
              quest_id: quest.id,
              reward_id: reward.id
            }),
            memo: `Quest ${reward.type} reward: ${reward.name}`
          }
        }
      }
    }) || []

    return [gemsTransaction, ...rewardTransactions]
  }, [])

  // Fonction pour claim les récompenses
  const claimRewards = useCallback(async (quest: Quest): Promise<boolean> => {
    if (!isConnected || !blockchainId) {
      setClaimError('Wallet not connected')
      return false
    }

    if (!quest.completed) {
      setClaimError('Quest not completed yet')
      return false
    }

    setIsClaimingRewards(true)
    setClaimError(null)

    try {
      // Créer les transactions pour claim les récompenses
      const transactions = createClaimRewardsTransaction(quest, blockchainId)

      // Signer et envoyer les transactions
      const result = await signTransaction(transactions, {
        signOnly: false // Exécuter la transaction
      })

      if (result && result.status === 'success') {
        // Rewards claimed successfully
        return true
      } else {
        setClaimError('Failed to claim rewards')
        return false
      }
    } catch (error: any) {
      console.error('Error claiming rewards:', error)
      setClaimError(error.message || 'Failed to claim rewards')
      return false
    } finally {
      setIsClaimingRewards(false)
    }
  }, [isConnected, blockchainId, signTransaction, createClaimRewardsTransaction])

  // Calculer la valeur totale des récompenses
  const calculateRewardValue = useCallback((quest: Quest): number => {
    let totalValue = quest.gems // Valeur des gems

    if (quest.rewards) {
      quest.rewards.forEach((reward: Reward) => {
        // Ajouter une valeur estimée basée sur la rareté
        switch (reward.rarity) {
          case 'common':
            totalValue += 10
            break
          case 'rare':
            totalValue += 25
            break
          case 'epic':
            totalValue += 50
            break
          case 'legendary':
            totalValue += 100
            break
        }
      })
    }

    return totalValue
  }, [])

  return {
    isClaimingRewards,
    claimError,
    claimRewards,
    calculateRewardValue,
    canClaimRewards: isConnected && blockchainId
  }
} 