// --- ELEMENT SELECTORS ---
const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const excitementContainer = document.getElementById('excitement-container');
const vrTent = document.getElementById('vr-tent'); 
const moon = document.getElementById('moon'); 
const successMessage = document.getElementById('success-message');
const emojiContainer = document.getElementById('emoji-container');

// --- THE SHRINKING MOSQUITO (NO BUTTON) ---
let mosquitoScale = 1; 

const moveAndShrinkMosquito = (e) => {
    // If an event is passed (like a tap or click), prevent it from actually clicking
    if (e) e.preventDefault(); 
    
    // Calculate the safe boundaries of the screen
    const maxX = window.innerWidth - noBtn.clientWidth;
    const maxY = window.innerHeight - noBtn.clientHeight;
    
    // Pick a completely random spot
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    // Shrink down to a minimum of 10%
    if (mosquitoScale > 0.1) {
        mosquitoScale -= 0.1;
    }
    
    // Instantly teleport the button and apply the shrink
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
    noBtn.style.transform = `scale(${mosquitoScale})`;
};

// Catch every possible way a user might try to interact with the button!
noBtn.addEventListener('mouseenter', moveAndShrinkMosquito); 
noBtn.addEventListener('touchstart', moveAndShrinkMosquito, {passive: false}); 
noBtn.addEventListener('click', moveAndShrinkMosquito); 

// NEW: Stop them from using the 'Tab' key on their keyboard to catch it!
noBtn.addEventListener('focus', (e) => {
    moveAndShrinkMosquito(e);
    noBtn.blur(); // Instantly removes keyboard focus
});
// --- THE PULSING TRAIL SIGN (YES BUTTON) ---
const excitementPhrases = [
    "Adventure awaits! ✨", 
    "Let's pack the the bags! 🚙", 
    "Fresh air! 🌲", 
    "S'mores! 🔥",
    "Let's go! 🥾"
];

let yesScale = 1;

const growAndPop = (e) => {
    // Grow slightly
    if (yesScale < 1.1) {
        yesScale += 0.01;
        yesBtn.style.transform = `scale(${yesScale})`;
    }

    // Limit how many popups spawn
    if (Math.random() > 0.15) return; 

    const popUp = document.createElement('div');
    popUp.classList.add('excitement-pop');
    popUp.innerText = excitementPhrases[Math.floor(Math.random() * excitementPhrases.length)];
    
    // Find cursor/finger
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const offsetX = (Math.random() - 0.5) * 60;
    const offsetY = (Math.random() - 0.5) * 60;

    popUp.style.left = `${clientX + offsetX}px`;
    popUp.style.top = `${clientY - 40 + offsetY}px`;
    
    excitementContainer.appendChild(popUp);

    // Clean up
    setTimeout(() => {
        popUp.remove();
    }, 1500);
};

yesBtn.addEventListener('mousemove', growAndPop);
yesBtn.addEventListener('touchmove', growAndPop);
yesBtn.addEventListener('mouseleave', () => {
    yesScale = 1;
    yesBtn.style.transform = `scale(1)`;
});

// --- THE FINAL CELEBRATION ---
const emojis = ['⛰️', '🥾', '🌲', '🎒', '💖'];

yesBtn.addEventListener('click', () => {
    // 1. Hide the 3D tent and Moon completely
    vrTent.classList.add('hidden');
    moon.classList.add('hidden');
    
    // 2. Hide the mosquito just in case it's still buzzing around
    noBtn.classList.add('hidden');
    
    // 3. Show success message and reveal mountain scenery
    successMessage.classList.remove('hidden');
    document.body.classList.add('scenery-active');
    
    // 4. Start the emoji rain
    setInterval(createEmoji, 200);
});

function createEmoji() {
    const emojiEl = document.createElement('div');
    emojiEl.classList.add('emoji');
    
    emojiEl.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    emojiEl.style.left = Math.random() * 100 + 'vw';
    
    const fallDuration = Math.random() * 3 + 2;
    emojiEl.style.animationDuration = fallDuration + 's';
    
    emojiContainer.appendChild(emojiEl);
    
    setTimeout(() => {
        emojiEl.remove();
    }, fallDuration * 1000);
}