const button = document.querySelector('.toHomeBTN');

if(button){
    button.addEventListener('click', function(){
        window.history.go(-1)
    })}