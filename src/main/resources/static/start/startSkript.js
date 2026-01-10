// Обработчики событий для кнопок меню
document.getElementById('single').addEventListener('click', function() {
    handleShimmerEffect(this);
    window.location.href = 'https://localhost:8443/battle';
});

document.getElementById('multiplayer').addEventListener('click', function() {
    console.log('Multiplayer clicked');
    handleShimmerEffect(this);
});

document.getElementById('hero_group').addEventListener('click', function (){
    handleShimmerEffect(this)
    window.location.href = 'https://localhost:8443/herogroup';
})

document.getElementById('settings').addEventListener('click', function() {
    window.location.href = 'https://localhost:8443/settings';
});

document.getElementById('donation').addEventListener('click', function() {
    window.location.href = 'https://localhost:8443/donation';
});

// Добавляем эффект блеска при наведении на основные кнопки
const primaryButtons = document.querySelectorAll('#single, #multiplayer');
primaryButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        handleShimmerEffect(this);
    });
});

function handleShimmerEffect(button) {
    const shimmer = button.querySelector('.shimmer');
    if (!shimmer) return;

    shimmer.classList.add('shimmer-active');
    setTimeout(() => {
        shimmer.classList.remove('shimmer-active');
    }, 700);
}