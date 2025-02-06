import { QuestDetail } from '../components/QuestDetail';

export function SocialQuest() {
  const questData = {
    category: 'Ultra',
    title: 'Social Adventurer',
    subtitle: 'Forge connections, spread the hype, and claim your rewards!',
    description: 'Greetings, bold explorer! The digital realm is vast, and your quest is clear: to venture into the world of social media and spread the word of Ultra!',
    backgroundImage: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80',
    gems: 50,
    rewards: [
      {
        type: 'ingame',
        title: 'Trailblazer Backpack Skin',
        subtitle: 'Backpack',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80',
        by: 'Ultra'
      },
      {
        type: 'ingame',
        title: 'Blue & Pink',
        subtitle: 'Hair Colour Dual',
        image: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?auto=format&fit=crop&q=80',
        by: 'Ultra'
      },
      {
        type: 'ingame',
        title: 'Land NFT Airdrop Voucher',
        subtitle: 'Utility',
        image: 'https://images.unsplash.com/photo-1642104704074-907c0698b98d?auto=format&fit=crop&q=80',
        by: 'Ultra'
      }
    ],
    steps: [
      {
        title: 'Follow @ultra.io on Twitter',
        description: 'Discover the latest news, sneak peeks, and spicy memes from the heart of XX Gaming.',
        completed: true
      },
      {
        title: 'Post your hype using #UltraGamingQuest hastag',
        description: 'Share your excitement about XX Gaming and join the conversation with the community.'
      },
      {
        title: 'Tag 2 friends in a post with #UltraGamingQuest',
        description: 'Spread the joy by recruiting your party of social adventurers.'
      },
      {
        title: 'Comment on Ultra latest post',
        description: 'Let your voice be heard! Cheer us on, share your thoughts, or drop an emoji or two.'
      }
    ]
  };

  return <QuestDetail {...questData} />;
}