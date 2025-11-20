// Обработчики событий для кнопок меню
document.getElementById('single').addEventListener('click', function() {
    console.log('Single player clicked');
    handleShimmerEffect(this);
});

document.getElementById('multiplayer').addEventListener('click', function() {
    console.log('Multiplayer clicked');
    handleShimmerEffect(this);
});

document.getElementById('hero_group').addEventListener('click', function (){
    console.log('hero_group cliked')
    handleShimmerEffect(this)
})

document.getElementById('settings').addEventListener('click', function() {
    console.log('Settings clicked');
});

document.getElementById('donation').addEventListener('click', function() {
    console.log('Donation clicked');
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