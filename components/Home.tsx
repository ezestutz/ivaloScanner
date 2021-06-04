import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  StyleSheet,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
  faBarcode,
  faPlus,
  faSignInAlt,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import LargeLogo from '../assets/ivalo-large.png';

library.add(faSignInAlt, faBarcode);

interface HomeProps {
  usuario: string;
  logout: () => void;
}

export default function Home({usuario, logout}: HomeProps) {
  const [loadingScan, setLoadingScan] = useState(false);

  const onBarcodeScan = (barcode: string) => {
    setLoadingScan(!loadingScan);
    console.log(barcode);
  };

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>¡Hola, {usuario}!</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.headerText}>Salir </Text>
          <FontAwesomeIcon icon={faSignOutAlt} />
        </TouchableOpacity>
      </View>
      <View style={[styles.subContainer, styles.centerSubContainer]}>
        <Image source={LargeLogo} style={styles.largeLogo} />
        <TouchableOpacity
          disabled={loadingScan}
          style={styles.buttonScan}
          onPress={() => onBarcodeScan('need to add camera here')}>
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
    </>
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
  header: {
    width: '100%',
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ced4da',
    backgroundColor: '#ffffff',
  },
  headerText: {
    fontSize: 18,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 7.5,
    borderColor: '#333333',
    paddingVertical: 5,
    paddingHorizontal: 7.5,
    backgroundColor: '#efefef',
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
