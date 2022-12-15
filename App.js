import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import firebase from "firebase/compat";
import {createStackNavigator} from "@react-navigation/stack";
import Details from "./Components/Details";
import Event from "./Components/Events";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";
import Create from "./Components/Create";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "./Components/HomeScreen";
import ProfileScreen from "./Components/ProfileScreen";
import Chat from "./Components/Chat";
import { Card } from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import SignUpForm from "./Components/SignUpForm";
import LoginForm from "./Components/LoginForm";



export default function App() {
    const Stack = createStackNavigator();
    const Tab = createBottomTabNavigator();

    const firebaseConfig = {
        apiKey: "AIzaSyBYyGvmmFWDHyL0DnWuXhC1_Gx25EXv41M",
        authDomain: "eksamen-c7a2c.firebaseapp.com",
        databaseURL: "https://eksamen-c7a2c-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "eksamen-c7a2c",
        storageBucket: "eksamen-c7a2c.appspot.com",
        messagingSenderId: "580927712033",
        appId: "1:580927712033:web:dfc9e66a62f7fdcd9c2c60"
    };


    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const [user, setUser] = useState({ loggedIn: false });

    // Her bliver Firebase initialiseret
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

// Monitorerer om brugeren er logget ind eller ej
    function onAuthStateChange(callback) {
        return firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback({loggedIn: true, user: user});
            } else {
                callback({loggedIn: false});
            }
        });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChange(setUser);
        return () => {
            unsubscribe();
        };
    }, []);

// Her er den side brugeren bliver mødt med, når de åbner appen, hvorfra der kan oprettes en bruger eller logges ind
    const GuestPage = () => {
        return(
            <KeyboardAvoidingView //Bruger denne funktion så tastatur ikke dækker for vores inputs.
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
            <ScrollView >
                <View style={styles.container}>
                    <Text style={styles.title}>Velkommen til MeetMe</Text>
                    <Text style={styles.text}>{'\n'}Her kan du oprette en ny profil, eller logge ind på din eksisterende profil{'\n'}{'\n'}</Text>
                    <Card style={{padding:10, backgroundColor: '#E3DBDB'}}>
                        <LoginForm />
                    </Card>
                    <Card style={{padding:10, backgroundColor: '#E3DBDB'}}>
                        <SignUpForm />
                    </Card>
                </View>
            </ScrollView>
            </KeyboardAvoidingView>
        )
    }

    const StackNavigation = () => {
        return(
            <Stack.Navigator style={styles.root} options={{headerShown:null}}>

                <Stack.Screen name={'Event'} component={Event} options={{headerShown:null}}/>
                <Stack.Screen name={'Event Details'} component={Details} options={{headerShown:null}}/>
                <Stack.Screen name={'Create'} component={Create} options={{headerShown:null}}/>
            </Stack.Navigator>
        )
    }

    return user.loggedIn ? <HomeScreen/> : <GuestPage/>;
    function Nav() {
        return (
            <NavigationContainer >
                <Tab.Navigator style={styles.root} >
                    <Tab.Screen name={'Home'} component={HomeScreen} options={{
                        tabBarIcon: () => (<Ionicons name="home" size={20}/>), headerShown: null}}/>
                    <Tab.Screen name={'Event'} component={StackNavigation} options={{
                        tabBarIcon: () => (<Ionicons name="calendar" size={20}/>), headerShown: null}}/>
                    <Tab.Screen name={'Chat'} component={Chat} options={{
                        tabBarIcon: () => (<Ionicons name="chatbubbles" size={20}/>), headerShown: null}}/>
                    <Tab.Screen name={'Profile'} component={ProfileScreen} options={{
                        tabBarIcon: () => (<Ionicons name="person" size={20}/>), headerShown: null}}/>
                </Tab.Navigator>
            </NavigationContainer>
        );
    }


}



const styles = StyleSheet.create({
  root: {
    //flex: 1,
    backgroundColor: '#E3DBDB',
    //alignItems: 'center',
   // justifyContent: 'center',
  },
    container: {
        paddingBottom: "35%",
        backgroundColor: '#E3DBDB',
    },
    title:{
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#4E3D42',
        paddingTop: 55,
    },
    text: {
      fontSize: 15,
        marginLeft: 20,
        color: '#4E3D42',
    }
});