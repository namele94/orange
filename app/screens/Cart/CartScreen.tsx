import React, {useEffect} from 'react';
import {
  FlatList,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {observer} from 'mobx-react-lite';
import {useStore} from '../../stores/StoreContext';
import COLORS from '../../styles/colors';
import CustomButton from '../../components/CustomButton.tsx';
import CartItemView from '../../components/CartItemView.tsx';
import MyImageBg from '../../components/MyImageBg.tsx';

const emptyIcon = require('../../assets/empty.png');
const CartScreen = ({navigation}: any) => {
  const {productStore} = useStore();
  const {cart, cartTotal, clearCart} = productStore;
  const commission = (cartTotal * 10) / 100;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable style={styles.headerRight} onPress={clearCart}>
          <Image source={require('../../assets/remove.png')} />
        </Pressable>
      ),
    });
  }, []);

  const navigateToConfirmScreen = () => {
    navigation.navigate('Order');
  };
  const navigateToShop = () => {
    navigation.navigate('Shop');
  };

  return (
    <MyImageBg>
      <SafeAreaView edges={['bottom']} style={styles.container}>
        <View style={styles.container}>
          <FlatList
            data={cart}
            keyExtractor={item => item.id}
            renderItem={({item}) => <CartItemView item={item} />}
            contentContainerStyle={{paddingBottom: 100, paddingTop: 20}}
            ListEmptyComponent={<EmptyCartView navToShop={navigateToShop} />}
          />

          {cartTotal > 0 && (
            <View style={styles.bottomContainer}>
              <View style={styles.rowContainer}>
                <Text>Subtotal</Text>
                <Text>${cartTotal}</Text>
              </View>
              <View style={styles.rowContainer}>
                <Text>Commission Total</Text>
                <Text>${commission}</Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.totalAmount}>Total</Text>
                <Text style={styles.totalAmount}>
                  ${cartTotal + commission}
                </Text>
              </View>
              <View style={styles.buttonContainer}>
                <CustomButton
                  outline
                  onPress={navigateToConfirmScreen}
                  title={'Order'}
                />
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    </MyImageBg>
  );
};

const EmptyCartView = ({navToShop}: any) => {
  return (
    <View style={styles.emptyCartContainer}>
      <Image source={emptyIcon} style={styles.emptyIcon} />
      <Text style={styles.emptyCartText}>
        {'Basket is empty\nChoose the first course on the menu'}
      </Text>
      <CustomButton
        onPress={navToShop}
        title={'Choose'}
        containerStyle={{marginTop: 20}}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'right',
  },
  removeText: {
    color: COLORS.error,
    textAlign: 'right',
  },
  emptyCartContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCartIcon: {
    width: 100,
    height: 100,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    marginBottom: 10,
  },
  totalText: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.white,
  },
  bottomContainer: {
    ...Platform.select({
      android: {
        paddingBottom: 20,
      },
    }),
    paddingTop: 10,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 4,
  },
  emptyCartText: {
    fontWeight: '200',
    color: COLORS.black,
    textAlign: 'center',
  },
  emptyCartSubText: {
    color: COLORS.primary,
    marginTop: 20,
    marginBottom: 60,
  },
  emptyIcon: {
    width: 300,
    height: 300,
  },
  headerContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(5, 5, 5, 0.03)',
    paddingVertical: 10,
  },
  cartLengthText: {
    color: COLORS.black,
  },
  headerRight: {
    marginRight: 10,
  },
  headerRightTitle: {
    fontSize: 16,
  },
  cartHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 6,
  },
  cartHeaderTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  totalAmount: {
    color: COLORS.primary,
  },
});

export default observer(CartScreen);
