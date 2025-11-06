import { useDrag, useDrop } from 'react-dnd';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Heart, Droplet, Swords } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface Hero {
  id: string;
  name: string;
  class: string;
  hp: number;
  maxHp: number;
  mana: number;
  maxMana: number;
  avatar: string;
  initiative: number;
  position: number;
}

interface HeroCardProps {
  hero: Hero;
  onMove: (draggedId: string, targetPosition: number) => void;
}

const ItemType = 'HERO';

export function HeroCard({ hero, onMove }: HeroCardProps) {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id: hero.id, position: hero.position },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: ItemType,
    drop: (item: { id: string; position: number }) => {
      if (item.id !== hero.id) {
        onMove(item.id, hero.position);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const hpPercentage = (hero.hp / hero.maxHp) * 100;
  const manaPercentage = (hero.mana / hero.maxMana) * 100;

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`transition-all duration-200 ${
        isDragging ? 'opacity-50 scale-95' : 'opacity-100'
      } ${isOver ? 'scale-105' : ''}`}
    >
      <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-2 border-amber-900/50 hover:border-amber-700/70 transition-all cursor-move overflow-hidden">
        <div className="relative">
          {/* Hero Image */}
          <div className="relative h-48 overflow-hidden">
            <ImageWithFallback
              src={hero.avatar}
              alt={hero.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
            
            {/* Position Badge */}
            <div className="absolute top-2 left-2">
              <Badge className="bg-amber-900/90 text-amber-100 border-amber-700">
                Поз. {hero.position + 1}
              </Badge>
            </div>

            {/* Class Badge */}
            <div className="absolute top-2 right-2">
              <Badge className="bg-red-900/90 text-red-100 border-red-700">
                <Swords className="w-3 h-3 mr-1" />
                {hero.class}
              </Badge>
            </div>
          </div>

          {/* Hero Info */}
          <div className="p-4 space-y-3">
            <h3 className="text-amber-100 text-center tracking-wide">{hero.name}</h3>

            {/* HP Bar */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-red-300">
                <div className="flex items-center gap-1">
                  <Heart className="w-3 h-3 fill-red-500 text-red-500" />
                  <span>HP</span>
                </div>
                <span>
                  {hero.hp} / {hero.maxHp}
                </span>
              </div>
              <Progress
                value={hpPercentage}
                className="h-2 bg-red-950"
              />
            </div>

            {/* Mana Bar */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-blue-300">
                <div className="flex items-center gap-1">
                  <Droplet className="w-3 h-3 fill-blue-500 text-blue-500" />
                  <span>Мана</span>
                </div>
                <span>
                  {hero.mana} / {hero.maxMana}
                </span>
              </div>
              <Progress
                value={manaPercentage}
                className="h-2 bg-blue-950"
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
