@echo off
chcp 65001 >nul
title 🚀 ĐỒNG BỘ 100%% ẢNH JPG LÊN GITHUB VÀ VERCEL
echo ========================================================
echo   🚀 ĐANG ĐẨY TOÀN BỘ ẢNH COMIC LINE-ART (.JPG) LÊN VERCEL
echo   Repository: https://github.com/ThanhThanh1582/plane.Bin.git
echo ========================================================
echo.

cd /d "C:\Demo.plane"

powershell -NoProfile -ExecutionPolicy Bypass -Command "& { Write-Host '[1/4] Thêm toàn bộ 110 file ảnh JPG...' -ForegroundColor Cyan; git init; git checkout -B main; git add -A; git add image/* -f; git commit -m 'Cap nhat 100% anh JPG Comic Line-Art len Vercel'; Write-Host '[2/4] Ket noi GitHub...' -ForegroundColor Cyan; git remote remove origin 2>$null; git remote add origin https://github.com/ThanhThanh1582/plane.Bin.git; Write-Host '[3/4] Dang day len GitHub (Vui long dang nhap neu co popup)...' -ForegroundColor Yellow; git push -u origin main --force; if ($LASTEXITCODE -eq 0) { Write-Host '========================================================' -ForegroundColor Green; Write-Host '🎉 THANH CONG 100%! Vercel dang cap nhat trang web!' -ForegroundColor Green; Write-Host 'Link: https://plane-bin.vercel.app' -ForegroundColor Green; Write-Host '========================================================' -ForegroundColor Green; } else { Write-Host 'Loi day len GitHub. Thu day qua nhanh update...' -ForegroundColor Red; git push -u origin HEAD:update --force; } }"

echo.
pause
