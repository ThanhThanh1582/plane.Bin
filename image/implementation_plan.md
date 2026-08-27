# Kế hoạch Thiết kế & Phát triển: "Cùng Bé Bin Đi Máy Bay" (Phong Cách Airport BillionAir Idle Tycoon)

Ứng dụng tương tác mầm non cao cấp với phong cách đồ họa lấy cảm hứng từ tựa game nổi tiếng **"Airport BillionAir Idle Tycoon"** (Mô hình đồ chơi 3D Chunky Toy, bo tròn mềm mại, màu sắc rực rỡ, hiệu ứng nảy sống động) kết hợp hoàn hảo cùng mô hình **Sách Tương Tác Đồng Hành (Parent-Co-Play)**.

---

## 1. Định Hình Phong Cách Visual (Airport BillionAir Idle Tycoon Style)

- **Màu sắc & Thẩm mỹ**:
  - Tông màu chủ đạo: Xanh da trời pastel (#4FC3F7), Vàng bơ nắng (#FFD54F), Cam đào tươi (#FF7043), Xanh bạc hà (#69F0AE).
  - Khối hình Chunky 3D: Nét vẽ dày, bo tròn góc cực đại (border-radius lớn), đổ bóng 3D nổi bật với viền đáy đậm tạo cảm giác như những khối đồ chơi bằng nhựa dẻo cao cấp (Claymation / Plastisol Toy).
  - Bầu trời nhiều tầng với mây kẹo bông gòn mềm mại (Marshmallow Clouds).
- **Mô hình Tương tác "Ba Mẹ Đọc Cho Bé" (Parent-Co-Play)**:
  - Bỏ giọng đọc máy tự động (TTS), bỏ nút "Nghe lại", bỏ toggle giọng nói trong Cổng Ba Mẹ.
  - Trên màn hình chỉ có **1 câu thoại ngắn chữ to ($\ge 22\text{px}$) nổi bật trong khung biển hiệu sân bay**, ba mẹ dễ dàng liếc đọc nhanh trong 2 giây để trò chuyện trực tiếp cùng bé.
  - Phản hồi tức thì bằng âm thanh Web Audio API giòn giã (*CẠCH!*, *TÁCH!*, *Bling bling!*, *Ực ực*, *Bíp boong!*, *Fanfare*).

---

## 2. Chi Tiết 8 Màn Chơi (BillionAir Aesthetic)

### Level 1: Trang Phục Thoải Mái
- **Câu thoại Ba Mẹ đọc**: **“Bin sắp đi máy bay rồi. Con chọn bộ đồ nào giúp Bin dễ vận động nhé!”**
- **Giao diện**: Tủ đồ Chunky 3D với 6 móc treo đồ chơi trộn lẫn.
- **Tương tác**: Kéo áo thun 👕, quần thun 🩳, giày dán xé 👟 mặc cho Bin.
- **Phản hồi**:
  - Đồ thun: **“Ừ, bộ này mềm và thoải mái!”** (*Ting!* + Bin nhún nhảy xoay tròn).
  - Đồ bó: **“Bộ này hơi khó vận động. Con thử món khác nhé!”** (*Boing!*).

### Level 2: Chiếc Vali Kỳ Diệu
- **Câu thoại Ba Mẹ đọc**: **“Bin mang gì đi máy bay được nhỉ? Con xếp vali giúp Bin nhé!”**
- **Giao diện**: Chiếc vali màu đỏ nổi bật dán Sticker Gấu 🐻 mở toang ở giữa sảnh.
- **Tương tác**:
  - Kéo gấu bông 🧸, quần áo 👕, bàn chải 🪥, mũ 👒 vào vali (*Ting!* **“Món này mang theo được nè!”**).
  - Kéo nhọn ✂️, bình nước lớn 🍼 đưa Ba Mẹ (*Boing!* **“Kéo và bình lớn con đưa Ba Mẹ giữ giúp nhé!”**).

### Level 3: Kiểm Tra An Ninh (BillionAir Security Station)
- **Câu thoại Ba Mẹ đọc**: **“Đến chỗ kiểm tra rồi! Con giúp Bin làm theo từng bước nhé.”**
- **Giao diện**: Quầy thủ tục gỗ sồi, máy soi X-quang kính phát sáng dạ quang neon, cổng từ an ninh có đèn LED xanh.
- **Tương tác 3 bước**:
  1. Chạm vé gửi cô nhân viên (*Cộp!* **“Vé của Bin xong rồi!”**).
  2. Chạm 3 khối quà phát sáng trong máy soi (*Ting!* **“Vali của Bin an toàn rồi!”**).
  3. Chạm Bin bước qua cổng an ninh (*Bíp boong!* **“Bin qua cửa an toàn rồi!”**).

### Level 4: Ra Cổng Bay & Nối Vé Đa Nhân Vật (Airport Gates Boarding)
- **Câu thoại Ba Mẹ đọc**: **“Vé của Bin ghi số 03. Con tìm cửa số 03 nhé!”**
- **Giao diện**: Sảnh chờ sân bay nhìn ra đường băng và máy bay khổng lồ. 4 Cổng bay lớn: **CỔNG 01** (Thỏ 🐰), **CỔNG 02** (Gấu 🐻), **CỔNG 03** (Bin 🧒), **CỔNG 05** (Khủng Long 🦖).
- **Tương tác**: Chạm bạn nhỏ rồi chạm đúng cổng bay tương ứng $\rightarrow$ Vệt sáng cầu vồng nối từ nhân vật đến cổng bay, các bạn reo vui bước qua ống lồng kính dẫn vào máy bay.

### Level 5: Hiệp Sĩ Đai An Toàn & Uống Nước
- **Câu thoại Ba Mẹ đọc 1**: **“Con giúp Bin cài dây an toàn nhé!”**
  - Kéo chốt kim loại cài vào khóa $\rightarrow$ Tiếng kim loại **“CẠCH!”** chắc nịch, đèn báo đổi màu xanh sáng, Bin hóa thân thành Hiệp sĩ bay khoác áo choàng lấp lánh 🦸‍♂️.
- **Câu thoại Ba Mẹ đọc 2**: **“Tai Bin hơi khó chịu. Bin uống một ngụm nước nhé.”**
  - Chạm ly nước cho Bin uống (*Ực ực*) $\rightarrow$ **“Tai Bin dễ chịu hơn rồi!”** + nốt nhạc bay quanh tai.

### Level 6: Ngắm Mây Biến Hình (In-flight Cloud Window)
- **Câu thoại Ba Mẹ đọc**: **“Con thấy đám mây giống hình gì?”**
- **Giao diện**: Ô cửa sổ máy bay hình oval với cánh máy bay và 4 đám mây bồng bềnh.
- **Tương tác**: Chạm vào từng đám mây morph thành: Chú thỏ 🐰, Ô tô 🚗, Dưa hấu 🍉, Chú gấu 🐻 $\rightarrow$ **“Bin thấy giống chú thỏ! Còn con thấy giống gì?”** (*Bling bling!*).

### Level 7: Món Quà Lịch Sự (In-flight Etiquette)
- **Câu thoại Ba Mẹ đọc**: **“Trên máy bay mình nói nhỏ nhé. Con giúp Bin nào!”**
- **Giao diện**: Khoang hành khách ấm cúng.
- **Tương tác**:
  1. 3 Nút cảm xúc: 🔊 😮 (Nói to) / 🔉 🙂 (Nói vừa) / 🔈 🤫 (Nói khẽ). Bé chạm nút 🔈 🤫 $\rightarrow$ **“Bin nói nhỏ vừa đủ nghe rồi!”** (Hành khách thả tim ❤️).
  2. Chạm vào giày Bin để thu chân lại gọn gàng $\rightarrow$ **“Bin ngồi ngoan, không đạp ghế trước!”** (Hành khách thả tim ❤️).

### Level 8: Lấy Vali & Huy Hiệu Dự Thưởng (Baggage Claim Carousel)
- **Câu thoại Ba Mẹ đọc 1**: **“Máy bay đã dừng hẳn rồi. Bây giờ mình mới mở dây an toàn nhé!”**
  - Chạm lẫy kim loại mở đai an toàn $\rightarrow$ Tiếng **“TÁCH!”**.
- **Câu thoại Ba Mẹ đọc 2**: **“Con tìm giúp Bin chiếc vali màu đỏ có dán hình gấu nhé!”**
  - Băng chuyền xoay tròn với các vali màu sắc rực rỡ, chạm đúng chiếc vali đỏ dán hình gấu 🐻 $\rightarrow$ Pháo hoa tung xòe + **“Hoan hô! Bin tìm đúng vali rồi!”** (*Fanfare*).
- **Phần thưởng**: Bảng vinh danh **“HÀNH KHÁCH NHÍ XUẤT SẮC”** và nhận **Mô hình máy bay đồ chơi** vào bộ sưu tập của Bin!

---

## 3. Cổng Ba Mẹ Toàn Diện (Parent Control Hub)

- Cơ chế mở bảo vệ: **Giữ liên tục 3 giây** với vòng tròn tiến độ cam nổi bật.
- Bảng điều khiển:
  - **Chọn nhanh màn chơi**: 8 nút tròn to từ Level 1 đến Level 8.
  - **Thanh trượt âm lượng hiệu ứng (SFX)**.
  - **Chế độ Giảm chuyển động (Reduced Motion)** cho trẻ nhạy cảm.
  - **Nút Chơi lại từ đầu (Reset)**.
  - **Cẩm nang Y khoa & Tâm lý**: Hướng dẫn chuẩn Mayo Clinic chăm sóc tai khi bay và mẹo giúp bé 3-4 tuổi an tâm.

---

Xin mời bạn xem kế hoạch trên và nhấn **Proceed** hoặc phản hồi để tôi tiến hành xuất bản toàn bộ mã nguồn ngay nhé!
