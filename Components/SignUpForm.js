//Import af Pages og Componenter
import React, { useState, useEffect } from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert} from 'react-native';
import { auth, db } from '../firebase';
import LoginForm from "./LoginForm";

const LoginScreen = ({ navigation }) => {
    //Vores tre variabler der bruges til email, password og brugernavn
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        //Hvis bruger er logget ind -> gå til HomeScreen hvilke er vores tabNaviagator
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                navigation.replace('HomeScreen');
            }
        });
        return unsubscribe;
    }, []);

    //Vores register handler
    const handleRegister = () => {
        //Vi skal først skabe vores user
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
                const userCredentials = user.user;
                if (user && name) {
                    try {
                        //Hvis vores user og navn er der, sætter vi noget data i vores userData object
                        //Vi gør dette fordi vi man ikke kan tilføje properties til et auth object
                        //Så vi er nødt til at skabe dem her
                        //Vi tildeler også alle group 1 som start
                        db.ref('userData/' + userCredentials.uid).set({
                            name: name,
                            group: 1,
                        });
                    } catch (error) {
                        Alert.alert(`Error: ${error.message}`);
                    }
                }
                console.log('Registered user with email: ', userCredentials.uid);
            })
            .catch((error) => alert(error.message));
    };

    //Gå til loginPage
    const handleLogin = () => {
        navigation.navigate('LoginForm');
    };

    return (
        <View>
            <View style={styles.inputContainer}>
                <Text style={styles.header}>
                    Register
                </Text>
                <TextInput
                    placeholder="Name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleRegister} style={[styles.button, styles.buttonOutline]}>
                    <Text>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    header: {
        fontSize: 30,
    },
    input: {
        borderWidth: 1,
        margin: 20,
        padding: 10,
    },
    button: {
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },

    buttonOutline: {
        marginTop: 5,
        marginBottom: 5,
        borderWidth: 2,
    },

});

/*import React, {useState} from 'react';
import {Button,Text, View, TextInput, ActivityIndicator, StyleSheet} from 'react-native';
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// // De variabler der benyttes til at oprette sig
function SignUpForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isCompleted, setCompleted] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    // Knap der trykkes på når bruger har udfyldt ovenstående og så vil oprette sig
    const renderButton = () => {
        return <Button onPress={() => handleSubmit()} title="Er du ny? Opret en bruger her!" />;
    };

    // Bruger forsøger at oprette sig ved at firebase opbevarer dataen i dens database,
    // meen hvis der opstår en fejl ifm. oprettelsen, gives en errormessage
    const handleSubmit = async() => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password).then((data)=>{
            });
        } catch (error){
            setErrorMessage(error.message)
        }

    }

    // De to øverste skaber inputfelterne til at taste e-mail og kodeord, den nederste giver errormessage
    return (
        <View>
            <Text style={styles.header}>Opret</Text>
            <TextInput
                placeholder="e-mail"
                value={email}
                onChangeText={(email) => setEmail(email)}
                style={styles.inputField}
            />
            <TextInput
                placeholder="kodeord"
                value={password}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry
                style={styles.inputField}
            />
            {errorMessage && (
                <Text style={styles.error}>Error: {errorMessage}</Text>
            )}
            {renderButton()}
        </View>
    );

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>SignUp</Text>
        </View>
    );
}

// Styling
const styles = StyleSheet.create({
    error: {
        color: 'red',
    },
    inputField: {
        borderWidth: 1,
        margin: 20,
        padding: 10,
    },
    header: {
        fontSize: 30,
    },
});

export default SignUpForm*/