import React, {useEffect, useState} from 'react';
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
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import LargeLogo from '../assets/ivalo-large.png';
import Footer from './Footer';

interface LoginProps {
  loadingLogin: boolean;
  onUsernameChange: (username: string) => void;
  onPasswordChange: (username: string) => void;
  usuario: string;
  contraseña: string;
  onSubmitLogin: () => void;
}

export default function Login({
  loadingLogin,
  onUsernameChange,
  onPasswordChange,
  onSubmitLogin,
  usuario,
  contraseña,
}: LoginProps) {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false),
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    <KeyboardAvoidingView behavior="height">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.subContainer}>
          <View
            style={[
              styles.loginContainer,
              {
                top: isKeyboardVisible ? '2%' : '15%',
                paddingVertical: isKeyboardVisible ? 20 : 35,
              },
            ]}>
            <Image
              source={LargeLogo}
              style={[
                styles.largeLogo,
                {
                  width: isKeyboardVisible ? 139.40625 : 185.875,
                  height: isKeyboardVisible ? 50.8125 : 67.75,
                },
              ]}
            />
            <Text style={styles.inputLabel}>Usuario</Text>
            <TextInput
              placeholderTextColor="#000000"
              selectionColor="#000000"
              style={styles.input}
              maxLength={255}
              autoCorrect={false}
              textContentType="username"
              autoCapitalize="none"
              onChangeText={text => {
                if (!loadingLogin) onUsernameChange(text);
              }}
            />
            <Text style={styles.inputLabel}>Contraseña</Text>
            <TextInput
              placeholderTextColor="#000000"
              selectionColor="#000000"
              style={styles.input}
              autoCapitalize="none"
              secureTextEntry
              textContentType="password"
              onChangeText={text => {
                if (!loadingLogin) onPasswordChange(text);
              }}
            />
            <TouchableOpacity
              disabled={!usuario || !contraseña || loadingLogin}
              onPress={() => onSubmitLogin()}
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
          {!isKeyboardVisible && <Footer />}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  subContainer: {
    alignItems: 'center',
    height: '100%',
  },
  largeLogo: {
    alignSelf: 'center',
  },
  loginContainer: {
    position: 'absolute',
    paddingHorizontal: 35,
    width: '90%',
    backgroundColor: '#fefefe',
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
