import React, {useState, useEffect, useCallback, memo} from 'react';
import {
  View,
  Text,
  Alert,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
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
import {setProducts} from '../../store/reducers/productsSlice';

const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};

const HomeScreen = props => {
  const {navigation} = props;

  const dispatch = useDispatch();
  const products = useSelector(state => state.productsSlice.products);

  const [viewType, setViewType] = useState(constants.LIST);
  const [productsLimit, setProductsLimit] = useState(10);
  const [productsSkipped, setProductsSkipped] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);

  useEffect(() => {
    console.log('Redux-Products:: ', products);
    if (products.length === 0) {
      loadMoreProductsHandler();
    }
  }, [products, props.navigation]);

  const loadMoreProductsHandler = async () => {
    if (isLoading || !hasMoreData) return;

    setIsLoading(true);

    try {
      const fetchedProducts = await fetch(
        `https://dummyjson.com/products?limit=${productsLimit}&skip=${productsSkipped}`
      );
      const jsonFetchedProducts = await fetchedProducts.json();
      console.log('Json-Products-LoadMore-API:: ', jsonFetchedProducts);
      if (
        jsonFetchedProducts?.products.length > 0 &&
        products.length < jsonFetchedProducts.total
      ) {
        dispatch(setProducts(jsonFetchedProducts.products));
        setProductsSkipped(productsSkipped => productsSkipped + 10);
      } else {
        setHasMoreData(false);
      }
    } catch (e) {
      console.log('Error while fetching the Products: ', e);
    } finally {
      setIsLoading(false);
    }
  };

  const renderProductItem = useCallback(
    ({item, index}) => {
      return (
        <ProductItem key={index} item={item} productsViewType={viewType} />
      );
    },
    [viewType, setViewType]
  );

  const MemoizedProductComponent = memo(renderProductItem);

  const renderFooter = () => {
    return isLoading && hasMoreData ? (
      <View style={HomeScreenStyles.footerSection}>
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
      </View>
    ) : null;
  };

  const headerBtn1 = () => {
    Alert.alert('You pressed Right Action 1');
  };

  const headerBtn2 = () => {
    Alert.alert('You pressed Right Action 2');
  };

  const headerHomeMenuBtn = () => {
    navigation.openDrawer();
  };

  const changeViewTypeHandler = newViewType => {
    setViewType(newViewType);
  };

  return (
    <ScrollView
      contentContainerStyle={GENERAL_STYLES.scrollingView}
      showsVerticalScrollIndicator={false}>
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
            <View style={HomeScreenStyles.searchInputBox}>
              <FontAwesome name="search" size={20} color={COLORS.PRIMARY} />
              <TextInput
                style={HomeScreenStyles.searchInputStyles}
                placeholder="Search Products"
                placeholderTextColor={COLORS.PRIMARY}
              />
            </View>
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
          <FlatList
            data={products}
            keyExtractor={(item, index) =>
              item.id.toString() || index.toString()
            }
            numColumns={
              viewType === constants.LIST || viewType === constants.SINGLE
                ? 1
                : 2
            }
            horizontal={false}
            showsVerticalScrollIndicator={false}
            onEndReached={loadMoreProductsHandler}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            renderItem={({item, index}) => (
              <MemoizedProductComponent item={item} index={index} />
            )}
            initialNumToRender={products.length}
            maintainVisibleContentPosition={{minIndexForVisible: 0}}
          />
          <View style={HomeScreenStyles.footerBtnsBox}>
            <MainButton
              style={HomeScreenStyles.feedbackBtn}
              onPress={() => alert('You pressed the FeedBack Button')}>
              Feedback
            </MainButton>
            <MainButton
              style={HomeScreenStyles.contactBtn}
              onPress={() => alert('You pressed the ContactUs Button')}>
              Contact Us
            </MainButton>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
