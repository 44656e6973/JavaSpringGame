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

        const data = {
            username: username,
            password: password
        }

        if (!username || !password) {
            statusMessage.textContent = 'Пожалуйста, заполните все поля';
            statusMessage.className = 'status-message error';
            return;
        }

        try {

        const response = await fetch(
        'http://localhost:8080/api/auth',
        {
        method:'POST',
        headers:{
        'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
        }
        )
        console.log(response)

//        Если нужно сделать шифрование
//            const keyPair = await window.crypto.subtle.generateKey(
//                {
//                    name: "RSA-OAEP",
//                    modulusLength: 4096,
//                    publicExponent: new Uint8Array([1, 0, 1]),
//                    hash: "SHA-256",
//                },
//                true,
//                ["encrypt", "decrypt"]
//            );
//
//            const encoder = new TextEncoder();
//            const encodedPassword = encoder.encode(password);
//            const encryptedData = await window.crypto.subtle.encrypt(
//                {
//                    name: "RSA-OAEP"
//                },
//                keyPair.publicKey,
//                encodedPassword
//            );
//            const encryptedBase64 = btoa(
//                String.fromCharCode.apply(null, new Uint8Array(encryptedData))
//            );

            statusMessage.textContent = 'Успешный вход в систему!';
            statusMessage.className = 'status-message success';

            setTimeout(() => {
                loginForm.reset();
                statusMessage.style.display = 'none';
            }, 3000);

        } catch (error) {
            statusMessage.textContent = 'Ошибка при обработке данных';
            statusMessage.className = 'status-message error';
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