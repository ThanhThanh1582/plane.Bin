/**
 * character-renderer.js
 * 100% JPG ONLY - Sử dụng trực tiếp hệ thống ảnh JPG từ Artifacts (Visual Golden Sample)
 */

class BinCharacterRenderer {
    constructor() {
        this.currentOutfit = {
            shirt: false,
            pants: false,
            shoes: false,
            seatbelt: null
        };

        const ART_DIR = 'assets/images/';

        this.scenes = {
            base: ART_DIR + 'act1_bedroom_initial_bin_1787803669361.jpg',
            shirtOnly: ART_DIR + 'act1_bedroom_shirt_bin_1787803700813.jpg',
            shirtPants: ART_DIR + 'act1_bedroom_full_bin_1787803632562.jpg',
            fullOutfit: ART_DIR + 'act1_bedroom_full_bin_1787803632562.jpg'
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.mountAll());
        } else {
            this.mountAll();
        }
    }

    mountAll() {
        this.updateScene();
    }

    getCurrentImageSrc() {
        if (this.currentOutfit.shirt && this.currentOutfit.pants && this.currentOutfit.shoes) {
            return this.scenes.fullOutfit;
        } else if (this.currentOutfit.shirt && this.currentOutfit.pants) {
            return this.scenes.shirtPants;
        } else if (this.currentOutfit.shirt) {
            return this.scenes.shirtOnly;
        } else if (this.currentOutfit.pants) {
            return this.scenes.shirtPants;
        } else if (this.currentOutfit.shoes) {
            return this.scenes.fullOutfit;
        }
        return this.scenes.base;
    }

    updateScene() {
        const sceneImg = document.getElementById('act1-room-scene-img');
        if (sceneImg) {
            sceneImg.src = this.getCurrentImageSrc();
        }
    }

    setShirt(shirtKey) {
        this.currentOutfit.shirt = true;
        this.updateScene();
    }

    setPants(pantsKey) {
        this.currentOutfit.pants = true;
        this.updateScene();
    }

    setShoes(shoesKey) {
        this.currentOutfit.shoes = true;
        this.updateScene();
    }

    setSeatbelt(seatbeltKey) {
        this.currentOutfit.seatbelt = seatbeltKey;
    }

    reset() {
        this.currentOutfit = { shirt: false, pants: false, shoes: false, seatbelt: null };
        this.updateScene();
    }
}

// Khởi tạo Singleton
window.binRenderer = new BinCharacterRenderer();


window.binRenderer = new BinCharacterRenderer();
