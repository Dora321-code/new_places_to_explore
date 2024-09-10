import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Animated,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STATUS_BAR_HEIGHT,
} from "../../constants";
import { useDispatch } from "react-redux";
import * as authActions from "../../context/actions/auth";
import { FORM_INPUT_UPDATE, formReducer } from "../../context/reducers/formReducer";
import Input from "../../components/Input";

export default function RegisterScreen(props) {
  const _loadingDeg = new Animated.Value(0);
  const _loadingOpacity = new Animated.Value(0);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
      phone: "",
    },
    inputValidities: {
      email: false,
      password: false,
      phone: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const _startLoadingAnimation = (times) => {
    _loadingDeg.setValue(0);
    _loadingOpacity.setValue(1);
    setTimeout(() => {
      _loadingOpacity.setValue(0);
    }, 400 * times + 100);

    Animated.timing(_loadingDeg, {
      toValue: times,
      duration: 400 * times,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  };

  const SignUpHandler = async () => {
    let action;
    
      action = authActions.signUp(
        formState.inputValues.email,
        formState.inputValues.phone,
        formState.inputValues.password
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
              registering...
            </Text>
          </View>
        </View>
      )}
      <KeyboardAvoidingView
        behavior="height"
        style={{
          ...styles.centerContainer,
        }}
      >
        <View style={styles.step2Wrapper}>
          <View style={styles.step2Title}>
            <Text
              style={{
                fontWeight: "bold",
              }}
            >
              Register in Best places app
            </Text>
          </View>
          <View style={styles.step2FormWrapper}>
            <View style={styles.formGroupWrapper}>
              <View
                style={{
                  marginBottom: 15,
                }}
              >
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
              <View
                style={{
                }}
              >
                <Input
                 id = 'phone'
                  autoCorrect={false}
                  autoCapitalize="none"
                  autoFocus={true}
                  placeholder="Phone"
                  required
                  keyboardType="phone-pad"
                  errorText="Please enter a valid phone number."
                  onInputChange={inputChangeHandler}
                  initialValue=""
                  returnKeyType="next"
                />
              </View>
            </View>
            <View style={styles.formGroupWrapper}>
              <View
                style={{
                }}
              >
                <Input
                  id='password'
                  placeholder="password"
                  onInputChange={inputChangeHandler}
                  initialValue=""
                  required
                  minLength={5}
                  errorText="Please enter a strong password."
                  keyboardType='visible-password'
                  returnKeyType="done"
                />
              </View>
              <TouchableOpacity activeOpacity={0.8} style={styles.btnNextStep}
              onPress={SignUpHandler}
              >
                <Animated.Text
                  style={{
                    opacity: Animated.subtract(1, _loadingOpacity),
                    fontWeight: "600",
                    color: "#fff",
                  }}
                >
                  Register
                </Animated.Text>
                <Animated.Image
                  style={{
                    ...styles.loadingIcon,
                    position: "absolute",
                    opacity: _loadingOpacity,
                    transform: [
                      {
                        rotate: _loadingDeg.interpolate({
                          inputRange: [0, 100],
                          outputRange: ["0deg", "36000deg"],
                        }),
                      },
                    ],
                  }}
                  source={require("../../assets/loading.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Login")}
        activeOpacity={1}
        style={styles.btnLogin}
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
            Already have account?
          </Text>{" "}
          Login.
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
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
  centerContainer: {
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  usernameTypesWrapper: {
    width: "100%",
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  navigationTabs: {
    flexDirection: "row",
    width: "100%",
    borderBottomWidth: 0.5,
    position: "relative",
  },
  activeTypeLine: {
    height: 1,
    width: "50%",
    backgroundColor: "#000",
    position: "absolute",
    bottom: 0,
  },
  navigationTab: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  tabTitle: {
    fontWeight: "600",
  },
  usernameForm: {
    marginVertical: 20,
    width: "100%",
  },
  usePhone: {
    width: "100%",
  },
  useEmail: {
    width: "100%",
  },
  inputWrapper: {
    borderRadius: 5,
    overflow: "hidden",
    borderColor: "#ddd",
    borderWidth: 1,
    width: "100%",
    position: "relative",
  },
  input: {
    width: "100%",
    height: 44,
    paddingHorizontal: 15,
    backgroundColor: "rgb(242,242,242)",
  },
  loadingIcon: {
    width: 36,
    height: 36,
  },
  btnPhoneCode: {
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 44,
    width: 80,
  },
  phoneCodeTitleWrapper: {
    paddingVertical: 5,
    borderRightWidth: 1,
    borderRightColor: "#ddd",
    paddingHorizontal: 10,
  },
  inputPhone: {
    width: "100%",
    height: 44,
    fontSize: 16,
    paddingRight: 44,
    paddingLeft: 90,
    backgroundColor: "rgb(242,242,242)",
  },
  btnReset: {
    height: 44,
    width: 44,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 0,
    top: 0,
  },
  errorText: {
    color: "red",
    marginVertical: 5,
  },
  btnNextStep: {
    width: "100%",
    height: 46,
    backgroundColor: "#318bfb",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    borderRadius: 5,
  },

  //STEP2 STYLES
  step2Wrapper: {
    width: "100%",
  },
  step2Title: {
    marginVertical: 25,
    alignItems: "center",
  },
  step2FormWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  formGroupWrapper: {
    marginVertical: 7.5,
    width: "100%",
  },
  savePassword: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  checkbox: {
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 18,
    width: 18,
    borderRadius: 2,
    borderWidth: 3,
  },
  syncContactDescription: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 0.05 * SCREEN_WIDTH,
  },
  //STEP 3 STYLES
  step3ScrollView: {
    width: "100%",
  },
  step3Wrapper: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  //
  btnLogin: {
    height: 50,
    borderTopColor: "#ddd",
    borderTopWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
