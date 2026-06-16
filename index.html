// audio.js - Управление музыкой на сайте

class AudioManager {
    constructor() {
        this.audio = null;
        this.isPlaying = false;
        this.initialized = false;
        this.ready = false;
    }

    init() {
        if (this.initialized) return;
        
        // Проверяем сохранённое состояние
        const savedTime = localStorage.getItem('music_time');
        const savedState = localStorage.getItem('music_state');
        
        this.audio = new Audio('voice.m4a');
        this.audio.loop = true;
        this.audio.volume = 0.3; // Немного тише, чтобы не оглушать
        
        // Ждём загрузки
        this.audio.addEventListener('canplaythrough', () => {
            this.ready = true;
            console.log('Музыка загружена');
            // Если нужно играть - запускаем
            if (savedState === 'playing') {
                this.play();
            }
        });
        
        // Восстанавливаем время
        if (savedTime) {
            this.audio.currentTime = parseFloat(savedTime);
        }
        
        // Сохраняем время каждые 2 секунды
        setInterval(() => {
            if (this.audio && !this.audio.paused && this.audio.currentTime > 0) {
                localStorage.setItem('music_time', this.audio.currentTime);
                localStorage.setItem('music_state', 'playing');
            }
        }, 2000);
        
        this.initialized = true;
        
        // Автозапуск при первом клике
        document.addEventListener('click', () => {
            if (!this.isPlaying && this.ready) {
                this.play();
            }
        }, { once: false });
    }

    play() {
        if (!this.audio || !this.ready) return;
        
        const playPromise = this.audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                this.isPlaying = true;
                localStorage.setItem('music_state', 'playing');
            }).catch(() => {
                console.log('Автозапуск заблокирован');
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

    // Принудительно включаем (для страницы входа)
    forcePlay() {
        if (this.audio && this.ready) {
            this.play();
        } else {
            // Если ещё не загружено - ждём
            const checkReady = setInterval(() => {
                if (this.ready) {
                    this.play();
                    clearInterval(checkReady);
                }
            }, 100);
        }
    }
}

// Создаём глобальный экземпляр
const music = new AudioManager();

// Инициализируем сразу
music.init();
