document.addEventListener("DOMContentLoaded", () => {
    const likeButton = document.getElementById("like-button");
    const likeCountElement = document.getElementById("like-count");
    const overlayImage = document.getElementById('overlay-like-image');

    likeButton.addEventListener("click", () => {
        // Primero, remueve la clase de animación (si ya existe) para reiniciar la animación
        overlayImage.classList.remove('like-animation');

        // Esto es necesario para forzar una "reflow" y reiniciar la animación
        void overlayImage.offsetWidth;

        // Añade la clase de animación
        overlayImage.classList.add('like-animation');

        // Aumentar el contador de likes (usando tu lógica existente)
        const likeCount = Number(likeCountElement.textContent);
        likeCountElement.textContent = (likeCount + 1).toString();

    });
});


document.addEventListener("DOMContentLoaded", () => {
    const likeButtontw = document.getElementById("buttonLiketwitter");
    const likeCountElement = document.getElementById("LikeTwitter");
    const overlayImage = document.getElementById('overlay-love-image');

    likeButtontw.addEventListener("click", () => {
         // Primero, remueve la clase de animación (si ya existe) para reiniciar la animación
         overlayImage.classList.remove('like-animation');

         // Esto es necesario para forzar una "reflow" y reiniciar la animación
         void overlayImage.offsetWidth;
 
         // Añade la clase de animación
         overlayImage.classList.add('like-animation');

        const likeCount = Number(likeCountElement.textContent);
        likeCountElement.textContent = (likeCount + 1).toString(); // Convertimos el número a string
    });
});

document.getElementById('edad').addEventListener('mouseover', function() {
    let edadElement = this;
    let currentAge = parseInt(edadElement.innerText);
    let initialAge = currentAge;
    let speed = 120; // velocidad inicial
    let interval;

    // Función para bajar la edad
    function decreaseAge() {
        if (currentAge > 0) {
            edadElement.innerText = currentAge.toString(); // Convertir a string
            currentAge--;
            speed = Math.max(10, speed - 4); // Acelera la reducción
            interval = setTimeout(decreaseAge, speed);
        } else {
            edadElement.innerText = "0"; // Convertir a string
            alert("Easter egg 🥚🥚🐰🐰"); // Alerta cuando llega a 0
        }
    }

    // Comienza a disminuir la edad
    decreaseAge();

    // Cuando el mouse se va, restablece la edad al valor inicial
    edadElement.addEventListener('mouseout', function() {
        clearTimeout(interval);
        edadElement.innerText = initialAge.toString(); 
    });
});

