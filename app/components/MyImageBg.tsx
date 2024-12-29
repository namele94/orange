import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';

interface MyImageBgProps {
  children?: React.ReactNode;
  isMenu?: boolean;
}

const MyImageBg = (props: MyImageBgProps) => {
  const {isMenu} = props;
  const source: any = isMenu
    ? require('../assets/bg_drawer.png')
    : require('../assets/bg.png');
  return (
    <ImageBackground
      source={source}
      style={styles.backgroundImage}
      resizeMode={'cover'}>
      {props.children}
    </ImageBackground>
  );
};

export default MyImageBg;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
