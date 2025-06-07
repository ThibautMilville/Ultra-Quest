import { Timer, Gift, ArrowLeft, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components/layout';



function QuestCard({ title, subtitle, gems, lvlup, endsIn, image, completed, hasClaimButton }: {
  title: string;
  subtitle: string;
  gems: number;
  lvlup: number;
  endsIn: string;
  image: string;
  completed?: boolean;
  hasClaimButton?: boolean;
}) {
  return (
    <div className="quest-card relative overflow-hidden rounded-xl group cursor-pointer bg-[#2A2D2E] border border-gray-700/50">
      <div className="absolute top-4 right-4 text-xs text-gray-300 bg-black/60 px-2 py-1 rounded-full backdrop-blur-sm">
        Ends in {endsIn}
      </div>
      
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">{title}</h3>
        <p className="text-sm text-gray-300 mb-4">{subtitle}</p>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <Gift size={16} className="text-purple-400" />
            <span className="text-sm text-white">{gems} Gems</span>
          </div>
          <div className="flex items-center gap-1">
            <Timer size={16} className="text-purple-400" />
            <span className="text-sm text-white">{lvlup} LvlUp</span>
          </div>
        </div>

        {hasClaimButton && (
          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
            Claim rewards
          </button>
        )}

        {completed && (
          <div className="flex items-center gap-2 text-green-400">
            <Check size={16} />
            <span className="text-sm">Completed</span>
          </div>
        )}
      </div>
    </div>
  );
}

function GameQuest() {
  return (
    <div className="min-h-screen bg-[#1A1B1C] text-white">
      {/* Navigation */}
      <Header activeSection="quests" />

      {/* Header with Back Button */}
      <header className="relative h-[300px] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1920"
          alt="Ashes of Mankind"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1B1C] via-[#1A1B1C]/60 to-transparent">
          <div className="container mx-auto px-6 h-full flex flex-col justify-end pb-8">
            <Link to="/" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-4 w-fit">
              <ArrowLeft size={20} />
              <span>Back</span>
            </Link>
            
            <div className="flex items-end justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">Ashes of Mankind</h1>
                <p className="text-gray-300">9 quests</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Quest Grid */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* First Row */}
          <QuestCard
            title="Ready for battle."
            subtitle="Install Ashes of Mankind"
            gems={10}
            lvlup={1}
            endsIn="2D 17H"
            image="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600"
            hasClaimButton={true}
          />
          
          <QuestCard
            title="Taming the ascension"
            subtitle="Play 15h in Ashes of Mankind"
            gems={10}
            lvlup={1}
            endsIn="2D 17H"
            image="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=600"
          />
          
          <QuestCard
            title="Taming the ascension"
            subtitle="Play 15h in Ashes of Mankind"
            gems={10}
            lvlup={1}
            endsIn="2D 17H"
            image="https://images.unsplash.com/photo-1635322966219-b75ed372eb01?auto=format&fit=crop&q=80&w=600"
          />

          {/* Second Row */}
          <QuestCard
            title="First steps in the industry"
            subtitle="Get your first land in Ashes of Mankind Empires"
            gems={10}
            lvlup={1}
            endsIn="2D 17H"
            image="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600"
          />
          
          <QuestCard
            title="Ready for battle."
            subtitle="Install Ashes of Mankind"
            gems={10}
            lvlup={1}
            endsIn="2D 17H"
            image="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=600"
            completed={true}
          />
          
          <QuestCard
            title="Ready for battle."
            subtitle="Install Ashes of Mankind"
            gems={10}
            lvlup={1}
            endsIn="2D 17H"
            image="https://images.unsplash.com/photo-1635322966219-b75ed372eb01?auto=format&fit=crop&q=80&w=600"
            completed={true}
          />

          {/* Third Row */}
          <QuestCard
            title="Taming the ascension"
            subtitle="Play 15h in Ashes of Mankind"
            gems={10}
            lvlup={1}
            endsIn="2D 17H"
            image="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600"
          />
          
          <QuestCard
            title="Ready for battle."
            subtitle="Install Ashes of Mankind"
            gems={10}
            lvlup={1}
            endsIn="2D 17H"
            image="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=600"
          />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default GameQuest;