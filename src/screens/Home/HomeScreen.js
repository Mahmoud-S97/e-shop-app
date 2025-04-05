import React, {useState, useEffect, useCallback, memo, useMemo} from 'react';
import {
  View,
  Text,
  Alert,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeScreenStyles from './HomeScreenStyles';
import {COLORS, GENERAL_STYLES} from '../../constants/styles/Styles';
import HomeHeader from '../../components/Header/Home/HomeHeader';
import constants from '../../constants';
import ProductItem from '../../components/Products/ProductItem';
import MainButton from '../../components/Globals/MainButton';
import {useDispatch, useSelector} from 'react-redux';
import SCREENS from '../../constants/screens';
import {fetchProducts} from '../../api/General';
import SearchProductsModal from '../../components/Home/SearchProductsModal';
import GeneralEmptyMessage from '../../components/Globals/GeneralEmptyMessage';
import Spinner from '../../components/Globals/Spinner';

const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};

const HomeScreen = props => {
  const {navigation} = props;

  const dispatch = useDispatch();
  const {products, totalAvailableProducts, isLoadingProducts} = useSelector(
    state => state.productsSlice
  );
  const cartTotalPrice = useSelector(state => state.cartSlice.totalPrice);
  const [viewType, setViewType] = useState(constants.LIST);
  const [productsLimit, setProductsLimit] = useState(10);
  const [productsSkipped, setProductsSkipped] = useState(0);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [search, setSearch] = useState('');

  const numColumns = viewType === constants.GRID ? 2 : 1;
  const columnWrapperStyle = viewType === constants.GRID && {
    justifyContent: 'space-between'
  };

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts({productsLimit, productsSkipped}));
      setProductsSkipped(productsSkipped => productsSkipped + 10);
    }
  }, [navigation, dispatch]);

  const loadMoreProducts = () => {
    if (isLoadingProducts || !hasMoreData || search.trim()) return;

    if (products.length < totalAvailableProducts) {
      dispatch(fetchProducts({productsLimit, productsSkipped}));
      setProductsSkipped(productsSkipped => productsSkipped + 10);
    } else {
      setHasMoreData(false);
    }
  };

  const RenderProductItem = useCallback(
    ({item, index}) => {
      return (
        <ProductItem key={index} item={item} productsViewType={viewType} />
      );
    },
    [viewType, setViewType]
  );

  const MemoizedProductComponent = memo(RenderProductItem);

  const cartButtonHandler = () => {
    navigation.navigate(SCREENS.CART);
  };

  const userLoginHandler = () => {
    Alert.alert('You pressed Right Action 2');
  };

  const headerHomeMenuBtn = () => {
    navigation.openDrawer();
  };

  const changeViewTypeHandler = useCallback(
    newViewType => {
      setViewType(newViewType);
    },
    [viewType, setViewType]
  );

  // FlatList Data with Conditionally Filtration
  const filteredProducts = useMemo(() => {
    if (!search.trim()) return [...products];

    let filteredProducts = [...products];
    filteredProducts = filteredProducts.filter(product =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
    console.log('Fetched-filteredProducts: ', filteredProducts);
    return filteredProducts;
  }, [search, products]);

  // FlatList-Screen Header
  const RenderFlatListHeader = useCallback(() => {
    return (
      <View style={GENERAL_STYLES.screen}>
        <ImageBackground
          source={image}
          style={HomeScreenStyles.imageBackground}>
          <HomeHeader
            headerLeftHomeBtn={headerHomeMenuBtn}
            headerRightAction1={cartButtonHandler}
            headerRightAction2={userLoginHandler}
          />
          <Text style={HomeScreenStyles.imgBgTitle}>
            Electronics Shopping App
          </Text>
        </ImageBackground>
        <View
          style={[GENERAL_STYLES.container, HomeScreenStyles.customContainer]}>
          <Text style={HomeScreenStyles.productsText}>Products</Text>
          <View style={HomeScreenStyles.filterationBox}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={HomeScreenStyles.searchBox}
              onPress={() => setSearchModalVisible(true)}>
              <FontAwesome name="search" size={20} color={COLORS.PRIMARY} />
              <Text style={HomeScreenStyles.searchTextStyles}>{`${
                search.trim() ? search : 'Search Products...'
              }`}</Text>
            </TouchableOpacity>
            <View style={HomeScreenStyles.viewTypesBox}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={HomeScreenStyles.viewTypeBtn}
                onPress={() => changeViewTypeHandler(constants.LIST)}>
                <Entypo
                  name="menu"
                  size={30}
                  style={[
                    {color: COLORS.SECONDARY},
                    viewType === constants.LIST && {color: COLORS.PRIMARY}
                  ]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                style={HomeScreenStyles.viewTypeBtn}
                onPress={() => changeViewTypeHandler(constants.GRID)}>
                <Entypo
                  name="grid"
                  size={30}
                  style={[
                    {color: COLORS.SECONDARY},
                    viewType === constants.GRID && {color: COLORS.PRIMARY}
                  ]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => changeViewTypeHandler(constants.SINGLE)}>
                <Ionicons
                  name="square"
                  size={22}
                  style={[
                    {color: COLORS.SECONDARY},
                    viewType === constants.SINGLE && {color: COLORS.PRIMARY}
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }, [viewType, setViewType, search]);

  // FlatList-Screen Footer
  const RenderFlatListFooter = useCallback(() => {
    return (
      <View style={GENERAL_STYLES.container}>
        {isLoadingProducts && hasMoreData && <Spinner />}
        {!hasMoreData && (
          <View
            style={[
              HomeScreenStyles.footerBtnsBox,
              cartTotalPrice > 0 && {marginBottom: 70}
            ]}>
            <MainButton
              style={HomeScreenStyles.feedbackBtn}
              onPress={() => navigation.navigate(SCREENS.FEEDBACK)}>
              Feedback
            </MainButton>
            <MainButton
              style={HomeScreenStyles.contactBtn}
              onPress={() => navigation.navigate(SCREENS.CONTACT_US)}>
              Contact Us
            </MainButton>
          </View>
        )}
      </View>
    );
  }, [
    viewType,
    setViewType,
    hasMoreData,
    setHasMoreData,
    isLoadingProducts,
    search,
    cartTotalPrice
  ]);

  return (
    <View style={GENERAL_STYLES.screen}>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item, index) => item.id.toString() || index.toString()}
        key={numColumns}
        numColumns={numColumns}
        columnWrapperStyle={columnWrapperStyle}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMoreProducts}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={RenderFlatListHeader}
        renderItem={({item, index}) => (
          <MemoizedProductComponent item={item} index={index} />
        )}
        ListFooterComponent={RenderFlatListFooter}
        ListEmptyComponent={() =>
          !isLoadingProducts && (
            <GeneralEmptyMessage>No Products Found!</GeneralEmptyMessage>
          )
        }
        initialNumToRender={productsSkipped}
      />
      <SearchProductsModal
        visible={searchModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setSearchModalVisible(false)}
        setSearchState={setSearch}
      />
      {cartTotalPrice > 0 && (
        <MainButton
          style={HomeScreenStyles.orderingBtn}
          onPress={() => navigation.navigate(SCREENS.CART)}>
          {`Order Now $${cartTotalPrice.toFixed(2)}`}
        </MainButton>
      )}
    </View>
  );
};

export default HomeScreen;
