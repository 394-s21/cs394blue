import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { theme } from '../core/theme'
import { firebase, registerWithEmail } from '../../firebase';

export default function RegisterScreen({ navigation }) {

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
        setRegisterError(null)
        try {
            //console.log(email)
            const auth = await registerWithEmail(email, password)
            const user = auth.user
            await user.updateProfile({displayName: email})
            navigation.navigate('LoginScreen')
            //navigation.navigate('Tabs',{name: user.uid})
        } catch (error) {
            alert(error.message)
            setRegisterError(error.message)
        }
    }


  return (
    <Background>
      <Header>Create Account</Header>
      <TextInput
        label="Email"
        onChangeText={onChangeEmail}
      />
      <TextInput
        label="Enter Password"
        onChangeText={onChangePassword}
        secureTextEntry
      />
      <TextInput
        label="Re-enter Password"

        value={password.value}
        onChangeText={onChangeSecondPassword}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={() => {checkPasswords(email, password, secondPassword)}}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
