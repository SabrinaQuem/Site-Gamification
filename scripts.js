document.addEventListener('DOMContentLoaded', () => {
    const backgrounds = document.getElementById('backgrounds');
    const sounds = document.getElementById('sounds');
    const playSoundButton = document.getElementById('play-sound');
    const stopSoundButton = document.getElementById('stop-sound');
    const toggleModeButton = document.getElementById('toggle-mode');
    const pointsDisplay = document.getElementById('points');
    const achievementsList = document.getElementById('achievements-list');
    let currentSound = null;
    let points = 0;
    let achievements = [];

    const backgroundGIFs = {
        bg1: 'url("https://media.giphy.com/media/t7Qb8655Z1VfBGr5XB/giphy.gif")' ,
        bg2: 'url("https://media.giphy.com/media/xWC0BCZtkDxE869erD/giphy.gif")' ,
        bg3: 'url("https://media.giphy.com/media/Vow6Nb4oKkbuvRPKH5/giphy.gif")'
    };

    const soundFiles = {
        sound1: new Audio('https://www.soundjay.com/nature/sounds/rain-01.mp3'),
        sound2: new Audio('https://www.soundjay.com/nature/sounds/rain-02.mp3'),
        sound3: new Audio('https://www.soundjay.com/nature/sounds/rain-03.mp3')
    };

    const updatePoints = (amount) => {
        points += amount;
        pointsDisplay.textContent = points;
        checkAchievements();
    };

    const checkAchievements = () => {
        if (points >= 10 && !achievements.includes('First 10 Points')) {
            achievements.push('First 10 Points');
            const li = document.createElement('li');
            li.textContent = 'First 10 Points';
            achievementsList.appendChild(li);
        }
        // Add more achievements as needed
    };

    backgrounds.addEventListener('change', (e) => {
        document.body.style.backgroundImage = backgroundGIFs[e.target.value];
        updatePoints(1); // Award 1 point for changing background
    });

    playSoundButton.addEventListener('click', () => {
        const selectedSound = sounds.value;
        if (currentSound) {
            currentSound.pause();
        }
        currentSound = soundFiles[selectedSound];
        currentSound.loop = true;
        currentSound.play();
        updatePoints(2); // Award 2 points for playing a sound
    });

    stopSoundButton.addEventListener('click', () => {
        if (currentSound) {
            currentSound.pause();
            currentSound = null;
        }
    });

    toggleModeButton.addEventListener('click', () => {
        document.body.classList.toggle('night-mode');
        updatePoints(1); // Award 1 point for toggling mode
    });
});