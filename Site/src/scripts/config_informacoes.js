const clickSobre = document.querySelector('.container_menu_lateral__list_menu li:nth-child(2)');
let click = true;

clickSobre.addEventListener('click', () => {
    const seta = clickSobre.querySelector('svg');
    const containerListaOculta = document.querySelector('.container_lists_ocultas');
    const listaOculta = document.querySelector('.list_menu__list_sobre');
     if (click) {
         seta.style.transform = 'rotate(90deg)';
         clickSobre.style.color = '#00a3ff';
         seta.style.fill = '#00a3ff';

         listaOculta.style.display = 'block';
         setTimeout(() => {
             containerListaOculta.style.height = '230px'
             listaOculta.style.transform = 'translateY(0)';
         }, 10);

         click = false;
     } else {
         clickSobre.style.color = '#000';
         seta.style.fill = '#000';
         seta.style.transform = 'rotate(0deg)';

         listaOculta.style.transform = 'translateY(-100%)';
         setTimeout(() => {
             containerListaOculta.style.height = '0';
             setTimeout(() => listaOculta.style.display = 'none', 100);
         }, 200);

         click = true;
     }
});