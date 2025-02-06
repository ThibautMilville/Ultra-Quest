import { ArrowLeft, Diamond } from 'lucide-react';
import { Link } from 'react-router-dom';

interface QuestReward {
  type: string
  title: string
  subtitle: string
  image: string
  by: string
}

interface QuestStep {
  title: string;
  description: string;
  completed?: boolean;
}

interface QuestDetailProps {
  category: string;
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  rewards: QuestReward[];
  steps: QuestStep[];
  gems: number;
}

export function QuestDetail({
  category,
  title,
  subtitle,
  description,
  backgroundImage,
  rewards,
  steps,
  gems
}: QuestDetailProps) {
  return (
    <div className="min-h-screen bg-[#1A1B1C] text-white">
      {/* Hero Section */}
      <div className="relative h-[500px]">
        <img
          src={backgroundImage}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1B1C] to-transparent">
          <div className="container mx-auto px-6 h-full">
            <div className="pt-6">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back</span>
              </Link>
            </div>

            <div className="mt-32">
              <div className="text-sm text-gray-400 mb-2">{category}</div>
              <h1 className="text-5xl font-bold mb-4 animate-slideUp">{title}</h1>
              <p className="text-xl text-gray-300 mb-4">{subtitle}</p>
              <p className="text-gray-400 max-w-2xl mb-8">{description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Rewards */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Rewards</h2>
            <div className="flex items-center gap-2 mb-8">
              <Diamond size={24} className="text-purple-400" />
              <span className="text-xl">{gems} Gems</span>
            </div>

            <div className="space-y-4">
              {rewards.map((reward, index) => (
                <div
                  key={index}
                  className="bg-[#2A2D2E] rounded-xl p-4 flex items-center gap-4 hover:bg-[#3A3D3E] transition-colors cursor-pointer"
                >
                  <img
                    src={reward.image}
                    alt={reward.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <div className="text-sm text-gray-400">
                      {reward.type === 'ingame' ? 'Ingame Item' : 'Reward'} • by {reward.by}
                    </div>
                    <div className="font-semibold">{reward.title}</div>
                    <div className="text-sm text-gray-400">{reward.subtitle}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Steps */}
          <div className="bg-[#2A2D2E]/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Claim rewards</h2>
            </div>

            <div className="space-y-4">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`bg-[#2A2D2E] rounded-xl p-4 flex items-start gap-4 ${step.completed ? 'bg-purple-600/20' : ''
                    }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${step.completed
                      ? 'bg-purple-600 text-white'
                      : 'bg-[#3A3D3E] text-gray-400'
                    }`}>
                    {step.completed ? '✓' : index + 1}
                  </div>
                  <div>
                    <div className="font-semibold">{step.title}</div>
                    <div className="text-sm text-gray-400">{step.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}