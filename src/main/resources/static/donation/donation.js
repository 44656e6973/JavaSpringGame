const button = document.querySelector('.toHomeBTN');

if(button){
    button.addEventListener('click', function(){
        window.location.href = 'https://localhost:8443/home';
    })}