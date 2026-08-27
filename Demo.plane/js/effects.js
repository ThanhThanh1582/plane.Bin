/**
 * effects.js - Canvas Particle System & Animations
 * Đảm bảo chỉ khởi tạo 1 lần và hỗ trợ triệt để Giảm hiệu ứng chuyển động (Reduced Motion)
 */

class KidEffectsManager {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.animationFrame = null;
        this.isRunning = false;
        this.reducedMotion = false;
        this.initialized = false;
        this.boundResize = this.resize.bind(this);
    }

    init() {
        if (this.initialized) return;
        this.canvas = document.getElementById('effects-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', this.boundResize);
        this.initialized = true;
    }

    resize() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    // 1. Pháo hoa chúc mừng chiến thắng (Level 8 - rút ngắn 3s, nhẹ nhàng)
    startCelebrationFireworks(durationMs = 3000) {
        if (this.reducedMotion) {
            // Chế độ giảm chuyển động: Chỉ bung một vài ngôi sao nhẹ ở tâm
            this.burstStarsAt(window.innerWidth / 2, window.innerHeight / 2);
            return;
        }

        this.init();
        if (!this.canvas || !this.ctx) return;

        this.particles = [];
        this.isRunning = true;

        const colors = [
            '#FF5252', '#FF4081', '#E040FB', '#7C4DFF', 
            '#536DFE', '#40C4FF', '#18FFFF', '#64FFDA', 
            '#69F0AE', '#B2FF59', '#EEFF41', '#FFFF00', 
            '#FFD740', '#FFAB40', '#FF6E40'
        ];

        let fireworkTimer = setInterval(() => {
            if (!this.isRunning) {
                clearInterval(fireworkTimer);
                return;
            }
            const x = Math.random() * this.canvas.width * 0.8 + this.canvas.width * 0.1;
            const y = Math.random() * this.canvas.height * 0.45 + this.canvas.height * 0.1;
            this.createFireworkBurst(x, y, colors);
            if (window.audioMgr) window.audioMgr.playTing();
        }, 400);

        for (let i = 0; i < 40; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: -Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 3,
                vy: Math.random() * 3 + 2,
                size: Math.random() * 9 + 6,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                vRot: (Math.random() - 0.5) * 10,
                shape: Math.random() > 0.4 ? 'rect' : 'star',
                alpha: 1
            });
        }

        this.loop();

        setTimeout(() => {
            clearInterval(fireworkTimer);
            setTimeout(() => { this.stop(); }, 1200);
        }, durationMs);
    }

    createFireworkBurst(x, y, colors) {
        const count = 30;
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 / count) * i + (Math.random() * 0.2);
            const speed = Math.random() * 5 + 2;
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: Math.random() * 6 + 3,
                color: colors[Math.floor(Math.random() * colors.length)],
                alpha: 1,
                decay: Math.random() * 0.025 + 0.02,
                gravity: 0.09,
                shape: 'circle'
            });
        }
    }

    // 2. Chùm sao sáng tức thì tại vị trí chạm / kéo thả đúng
    burstStarsAt(x, y) {
        this.init();
        if (!this.canvas || !this.ctx) return;

        const starColors = ['#FFD700', '#FFA500', '#FF69B4', '#00E5FF', '#76FF03'];
        const count = this.reducedMotion ? 6 : 16;

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 4 + 1.8;
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 1.2,
                size: Math.random() * 7 + 5,
                color: starColors[Math.floor(Math.random() * starColors.length)],
                alpha: 1,
                decay: 0.035,
                gravity: 0.1,
                shape: 'star',
                rotation: Math.random() * 360,
                vRot: (Math.random() - 0.5) * 12
            });
        }

        if (!this.isRunning) {
            this.isRunning = true;
            this.loop();
        }
    }

    // 3. Trái tim bay lên (Level 7)
    spawnFloatingHeartsAt(x, y) {
        this.init();
        if (!this.canvas || !this.ctx) return;

        const count = this.reducedMotion ? 4 : 10;
        for (let i = 0; i < count; i++) {
            const angle = (Math.random() - 0.5) * 1.5;
            this.particles.push({
                x: x + (Math.random() - 0.5) * 35,
                y: y + (Math.random() - 0.5) * 15,
                vx: Math.sin(angle) * 1.8,
                vy: -Math.random() * 3 - 1.8,
                size: Math.random() * 12 + 16,
                alpha: 1,
                decay: 0.022,
                shape: 'heart'
            });
        }

        if (!this.isRunning) {
            this.isRunning = true;
            this.loop();
        }
    }

    // 4. Nốt nhạc bay quanh tai khi uống nước (Level 5)
    spawnMusicNotesAt(x, y) {
        this.init();
        if (!this.canvas || !this.ctx) return;

        const noteSymbols = ['🎵', '🎶', '✨', '⭐'];
        const count = this.reducedMotion ? 3 : 8;
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: x + (Math.random() - 0.5) * 50,
                y: y + (Math.random() - 0.5) * 30,
                vx: (Math.random() - 0.5) * 2.5,
                vy: -Math.random() * 2.5 - 1.8,
                size: Math.random() * 8 + 18,
                symbol: noteSymbols[Math.floor(Math.random() * noteSymbols.length)],
                alpha: 1,
                decay: 0.025,
                shape: 'text'
            });
        }

        if (!this.isRunning) {
            this.isRunning = true;
            this.loop();
        }
    }

    loop() {
        if (!this.isRunning) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            if (p.gravity) p.vy += p.gravity;
            if (p.decay) p.alpha -= p.decay;
            if (p.vRot) p.rotation += p.vRot;

            if (p.alpha <= 0 || p.y > this.canvas.height + 25) {
                this.particles.splice(i, 1);
                continue;
            }

            this.ctx.save();
            this.ctx.globalAlpha = Math.max(0, p.alpha);

            if (p.shape === 'star') {
                this.ctx.fillStyle = p.color;
                this.drawStar(p.x, p.y, 5, p.size, p.size / 2, (p.rotation || 0) * Math.PI / 180);
            } else if (p.shape === 'rect') {
                this.ctx.fillStyle = p.color;
                this.ctx.translate(p.x, p.y);
                this.ctx.rotate((p.rotation || 0) * Math.PI / 180);
                this.ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
            } else if (p.shape === 'heart') {
                this.ctx.font = `${p.size}px sans-serif`;
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText('❤️', p.x, p.y);
            } else if (p.shape === 'text') {
                this.ctx.font = `${p.size}px sans-serif`;
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText(p.symbol, p.x, p.y);
            } else {
                this.ctx.fillStyle = p.color;
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
                this.ctx.fill();
            }

            this.ctx.restore();
        }

        if (this.particles.length > 0) {
            this.animationFrame = requestAnimationFrame(() => this.loop());
        } else {
            this.isRunning = false;
        }
    }

    drawStar(cx, cy, spikes, outerRadius, innerRadius, angleOffset = 0) {
        let rot = Math.PI / 2 * 3 + angleOffset;
        let x = cx;
        let y = cy;
        const step = Math.PI / spikes;

        this.ctx.beginPath();
        this.ctx.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            this.ctx.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            this.ctx.lineTo(x, y);
            rot += step;
        }
        this.ctx.lineTo(cx, cy - outerRadius);
        this.ctx.closePath();
        this.ctx.fill();
    }

    stop() {
        this.isRunning = false;
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        if (this.ctx && this.canvas) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        this.particles = [];
    }
}

window.effectsMgr = new KidEffectsManager();
