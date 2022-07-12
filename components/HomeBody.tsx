import React, {useCallback, useState} from 'react';
import {ToastAndroid} from 'react-native';
import axios from 'axios';
import {
  BarcodeResult,
  DynamsoftBarcodeReader,
  EnumBarcodeFormat,
} from 'dynamsoft-capture-vision-react-native';
import {URI} from '../config';
import HomeBodyContent from './HomeBodyContent';
import CameraContainer from './Camera';

interface ScanResponse {
  data: {Errors: string[]; Product: {name: string}};
  status: number;
}

interface HomeBodyProps {
  token: string;
  onLogout: () => void;
}

export default function HomeBody({token, onLogout}: HomeBodyProps) {
  const [loadingScan, setLoadingScan] = useState(false);
  const [loadingSendBarcode, setLoadingSendBarcode] = useState(false);
  const [reader, setReader] = useState<DynamsoftBarcodeReader>();

  const closeCamera = async () => {
    await reader?.stopScanning();
    reader?.removeAllResultListeners();
    setReader(undefined);
    setLoadingScan(false);
  };

  const sendBarcode = useCallback(
    async (barcode: string) => {
      setLoadingSendBarcode(true);
      closeCamera();
      const headers = {
        headers: {'Content-Type': 'application/json', Authorization: token},
      };
      const {data, status}: ScanResponse = await axios.post(
        `${URI}/scanner`,
        {barcode},
        headers,
      );
      if (status === 401) onLogout();
      else {
        const msj = data.Errors?.length
          ? data.Errors.join(' ')
          : `${data.Product?.name || 'Producto'} escaneado!`;
        ToastAndroid.showWithGravity(
          msj,
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
        setLoadingSendBarcode(false);
      }
    },
    [reader, closeCamera],
  );

  const getNewReader = async () => {
    await DynamsoftBarcodeReader.initLicense(
      'DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9',
    );
    const newReader = await DynamsoftBarcodeReader.createInstance();
    let settings = await newReader.getRuntimeSettings();
    settings.expectedBarcodesCount = 1;
    settings.barcodeFormatIds =
      EnumBarcodeFormat.BF_ONED |
      EnumBarcodeFormat.BF_QR_CODE |
      EnumBarcodeFormat.BF_PDF417 |
      EnumBarcodeFormat.BF_DATAMATRIX;
    await newReader.updateRuntimeSettings(settings);
    newReader.addResultListener((results: BarcodeResult[]) => {
      const scannedBarcode = results[0]?.barcodeText;
      if (scannedBarcode) sendBarcode(scannedBarcode);
    });
    await newReader.startScanning();
    return newReader;
  };

  const openCamera = async () => {
    setLoadingScan(true);
    const newReader = await getNewReader();
    setReader(newReader);
  };

  return (
    <>
      {reader ? (
        <CameraContainer closeCamera={closeCamera} />
      ) : (
        <HomeBodyContent loadingScan={loadingScan} openCamera={openCamera} />
      )}
    </>
  );
}
