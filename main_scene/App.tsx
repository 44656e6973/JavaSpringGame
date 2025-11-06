import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { HeroCard, Hero } from './components/HeroCard';
import { EnemyCard, Enemy } from './components/EnemyCard';
import { TurnOrder } from './components/TurnOrder';
import { Button } from './components/ui/button';
// import { Swords, SkipForward, Skull } from 'lucide-react';

const initialHeroes: Hero[] = [
  {
    id: '1',
    name: 'Сэр Годрик',
    class: 'Рыцарь',
    hp: 120,
    maxHp: 150,
    mana: 30,
    maxMana: 50,
    avatar: 'https://images.unsplash.com/photo-1668261200406-7f7d12cca0fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpZXZhbCUyMHdhcnJpb3IlMjBrbmlnaHR8ZW58MXx8fHwxNzYxMzg2MzAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    initiative: 15,
    position: 0,
  },
  {
    id: '2',
    name: 'Мерлина',
    class: 'Волшебница',
    hp: 60,
    maxHp: 80,
    mana: 95,
    maxMana: 120,
    avatar: 'https://images.unsplash.com/photo-1760574772950-f37de9dce85c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXphcmQlMjBtYWdlJTIwZmFudGFzeXxlbnwxfHx8fDE3NjEzODYzMDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    initiative: 22,
    position: 1,
  },
  {
    id: '3',
    name: 'Тень',
    class: 'Разбойник',
    hp: 70,
    maxHp: 90,
    mana: 40,
    maxMana: 60,
    avatar: 'https://images.unsplash.com/photo-1606105821505-0b33dc2b5233?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2d1ZSUyMGFzc2Fzc2luJTIwZGFya3xlbnwxfHx8fDE3NjEzODYzMDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    initiative: 28,
    position: 2,
  },
  {
    id: '4',
    name: 'Брат Каспиан',
    class: 'Жрец',
    hp: 85,
    maxHp: 100,
    mana: 75,
    maxMana: 100,
    avatar: 'https://images.unsplash.com/photo-1649105703438-0992d6844823?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVyaWMlMjBwcmllc3QlMjBmYW50YXN5fGVufDF8fHx8MTc2MTM4NjMwMnww&ixlib=rb-4.1.0&q=80&w=1080',
    initiative: 18,
    position: 3,
  },
];

const initialEnemies: Enemy[] = [
  {
    id: 'e1',
    name: 'Теневой зверь',
    type: 'Чудовище',
    hp: 140,
    maxHp: 180,
    armor: 15,
    avatar: 'https://images.unsplash.com/photo-1667144841840-e3b90ba27233?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25zdGVyJTIwY3JlYXR1cmUlMjBkYXJrfGVufDF8fHx8MTc2MTM4NzU2M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    initiative: 20,
    position: 0,
  },
  {
    id: 'e2',
    name: 'Костяной маг',
    type: 'Нежить',
    hp: 90,
    maxHp: 120,
    armor: 8,
    avatar: 'https://images.unsplash.com/photo-1565009106478-ce1b026717ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW1vbiUyMHNrdWxsJTIwZXZpbHxlbnwxfHx8fDE3NjEzODc1NjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    initiative: 25,
    position: 1,
  },
  {
    id: 'e3',
    name: 'Драконид',
    type: 'Дракон',
    hp: 200,
    maxHp: 250,
    armor: 25,
    avatar: 'https://images.unsplash.com/photo-1745130839558-55b2f78f1739?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmFnb24lMjBiZWFzdCUyMGZhbnRhc3l8ZW58MXx8fHwxNzYxMzg3NTY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    initiative: 12,
    position: 2,
  },
  {
    id: 'e4',
    name: 'Скелет-воин',
    type: 'Нежить',
    hp: 65,
    maxHp: 100,
    armor: 12,
    avatar: 'https://images.unsplash.com/photo-1662558275233-e83a908c2068?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2VsZXRvbiUyMHVuZGVhZCUyMGRhcmt8ZW58MXx8fHwxNzYxMzg3NTY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    initiative: 16,
    position: 3,
  },
];

export default function App() {
  const [heroes, setHeroes] = useState<Hero[]>(initialHeroes);
  const [enemies, setEnemies] = useState<Enemy[]>(initialEnemies);
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);

  const handleMoveHero = (draggedId: string, targetPosition: number) => {
    setHeroes((prevHeroes) => {
      const draggedHero = prevHeroes.find((h) => h.id === draggedId);
      const targetHero = prevHeroes.find((h) => h.position === targetPosition);

      if (!draggedHero || !targetHero) return prevHeroes;

      return prevHeroes.map((hero) => {
        if (hero.id === draggedId) {
          return { ...hero, position: targetPosition };
        }
        if (hero.id === targetHero.id) {
          return { ...hero, position: draggedHero.position };
        }
        return hero;
      });
    });
  };

  const nextTurn = () => {
    setCurrentTurnIndex((prev) => prev + 1);
  };

  const sortedHeroesByPosition = [...heroes].sort((a, b) => a.position - b.position);
  const sortedEnemiesByPosition = [...enemies].sort((a, b) => a.position - b.position);

  // Combine all characters for turn order
  const allCharacters = [...heroes, ...enemies].map(char => ({
    ...char,
    avatar: char.avatar,
    name: char.name,
    class: 'class' in char ? char.class : char.type,
    initiative: char.initiative,
  })) as Hero[];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-neutral-900 to-zinc-950 p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-3">
              <Swords className="w-8 h-8 text-amber-600" />
              <h1 className="text-amber-100 tracking-wider">Подземелье Тьмы</h1>
              <Swords className="w-8 h-8 text-amber-600" />
            </div>
            <p className="text-zinc-500 text-sm tracking-wide">
              Перетаскивайте карточки героев для изменения позиций в команде
            </p>
          </div>

          {/* Turn Order */}
          <TurnOrder heroes={allCharacters} currentTurnIndex={currentTurnIndex} />

          {/* Action Button */}
          <div className="flex justify-center">
            <Button
              onClick={nextTurn}
              className="bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-amber-100 border-2 border-amber-800 shadow-lg shadow-amber-900/50"
            >
              <SkipForward className="w-4 h-4 mr-2" />
              Следующий ход
            </Button>
          </div>

          {/* Battlefield */}
          <div className="space-y-8">
            {/* Enemies Team */}
            <div className="relative">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Skull className="w-5 h-5 text-red-500" />
                <h2 className="text-red-100 tracking-wide">
                  Противники
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {sortedEnemiesByPosition.map((enemy) => (
                  <EnemyCard key={enemy.id} enemy={enemy} />
                ))}
              </div>
            </div>

            {/* Battlefield Separator */}
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-dashed border-red-900/50"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-zinc-950 px-6 py-2 text-red-400 border-2 border-red-900/50 rounded-full text-sm tracking-wider">
                  ⚔️ ПОЛЕ БИТВЫ ⚔️
                </span>
              </div>
            </div>

            {/* Heroes Team */}
            <div className="relative">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Swords className="w-5 h-5 text-amber-500" />
                <h2 className="text-amber-100 tracking-wide">
                  Команда героев
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {sortedHeroesByPosition.map((hero) => (
                  <HeroCard key={hero.id} hero={hero} onMove={handleMoveHero} />
                ))}
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-zinc-900/50 border border-amber-900/30 rounded-lg p-4 text-center">
            <p className="text-zinc-400 text-sm">
              💡 <span className="text-amber-300">Совет:</span> Перетащите карточку героя на другую карточку, чтобы поменять их местами
            </p>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
