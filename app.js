const REAL_ART_ONLY = true;
window.ACTIVITY_1_VISUAL_GOLDEN_SAMPLE = "LOCKED";

class KidFlightApp {
    constructor() {
        this.currentActivity = 1;
        this.totalActivities = 13;
        this.maxUnlockedActivity = 1;
        this.allAssetsLoaded = false;

        this.activityConfig = {
            1: { stage: 1, title: 'Chọn Trang Phục Thoải Mái', speaker: 'Mẹ', introText: '“Bin sắp đi máy bay rồi. Con chọn bộ đồ nào giúp Bin dễ vận động nhé!”', subLabel: 'Hoạt động 1: Chọn trang phục' },
            2: { stage: 2, title: 'Xếp Đồ Vào Vali', speaker: 'Bố', introText: '“Bin mang gì đi máy bay nhỉ? Con xếp vali giúp Bin nhé!”', subLabel: 'Hoạt động 2: Xếp đồ vào vali' },
            3: { stage: 3, title: 'Kiểm Tra Vé & Thẻ Bay', speaker: 'Mẹ', introText: '“Đến quầy kiểm tra rồi. Con giúp Bin đưa vé nhé!”', subLabel: 'Bước 1/3: Kiểm tra vé' },
            4: { stage: 3, title: 'Soi Hành Lý Qua Máy Quét', speaker: 'Bố', introText: '“Bây giờ vali của Bin sẽ đi qua máy soi. Con xem bên trong có gì nhé!”', subLabel: 'Bước 2/3: Soi hành lý' },
            5: { stage: 3, title: 'Đi Qua Cổng An Ninh', speaker: 'Mẹ', introText: '“Đến cổng an ninh rồi. Con giúp Bin đi qua nhé!”', subLabel: 'Bước 3/3: Đi qua cổng an ninh' },
            6: { stage: 4, title: 'Tìm Đúng Cổng 03', speaker: 'Bố', introText: '“Vé của Bin ghi số 03. Con tìm cổng số 03 nhé!”', subLabel: 'Hoạt động 6: Tìm cổng lên máy bay' },
            7: { stage: 5, title: 'Cài Dây An Toàn', speaker: 'Mẹ', introText: '“Bin ngồi vào ghế rồi. Con giúp Bin cài dây an toàn nhé!”', subLabel: 'Bước 1/2: Cài dây an toàn' },
            8: { stage: 5, title: 'Giúp Tai Dễ Chịu Khi Cất Cánh', speaker: 'Mẹ', introText: '“Tai Bin hơi khó chịu. Bin uống một ngụm nước nhé.”', subLabel: 'Bước 2/2: Giúp tai dễ chịu' },
            9: { stage: 6, title: 'Ngắm Mây Và Tưởng Tượng', speaker: 'Bin', introText: '“Bin thấy đám mây giống hình gì nhỉ? Con nhìn cùng Bin nhé!”', subLabel: 'Hoạt động 9: Ngắm mây' },
            10: { stage: 7, title: 'Nói Nhỏ Vừa Đủ Nghe', speaker: 'Mẹ', introText: '“Trên máy bay mình nói nhỏ vừa đủ nghe nhé.”', subLabel: 'Bước 1/2: Nói nhỏ vừa đủ nghe' },
            11: { stage: 7, title: 'Ngồi Gọn — Không Đạp Ghế Trước', speaker: 'Bố', introText: '“Bin thu chân gọn lại để không chạm ghế phía trước nhé!”', subLabel: 'Bước 2/2: Ngồi gọn chân' },
            12: { stage: 8, title: 'Chờ Máy Bay Dừng Hẳn Rồi Mới Mở Dây', speaker: 'Bố', introText: '“Máy bay đang chạy vào chỗ đỗ. Bin vẫn ngồi yên và giữ dây an toàn nhé!”', subLabel: 'Bước 1/2: Chờ máy bay dừng' },
            13: { stage: 8, title: 'Tìm Đúng Vali Của Bin', speaker: 'Bố', introText: '“Con tìm chiếc vali đỏ có hình gấu của Bin nhé!”', subLabel: 'Bước 2/2: Nhận hành lý' }
        };

        // 100% Relative URLs tới các file SVG tồn tại vật lý
        this.scenes = {
            act7_unbuckled: 'assets/scenes/intro_act7_seatbelt.svg',
            act7_buckled: 'assets/scenes/scene_act7_buckled.svg',
            act8_ready: 'assets/scenes/scene_act7_buckled.svg',
            act8_drinking: 'assets/scenes/scene_act8_drinking.svg',
            act9_window: 'assets/scenes/scene_act9_window.svg',
            act10_ready: 'assets/scenes/scene_act7_buckled.svg',
            act10_whisper: 'assets/scenes/scene_act10_whisper.svg',
            act11_ready: 'assets/scenes/scene_act7_buckled.svg',
            act11_feet: 'assets/scenes/scene_act11_feet.svg',
            act12_taxiing: 'assets/scenes/intro_act12_landing.svg',
            act12_unbuckled: 'assets/scenes/scene_act12_unbuckled.svg'
        };

        this.actInitialized = {};
        this.dressed = { shirt: false, pants: false, shoes: false };
        this.packedCount = 0;
        this.xrayCount = 0;
        this.act12PlaneStopped = false;

        this.parentHoldStart = 0;
        this.parentHoldReqId = null;

        this.init();
    }

    async init() {
        this.bindGlobalEvents();
        this.attachImageDebugListeners();
        
        try {
            await this.preloadActivity1Assets();
            this.allAssetsLoaded = true;
            if (window.binRenderer) {
                window.binRenderer.updateAll();
            }
            this.showActivity(1, true);
        } catch (e) {
            console.error('[REAL_ART_REQUIRED GATE ERROR]', e.message);
            document.body.innerHTML = `
                <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;background:#FFF3E0;color:#D84315;font-family:sans-serif;text-align:center;padding:20px;">
                    <h2>🚨 REAL_ART_REQUIRED ERROR</h2>
                    <p style="font-size:18px;font-weight:bold;max-width:600px;">${e.message}</p>
                    <p style="font-size:14px;color:#5D4037;">Không sử dụng procedural fallback. Ứng dụng dừng cho đến khi tệp artwork thật được cung cấp.</p>
                </div>
            `;
        }
    }

    async preloadActivity1Assets() {
        if (!REAL_ART_ONLY) return true;

        const manifestUrl = 'assets/activity_01/manifest.json';
        const response = await fetch(manifestUrl);
        if (!response.ok) throw new Error(`REAL_ART_REQUIRED: Manifest missing at ${manifestUrl}`);
        const manifest = await response.json();

        const urlsToLoad = [
            manifest.scenes.intro,
            manifest.backgrounds.bedroom,
            manifest.characterStates.baseNeutral,
            manifest.characterStates.shirtOnly,
            manifest.characterStates.shirtPants,
            manifest.characterStates.fullOutfit,
            ...Object.values(manifest.wardrobeObjects).map(obj => obj.src)
        ];

        console.log('[REAL_ART_ONLY] Preloading all Activity 1 assets...', urlsToLoad);

        const loadPromises = urlsToLoad.map(url => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    console.log('[REAL_ART_ONLY: 200 OK]', url);
                    resolve(url);
                };
                img.onerror = () => {
                    const err = new Error(`REAL_ART_REQUIRED: File missing or failed to load: ${url}`);
                    console.error('[REAL_ART_ONLY: FAIL]', err.message);
                    reject(err);
                };
                img.src = url;
            });
        });

        await Promise.all(loadPromises);
        console.log('[REAL_ART_ONLY: ALL_ASSETS_LOADED === true]');
        return true;
    }

    attachImageDebugListeners() {
        const introImg = document.getElementById('intro-art-act-1');
        if (introImg) {
            console.log('[DEBUG INTRO ACTIVITY 1 IMG INITIAL STATE]', {
                id: introImg.id,
                srcAttribute: introImg.getAttribute('src'),
                resolvedSrc: introImg.src,
                currentSrc: introImg.currentSrc,
                complete: introImg.complete,
                naturalWidth: introImg.naturalWidth,
                naturalHeight: introImg.naturalHeight
            });

            introImg.addEventListener('load', () => {
                console.log('[DEBUG INTRO IMG LOAD SUCCESS - HTTP 200 OK]', {
                    src: introImg.src,
                    currentSrc: introImg.currentSrc,
                    naturalWidth: introImg.naturalWidth,
                    naturalHeight: introImg.naturalHeight
                });
            });

            introImg.addEventListener('error', (e) => {
                console.error('[IMAGE_ASSET_MISSING]', introImg.src, e);
            });
        }

        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('error', () => {
                console.error('[IMAGE_ASSET_MISSING]', img.src);
            });
            img.addEventListener('load', () => {
                console.log('[IMG LOAD 200 OK]', img.src);
            });
        });
    }

    showParentPrompt(speaker, text) {
        const avatar = document.getElementById('parent-prompt-avatar');
        const textEl = document.getElementById('parent-prompt-text');

        if (avatar) {
            if (speaker === 'Mẹ') avatar.textContent = '👩';
            else if (speaker === 'Bố') avatar.textContent = '👨';
            else if (speaker === 'Bin') avatar.textContent = '👦';
            else if (speaker === 'Tiếp viên') avatar.textContent = '👩‍✈️';
            else avatar.textContent = '👩';
        }

        if (textEl) {
            textEl.textContent = text;
        }
    }

    unlockActivity(actNum) {
        if (actNum > this.maxUnlockedActivity && actNum <= this.totalActivities) {
            this.maxUnlockedActivity = actNum;
        }
    }

    showActivity(actNum, showIntro = true) {
        if (actNum < 1 || actNum > this.totalActivities) return;

        this.currentActivity = actNum;
        this.unlockActivity(actNum);
        const config = this.activityConfig[actNum];

        // 1. Cập nhật Top Nav 8 Chặng Lớn
        document.querySelectorAll('.stage-dot').forEach((dot) => {
            const stageNum = parseInt(dot.getAttribute('data-stage'), 10);
            dot.classList.remove('active', 'completed', 'locked');

            if (stageNum === config.stage) {
                dot.classList.add('active');
            } else if (stageNum < config.stage) {
                dot.classList.add('completed');
            } else {
                const isUnlocked = Object.keys(this.activityConfig).some(k => {
                    return this.activityConfig[k].stage === stageNum && parseInt(k, 10) <= this.maxUnlockedActivity;
                });
                if (isUnlocked) dot.classList.add('completed');
                else dot.classList.add('locked');
            }
        });

        // 2. Cập nhật Sub-progress bar
        const subText = document.getElementById('sub-progress-text');
        if (subText) {
            subText.textContent = `Chặng ${config.stage} — ${config.subLabel}`;
        }

        // 3. Kích hoạt Container tương ứng
        document.querySelectorAll('.activity-container').forEach((cont) => {
            const num = parseInt(cont.getAttribute('data-act'), 10);
            if (num === actNum) {
                cont.classList.add('active');
            } else {
                cont.classList.remove('active');
            }
        });

        const introView = document.getElementById(`intro-act-${actNum}`);
        const gameplayView = document.getElementById(`gameplay-act-${actNum}`);
        const feedbackOverlay = document.getElementById(`feedback-act-${actNum}`);

        if (feedbackOverlay) feedbackOverlay.classList.add('hidden');

        if (showIntro && introView && gameplayView) {
            introView.classList.remove('hidden');
            gameplayView.classList.add('hidden');
            this.showParentPrompt(config.speaker, config.introText);
        } else if (gameplayView) {
            if (introView) introView.classList.add('hidden');
            gameplayView.classList.remove('hidden');
            this.startGameplay(actNum);
        }

        this.updateCharacterForActivity(actNum);
    }

    startGameplay(actNum) {
        const config = this.activityConfig[actNum];
        this.showParentPrompt(config.speaker, config.introText);

        if (!this.actInitialized[actNum]) {
            this.actInitialized[actNum] = true;
            this.initActivityGameplay(actNum);
        }

        if (actNum === 12) {
            this.runActivity12Flow();
        }
    }

    updateCharacterForActivity(actNum) {
        if (!window.binRenderer) return;

        if (actNum === 1) {
            window.binRenderer.renderTo(document.getElementById('bin-character-mount-lvl1'), 'level1_outfit');
        }
    }

    bindGlobalEvents() {
        document.querySelectorAll('.btn-start-activity').forEach(btn => {
            btn.addEventListener('click', () => {
                const actNum = parseInt(btn.getAttribute('data-act'), 10);
                if (window.audioMgr) window.audioMgr.playPop();
                const introView = document.getElementById(`intro-act-${actNum}`);
                const gameplayView = document.getElementById(`gameplay-act-${actNum}`);
                if (introView) introView.classList.add('hidden');
                if (gameplayView) gameplayView.classList.remove('hidden');
                this.startGameplay(actNum);
            });
        });

        document.querySelectorAll('.btn-next-activity').forEach(btn => {
            btn.addEventListener('click', () => {
                const nextAct = parseInt(btn.getAttribute('data-next'), 10);
                if (window.audioMgr) window.audioMgr.playPop();
                if (nextAct <= this.totalActivities) {
                    this.showActivity(nextAct, true);
                }
            });
        });

        // P0.1: Cổng Ba Mẹ
        const parentBtn = document.getElementById('btn-parent-gate');
        const holdCircle = document.getElementById('parent-ring-circle');
        const modal = document.getElementById('parent-modal');
        const closeModalBtn = document.getElementById('btn-close-parent');

        if (parentBtn && holdCircle) {
            const startHold = (e) => {
                e.preventDefault();
                this.parentHoldStart = Date.now();
                const totalHold = 3000;

                const updateRing = () => {
                    const elapsed = Date.now() - this.parentHoldStart;
                    const progress = Math.min(1, elapsed / totalHold);
                    const offset = 175 - (175 * progress);
                    holdCircle.style.strokeDashoffset = offset;

                    if (progress >= 1) {
                        if (window.audioMgr) window.audioMgr.playTing();
                        modal.classList.add('open');
                        resetHold();
                    } else {
                        this.parentHoldReqId = requestAnimationFrame(updateRing);
                    }
                };

                this.parentHoldReqId = requestAnimationFrame(updateRing);
            };

            const resetHold = () => {
                if (this.parentHoldReqId) cancelAnimationFrame(this.parentHoldReqId);
                holdCircle.style.strokeDashoffset = 175;
            };

            parentBtn.addEventListener('pointerdown', startHold);
            parentBtn.addEventListener('pointerup', resetHold);
            parentBtn.addEventListener('pointerleave', resetHold);
            parentBtn.addEventListener('pointercancel', resetHold);
        }

        if (closeModalBtn && modal) {
            closeModalBtn.addEventListener('click', () => {
                if (window.audioMgr) window.audioMgr.playPop();
                modal.classList.remove('open');
            });
        }

        const volSlider = document.getElementById('setting-volume');
        if (volSlider) {
            volSlider.addEventListener('input', (e) => {
                if (window.audioMgr) window.audioMgr.volume = parseFloat(e.target.value);
            });
        }

        const motionToggle = document.getElementById('setting-reduced-motion');
        if (motionToggle) {
            motionToggle.addEventListener('change', (e) => {
                if (window.effectsMgr) window.effectsMgr.reducedMotion = e.target.checked;
            });
        }

        const resetBtn = document.getElementById('btn-reset-app');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (window.binRenderer) window.binRenderer.reset();
                window.location.reload();
            });
        }

        document.querySelectorAll('.jump-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const target = parseInt(btn.getAttribute('data-act'), 10);
                if (target) {
                    if (window.audioMgr) window.audioMgr.playPop();
                    modal.classList.remove('open');
                    this.unlockActivity(target);
                    this.showActivity(target, true);
                }
            });
        });
    }

    initActivityGameplay(actNum) {
        switch (actNum) {
            case 1: this.initAct1Wardrobe(); break;
            case 2: this.initAct2Suitcase(); break;
            case 3: this.initAct3Ticket(); break;
            case 4: this.initAct4Xray(); break;
            case 5: this.initAct5Gate(); break;
            case 6: this.initAct6Gate03(); break;
            case 7: this.initAct7Seatbelt(); break;
            case 8: this.initAct8Water(); break;
            case 9: this.initAct9Clouds(); break;
            case 10: this.initAct10Volume(); break;
            case 11: this.initAct11Feet(); break;
            case 12: this.initAct12Unbuckle(); break;
            case 13: this.initAct13Baggage(); break;
        }
    }

    // --- HOẠT ĐỘNG 1: CHỌN TRANG PHỤC (TRONG PHÒNG NGỦ) ---
    initAct1Wardrobe() {
        const clothesTiles = document.querySelectorAll('#act-1 [data-clothing-item="true"]');
        const feedback = document.getElementById('feedback-act-1');

        const applyClothingItem = (tile) => {
            const isFit = tile.getAttribute('data-fit') === 'soft';
            const type = tile.getAttribute('data-type');
            const binMount = document.getElementById('bin-character-mount-lvl1');
            const binRect = binMount ? binMount.getBoundingClientRect() : { left: 500, top: 300, width: 100, height: 100 };

            if (isFit && window.binRenderer) {
                if (type === 'shirt') {
                    this.dressed.shirt = true;
                    window.binRenderer.setShirt('yellow');
                } else if (type === 'pants') {
                    this.dressed.pants = true;
                    window.binRenderer.setPants('blue');
                } else if (type === 'shoes') {
                    this.dressed.shoes = true;
                    window.binRenderer.setShoes('velcro');
                }

                if (window.effectsMgr) {
                    window.effectsMgr.burstStarsAt(binRect.left + binRect.width / 2, binRect.top + binRect.height / 2);
                }
                if (window.audioMgr) window.audioMgr.playTing();
                this.showParentPrompt('Mẹ', '“Đúng rồi! Món này mềm và dễ vận động.”');

                if (this.dressed.shirt && this.dressed.pants && this.dressed.shoes) {
                    this.unlockActivity(2);
                    if (feedback) feedback.classList.remove('hidden');
                    this.showParentPrompt('Mẹ', '“Bin sẵn sàng rồi! Mình đi xếp vali nhé!”');
                }
            } else {
                tile.classList.add('shake-wobble');
                setTimeout(() => { tile.classList.remove('shake-wobble'); }, 500);
                if (window.audioMgr) window.audioMgr.playBoing();
                this.showParentPrompt('Bố', '“Món này hơi bất tiện. Con thử món khác nhé!”');
            }
        };

        clothesTiles.forEach(tile => {
            tile.addEventListener('click', () => applyClothingItem(tile));
        });
    }

    // --- HOẠT ĐỘNG 2: XẾP VALI ---
    initAct2Suitcase() {
        const items = document.querySelectorAll('#act-2 [data-luggage-item="true"]');
        const suitcaseInner = document.getElementById('suitcase-inner-lvl2');
        const feedback = document.getElementById('feedback-act-2');

        items.forEach(item => {
            item.addEventListener('click', () => {
                if (item.classList.contains('packed')) return;
                const cat = item.getAttribute('data-category');

                if (cat === 'PACK') {
                    item.classList.add('packed');
                    item.style.display = 'none';
                    this.packedCount++;

                    const img = item.querySelector('img');
                    if (img) {
                        const clone = document.createElement('img');
                        clone.src = img.src;
                        clone.style.width = '48px';
                        clone.style.height = '48px';
                        clone.style.objectFit = 'contain';
                        clone.className = 'pop-in-soft';
                        suitcaseInner.appendChild(clone);
                    }

                    if (window.audioMgr) window.audioMgr.playTing();
                    this.showParentPrompt('Mẹ', '“Ừ! Món này mình xếp vào vali nhé.”');

                    if (this.packedCount >= 3) {
                        this.unlockActivity(3);
                        if (feedback) feedback.classList.remove('hidden');
                        this.showParentPrompt('Mẹ', '“Vali của Bin sẵn sàng rồi! Đến sân bay thôi!”');
                    }
                } else if (cat === 'ASK_PARENT') {
                    item.classList.add('shake-wobble');
                    setTimeout(() => item.classList.remove('shake-wobble'), 500);
                    if (window.audioMgr) window.audioMgr.playPop();
                    this.showParentPrompt('Bố', '“Món này mình hỏi Ba Mẹ trước nhé!”');
                } else {
                    item.classList.add('shake-wobble');
                    setTimeout(() => item.classList.remove('shake-wobble'), 500);
                    if (window.audioMgr) window.audioMgr.playBoing();
                    this.showParentPrompt('Bố', '“Món này để Ba Mẹ giúp mình xử lý nhé.”');
                }
            });
        });
    }

    // --- HOẠT ĐỘNG 3: KIỂM TRA VÉ ---
    initAct3Ticket() {
        const stage = document.getElementById('boarding-pass-stage-3');
        const btnTicket = document.getElementById('btn-show-ticket-3');
        const feedback = document.getElementById('feedback-act-3');

        const doCheckTicket = () => {
            if (window.audioMgr) window.audioMgr.playStamp();
            if (window.effectsMgr) {
                const r = stage ? stage.getBoundingClientRect() : { left: 400, top: 300, width: 200, height: 100 };
                window.effectsMgr.burstStarsAt(r.left + r.width / 2, r.top + r.height / 2);
            }

            if (btnTicket) {
                btnTicket.innerHTML = '<span>ĐÃ ĐÓNG DẤU VÉ ✓</span>';
                btnTicket.style.borderColor = '#00E676';
            }

            this.showParentPrompt('Tiếp viên', '“Vé của Bin xong rồi! Giờ soi chiếu vali nhé.”');
            this.unlockActivity(4);
            if (feedback) feedback.classList.remove('hidden');
        };

        if (stage) stage.onclick = doCheckTicket;
        if (btnTicket) btnTicket.onclick = (e) => { e.stopPropagation(); doCheckTicket(); };
    }

    // --- HOẠT ĐỘNG 4: SOI HÀNH LÝ ---
    initAct4Xray() {
        const tiles = document.querySelectorAll('#act-4 .xray-item-tile');
        const feedback = document.getElementById('feedback-act-4');

        tiles.forEach(tile => {
            tile.onclick = () => {
                if (tile.classList.contains('revealed')) return;
                tile.classList.add('revealed');
                this.xrayCount++;

                if (window.audioMgr) window.audioMgr.playTing();
                if (window.effectsMgr) {
                    const r = tile.getBoundingClientRect();
                    window.effectsMgr.burstStarsAt(r.left + r.width / 2, r.top + r.height / 2);
                }

                if (this.xrayCount >= 3) {
                    this.unlockActivity(5);
                    if (feedback) feedback.classList.remove('hidden');
                    this.showParentPrompt('Mẹ', '“Vali của Bin an toàn rồi! Qua cổng kiểm tra nhé!”');
                }
            };
        });
    }

    // --- HOẠT ĐỘNG 5: ĐI QUA CỔNG AN NINH ---
    initAct5Gate() {
        const btnWalk = document.getElementById('btn-walk-gate-5');
        const feedback = document.getElementById('feedback-act-5');

        if (btnWalk) {
            btnWalk.onclick = () => {
                if (window.audioMgr) window.audioMgr.playBeepBoop();
                if (window.effectsMgr) {
                    const r = btnWalk.getBoundingClientRect();
                    window.effectsMgr.burstStarsAt(r.left + r.width / 2, r.top);
                }

                this.showParentPrompt('Mẹ', '“Bíp boong! Bin qua cửa an toàn rồi!”');
                this.unlockActivity(6);
                if (feedback) feedback.classList.remove('hidden');
            };
        }
    }

    // --- HOẠT ĐỘNG 6: TÌM ĐÚNG CỔNG 03 ---
    initAct6Gate03() {
        const gateBtns = document.querySelectorAll('#act-6 .gate-hud-btn');
        const feedback = document.getElementById('feedback-act-6');

        gateBtns.forEach(btn => {
            btn.onclick = () => {
                const target = btn.getAttribute('data-gate');
                if (target === '03') {
                    btn.classList.add('matched');
                    if (window.audioMgr) window.audioMgr.playConnect();
                    if (window.effectsMgr) {
                        const r = btn.getBoundingClientRect();
                        window.effectsMgr.burstStarsAt(r.left + r.width / 2, r.top);
                    }

                    this.showParentPrompt('Tiếp viên', '“Đúng rồi! Cổng 03 đây rồi! Chào mừng Bin lên máy bay!”');
                    this.unlockActivity(7);
                    if (feedback) feedback.classList.remove('hidden');
                } else {
                    btn.classList.add('shake-wobble');
                    setTimeout(() => btn.classList.remove('shake-wobble'), 500);
                    if (window.audioMgr) window.audioMgr.playBoing();
                    this.showParentPrompt('Bố', '“Con nhìn lại số 03 trên vé nhé!”');
                }
            };
        });
    }

    // --- HOẠT ĐỘNG 7: CÀI DÂY AN TOÀN ---
    initAct7Seatbelt() {
        const btnBuckle = document.getElementById('btn-buckle-action-7');
        const sceneImg = document.getElementById('scene-img-act-7');
        const hud = document.getElementById('hud-buckle-act-7');
        const feedback = document.getElementById('feedback-act-7');

        if (btnBuckle && sceneImg) {
            btnBuckle.onclick = () => {
                sceneImg.src = this.scenes.act7_buckled;
                if (hud) hud.style.display = 'none';

                if (window.audioMgr) window.audioMgr.playClack();
                if (window.effectsMgr) {
                    const r = btnBuckle.getBoundingClientRect();
                    window.effectsMgr.burstStarsAt(r.left + r.width / 2, r.top);
                }

                this.showParentPrompt('Mẹ', '“CẠCH! Dây an toàn chắc chắn rồi!”');
                this.unlockActivity(8);
                if (feedback) feedback.classList.remove('hidden');
            };
        }
    }

    // --- HOẠT ĐỘNG 8: GIÚP TAI DỄ CHỊU ---
    initAct8Water() {
        const btnDrink = document.getElementById('btn-drink-action-8');
        const sceneImg = document.getElementById('scene-img-act-8');
        const hud = document.getElementById('hud-drink-act-8');
        const feedback = document.getElementById('feedback-act-8');

        if (btnDrink && sceneImg) {
            btnDrink.onclick = () => {
                sceneImg.src = this.scenes.act8_drinking;
                if (hud) hud.style.display = 'none';

                if (window.audioMgr) window.audioMgr.playDrinkWater();
                if (window.effectsMgr) {
                    const r = btnDrink.getBoundingClientRect();
                    window.effectsMgr.spawnMusicNotesAt(r.left + r.width / 2, r.top);
                }

                this.showParentPrompt('Bin', '“Tai Bin dễ chịu hơn rồi!”');
                this.unlockActivity(9);
                if (feedback) feedback.classList.remove('hidden');
            };
        }
    }

    // --- HOẠT ĐỘNG 9: NGẮM MÂY ---
    initAct9Clouds() {
        const btns = document.querySelectorAll('#act-9 .morph-cloud-btn');
        const feedback = document.getElementById('feedback-act-9');

        btns.forEach(b => {
            b.onclick = () => {
                const name = b.getAttribute('data-name');
                if (window.audioMgr) window.audioMgr.playBling();
                this.showParentPrompt('Bin', `“Bin thấy đám mây giống hình ${name}!”`);
                this.unlockActivity(10);
                if (feedback) feedback.classList.remove('hidden');
            };
        });
    }

    // --- HOẠT ĐỘNG 10: NÓI NHỎ ---
    initAct10Volume() {
        const btns = document.querySelectorAll('#act-10 .volume-act-btn');
        const sceneImg = document.getElementById('scene-img-act-10');
        const feedback = document.getElementById('feedback-act-10');

        btns.forEach(b => {
            b.onclick = () => {
                const level = b.getAttribute('data-level');
                if (level === 'whisper') {
                    if (sceneImg) sceneImg.src = this.scenes.act10_whisper;
                    if (window.audioMgr) window.audioMgr.playTing();
                    this.showParentPrompt('Bin', '“Đúng rồi! Mình nói nhỏ vừa đủ nghe nhé.”');
                    this.unlockActivity(11);
                    if (feedback) feedback.classList.remove('hidden');
                } else if (level === 'loud') {
                    if (window.audioMgr) window.audioMgr.playPop();
                    this.showParentPrompt('Mẹ', '“Ơ, hơi to rồi. Con thử nhỏ hơn nhé!”');
                } else {
                    if (window.audioMgr) window.audioMgr.playPop();
                    this.showParentPrompt('Mẹ', '“Nhỏ hơn một chút nữa nhé!”');
                }
            };
        });
    }

    // --- HOẠT ĐỘNG 11: NGỒI GỌN CHÂN ---
    initAct11Feet() {
        const btnFeet = document.getElementById('btn-tuck-feet');
        const sceneImg = document.getElementById('scene-img-act-11');
        const feedback = document.getElementById('feedback-act-11');

        if (btnFeet && sceneImg) {
            btnFeet.onclick = () => {
                sceneImg.src = this.scenes.act11_feet;
                btnFeet.style.display = 'none';

                if (window.audioMgr) window.audioMgr.playTing();
                this.showParentPrompt('Bố', '“Giỏi lắm! Bin ngồi gọn rồi, không đạp ghế trước!”');
                this.unlockActivity(12);
                if (feedback) feedback.classList.remove('hidden');
            };
        }
    }

    // --- HOẠT ĐỘNG 12: CHỜ DỪNG RỒI MỞ DÂY ---
    initAct12Unbuckle() {
        const unbuckleBtn = document.getElementById('unbuckle-latch-btn');
        const sceneImg = document.getElementById('scene-img-act-12');
        const feedback = document.getElementById('feedback-act-12');

        if (unbuckleBtn) {
            unbuckleBtn.onclick = () => {
                if (!this.act12PlaneStopped) {
                    this.showParentPrompt('Bố', '“Máy bay đang chạy vào chỗ đỗ. Bin vẫn ngồi yên và giữ dây an toàn nhé!”');
                    return;
                }

                if (sceneImg) sceneImg.src = this.scenes.act12_unbuckled;
                unbuckleBtn.innerHTML = '<span>🔓 Đai an toàn đã mở ✓</span>';
                unbuckleBtn.style.borderColor = '#00E676';

                if (window.audioMgr) window.audioMgr.playUnbuckle();
                this.showParentPrompt('Mẹ', '“Máy bay dừng hẳn rồi. Bây giờ mình mới mở dây nhé!”');
                this.unlockActivity(13);
                if (feedback) feedback.classList.remove('hidden');
            };
        }
    }

    runActivity12Flow() {
        this.act12PlaneStopped = false;
        const unbuckleBtn = document.getElementById('unbuckle-latch-btn');
        const sceneImg = document.getElementById('scene-img-act-12');
        if (sceneImg) sceneImg.src = this.scenes.act12_taxiing;

        if (unbuckleBtn) {
            unbuckleBtn.setAttribute('disabled', 'true');
            unbuckleBtn.style.opacity = '0.6';
            unbuckleBtn.style.borderColor = '#78909C';
            unbuckleBtn.innerHTML = '<span>⏳ Máy bay đang chạy vào bãi đỗ...</span>';
        }

        setTimeout(() => {
            this.act12PlaneStopped = true;
            if (unbuckleBtn) {
                unbuckleBtn.removeAttribute('disabled');
                unbuckleBtn.style.opacity = '1';
                unbuckleBtn.style.borderColor = '#00E676';
                unbuckleBtn.innerHTML = '<span>🔓 Máy bay đã dừng hẳn — Mở dây an toàn</span>';
            }
            this.showParentPrompt('Mẹ', '“Máy bay dừng hẳn rồi. Bây giờ mình mới mở dây nhé!”');
        }, 2600);
    }

    // --- HOẠT ĐỘNG 13: TÌM VALI CỦA BIN ---
    initAct13Baggage() {
        const suitcaseCards = document.querySelectorAll('#act-13 .real-suitcase-card');
        const modal = document.getElementById('golden-medal-modal');
        const btnReplay = document.getElementById('btn-replay-adventure');

        suitcaseCards.forEach(card => {
            card.onclick = () => {
                const isBin = card.getAttribute('data-is-bin') === 'true';
                if (isBin) {
                    card.classList.add('bin-picked');
                    const orbit = document.querySelector('.real-suitcases-orbit');
                    if (orbit) orbit.classList.add('paused');

                    if (window.effectsMgr) window.effectsMgr.startCelebrationFireworks(3000);
                    if (window.audioMgr) window.audioMgr.playFanfare();
                    this.showParentPrompt('Mẹ', '“Hoan hô! Bin tìm đúng chiếc vali đỏ hình gấu rồi!”');

                    setTimeout(() => {
                        if (modal) modal.classList.add('show');
                    }, 1200);
                } else {
                    card.classList.add('shake-wobble');
                    setTimeout(() => card.classList.remove('shake-wobble'), 500);
                    if (window.audioMgr) window.audioMgr.playBoing();
                    this.showParentPrompt('Bố', '“Vali này của bạn khác rồi. Con tìm vali đỏ có hình gấu của Bin nhé!”');
                }
            };
        });

        if (btnReplay) {
            btnReplay.onclick = () => {
                if (window.audioMgr) window.audioMgr.playPop();
                if (window.binRenderer) window.binRenderer.reset();
                window.location.reload();
            };
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.kidFlightApp = new KidFlightApp();
});
