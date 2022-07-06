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
  Appearance,
  ToastAndroid,
} from 'react-native';
import axios from 'axios';
import ModalSelector from 'react-native-modal-selector';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {URI} from '../config';
import Footer from './Footer';
import LargeLogo from '../assets/ivalo-large.png';
import LargeLogoWhite from '../assets/ivalo-large-white.png';

interface User {
  id: number;
  name: string;
}

interface BusinessLoginResponse {
  data: {Errors: string[]; Token: string; Users: User[]};
}

interface UserSelectResponse {
  data: {Errors: string[]; Token: string; User: User};
}

interface LoginProps {
  onLogin: (token: string, user: string) => void;
}

export default function Login({onLogin}: LoginProps) {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [temporalToken, setTemporalToken] = useState('');
  const [usersToSelect, setUsersToSelect] = useState<User[]>([]);

  const colorScheme = Appearance.getColorScheme();

  const userLogin = (newToken: string, newUser: string) => {
    setLoadingLogin(true);
    AsyncStorage.multiSet(
      [
        ['TOKEN', newToken],
        ['USER', newUser],
      ],
      () => {
        setLoadingLogin(false);
        onLogin(newToken, newUser);
      },
    );
  };

  const businessLogin = async () => {
    setLoadingLogin(true);
    Keyboard.dismiss();
    const {data}: BusinessLoginResponse = await axios.post(
      `${URI}/business_auth`,
      {email, password},
    );
    if (!data?.Errors?.length) {
      const {Token, Users} = data;
      if (Users?.length === 1) userLogin(Token, Users[0]?.name);
      else {
        setTemporalToken(Token);
        setUsersToSelect(Users);
        setLoadingLogin(false);
      }
    } else {
      setLoadingLogin(false);
      ToastAndroid.showWithGravity(
        data.Errors.join(' '),
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    }
  };

  const selectUser = async (id: number) => {
    setLoadingLogin(true);
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: temporalToken,
      },
    };
    const {data}: UserSelectResponse = await axios.post(
      `${URI}/user_select`,
      {id},
      headers,
    );
    if (!data?.Errors?.length) {
      const {Token, User} = data;
      userLogin(Token, User?.name);
    } else {
      setLoadingLogin(false);
      ToastAndroid.showWithGravity(
        data.Errors.join(' '),
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    }
  };

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
          {!temporalToken && (
            <View
              style={[
                styles.loginContainer,
                {
                  top: isKeyboardVisible ? '2%' : '15%',
                  paddingVertical: isKeyboardVisible ? 20 : 35,
                },
              ]}>
              <Image
                source={colorScheme === 'dark' ? LargeLogoWhite : LargeLogo}
                style={[
                  styles.largeLogo,
                  {
                    width: isKeyboardVisible ? 139.40625 : 185.875,
                    height: isKeyboardVisible ? 50.8125 : 67.75,
                  },
                ]}
              />
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                placeholderTextColor="#000000"
                selectionColor="#000000"
                style={styles.input}
                maxLength={255}
                autoCorrect={false}
                textContentType="emailAddress"
                autoCapitalize="none"
                onChangeText={text => {
                  if (!loadingLogin) setEmail(text);
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
                  if (!loadingLogin) setPassword(text);
                }}
              />
              <TouchableOpacity
                disabled={!email || !password || loadingLogin}
                onPress={businessLogin}
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
          )}
          {!!temporalToken && !!usersToSelect.length && (
            <View
              style={[
                styles.loginContainer,
                {
                  top: isKeyboardVisible ? '2%' : '15%',
                  paddingVertical: isKeyboardVisible ? 20 : 35,
                },
              ]}>
              <Text style={styles.inputLabel}>Continuar como:</Text>
              <TouchableOpacity
                disabled={loadingLogin}
                onPress={() => selectUser(usersToSelect[0].id)}
                style={styles.buttonLogin}>
                <Text style={styles.buttonText}>{usersToSelect[0].name}</Text>
              </TouchableOpacity>
              <ModalSelector
                data={usersToSelect.slice(1)}
                keyExtractor={u => u.id}
                labelExtractor={u => u.name}
                onChange={u => selectUser(u.id)}
                initValue="Elegir usuario"
                disabled={loadingLogin}
              />
            </View>
          )}
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
