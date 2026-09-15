// --- ABRIR A CARTA (animação de envelope) ---
function openLetter() {
    const envelope = document.getElementById('envelope');
    envelope.classList.add('open');

    setTimeout(() => {
        document.getElementById('envelopeScreen').classList.add('hidden');
        document.getElementById('mainContent').classList.add('visible');
    }, 750);
}

// --- CARROSSEL (flexbox + scroll-snap nativo) ---
const track = document.getElementById('carouselTrack');
const cards = document.querySelectorAll('.photo-card');
const dotsWrap = document.getElementById('carouselDots');
let currentIndex = 0;
let autoplayTimer = null;

cards.forEach(() => {
    const dot = document.createElement('span');
    dotsWrap.appendChild(dot);
});
const dots = document.querySelectorAll('.carousel-dots span');

function updateDots(index) {
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
}

function scrollToCard(index) {
    currentIndex = (index + cards.length) % cards.length;
    cards[currentIndex].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    updateDots(currentIndex);
}

function moveSlide(direction) {
    scrollToCard(currentIndex + direction);
}

// detecta qual cartão está centralizado ao rolar (toque/swipe nativo do iPhone)
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            currentIndex = Array.from(cards).indexOf(entry.target);
            updateDots(currentIndex);
        }
    });
}, { root: track, threshold: [0.6] });

cards.forEach(card => cardObserver.observe(card));

updateDots(0);

function startAutoplay() {
    autoplayTimer = setInterval(() => moveSlide(1), 4500);
}
function stopAutoplay() {
    clearInterval(autoplayTimer);
}
startAutoplay();
track.addEventListener('touchstart', stopAutoplay, { passive: true });

// --- CONTAGEM REGRESSIVA (17/09/2026 às 18:30) ---
const targetDate = new Date(2026, 8, 17, 18, 30, 0).getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        document.getElementById("countdown").innerHTML = "<div style='flex: 1 1 100%; color: #e0559a; font-family: \"Baloo 2\", sans-serif; font-weight: 700;'>Chegou o grande dia! Te amo!</div>";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = String(days).padStart(2, '0');
    document.getElementById("hours").innerText = String(hours).padStart(2, '0');
    document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
    document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
}
setInterval(updateCountdown, 1000);
updateCountdown();

// --- MENSAGENS DE AMOR ALEATÓRIAS ---
const messages = [
    "Lembrando de você o dia todo por aqui. Conta os segundos para te ver!",
    "O pão de queijo quentinho e eu estamos te esperando em Minas. Boa viagem!",
    "Você combina comigo (e com Minas também)! Te amo!",
    "Já tô imaginando o abraço apertado quando você descer daí.",
    "Te amo mais do que a minha paixão por eletrônica e café juntos! rs",
    "Boa estrada, meu amor. Vem com cuidado que eu cuido do resto."
];

function showRandomMessage() {
    const randomIndex = Math.floor(Math.random() * messages.length);
    document.getElementById("randomMsgText").innerText = `"${messages[randomIndex]}"`;
}
