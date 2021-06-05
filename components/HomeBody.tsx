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

  return (
    <>
      {cameraVisible ? (
        <Camera
          closeCamera={() => setCameraVisible(false)}
          onDataSent={() => setLoadingScan(false)}
          token={token}
        />
      ) : (
        <HomeBodyContent loadingScan={loadingScan} openCamera={openCamera} />
      )}
    </>
  );
}
