const clickSobre = document.querySelector('.container_menu_lateral__list_menu li:nth-child(2)');
let click = true;

clickSobre.addEventListener('click', () => {
    const seta = clickSobre.querySelector('svg');
    const containerListaOculta = document.querySelector('.container_lists_ocultas');
    const listaOculta = document.querySelector('.list_menu__list_sobre');
     if (click) {
         if (window.matchMedia("(max-width: 500px)").matches) {
             clickSobre.style.color = '#005180';
             seta.style.fill = '#005180';
         } else {
             clickSobre.style.color = '#00a3ff';
             seta.style.fill = '#00a3ff';
         }
         seta.style.transform = 'rotate(90deg)';

         listaOculta.style.display = 'block';
         setTimeout(() => {
             containerListaOculta.style.height = '200px'
             listaOculta.style.transform = 'translateY(0)';
         }, 10);

         click = false;
     } else {
         if (window.matchMedia("(max-width: 500px)").matches) {
             clickSobre.style.color = '#fff';
             seta.style.fill = '#fff';
         } else {
             clickSobre.style.color = '#000';
             seta.style.fill = '#000';
         }
         seta.style.transform = 'rotate(0deg)';

         listaOculta.style.transform = 'translateY(-100%)';
         setTimeout(() => {
             containerListaOculta.style.height = '0';
             setTimeout(() => listaOculta.style.display = 'none', 100);
         }, 200);

         click = true;
     }
});