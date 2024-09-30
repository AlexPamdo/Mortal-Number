document.addEventListener("DOMContentLoaded", function () {
  // Variables del DOM
  const button = document.querySelector("#nuevo-numero"); // Corregido de buttom a button
  const mensaje = document.querySelector("#mensaje");
  const mensajeDealer = document.querySelector('#mensaje-dealer');
  const dealerFace = document.querySelector('#dealer-face');
  const screamer = document.querySelector('#screamer');
  const rango = document.querySelector('#rango');

  // Generamos un número random para el juego
  const numeroRamdon = Math.floor(Math.random() * (100 - 1 + 1)) + 1;

  console.log("Número a buscar:", numeroRamdon);

  // Función para generar el nuevo número del dealer dependiendo sus movimientos
  function dealerNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min; // Genera el número aleatorio
  }

  let min = 1;
  let max = 100;
  let encontrado = false;

  // Movimientos del jugador
  button.addEventListener("click", function () {


    if (encontrado) return; // Salir si ya se encontró el número

    let numeroPlayer = parseInt(
      document.querySelector("#numero-jugador").value
    ); // Convertir a número

    if (numeroPlayer <= max && numeroPlayer >= min) {
      // Comprobamos el número del jugador
      if (numeroPlayer > numeroRamdon) {
        console.log("El número a buscar es menor");
        mensaje.textContent = "El número a buscar es menor";
        max = numeroPlayer - 1;
      } else if (numeroPlayer < numeroRamdon) {
        console.log("El número a buscar es mayor");
        mensaje.textContent = "El número a buscar es mayor";
        min = numeroPlayer + 1;
      } else {
        encontrado = true;
        mensaje.textContent = "Número encontrado, sobreviviste esta vez";
        console.log("Número encontrado, sobreviviste esta vez");
      }

      rango.textContent = min + " - " + max;

      if (encontrado !== true) {
        setTimeout(function () {

          mensaje.textContent = "Tu turno";

          //funcion para determinar la cercania del numero 
          function estaCerca(inputNumber, referenceNumber, tolerance) {
            return Math.abs(inputNumber - referenceNumber) <= tolerance;
         }
          
          let numeroDealer = dealerNumber(min, max); // Número escogido por el dealer
          console.log("Número del dealer:", numeroDealer);

          //Cambiamos la cara del dealer segun la distancia del numero
          if(estaCerca(numeroDealer,numeroRamdon,10)){
            document.querySelector('.dealer-container img').style.animationDuration = '0.5s'
            dealerFace.src = 'assets/img/smiley/4.png';
          }else if(estaCerca(numeroDealer,numeroRamdon,20)){
            document.querySelector('.dealer-container img').style.animationDuration = '0.7s'
            dealerFace.src = 'assets/img/smiley/3.png';
          }else if(estaCerca(numeroDealer,numeroRamdon,40)){
            document.querySelector('.dealer-container img').style.animationDuration = '0.8s'
            dealerFace.src = 'assets/img/smiley/2.png';
          }else{
            document.querySelector('.dealer-container img').style.animationDuration = '1s'
            dealerFace.src = 'assets/img/smiley/1.png';
            
          }

          mensajeDealer.textContent = "El dealer ha escogido el numero " + numeroDealer;

         

          // Información del Movimiento del dealer
          if (numeroDealer > numeroRamdon) {
            console.log("El número a buscar es menor");
            max = numeroDealer - 1;
          } else if (numeroDealer < numeroRamdon) {
            console.log("El número a buscar es mayor");
            min = numeroDealer + 1;
          } else {
            encontrado = true;
            console.log("El Dealer te ha devorado");
            mensaje.textContent = "El Dealer te ha devorado";

            screamer.classList.remove("none")
            screamer.play(); // Reproduce el video
          }

          rango.textContent = min + " - " + max;

        }, 3000);
      }
    } else {
      mensaje.textContent = "Ingrese un numero en el nuevo rango";
    }
  });
});
