@echo off
chcp 65001 >nul
echo ========================================================
echo   🚀 TỰ ĐỘNG ĐỒNG BỘ ẢNH & ĐẨY LÊN GITHUB
echo   Kho lưu trữ: https://github.com/ThanhThanh1582/plane.Bin.git
echo ========================================================
echo.

set "SRC_DIR=C:\Users\USER\.gemini\antigravity\brain\6f49409f-fe23-4490-984d-4f0e771339c6"
set "DEST_DIR=%~dp0assets\images"
set "REPO_URL=https://github.com/ThanhThanh1582/plane.Bin.git"

echo [1/3] Đang sao chép toàn bộ hình ảnh JPG/PNG vào assets\images...
if not exist "%DEST_DIR%" mkdir "%DEST_DIR%"
copy /Y "%SRC_DIR%\*.jpg" "%DEST_DIR%\" >nul
copy /Y "%SRC_DIR%\*.png" "%DEST_DIR%\" >nul
echo     -> Đã sao chép thành công toàn bộ hình ảnh vào: %DEST_DIR%
echo.

echo [2/3] Chuẩn bị Git repository...
cd /d "%~dp0"
if not exist ".git" (
    echo     -> Khởi tạo Git repository mới...
    git init
    git branch -M main
)

git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%

git add .
git commit -m "Cập nhật hoàn thiện Bé Bin Đi Máy Bay: 13 hoạt động, trắc nghiệm hình ảnh và 100%% minh họa JPG"

echo.
echo [3/3] Đang đẩy toàn bộ mã nguồn lên GitHub (%REPO_URL%)...
git push -u origin main --force

echo.
echo ========================================================
echo   ✅ HOÀN TẤT! Dự án đã được đưa lên https://github.com/ThanhThanh1582/plane.Bin
echo ========================================================
pause
