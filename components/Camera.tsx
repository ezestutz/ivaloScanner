import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {DynamsoftCameraView} from 'dynamsoft-capture-vision-react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

interface CameraProps {
  closeCamera: () => void;
}

export default function CameraContainer({closeCamera}: CameraProps) {
  return (
    <View style={styles.container}>
      <DynamsoftCameraView
        style={styles.preview}
        overlayVisible={true}
        scanRegionVisible={true}
        scanRegion={{
          regionTop: 30,
          regionLeft: 15,
          regionBottom: 70,
          regionRight: 85,
          regionMeasuredByPercentage: true,
        }}>
        <TouchableOpacity style={styles.closeCamera} onPress={closeCamera}>
          <FontAwesomeIcon size={25} color="#333333" icon={faArrowLeft} />
        </TouchableOpacity>
      </DynamsoftCameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
  },
  closeCamera: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    top: '3%',
    left: '3%',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    zIndex: 1,
  },
});
