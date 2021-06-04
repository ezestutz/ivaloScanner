import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faCopyright} from '@fortawesome/free-solid-svg-icons';
library.add(faCopyright);

export default function Footer() {
  const today = new Date();
  return (
    <View style={styles.footer}>
      <FontAwesomeIcon color="#555555" icon={faCopyright} />
      <Text style={styles.footerText}> ivalo software</Text>
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
  footerText: {
    fontSize: 15,
    color: '#555555',
  },
});
