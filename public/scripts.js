// ═══════════════════════════════════════════════════════════
// scripts.js — Portafolio Iván Negrete (Versión actualizada)
// ═══════════════════════════════════════════════════════════

// ────────────────────────────────────────────────────────────
// 1. SWIPER (Modal de Skills)
// ────────────────────────────────────────────────────────────
let mySwiper;

function initSwiper() {
  mySwiper = new Swiper('.swiper-container', {
    loop: true,
    speed: 800,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 0,
      stretch: 80,
      depth: 200,
      modifier: 1,
      slideShadows: false,
    },
  });
}

window.openSkillsModal = function () {
  const modal = document.getElementById('skillsModal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');

  // Destruir instancia anterior si existe, para reinicializar limpio
  if (mySwiper) {
    mySwiper.destroy(true, true);
    mySwiper = null;
  }

  // Esperar a que el modal sea visible en el DOM antes de inicializar
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      initSwiper();
    });
  });
};

window.closeSkillsModal = function () {
  const modal = document.getElementById('skillsModal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
};

// ────────────────────────────────────────────────────────────
// 2. RELOJ EN TIEMPO REAL
// ────────────────────────────────────────────────────────────
function actualizarHora() {
  const ahora = new Date();
  const horas = String(ahora.getHours()).padStart(2, '0');
  const minutos = String(ahora.getMinutes()).padStart(2, '0');
  const reloj = document.getElementById('reloj');
  if (reloj) reloj.textContent = `${horas}:${minutos}`;
}
actualizarHora();
setInterval(actualizarHora, 1000);

// ────────────────────────────────────────────────────────────
// 3. SPOTIFY PLAYER + MODO LETRAS
// ────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('player');
  const icon = document.getElementById('playIcon');
  const albumWrap = document.getElementById('albumWrap');
  const albumText = document.getElementById('albumText');
  const lyricsPanel = document.getElementById('lyricsPanel');
  const spotifyContainer = document.getElementById('spotify-container');
  const lyric1 = document.getElementById('lyric1');
  const lyric2 = document.getElementById('lyric2');
  const lyric3 = document.getElementById('lyric3');

  if (!audio || !icon || !albumWrap || !lyricsPanel) return;

  let isLyricsModeOpen = false;
  let fadeTimeouts = [];
  let currentLyricIndex = 0;
  const lyrics = [lyric1, lyric2, lyric3];

  function showLyric(index) {
    lyrics.forEach((lyric) => {
      lyric.classList.add('hidden');
      lyric.style.opacity = '0';
    });
    const current = lyrics[index];
    current.classList.remove('hidden');
    setTimeout(() => {
      current.style.opacity = '1';
    }, 50);
  }

  function openLyricsMode() {
    if (isLyricsModeOpen) return;
    isLyricsModeOpen = true;
    currentLyricIndex = 0;
    requestAnimationFrame(() => {
      albumWrap.style.transform = 'translateY(-3rem)';
      albumWrap.style.opacity = '0';
      albumText.style.opacity = '0';
      lyricsPanel.style.transform = 'translateY(-6rem)';
      spotifyContainer.style.backgroundColor = '#8b5cf6';
      spotifyContainer.style.boxShadow = '0 0 30px #a78bfa';
    });
    fadeTimeouts.push(setTimeout(() => showLyric(0), 400));
  }

  function closeLyricsMode() {
    if (!isLyricsModeOpen) return;
    isLyricsModeOpen = false;
    currentLyricIndex = 0;
    fadeTimeouts.forEach((t) => clearTimeout(t));
    fadeTimeouts = [];
    requestAnimationFrame(() => {
      albumWrap.style.transform = '';
      albumWrap.style.opacity = '1';
      albumText.style.opacity = '1';
      lyricsPanel.style.transform = '';
      spotifyContainer.style.backgroundColor = '';
      spotifyContainer.style.boxShadow = '';
      lyrics.forEach((lyric) => {
        lyric.classList.add('hidden');
        lyric.style.opacity = '0';
      });
    });
  }

  function nextLyric() {
    if (!isLyricsModeOpen) return;
    lyrics[currentLyricIndex].style.opacity = '0';
    setTimeout(() => {
      currentLyricIndex = (currentLyricIndex + 1) % lyrics.length;
      showLyric(currentLyricIndex);
    }, 400);
  }

  function prevLyric() {
    if (!isLyricsModeOpen) return;
    lyrics[currentLyricIndex].style.opacity = '0';
    setTimeout(() => {
      currentLyricIndex = (currentLyricIndex - 1 + lyrics.length) % lyrics.length;
      showLyric(currentLyricIndex);
    }, 400);
  }

  audio.addEventListener('ended', () => {
    icon.classList.remove('fa-pause');
    icon.classList.add('fa-play');
    closeLyricsMode();
    audio.currentTime = 0;
  });

  window.togglePlay = function () {
    if (audio.paused) {
      audio.play()
        .then(() => {
          icon.classList.remove('fa-play');
          icon.classList.add('fa-pause');
          openLyricsMode();
        })
        .catch((err) => console.error('No se pudo reproducir:', err));
    } else {
      audio.pause();
      icon.classList.remove('fa-pause');
      icon.classList.add('fa-play');
      closeLyricsMode();
    }
  };

  window.nextLyric = nextLyric;
  window.prevLyric = prevLyric;
});

// ────────────────────────────────────────────────────────────
// 4. LIKE LINKEDIN
// ────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const likeButton = document.getElementById('like-button');
  const likeCountElement = document.getElementById('like-count');
  const overlayImage = document.getElementById('overlay-like-image');

  if (!likeButton || !likeCountElement || !overlayImage) return;

  likeButton.addEventListener('click', () => {
    overlayImage.classList.remove('like-animation');
    void overlayImage.offsetWidth; // reflow para reiniciar animación
    overlayImage.classList.add('like-animation');
    likeCountElement.textContent = (Number(likeCountElement.textContent) + 1).toString();
  });
});

// ────────────────────────────────────────────────────────────
// 5. LIKE TWITTER/X (Mapfre)
// ────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const likeButtonTw = document.getElementById('buttonLiketwitter');
  const likeCountTw = document.getElementById('LikeTwitter');
  const overlayLove = document.getElementById('overlay-love-image');

  if (!likeButtonTw || !likeCountTw || !overlayLove) return;

  likeButtonTw.addEventListener('click', () => {
    overlayLove.classList.remove('like-animation');
    void overlayLove.offsetWidth; // reflow
    overlayLove.classList.add('like-animation');
    likeCountTw.textContent = (Number(likeCountTw.textContent) + 1).toString();
  });
});

// ────────────────────────────────────────────────────────────
// 6. EASTER EGG EDAD
// ────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const edadElement = document.getElementById('edad');
  if (!edadElement) return;

  edadElement.addEventListener('mouseover', function () {
    let currentAge = parseInt(edadElement.innerText);
    const initialAge = currentAge;
    let speed = 120;
    let interval;
    let alreadyDone = false;

    function decreaseAge() {
      if (currentAge > 0) {
        edadElement.innerText = currentAge.toString();
        currentAge--;
        speed = Math.max(10, speed - 4);
        interval = setTimeout(decreaseAge, speed);
      } else {
        edadElement.innerText = '0';
        if (!alreadyDone) {
          alreadyDone = true;
          alert('Easter egg 🥚🥚🐰🐰');
        }
      }
    }

    decreaseAge();

    edadElement.addEventListener('mouseout', function onMouseOut() {
      clearTimeout(interval);
      edadElement.innerText = initialAge.toString();
      edadElement.removeEventListener('mouseout', onMouseOut);
    });
  });
});

const inicio = new Date(2025, 7, 1); // Agosto 2025 (mes 7 = agosto)
const hoy = new Date();
const meses = (hoy.getFullYear() - inicio.getFullYear()) * 12 + (hoy.getMonth() - inicio.getMonth());
document.getElementById('meses-empresa').textContent = `${meses} months`;