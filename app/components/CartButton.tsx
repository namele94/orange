import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import COLORS from '../styles/colors.ts';

const trashIcon = require('../../app/assets/trash.png');

interface CartButtonProps {
  onPress: () => void;
  cartCount: number;
}

const CartButton = (props: CartButtonProps) => {
  return (
    <Pressable style={styles.iconContainer} onPress={props.onPress}>
      <Image source={trashIcon} style={styles.icon} />
      {props.cartCount > 0 && (
        <View style={styles.counter}>
          <Text style={styles.counterText}>{props.cartCount}</Text>
        </View>
      )}
    </Pressable>
  );
};

export default CartButton;

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  icon: {
    width: 90,
    height: 90,
  },
  counter: {
    backgroundColor: COLORS.secondary,
    padding: 3,
    paddingHorizontal: 7,
    borderRadius: 100,
    position: 'relative',
    bottom: width * 0.08,
    right: 5,
  },
  counterText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '600',
  },
});
