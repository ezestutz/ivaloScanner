import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';

export interface HeaderProps {
  usuario: string;
  logout: () => void;
}

export default function Header({logout, usuario}: HeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>¡Hola, {usuario}!</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={() => logout()}>
        <Text style={styles.headerText}>Salir </Text>
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
