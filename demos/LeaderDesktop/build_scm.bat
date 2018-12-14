set zip_path=C:\Progra~1\7-Zip

####将需要打包的内容copy到output目录下#####
del /s /q output
mkdir output
#xcopy .\doc\UserMan  .\output\UserMan\ /E /V /F
xcopy .\source\output  .\output\ /E /V /F
#xcopy .\upgrade  .\output\upgrade\ /E /V /F

####打包版本到version_output目录下#####
del /s /q version_output
mkdir version_output
cd output
%zip_path%\7z a -tzip ..\version_output\%JOB_NAME%.zip *  -xr!batch -xr!Ver_Tag -xr!.svn 
