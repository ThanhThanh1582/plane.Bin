# 📋 ACTIVITY 01 ASSET MANIFEST (GOLDEN SAMPLE)

Bảng kê khai toàn bộ tệp tài nguyên của **Hoạt Động 1: Chọn Trang Phục Thoải Mái** trong chế độ `REAL_ART_ONLY = true`.

---

### 🛡️ I. KHÓA CẤU HÌNH HOẠT ĐỘNG (ACTIVITY HARD GATE)
- **Activity**: `1`
- **Tên hoạt động**: `Chọn Trang Phục Thoải Mái`
- **Chế độ**: `REAL_ART_ONLY = true`
- **Trạng thái**: `ACTIVITY_1_VISUAL_GOLDEN_SAMPLE = HUMAN_LOCK_REQUIRED`
- **Cấm Procedural Fallback**: `0 occurrences (STRICTLY FORBIDDEN)`
- **Preload Gate**: Bắt buộc `ALL_ASSETS_LOADED === true` trước khi render. Nếu tệp lỗi $\rightarrow$ `throw new Error('REAL_ART_REQUIRED: ...')`.

---

### 📦 II. BẢNG DANH MỤC ASSET KHÓA CỨNG (STRICT RELATIVE PATHS)

| Tên Asset | Relative Path Trong Dự Án | Tệp Tồn Tại? | Tải Thành Công? | Loại Artwork | Trạng Thái Gate |
| :--- | :--- | :---: | :---: | :--- | :---: |
| **Intro Scene** | `assets/scenes/intro_act1_wardrobe.svg` | **YES** | **200 OK** | Real 2D Storybook Scene (16:9) | ✅ **PASS** |
| **Bedroom Background** | `assets/backgrounds/bg_home.svg` | **YES** | **200 OK** | Real Storybook Bedroom Background | ✅ **PASS** |
| **Bin (Base Neutral)** | `assets/characters/bin/bin_base_neutral.svg` | **YES** | **200 OK** | Real Character State (Mộc ban đầu) | ✅ **PASS** |
| **Bin (Áo vàng)** | `assets/characters/bin/bin_yellow_shirt_only.svg` | **YES** | **200 OK** | Real Character State (Áo thun vàng) | ✅ **PASS** |
| **Bin (Áo + Quần)** | `assets/characters/bin/bin_yellow_shirt_blue_pants.svg` | **YES** | **200 OK** | Real Character State (Áo vàng + Quần xanh) | ✅ **PASS** |
| **Bin (Full Outfit)** | `assets/characters/bin/bin_yellow_shirt_blue_pants_shoes.svg` | **YES** | **200 OK** | Real Character State (Đủ cả bộ + Giày) | ✅ **PASS** |
| **Áo thun mềm** | `assets/objects/shirt_soft.svg` | **YES** | **200 OK** | Real Artwork Object (Hàng may mặc mềm) | ✅ **PASS** |
| **Quần bò cứng** | `assets/objects/jeans_stiff.svg` | **YES** | **200 OK** | Real Artwork Object (Quần jeans cứng) | ✅ **PASS** |
| **Quần thun mềm** | `assets/objects/pants_soft.svg` | **YES** | **200 OK** | Real Artwork Object (Quần thun co giãn) | ✅ **PASS** |
| **Bộ yếm rườm rà** | `assets/objects/outfit_onepiece.svg` | **YES** | **200 OK** | Real Artwork Object (Yếm dây phức tạp) | ✅ **PASS** |
| **Giày dán xé** | `assets/objects/shoes_velcro.svg` | **YES** | **200 OK** | Real Artwork Object (Giày thể thao dán) | ✅ **PASS** |
| **Bốt cao cổ** | `assets/objects/boots_laces.svg` | **YES** | **200 OK** | Real Artwork Object (Bốt buộc dây dài) | ✅ **PASS** |

---

### 🔍 III. BÁO CÁO KIỂM TRA ZERO-OCCURRENCE
- `file:///C:/`: **0 occurrences** trong toàn bộ codebase.
- `.gemini/antigravity/brain`: **0 occurrences** trong toàn bộ codebase.
- `data:image/svg+xml`: **0 occurrences** trong production asset references.
- Network Image 404: **0**
- Console Image Load Errors: **0**

---

### 🛑 IV. TRẠNG THÁI HIỆN TẠI
`ACTIVITY_1_VISUAL_GOLDEN_SAMPLE = HUMAN_LOCK_REQUIRED`  
*(Đang dừng chờ Human Review. Không nhân sang Activity 2–13).*
