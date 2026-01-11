// Данные для характеристик
const stats = [
    { id: "strength", name: "Сила", value: 0, description: "Влияет на физический урон и ношение тяжелого снаряжения" },
    { id: "agility", name: "Ловкость", value: 0, description: "Влияет на скорость атаки, уклонение и точность" },
    { id: "intelligence", name: "Интеллект", value: 0, description: "Влияет на магический урон и размер маны" },
    { id: "stamina", name: "Выносливость", value: 0, description: "Влияет на здоровье и устойчивость к эффектам" },
    { id: "luck", name: "Удача", value: 0, description: "Влияет на шанс критического удара и выпадение лута" }
];

// Начальное количество очков
let pointsRemaining = 10;
let uploadedAvatars = []; // Массив для загруженных изображений
let defaultAvatars = []; // Стандартные аватары

// Инициализация страницы
document.addEventListener('DOMContentLoaded', function() {
    loadDefaultAvatars();
    initStats();
    setupEventListeners();
});

// Загрузка стандартных аватаров
function loadDefaultAvatars() {
    // Здесь можно добавить стандартные аватары из папки images
    // Для примера, создадим несколько стандартных вариантов
    defaultAvatars = [
        { id: 'default1', url: '../static/images/hero/archers/man/archer_man2.jpg', name: 'Стандартный 1' },
        { id: 'default2', url: '../static/images/hero/archers/man/archer_man3.jpg', name: 'Воин' },
        { id: 'default3', url: '../static/images/hero/archers/man/archer_man4.jpg', name: 'Маг' },
        { id: 'default4', url:'../static/images/hero/archers/man/archer_man5.jpg', name: 'Лучник' }


    ];

    // Показываем стандартные аватары
    displayAvatars(defaultAvatars);
}

// Отображение аватаров
function displayAvatars(avatarList) {
    const avatarGrid = document.getElementById('avatar-options');
    avatarGrid.innerHTML = '';

    // Объединяем стандартные и загруженные аватары
    const allAvatars = [...defaultAvatars, ...uploadedAvatars];

    if (allAvatars.length === 0) {
        avatarGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #8888aa;">Загрузите изображения, чтобы выбрать аватар</p>';
        return;
    }

    allAvatars.forEach((avatar, index) => {
        const avatarElement = document.createElement('img');
        avatarElement.src = avatar.url;
        avatarElement.alt = avatar.name;
        avatarElement.title = avatar.name;
        avatarElement.classList.add('avatar-option');

        // Выделяем первый аватар по умолчанию
        if (index === 0) {
            avatarElement.classList.add('selected');
            document.getElementById('selected-avatar').src = avatar.url;
            document.getElementById('selected-avatar').alt = avatar.name;
        }

        avatarElement.addEventListener('click', () => selectAvatar(avatar.url, avatar.name));
        avatarGrid.appendChild(avatarElement);
    });
}

// Выбор аватара
function selectAvatar(url, name) {
    // Обновляем основной аватар
    document.getElementById('selected-avatar').src = url;
    document.getElementById('selected-avatar').alt = name;

    // Убираем выделение со всех аватаров
    document.querySelectorAll('.avatar-option').forEach(avatar => {
        avatar.classList.remove('selected');
    });

    // Выделяем выбранный аватар
    event.target.classList.add('selected');
}

// Инициализация характеристик
function initStats() {
    const statsContainer = document.getElementById('stats-container');

    stats.forEach(stat => {
        const statElement = document.createElement('div');
        statElement.className = 'stat-item';
        statElement.id = `stat-${stat.id}`;

        statElement.innerHTML = `
            <div>
                <div class="stat-name">${stat.name}</div>
                <div class="stat-description">${stat.description}</div>
            </div>
            <div class="stat-controls">
                <button class="stat-btn minus-btn" data-stat="${stat.id}" disabled>-</button>
                <div class="stat-value" id="value-${stat.id}">${stat.value}</div>
                <button class="stat-btn plus-btn" data-stat="${stat.id}">+</button>
            </div>
        `;

        statsContainer.appendChild(statElement);
    });

    updatePointsDisplay();
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Обработчики для кнопок + и -
    document.querySelectorAll('.plus-btn').forEach(btn => {
        btn.addEventListener('click', increaseStat);
    });

    document.querySelectorAll('.minus-btn').forEach(btn => {
        btn.addEventListener('click', decreaseStat);
    });

    // Кнопка сброса статов
    document.getElementById('reset-stats').addEventListener('click', resetStats);

    // Кнопка сохранения персонажа
    document.getElementById('save-character').addEventListener('click', saveCharacter);

    // Кнопка загрузки изображений
    document.getElementById('upload-btn').addEventListener('click', () => {
        document.getElementById('avatar-upload').click();
    });

    // Обработчик загрузки файлов
    document.getElementById('avatar-upload').addEventListener('change', handleFileUpload);
}

// Обработка загрузки файлов
function handleFileUpload(event) {
    const files = event.target.files;
    if (files.length === 0) return;

    // Ограничиваем количество загружаемых файлов
    const maxFiles = 12 - defaultAvatars.length; // Максимум 12 всего
    const filesToProcess = Math.min(files.length, maxFiles - uploadedAvatars.length);

    for (let i = 0; i < filesToProcess; i++) {
        const file = files[i];

        // Проверяем тип файла
        if (!file.type.match('image.*')) {
            alert(`Файл "${file.name}" не является изображением. Пропускаем.`);
            continue;
        }

        // Проверяем размер файла (максимум 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert(`Файл "${file.name}" слишком большой (максимум 5MB). Пропускаем.`);
            continue;
        }

        const reader = new FileReader();

        reader.onload = function(e) {
            const newAvatar = {
                id: `uploaded_${Date.now()}_${i}`,
                url: e.target.result,
                name: file.name.replace(/\.[^/.]+$/, ""), // Убираем расширение
                source: 'uploaded'
            };

            uploadedAvatars.push(newAvatar);

            // Если это первый загруженный файл, обновляем отображение
            if (uploadedAvatars.length === 1) {
                displayAvatars(defaultAvatars);
            } else {
                // Добавляем новое изображение в сетку
                addAvatarToGrid(newAvatar);
            }
        };

        reader.readAsDataURL(file);
    }

    // Сбрасываем значение input, чтобы можно было загружать те же файлы снова
    event.target.value = '';
}

// Добавление одного аватара в сетку
function addAvatarToGrid(avatar) {
    const avatarGrid = document.getElementById('avatar-options');

    // Проверяем, есть ли сообщение об отсутствии изображений
    const messageElement = avatarGrid.querySelector('p');
    if (messageElement) {
        avatarGrid.innerHTML = '';
    }

    const avatarElement = document.createElement('img');
    avatarElement.src = avatar.url;
    avatarElement.alt = avatar.name;
    avatarElement.title = avatar.name;
    avatarElement.classList.add('avatar-option');

    avatarElement.addEventListener('click', () => selectAvatar(avatar.url, avatar.name));
    avatarGrid.appendChild(avatarElement);
}

// Увеличение характеристики
function increaseStat(event) {
    const statId = event.target.dataset.stat;
    const stat = stats.find(s => s.id === statId);

    if (pointsRemaining > 0) {
        stat.value++;
        pointsRemaining--;
        updateStatDisplay(statId);
        updatePointsDisplay();
        updateButtonsState();
    }
}

// Уменьшение характеристики
function decreaseStat(event) {
    const statId = event.target.dataset.stat;
    const stat = stats.find(s => s.id === statId);

    if (stat.value > 0) {
        stat.value--;
        pointsRemaining++;
        updateStatDisplay(statId);
        updatePointsDisplay();
        updateButtonsState();
    }
}

// Обновление отображения значения характеристики
function updateStatDisplay(statId) {
    const stat = stats.find(s => s.id === statId);
    document.getElementById(`value-${statId}`).textContent = stat.value;
}

// Обновление отображения оставшихся очков
function updatePointsDisplay() {
    document.getElementById('points-remaining').textContent = pointsRemaining;

    // Меняем цвет, если очки на исходе
    const pointsElement = document.getElementById('points-remaining');
    if (pointsRemaining === 0) {
        pointsElement.style.color = '#e94560';
    } else if (pointsRemaining <= 3) {
        pointsElement.style.color = '#f39c12';
    } else {
        pointsElement.style.color = '#f39c12';
    }
}

// Обновление состояния кнопок
function updateButtonsState() {
    stats.forEach(stat => {
        const plusBtn = document.querySelector(`.plus-btn[data-stat="${stat.id}"]`);
        const minusBtn = document.querySelector(`.minus-btn[data-stat="${stat.id}"]`);

        // Отключаем кнопку "+", если нет очков
        plusBtn.disabled = pointsRemaining === 0;

        // Отключаем кнопку "-", если значение характеристики равно 0
        minusBtn.disabled = stat.value === 0;
    });
}

// Сброс всех характеристик
function resetStats() {
    if (confirm("Вы уверены, что хотите сбросить все характеристики? Все распределенные очки будут возвращены.")) {
        stats.forEach(stat => {
            stat.value = 0;
            updateStatDisplay(stat.id);
        });

        pointsRemaining = 10;
        updatePointsDisplay();
        updateButtonsState();
    }
}

// Сохранение персонажа
function saveCharacter() {
    // Получаем выбранный аватар
    const selectedAvatar = document.querySelector('.avatar-option.selected');
    if (!selectedAvatar) {
        alert("Пожалуйста, выберите аватар для персонажа.");
        return;
    }

    const avatarName = selectedAvatar.title || "Без имени";
    const avatarUrl = selectedAvatar.src;

    // Собираем данные о характеристиках
    const characterStats = {};
    stats.forEach(stat => {
        characterStats[stat.name] = stat.value;
    });

    // Проверяем, что все очки распределены (необязательно)
    if (pointsRemaining > 0) {
        if (!confirm(`У вас осталось ${pointsRemaining} нераспределенных очков. Вы уверены, что хотите сохранить персонажа?`)) {
            return;
        }
    }

    // Для локального сохранения используем localStorage
    const characterData = {
        avatar: { name: avatarName, url: avatarUrl },
        stats: characterStats,
        pointsRemaining: pointsRemaining,
        savedAt: new Date().toISOString()
    };

    // Сохраняем в localStorage
    localStorage.setItem('characterData', JSON.stringify(characterData));

    // Сохраняем изображение отдельно, если оно было загружено
    if (avatarUrl.startsWith('data:')) {
        // Это base64 изображение, сохраняем его
        localStorage.setItem('characterAvatar', avatarUrl);
    }

    alert(`Персонаж сохранен!\n\nАватар: ${avatarName}\n\nХарактеристики:\n${stats.map(stat => `${stat.name}: ${stat.value}`).join('\n')}\n\nОсталось очков: ${pointsRemaining}\n\nДанные сохранены в локальном хранилище.`);

    console.log("Данные персонажа:", characterData);
}

// Функция для загрузки сохраненного персонажа (опционально)
function loadSavedCharacter() {
    const savedData = localStorage.getItem('characterData');
    if (savedData) {
        const characterData = JSON.parse(savedData);

        // Восстанавливаем характеристики
        stats.forEach(stat => {
            if (characterData.stats[stat.name] !== undefined) {
                stat.value = characterData.stats[stat.name];
                updateStatDisplay(stat.id);
            }
        });

        // Восстанавливаем очки
        pointsRemaining = characterData.pointsRemaining || 10;
        updatePointsDisplay();
        updateButtonsState();

        // Восстанавливаем аватар
        const savedAvatar = localStorage.getItem('characterAvatar');
        if (savedAvatar) {
            document.getElementById('selected-avatar').src = savedAvatar;
        }

        console.log("Загружен сохраненный персонаж:", characterData);
    }
}

// Добавьте вызов loadSavedCharacter() в init, если хотите автоматически загружать сохраненного персонажа
// document.addEventListener('DOMContentLoaded', function() {
//     loadDefaultAvatars();
//     initStats();
//     setupEventListeners();
//     loadSavedCharacter();
// });