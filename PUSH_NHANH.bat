@echo off
chcp 65001 >nul
title 🚀 ĐẨY TOÀN BỘ ẢNH LÊN GITHUB ĐỂ VERCEL TỰ ĐỘNG CHẠY
echo ========================================================
echo   🚀 ĐANG ĐẨY TOÀN BỘ CODE VÀ THƯ MỤC ẢNH LÊN GITHUB
echo ========================================================
echo.

cd /d "C:\Demo.plane"

echo [1/3] Chuẩn bị toàn bộ file và thư mục image...
git init
git add -A
git add image/* -f
git commit -m "Deploy 100% Comic Line-Art artwork"

echo.
echo [2/3] Cấu hình kết nối...
git remote remove origin >nul 2>&1
git remote add origin https://github.com/ThanhThanh1582/plane.Bin.git

echo.
echo [3/3] Đang đẩy lên GitHub...
git push -u origin HEAD:deploy --force
git push -u origin HEAD:main --force

echo.
echo ========================================================
echo   ✅ NẾU CÓ DÒNG THÀNH CÔNG Ở TRÊN:
echo   Mở Vercel https://plane-bin.vercel.app sau 15 giây!
echo ========================================================
echo.
pause
