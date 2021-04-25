import React, {useState} from 'react';
import { useReducer } from 'react';
import { TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

import { firebase, registerWithEmail } from '../firebase.js';

const Login = ({navigation}) => {
    const [email, onChangeEmail] = useState("")
    const [password, onChangePassword] = useState("")
    const [secondPassword, onChangeSecondPassword] = useState("")
    const [registerError, setRegisterError] = useState("")

    function checkPasswords (em, pw, spw) {
        if (pw == spw) {
            handleRegister(em, pw, spw)
        }
        else {
            alert("Passwords do not match")
        }
    }

    async function handleRegister (email, password, secondPassword) {
        if (password != secondPassword) {
            
        }
        setRegisterError(null)
        try {
            const auth = await registerWithEmail(email, password)
            const user = auth.user
            await user.updateProfile({displayName: email})
            navigation.navigate('Home')
        } catch (error) {
            alert(error.message)
            setSignInError(error.message)
        }
    }

    return (
        <SafeAreaView>
            <TextInput
            value={email}
            placeholder="Enter Email"
            onChangeText={onChangeEmail}
            />
            <TextInput
            value={password}
            placeholder="Enter Password"
            onChangeText={onChangePassword}
            secureTextEntry={true}
            />
             <TextInput
            value={secondPassword}
            placeholder="Re-enter Password"
            onChangeText={onChangeSecondPassword}
            secureTextEntry={true}
            />
            <TouchableOpacity
            onPress={checkPasswords(email, password, secondPassword)}>
                Submit
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
    },
  });


export default Login;