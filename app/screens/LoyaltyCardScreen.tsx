import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import MyImageBg from '../components/MyImageBg.tsx';
import COLORS from '../styles/colors.ts';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../components/CustomButton.tsx';
import {observer} from 'mobx-react';
import {useStore} from '../stores/StoreContext.tsx';

interface EventScreenProps {
  navigation: any;
}

const data = [
  {title: '+1 point', date: '24 June | 12:30'},
  {title: '+1 point', date: '22 July | 12:30'},
  {title: '+1 point', date: '20 Mey | 12:30'},
];

const LoyaltyCardScreen: React.FC<EventScreenProps> = props => {
  const {productStore} = useStore();
  const {addLoyalty, error, loyaltyList, clearLoyalty} = productStore;
  const [code, setCode] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  function showModal() {
    setIsVisible(true);
  }
  function closeModal() {
    setIsVisible(false);
  }

  function handleAddLoyalty(_code: string) {
    const res = addLoyalty(code);
    if (res) {
      setCode('');
      closeModal();
    }
  }

  function renderItem({item}: any) {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>+1 point</Text>
        <Text style={styles.itemSubTitle}>{item.date}</Text>
      </View>
    );
  }

  function handleClearLoyalty() {
    clearLoyalty();
    closeModal();
  }

  return (
    <MyImageBg>
      <SafeAreaView edges={['bottom']} style={styles.container}>
        <View style={styles.container}>
          <View style={styles.cardContainer}>
            <View style={styles.cardTitleContainer}>
              <Text style={styles.cardTitle}>Loyalty Card</Text>
              <Text style={styles.cardTitle}>{loyaltyList.length} / 6</Text>
            </View>
            <LinearGradient
              colors={['#FFB285', '#FFEACF']}
              style={{
                marginHorizontal: 10,
                borderRadius: 16,
              }}>
              <Pressable
                onPress={showModal}
                style={{flexDirection: 'row', justifyContent: 'center'}}>
                {loyaltyList.map((_, index) => (
                  <Image
                    key={index}
                    source={require('../assets/meat_fill.png')}
                    style={{
                      resizeMode: 'contain',
                      width: 50,
                      height: 50,
                      paddingRight: 8,
                    }}
                  />
                ))}
                {Array.from({length: 6 - loyaltyList.length}).map(
                  (_, index) => (
                    <Image
                      key={index}
                      source={require('../assets/meat.png')}
                      style={{
                        resizeMode: 'contain',
                        width: 50,
                        height: 50,
                        paddingRight: 8,
                      }}
                    />
                  ),
                )}
              </Pressable>
            </LinearGradient>
          </View>
          <Text style={styles.aboutText}>
            {
              'Promotion terms and conditions:\nOrder our signature steak 6 times and get 7 absolutely free'
            }
          </Text>
          <Text style={styles.listTitle}>History Rewards</Text>
          <FlatList
            data={loyaltyList}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
          />
        </View>
      </SafeAreaView>
      {isVisible && (
        <ModalView
          addLoyalty={handleAddLoyalty}
          code={code}
          setCode={setCode}
          close={closeModal}
          error={error}
          isFull={loyaltyList.length === 6}
          reset={handleClearLoyalty}
        />
      )}
    </MyImageBg>
  );
};

export default observer(LoyaltyCardScreen);

const ModalView = ({
  close,
  code,
  setCode,
  addLoyalty,
  error,
  isFull,
  reset,
}: any) => {
  return (
    <View style={styles.modalWrapContainer}>
      <View style={styles.modalContainer}>
        {isFull ? (
          <CustomButton
            title={'Reset'}
            onPress={reset}
            containerStyle={styles.modalButton}
          />
        ) : (
          <>
            <View style={styles.inputContainer}>
              <TextInput
                autoCapitalize={'none'}
                style={styles.input}
                placeholder="Enter code"
                placeholderTextColor={COLORS.grayText}
                value={code}
                onChangeText={setCode}
              />
            </View>
            <Text style={styles.invalidCode}>
              {error ? 'Invalid code' : ''}
            </Text>
            <CustomButton
              onPress={() => addLoyalty(code)}
              title={'Ok'}
              containerStyle={styles.modalButton}
            />
            <CustomButton
              title={'Cancel'}
              onPress={close}
              containerStyle={styles.modalButton}
            />
          </>
        )}
      </View>
    </View>
  );
};

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    backgroundColor: COLORS.secondary,
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 20,
  },
  cardTitle: {
    color: COLORS.white,
    fontWeight: 700,
  },
  cardTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  aboutText: {
    fontWeight: '300',
    marginLeft: 20,
    marginVertical: 20,
    lineHeight: 20,
  },
  itemContainer: {
    marginHorizontal: 20,
    marginVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
  },
  itemTitle: {
    fontSize: 16,
  },
  itemSubTitle: {
    color: COLORS.grayText,
    marginVertical: 10,
  },
  listTitle: {
    fontSize: 16,
    marginTop: 20,
    marginLeft: 20,
  },
  modalButton: {
    marginBottom: 10,
    width: '100%',
  },
  inputContainer: {
    height: 55,
    width: '100%',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: COLORS.primary,
    overflow: 'hidden',
    paddingHorizontal: 10,
  },
  invalidCode: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 4,
    color: COLORS.error,
  },
  input: {
    flex: 1,
    color: COLORS.white,
    paddingHorizontal: 20,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayText,
    margin: 8,
  },
  modalWrapContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    justifyContent: 'center',
    zIndex: 99999,
    elevation: 1000,
    width: width,
    height: height,
    paddingHorizontal: 8,
  },
  modalContainer: {
    backgroundColor: COLORS.secondary,
    padding: 20,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 40,
  },
});
