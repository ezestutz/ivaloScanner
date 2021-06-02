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
  Modal,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import axios from 'axios';

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
        setLoadingLogin(false);
      });
    }
  };

  return (
    <SafeAreaView>
      {(loadingLogin || loadingScan) && (
        <Modal style={{flex: 1}}>
          <ActivityIndicator color="#000000" />
        </Modal>
      )}
      {!token ? (
        <KeyboardAvoidingView behavior="padding">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <TextInput
                placeholder="Username"
                onChangeText={text => setUsername(text)}
              />
              <TextInput
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
              />
              <TouchableOpacity onPress={() => onLoginPress()}>
                <Text>Ingresar</Text>
                <FontAwesomeIcon icon="sign-in" />
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', marginBottom: 15}}>
          <TouchableOpacity>
            <Text>Escanear</Text>
            <FontAwesomeIcon icon="barcode" />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
