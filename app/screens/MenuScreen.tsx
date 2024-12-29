import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useStore} from '../stores/StoreContext.tsx';
import {observer} from 'mobx-react';
import COLORS from '../styles/colors.ts';
import {SafeAreaView} from 'react-native-safe-area-context';
import MyImageBg from '../components/MyImageBg.tsx';
import CartButton from '../components/CartButton.tsx';

const trashIcon = require('../../app/assets/trash.png');

interface MenuScreenProps {
  navigation: any;
}

const MenuScreen: React.FC<MenuScreenProps> = props => {
  const {productStore} = useStore();
  const {navigation} = props;
  const {cart} = productStore;

  return (
    <MyImageBg isMenu={true}>
      <SafeAreaView edges={['right', 'left']} style={styles.mainContainer}>
        <View style={styles.menuContainer}>
          <Text style={styles.title}>{'Orange\nRestaurant'}</Text>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Shop')}>
            <Text style={styles.menuText}>Restaurant</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Reservation')}>
            <Text style={styles.menuText}>Reservation</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('LoyaltyCard')}>
            <Text style={styles.menuText}>Loyalty card</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Contacts')}>
            <Text style={styles.menuText}>Contacts</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Events')}>
            <Text style={styles.menuText}>Events</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <CartButton
        onPress={() => navigation.navigate('CartStack')}
        cartCount={cart.length}
      />
    </MyImageBg>
  );
};

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    letterSpacing: 1,
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 60,
    marginTop: 60,
  },
  menuContainer: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    width: width * 0.7,
    borderRadius: 25,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  menuText: {
    color: COLORS.primary,
    fontSize: 20,
    lineHeight: 21,
    textAlign: 'center',
  },
  icon: {
    width: 90,
    height: 90,
  },
  iconContainer: {
    alignItems: 'flex-end',
    marginBottom: 60,
    marginRight: 20,
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

export default observer(MenuScreen);
