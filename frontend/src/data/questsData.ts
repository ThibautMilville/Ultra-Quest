export interface Quest {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  gems: number;
  lvlup: number;
  endsIn: string;
  image: string;
  completed?: boolean;
  category: 'ashes' | 'ultra' | 'social' | 'champion';
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'install' | 'play' | 'social' | 'purchase' | 'achievement';
  rewards?: Reward[];
}

export interface Reward {
  id: string;
  name: string;
  type: 'skin' | 'item' | 'nft' | 'currency' | 'utility';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  description: string;
  image?: string;
  from?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  gems: number;
  lvlup: number;
  endsIn: string;
  progress: number;
  maxProgress: number;
  type: 'daily' | 'weekly';
}

export const challenges: Challenge[] = [
  {
    id: 'daily-1',
    title: 'Achieve 2 daily quests',
    description: 'Complete any 2 quests today to earn bonus rewards',
    gems: 10,
    lvlup: 1,
    endsIn: '3H',
    progress: 1,
    maxProgress: 2,
    type: 'daily'
  },
  {
    id: 'weekly-1',
    title: 'Achieve 10 quests this week',
    description: 'Complete 10 quests during this week for massive rewards',
    gems: 10,
    lvlup: 1,
    endsIn: '2D 17H',
    progress: 6,
    maxProgress: 10,
    type: 'weekly'
  }
];

export const ashesQuests: Quest[] = [
  {
    id: 'ashes-1',
    title: 'Ready for battle',
    subtitle: 'Install Ashes of Mankind',
    description: 'Embark on an epic journey with Ashes of Mankind! Install the game now to uncover a world of mystery, challenge, and endless adventure. Don\'t miss your chance to shape the story—download and start playing today!',
    gems: 50,
    lvlup: 3,
    endsIn: '2D 17H',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop&crop=center',
    category: 'ashes',
    difficulty: 'easy',
    type: 'install',
    rewards: [
      {
        id: 'reward-1',
        name: 'Trailblazer Backpack Skin',
        type: 'skin',
        rarity: 'rare',
        description: 'Backpack',
        from: 'by Labas'
      },
      {
        id: 'reward-2',
        name: 'Blue & Pink',
        type: 'skin',
        rarity: 'epic',
        description: 'Hair Colour Dust',
        from: 'by Ultra'
      },
      {
        id: 'reward-3',
        name: 'Land NFT Airdrop Voucher',
        type: 'nft',
        rarity: 'legendary',
        description: 'Utility',
        from: 'by Ultra'
      }
    ]
  },
  {
    id: 'ashes-2',
    title: 'Taming the ascension',
    subtitle: 'Play 15h to Ashes of Mankind',
    description: 'Prove your dedication to the wasteland. Survive, explore, and conquer for 15 hours to unlock exclusive rewards and show your mastery of the post-apocalyptic world.',
    gems: 150,
    lvlup: 8,
    endsIn: '2D 17H',
    image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=600&fit=crop&crop=center',
    category: 'ashes',
    difficulty: 'medium',
    type: 'play',
    rewards: [
      {
        id: 'reward-4',
        name: 'Wasteland Warrior Armor',
        type: 'skin',
        rarity: 'epic',
        description: 'Full Body Armor Set',
        from: 'by Ashes Team'
      },
      {
        id: 'reward-5',
        name: 'Survival Kit',
        type: 'item',
        rarity: 'rare',
        description: 'Essential survival tools',
        from: 'by Ashes Team'
      }
    ]
  },
  {
    id: 'ashes-3',
    title: 'First steps in the industry',
    subtitle: 'Get your first land in Ashes of Mankind Empires',
    description: 'Establish your dominion in the wasteland. Acquire your first piece of territory and begin building your empire in the harsh post-apocalyptic world.',
    gems: 200,
    lvlup: 10,
    endsIn: '2D 17H',
    image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop&crop=center',
    category: 'ashes',
    difficulty: 'hard',
    type: 'achievement',
    rewards: [
      {
        id: 'reward-6',
        name: 'Empire Builder Badge',
        type: 'nft',
        rarity: 'legendary',
        description: 'Exclusive achievement NFT',
        from: 'by Ashes Team'
      },
      {
        id: 'reward-7',
        name: 'Territory Expansion Pack',
        type: 'utility',
        rarity: 'epic',
        description: 'Land development tools',
        from: 'by Ashes Team'
      }
    ]
  },
  {
    id: 'ashes-4',
    title: 'Wasteland survivor',
    subtitle: 'Survive 50 consecutive days',
    description: 'Test your endurance in the harsh wasteland. Survive 50 consecutive days without dying to prove you\'re a true survivor.',
    gems: 300,
    lvlup: 15,
    endsIn: '2D 17H',
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=600&fit=crop&crop=center',
    category: 'ashes',
    difficulty: 'hard',
    type: 'achievement',
    completed: true,
    rewards: [
      {
        id: 'reward-8',
        name: 'Survivor\'s Cloak',
        type: 'skin',
        rarity: 'legendary',
        description: 'Weathered survival gear',
        from: 'by Ashes Team'
      }
    ]
  },
  {
    id: 'ashes-5',
    title: 'Resource master',
    subtitle: 'Collect 1000 scrap metal',
    description: 'Become a master scavenger. Collect 1000 pieces of scrap metal to craft powerful equipment and fortify your base.',
    gems: 75,
    lvlup: 5,
    endsIn: '2D 17H',
    image: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&h=600&fit=crop&crop=center',
    category: 'ashes',
    difficulty: 'medium',
    type: 'achievement',
    rewards: [
      {
        id: 'reward-9',
        name: 'Scavenger\'s Toolkit',
        type: 'item',
        rarity: 'rare',
        description: 'Advanced crafting tools',
        from: 'by Ashes Team'
      }
    ]
  },
  {
    id: 'ashes-6',
    title: 'Brotherhood alliance',
    subtitle: 'Join a faction and complete 5 missions',
    description: 'Unite with fellow survivors. Join one of the major factions and complete 5 missions to gain their trust and unlock faction-exclusive rewards.',
    gems: 125,
    lvlup: 7,
    endsIn: 'Ended',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center',
    category: 'ashes',
    difficulty: 'medium',
    type: 'achievement',
    rewards: [
      {
        id: 'reward-10',
        name: 'Faction Insignia',
        type: 'nft',
        rarity: 'epic',
        description: 'Brotherhood membership token',
        from: 'by Ashes Team'
      }
    ]
  },
  {
    id: 'ashes-7',
    title: 'Apex predator',
    subtitle: 'Defeat 100 mutant creatures',
    description: 'Become the ultimate hunter in the wasteland. Track and eliminate 100 mutant creatures to prove your combat prowess.',
    gems: 180,
    lvlup: 9,
    endsIn: 'Ended',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
    category: 'ashes',
    difficulty: 'hard',
    type: 'achievement',
    rewards: [
      {
        id: 'reward-11',
        name: 'Hunter\'s Trophy',
        type: 'item',
        rarity: 'legendary',
        description: 'Proof of hunting mastery',
        from: 'by Ashes Team'
      }
    ]
  },
  {
    id: 'ashes-8',
    title: 'Tech savant',
    subtitle: 'Craft 25 advanced weapons',
    description: 'Master the art of wasteland engineering. Craft 25 advanced weapons using rare materials and blueprints.',
    gems: 220,
    lvlup: 11,
    endsIn: 'Ended',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop&crop=center',
    category: 'ashes',
    difficulty: 'hard',
    type: 'achievement',
    rewards: [
      {
        id: 'reward-12',
        name: 'Master Craftsman Kit',
        type: 'utility',
        rarity: 'epic',
        description: 'Advanced crafting station',
        from: 'by Ashes Team'
      }
    ]
  }
];

export const ultraQuests: Quest[] = [
  {
    id: 'ultra-1',
    title: 'Digital collector',
    subtitle: 'Purchase your first Uniq on the Marketplace',
    description: 'Enter the world of digital ownership. Browse the Ultra Marketplace and purchase your first Uniq to start your collection of unique digital assets.',
    gems: 100,
    lvlup: 5,
    endsIn: '2D 17H',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop&crop=center',
    category: 'ultra',
    difficulty: 'easy',
    type: 'purchase',
    rewards: [
      {
        id: 'reward-13',
        name: 'Collector\'s Badge',
        type: 'nft',
        rarity: 'rare',
        description: 'First purchase achievement',
        from: 'by Ultra'
      }
    ]
  },
  {
    id: 'ultra-2',
    title: 'Gaming pioneer',
    subtitle: 'Install Ultra Games client',
    description: 'Join the future of gaming. Download and install the Ultra Games client to access exclusive games and features.',
    gems: 50,
    lvlup: 3,
    endsIn: '1D 12H',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&crop=center',
    category: 'ultra',
    difficulty: 'easy',
    type: 'install',
    rewards: [
      {
        id: 'reward-14',
        name: 'Pioneer Skin Pack',
        type: 'skin',
        rarity: 'common',
        description: 'Exclusive launcher themes',
        from: 'by Ultra'
      }
    ]
  },
  {
    id: 'ultra-3',
    title: 'Tournament champion',
    subtitle: 'Participate in 3 Ultra tournaments',
    description: 'Prove your skills in competitive gaming. Enter and participate in 3 different Ultra tournaments to earn recognition and rewards.',
    gems: 250,
    lvlup: 12,
    endsIn: '14D 6H',
    image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800&h=600&fit=crop&crop=center',
    category: 'ultra',
    difficulty: 'hard',
    type: 'achievement',
    completed: true,
    rewards: [
      {
        id: 'reward-15',
        name: 'Champion\'s Crown',
        type: 'nft',
        rarity: 'legendary',
        description: 'Tournament victory trophy',
        from: 'by Ultra'
      }
    ]
  },
  {
    id: 'ultra-4',
    title: 'Community builder',
    subtitle: 'Invite 10 friends to Ultra',
    description: 'Expand the Ultra community. Invite 10 friends to join the platform and help them get started with their gaming journey.',
    gems: 150,
    lvlup: 8,
    endsIn: '7D 18H',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&crop=center',
    category: 'ultra',
    difficulty: 'medium',
    type: 'social',
    rewards: [
      {
        id: 'reward-16',
        name: 'Community Leader Badge',
        type: 'item',
        rarity: 'epic',
        description: 'Recognition for community growth',
        from: 'by Ultra'
      }
    ]
  },
  {
    id: 'ultra-5',
    title: 'Marketplace maven',
    subtitle: 'Complete 5 transactions on Ultra Marketplace',
    description: 'Become a marketplace expert. Complete 5 successful transactions buying or selling Uniqs to master the digital economy.',
    gems: 200,
    lvlup: 10,
    endsIn: '5D 12H',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop&crop=center',
    category: 'ultra',
    difficulty: 'medium',
    type: 'achievement',
    completed: true,
    rewards: [
      {
        id: 'reward-17',
        name: 'Trader\'s Seal',
        type: 'nft',
        rarity: 'epic',
        description: 'Marketplace mastery certificate',
        from: 'by Ultra'
      }
    ]
  }
];

export const socialQuests: Quest[] = [
  {
    id: 'social-1',
    title: 'Social Adventurer',
    subtitle: 'Complete all social media challenges',
    description: 'Forge connections, spread the hype, and claim your rewards! Complete all social media tasks to become a true Ultra ambassador.',
    gems: 100,
    lvlup: 6,
    endsIn: '2D 17H',
    image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=600&fit=crop&crop=center',
    category: 'social',
    difficulty: 'easy',
    type: 'social',
    rewards: [
      {
        id: 'reward-18',
        name: 'Trailblazer Backpack Skin',
        type: 'skin',
        rarity: 'rare',
        description: 'Backpack',
        from: 'by Labas'
      },
      {
        id: 'reward-19',
        name: 'Blue & Pink',
        type: 'skin',
        rarity: 'epic',
        description: 'Hair Colour Dust',
        from: 'by Ultra'
      },
      {
        id: 'reward-20',
        name: 'Land NFT Airdrop Voucher',
        type: 'nft',
        rarity: 'legendary',
        description: 'Utility',
        from: 'by Ultra'
      }
    ]
  },
  {
    id: 'social-2',
    title: 'Content creator',
    subtitle: 'Share 3 Ultra gaming moments',
    description: 'Become a content creator in the Ultra community. Share 3 epic gaming moments on social media with Ultra hashtags.',
    gems: 75,
    lvlup: 4,
    endsIn: '5D 11H',
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&h=600&fit=crop&crop=center',
    category: 'social',
    difficulty: 'medium',
    type: 'social',
    rewards: [
      {
        id: 'reward-21',
        name: 'Creator\'s Toolkit',
        type: 'utility',
        rarity: 'rare',
        description: 'Content creation assets',
        from: 'by Ultra'
      }
    ]
  },
  {
    id: 'social-3',
    title: 'Influencer rising',
    subtitle: 'Get 100 likes on Ultra content',
    description: 'Build your influence in the gaming community. Create engaging Ultra content that receives at least 100 likes across platforms.',
    gems: 200,
    lvlup: 10,
    endsIn: '10D 4H',
    image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop&crop=center',
    category: 'social',
    difficulty: 'hard',
    type: 'social',
    rewards: [
      {
        id: 'reward-22',
        name: 'Influencer Crown',
        type: 'nft',
        rarity: 'legendary',
        description: 'Social media mastery token',
        from: 'by Ultra'
      }
    ]
  }
];

export const allQuests = [...ashesQuests, ...ultraQuests, ...socialQuests];

export const featuredQuest = ashesQuests[0]; // Ready for battle

export const gameImages = [
  '/ultra-quest/ashesofmankind.png',
  'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=200',
  '/ultra-quest/favicon.ico'
];

export const championQuests: Quest[] = [
  {
    id: 'champion-1',
    title: 'Strategic Mastery',
    subtitle: 'Master the art of tactical combat',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&crop=center',
    gems: 150,
    lvlup: 75,
    endsIn: '5 days',
    category: 'champion',
    difficulty: 'medium',
    type: 'achievement',
    rewards: [
      {
        id: 'champion-reward-1',
        name: 'Tactical Commander Badge',
        description: 'A prestigious badge for tactical excellence',
        type: 'item',
        rarity: 'epic',
        image: '/ultra-quest/champion-tactis.png'
      },
      {
        id: 'champion-reward-2',
        name: 'Strategy Guide NFT',
        description: 'Exclusive digital strategy guide',
        type: 'nft',
        rarity: 'legendary',
        image: '/ultra-quest/champion-tactis.png'
      }
    ]
  },
  {
    id: 'champion-2',
    title: 'Formation Expert',
    subtitle: 'Perfect your battle formations',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop&crop=center',
    gems: 120,
    lvlup: 60,
    endsIn: '3 days',
    category: 'champion',
    difficulty: 'medium',
    type: 'achievement',
    rewards: [
      {
        id: 'champion-reward-3',
        name: 'Formation Blueprint',
        description: 'Advanced battle formation plans',
        type: 'item',
        rarity: 'rare',
        image: '/ultra-quest/champion-tactis.png'
      }
    ]
  },
  {
    id: 'champion-3',
    title: 'Victory Streak',
    subtitle: 'Win 10 consecutive battles',
    image: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=800&h=600&fit=crop&crop=center',
    gems: 200,
    lvlup: 100,
    endsIn: '1 week',
    category: 'champion',
    difficulty: 'hard',
    type: 'achievement',
    completed: true,
    rewards: [
      {
        id: 'champion-reward-4',
        name: 'Champion Crown',
        description: 'Crown of the ultimate champion',
        type: 'item',
        rarity: 'legendary',
        image: '/ultra-quest/champion-tactis.png'
      }
    ]
  },
  {
    id: 'champion-4',
    title: 'Tactical Genius',
    subtitle: 'Develop advanced strategies',
    image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&h=600&fit=crop&crop=center',
    gems: 180,
    lvlup: 90,
    endsIn: '4 days',
    category: 'champion',
    difficulty: 'hard',
    type: 'achievement',
    rewards: [
      {
        id: 'champion-reward-5',
        name: 'Genius Medal',
        description: 'Medal for strategic brilliance',
        type: 'item',
        rarity: 'epic',
        image: '/ultra-quest/champion-tactis.png'
      }
    ]
  },
  {
    id: 'champion-5',
    title: 'Arena Champion',
    subtitle: 'Dominate the championship arena',
    image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=600&fit=crop&crop=center',
    gems: 250,
    lvlup: 125,
    endsIn: '2 weeks',
    category: 'champion',
    difficulty: 'hard',
    type: 'achievement',
    completed: true,
    rewards: [
      {
        id: 'champion-reward-6',
        name: 'Arena Trophy NFT',
        description: 'Ultimate arena victory trophy',
        type: 'nft',
        rarity: 'legendary',
        image: '/ultra-quest/champion-tactis.png'
      }
    ]
  }
]; 