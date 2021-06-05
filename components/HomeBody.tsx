import React, {useState} from 'react';
import Camera from './Camera';
import HomeBodyContent from './HomeBodyContent';

export default function HomeBody({token}: {token: string}) {
  const [loadingScan, setLoadingScan] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(false);

  const openCamera = () => {
    setLoadingScan(true);
    setCameraVisible(true);
  };

  const closeCamera = () => {
    setLoadingScan(false);
    setCameraVisible(false);
  };

  return (
    <>
      {cameraVisible ? (
        <Camera closeCamera={closeCamera} token={token} />
      ) : (
        <HomeBodyContent loadingScan={loadingScan} openCamera={openCamera} />
      )}
    </>
  );
}
