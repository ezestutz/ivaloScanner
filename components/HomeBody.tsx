import React, {useState} from 'react';
import Camera from './Camera';
import HomeBodyContent from './HomeBodyContent';

interface HomeBodyProps {
  token: string;
  onLogout: () => void;
}

export default function HomeBody({token, onLogout}: HomeBodyProps) {
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
          closeCamera={() => {
            setCameraVisible(false);
            setLoadingScan(false);
          }}
          onDataSent={() => setLoadingScan(false)}
          onLogout={onLogout}
          token={token}
        />
      ) : (
        <HomeBodyContent loadingScan={loadingScan} openCamera={openCamera} />
      )}
    </>
  );
}
