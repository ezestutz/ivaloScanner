import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ToastAndroid,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faBarcode, faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import Logo from './assets/ivalo.png';

library.add(faSignInAlt, faBarcode);

export default function App() {
  const [loadingLogin, setLoadingLogin] = useState(true);
  const [loadingScan, setLoadingScan] = useState(false);
  const [token, setToken] = useState('');
  const [usuario, setUsername] = useState('');
  const [contraseña, setPassword] = useState('');

  useEffect(() => {
    async function getSetToken() {
      AsyncStorage.getItem('TOKEN', (error, result) => {
        if (!error && result) setToken(result);
        setLoadingLogin(false);
      });
    }
    if (!token) getSetToken();
  }, [token]);

  const onLoginPress = async () => {
    setLoadingLogin(true);
    Keyboard.dismiss();
    const {data} = await axios.post('http://177.71.157.129:4100/client_auth', {
      usuario,
      contraseña,
    });
    const {Errors, Token} = data;
    if (Errors.length > 0) {
      ToastAndroid.show(Errors.join('. '), ToastAndroid.LONG);
    } else {
      AsyncStorage.setItem('TOKEN', Token, () => {
        setToken(Token);
      });
    }
    setLoadingLogin(false);
  };

  const onBarcodeScan = (barcode: string) => {
    console.log(barcode);
  };

  return (
    <SafeAreaView style={styles.container}>
      {token ? (
        <View style={styles.subContainer}>
          <Image source={Logo} style={[styles.logo, styles.logoMargins]} />
          {loadingScan ? (
            <ActivityIndicator size={50} color="#2baabe" />
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => onBarcodeScan('need to add camera here')}>
              <Text style={styles.buttonText}>Escanear</Text>
              <FontAwesomeIcon color="#007bff" icon={faBarcode} />
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <KeyboardAvoidingView behavior="padding">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.subContainer}>
              <Image source={Logo} style={[styles.logo, {marginBottom: 25}]} />
              <View style={styles.loginContainer}>
                <Text style={styles.title}>Iniciar sesión</Text>
                <Text style={styles.inputLabel}>Usuario</Text>
                <TextInput
                  placeholderTextColor="#000000"
                  selectionColor="#000000"
                  style={styles.input}
                  autoCapitalize="none"
                  onChangeText={text => {
                    if (!loadingLogin) setUsername(text);
                  }}
                />
                <Text style={styles.inputLabel}>Contraseña</Text>
                <TextInput
                  placeholderTextColor="#000000"
                  selectionColor="#000000"
                  style={styles.input}
                  autoCapitalize="none"
                  secureTextEntry
                  onChangeText={text => {
                    if (!loadingLogin) setPassword(text);
                  }}
                />
                <TouchableOpacity
                  disabled={!usuario || !contraseña || loadingLogin}
                  onPress={() => onLoginPress()}
                  style={styles.button}>
                  {loadingLogin ? (
                    <ActivityIndicator color="#007bff" />
                  ) : (
                    <>
                      <Text style={styles.buttonText}>Ingresar</Text>
                      <FontAwesomeIcon color="#007bff" icon={faSignInAlt} />
                    </>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F0F8FF',
  },
  subContainer: {
    alignItems: 'center',
  },
  logo: {
    height: 200,
    width: 200,
  },
  logoMargins: {
    marginBottom: '15%',
  },
  loginContainer: {
    padding: 35,
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderColor: '#ced4da',
    borderWidth: 1,
  },
  title: {
    textAlign: 'center',
    marginVertical: 15,
    fontSize: 30,
  },
  inputLabel: {
    marginBottom: 5,
    marginTop: 15,
    fontSize: 18,
  },
  input: {
    height: 40,
    borderRadius: 5,
    borderColor: '#ced4da',
    borderWidth: 1,
    fontSize: 15,
    color: '#333333',
    textDecorationLine: 'none',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: '#007bff',
    borderWidth: 1,
    margin: 15,
    height: 40,
  },
  buttonText: {
    fontSize: 18,
    color: '#007bff',
    paddingRight: 10,
  },
});
