import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Login from './components/Login';
import Loading from './components/Loading';
import Home from './components/Home';

export default function App() {
  const [loadingToken, setLoadingToken] = useState(false);
  const [token, setToken] = useState('');
  const [user, setUser] = useState('');

  const login = useCallback((newToken: string, newUser: string) => {
    setToken(newToken);
    setUser(newUser);
  }, []);

  const logout = async () => {
    setLoadingToken(true);
    login('', '');
    await EncryptedStorage.clear();
    setLoadingToken(false);
  };

  useEffect(() => {
    const autoLogin = async () => {
      setLoadingToken(true);
      const oldToken = await EncryptedStorage.getItem('TOKEN');
      const oldUserName = await EncryptedStorage.getItem('USER');
      if (oldToken && oldUserName) login(oldToken, oldUserName);
      setLoadingToken(false);
    };
    autoLogin();
  }, [login]);

  return (
    <SafeAreaView style={styles.container}>
      {loadingToken && <Loading />}
      {!loadingToken && !!token && (
        <Home onLogout={logout} user={user} token={token} />
      )}
      {!loadingToken && !token && <Login onLogin={login} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
