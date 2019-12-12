set nginx_path=c:\nginx-1.17.6
echo %nginx_path%
copy /y nginx_conf\movieReactAppLocal.conf %nginx_path%\conf\movieReactAppLocal.conf
start /d %nginx_path% nginx.exe -c conf\movieReactAppLocal.conf