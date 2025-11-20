document.addEventListener('DOMContentLoaded', () => {

    // --- НАСТРОЙКА ---
    const nextTurnBtn = document.querySelector('.next-turn-btn');
    const heroContainer = document.querySelector('.heroes-section .card-container');
    const heroCards = document.querySelectorAll('.heroes-section .card');
    const enemyCards = document.querySelectorAll('.opponents-section .card');

    let activeHeroIndex = 2; // Начинаем с Лучника (индекс 2)
    let isPlayerTurn = true; // Начинает игрок

    // --- ФУНКЦИИ УПРАВЛЕНИЯ ХОДОМ ---

    /**
     * Обновляет подсветку активного героя
     */
    function updateActiveHero() {
        heroCards.forEach(card => card.classList.remove('active'));

        if (activeHeroIndex >= 0 && activeHeroIndex < heroCards.length) {
            heroCards[activeHeroIndex].classList.add('active');
        }
    }

    /**
     * Запускает фазу хода игрока
     */
    function startPlayerPhase() {
        isPlayerTurn = true;
        activeHeroIndex = 0; // Ход переходит к первому герою
        updateActiveHero();

        nextTurnBtn.textContent = "Следующий ход";
        nextTurnBtn.disabled = false;
    }

    /**
     * Запускает автоматическую фазу хода врагов
     */
    function runEnemyPhase() {
        isPlayerTurn = false;
        nextTurnBtn.textContent = "Идет ход врагов...";
        nextTurnBtn.disabled = true;

        // Убираем подсветку у героев
        heroCards.forEach(card => card.classList.remove('active'));

        let enemyIndex = 0;
        const turnDelay = 1000; // 1 секунда на ход врага

        function nextEnemyTurn() {
            // Убираем подсветку с *предыдущего* врага
            if (enemyIndex > 0) {
                enemyCards[enemyIndex - 1].classList.remove('active-enemy');
            }

            // Если все враги походили
            if (enemyIndex === enemyCards.length) {
                // Фаза врагов окончена, начинаем фазу игрока
                startPlayerPhase();
                return;
            }

            // Подсвечиваем *текущего* врага
            enemyCards[enemyIndex].classList.add('active-enemy');

            //
            // (Здесь в будущем будет логика атаки врага)
            //

            console.log(`Ходит ${enemyCards[enemyIndex].querySelector('.card-name').textContent}`);

            enemyIndex++;

            // Ждем 1 секунду и передаем ход следующему врагу
            setTimeout(nextEnemyTurn, turnDelay);
        }

        // Запускаем цикл ходов врагов
        nextEnemyTurn();
    }

    // --- ОБРАБОТЧИК КНОПКИ "Следующий ход" ---
    nextTurnBtn.addEventListener('click', () => {
        // Если сейчас не ход игрока, кнопка не должна работать
        if (!isPlayerTurn) return;

        // Передаем ход следующему герою
        activeHeroIndex++;

        if (activeHeroIndex < heroCards.length) {
            // Если есть еще герои, просто обновляем подсветку
            updateActiveHero();
        } else {
            // Герои закончили, начинается фаза врагов
            runEnemyPhase();
        }
    });

    // --- ИНИЦИАЛИЗАЦИЯ ИГРЫ ---

    // 1. Включаем Drag-and-Drop (SortableJS)
    new Sortable(heroContainer, {
        animation: 150,
        ghostClass: 'dragging',

        // Важно: обновляем индекс, если игрок поменял порядок
        onEnd: function () {
            const allCards = document.querySelectorAll('.heroes-section .card');
            allCards.forEach((card, index) => {
                if (card.classList.contains('active')) {
                    activeHeroIndex = index;
                }
            });
        }
    });

    // 2. Устанавливаем начального активного героя (Лучника)
    updateActiveHero();
});