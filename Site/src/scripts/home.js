const pagAtual = document.querySelector('.li__home');
if (window.matchMedia("(max-width: 500px)").matches) {
    pagAtual.style.color = '#005180';
    const slat = document.createElement('div');
    slat.setAttribute('class', 'slat');
    document.querySelector('main').appendChild(slat);
} else {
    pagAtual.style.color = '#00a3ff';
}

document.querySelector('.li__download').addEventListener('click', () => {
    window.location.href = './src/pages/download.html';
});

document.querySelectorAll('li').forEach((item, index) => {
    if (index !== 1 && item.className !== 'li__download' && item.className !== 'li__home') {
        item.addEventListener('click', () => {
            alert('Em breve!');
        });
    }
});