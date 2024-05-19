document.addEventListener('DOMContentLoaded', () => {
    const backgrounds = document.getElementById('backgrounds');
    const soundButtons = document.querySelectorAll('.sound-button');
    const toggleModeButton = document.getElementById('toggle-mode');
    const pointsDisplay = document.getElementById('points');
    const achievementsList = document.getElementById('achievements-list');
    let points = 0;
    let achievements = [];
    const activeSounds = {};

    const backgroundGIFs = {
        bg1: 'url("https://media.giphy.com/media/t7Qb8655Z1VfBGr5XB/giphy.gif")' ,
        bg2: 'url("https://media.giphy.com/media/xWC0BCZtkDxE869erD/giphy.gif")' ,
        bg3: 'url("https://media.giphy.com/media/Vow6Nb4oKkbuvRPKH5/giphy.gif")'
    };

    const soundFiles = {
        sound1: new Audio('https://www.soundjay.com/nature/sounds/rain-03.mp3'),
        sound2: new Audio('https://www.soundjay.com/nature/sounds/ocean-waves-1.mp3'),
        sound3: new Audio('night sound.wav')
    };

    // Function to update points
    const updatePoints = (amount) => {
        points += amount;
        pointsDisplay.textContent = points;
        checkAchievements();
    };

    // Function to check achievements
    const checkAchievements = () => {
        if (points >= 10 && !achievements.includes('First 10 Points')) {
            achievements.push('First 10 Points');
            const li = document.createElement('li');
            li.textContent = 'First 10 Points';
            achievementsList.appendChild(li);
        }
        // Add more achievements as needed
    };

    // Change background image
    backgrounds.addEventListener('change', (e) => {
        document.querySelector('.header').style.backgroundImage = backgroundGIFs[e.target.value];
        updatePoints(1); // Award 1 point for changing background
    });

    // Handle sound button clicks
    soundButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedSound = button.id;
            if (activeSounds[selectedSound]) {
                activeSounds[selectedSound].pause();
                button.classList.remove('active');
                delete activeSounds[selectedSound];
            } else {
                const sound = soundFiles[selectedSound];
                sound.loop = true;
                sound.play();
                activeSounds[selectedSound] = sound;
                button.classList.add('active');
                updatePoints(2); // Award 2 points for playing a sound
            }
        });
    });

    // Toggle night/light mode
    toggleModeButton.addEventListener('click', () => {
        document.body.classList.toggle('night-mode');
        updatePoints(1); // Award 1 point for toggling mode
    });
});

