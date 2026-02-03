document.addEventListener('DOMContentLoaded', function() {
    const bgMusic = document.getElementById('bg-music');
    const ambientMusic = document.getElementById('ambient-music');
    const celestialMusic = document.getElementById('celestial-music');
    const enterBtn = document.getElementById('enter-btn');
    const backBtn = document.getElementById('back-btn');
    const introScreen = document.getElementById('intro');
    const wishScreen = document.getElementById('wish-screen');
    const musicToggle = document.getElementById('music-toggle');
    const ambientToggle = document.getElementById('ambient-toggle');
    const confettiBtn = document.getElementById('confetti-btn');
    const sparkleBtn = document.getElementById('sparkle-btn');
    const releaseBtn = document.getElementById('release-btn');
    const blessingInput = document.getElementById('blessing-input');
    const blessingDisplay = document.getElementById('blessing-display');
    const nameElement = document.getElementById('name');
    
    // Countdown elements
    const countdownDays = document.getElementById('countdown-days');
    const countdownHours = document.getElementById('countdown-hours');
    const countdownMinutes = document.getElementById('countdown-minutes');

    // Set a custom name (change this to the recipient's name)
    const recipientName = "My Beautiful Soul";
    nameElement.textContent = recipientName;
    
    // Update document title with name
    document.title = `For ${recipientName} — The World's Most Precious Birthday Wish`;

    // Initialize music state
    let musicPlaying = false;
    let ambientPlaying = false;
    let celestialPlaying = false;
    
    // Play birthday music automatically (with user interaction)
    document.body.addEventListener('click', initAudio, { once: true });
    
    function initAudio() {
        bgMusic.volume = 0.7;
        ambientMusic.volume = 0.4;
        celestialMusic.volume = 0.3;
        
        // Try to play birthday music
        bgMusic.play().then(() => {
            musicPlaying = true;
            musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        }).catch(e => {
            console.log("Autoplay blocked — user interaction required");
        });
        
        // Play ambient music in background
        ambientMusic.play();
        ambientPlaying = true;
        
        // Play celestial music
        celestialMusic.play();
        celestialPlaying = true;
    }

    // Enter Wish Screen
    enterBtn.addEventListener('click', () => {
        introScreen.classList.remove('active');
        wishScreen.classList.add('active');
        
        // Start the experience with a grand confetti explosion
        setTimeout(() => {
            confetti({
                particleCount: 500,
                spread: 150,
                origin: { y: 0.6 },
                colors: ['#ff9a9e', '#a3d9ff', '#ffcc00', '#b19cd9', '#ffffff']
            });
        }, 500);
        
        createFloatingHearts();
        createFloatingStars();
        createFloatingMusicNotes();
        
        // Auto birthday message
        setTimeout(() => {
            if (blessingDisplay.innerHTML === '') {
                blessingDisplay.innerHTML = `<p><i class="fas fa-quote-left"></i> Happy Birthday, ${recipientName}! May this year be your most magical yet. <i class="fas fa-quote-right"></i></p>`;
                confetti({ particleCount: 150, spread: 100, origin: { y: 0.8 } });
            }
        }, 2000);
    });

    // Back to Intro
    backBtn.addEventListener('click', () => {
        wishScreen.classList.remove('active');
        introScreen.classList.add('active');
    });

    // Music Toggle
    musicToggle.addEventListener('click', () => {
        if (musicPlaying) {
            bgMusic.pause();
            musicToggle.innerHTML = '<i class="fas fa-music-slash"></i>';
        } else {
            bgMusic.play();
            musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        }
        musicPlaying = !musicPlaying;
    });

    // Ambient Toggle
    ambientToggle.addEventListener('click', () => {
        if (ambientPlaying) {
            ambientMusic.pause();
            celestialMusic.pause();
            ambientToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            ambientMusic.play();
            celestialMusic.play();
            ambientToggle.innerHTML = '<i class="fas fa-wind"></i>';
        }
        ambientPlaying = !ambientPlaying;
        celestialPlaying = ambientPlaying;
    });

    // Confetti Button
    confettiBtn.addEventListener('click', () => {
        // Grand birthday confetti
        confetti({
            particleCount: 400,
            spread: 120,
            origin: { y: 0.6 },
            colors: ['#ff9a9e', '#a3d9ff', '#ffcc00', '#b19cd9']
        });
        
        // Additional side bursts
        setTimeout(() => {
            confetti({
                particleCount: 200,
                angle: 60,
                spread: 80,
                origin: { x: 0, y: 0.6 },
                colors: ['#ff9a9e', '#a3d9ff']
            });
            confetti({
                particleCount: 200,
                angle: 120,
                spread: 80,
                origin: { x: 1, y: 0.6 },
                colors: ['#ffcc00', '#b19cd9']
            });
        }, 250);
    });

    // Sparkle Button
    sparkleBtn.addEventListener('click', () => {
        // Create magical sparkle effect
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                confetti({
                    particleCount: 5,
                    spread: 30,
                    origin: { 
                        x: Math.random(),
                        y: Math.random() * 0.5
                    },
                    colors: ['#ffffff'],
                    shapes: ['circle'],
                    scalar: 0.5
                });
            }, i * 30);
        }
        
        // Add floating sparkles to screen
        const sparks = ['✨', '⭐', '🌟', '💫', '⚡'];
        const container = document.querySelector('.floating-stars');
        for (let i = 0; i < 20; i++) {
            const spark = document.createElement('div');
            spark.innerHTML = sparks[Math.floor(Math.random() * sparks.length)];
            spark.style.position = 'fixed';
            spark.style.left = Math.random() * 100 + 'vw';
            spark.style.top = Math.random() * 100 + 'vh';
            spark.style.fontSize = Math.random() * 25 + 15 + 'px';
            spark.style.opacity = Math.random() * 0.7 + 0.3;
            spark.style.zIndex = '9999';
            spark.style.pointerEvents = 'none';
            spark.style.animation = `float ${Math.random() * 3 + 2}s ease-in-out forwards`;
            container.appendChild(spark);
            
            // Remove after animation
            setTimeout(() => spark.remove(), 3000);
        }
    });

    // Release Blessing
    releaseBtn.addEventListener('click', () => {
        const text = blessingInput.value.trim();
        if (text) {
            blessingDisplay.innerHTML = `<p><i class="fas fa-quote-left"></i> ${text} <i class="fas fa-quote-right"></i></p>`;
            blessingInput.value = "";
            
            // Animate the display
            blessingDisplay.style.transform = "scale(0.8)";
            blessingDisplay.style.opacity = "0.5";
            setTimeout(() => {
                blessingDisplay.style.transform = "scale(1)";
                blessingDisplay.style.opacity = "1";
            }, 10);
            
            // Special confetti for blessing release
            confetti({ 
                particleCount: 200, 
                spread: 100, 
                origin: { y: 0.8 },
                colors: ['#a3ffb6', '#a3d9ff', '#ff9a9e']
            });
            
            // Play a magical sound (simulated)
            const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-magic-sparkle-300.mp3');
            audio.volume = 0.3;
            audio.play().catch(e => console.log("Audio play failed"));
            
            // Save to localStorage
            localStorage.setItem('birthdayBlessing', text);
        } else {
            blessingDisplay.innerHTML = `<p><i class="fas fa-heart"></i> Write your blessing first, ${recipientName}...</p>`;
            blessingDisplay.style.animation = "shake 0.5s";
            setTimeout(() => blessingDisplay.style.animation = "", 500);
        }
    });

    // Load saved blessing
    const savedBlessing = localStorage.getItem('birthdayBlessing');
    if (savedBlessing) {
        blessingInput.placeholder = "Edit your previous blessing...";
    }

    // Click anywhere for stardust
    document.addEventListener('click', function(e) {
        if (e.target.tagName !== 'BUTTON' && e.target.id !== 'blessing-input' && e.target.id !== 'music-toggle' && e.target.id !== 'confetti-btn' && e.target.id !== 'sparkle-btn' && e.target.id !== 'ambient-toggle') {
            // Small confetti burst at click location
            confetti({
                particleCount: 15,
                spread: 40,
                origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
                colors: ['#ff9a9e', '#a3d9ff', '#ffcc00', '#b19cd9'],
                scalar: 0.8
            });
            
            // Create a temporary heart at click location
            if (Math.random() > 0.7) {
                const heart = document.createElement('div');
                heart.innerHTML = '💖';
                heart.style.position = 'fixed';
                heart.style.left = e.clientX + 'px';
                heart.style.top = e.clientY + 'px';
                heart.style.fontSize = '24px';
                heart.style.opacity = '0.9';
                heart.style.zIndex = '9999';
                heart.style.pointerEvents = 'none';
                heart.style.transform = 'translate(-50%, -50%)';
                heart.style.animation = 'float 2s ease-in-out forwards';
                document.body.appendChild(heart);
                
                // Remove after animation
                setTimeout(() => heart.remove(), 2000);
            }
        }
    });

    // Floating hearts
    function createFloatingHearts() {
        const container = document.querySelector('.floating-hearts');
        const hearts = ['💖', '💗', '💓', '💞', '💕', '💘'];
        
        for (let i = 0; i < 25; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'absolute';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = Math.random() * 100 + 'vh';
            heart.style.fontSize = Math.random() * 25 + 20 + 'px';
            heart.style.opacity = Math.random() * 0.5 + 0.3;
            heart.style.animation = `float ${Math.random() * 6 + 4}s infinite ease-in-out`;
            heart.style.animationDelay = Math.random() * 2 + 's';
            heart.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
            container.appendChild(heart);
        }
    }

    // Floating stars
    function createFloatingStars() {
        const container = document.querySelector('.floating-stars');
        const stars = ['✦', '✧', '⭐', '🌟', '✨', '💫'];
        
        for (let i = 0; i < 35; i++) {
            const star = document.createElement('div');
            star.innerHTML = stars[Math.floor(Math.random() * stars.length)];
            star.style.position = 'absolute';
            star.style.left = Math.random() * 100 + 'vw';
            star.style.top = Math.random() * 100 + 'vh';
            star.style.fontSize = Math.random() * 20 + 15 + 'px';
            star.style.color = '#fff9c4';
            star.style.opacity = Math.random() * 0.7 + 0.2;
            star.style.animation = `float ${Math.random() * 7 + 5}s infinite ease-in-out, twinkle ${Math.random() * 3 + 2}s infinite`;
            star.style.animationDelay = Math.random() * 3 + 's';
            container.appendChild(star);
        }
    }

    // Floating music notes
    function createFloatingMusicNotes() {
        const container = document.querySelector('.floating-music');
        const notes = ['♪', '♫', '♬', '🎵', '🎶'];
        
        for (let i = 0; i < 15; i++) {
            const note = document.createElement('div');
            note.innerHTML = notes[Math.floor(Math.random() * notes.length)];
            note.style.position = 'absolute';
            note.style.left = Math.random() * 100 + 'vw';
            note.style.top = Math.random() * 100 + 'vh';
            note.style.fontSize = Math.random() * 30 + 20 + 'px';
            note.style.color = '#a3d9ff';
            note.style.opacity = Math.random() * 0.5 + 0.3;
            note.style.animation = `float ${Math.random() * 8 + 6}s infinite ease-in-out`;
            note.style.animationDelay = Math.random() * 4 + 's';
            container.appendChild(note);
        }
    }

    // Countdown timer (counting up since birthday is today)
    function updateCountdown() {
        // Since it's the birthday, we'll count the hours/minutes of celebration
        const now = new Date();
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const diff = now - startOfDay;
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        countdownDays.textContent = '00';
        countdownHours.textContent = hours.toString().padStart(2, '0');
        countdownMinutes.textContent = minutes.toString().padStart(2, '0');
    }
    
    setInterval(updateCountdown, 60000); // Update every minute
    updateCountdown(); // Initial call

    // Auto confetti and effects every 45 seconds
    setInterval(() => {
        if (wishScreen.classList.contains('active')) {
            // Random effect
            const effects = ['confetti', 'sparkles', 'hearts'];
            const effect = effects[Math.floor(Math.random() * effects.length)];
            
            if (effect === 'confetti') {
                confetti({ particleCount: 80, spread: 80, origin: { y: 0.5 } });
            } else if (effect === 'sparkles') {
                // Create some sparkles
                const container = document.querySelector('.floating-stars');
                const spark = document.createElement('div');
                spark.innerHTML = '✨';
                spark.style.position = 'fixed';
                spark.style.left = Math.random() * 100 + 'vw';
                spark.style.top = Math.random() * 100 + 'vh';
                spark.style.fontSize = '30px';
                spark.style.opacity = '0.8';
                spark.style.zIndex = '9999';
                spark.style.animation = `float 3s ease-in-out forwards`;
                container.appendChild(spark);
                setTimeout(() => spark.remove(), 3000);
            }
        }
    }, 45000);

    // Special effect when page is first loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            if (introScreen.classList.contains('active')) {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#ff9a9e', '#a3d9ff'],
                    scalar: 0.8
                });
            }
        }, 1000);
    });

    // Add a typing effect to the name
    function typeName() {
        const name = recipientName;
        let i = 0;
        nameElement.textContent = '';
        
        const typingInterval = setInterval(() => {
            if (i < name.length) {
                nameElement.textContent += name.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 100);
    }
    
    // Start typing effect when entering wish screen
    enterBtn.addEventListener('click', typeName);
    
    // Initialize floating elements on intro screen too
    createFloatingStars();
});
