import React from 'react';
import {View, TouchableOpacity, StyleSheet, ToastAndroid} from 'react-native';
import {BarCodeReadEvent, RNCamera} from 'react-native-camera';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {URI} from '../config';
import axios from 'axios';

interface ScanResponse {
  data: {Errors: string[]; Product: {name: string}};
  status: number;
}

interface CameraProps {
  closeCamera: () => void;
  onDataSent: () => void;
  token: string;
  onLogout: () => void;
}

export default function Camera({
  closeCamera,
  onDataSent,
  token,
  onLogout,
}: CameraProps) {
  const headers = {
    headers: {'Content-Type': 'application/json', Authorization: token},
  };

  const sendBarcode = async (barcode: string) => {
    closeCamera();
    const {data, status}: ScanResponse = await axios.post(
      `${URI}/scanner`,
      {barcode},
      headers,
    );
    if (status === 401) onLogout();
    else {
      const msj = data.Errors?.length
        ? data.Errors.join('. ')
        : `${data.Product?.name || 'Producto'} escaneado!`;
      ToastAndroid.showWithGravity(msj, ToastAndroid.LONG, ToastAndroid.CENTER);
      onDataSent();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeCamera}
        onPress={() => closeCamera()}>
        <FontAwesomeIcon size={25} color="#333333" icon={faArrowLeft} />
      </TouchableOpacity>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.auto}
        androidCameraPermissionOptions={{
          title: 'Permiso para usar la cámara',
          message: 'Necesitamos tu permiso para usar la cámara',
          buttonPositive: 'Aceptar',
          buttonNegative: 'Cancelar',
        }}
        captureAudio={false}
        onBarCodeRead={(e: BarCodeReadEvent) =>
          sendBarcode(e.data.replace(/\s+/g, ''))
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
  },
  closeCamera: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    top: '3%',
    left: '3%',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    zIndex: 1,
  },
});
