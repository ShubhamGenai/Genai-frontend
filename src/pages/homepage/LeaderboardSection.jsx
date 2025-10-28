import React from 'react';
import { Award } from 'lucide-react';

const performers = [
  {
    rank: 1,
    name: 'Aarav Sharma',
    score: 9850,
    badge: 'gold',
  },
  {
    rank: 2,
    name: 'Priya Patel',
    score: 9720,
    badge: 'silver',
  },
  {
    rank: 3,
    name: 'Rahul Kumar',
    score: 9580,
    badge: 'bronze',
  },
  {
    rank: 4,
    name: 'Ananya Singh',
    score: 9420,
    badge: null,
  },
  {
    rank: 5,
    name: 'Arjun Reddy',
    score: 9350,
    badge: null,
  },
];

const BadgeIcon = ({ type }) => {
  let bgColor = '';
  let textColor = 'text-white';
  let number = '';

  switch (type) {
    case 'gold':
      bgColor = 'bg-yellow-500';
      number = '1';
      break;
    case 'silver':
      bgColor = 'bg-purple-400';
      number = '2';
      break;
    case 'bronze':
      bgColor = 'bg-amber-600';
      number = '3';
      break;
    default:
      return null;
  }

  return (
    <div className={`relative w-6 h-6 rounded-full flex items-center justify-center ${bgColor} shadow-sm`}>
      <Award className="w-4 h-4 text-white" />
      <span className={`absolute text-xs font-bold ${textColor}`}>{number}</span>
    </div>
  );
};

export default function LeaderboardSection() {
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-2">
          Check the Books, <span className="text-blue-600">Unlock Your Future</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 font-light">
          Top performers this month
        </p>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          {/* Header Row */}
          <div className="grid grid-cols-4 text-left font-semibold text-gray-700 bg-gray-50 border-b border-gray-200 py-4 px-6 gap-6">
            <div className="flex items-center">Rank</div>
            <div className="flex items-center">Name</div>
            <div className="flex items-center justify-end">Score</div>
            <div className="flex items-center justify-center">Badge</div>
          </div>
          
          {/* Data Rows */}
          <div className="divide-y divide-gray-100">
            {performers.map((performer, index) => (
              <div
                key={performer.rank}
                className="grid grid-cols-4 items-center py-4 px-6 hover:bg-gray-50 transition-colors duration-200 group gap-6"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center">
                  <span
                    className={`w-7 h-7 rounded-md flex items-center justify-center text-sm font-semibold transition-all duration-300 group-hover:scale-110
                      ${performer.rank <= 3 ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'}
                    `}
                  >
                    #{performer.rank}
                  </span>
                </div>
                <div className="text-gray-800 font-medium group-hover:text-gray-900 transition-colors duration-300 text-base flex items-center">
                  {performer.name}
                </div>
                <div className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-300 text-base flex items-center justify-end">
                  {performer.score.toLocaleString()}
                </div>
                <div className="flex items-center justify-center">
                  {performer.badge && (
                    <div className="group-hover:scale-110 transition-transform duration-300">
                      <BadgeIcon type={performer.badge} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
     
      </div>
    </section>
  );
}
