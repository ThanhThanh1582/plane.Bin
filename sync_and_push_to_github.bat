@echo off
chcp 65001 >nul
title 🚀 SYNC & PUSH TO GITHUB FOR VERCEL DEPLOYMENT
echo ========================================================
echo   🚀 TỰ ĐỘNG ĐỒNG BỘ ẢNH & ĐẨY LÊN GITHUB
echo   Kho lưu trữ: https://github.com/ThanhThanh1582/plane.Bin.git
echo   Vercel: https://plane-bin.vercel.app
echo ========================================================
echo.

cd /d "%~dp0"

echo [1/3] Kiểm tra Git repository...
if not exist ".git" (
    git init
    git branch -M main
)

git remote remove origin >nul 2>&1
git remote add origin https://github.com/ThanhThanh1582/plane.Bin.git

echo.
echo [2/3] Thêm toàn bộ thư mục image, index.html, css, js và vercel.json...
git add -A
git add image/* -f
git add index.html -f
git add vercel.json -f
git add js/* -f
git add css/* -f

git commit -m "Deploy 100% Comic Line-Art artwork from image/ directory to Vercel"

echo.
echo [3/3] Đang đẩy lên GitHub...
git push -u origin main --force

echo.
echo ========================================================
echo   ✅ HOÀN TẤT! Vercel sẽ tự động build trang web trong 10-20 giây.
echo   Link web: https://plane-bin.vercel.app
echo ========================================================
pause
