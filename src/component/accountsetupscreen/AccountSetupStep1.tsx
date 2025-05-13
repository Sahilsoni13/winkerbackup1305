import color, { globalstyle } from '@/styles/global'
import React, { useState } from 'react'
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import DateOfBirthInput from '../DateOfBirthInput';

/**
 * Component for the first step of account setup, handling date of birth and gender selection
 * @returns {JSX.Element} The rendered account setup step 1 component
 */
const AccountSetupStep1 = () => {

    /** User's selected gender */
    const [gender, setGender] = useState<string>('Male');

    return (
        <>
            <View style={styles.content}>
                {/* date component */}
                <DateOfBirthInput />
                <Text style={[styles.label, globalstyle.text_16_reg_100]}>Gender</Text>
                <View style={styles.genderContainer}>
                    <TouchableOpacity
                        style={[styles.genderButton, gender === 'Male' && styles.selectedGender]}
                        onPress={() => setGender('Male')}
                    >
                        <Image style={{ width: 20, height: 20, tintColor: `${gender === 'Male' ? color.white : color.black}` }} source={require("../../assets/icons/male.png")} />
                        <Text style={[globalstyle.text_16_med_90, gender === 'Male' && globalstyle.text_16_med_white]}> Male</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.genderButton, gender === 'Female' && styles.selectedGender]}
                        onPress={() => setGender('Female')}
                    >
                        <Image style={{ width: 20, height: 20, tintColor: `${gender === 'Female' ? color.white : color.black}` }} source={require("../../assets/icons/female.png")} />
                        <Text style={[globalstyle.text_16_med_90, gender === 'Female' && globalstyle.text_16_med_white]}> Female</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.genderButton, gender === 'Non Binary' && styles.selectedGender]}
                        onPress={() => setGender('Non Binary')}
                    >
                        <Image style={{ width: 20, height: 20, tintColor: `${gender === 'Non Binary' ? color.white : color.black}` }} source={require("../../assets/icons/nonbinary.png")} />
                        <Text style={[globalstyle.text_16_med_90, gender === 'Non Binary' && globalstyle.text_16_med_white]}> Non Binary</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    label: {
        marginBottom: 8.5,
    },
    dateContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 24,
    },
    input: {
        borderRadius: 8,
        padding: 18,
        textAlign: 'center',
        width: "100%"
    },
    genderContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    genderButton: {
        flexDirection: 'row',
        borderRadius: 28,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: color.charcol05,
    },
    selectedGender: {
        backgroundColor: color.charcol100,
    },
});
export default AccountSetupStep1