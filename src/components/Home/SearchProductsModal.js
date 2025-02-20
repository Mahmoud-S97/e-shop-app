import React, {useCallback, useEffect, useState, useRef} from 'react';
import {
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import SearchProductsModalStyles from './SearchProducts.ModalStyles';
import {COLORS, GENERAL_STYLES} from '../../constants/styles/Styles';
import MainButton from '../Globals/MainButton';

const SearchProductsModal = props => {
  const {visible, animationType, transparent, onRequestClose, setSearchState} =
    props;

  const searchInputRef = useRef(null);
  const [searchProduct, setSearchProduct] = useState('');

  useEffect(() => {
    if (visible) {
      setTimeout(() => searchInputRef.current?.focus(), 150);
    }
  }, [visible]);

  const onBackButtonPressed = () => {
    setSearchProduct('');
    setSearchState('');
    onRequestClose();
  };

  const onSearchButtonPressed = useCallback(() => {
    if (searchProduct.trim()) {
      setSearchState(searchProduct);
      onRequestClose();
      return;
    }

    onBackButtonPressed();
  }, [searchProduct, setSearchProduct]);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
      <View
        style={[GENERAL_STYLES.screen, SearchProductsModalStyles.customScreen]}>
        <Modal
          visible={visible}
          animationType={animationType}
          transparent={transparent}
          onRequestClose={onRequestClose}>
          <TouchableWithoutFeedback
            onPress={() => Keyboard.dismiss()}
            accessible={false}>
            <View
              style={[
                GENERAL_STYLES.container,
                SearchProductsModalStyles.customContainer
              ]}>
              <View style={SearchProductsModalStyles.modalHeaderStyles}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={SearchProductsModalStyles.backBtn}
                  onPress={onBackButtonPressed}>
                  <FontAwesome6
                    name="arrow-left"
                    size={20}
                    color={COLORS.BLACK}
                  />
                </TouchableOpacity>
                <View style={SearchProductsModalStyles.searchBox}>
                  <TextInput
                    ref={searchInputRef}
                    value={searchProduct}
                    placeholder="Search Products..."
                    placeholderTextColor={COLORS.PRIMARY}
                    onChangeText={setSearchProduct}
                    style={SearchProductsModalStyles.searchInputStyles}
                  />
                  <TouchableOpacity
                    activeOpacity={0.6}
                    style={[
                      SearchProductsModalStyles.clearTextBtn,
                      searchProduct.trim() && {
                        opacity: 1,
                        pointerEvents: 'auto'
                      }
                    ]}
                    onPress={() => setSearchProduct('')}>
                    <FontAwesome
                      name="times-circle"
                      size={20}
                      color={COLORS.PRIMARY}
                    />
                  </TouchableOpacity>
                  <MainButton
                    icon={
                      <FontAwesome
                        name="search"
                        size={20}
                        color={COLORS.PRIMARY}
                      />
                    }
                    style={SearchProductsModalStyles.searchBtn}
                    onPress={onSearchButtonPressed}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SearchProductsModal;
