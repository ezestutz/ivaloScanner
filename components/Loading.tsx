import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Logo from '../assets/ivalo.png';

export default function Loading() {
  return (
    <View style={[styles.subContainer, styles.centerSubContainer]}>
      <Image source={Logo} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  subContainer: {
    alignItems: 'center',
  },
  centerSubContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: '15%',
  },
});
