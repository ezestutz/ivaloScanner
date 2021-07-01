import React from 'react';
import Header from './Header';
import HomeBody from './HomeBody';
import Footer from './Footer';

interface HomeProps {
  token: string;
  usuario: string;
  onLogout: () => void;
}

export default function Home({onLogout, token, usuario}: HomeProps) {
  return (
    <>
      <Header onLogout={() => onLogout()} usuario={usuario} />
      <HomeBody token={token} />
      <Footer />
    </>
  );
}
