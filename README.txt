CONFIGURACION CPU/VISUAL STUDIO CODE:
---------------------------------------------------------
- Instalar Node.js
- Instalar NPM:
	npm install -g webpack
	npm install -g react
	npm install -g react-dom
- Instalar EXPO (Plataforma de desarrollo React-native):
	npm install -g expo-cli
- Crear aplicacion:
	expo init <nombre proyecto>
- Choose template: blank
- Ejecutar proyecto:
	npm start

CONFIGURACION DISPOSITIVO ANDROID:
---------------------------------------------------------
- Habilitar Opciones para Desarrolladores en Android
- Habilitar Depuración por USB
- Instalar controlador USB Android (adb): https://developer.samsung.com/mobile/android-usb-driver.html
- Descargar App EXPO GO

DEPENDENCIAS CAMARA:
---------------------------------------------------------
expo install expo-media-library
expo install expo-camera