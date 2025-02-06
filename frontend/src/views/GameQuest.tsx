import { QuestDetail } from '../components/QuestDetail';

export function GameQuest() {
  const questData = {
    category: 'Ashes of Mankind',
    title: 'Ready for battle.',
    subtitle: 'Install Ashes of Mankind',
    description: 'Embark on an epic journey with Ashes of Mankind! Install the game now to uncover a world of mystery, challenge, and endless adventure. Don\'t miss your chance to shape the story—download and start playing today!',
    backgroundImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80',
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
        title: 'Install Ashes of Mankind',
        description: 'Get Ashes of Mankind on https://ashesofmankind.com/ and install it',
        completed: false
      }
    ]
  };

  return <QuestDetail {...questData} />;
}