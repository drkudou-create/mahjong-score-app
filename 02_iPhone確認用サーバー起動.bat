@echo off
cd /d "%~dp0"
echo iPhoneとPCを同じWi-Fiにつないでください。
echo このPCのIPアドレスを確認して、iPhone Safariで http://IPアドレス:8000 を開きます。
echo.
ipconfig | findstr /i "IPv4"
echo.
python -m http.server 8000
pause
