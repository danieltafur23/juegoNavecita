document.addEventListener('DOMContentLoaded', function(){
    const cuadroTablero = document.querySelectorAll(".tablero div");
    const resultadoAliens = document.querySelectorAll(".conteo");
    let cuadros = 15;
    let posicionNave = 202;
    let posicionAliens = 0;
    let aliensMuertos = [];
    let resultado = 0;
    let direccion = 1;
    let alienID;
 
    //Posicion inicial de los aliens en el tablero 
    let aliens = [
        0,1,2,3,4,5,6,7,8,9,
        15,16,17,18,19,20,21,22,23,24,
        30,31,32,33,34,35,36,37,38,39
    ]

    //colocar los aliens en el tablero
    aliens.forEach(alien => cuadroTablero[posicionAliens + alien].classList.add("aliens"));
    
    //Colocar la nave en posicion inicial
    cuadroTablero[posicionNave].classList.add("nave");

})