import React from 'react';
import {
  Dimensions,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import COLORS from '../styles/colors.ts';
import MyImageBg from '../components/MyImageBg.tsx';
import {Events} from '../data/mockData.ts';

const eventImages: any = {
  event1: require('../assets/event1.png'),
  event2: require('../assets/event2.png'),
  event3: require('../assets/event3.png'),
  event4: require('../assets/event4.png'),
};

const EventsScreen = (props: any) => {
  const handleNavigate = (event: any) => {
    props.navigation.navigate('Event', {event});
  };

  return (
    <MyImageBg>
      <SafeAreaView edges={['bottom']} style={styles.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 40}}>
          {Events.map(item => (
            <Pressable
              key={item.id}
              onPress={() => handleNavigate(item)}
              style={[styles.buttonContainer, styles.topButton]}>
              <View style={styles.imageWrapper}>
                <ImageBackground
                  source={eventImages[item.id.toLowerCase()]}
                  style={styles.image}>
                  <View style={styles.cartDetailContainer}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <View style={styles.cartTimeContainer}>
                      <Text style={styles.cardTime}>
                        {item.date} | {item.time}
                      </Text>
                    </View>
                  </View>
                </ImageBackground>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </SafeAreaView>
    </MyImageBg>
  );
};

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  buttonContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
  },
  imageWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    width: '100%',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  topButton: {
    paddingTop: 30,
  },
  absolute: {
    position: 'relative',
    bottom: -width * 0.09,
    marginHorizontal: 10,
    borderRadius: 10,
    height: width * 0.16,
  },
  cartDetailContainer: {
    backgroundColor: COLORS.secondary,
    position: 'relative',
    bottom: 0,
    padding: 12,
    paddingHorizontal: 16,
  },
  cardTitle: {
    color: COLORS.white,
  },
  cardTime: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '500',
  },
  cartTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
  },
});

export default EventsScreen;
