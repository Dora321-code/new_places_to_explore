import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Animated, Alert } from 'react-native'
import { SCREEN_WIDTH, SCREEN_HEIGHT, STATUS_BAR_HEIGHT } from '../../constants'
import Ionicons from "@expo/vector-icons/Ionicons";
import vars from '../../env';


export default function ForgotPassword() {
    const [loading, setLoading] = useState(false)
    const [sentReset, setSentReset] = useState(false)
    const [sendingReset, setSendingReset] = useState(false)
    const [usernameError, setUsernameError] = useState(false)
    const [username, setUsername] = useState('')
    const _loadingDeg = new Animated.Value(0)
    const _loadingDeg2 = new Animated.Value(0)


    const resetPasswordHandler =  async () => {
        try {
          const dbResult = {
            email:`${[username]}`,
            requestType:'PASSWORD_RESET'
          };
      
          const toDatabase = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${vars.googleApiKey}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(dbResult),
            }
          );
          console.log(toDatabase);
      
          if (!toDatabase.ok) {
            Alert.alert("Password Reset",' Succesfull kindly check your Email', [{ text: "Okay" }]);
          }
      
        } catch (error) {
            Alert.alert("An Error Occurred!", error.message, [{ text: "Okay" }]);
        }
    }
   
  return (
    <SafeAreaView style={styles.container}>
    {/* <View>
        <NavigationBar title={sentReset ? 'Access Account' : 'Login Help'}
            callback={() => navigation.goBack()}
        />
    </View> */}
    {sentReset ?
        <View style={styles.afterSentContainer}>
            <View style={styles.infoLine}>
                <Icon name="email" size={24} />
                <Text style={{
                    marginLeft: 10,
                    fontWeight: '500'
                }}>{sendingReset ? 'Sending Email' : 'Sent Email'}</Text>
                {sendingReset && <Animated.Image onLayout={_loadingDegAnimation2} style={{
                    marginLeft: 10,
                    height: 24,
                    width: 24,
                    transform: [
                        {
                            rotate: _loadingDeg2
                                .interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0deg',
                                        '360deg']
                                })
                        }
                    ]
                }} source={require('../../assets/waiting.png')} />}
            </View>
            <TouchableOpacity activeOpacity={0.8} style={styles.infoLine}>
                <Ionicons name="facebook" size={24} />
                <Text style={{
                    marginLeft: 10,
                    fontWeight: '500'
                }}>Login with Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.sendingDescription}>
                <Text style={{
                    fontWeight: "300"
                }}>An email has been sent to your account's email address. Please check your email to continue. If you are still having problems
                , please visit the <Text style={{
                        fontWeight: '500'
                    }}>
                        Help Center</Text></Text>
            </TouchableOpacity>
        </View>
        :
        <View style={styles.centerContainer}>
            <View>
                <Text style={{
                    fontSize: 24,
                    textAlign: 'center'
                }}>Find Your Account</Text>
                <Text style={{
                    marginVertical: 20,
                    color: '#666',
                    textAlign: 'center'
                }}>Enter your email or phone number linked to account.</Text>
            </View>
            <View style={styles.formWrapper}>
                <View style={{
                    ...styles.inputWrapper,
                    borderColor: usernameError ? 'red' : '#ddd'
                }}>
                    <TextInput
                        value={username}
                        onChangeText={(e) => setUsername(e)}
                        autoFocus={true}
                        placeholder="email or phone"
                        autoCapitalize="none"
                        style={styles.input} />
                </View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {resetPasswordHandler()}}
                    style={styles.btnNext}>
                    {!loading && <Text style={{
                        fontWeight: '600',
                        color: '#fff'
                    }}>Next</Text>}
                </TouchableOpacity>
                <View style={styles.divideLine}>
                    <View style={styles.ORtextWrapper}>
                        <Text style={{
                            color: '#333',
                            fontWeight: '600'
                        }}>OR</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.btnLoginWithFacebook}>
                    <Text style={{
                        color: '#318bfb',
                        fontWeight: 'bold'
                    }}>
                        Continue using Best places app withput login</Text>
                </TouchableOpacity>
            </View>
        </View>
    }
    <TouchableOpacity activeOpacity={1} style={styles.bottomHelp} 
     onPress={() => {Alert.alert('call our services center', [{ text: "Okay" }])}}
    >
        <Text style={{
            color: '#318bfb'
        }}>Need more help?</Text>
    </TouchableOpacity>
</SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',

        flex:1,
        justifyContent:'center'
        
    },
    centerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT - STATUS_BAR_HEIGHT - 44 - 50
    },
    afterSentContainer: {
        width: '100%',
        padding: 20,
        height: '100%'
    },
    infoLine: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 0.5
    },
    sendingDescription: {
        marginVertical: 10
    },
    formWrapper: {
        width: SCREEN_WIDTH * 0.9,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnNext: {
        marginVertical: 20,
        width: '100%',
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#318bfb',
        borderRadius: 5
    },
    inputWrapper: {
        width: '100%',
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(242,242,242)',
        borderColor: '#ddd',
        borderWidth: 1,
        overflow: 'hidden',
        borderRadius: 5
    },
    input: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 15
    },
    divideLine: {
        marginVertical: 10,
        position: 'relative',
        height: 2,
        width: '100%',
        backgroundColor: '#ddd',
    },
    ORtextWrapper: {
        width: 40,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        top: (2 - 20) / 2,
        left: (SCREEN_WIDTH * 0.9 - 40) / 2,
        position: 'absolute',
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    btnLoginWithFacebook: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    loadingIcon: {
        width: 36,
        height: 36,
    },
    bottomHelp: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
})