import React, {useState} from 'react';
import {ToastAndroid} from 'react-native';
import axios from 'axios';
import {URI} from '../config';
import HomeBodyContent from './HomeBodyContent';
import BarcodeScanner from './BarcodeScanner';

interface ScanResponse {
  data: {Errors: string[]; Product: {name: string}};
  status: number;
}

interface HomeBodyProps {
  token: string;
  onLogout: () => void;
}

export default function HomeBody({token, onLogout}: HomeBodyProps) {
  const [showScanner, setShowScanner] = useState(false);
  const [loadingSendBarcode, setLoadingSendBarcode] = useState(false);

  const sendBarcode = async (scannedBarcode: string) => {
    setLoadingSendBarcode(true);
    closeCamera();
    const headers = {
      headers: {'Content-Type': 'application/json', Authorization: token},
    };
    const {data, status}: ScanResponse = await axios.post(
      `${URI}/scanner`,
      {scannedBarcode},
      headers,
    );
    if (status === 401) onLogout();
    else
      ToastAndroid.showWithGravity(
        data.Errors?.length
          ? data.Errors.join(' ')
          : `${data.Product?.name || 'Producto'} escaneado!`,
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    setLoadingSendBarcode(false);
  };

  const closeCamera = async () => {
    setShowScanner(false);
  };

  const openCamera = () => {
    setShowScanner(true);
  };

  return (
    <>
      {showScanner ? (
        <BarcodeScanner closeCamera={closeCamera} onBarcodeRead={sendBarcode} />
      ) : (
        <HomeBodyContent
          loadingScan={loadingSendBarcode}
          openCamera={openCamera}
        />
      )}
    </>
  );
}
