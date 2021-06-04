import React, {useEffect, useState} from 'react';
import {Keyboard, SafeAreaView, ToastAndroid, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {URI} from './config';
import Login from './components/Login';
import Footer from './components/Footer';
import Loading from './components/Loading';
import Home from './components/Home';

export default function App() {
  const [loadingToken, setLoadingToken] = useState(true);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [token, setToken] = useState('');
  const [usuario, setUsername] = useState('');
  const [contraseña, setPassword] = useState('');

  useEffect(() => {
    async function getSetToken() {
      AsyncStorage.multiGet(
        ['TOKEN', 'USERNAME', 'PASSWORD'],
        (error, result) => {
          if (
            !error &&
            result &&
            result[0][1] &&
            result[1][1] &&
            result[2][1]
          ) {
            setToken(result[0][1]);
            setUsername(result[1][1]);
            setPassword(result[2][1]);
            login(result[1][1], result[2][1]);
          } else {
            if (token)
              ToastAndroid.showWithGravity(
                String('No pudimos iniciar sesión'),
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
              );
            logout();
          }
        },
      );
    }
    getSetToken();
  }, []);

  const login = async (userStore?: string, passwordStore?: string) => {
    setLoadingLogin(true);
    Keyboard.dismiss();
    const loginData = {
      usuario: userStore || usuario,
      contraseña: passwordStore || contraseña,
    };
    const {data} = await axios.post(`${URI}/client_auth`, loginData);
    const {Errors, Token} = data;
    if (Errors.length > 0) {
      setLoadingLogin(false);
      setLoadingToken(false);
      ToastAndroid.showWithGravity(
        Errors.join('. '),
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
      logout();
    } else {
      AsyncStorage.multiSet(
        [
          ['TOKEN', Token],
          ['USERNAME', loginData.usuario],
          ['PASSWORD', loginData.contraseña],
        ],
        () => {
          setToken(Token);
          setLoadingLogin(false);
          setLoadingToken(false);
        },
      );
    }
  };

  const logout = () => {
    setLoadingToken(true);
    AsyncStorage.multiRemove(['TOKEN', 'USERNAME', 'PASSWORD'], () => {
      setToken('');
      setLoadingToken(false);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {loadingToken ? (
        <Loading />
      ) : token && usuario && contraseña ? (
        <Home logout={() => logout()} usuario={usuario} token={token} />
      ) : (
        <Login
          usuario={usuario}
          contraseña={contraseña}
          setUsername={value => setUsername(value)}
          setPassword={value => setPassword(value)}
          loadingLogin={loadingLogin}
          login={() => login()}
        />
      )}
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
  },
});
