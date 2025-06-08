export function getRewardDescriptionKey(description: string): string {
  const descriptionMap: { [key: string]: string } = {
    'Backpack': 'reward.backpack',
    'Hair Colour Dust': 'reward.hairColourDust',
    'Utility': 'reward.utility',
    'Full Body Armor Set': 'reward.fullBodyArmorSet',
    'Essential survival tools': 'reward.essentialSurvivalTools',
    'Exclusive achievement NFT': 'reward.exclusiveAchievementNft',
    'Land development tools': 'reward.landDevelopmentTools',
    'Weathered survival gear': 'reward.weatheredSurvivalGear',
    'Advanced crafting tools': 'reward.advancedCraftingTools',
    'Brotherhood membership token': 'reward.brotherhoodMembershipToken',
    'Proof of hunting mastery': 'reward.proofOfHuntingMastery',
    'Exclusive digital strategy guide': 'reward.exclusiveDigitalStrategyGuide',
    'Advanced battle formation plans': 'reward.advancedBattleFormationPlans',
    'Crown of the ultimate champion': 'reward.crownOfTheUltimateChampion',
    'Medal for strategic brilliance': 'reward.medalForStrategicBrilliance',
    'Ultimate arena victory trophy': 'reward.ultimateArenaVictoryTrophy',
    'A prestigious badge for tactical excellence': 'reward.prestigiousBadgeForTacticalExcellence',
    'Content creation assets': 'reward.contentCreationAssets',
    'Social media mastery token': 'reward.socialMediaMasteryToken'
  };

  return descriptionMap[description] || description;
} 