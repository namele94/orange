import React from 'react';
import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import COLORS from '../../styles/colors.ts';
import CustomButton from '../../components/CustomButton.tsx';
import {SafeAreaView} from 'react-native-safe-area-context';
import MyImageBg from '../../components/MyImageBg.tsx';
import {useStore} from '../../stores/StoreContext.tsx';
import {CartItem} from '../../stores/ProductStore.ts';

function generateOrderSummary(cartItems: CartItem[]) {
  const itemsText = cartItems
    .map(
      (item: any) =>
        `${item.name} - ${item.quantity} шт. - $${item.price * item.quantity}`,
    )
    .join('\n');

  return `${itemsText}`;
}

const ConfirmOrderScreen = ({navigation}: any) => {
  const {productStore} = useStore();
  const {cart, clearCart} = productStore;

  const qrCodeValue = generateOrderSummary(cart);

  function navigateToMenu() {
    navigation.navigate('Menu');
    clearCart();
  }

  return (
    <MyImageBg>
      <SafeAreaView edges={['bottom']} style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.successText}>
            {'Your order has been\nsuccessfully placed!'}
          </Text>
          <Image
            source={require('../../assets/success.png')}
            style={styles.icon}
          />

          <View style={styles.qrContainer}>
            <QRCode
              backgroundColor={'transparent'}
              value={qrCodeValue}
              size={120}
              color={COLORS.black}
            />
          </View>
        </View>

        <CustomButton
          onPress={navigateToMenu}
          title={'Back to menu'}
          containerStyle={styles.buttonContainer}
        />
      </SafeAreaView>
    </MyImageBg>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successText: {
    marginTop: 40,
    color: COLORS.black,
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 32,
  },
  qrContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 40,
  },
  button: {
    backgroundColor: '#5C0DAC',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    position: 'absolute',
    bottom: 40,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonContainer: {
    ...Platform.select({
      android: {
        marginBottom: 20,
      },
    }),
  },
  icon: {
    width: 220,
    height: 220,
  },
});

export default ConfirmOrderScreen;
