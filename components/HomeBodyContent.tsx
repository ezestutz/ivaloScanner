import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBarcode, faPlus} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
} from 'react-native';
import LargeLogo from '../assets/ivalo-large.png';

interface HomeBodyContentProps {
  loadingScan: boolean;
  openCamera: () => void;
}

export default function HomeBodyContent({
  loadingScan,
  openCamera,
}: HomeBodyContentProps) {
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
    width: 232.34375,
    height: 84.6875,
    marginVertical: 40,
  },
});
