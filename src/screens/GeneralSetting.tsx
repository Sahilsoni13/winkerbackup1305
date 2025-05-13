import Button from '@/component/Button'
import DropdownFeature from '@/component/DropdownFeature'
import HeaderBack from '@/component/HeaderBack'
import NotificationToggle from '@/component/NotificationToggle'
import color, { globalstyle } from '@/styles/global'
import React from 'react'
import { StyleSheet, View } from 'react-native'
/**
 * Component for managing general app settings such as language and theme
 * @returns {JSX.Element} The rendered GeneralSetting component
 */
const GeneralSetting = () => {
    return (
        <View style={[style.container, globalstyle.container]}>
            <HeaderBack
                title={"General Setting"}
                onRightPress={() => console.log("onRightPress")}
            />
            <View style={[style.generalContainer]}>
                <DropdownFeature option={["english", "spain", "hindi", "punjabi"]} defaultvalue='English' description='Choose your preferred app language.' iconSource={require("@/assets/icons/language.png")} title='Language' />
                <NotificationToggle description={"Switch between light mode, dark mode."} iconSource={require("@/assets/icons/theme.png")} title={"Theme"} />
            </View>
            <Button style={[style.button]} variant='outlined' title="Save Update" />
        </View>
    )
}
/**
 * Styles for the GeneralSetting component
 * @type {Object}
 */
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
    },
    generalContainer: {
        marginTop: 32,
        display: "flex",
        flexDirection: "column",
        gap: 32
    },
    button: { position: "absolute", bottom: 20, width: "100%", alignSelf: "center" },
})
export default GeneralSetting
