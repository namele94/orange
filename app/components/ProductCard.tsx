import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Product} from '../types';
import COLORS from '../styles/colors.ts';
import {useStore} from '../stores/StoreContext.tsx';
import CounterButton from './CounterButton.tsx';
import FastImage from 'react-native-fast-image';
import {observer} from 'mobx-react';

const ProductCard = ({item}: {item: Product}) => {
  const {productStore} = useStore();
  const {handleMinus, handlePlus} = productStore;
  const quantity = productStore.getItemQuantity(item.id);

  const handleAddToCart = () => {
    productStore.handlePlus(item);
  };

  return (
    <View style={styles.card}>
      <FastImage source={{uri: item.image}} style={styles.image} />

      <View style={styles.header}>
        <Text style={styles.name}>{item.name}</Text>
      </View>

      <View style={styles.nameContainer}>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      <View style={{alignContent: 'flex-end'}}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 16,
    flex: 1,
    marginBottom: 16,
    marginHorizontal: 10,
  },
  image: {
    width: '100%',
    height: width / 2.6,
    borderRadius: 16,
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    height: width * 0.1,
  },
  price: {
    fontWeight: '300',
    color: COLORS.secondary,
    marginTop: 5,
  },
  name: {
    color: COLORS.secondary,
    fontWeight: '300',
  },
  details: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
  counterContainer: {
    marginTop: 10,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '300',
    color: COLORS.secondary,
  },
  icon: {
    width: 18,
    height: 18,
  },
  nameContainer: {
    alignItems: 'center',
  },
});

export default observer(ProductCard);
