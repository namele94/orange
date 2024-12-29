import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
} from 'react-native';
import {Product} from '../types';
import COLORS from '../styles/colors.ts';
import FastImage from 'react-native-fast-image';
import {useStore} from '../stores/StoreContext.tsx';
import {observer} from 'mobx-react';
import CartCounterButton from './CartCounterButton.tsx';
import {Swipeable} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

interface ItemViewProps {
  item: Product;
}

const CartItemView: React.FC<ItemViewProps> = ({item}) => {
  const {productStore} = useStore();
  const {handleMinus, handlePlus, removeFromCart} = productStore;
  const quantity = productStore.getItemQuantity(item.id);

  const renderRightActions = () => (
    <Pressable
      onPress={() => removeFromCart(item.id)}
      style={styles.removeButton}>
      <Image
        source={require('../assets/remove.png')}
        style={styles.removeIcon}
      />
    </Pressable>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <LinearGradient
        colors={['#FFB285', '#FFEACF']}
        style={{
          marginHorizontal: 10,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: COLORS.primary,
          marginBottom: 10,
        }}>
        <View style={styles.card}>
          {/* Image and Name */}
          <View style={styles.imageContainer}>
            <FastImage
              source={{uri: item.image}}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          {/* Product Info */}
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </View>

          {/* Counter and Total */}
          <View style={styles.actionsContainer}>
            <CartCounterButton
              value={quantity}
              plus={() => handlePlus(item)}
              minus={() => handleMinus(item.id)}
            />
            <Text style={styles.subTotal}>
              ${(quantity * item.price).toFixed(2)}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </Swipeable>
  );
};

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderColor: COLORS.primary,
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 80,
    borderRadius: 12,
  },
  infoContainer: {
    flex: 2,
    paddingLeft: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  name: {
    fontWeight: '300',
    color: COLORS.secondary,
    marginBottom: 20,
  },
  price: {
    color: COLORS.secondary,
    fontWeight: '300',
  },
  actionsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subTotal: {
    fontWeight: '300',
    color: COLORS.black,
    marginRight: 4,
  },
  removeButton: {
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    marginTop: width * 0.005,
    height: width * 0.2,
    borderRadius: 16,
  },
  removeIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.white,
  },
});

export default observer(CartItemView);
