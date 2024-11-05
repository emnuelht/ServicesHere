const pagAtual = document.querySelector('.li__home');
pagAtual.style.color = '#00a3ff';

document.querySelector('.li__download').addEventListener('click', () => {
    window.location.href = './src/pages/download.html';
});

document.querySelectorAll('li').forEach((item, index) => {
    if (index !== 1 && item.className !== 'li__download') {
        item.addEventListener('click', () => {
            alert('Em breve!');
        });
    }
});