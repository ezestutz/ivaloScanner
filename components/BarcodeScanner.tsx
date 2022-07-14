import React from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {BarCodeReadEvent, RNCamera} from 'react-native-camera';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

interface BarcodeScannerProps {
  closeCamera: () => void;
  onBarcodeRead: (barcode: string) => void;
}

const invalidCodeTypes: BarCodeReadEvent['type'][] = [
  'aztec',
  'datamatrix',
  'qr',
];

export default function BarcodeScanner({
  closeCamera,
  onBarcodeRead,
}: BarcodeScannerProps) {
  const handleCodeScan = (e: BarCodeReadEvent) => {
    // Send code only if its barcode
    if (!invalidCodeTypes.includes(e.type)) onBarcodeRead(e.data);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeCamera} onPress={closeCamera}>
        <FontAwesomeIcon size={25} color="#333333" icon={faArrowLeft} />
      </TouchableOpacity>
      <QRCodeScanner
        containerStyle={styles.preview}
        onRead={handleCodeScan}
        flashMode={RNCamera.Constants.FlashMode.off}
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
    backgroundColor: '#2baabe',
    top: '3%',
    left: '3%',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    zIndex: 1,
  },
});
