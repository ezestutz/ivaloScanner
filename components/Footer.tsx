import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCopyright} from '@fortawesome/free-solid-svg-icons';
import LargeLogo from '../assets/ivalo.png';

export default function Footer() {
  const today = new Date();
  return (
    <View style={styles.footer}>
      <FontAwesomeIcon color="#555555" icon={faCopyright} />
      <Text style={styles.footerText}>Copyright - {today.getFullYear()}</Text>
      <Image source={LargeLogo} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: '#ced4da',
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 25,
    height: 25,
  },
  footerText: {
    fontSize: 15,
    fontFamily: 'Arial Rounded MT Bold',
    color: '#555555',
    marginHorizontal: 10,
  },
});
