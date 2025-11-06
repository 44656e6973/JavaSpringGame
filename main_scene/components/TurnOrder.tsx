import { Hero } from './HeroCard';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Crown } from 'lucide-react';

interface TurnOrderProps {
  heroes: Hero[];
  currentTurnIndex: number;
}

export function TurnOrder({ heroes, currentTurnIndex }: TurnOrderProps) {
  // Sort heroes by initiative (descending)
  const sortedHeroes = [...heroes].sort((a, b) => b.initiative - a.initiative);
  const currentHero = sortedHeroes[currentTurnIndex % sortedHeroes.length];

  return (
    <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-2 border-amber-900/50 rounded-lg p-6 shadow-2xl">
      {/* Current Turn */}
      <div className="mb-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Crown className="w-5 h-5 text-amber-500" />
          <h2 className="text-amber-100">Текущий ход</h2>
        </div>
        <div className="inline-flex items-center gap-3 bg-amber-900/30 border border-amber-700/50 rounded-lg px-6 py-3">
          <Avatar className="h-12 w-12 border-2 border-amber-500">
            <AvatarImage src={currentHero.avatar} alt={currentHero.name} />
            <AvatarFallback>{currentHero.name[0]}</AvatarFallback>
          </Avatar>
          <div className="text-left">
            <div className="text-amber-100">{currentHero.name}</div>
            <div className="text-xs text-amber-300">{currentHero.class}</div>
          </div>
        </div>
      </div>

      {/* Turn Order */}
      <div>
        <h3 className="text-zinc-400 text-center mb-4 text-sm tracking-wide">
          Очередь ходов
        </h3>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {sortedHeroes.map((hero, index) => {
            const isCurrent = index === currentTurnIndex % sortedHeroes.length;
            
            return (
              <div
                key={hero.id}
                className={`flex flex-col items-center gap-2 transition-all duration-300 ${
                  isCurrent ? 'scale-110' : 'opacity-60'
                }`}
              >
                <div className="relative">
                  <Avatar
                    className={`h-14 w-14 transition-all ${
                      isCurrent
                        ? 'border-4 border-amber-500 ring-4 ring-amber-500/30'
                        : 'border-2 border-zinc-700'
                    }`}
                  >
                    <AvatarImage src={hero.avatar} alt={hero.name} />
                    <AvatarFallback>{hero.name[0]}</AvatarFallback>
                  </Avatar>
                  {isCurrent && (
                    <div className="absolute -top-1 -right-1">
                      <Crown className="w-4 h-4 text-amber-400 fill-amber-400" />
                    </div>
                  )}
                  <Badge className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-blue-900/90 text-blue-100 border-blue-700 text-xs px-1 py-0">
                    {hero.initiative}
                  </Badge>
                </div>
                <span
                  className={`text-xs max-w-[60px] text-center truncate ${
                    isCurrent ? 'text-amber-200' : 'text-zinc-500'
                  }`}
                >
                  {hero.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
