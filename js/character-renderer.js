/**
 * character-renderer.js
 * Chặng 1 sử dụng duy nhất 1 background cạnh tủ chuẩn Comic Line-Art
 */

class BinCharacterRenderer {
    constructor() {
        this.currentOutfit = {
            shirt: false,
            pants: false,
            shoes: false,
            seatbelt: null
        };
        this.singleScene = 'act1_bedroom_initial_bin_1787803669361.jpg';
    }

    mountAll() {
        const sceneImg = document.getElementById('act1-room-scene-img');
        if (sceneImg) {
            sceneImg.src = this.singleScene;
        }
    }

    getCurrentImageSrc() {
        return this.singleScene;
    }

    updateScene() {
        const sceneImg = document.getElementById('act1-room-scene-img');
        if (sceneImg) {
            sceneImg.src = this.singleScene;
        }
    }

    setShirt(shirtKey) {
        this.currentOutfit.shirt = true;
    }

    setPants(pantsKey) {
        this.currentOutfit.pants = true;
    }

    setShoes(shoesKey) {
        this.currentOutfit.shoes = true;
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
