@echo off
chcp 65001 >nul
title 🚀 AUTO PUSH TO GITHUB
echo ========================================================
echo   🚀 ĐANG ĐỒNG BỘ VÀ ĐẨY CODE LÊN GITHUB
echo ========================================================
echo.

cd /d "%~dp0"

echo [1/5] Khởi tạo git và cấu hình origin...
if not exist ".git" (
    git init
)
git remote remove origin >nul 2>&1
git remote add origin https://github.com/ThanhThanh1582/plane.Bin.git

echo.
echo [2/5] Gom tất cả file và ảnh...
git checkout -B main
git add -A
git commit -m "Deploy 100% Comic Line-Art artwork"

echo.
echo [3/5] Thử đồng bộ với nhánh main trên GitHub...
git pull origin main --rebase --allow-unrelated-histories
git push origin main

if %ERRORLEVEL% EQU 0 (
    goto :SUCCESS
)

echo.
echo [4/5] Thử ép nhánh main (Force Push)...
git push -f origin HEAD:main

if %ERRORLEVEL% EQU 0 (
    goto :SUCCESS
)

echo.
echo [5/5] Nhánh main có thể đang bị khóa bảo vệ (Protected Branch).
echo Đang đẩy sang nhánh 'update' để Vercel deploy...
git push -u origin HEAD:update -f

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ ĐÃ ĐẨY THÀNH CÔNG LÊN NHÁNH 'update'!
    goto :SUCCESS
)

echo.
echo ❌ Vẫn có lỗi. Chi tiết thông báo ở trên.
pause
exit /b 1

:SUCCESS
echo.
echo ========================================================
echo   🎉 THÀNH CÔNG RỰC RỠ! ĐÃ ĐẨY LÊN GITHUB!
echo   Vercel sẽ tự động build lại trang web sau 15 giây.
echo   Link: https://plane-bin.vercel.app
echo ========================================================
echo.
pause
