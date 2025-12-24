if (window.location.protocol !== 'https:') {
    console.warn('Соединение не защищено! Используйте HTTPS');
}

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

    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Базовая валидация
        if (!username || !password) {
            statusMessage.textContent = 'Пожалуйста, заполните все поля';
            statusMessage.className = 'status-message error';
            return;
        }

        try {
            // 1. Генерируем ключевую пару RSA
            const keyPair = await window.crypto.subtle.generateKey(
                {
                    name: "RSA-OAEP",
                    modulusLength: 4096,
                    publicExponent: new Uint8Array([1, 0, 1]),
                    hash: "SHA-256",
                },
                true,
                ["encrypt", "decrypt"]
            );

            // 2. Кодируем пароль
            const encoder = new TextEncoder();
            const encodedPassword = encoder.encode(password);

            // 3. Шифруем пароль с использованием публичного ключа
            const encryptedData = await window.crypto.subtle.encrypt(
                {
                    name: "RSA-OAEP"
                },
                keyPair.publicKey, // Используем публичный ключ для шифрования
                encodedPassword
            );

            // 4. Конвертируем зашифрованные данные в Base64 для отправки
            const encryptedBase64 = btoa(
                String.fromCharCode.apply(null, new Uint8Array(encryptedData))
            );

            console.log('Зашифрованный пароль (Base64):', encryptedBase64);
            console.log('Публичный ключ:', keyPair.publicKey);

            // В реальном приложении здесь отправка данных на сервер
            // Отправляем: username, encryptedBase64 и возможно публичный ключ

            statusMessage.textContent = 'Успешный вход в систему!';
            statusMessage.className = 'status-message success';

            // Очистка формы через 3 секунды
            setTimeout(() => {
                loginForm.reset();
                statusMessage.style.display = 'none';
            }, 3000);

        } catch (error) {
            console.error('Ошибка при шифровании:', error);
            statusMessage.textContent = 'Ошибка при обработке данных';
            statusMessage.className = 'status-message error';
        }
    });

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

    const usernameField = document.getElementById('username');
    usernameField.addEventListener('focus', function() {
        this.placeholder = '';
    });
    usernameField.addEventListener('blur', function() {
        if (!this.value) {
            this.placeholder = 'example@mail.com';
        }
    });

    document.querySelector('.forgot-password').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Переход на страницу восстановления пароля');
    });
});