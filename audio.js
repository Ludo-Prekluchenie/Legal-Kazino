// audio.js - Управление музыкой на сайте

class AudioManager {
    constructor() {
        this.audio = null;
        this.isPlaying = false;
        this.volume = 0.4;
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;
        
        // Проверяем, есть ли сохраненное состояние в localStorage
        const savedTime = localStorage.getItem('music_time');
        const savedState = localStorage.getItem('music_state');
        
        this.audio = new Audio('voice.m4a');
        this.audio.loop = true;
        this.audio.volume = this.volume;
        
        // Восстанавливаем время
        if (savedTime) {
            this.audio.currentTime = parseFloat(savedTime);
        }
        
        // Восстанавливаем состояние
        if (savedState === 'playing') {
            this.play();
        }
        
        // Сохраняем время каждые 2 секунды
        setInterval(() => {
            if (this.audio && !this.audio.paused) {
                localStorage.setItem('music_time', this.audio.currentTime);
                localStorage.setItem('music_state', 'playing');
            }
        }, 2000);
        
        this.initialized = true;
        
        // Автозапуск при первом взаимодействии с пользователем
        document.addEventListener('click', () => {
            if (!this.isPlaying && localStorage.getItem('music_state') === 'playing') {
                this.play();
            }
        }, { once: false });
    }

    play() {
        if (!this.audio) return;
        
        // Пытаемся играть, даже если не было взаимодействия
        const playPromise = this.audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                this.isPlaying = true;
                localStorage.setItem('music_state', 'playing');
            }).catch(() => {
                // Если браузер блокирует автозапуск, ничего не делаем
                console.log('Автозапуск заблокирован браузером');
            });
        }
    }

    pause() {
        if (!this.audio) return;
        this.audio.pause();
        this.isPlaying = false;
        localStorage.setItem('music_state', 'paused');
    }

    stop() {
        if (!this.audio) return;
        this.audio.pause();
        this.audio.currentTime = 0;
        this.isPlaying = false;
        localStorage.removeItem('music_time');
        localStorage.removeItem('music_state');
    }

    setVolume(vol) {
        this.volume = Math.max(0, Math.min(1, vol));
        if (this.audio) {
            this.audio.volume = this.volume;
        }
    }
}

// Создаем глобальный экземпляр
const music = new AudioManager();

// Инициализируем сразу
music.init();
