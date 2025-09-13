import React, { useCallback, useEffect } from 'react';
import { View, Text, ImageBackground, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Carousel from 'react-native-reanimated-carousel';
import FeedbackScreenStyles from './FeedbackScreenStyles';
import { COLORS, GENERAL_STYLES } from '../../constants/styles/Styles';
import { LOCAL_IMAGES } from '../../constants/images/LocalImages';
import { getScreenWidth } from '../../utils';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import MainButton from '../../components/Globals/MainButton';
import SCREENS from '../../constants/screens';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviewersQuotes } from '../../api/User';
import MainHeader from '../../components/Header/MainHeader';
import MenuIcon from '../../components/Globals/MenuIcon';
import FastImage from 'react-native-fast-image';
import Spinner from '../../components/Globals/Spinner';

const FeedbackScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { reviewersQuotes } = useSelector(state => state.clientsSlice);

  useEffect(() => {
    dispatch(fetchReviewersQuotes());
  }, [navigation, dispatch]);

  const RenderCarouselItem = useCallback(({ item }) => {
    return (
      <View style={FeedbackScreenStyles.carouselItemBox}>
        <View style={FeedbackScreenStyles.reviewerImgBox}>
          <FastImage
            style={FeedbackScreenStyles.reviewerImg}
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
          style={{ marginVertical: 10 }}
        />
        <Text style={FeedbackScreenStyles.reviewerText} numberOfLines={8}>
          {item.quote}
        </Text>
        <Text
          style={FeedbackScreenStyles.reviewerName}
          numberOfLines={1}>{`~ ${item.author}`}</Text>
      </View>
    );
  }, []);

  return (
    <View style={GENERAL_STYLES.screen}>
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
      <ScrollView
        style={GENERAL_STYLES.scrollingView}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true}>
        <View style={GENERAL_STYLES.container}>
          <ImageBackground
            style={FeedbackScreenStyles.feedbackBG}
            source={LOCAL_IMAGES.FEEDBACK_BG}>
            <FontAwesome name="star" size={50} color={COLORS.WHITE} />
            <Text style={FeedbackScreenStyles.feedbackText}>Feedback Form</Text>
          </ImageBackground>
          <View style={FeedbackScreenStyles.carouselBox}>
            {reviewersQuotes.length > 0 ? (
              <Carousel
                data={reviewersQuotes}
                loop
                mode="parallax"
                windowSize={3}
                width={getScreenWidth() - 48}
                height={450}
                autoPlay={true}
                autoPlayInterval={3000}
                scrollAnimationDuration={1000}
                renderItem={RenderCarouselItem}
              />
            ) : (
              <Spinner />
            )}
          </View>
          <View style={FeedbackScreenStyles.footerBtnsBox}>
            <MainButton
              style={FeedbackScreenStyles.shoppingBtn}
              onPress={() => navigation.navigate(SCREENS.HOME)}>
              Shopping
            </MainButton>
            <MainButton
              style={FeedbackScreenStyles.contactBtn}
              onPress={() => navigation.navigate(SCREENS.CONTACT_US)}>
              Contact Us
            </MainButton>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default FeedbackScreen;
