import { StyleSheet, Text, View, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useState, useEffect, useRef } from 'react';
import Button from './src/components/Button';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  //Variables lector de barra
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [scanData, setScanData] = useState(null);
  
  //Variables camara
  const [imagen, setImagen] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back) //Camara trasera
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off) //Desactivamos el flash
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () =>{
      MediaLibrary.requestPermissionsAsync(); //Pedimos permiso para acceder a la libreria
      const cameraStatus = await BarCodeScanner.requestPermissionsAsync(); //Pedimos permiso para acceder a la camara
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  },[])

  const sacarFoto = async () => {
    if(cameraRef) {
      try{
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImagen(data.uri);
      } catch(e) {
        console.log(e);
      }
    }
  }

  const guardarImagen = async () => {
    if(imagen){
      try{
        await MediaLibrary.createAssetAsync(imagen);
        alert("El producto se guardo en el historial con exito.")
        setImagen(null);
      }catch(e){
        console.log(e)
      }
    }
  }

  if(hasCameraPermission === false){
    return <Text>Sin acceso a la camara</Text>
  }

  const handleBarCodeScanned = ({type, data}) => {
    setScanData(data);
    console.log(`Data: ${data}`);
    console.log(`Type: ${type}`);
  }

  return (

    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanData && <Button icon={'retweet'} title={'Tap to Scan Again'} onPress={() => setScanData(undefined)} />}
    </View>

   /*  <View style={styles.container}>
      {!imagen ?
      <Camera
        style={styles.camera}
        type={type}
        flashMode={flash}
        ref={cameraRef}
      >
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 30,
        }}>
          <Button icon={'retweet'} onPress={() => {
            setType(type === CameraType.back ? CameraType.front : CameraType.back)
          }}></Button>
          <Button icon={'flash'}
          color={flash === Camera.Constants.FlashMode.off ? 'gray' : '#f1f1f1'}
          onPress={() => {
            setFlash(flash === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off)
          }}></Button>
        </View>
      </Camera>
      :
      <Image source={{uri: imagen}} style={styles.camera}></Image>
      }
      <View>
        {imagen ?
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 50
        }}>
          <Button title={'Escanear'} icon={'retweet'} onPress={() => setImagen(null)}></Button>
          <Button title={'Guardar en historial'} icon={'check'} onPress={guardarImagen}></Button>
        </View>
        :
        <Button title={'Escanea el producto'} icon={'camera'} onPress={sacarFoto}></Button>
        }
      </View>
    </View> */
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  camera: {
    flex: 1,
    borderRadius: 20,
  }
});
