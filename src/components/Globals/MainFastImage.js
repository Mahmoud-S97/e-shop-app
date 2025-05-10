import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {FAKE_IMAGES} from '../../constants/images/LocalImages';

const MainFastImage = props => {
  return (
    <FastImage
      style={[styles.imageStyles, {...props.style}]}
      source={{
        uri: props.imageSource || FAKE_IMAGES.DEFAULT_IMAGE,
        priority: props.priority || FastImage.priority.high,
        cache: props.cache || FastImage.cacheControl.immutable
      }}
      resizeMode={props.resizeMode || FastImage.resizeMode.cover}
      onLoadStart={props.onLoadStart}
      onProgress={props.onProgress}
      onLoad={props.onLoad}
      onLoadEnd={props.onLoadEnd}
      onError={props.onError}
    />
  );
};

const styles = StyleSheet.create({
  imageStyles: {
    width: '100%',
    height: '100%'
  }
});

export default MainFastImage;
