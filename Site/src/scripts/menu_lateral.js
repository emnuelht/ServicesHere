const menu = document.querySelector('.menu');
const slat = document.querySelector('.slat');
const container_menu_lateral = document.querySelector('.container_menu_lateral');

let clickMenu = false;
menu.addEventListener('click', () => {
    if (!clickMenu) {
        container_menu_lateral.style.left = '0';
        container_menu_lateral.style.opacity = 1;
        slat.style.opacity = 1;
        slat.style.display = 'block';
        clickMenu = true;

        slat.addEventListener('click', () => {
            container_menu_lateral.style.left = '-100%';
            container_menu_lateral.style.opacity = 0;
            slat.style.opacity = 0;
            slat.style.display = 'none';
            clickMenu = false;
        });
    } else {
        container_menu_lateral.style.left = '-100%';
        container_menu_lateral.style.opacity = 0;
        slat.style.opacity = 0;
        slat.style.display = 'none';
        clickMenu = false;
    }
});

window.addEventListener('resize', () => {
    if (window.matchMedia("(max-width: 500px)").matches) {
        container_menu_lateral.style.opacity = 1;
    }
})

if (window.matchMedia("(max-width: 500px)").matches) {
    if (!document.querySelector('.menu')) {
        document.querySelector('.img').innerHTML = 'ServicesHere';
    }
} else {
    container_menu_lateral.style.opacity = 1;
}
