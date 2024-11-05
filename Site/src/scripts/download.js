const pagAtual = document.querySelector('.li__download');
if (window.matchMedia("(max-width: 500px)").matches) {
    pagAtual.style.color = '#005180';
} else {
    pagAtual.style.color = '#00a3ff';
}

document.querySelector('.li__home').addEventListener('click', () => {
    window.location.href = '../../index.html';
});

document.querySelectorAll('li').forEach((item, index) => {
    if (index !== 1 && item.className !== 'li__home' && item.className !== 'li__download') {
        item.addEventListener('click', () => {
            alert('Em breve!');
        });
    }
});

document.querySelector('.container_sobre__button_download').addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = '../../../../ServicesHere.apk';
    link.download = 'ServicesHere.apk';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);

});