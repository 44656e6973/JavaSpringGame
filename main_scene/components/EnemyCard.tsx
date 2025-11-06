import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Heart, Shield, Skull } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface Enemy {
  id: string;
  name: string;
  type: string;
  hp: number;
  maxHp: number;
  armor: number;
  avatar: string;
  initiative: number;
  position: number;
}

interface EnemyCardProps {
  enemy: Enemy;
}

export function EnemyCard({ enemy }: EnemyCardProps) {
  const hpPercentage = (enemy.hp / enemy.maxHp) * 100;

  return (
    <Card className="bg-gradient-to-br from-red-950 to-red-900/50 border-2 border-red-800/70 hover:border-red-700 transition-all overflow-hidden shadow-xl shadow-red-950/50">
      <div className="relative">
        {/* Enemy Image */}
        <div className="relative h-48 overflow-hidden">
          <ImageWithFallback
            src={enemy.avatar}
            alt={enemy.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-red-950 via-red-950/60 to-transparent" />
          
          {/* Position Badge */}
          <div className="absolute top-2 left-2">
            <Badge className="bg-red-900/90 text-red-100 border-red-700">
              Поз. {enemy.position + 1}
            </Badge>
          </div>

          {/* Type Badge */}
          <div className="absolute top-2 right-2">
            <Badge className="bg-orange-900/90 text-orange-100 border-orange-700">
              <Skull className="w-3 h-3 mr-1" />
              {enemy.type}
            </Badge>
          </div>

          {/* Danger Indicator */}
          <div className="absolute bottom-2 right-2">
            <div className="bg-red-600/80 rounded-full p-2 backdrop-blur-sm">
              <Skull className="w-4 h-4 text-red-100" />
            </div>
          </div>
        </div>

        {/* Enemy Info */}
        <div className="p-4 space-y-3">
          <h3 className="text-red-100 text-center tracking-wide">{enemy.name}</h3>

          {/* HP Bar */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-red-200">
              <div className="flex items-center gap-1">
                <Heart className="w-3 h-3 fill-red-400 text-red-400" />
                <span>HP</span>
              </div>
              <span>
                {enemy.hp} / {enemy.maxHp}
              </span>
            </div>
            <Progress
              value={hpPercentage}
              className="h-2 bg-red-950"
            />
          </div>

          {/* Armor */}
          <div className="flex items-center justify-between text-xs text-orange-200 bg-red-900/30 rounded px-2 py-1.5">
            <div className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-orange-400" />
              <span>Броня</span>
            </div>
            <span className="text-orange-100">{enemy.armor}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
