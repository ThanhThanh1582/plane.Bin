# PowerShell script: Dong bo toan bo tai nguyen anh va day len GitHub plane.Bin
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$destDir = "$PSScriptRoot\assets\images"
$repoUrl = "https://github.com/ThanhThanh1582/plane.Bin.git"

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  🚀 TỰ ĐỘNG ĐỒNG BỘ ẢNH & ĐẨY LÊN GITHUB" -ForegroundColor Yellow
Write-Host "  Kho lưu trữ: $repoUrl" -ForegroundColor Yellow
Write-Host "========================================================" -ForegroundColor Cyan

# 1. Tao thu muc assets/images
if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir | Out-Null
}

Write-Host "`n[1/3] Đang tìm và sao chép ảnh nhân vật vào assets/images..." -ForegroundColor Green

$possibleDirs = @(
    "$env:USERPROFILE\.gemini\antigravity\brain\6f49409f-fe23-4490-984d-4f0e771339c6",
    "C:\Users\USER\.gemini\antigravity\brain\6f49409f-fe23-4490-984d-4f0e771339c6"
)

$srcDir = $null
foreach ($dir in $possibleDirs) {
    if (Test-Path $dir) {
        $srcDir = $dir
        break
    }
}

if (-not $srcDir) {
    $found = Get-ChildItem -Path "$env:USERPROFILE\.gemini" -Recurse -Directory -Filter "*6f49409f-fe23-4490-984d-4f0e771339c6*" -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($found) { $srcDir = $found.FullName }
}

if ($srcDir) {
    Write-Host "    -> Đã tìm thấy thư mục ảnh: $srcDir" -ForegroundColor Cyan
    Copy-Item -Path "$srcDir\*.jpg" -Destination $destDir -Force
    Copy-Item -Path "$srcDir\*.png" -Destination $destDir -Force
    $count = (Get-ChildItem -Path $destDir -Filter "*.jpg").Count
    Write-Host "    -> Đã sao chép thành công $count file ảnh vào $destDir" -ForegroundColor Green
} else {
    Write-Host "    -> Cảnh báo: Chưa tìm thấy thư mục nguồn ảnh tự động." -ForegroundColor Red
}

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
git add -f assets/images/*
git commit -m "Cập nhật đầy đủ 100% ảnh JPG minh họa và sửa đường dẫn Vercel"

# 3. Git push
Write-Host "`n[3/3] Đang đẩy dữ liệu lên GitHub ($repoUrl)..." -ForegroundColor Green
git push -u origin main --force

Write-Host "`n========================================================" -ForegroundColor Cyan
Write-Host "  ✅ HOÀN TẤT! Dự án đã sẵn sàng trên $repoUrl" -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Cyan
