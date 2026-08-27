/**
 * audio.js - Pure Web Audio API Procedural Sound Engine
 * KHÔNG sử dụng SpeechSynthesis (Ba Mẹ đọc trực tiếp cho bé)
 * Quản lý SFX Web Audio hoàn toàn offline với độ trễ 0ms
 */

class KidAudioManager {
    constructor() {
        this.ctx = null;
        this.isMuted = false;
        this.volume = 0.85;
        this.engineGain = null;
        this.engineSource = null;
        this.engineDrone = null;
        this.isEngineRunning = false;
        this.initAudioContext();
    }

    initAudioContext() {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
            this.ctx = new AudioCtx();
        }
    }

    ensureContext() {
        if (!this.ctx) {
            this.initAudioContext();
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    // 1. Âm thanh "Ting!" ngọt ngào khi chọn đúng / hoàn thành bước
    playTing() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc1.type = 'sine';
        osc2.type = 'triangle';

        osc1.frequency.setValueAtTime(1318.51, now);
        osc1.frequency.exponentialRampToValueAtTime(1320, now + 0.6);

        osc2.frequency.setValueAtTime(1975.53, now);
        osc2.frequency.exponentialRampToValueAtTime(2000, now + 0.4);

        gain.gain.setValueAtTime(0.32 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(this.ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.75);
        osc2.stop(now + 0.75);
    }

    // 2. Âm thanh "Boing!" nảy lò xo khi chọn đồ chưa phù hợp / nhắc nhở
    playBoing() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(190, now);
        osc.frequency.linearRampToValueAtTime(430, now + 0.1);
        osc.frequency.linearRampToValueAtTime(210, now + 0.22);
        osc.frequency.linearRampToValueAtTime(370, now + 0.34);
        osc.frequency.linearRampToValueAtTime(180, now + 0.48);

        gain.gain.setValueAtTime(0.35 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.52);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.53);
    }

    // 3. Âm thanh "CẠCH!" khóa đai an toàn kim loại (Level 5)
    playClack() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(750, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.07);
        gain.gain.setValueAtTime(0.55 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

        const oscSub = this.ctx.createOscillator();
        const gainSub = this.ctx.createGain();
        oscSub.type = 'sine';
        oscSub.frequency.setValueAtTime(210, now + 0.01);
        oscSub.frequency.exponentialRampToValueAtTime(45, now + 0.16);
        gainSub.gain.setValueAtTime(0.65 * this.volume, now + 0.01);
        gainSub.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        oscSub.connect(gainSub);
        gainSub.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.09);
        oscSub.start(now + 0.01);
        oscSub.stop(now + 0.22);
    }

    // 4. Âm thanh "TÁCH!" nhấc lẫy mở đai an toàn (Level 8)
    playUnbuckle() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(420, now);
        osc.frequency.exponentialRampToValueAtTime(1000, now + 0.08);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.15);

        gain.gain.setValueAtTime(0.4 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.2);
    }

    // 5. Âm thanh "Bíp boong!" cổng an ninh (Level 3)
    playBeepBoop() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        
        const osc1 = this.ctx.createOscillator();
        const gain1 = this.ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(1046.50, now);
        gain1.gain.setValueAtTime(0.3 * this.volume, now);
        gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc1.connect(gain1);
        gain1.connect(this.ctx.destination);
        osc1.start(now);
        osc1.stop(now + 0.16);

        const osc2 = this.ctx.createOscillator();
        const gain2 = this.ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(1567.98, now + 0.18);
        gain2.gain.setValueAtTime(0.35 * this.volume, now + 0.18);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc2.connect(gain2);
        gain2.connect(this.ctx.destination);
        osc2.start(now + 0.18);
        osc2.stop(now + 0.65);
    }

    // 6. Âm thanh "Bling bling!" mây biến hình (Level 6)
    playBling() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const freqs = [784, 988, 1175, 1568, 1976];
        freqs.forEach((f, i) => {
            const t = now + i * 0.08;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(f, t);
            gain.gain.setValueAtTime(0.25 * this.volume, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(t);
            osc.stop(t + 0.45);
        });
    }

    // 7. Âm thanh uống nước "Ực ực" + chuông giảm khó chịu tai (Level 5)
    playDrinkWater() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        
        [0, 0.22].forEach((offset) => {
            const t = now + offset;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(320, t);
            osc.frequency.exponentialRampToValueAtTime(140, t + 0.12);
            gain.gain.setValueAtTime(0.3 * this.volume, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.14);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(t);
            osc.stop(t + 0.15);
        });

        const chimeTime = now + 0.45;
        const oscC = this.ctx.createOscillator();
        const gainC = this.ctx.createGain();
        oscC.type = 'sine';
        oscC.frequency.setValueAtTime(1046.5, chimeTime);
        oscC.frequency.exponentialRampToValueAtTime(1318.5, chimeTime + 0.4);
        gainC.gain.setValueAtTime(0.35 * this.volume, chimeTime);
        gainC.gain.exponentialRampToValueAtTime(0.001, chimeTime + 0.8);
        oscC.connect(gainC);
        gainC.connect(this.ctx.destination);
        oscC.start(chimeTime);
        oscC.stop(chimeTime + 0.85);
    }

    // 8. Âm thanh đóng dấu "Cộp!" kiểm tra vé (Level 3)
    playStamp() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.exponentialRampToValueAtTime(45, now + 0.12);
        gain.gain.setValueAtTime(0.65 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.16);
    }

    // 9. Âm thanh nối vé vào Cổng bay (Level 4)
    playConnect() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const notes = [659.25, 880.00, 1046.50];
        notes.forEach((freq, idx) => {
            const t = now + idx * 0.1;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, t);
            gain.gain.setValueAtTime(0.28 * this.volume, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(t);
            osc.stop(t + 0.4);
        });
    }

    // 10. Động cơ máy bay âm trầm êm ái
    startEngineSound(level = 0.22) {
        if (this.isEngineRunning || this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        try {
            const bufferSize = this.ctx.sampleRate * 2;
            const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const data = buffer.getChannelData(0);
            let lastOut = 0.0;
            for (let i = 0; i < bufferSize; i++) {
                const white = Math.random() * 2 - 1;
                data[i] = (lastOut + (0.02 * white)) / 1.02;
                lastOut = data[i];
                data[i] *= 3.5;
            }

            this.engineSource = this.ctx.createBufferSource();
            this.engineSource.buffer = buffer;
            this.engineSource.loop = true;

            const filter = this.ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 160;
            filter.Q.value = 1.2;

            const droneOsc = this.ctx.createOscillator();
            droneOsc.type = 'sine';
            droneOsc.frequency.value = 85;

            this.engineGain = this.ctx.createGain();
            this.engineGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
            this.engineGain.gain.linearRampToValueAtTime(level * this.volume, this.ctx.currentTime + 1.0);

            this.engineSource.connect(filter);
            filter.connect(this.engineGain);
            droneOsc.connect(this.engineGain);
            this.engineGain.connect(this.ctx.destination);

            this.engineSource.start();
            droneOsc.start();
            this.engineDrone = droneOsc;
            this.isEngineRunning = true;
        } catch (e) {
            console.warn('Engine sound error:', e);
        }
    }

    stopEngineSound() {
        if (!this.isEngineRunning || !this.engineGain) return;
        try {
            const now = this.ctx.currentTime;
            this.engineGain.gain.linearRampToValueAtTime(0.001, now + 0.5);
            setTimeout(() => {
                if (this.engineSource) {
                    try { this.engineSource.stop(); this.engineSource.disconnect(); } catch (err) {}
                }
                if (this.engineDrone) {
                    try { this.engineDrone.stop(); this.engineDrone.disconnect(); } catch (err) {}
                }
                this.isEngineRunning = false;
            }, 550);
        } catch (e) {
            this.isEngineRunning = false;
        }
    }

    // 11. Fanfare chúc mừng chiến thắng
    playFanfare() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
        const times = [0, 0.12, 0.24, 0.38, 0.55];
        const durations = [0.15, 0.15, 0.15, 0.2, 0.9];

        notes.forEach((freq, idx) => {
            const t = now + times[idx];
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, t);

            gain.gain.setValueAtTime(0.35 * this.volume, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + durations[idx]);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(t);
            osc.stop(t + durations[idx] + 0.05);
        });
    }

    // 12. Chạm nút bấm pop
    playPop() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(540, now);
        osc.frequency.exponentialRampToValueAtTime(90, now + 0.08);

        gain.gain.setValueAtTime(0.28 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.09);
    }
}

// Global Audio Manager instance
window.audioMgr = new KidAudioManager();

// Parent Prompt & Dialogue Manager: Hiển thị câu thoại tĩnh trên biển báo phía trên với Avatar nhân vật gốc
class DialogueManager {
    show(speaker, text) {
        const textSpan = document.getElementById('parent-prompt-text');
        const avatarDiv = document.getElementById('parent-prompt-avatar');
        const bubbleCard = document.querySelector('.parent-prompt-signboard');

        if (textSpan) {
            textSpan.textContent = text;
        }

        if (avatarDiv) {
            avatarDiv.className = 'prompt-avatar-sprite';
            if (speaker.includes('Mẹ')) {
                avatarDiv.classList.add('speaker-mom');
            } else if (speaker.includes('Bố')) {
                avatarDiv.classList.add('speaker-dad');
            } else if (speaker.includes('Bin')) {
                avatarDiv.classList.add('speaker-bin');
            } else if (speaker.includes('Tiếp viên')) {
                avatarDiv.classList.add('speaker-attendant');
            } else {
                avatarDiv.classList.add('speaker-mom');
            }
        }

        if (bubbleCard) {
            bubbleCard.classList.remove('pop-in');
            void bubbleCard.offsetWidth;
            bubbleCard.classList.add('pop-in');
        }
    }
}

window.dialogueMgr = new DialogueManager();
