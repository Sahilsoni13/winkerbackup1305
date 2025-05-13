

import { NotificationToggleProps } from "@/types/type";
import color, { globalstyle } from "@/styles/global";
import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ImageSourcePropType,
    TouchableOpacity,
    Animated
} from "react-native";

/**
 * A toggle switch component for enabling/disabling notifications with an icon and description
 * @param {NotificationToggleProps} props - Component props
 * @param {ImageSourcePropType} props.iconSource - Source for the icon displayed next to the title
 * @param {string} props.description - Descriptive text explaining the toggle's purpose
 * @param {string} props.title - Title of the toggle
 * @returns {JSX.Element} The rendered NotificationToggle component
 */
const NotificationToggle: React.FC<NotificationToggleProps> = ({ iconSource, description, title }) => {

    /** State to track whether the toggle is enabled */
    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    
    /** Animated value for the toggle thumb's horizontal position */

    const translateX = useRef(new Animated.Value(0)).current;
    /**
         * Animates the toggle thumb's position when the enabled state changes
         */
    useEffect(() => {
        Animated.timing(translateX, {
            toValue: isEnabled ? 20 : 0, // Moves the thumb
            duration: 200,
            useNativeDriver: false, // `false` because we're animating layout properties
        }).start();
    }, [isEnabled]);

    /**
     * Toggles the enabled state of the switch
     */
    const toggleSwitch = () => {
        setIsEnabled((prev) => !prev);
    };

    return (
        <View style={styles.container}>
            <Image source={iconSource} style={styles.icon} />
            <View style={styles.textContainer}>
                <Text style={[globalstyle.text_16_bold_100]}>{title}</Text>
                <Text style={[styles.description, globalstyle.text_14_reg_50]}>{description}</Text>
            </View>
            <TouchableOpacity onPress={toggleSwitch} activeOpacity={0.8}>
                <View style={[styles.toggleContainer, isEnabled ? styles.toggleContainerActive : null]}>
                    <Animated.View style={[styles.toggleThumb, { transform: [{ translateX }] }]} />
                </View>
            </TouchableOpacity>
        </View>
    );
};

/**
 * Styles for the NotificationToggle component
 * @type {Object}
 */
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "flex-start",
        backgroundColor: "#FFFFFF",
        justifyContent: "flex-start"
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: "contain",
    },
    textContainer: {
        flex: 1,
        marginLeft: 8,
    },
    description: {
        marginTop: 8.5,
        maxWidth: 215
    },
    toggleContainer: {
        width: 40,
        height: 20,
        borderRadius: 20,
        backgroundColor: color.charcol30,
        justifyContent: "center",
        padding: 2,
    },
    toggleContainerActive: {
        backgroundColor: color.charcol90,
    },
    toggleThumb: {
        width: 16,
        height: 16,
        borderRadius: 10,
        backgroundColor: "#FFFFFF",
        position: "absolute",
        left: 2,
    },
});

export default NotificationToggle;

