import React from 'react';
import Header from './Header';
import HomeBody from './HomeBody';
import Footer from './Footer';

interface HomeProps {
  token: string;
  user: string;
  onLogout: () => void;
}

export default function Home({onLogout, token, user}: HomeProps) {
  return (
    <>
      <Header onLogout={() => onLogout()} user={user} />
      <HomeBody token={token} />
      <Footer />
    </>
  );
}
