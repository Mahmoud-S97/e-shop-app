import React, {useState, useEffect, useCallback, memo} from 'react';
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

const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};

const HomeScreen = props => {
  const {navigation} = props;

  const dispatch = useDispatch();
  const {products, totalAvailableProducts, isLoadingProducts} = useSelector(
    state => state.productsSlice
  );
  const [viewType, setViewType] = useState(constants.LIST);
  const [productsLimit, setProductsLimit] = useState(10);
  const [productsSkipped, setProductsSkipped] = useState(0);
  const [hasMoreData, setHasMoreData] = useState(true);

  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    console.log('Searched-Modal-Value:: ', search);
  }, [search, setSearch]);

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

  const headerBtn1 = () => {
    navigation.navigate(SCREENS.CART);
  };

  const headerBtn2 = () => {
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

  // FlatList-Screen Header
  const RenderFlatListHeader = () => {
    return (
      <View style={GENERAL_STYLES.screen}>
        <ImageBackground
          source={image}
          style={HomeScreenStyles.imageBackground}>
          <HomeHeader
            headerLeftHomeBtn={headerHomeMenuBtn}
            headerRightAction1={headerBtn1}
            headerRightAction2={headerBtn2}
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
  };

  // FlatList-Screen Products Content
  const RenderContentAndFlatListProducts = () => {
    let filteredProducts = [...products];
    if (search.trim()) {
      filteredProducts = filteredProducts.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    console.log('Fetched-Products: ', filteredProducts);
    return (
      <FlatList
        data={filteredProducts}
        keyExtractor={(item, index) => item.id.toString() || index.toString()}
        numColumns={viewType === constants.GRID ? 2 : 1}
        columnWrapperStyle={
          viewType === constants.GRID && {justifyContent: 'space-between'}
        }
        horizontal={false}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMoreProducts}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={RenderFlatListHeader}
        renderItem={({item, index}) => (
          <MemoizedProductComponent item={item} index={index} />
        )}
        ListFooterComponent={RenderFlatListFooter}
        ListEmptyComponent={() => {}} // Will be handled later on..
        initialNumToRender={filteredProducts.length}
        maintainVisibleContentPosition={{minIndexForVisible: 0}}
        keyboardShouldPersistTaps="handled"
      />
    );
  };

  // FlatList-Screen Footer
  const RenderFlatListFooter = () => {
    return (
      <View style={GENERAL_STYLES.container}>
        {isLoadingProducts && hasMoreData && (
          <View style={HomeScreenStyles.footerLoading}>
            <ActivityIndicator size="large" color={COLORS.PRIMARY} />
          </View>
        )}
        <View style={HomeScreenStyles.footerBtnsBox}>
          <MainButton
            style={HomeScreenStyles.feedbackBtn}
            onPress={() => Alert.alert('You pressed the FeedBack Button')}>
            Feedback
          </MainButton>
          <MainButton
            style={HomeScreenStyles.contactBtn}
            onPress={() => Alert.alert('You pressed the ContactUs Button')}>
            Contact Us
          </MainButton>
        </View>
      </View>
    );
  };

  return (
    <View style={GENERAL_STYLES.screen}>
      <RenderContentAndFlatListProducts />
      <SearchProductsModal
        visible={searchModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setSearchModalVisible(false)}
        setSearchState={setSearch}
      />
    </View>
  );
};

export default HomeScreen;
