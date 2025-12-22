if (window.location.protocol !== 'https:') {
    console.warn('Соединение не защищено! Используйте HTTPS');

}

else{
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const statusMessage = document.getElementById('statusMessage');

    // Вывод текущей даты в консоль
    console.log('Current date:', new Date().toLocaleString('ru-RU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }));


    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Базовая валидация
        if (!username || !password) {
            statusMessage.textContent = 'Пожалуйста, заполните все поля';
            statusMessage.className = 'status-message error';
            return;
        }

        // В реальном приложении здесь отправка данных на сервер
        statusMessage.textContent = 'Успешный вход в систему!';
        statusMessage.className = 'status-message success';

        // Очистка формы через 3 секунды
        setTimeout(() => {
            loginForm.reset();
            statusMessage.style.display = 'none';
        }, 3000);



    // Добавляем визуальную обратную связь для поля пароля
    const passwordField = document.getElementById('password');
    passwordField.addEventListener('focus', function() {
        this.placeholder = '';
    });
    passwordField.addEventListener('blur', function() {
        if (!this.value) {
            this.placeholder = '••••••••';
        }
    });

    // Добавляем визуальную обратную связь для поля email
    const usernameField = document.getElementById('username');
    usernameField.addEventListener('focus', function() {
        this.placeholder = '';
    });
    usernameField.addEventListener('blur', function() {
        if (!this.value) {
            this.placeholder = 'example@mail.com';
        }
    });

    // Обработка клика на "Забыли пароль?"
    document.querySelector('.forgot-password').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Переход на страницу восстановления пароля');
    });
});
}
