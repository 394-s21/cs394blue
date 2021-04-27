import React, {useState, useEffect} from 'react';
import { useReducer } from 'react';
import { TextInput, StyleSheet, TouchableOpacity, SafeAreaView, Text } from 'react-native';

import { firebase, loginWithEmail } from '../firebase.js';

const Login = ({navigation}) => {
    const [email, onChangeEmail] = useState("");
    const [password, onChangePassword] = useState("");
    const [signInError, setSignInError] = useState("");

    async function handleSubmit (em, pw) {
        setSignInError(null)
        try {
            const auth = await loginWithEmail(em, pw)
            const user = auth.user
            console.log(user.uid);
            navigation.navigate('Home',{name: user.uid})
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
            <TouchableOpacity
            onPress={() => {handleSubmit(email, password)}}>
                <Text>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => navigation.navigate("Register")}>
                <Text>Don't Have An Account? Register Here</Text>
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