import React, { useEffect, useState } from 'react';
import {
  View,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
  StyleSheet
} from 'react-native';
import { useSafeAreaInsets, SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const MainModal = props => {

  const inset = useSafeAreaInsets();

  const { visible, animationType, transparent, onRequestClose, style, children } =
    props;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (visible) setMounted(true);
    else {
      const timeout = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [visible]);

  return mounted ? (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        <View
          style={[styles.screen, { ...style?.screen }]}>
          <Modal
            visible={visible}
            animationType={animationType || 'slide'}
            transparent={transparent || true}
            onRequestClose={onRequestClose}>
            <TouchableWithoutFeedback
              onPress={() => Keyboard.dismiss()}
              accessible={false}>
              <View
                style={[
                  styles.container,
                  Platform.select({ ios: { paddingTop: inset.top, paddingBottom: inset.bottom } }),
                  { ...style?.modalContainer }
                ]}>
                {children}
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  ) : null
}; 

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default MainModal;
