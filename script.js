const panels = Array.from(document.querySelectorAll('.panel'));
const nextButtons = document.querySelectorAll('[data-target]');
const teddyButton = document.getElementById('teddy');
const bubble = document.getElementById('loveBubble');
let audioContext;

function showPanel(step) {
    panels.forEach((panel) => {
        const isActive = panel.dataset.step === step;
        panel.classList.toggle('active', isActive);
        panel.setAttribute('aria-hidden', String(!isActive));
    });
}

nextButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target');
        showPanel(target);
    });
});

function playChime() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    const now = audioContext.currentTime;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(660, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.35);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.25, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

    osc.connect(gain).connect(audioContext.destination);
    osc.start(now);
    osc.stop(now + 1.05);
}

function toggleLove() {
    const isVisible = bubble.classList.toggle('visible');
    teddyButton.setAttribute('aria-pressed', String(isVisible));
    playChime();
}

teddyButton.addEventListener('click', toggleLove);
teddyButton.addEventListener('keydown', (event) => {
    if (event.code === 'Enter' || event.code === 'Space') {
        event.preventDefault();
        toggleLove();
    }
});
styles.css
Nuevo
