import React, { useState } from 'react';
import { View } from 'react-native';
import PaymentScreenStyles from './PaymentScreenStyles';
import { useStripe, CardForm } from '@stripe/stripe-react-native';
import { COLORS, GENERAL_STYLES } from '../../constants/styles/Styles';
import { ScrollView } from 'react-native-gesture-handler';
import MainButton from '../../components/Globals/MainButton';
import GoBackIcon from '../../components/Globals/GoBackIcon';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MainHeader from '../../components/Header/MainHeader';

const PaymentScreen = ({ navigation }) => {

    const { createPaymentMethod } = useStripe();

    const [cardDetails, setCardDetails] = useState(null);

    const handlePayment = async () => {
        if (!cardDetails?.complete) {
            alert('Please enter complete card details');
            return;
        }
        const { paymentMethod, error } = createPaymentMethod({
            type: 'Card',
            card: cardDetails
        });

        if (error) {
            console.log('Payment-Error: ', error);
            alert(error.message);
        } else {
            // Handle Payment!
            console.log('Payment method created:', paymentMethod);
            alert('Payment method created successfully!');
        }
    }

    const goBack = () => {
        navigation.goBack();
    }

    return (
        <View style={GENERAL_STYLES.screen}>
            <MainHeader
                style={{ height: 80 }}
                headerLeft={{
                    headerLeftBtn1_content: <GoBackIcon />,
                    headerLeftBoxStyles: { width: '12.5%' },
                    headerLeftAction1Styles: { backgroundColor: 'transparent' },
                    action1: goBack
                }}
                headerTitle={'Payment'}
                headerRight={{
                    headerRightBtn2_content: (
                        <FontAwesome
                            name="user-circle-o"
                            size={25}
                            color={COLORS.PRIMARY}
                        />
                    ),
                    action2: () => { }
                }}
            />
            <ScrollView style={GENERAL_STYLES.scrollingView}>
                <View style={GENERAL_STYLES.container}>
                    <View style={PaymentScreenStyles.CardFormContainerStyles}>
                        <CardForm
                            style={PaymentScreenStyles.CardFormStyles}
                            onFormComplete={(form) => {
                                setCardDetails(form);
                                console.log('Form completed:', form);
                            }}
                            cardStyle={PaymentScreenStyles.checkoutCardStyles}
                        />
                    </View>
                    <MainButton onPress={handlePayment}>
                        Pay
                    </MainButton>
                </View>
            </ScrollView>
        </View>
    )
}

export default PaymentScreen;