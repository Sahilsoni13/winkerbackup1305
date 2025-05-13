// import React, { useEffect, useState } from "react";
// import {
//     KeyboardAvoidingView,
//     Platform,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     TouchableWithoutFeedback,
//     Keyboard,
//     View,
//     Image,
//     Pressable,
// } from "react-native";
// import { NavigationProp, useNavigation } from "@react-navigation/native";
// import Input from "@/component/Input";
// import color, { globalstyle } from "@/styles/global";
// import HeaderBack from "@/component/HeaderBack";
// import Checkbox from "@/component/Checkbox";
// import Button from "@/component/Button";
// import { useForm, Controller } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { loginSchema } from "@/validations/loginValidation";

// type LoginFormData = z.infer<typeof loginSchema>;
// /**
//  * Component for user login with form validation, social login options, and navigation
//  * @returns {JSX.Element} The rendered LoginScreen component
//  */

// const LoginScreen = () => {

//     /** State to track if the 'Remember me' checkbox is checked */
//     const [accepted, setAccepted] = useState(false);

//     /** Navigation object to handle screen transitions */
//     const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();

//     /** State to manage keyboard offset for better UX */
//     const [keyboardOffset, setKeyboardOffset] = useState(0);

//     /** Form handling with react-hook-form and zod validation */

//     const {
//         control,
//         handleSubmit,
//         formState: { errors },
//     } = useForm<LoginFormData>({
//         resolver: zodResolver(loginSchema),
//         defaultValues: {
//             email: "",
//             password: "",
//         },
//     });
//     /**
//          * Sets up keyboard listeners to adjust the form offset
//          */
//     useEffect(() => {
//         const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
//             setKeyboardOffset(Platform.OS === 'ios' ? event.endCoordinates.height : 25);
//         });

//         const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
//             setKeyboardOffset(0); // Reset to 0 for better behavior
//         });

//         return () => {
//             keyboardDidShowListener.remove();
//             keyboardDidHideListener.remove();
//         };
//     }, []);

//     /**
//      * Handles form submission and logs the form data
//      * @param {LoginFormData} data - The validated form data
//      */
//     const onSubmit = (data: LoginFormData) => {
//         console.log("Form Data:", data);
//         // Add your login logic here
//     };

//     return (
//         <KeyboardAvoidingView
//             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//             keyboardVerticalOffset={keyboardOffset}
//             style={styles.keyboardAvoidingView}
//         >
//             <View style={[styles.container, globalstyle.container]}>
//                 <HeaderBack />
//                 <ScrollView
//                     showsVerticalScrollIndicator={false} // Scroll indicator dikhne ke liye
//                     contentContainerStyle={styles.scrollContent}
//                     keyboardShouldPersistTaps="always"
//                     style={styles.scrollView}
//                 >
//                     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//                         <View style={styles.contentWrapper}>
//                             <Image source={require("../assets/images/logo.png")} style={styles.logo} />
//                             <Text style={[styles.title, globalstyle.text_24_bold_90]}>Welcome to Winker</Text>
//                             <View style={styles.inputcantiner}>
//                                 <View>
//                                     <Controller
//                                         control={control}
//                                         name="email"
//                                         render={({ field: { onChange, value } }) => (
//                                             <Input
//                                                 label="Email"
//                                                 placeholder="Enter email or username"
//                                                 leftIcon={require("../assets/icons/email.png")}
//                                                 value={value}
//                                                 onChangeText={onChange}
//                                                 error={errors.email?.message}
//                                             />
//                                         )}
//                                     />
//                                     <TouchableOpacity style={{ width: '100%', alignItems: 'flex-end' }} activeOpacity={1}>
//                                         <Pressable onPress={() => navigation.navigate("OtpVerificationScreen")}>
//                                             <Text style={[styles.loginwith, globalstyle.text_14_reg_pur50]}>
//                                                 Login with OTP
//                                             </Text>
//                                         </Pressable>
//                                     </TouchableOpacity>

//                                     <Controller
//                                         control={control}
//                                         name="password"
//                                         render={({ field: { onChange, value } }) => (
//                                             <Input
//                                                 label="Password"
//                                                 placeholder="Enter Password"
//                                                 leftIcon={require("../assets/icons/privacy.png")}
//                                                 secureTextEntry={true}
//                                                 value={value}
//                                                 onChangeText={onChange}
//                                                 error={errors.password?.message}
//                                             />
//                                         )}
//                                     />
//                                 </View>
//                             </View>

//                             <View style={styles.row}>
//                                 <TouchableOpacity onPress={() => setAccepted(!accepted)} style={styles.rememberme}>
//                                     <Checkbox bordercolor={color.charcol20} checked={accepted} onPress={() => setAccepted(!accepted)} />
//                                     <Text style={[globalstyle.text_14_reg_40]}>Remember me</Text>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
//                                     <Text style={globalstyle.text_14_reg_orange}>Forgot Password?</Text>
//                                 </TouchableOpacity>
//                             </View>

//                             <View style={styles.Loginbtn}>
//                                 <Button
//                                     variant="primary"
//                                     title="Login"
//                                     onPress={handleSubmit(onSubmit)}
//                                 />
//                             </View>

//                             <View style={styles.accountInfoContainer}>
//                                 <Text style={[styles.accountinfotext, globalstyle.text_14_reg_40]}>
//                                     Don't have an account?
//                                 </Text>
//                                 <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
//                                     <Text style={[globalstyle.text_14_bold_pur50]}> Sign up</Text>
//                                 </TouchableOpacity>
//                             </View>

//                             <View style={styles.containerline}>
//                                 <View style={styles.line} />
//                                 <Text style={styles.orText}>or login with</Text>
//                                 <View style={styles.line} />
//                             </View>

//                             <View style={styles.socialContainer}>
//                                 <TouchableOpacity style={[globalstyle.border, { padding: 14, borderRadius: 12 }]}>
//                                     <Image source={require("../assets/icons/apple.png")} style={styles.socialIcon} />
//                                 </TouchableOpacity>
//                                 <TouchableOpacity style={[globalstyle.border, { padding: 14, borderRadius: 12 }]}>
//                                     <Image source={require("../assets/icons/goggle.png")} style={styles.socialIcon} />
//                                 </TouchableOpacity>
//                                 <TouchableOpacity style={[globalstyle.border, { padding: 14, borderRadius: 12 }]}>
//                                     <Image source={require("../assets/icons/facebook.png")} style={styles.socialIcon} />
//                                 </TouchableOpacity>
//                             </View>
//                         </View>
//                     </TouchableWithoutFeedback>
//                 </ScrollView>
//             </View>
//         </KeyboardAvoidingView >
//     );
// };

// /**
//  * Styles for the LoginScreen component
//  * @type {Object}
//  */
// const styles = StyleSheet.create({
//     keyboardAvoidingView: {
//         flex: 1,
//     },
//     scrollView: {
//         flex: 1,
//     },
//     scrollContent: {
//         flexGrow: 1,
//     },
//     container: {
//         flex: 1,
//         backgroundColor: color.white,
//         alignItems: "center",
//     },
//     contentWrapper: {
//         width: "100%",
//         alignItems: "center",
//     },
//     inputcantiner: {
//         flexDirection: 'column',
//         width: "100%",
//     },
//     logo: {
//         width: 57,
//         height: 56,
//         marginBottom: 24,
//         marginTop: 6.5,
//     },
//     title: {
//         marginBottom: 20,
//     },
//     row: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         width: "100%",
//         marginTop: 16,
//     },
//     rememberme: {
//         flexDirection: "row",
//         alignItems: "center",
//         gap: 8,
//     },
//     Loginbtn: {
//         width: "100%",
//         marginTop: 32,
//     },
//     accountInfoContainer: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 16,
//     },
//     accountinfotext: {
//         textAlign: 'center',
//     },
//     containerline: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginTop: 47,
//         width: "100%",
//     },
//     line: {
//         flex: 1,
//         height: 1,
//         backgroundColor: color.charcol10,
//     },
//     orText: {
//         marginHorizontal: 10,
//         color: color.black,
//         fontFamily: "Inter_18pt-Regular",
//         fontSize: 12,
//         fontWeight: "400",
//         padding: 5,
//     },
//     socialContainer: {
//         flexDirection: "row",
//         gap: 16,
//         marginTop: 32,
//         paddingBottom: 16
//     },
//     socialIcon: {
//         width: 20,
//         height: 20,
//     },
//     loginwith: {
//         paddingTop: 8,
//         textAlign: "right",
//         marginBottom: 24
//     },
//     // Removed unused styles
// });

// export default LoginScreen;

import React, { useEffect, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    View,
    Image,
    Pressable,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Input from "@/component/Input";
import color, { globalstyle } from "@/styles/global";
import HeaderBack from "@/component/HeaderBack";
import Checkbox from "@/component/Checkbox";
import Button from "@/component/Button";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validations/loginValidation";
import { SafeAreaView } from "react-native-safe-area-context";

type LoginFormData = z.infer<typeof loginSchema>;

const LoginScreen = () => {
    const [accepted, setAccepted] = useState(false);
    const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();
    const [keyboardOffset, setKeyboardOffset] = useState(0);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
            setKeyboardOffset(Platform.OS === 'ios' ? event.endCoordinates.height + 20 : 40);
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardOffset(0);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const onSubmit = (data: LoginFormData) => {
        console.log("Form Data:", data);
        // Add your login logic here
    };

    return (
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={keyboardOffset}
                style={styles.keyboardAvoidingView}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={[styles.container, globalstyle.container]}>
                    <HeaderBack />
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                        keyboardShouldPersistTaps="always"
                        style={styles.scrollView}
                    >
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={styles.contentWrapper}>
                                <Image source={require("../assets/images/logo.png")} style={styles.logo} />
                                <Text style={[styles.title, globalstyle.text_24_bold_90]}>Welcome to Winker</Text>
                                <View style={styles.inputcantiner}>
                                    <Controller
                                        control={control}
                                        name="email"
                                        render={({ field: { onChange, value } }) => (
                                            <Input
                                                label="Email"
                                                placeholder="Enter email or username"
                                                leftIcon={require("../assets/icons/email.png")}
                                                value={value}
                                                onChangeText={onChange}
                                                error={errors.email?.message}
                                            />
                                        )}
                                    />
                                    <TouchableOpacity style={{ width: '100%', alignItems: 'flex-end' }} activeOpacity={1}>
                                        <Pressable onPress={() => navigation.navigate("OtpVerificationScreen")}>
                                            <Text style={[styles.loginwith, globalstyle.text_14_reg_pur50]}>
                                                Login with OTP
                                            </Text>
                                        </Pressable>
                                    </TouchableOpacity>
                                    <Controller
                                        control={control}
                                        name="password"
                                        render={({ field: { onChange, value } }) => (
                                            <Input
                                                label="Password"
                                                placeholder="Enter Password"
                                                leftIcon={require("../assets/icons/privacy.png")}
                                                secureTextEntry={true}
                                                value={value}
                                                onChangeText={onChange}
                                                error={errors.password?.message}
                                            />
                                        )}
                                    />
                                </View>
                                <View style={styles.row}>
                                    <TouchableOpacity onPress={() => setAccepted(!accepted)} style={styles.rememberme}>
                                        <Checkbox bordercolor={color.charcol20} checked={accepted} onPress={() => setAccepted(!accepted)} />
                                        <Text style={[globalstyle.text_14_reg_40]}>Remember me</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                                        <Text style={globalstyle.text_14_reg_orange}>Forgot Password?</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.Loginbtn}>
                                    <Button
                                        variant="primary"
                                        title="Login"
                                        onPress={handleSubmit(onSubmit)}
                                    />
                                </View>
                                <View style={styles.accountInfoContainer}>
                                    <Text style={[styles.accountinfotext, globalstyle.text_14_reg_40]}>
                                        Don't have an account?
                                    </Text>
                                    <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
                                        <Text style={[globalstyle.text_14_bold_pur50]}> Sign up</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.containerline}>
                                    <View style={styles.line} />
                                    <Text style={styles.orText}>or login with</Text>
                                    <View style={styles.line} />
                                </View>
                                <View style={styles.socialContainer}>
                                    <TouchableOpacity style={[globalstyle.border, { padding: 14, borderRadius: 12 }]}>
                                        <Image source={require("../assets/icons/apple.png")} style={styles.socialIcon} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[globalstyle.border, { padding: 14, borderRadius: 12 }]}>
                                        <Image source={require("../assets/icons/goggle.png")} style={styles.socialIcon} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[globalstyle.border, { padding: 14, borderRadius: 12 }]}>
                                        <Image source={require("../assets/icons/facebook.png")} style={styles.socialIcon} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        backgroundColor: color.white,
        alignItems: "center",
    },
    contentWrapper: {
        width: "100%",
        alignItems: "center",
    },
    inputcantiner: {
        flexDirection: 'column',
        width: "100%",
    },
    logo: {
        width: 57,
        height: 56,
        marginBottom: 24,
        marginTop: 6.5,
    },
    title: {
        marginBottom: 20,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 16,
    },
    rememberme: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    Loginbtn: {
        width: "100%",
        marginTop: 32,
    },
    accountInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    accountinfotext: {
        textAlign: 'center',
    },
    containerline: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 47,
        width: "100%",
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: color.charcol10,
    },
    orText: {
        marginHorizontal: 10,
        color: color.black,
        fontFamily: "Inter_18pt-Regular",
        fontSize: 12,
        fontWeight: "400",
        padding: 5,
    },
    socialContainer: {
        flexDirection: "row",
        gap: 16,
        marginTop: 32,
        paddingBottom: 16,
    },
    socialIcon: {
        width: 20,
        height: 20,
    },
    loginwith: {
        paddingTop: 8,
        textAlign: "right",
        marginBottom: 24,
    },
});

export default LoginScreen;