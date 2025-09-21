import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Modal
} from 'react-native';
import { useSafeAreaInsets, SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SearchProductsModalStyles from './SearchProducts.ModalStyles';
import { COLORS, GENERAL_STYLES } from '../../constants/styles/Styles';
import MainButton from '../Globals/Buttons/MainButton';
import GoBackIcon from '../Globals/Icons/GoBackIcon';

const SearchProductsModal = props => {

  const inset = useSafeAreaInsets();

  const { visible, animationType, transparent, onRequestClose, setSearchState } =
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

  return visible ? (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
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
                    SearchProductsModalStyles.customContainer,
                    Platform.select({ ios: { paddingTop: inset.top, paddingBottom: inset.bottom } })
                  ]}>
                  <View style={SearchProductsModalStyles.modalHeaderStyles}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={SearchProductsModalStyles.backBtn}
                      onPress={onBackButtonPressed}>
                      <GoBackIcon />
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
      </SafeAreaView>
    </SafeAreaProvider>
  ) : null;
};

export default SearchProductsModal;
