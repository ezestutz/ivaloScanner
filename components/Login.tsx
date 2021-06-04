import React from 'react';
import {
  Keyboard,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  StyleSheet,
} from 'react-native';
import LargeLogo from '../assets/ivalo-large.png';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faBarcode, faSignInAlt} from '@fortawesome/free-solid-svg-icons';
library.add(faSignInAlt, faBarcode);

interface LoginProps {
  loadingLogin: boolean;
  setUsername: (username: string) => void;
  setPassword: (username: string) => void;
  usuario: string;
  contraseña: string;
  login: () => void;
}

export default function Login({
  loadingLogin,
  setUsername,
  setPassword,
  login,
  usuario,
  contraseña,
}: LoginProps) {
  return (
    <KeyboardAvoidingView behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.subContainer}>
          <Image source={LargeLogo} style={[styles.largeLogo]} />
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
              onPress={() => login()}
              style={styles.buttonLogin}>
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
  );
}
const styles = StyleSheet.create({
  subContainer: {
    alignItems: 'center',
  },
  largeLogo: {
    width: 240,
    height: 126.375,
    marginVertical: 40,
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
    paddingHorizontal: 20,
  },
  buttonLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: '#007bff',
    borderWidth: 1,
    marginTop: 25,
    height: 40,
    paddingHorizontal: 70,
  },
  buttonText: {
    fontSize: 18,
    color: '#007bff',
    paddingRight: 10,
  },
});
