import React, {useEffect, useState} from 'react';
import {Keyboard, SafeAreaView, ToastAndroid, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {URI} from './config';
import Login from './components/Login';
import Loading from './components/Loading';
import Home from './components/Home';

export default function App() {
  const [loadingToken, setLoadingToken] = useState(true);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState('');
  const [contraseña, setPassword] = useState('');

  useEffect(() => {
    async function getSetToken() {
      AsyncStorage.multiGet(
        ['TOKEN', 'USER', 'EMAIL', 'PASSWORD'],
        (error, result) => {
          if (
            !error &&
            result &&
            result[0][1] &&
            result[1][1] &&
            result[2][1] &&
            result[3][1]
          ) {
            setToken(result[0][1]);
            setUser(result[1][1]);
            setEmail(result[2][1]);
            setPassword(result[3][1]);
            login(result[2][1], result[3][1]);
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

  const login = async (emailStore?: string, passwordStore?: string) => {
    setLoadingLogin(true);
    Keyboard.dismiss();
    const loginData = {
      email: emailStore || email,
      password: passwordStore || contraseña,
    };
    const {data} = await axios.post(`${URI}/user_auth`, loginData);
    const {Errors} = data;
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
      const {Token} = data;
      AsyncStorage.multiSet(
        [
          ['TOKEN', Token],
          ['USER', data?.User?.name],
          ['EMAIL', loginData.email],
          ['PASSWORD', loginData.password],
        ],
        () => {
          setToken(Token);
          setUser(data?.User?.name);
          setLoadingLogin(false);
          setLoadingToken(false);
        },
      );
    }
  };

  const logout = () => {
    setLoadingToken(true);
    AsyncStorage.multiRemove(['TOKEN', 'USER', 'EMAIL', 'PASSWORD'], () => {
      setToken('');
      setUser('');
      setPassword('');
      setLoadingToken(false);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {loadingToken ? (
        <Loading />
      ) : token ? (
        <Home onLogout={logout} user={email} token={token} />
      ) : (
        <Login
          email={email}
          password={contraseña}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          loadingLogin={loadingLogin}
          onSubmitLogin={() => login()}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
  },
});
