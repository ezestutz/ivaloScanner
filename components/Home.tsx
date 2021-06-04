import React from 'react';
import Header, {HeaderProps} from './Header';
import HomeBody from './HomeBody';

export default function Home(props: HeaderProps & {token: string}) {
  return (
    <>
      <Header {...props} />
      <HomeBody token={props.token} />
    </>
  );
}
