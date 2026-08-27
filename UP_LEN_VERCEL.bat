@echo off
chcp 65001 >nul
title 🚀 ĐẨY LÊN GITHUB & VERCEL (TỰ ĐỘNG ĐĂNG NHẬP TRÌNH DUYỆT)
echo ========================================================
echo   🚀 TỰ ĐỘNG MỞ TRÌNH DUYỆT ĐĂNG NHẬP & ĐẨY LÊN VERCEL
echo ========================================================
echo.

cd /d "%~dp0"

echo [1/4] Cấu hình Git Credential Manager (Đăng nhập qua trình duyệt)...
git config credential.helper manager
git config --global credential.helper manager

echo.
echo [2/4] Gom toàn bộ file mã nguồn và thư mục image...
git checkout -B main
git add -A
git add image/* -f
git commit -m "Deploy 100% Comic Line-Art artwork from image/ directory"

echo.
echo [3/4] Đang đẩy lên GitHub...
echo.
echo ********************************************************
echo  NẾU CÓ CỬA SỔ HIỆN LÊN, BẠN BẤM "Sign in with your browser"
echo  ĐỂ HOÀN TẤT ĐẨY LÊN GITHUB NHÉ!
echo ********************************************************
echo.

git push -u origin main --force

if %ERRORLEVEL% EQU 0 (
    goto :SUCCESS
)

echo.
echo Đang thử đẩy sang nhánh update...
git push -u origin HEAD:update --force

if %ERRORLEVEL% EQU 0 (
    goto :SUCCESS
)

echo.
echo ❌ Có lỗi xảy ra trong quá trình push.
pause
exit /b 1

:SUCCESS
echo.
echo ========================================================
echo   🎉 THÀNH CÔNG RỰC RỠ! ĐÃ ĐẨY LÊN GITHUB!
echo   Vercel sẽ tự động cập nhật sau 10 - 15 giây tại:
echo   👉 https://plane-bin.vercel.app
echo ========================================================
echo.
pause
