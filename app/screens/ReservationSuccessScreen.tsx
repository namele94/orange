import React from 'react';
import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton.tsx';
import COLORS from '../styles/colors.ts';
import MyImageBg from '../components/MyImageBg.tsx';

const ReservationSuccessScreen = ({navigation}: any) => {
  const navToMain = () => {
    navigation.navigate('Menu');
  };

  return (
    <MyImageBg>
      <SafeAreaView edges={['bottom', 'top']} style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.title}>
            {'Your reservation has been\nsuccessfully placed!'}
          </Text>
          <Image
            source={require('../assets/success.png')}
            style={styles.icon}
          />
        </View>
        <CustomButton
          onPress={navToMain}
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
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: COLORS.black,
    marginTop: 20,
    marginBottom: 40,
  },
  icon: {
    width: 200,
    height: 200,
  },
  buttonContainer: {
    alignItems: 'center',
    ...Platform.select({
      android: {
        marginBottom: 20,
      },
    }),
  },
});

export default ReservationSuccessScreen;
