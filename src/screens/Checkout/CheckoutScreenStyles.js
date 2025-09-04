import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/styles/Styles';

const CheckoutScreenStyles = StyleSheet.create({
    CardFormContainerStyles: {
        width: '100%',
        alignSelf: 'center'
    },
    CardFormStyles: {
        minHeight: 250,
        marginVertical: 30,
        backgroundColor: COLORS.WHITE,
        borderRadius: 10,
        borderColor: COLORS.PRIMARY,
        borderWidth: 1
    },
    checkoutCardStyles: {
        backgroundColor: COLORS.WHITE,
        textColor: COLORS.BLACK,
        placeholderColor: COLORS.PRIMARY,
        borderRadius: 10,
        fontSize: 16,
        borderColor: COLORS.PRIMARY,
        borderWidth: 1
    }
});

export default CheckoutScreenStyles;