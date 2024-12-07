cmd /c taskkill /IM node.exe /F
cmd /c taskkill /IM esbuild.exe /F
cmd /c "rimraf node_modules"
cmd /c "rimraf common"
cmd /c "rimraf src"
