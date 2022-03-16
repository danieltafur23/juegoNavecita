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
    let iraDerecha = true;
    let iraIzquierda = true;
 
    //Posicion inicial de los aliens en el tablero 
    let aliens = [
        0,1,2,3,4,5,6,7,8,9,
        15,16,17,18,19,20,21,22,23,24,
        30,31,32,33,34,35,36,37,38,39
    ]

    function ubicarAliens(){
        //aliens.forEach(alien => cuadroTablero[posicionAliens + alien].classList.add("aliens"));
        //colocar los aliens en el tablero
        for (let i = 0; i < aliens.length; i++) {
            if (!aliensMuertos.includes(i)) {
                cuadroTablero[aliens[i]].classList.add("aliens");
            }
            
        }
    }
    
    ubicarAliens();
    
    //Funcion para quitar los aliens
    function quitarAliens(){
        aliens.forEach(alien => cuadroTablero[posicionAliens + alien].classList.remove("aliens"));
    }
    
    
    //Colocar la nave en posicion inicial
    //cuadroTablero[posicionNave].classList.add("nave");
    
    function moverNave(evento){
        cuadroTablero[posicionNave].classList.remove("nave");
        
        switch(evento.key){
            case 'ArrowLeft' :
                if ((posicionNave % cuadros) !== 0 ) {
                    posicionNave -= 1;
                }
                break;
                case 'ArrowRight' : 
                if ((posicionNave % cuadros) < cuadros -1 ) {
                    posicionNave += 1;
                }
                break;
            }
            cuadroTablero[posicionNave].classList.add("nave");
        }
        
    //Activar evento teclado
    document.addEventListener('keydown', moverNave);
    
    function moverAliens(){
        //Limite tablero izquierdo
        const limiteIzquierda = (aliens[0] % cuadros) === 0;
        const limiteDerecha = (aliens[aliens.length -1] % cuadros) === cuadros-1;
        console.log(limiteDerecha)
        quitarAliens();
        //mover cuadros a la izquierda
        if (limiteDerecha && iraDerecha) {
            for (let i = 0; i < aliens.length; i++) {
                aliens[i]+= cuadros+1;
                direccion = -1;
                iraDerecha = false;
            }
        }
        if (limiteIzquierda && !iraDerecha) {
            for (let i = 0; i < aliens.length; i++) {
                aliens[i]+= cuadros-1;
                direccion = 1;
                iraDerecha = true;
            }
        }
        
        for (let i = 0; i < aliens.length; i++) {
            aliens[i] += direccion;
        }
        ubicarAliens();
        
        //Si gana
        
        //tERMINAR jUEGO
        if (cuadroTablero[posicionNave].classList.contains("aliens")) {
            alert("Si tosiste, perdiste");
            location.reload();
        }
        
        if (aliensMuertos.length === 30) {
            alert("Ganaste");
            location.reload();
        }
        

    }
moverAliens();
alienID = setInterval(moverAliens, 500)

function disparar(evento){
    let balaID;
    let posicionBala = posicionNave;

    //Mover la bala
    function moverBala(){
        cuadroTablero[posicionBala].classList.remove("balas");
        posicionBala -= cuadros;
        cuadroTablero[posicionBala].classList.add("balas");   
        
        //Matar aliens
        if (cuadroTablero[posicionBala].classList.contains("aliens")) {
            cuadroTablero[posicionBala].classList.remove("aliens");
            cuadroTablero[posicionBala].classList.remove("balas");
            cuadroTablero[posicionBala].classList.add("explosion");
            clearInterval(balaID);

            const aliensEliminados = aliens.indexOf(posicionBala);
            aliensMuertos.push(aliensEliminados);
            resultado++;
            resultadoAliens.textContent = resultado;
            console.log(aliensMuertos);

            //explosion
            setTimeout(()=> cuadroTablero[posicionBala].classList.remove("explosion"), 500
            )

        }
    }
    switch (evento.key) {
        case "ArrowUp": balaID = setInterval(moverBala, 100);         
            break;
    }
}
document.addEventListener("keydown", disparar)

});
