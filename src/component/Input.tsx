import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';
import color, { globalstyle } from '../styles/global';
import { CustomInputProps } from '@/types/type';


/**
 * @component Input
 * @description A customizable input field with optional icons and password visibility toggle.
 * 
 * @props
 * @property {string} label - Optional label text displayed above the input.
 * @property {ImageSourcePropType} leftIcon - Image source for the left icon.
 * @property {ImageSourcePropType} rightIcon - Image source for the right icon.
 * @property {TextStyle} labelStyle - Custom styles for the label.
 * @property {boolean} secureTextEntry - Enables password input mode with an eye toggle.
 * @property {TextStyle} inputStyle - Custom styles for the TextInput field.
 * @property {ViewStyle} containerStyle - Custom styles for the input container.
 * @property {TextInputProps} ...props - Additional TextInputProps for customization.
 */


const Input: React.FC<CustomInputProps> = ({
    label,
    leftIcon,
    rightIcon,
    labelStyle,
    secureTextEntry,
    inputStyle,
    containerStyle, // <-- Custom container styles (for border, background, etc.)
    type,
    error,
    ...props
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry);

    return (
        <View>
            {label && <Text style={[globalstyle.text_16_reg_100, labelStyle, { paddingBottom: 8.5 }]}>{label}</Text>}

            <View style={[styles.inputContainer, containerStyle,]}>
                {/* Left Icon */}
                {leftIcon && <Image source={leftIcon} style={[styles.icon, { marginRight: 9 }]} />}

                <TextInput
                    style={[styles.input, inputStyle, secureTextEntry && { paddingRight: 35 }]}
                    secureTextEntry={secureTextEntry ? isPasswordVisible : false}
                    placeholderTextColor={color.charcol50}
                    keyboardType={type}
                    numberOfLines={1}
                    {...props}
                />

                {secureTextEntry ? (
                    <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeIcon}>
                        <Image
                            source={isPasswordVisible ? require('../assets/icons/eyesclose.png') : require('../assets/icons/eyesopen.png')}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                ) : (
                    rightIcon && <Image source={rightIcon} style={[styles.icon]} />
                )}
            </View>

            {error && (
                <Text style={[globalstyle.text_14_reg_40, { color: color.red, marginTop: 4 }]}>
                    {error}
                </Text>
            )}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    label: {
        fontSize: 16,
        fontWeight: 400,
        color: color.charcol100,
        marginBottom: 8,
        fontFamily: "Inter_18pt-Regular"
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E7E7E7',
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 12,
        position: 'relative',
    },
    icon: {
        width: 24,
        height: 24,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#1f2937',
        paddingVertical: 0,
        // lineHeight: 32,
        // textAlignVertical: 'center',
    },
    eyeIcon: {
        position: 'absolute',
        right: 20,
    },
    containertab: {
        flexDirection: 'row',
        backgroundColor: '#f3f4f6',
        borderRadius: 20,
        padding: 4,
    },
    tab: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'transparent',
        marginHorizontal: 4,
    },
    tabText: {
        fontSize: 14,
        fontWeight: '600',
    },
    badge: {
        marginLeft: 8,
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 2,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#fff',
    },



});

export default Input;