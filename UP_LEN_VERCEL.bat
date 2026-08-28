@echo off
chcp 65001 >nul
title 🚀 ĐẨY LÊN GITHUB & VERCEL - CÙNG BÉ BIN ĐI MÁY BAY
echo ========================================================
echo   🚀 TỰ ĐỘNG ĐẨY MÃ NGUỒN & ẢNH LÊN GITHUB ĐỂ VERCEL DEPLOY
echo ========================================================
echo.

cd /d "C:\Demo.plane"

echo [1/3] Cấu hình Git và kiểm tra remote...
git remote remove origin >nul 2>&1
git remote add origin https://github.com/ThanhThanh1582/plane.Bin.git

echo.
echo [2/3] Gom toàn bộ code, file ảnh gốc và file cấu hình...
git checkout -B main
git add -A
git commit -m "Restore canonical illustrations, fitted 16:10 mobile frame and positive habit guidance"

echo.
echo [3/3] Đang đẩy lên GitHub (nhánh main & update)...
git push -u origin main --force
git push -u origin HEAD:update --force

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo   🎉 THÀNH CÔNG! ĐÃ ĐẨY LÊN GITHUB THÀNH CÔNG!
    echo.
    echo   Vercel đang tự động build và cập nhật sau 10 - 20 giây:
    echo   👉 https://plane-bin.vercel.app/
    echo ========================================================
) else (
    echo.
    echo ⚠️ Nếu gặp lỗi quyền truy cập, vui lòng đăng nhập GitHub trên trình duyệt khi có thông báo.
)

echo.
pause
