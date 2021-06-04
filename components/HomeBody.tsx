import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBarcode, faPlus} from '@fortawesome/free-solid-svg-icons';
import {URI} from '../config';
import LargeLogo from '../assets/ivalo-large.png';

export default function HomeBody({token}: {token: string}) {
  const [loadingScan, setLoadingScan] = useState(false);

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };

  const openCamera = () => {
    setLoadingScan(true);
    //OPEN CAMERA TO SCAN
    //WHEN STH IS SCANNED, SEND IT
    sendBarcode('77910516');
  };

  const sendBarcode = async (barcode: string) => {
    console.log(token);
    const {data} = await axios.post(`${URI}/scanner`, {barcode}, headers);
    const {Errors, Product} = data;
    const msj =
      Errors.length > 0
        ? Errors.join('. ')
        : `¡Producto "${Product.nombre}" escaneado!`;
    ToastAndroid.showWithGravity(msj, ToastAndroid.LONG, ToastAndroid.CENTER);
    setLoadingScan(false);
  };

  return (
    <View style={[styles.subContainer, styles.centerSubContainer]}>
      <Image source={LargeLogo} style={styles.largeLogo} />
      <TouchableOpacity
        disabled={loadingScan}
        style={styles.buttonScan}
        onPress={() => openCamera()}>
        <>
          {loadingScan ? (
            <ActivityIndicator
              style={{marginHorizontal: 41}}
              size={32}
              color="#333333"
            />
          ) : (
            <Text style={styles.scanButtonText}>Escanear</Text>
          )}
          <FontAwesomeIcon
            style={{marginRight: 5}}
            color="#333333"
            size={20}
            icon={faPlus}
          />
          <FontAwesomeIcon color="#333333" size={30} icon={faBarcode} />
        </>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  subContainer: {
    alignItems: 'center',
  },
  centerSubContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonScan: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: '#08778b',
    backgroundColor: '#2baabe',
    borderWidth: 1,
    paddingHorizontal: 70,
    paddingVertical: 15,
  },
  scanButtonText: {
    fontSize: 25,
    color: '#333333',
    marginRight: 10,
  },
  largeLogo: {
    width: 240,
    height: 126.375,
    marginVertical: 40,
  },
});
