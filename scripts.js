document.addEventListener('DOMContentLoaded', () => {
    const backgroundsSelect = document.getElementById('backgrounds');
    const soundButtons = document.querySelectorAll('.sound-button');
    const toggleModeButton = document.getElementById('toggle-mode');
    const toggleModeImage = document.getElementById('toggle-mode-image');
    const pointsDisplay = document.getElementById('points');
    const achievementsList = document.getElementById('achievements-list');
    const musicButtonsContainer = document.querySelector('.music-buttons');

    const POINTS_FOR_BACKGROUND_CHANGE = 1;
    const POINTS_FOR_SOUND_PLAY = 2;
    const POINTS_FOR_MODE_TOGGLE = 1;

    const backgrounds = [
        { id: 'bg1', url: 'url("https://media.giphy.com/media/t7Qb8655Z1VfBGr5XB/giphy.gif")', unlocked: true },
        { id: 'bg2', url: 'url("https://media.giphy.com/media/xWC0BCZtkDxE869erD/giphy.gif")', unlocked: false, unlockPoints: 10 },
        { id: 'bg3', url: 'url("https://media.giphy.com/media/Vow6Nb4oKkbuvRPKH5/giphy.gif")', unlocked: false, unlockPoints: 20 }
    ];

    const sounds = [
        { id: 'sound1', file: new Audio('https://www.soundjay.com/nature/sounds/rain-03.mp3'), unlocked: true },
        { id: 'sound2', file: new Audio('https://www.soundjay.com/nature/sounds/ocean-waves-1.mp3'), unlocked: true },
        { id: 'sound3', file: new Audio('night sound.wav'), unlocked: false, unlockPoints: 5 },
        { id: 'sound4', file: new Audio('https://www.soundjay.com/nature/sounds/wind-howl-01.mp3'), unlocked: false, unlockPoints: 10 },
        { id: 'sound5', file: new Audio('https://www.soundjay.com/nature/sounds/river-2.mp3'), unlocked: false, unlockPoints: 20 },
        { id: 'sound6', file: new Audio('campfire.m4a'), unlocked: false, unlockPoints: 20 },
        { id: 'sound7', file: new Audio('birds.wav'), unlocked: false, unlockPoints: 25 }
    ];

    const music = [
        { id: 'music1', file: new Audio('music1.mp3'), unlocked: true },
        { id: 'music2', file: new Audio('music2.wav'), unlocked: true },
    ];

    let points = 0;
    let achievements = [];
    const activeSounds = {};

    const updatePoints = (amount) => {
        points += amount;
        pointsDisplay.textContent = points;
        checkAchievements();
        checkUnlocks();
    };

    const checkAchievements = () => {
        const achievementData = [
            { points: 5, message: 'Cute 5 little points, you got a new little sound' },
            { points: 10, message: 'First 10 Points! You unlocked more sounds and personalizations!' },
            { points: 15, message: '15 points! More and more!' },
            { points: 20, message: '20 points already? You are getting somewhere...' },
            { points: 25, message: 'You could not be more relaxed! 25 points! You earned this musics!' }
        ];

        achievementData.forEach(achievement => {
            if (points >= achievement.points && !achievements.includes(achievement.message)) {
                achievements.push(achievement.message);
                const li = document.createElement('li');
                li.textContent = achievement.message;
                achievementsList.appendChild(li);
            }
        });
    };

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

    backgrounds.forEach(bg => {
        const option = document.createElement('option');
        option.value = bg.id;
        option.textContent = bg.id.replace('bg', 'Relaxing ');
        option.disabled = !bg.unlocked;
        backgroundsSelect.appendChild(option);
    });

    soundButtons.forEach(button => {
        const sound = sounds.find(s => s.id === button.id);
        button.disabled = !sound.unlocked;
    });

    backgroundsSelect.addEventListener('change', (e) => {
        const selectedBackground = backgrounds.find(bg => bg.id === e.target.value);
        if (selectedBackground.unlocked) {
            document.querySelector('.header').style.backgroundImage = selectedBackground.url;
            updatePoints(POINTS_FOR_BACKGROUND_CHANGE);
        }
    });

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
                updatePoints(POINTS_FOR_SOUND_PLAY);
            }
        } else {
            button.classList.add('locked');
            setTimeout(() => button.classList.remove('locked'), 500);
        }
    });
});


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
                updatePoints(POINTS_FOR_SOUND_PLAY);
            }
        });
    });

    toggleModeButton.addEventListener('click', () => {
        document.body.classList.toggle('night-mode');
        if (document.body.classList.contains('night-mode')) {
            toggleModeImage.src = 'https://i.postimg.cc/6QyTynzr/bulb-on.png';
        } else {
            toggleModeImage.src = 'https://i.postimg.cc/KjK1wL3c/bulb-off.png';
        }
        updatePoints(POINTS_FOR_MODE_TOGGLE);
    });

    document.body.classList.add('light-mode');
});

