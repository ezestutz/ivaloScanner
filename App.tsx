import React, {useEffect, useState} from 'react';
import {SafeAreaView, ToastAndroid, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './components/Login';
import Loading from './components/Loading';
import Home from './components/Home';

export default function App() {
  const [loadingToken, setLoadingToken] = useState(false);
  const [token, setToken] = useState('');
  const [user, setUser] = useState('');

  const login = (newToken: string, newUser: string) => {
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    setLoadingToken(true);
    login('', '');
    AsyncStorage.multiRemove(['TOKEN', 'USER'], () => {
      setLoadingToken(false);
    });
  };

  useEffect(() => {
    const autoLogin = async () => {
      setLoadingToken(true);
      AsyncStorage.multiGet(['TOKEN', 'USER'], (error, result) => {
        if (!error && result && result[0][1] && result[1][1]) {
          login(result[0][1], result[1][1]);
        }
        setLoadingToken(false);
      });
    };
    autoLogin();
  }, [login]);

  return (
    <SafeAreaView style={styles.container}>
      {loadingToken ? (
        <Loading />
      ) : token ? (
        <Home onLogout={logout} user={user} token={token} />
      ) : (
        <Login onLogin={login} />
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
