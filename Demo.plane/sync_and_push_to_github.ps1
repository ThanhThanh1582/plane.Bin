# PowerShell script: Dong bo toan bo tai nguyen anh va day len GitHub plane.Bin
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$srcDir = "C:\Users\USER\.gemini\antigravity\brain\6f49409f-fe23-4490-984d-4f0e771339c6"
$destDir = "$PSScriptRoot\assets\images"
$repoUrl = "https://github.com/ThanhThanh1582/plane.Bin.git"

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  🚀 TỰ ĐỘNG ĐỒNG BỘ ẢNH & ĐẨY LÊN GITHUB" -ForegroundColor Yellow
Write-Host "  Kho lưu trữ: $repoUrl" -ForegroundColor Yellow
Write-Host "========================================================" -ForegroundColor Cyan

# 1. Tao thu muc assets/images va copy anh
Write-Host "`n[1/3] Đang sao chép toàn bộ hình ảnh JPG/PNG vào assets/images..." -ForegroundColor Green
if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir | Out-Null
}

Copy-Item -Path "$srcDir\*.jpg" -Destination $destDir -Force
Copy-Item -Path "$srcDir\*.png" -Destination $destDir -Force
Write-Host "    -> Đã sao chép thành công toàn bộ hình ảnh vào: $destDir" -ForegroundColor Green

# 2. Git add va commit
Write-Host "`n[2/3] Chuẩn bị Git repository..." -ForegroundColor Green
Set-Location $PSScriptRoot

if (-not (Test-Path ".git")) {
    Write-Host "    -> Khởi tạo Git repository mới..." -ForegroundColor Yellow
    git init
    git branch -M main
}

git remote remove origin 2>$null
git remote add origin $repoUrl

git add .
git commit -m "Cập nhật hoàn thiện Bé Bin Đi Máy Bay: 13 hoạt động, trắc nghiệm hình ảnh và 100% minh họa JPG"

# 3. Git push
Write-Host "`n[3/3] Đang đẩy dữ liệu lên GitHub ($repoUrl)..." -ForegroundColor Green
git push -u origin main --force

Write-Host "`n========================================================" -ForegroundColor Cyan
Write-Host "  ✅ HOÀN TẤT! Dự án đã sẵn sàng trên https://github.com/ThanhThanh1582/plane.Bin" -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Cyan
