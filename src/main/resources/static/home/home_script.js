// Простой скрипт для интерактивности

document.addEventListener('DOMContentLoaded', function() {
    // Анимация появления заголовка
    const title = document.querySelector('.title');
    if (title) {
        title.style.opacity = '0';
        title.style.transform = 'translateY(30px)';
        title.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

        setTimeout(() => {
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }, 500);
    }

    // Анимация кнопок при наведении (если нужно)
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Меню (если добавите мобильное меню позже)
    console.log("Сайт ShadowRealm загружен!");

    // Пример: показ уведомления при клике на "Играть"
    const playBtn = document.querySelector('.btn-primary');
    if (playBtn) {
        playBtn.addEventListener('click', function() {
            alert("Добро пожаловать в ShadowRealm! 🎮\nНовый сезон уже доступен.");
        });
    }
});