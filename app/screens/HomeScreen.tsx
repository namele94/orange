import React, {useEffect} from 'react';
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
import {Filter as IFilter, Product} from '../types';
import {useStore} from '../stores/StoreContext.tsx';
import {observer} from 'mobx-react';
import COLORS from '../styles/colors.ts';
import {SafeAreaView} from 'react-native-safe-area-context';
import {filterData} from '../data/mockData.ts';
import ProductCard from '../components/ProductCard.tsx';
import MyImageBg from '../components/MyImageBg.tsx';
import Animated, {FadeInDown, Layout} from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';
import CartButton from '../components/CartButton.tsx';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = props => {
  const {productStore} = useStore();
  const {
    loadProducts,
    filteredProducts,
    activeFilter,
    setFilter,
    cart,
    searchItems,
    search,
  } = productStore;

  useEffect(() => {
    loadProducts();
  }, []);

  function navToCart() {
    props.navigation.navigate('CartStack');
  }

  const renderItem = ({item}: {item: Product}) => <ProductCard item={item} />;
  const renderFilter = ({item}: {item: IFilter}) => (
    <Filter
      title={item.name}
      imageUrl={item.imageUrl}
      isActive={activeFilter.id === item.id}
      onPress={() => setFilter(item)}
    />
  );

  return (
    <MyImageBg>
      <SafeAreaView edges={['right', 'left']} style={styles.mainContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            autoComplete={'off'}
            value={search}
            onChangeText={text => searchItems(text)}
            style={styles.input}
            placeholder={'Search...'}
            placeholderTextColor={COLORS.grayText}
          />
          <Image source={require('../assets/search.png')} />
        </View>
        <FlatList
          data={filterData}
          renderItem={renderFilter}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
          showsVerticalScrollIndicator={false}
        />
        <FlatList
          data={filteredProducts}
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.container}
          columnWrapperStyle={styles.columnContainer}
          showsVerticalScrollIndicator={false}
        />
        <CartButton onPress={navToCart} cartCount={cart.length} />
      </SafeAreaView>
    </MyImageBg>
  );
};

const Filter = ({
  title,
  isActive,
  onPress,
  imageUrl,
}: {
  title: string;
  isActive: boolean;
  onPress: () => void;
  imageUrl: any;
}) => {
  return (
    <Pressable style={styles.filterItemContainer} onPress={onPress}>
      <View
        style={[styles.filterIconContainer, isActive && styles.filterActive]}>
        <FastImage
          resizeMode={'contain'}
          source={imageUrl}
          style={styles.filterIcon}
        />
      </View>
      <Text style={styles.filterText}>{title}</Text>
    </Pressable>
  );
};

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 16,
  },
  container: {
    paddingBottom: 400,
  },
  image: {
    width: '100%',
    height: 140,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  price: {
    color: 'gray',
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#5C0DAC',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
  },
  columnContainer: {
    justifyContent: 'space-evenly',
  },
  filterText: {
    fontSize: 16,
    lineHeight: 16,
    color: COLORS.black,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  filterActive: {
    backgroundColor: COLORS.primary,
  },
  filterContainer: {
    height: width * 0.4,
    width: '100%',
    justifyContent: 'space-around',
    paddingTop: 8,
  },
  filterItemContainer: {
    width: width * 0.2,
    paddingBottom: 8,
    alignItems: 'center',
  },
  headerImgContainer: {
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  cartBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  cartBtnText: {
    color: COLORS.white,
    fontWeight: '700',
    marginLeft: 6,
  },
  cartBtnWrapContainer: {
    marginRight: 8,
  },
  filterIcon: {
    width: 40,
    height: 40,
  },
  filterIconContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderRadius: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
    padding: 8,
    paddingVertical: 10,
    marginHorizontal: 12,
    borderRadius: 10,
  },
  input: {
    fontSize: 18,
    width: '90%',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  cartIcon: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
});

export default observer(HomeScreen);
