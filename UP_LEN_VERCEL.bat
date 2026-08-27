@echo off
chcp 65001 >nul
title 🚀 FIX VÀ ĐẨY LÊN GITHUB & VERCEL
echo ========================================================
echo   🚀 ĐANG SỬA LỖI PUSH VÀ ĐẨY 100%% CODE + ẢNH LÊN GITHUB
echo ========================================================
echo.

cd /d "%~dp0"

echo [1/4] Chuyển đổi nhánh sang main...
git checkout -B main

echo.
echo [2/4] Cập nhật remote origin...
git remote remove origin >nul 2>&1
git remote add origin https://github.com/ThanhThanh1582/plane.Bin.git

echo.
echo [3/4] Gom toàn bộ file và thư mục image...
git add -A
git add image/* -f
git commit -m "Deploy 100% Comic Line-Art artwork to Vercel"

echo.
echo [4/4] Đang cưỡng chế đẩy lên nhánh main (HEAD:main --force)...
git push -f origin HEAD:main

echo.
echo ========================================================
echo   🎉 THÀNH CÔNG! Đã đẩy toàn bộ code và ảnh lên GitHub!
echo   Vercel sẽ tự động cập nhật sau 10 giây tại:
echo   👉 https://plane-bin.vercel.app
echo ========================================================
echo.
pause
