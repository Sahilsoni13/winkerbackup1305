import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageSourcePropType } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import color, { globalstyle } from "@/styles/global";
import { HeaderProps } from "@/types/type";

/**
 * HeaderBack component renders a customizable header with a back button, title (optional), and right icon.
 *
 * @param {HeaderProps} props - The component props.
 * @param {string} [props.title] - The title displayed in the center of the header (optional).
 * @param {ImageSourcePropType} [props.rightIcon] - Optional right-side icon image source.
 * @param {() => void} [props.onRightPress] - Optional function triggered when the right icon is pressed.
 *
 * @returns {JSX.Element} - A header component with a back button, optional title, and optional right icon.
 */

const HeaderBack: React.FC<HeaderProps> = ({ title, rightIcon, onRightPress }) => {
    const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();

    return (
        <View style={styles.container}>
            {/* Back Button (Always on Left) */}
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image style={styles.icon} source={require("../assets/icons/backarrow.png")} />
            </TouchableOpacity>

            {/* Title (Optional) - If No Title, Show Empty View to Maintain Alignment */}
            {title ? (
                <Text style={[globalstyle.heading_3, styles.title]}>{title}</Text>
            ) : (
                <View style={styles.spacer} /> // Empty View to Balance Layout
            )}

            {/* Right Icon (Optional) */}
            {rightIcon ? (
                <TouchableOpacity onPress={onRightPress}>
                    <Image source={rightIcon} style={styles.icon} />
                </TouchableOpacity>
            ) : (
                <View style={styles.spacer} /> // Empty View to Balance Layout
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: color.white,
        paddingVertical: 8,
        width: "100%"
    },
    title: {
        fontFamily: "Inter_18pt-Bold",
        textAlign: "center",
        flex: 1,
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: "contain",
    },
    spacer: {
        width: 24,
    },
});

export default HeaderBack;
