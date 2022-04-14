import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';

interface HeaderProps {
  user: string;
  onLogout: () => void;
}

export default function Header({user, onLogout}: HeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>¡Hola, {user}!</Text>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() =>
          Alert.alert('Salir', '¿Salir y cerrar sesión?', [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {text: 'Si, salir', onPress: () => onLogout()},
          ])
        }>
        <Text style={styles.headerText}>Cerrar Sesión </Text>
        <FontAwesomeIcon icon={faSignOutAlt} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ced4da',
    backgroundColor: '#ffffff',
  },
  headerText: {
    fontSize: 18,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 7.5,
    borderColor: '#333333',
    paddingVertical: 5,
    paddingHorizontal: 7.5,
    backgroundColor: '#efefef',
  },
});
