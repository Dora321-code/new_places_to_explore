import React, { useState, useReducer, useCallback, useEffect } from "react";
import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ToastAndroid
} from "react-native";
import { NavigationAction } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SCREEN_HEIGHT, SCREEN_WIDTH, STATUS_BAR_HEIGHT } from "../../constants";
import Input from "../../components/Input";
import { useDispatch } from "react-redux";
import * as authActions from "../../context/actions/auth";
import { FORM_INPUT_UPDATE, formReducer } from "../../context/reducers/formReducer";
import * as Network from 'expo-network';

export default function LoginSreen(props) {
  const [hidePassword, sethidePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setpassword] = useState();
  const dispatch = useDispatch();
  const [error, setError] = useState();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const checkNetwork = async () => {
   const netdata = await Network.getNetworkStateAsync();
   if (!netdata.isConnected) {
    ToastAndroid.show('Your not connected to internet connect to continue !', ToastAndroid.SHORT);
   }

  }

  useEffect(() => {
    checkNetwork();
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const SignInHandler = async () => {
    let action;
      action = authActions.login(
        formState.inputValues.email,
        password
      );
    setError(null);
    setIsLoading(true);
    try {
    await dispatch(action);
      props.navigation.navigate('Home');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const changePassword = (text) => {
   setpassword(text)
  }

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
      
    },
    [dispatchFormState]
  );
  

  const _loadingDeg = new Animated.Value(0)

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && (
        <View style={styles.loadingWrapper}>
          <View style={styles.loading}>
            <Animated.Image
            //   onLayout={_animationLoadingDeg}
              style={{
                width: 30,
                height: 30,
                marginRight: 10,
                transform: [
                  {
                    rotate: _loadingDeg.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0deg", "360deg"],
                    }),
                  },
                ],
              }}
              source={require("../../assets/waiting.png")}
            />
            <Text
              style={{
                fontWeight: "500",
              }}
            >
              Loging in...
            </Text>
          </View>
        </View>
      )}
      <View style={styles.languageChooser}>
        <TouchableOpacity style={styles.btnCurLanguage}>
         
          <Ionicons name="chevron-down" size={20} color="#333" />
        </TouchableOpacity>
      </View>
      <View style={styles.centerContainer}>
        <View style={styles.logoWrapper}>
          {/* <Image
            resizeMode="contain"
            style={styles.logo}
            source={require("../../assets/SplashImage.png")}
          /> */}
           <Text style={styles.curLanguage}>Login to your account</Text>
        </View>
        <View style={styles.loginForm}>
          <View style={styles.textInputWrapper}>
            <Input
                id='email'
                required
                email
                autoFocus={true}
                placeholder="Email"
                keyboardType="email-address"
                returnKeyType="next"
                errorText="Please enter a valid email address."
                onInputChange={inputChangeHandler}
                initialValue=""
            />
          </View>
          <View style={styles.textInputWrapper}>
          <View
                style={{
                }}
              >
                 <TextInput
                  id='password'
                  placeholder="password"
                  onChangeText={changePassword}
                  initialValue={password}
                  style={{
                    width: "100%",
                    height: 44,
                    fontSize: 16,
                    paddingRight: 44,
                    paddingLeft: 9,
                    backgroundColor: "rgb(242,242,242)",
                  }}
                  required
                  minLength={5}
                  errorText="Please enter a strong password."
                  // keyboardType='visible-password'
                  returnKeyType="done"
                />
              </View>
            {/* <TouchableOpacity
              style={styles.hidePasswordIcon}
            //   onPress={_onPressToggleHidePassword}
            >
              {hidePassword ? (
                <Ionicons name="eye-off-outline" size={20} color="#333" />
              ) : (
                <Ionicons name="eye-outline" color="#318bfb" size={20} />
              )}
            </TouchableOpacity> */}
          </View>
          <TouchableOpacity
            onPress={SignInHandler}
            // disabled={!allowLogin}
            activeOpacity={0.6}
            style={{
              ...styles.btnLogin,
            //   opacity: allowLogin ? 1 : 0.6,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#fff",
                fontWeight: "500",
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.otherOptionsWrapper}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("ForgotPassword")}
            style={styles.forgotPassword}
            activeOpacity={1}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 12,
                fontWeight: "600",
              }}
            >
              <Text
                style={{
                  fontWeight: "500",
                  color: "#333",
                }}
              >
                Did your forget your login information?
              </Text>{" "}
              Get helping to login.
            </Text>
          </TouchableOpacity>
          <View style={styles.divideLine}>
            <View style={styles.ORtextWrapper}>
              <Text
                style={{
                  color: "#333",
                  fontWeight: "600",
                }}
              >
                OR
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.btnLoginWithFacebook}
          onPress={()=> props.navigation.navigate("Home_without_login")}
          >
            {/* <Icon name="facebook" color="#318bfb" size={20} /> */}
            <Text
              style={{
                color: "#318bfb",
                fontWeight: "bold",
              }}
            >
              continue without login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity activeOpacity={1} style={styles.registerWrapper}
      onPress={()=> {props.navigation.navigate('Register')}}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 12,
            fontWeight: "600",
          }}
        >
          <Text
            style={{
              fontWeight: "500",
              color: "#333",
            }}
          >
            Don't have account?
          </Text>{" "}
          Register now.
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex:1,
    justifyContent:'center',
    height: SCREEN_HEIGHT,
  },
  languageChooser: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  btnCurLanguage: {
    flexDirection: "row",
    alignItems: "center",
  },
  curLanguage: {
    color: "#333",
  },
  centerContainer: {
    height: SCREEN_HEIGHT - 50 - 40 - STATUS_BAR_HEIGHT,
    width: SCREEN_WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
  logoWrapper: {
    marginBottom: 20,
  },
  logo: {
    height: 64,
    overflow: "hidden",
  },
  loginForm: {
    width: SCREEN_WIDTH * 0.9,
  },
  textInputWrapper: {
    position: "relative",
    width: "100%",
    height: 44,
    borderRadius: 5,
    borderColor: "#ddd",
    borderWidth: 1,
    marginVertical: 7.5,
  },
  hidePasswordIcon: {
    position: "absolute",
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    right: 5,
    top: (44 - 30) / 2,
  },
  input: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 15,
  },
  btnLogin: {
    marginTop: 7.5,
    width: "100%",
    height: 44,
    borderRadius: 5,
    backgroundColor: "#318bfb",
    justifyContent: "center",
    alignItems: "center",
  },
  otherOptionsWrapper: {
    width: SCREEN_WIDTH * 0.9,
    justifyContent: "center",
    alignItems: "center",
  },
  forgotPassword: {
    width: SCREEN_WIDTH * 0.8,
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  divideLine: {
    marginVertical: 10,
    position: "relative",
    height: 2,
    width: "100%",
    backgroundColor: "#ddd",
  },
  ORtextWrapper: {
    width: 40,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    top: (2 - 20) / 2,
    left: (SCREEN_WIDTH * 0.9 - 40) / 2,
    position: "absolute",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  btnLoginWithFacebook: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  registerWrapper: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderTopColor: "#ddd",
    borderTopWidth: 1,
  },
  loadingWrapper: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 99,
  },
  loading: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
