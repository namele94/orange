import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CartScreen from '../../screens/Cart/CartScreen.tsx';
import COLORS from '../../styles/colors';
import ConfirmOrderScreen from '../../screens/Cart/ConfirmOrderScreen.tsx';

const Stack = createStackNavigator();

const CartStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({}) => ({
        headerTintColor: COLORS.white,
        headerBackTitle: 'Back',
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {backgroundColor: COLORS.secondary},
        headerTitleStyle: {fontWeight: '300'},
      })}>
      <Stack.Screen
        name="Cart"
        options={{title: 'Shopping cart'}}
        component={CartScreen}
      />
      <Stack.Screen name="Order" component={ConfirmOrderScreen} />
    </Stack.Navigator>
  );
};

export default CartStack;
