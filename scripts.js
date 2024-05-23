document.addEventListener('DOMContentLoaded', () => {
    const backgroundsSelect = document.getElementById('backgrounds');
    const soundButtons = document.querySelectorAll('.sound-button');
    const toggleModeButton = document.getElementById('toggle-mode');
    const pointsDisplay = document.getElementById('points');
    const achievementsList = document.getElementById('achievements-list');
    const musicButtonsContainer = document.querySelector('.music-buttons');

    const backgrounds = [
        { id: 'bg1', url: 'url("https://media.giphy.com/media/t7Qb8655Z1VfBGr5XB/giphy.gif")', unlocked: true },
        { id: 'bg2', url: 'url("https://media.giphy.com/media/xWC0BCZtkDxE869erD/giphy.gif")', unlocked: false, unlockPoints: 10 },
        { id: 'bg3', url: 'url("https://media.giphy.com/media/Vow6Nb4oKkbuvRPKH5/giphy.gif")', unlocked: false, unlockPoints: 20 }
    ];

    const sounds = [
        { id: 'sound1', file: new Audio('https://www.soundjay.com/nature/sounds/rain-03.mp3'), unlocked: true },
        { id: 'sound2', file: new Audio('https://www.soundjay.com/nature/sounds/ocean-waves-1.mp3'), unlocked: true },
        { id: 'sound3', file: new Audio('night sound.wav'), unlocked: false, unlockPoints: 10 },
        { id: 'sound4', file: new Audio('https://www.soundjay.com/nature/sounds/wind-howl-01.mp3'), unlocked: false, unlockPoints: 10 },
        { id: 'sound5', file: new Audio('https://www.soundjay.com/nature/sounds/river-2.mp3'), unlocked: false, unlockPoints: 20 },
        { id: 'sound6', file: new Audio('campfire.m4a'), unlocked: false, unlockPoints: 20 },
        { id: 'sound7', file: new Audio('birds.wav'), unlocked: false, unlockPoints: 25 }
    ];

    const music = [
        { id: 'music1', file: new Audio('music1.mp3'), unlocked: true },
        { id: 'music2', file: new Audio('music2.wav'), unlocked: true },
        // Add more music tracks as needed
    ];

    let points = 0;
    let achievements = [];
    const activeSounds = {};

    // Function to update points
    const updatePoints = (amount) => {
        points += amount;
        pointsDisplay.textContent = points;
        checkAchievements();
        checkUnlocks();
    };

    // Function to check achievements
    const checkAchievements = () => {
        if (points >= 10 && !achievements.includes('First 10 Points')) {
            achievements.push('First 10 Points');
            const li = document.createElement('li');
            li.textContent = 'First 10 Points! You unlocked more sounds and personalizations!';
            achievementsList.appendChild(li);
        }
        // Add more achievements as needed
        if (points >= 15 && !achievements.includes('15 Points')) {
            achievements.push('15 Points');
            const li = document.createElement('li');
            li.textContent = '15 points! More and more!';
            achievementsList.appendChild(li);
        }

        if (points >= 20 && !achievements.includes('20 Points')) {
            achievements.push('20 Points');
            const li = document.createElement('li');
            li.textContent = '20 points already? You are getting somewhere...';
            achievementsList.appendChild(li);
        }

        if (points >= 25 && !achievements.includes('25 Points')) {
            achievements.push('25 Points');
            const li = document.createElement('li');
            li.textContent = 'You could not be more relaxed! 25 points! You earned this musics!';
            achievementsList.appendChild(li);
        }
    };

    // Function to check and unlock assets
    const checkUnlocks = () => {
        let allSoundsUnlocked = true;

        backgrounds.forEach(bg => {
            if (!bg.unlocked && points >= bg.unlockPoints) {
                bg.unlocked = true;
                const option = document.querySelector(`#backgrounds option[value="${bg.id}"]`);
                option.disabled = false;
            }
        });

        sounds.forEach(sound => {
            if (!sound.unlocked && points >= sound.unlockPoints) {
                sound.unlocked = true;
                const button = document.getElementById(sound.id);
                button.disabled = false;
            }
            if (!sound.unlocked) {
                allSoundsUnlocked = false;
            }
        });

        if (allSoundsUnlocked) {
            musicButtonsContainer.style.display = 'block';
        }
    };

    // Initialize backgrounds select options
    backgrounds.forEach(bg => {
        const option = document.createElement('option');
        option.value = bg.id;
        option.textContent = bg.id.replace('bg', 'Relaxing ');
        option.disabled = !bg.unlocked;
        backgroundsSelect.appendChild(option);
    });

    // Initialize sound buttons
    soundButtons.forEach(button => {
        const sound = sounds.find(s => s.id === button.id);
        button.disabled = !sound.unlocked;
    });

    // Change background image
    backgroundsSelect.addEventListener('change', (e) => {
        const selectedBackground = backgrounds.find(bg => bg.id === e.target.value);
        if (selectedBackground.unlocked) {
            document.querySelector('.header').style.backgroundImage = selectedBackground.url;
            updatePoints(1); // Award 1 point for changing background
        }
    });

    // Handle sound button clicks
    soundButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedSound = sounds.find(s => s.id === button.id);
            if (selectedSound.unlocked) {
                if (activeSounds[selectedSound.id]) {
                    activeSounds[selectedSound.id].pause();
                    button.classList.remove('active');
                    delete activeSounds[selectedSound.id];
                } else {
                    selectedSound.file.loop = true;
                    selectedSound.file.play();
                    activeSounds[selectedSound.id] = selectedSound.file;
                    button.classList.add('active');
                    updatePoints(2); // Award 2 points for playing a sound
                }
            } else {
                // Add red glow animation to locked button
                button.classList.add('locked');
                setTimeout(() => button.classList.remove('locked'), 500);
            }
        });
    });

    // Handle music button clicks
    document.querySelectorAll('.music-button').forEach(button => {
        const selectedMusic = music.find(m => m.id === button.id);
        button.addEventListener('click', () => {
            if (activeSounds[selectedMusic.id]) {
                activeSounds[selectedMusic.id].pause();
                button.classList.remove('active');
                delete activeSounds[selectedMusic.id];
            } else {
                selectedMusic.file.loop = true;
                selectedMusic.file.play();
                activeSounds[selectedMusic.id] = selectedMusic.file;
                button.classList.add('active');
                updatePoints(2); // Award 2 points for playing a music track
            }
        });
    });

    // Toggle night/light mode
    toggleModeButton.addEventListener('click', () => {
        document.body.classList.toggle('night-mode');
        updatePoints(1); // Award 1 point for toggling mode
    });

    // Update mode images visibility on initial load
    document.body.classList.add('light-mode');
});



