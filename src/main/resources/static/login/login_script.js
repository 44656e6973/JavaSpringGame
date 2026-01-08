if (window.location.protocol !== 'https:') {
    console.warn('Соединение не защищено! Используйте HTTPS');
}

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const statusMessage = document.getElementById('statusMessage');

    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();

            const username = document.getElementById('username').value;
           const password = document.getElementById('password').value;


           const formData = new URLSearchParams();
           formData.append('username', username);
           formData.append('password', password);

        try {
        const response = await fetch('/perform_login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: formData.toString()
                });

                // 3. Проверяем, куда нас перенаправил Spring
                if (response.redirected) {
                    window.location.href = response.url; // Переходим на /home, если всё ок
                } else if (response.ok) {
                    window.location.href = '/home';
                } else {
                    statusMessage.textContent = 'Неверный логин или пароль';
                    statusMessage.className = 'block';
                }} catch (error) {
                         console.error('Error:', error);
                         statusMessage.textContent = 'Ошибка соединения с сервером';
                     }

    });

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