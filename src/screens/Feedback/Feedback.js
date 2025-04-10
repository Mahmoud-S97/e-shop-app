import React, {useCallback, useEffect, memo} from 'react';
import {View, Text, ImageBackground, ScrollView} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Carousel from 'react-native-reanimated-carousel';
import FeedbackStyles from './FeedbackStyles';
import {COLORS, GENERAL_STYLES} from '../../constants/styles/Styles';
import {LOCAL_IMAGES} from '../../constants/images/LocalImages';
import {getScreenWidth} from '../../utils';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import MainButton from '../../components/Globals/MainButton';
import SCREENS from '../../constants/screens';
import {useDispatch, useSelector} from 'react-redux';
import {fetchReviewersQuotes} from '../../api/General';
import MainHeader from '../../components/Header/MainHeader';
import MenuIcon from '../../components/Globals/MenuIcon';
import FastImage from 'react-native-fast-image';
import Spinner from '../../components/Globals/Spinner';

const Feedback = ({navigation}) => {
  const dispatch = useDispatch();
  const {reviewersQuotes} = useSelector(state => state.userSlice);

  useEffect(() => {
    dispatch(fetchReviewersQuotes());
  }, [navigation, dispatch]);

  const RenderCarouselItem = useCallback(({item}) => {
    return (
      <View style={FeedbackStyles.carouselItemBox}>
        <View style={FeedbackStyles.reviewerImgBox}>
          <FastImage
            style={FeedbackStyles.reviewerImg}
            source={{
              uri: item.image,
              priority: FastImage.priority.high,
              cache: FastImage.cacheControl.immutable
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        <StarRatingDisplay
          rating={item.rating}
          color={COLORS.PRIMARY}
          starSize={35}
          style={{marginVertical: 10}}
        />
        <Text style={FeedbackStyles.reviewerText} numberOfLines={8}>
          {item.quote}
        </Text>
        <Text
          style={FeedbackStyles.reviewerName}
          numberOfLines={1}>{`~ ${item.author}`}</Text>
      </View>
    )
  }, []);

  const MemoizedCarouselItem = memo(RenderCarouselItem);

  return (
    <ScrollView
      style={GENERAL_STYLES.scrollingView}
      showsHorizontalScrollIndicator={false}
      nestedScrollEnabled={true}>
      <MainHeader
        headerLeft={{
          headerLeftBtn1_content: <MenuIcon />,
          headerLeftAction1Styles: {
            width: 95,
            borderRadius: 25
          },
          action1: () => navigation.openDrawer()
        }}
        headerTitle="Feedback"
        headerRight={{}}
      />
      <View style={GENERAL_STYLES.container}>
        <ImageBackground
          style={FeedbackStyles.feedbackBG}
          source={LOCAL_IMAGES.FEEDBACK_BG}>
          <FontAwesome name="star" size={50} color={COLORS.WHITE} />
          <Text style={FeedbackStyles.feedbackText}>Feedback Form</Text>
        </ImageBackground>
        <View style={FeedbackStyles.carouselBox}>
          {reviewersQuotes.length > 0 ? (
            <Carousel
              data={reviewersQuotes}
              loop
              mode='parallax'
              windowSize={3}
              width={getScreenWidth() - 48}
              height={450}
              autoPlay={true}
              autoPlayInterval={3000}
              scrollAnimationDuration={1000}
              renderItem={({item}) => <MemoizedCarouselItem item={item} />}
            />
          ) : <Spinner />}
        </View>
        <View style={FeedbackStyles.footerBtnsBox}>
          <MainButton
            style={FeedbackStyles.shoppingBtn}
            onPress={() => navigation.navigate(SCREENS.HOME)}>
            Shopping
          </MainButton>
          <MainButton
            style={FeedbackStyles.contactBtn}
            onPress={() => navigation.navigate(SCREENS.CONTACT_US)}>
            Contact Us
          </MainButton>
        </View>
      </View>
    </ScrollView>
  );
};

export default Feedback;
