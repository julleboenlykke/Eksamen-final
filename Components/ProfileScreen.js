import {View, Text, Button, StyleSheet, ScrollView} from 'react-native';
import * as React from "react";
import firebase from "firebase/compat";
import { auth, db } from '../firebase';

// En bruger kan logge ud af Appen (firebase metode)
function ProfileScreen () {
    const handleLogOut = async () => {
        await firebase.auth().signOut();
    };

    // Kan profilen af en eller anden grund ikke findes, når den forsøger at logge ud, gives beskeden "Ej fundet"
    if (!firebase.auth().currentUser) {
        return <View><Text>Ej fundet</Text></View>;
    }

    // Viser brugerens e-mail på profilsiden ved at hente den fra firebase
    return (

        <ScrollView style={styles.root}>
            <Text style={styles.title}>
                Profile
            </Text>
        <View style={styles.container}>
            <Text>Din e-mail: {firebase.auth().currentUser.email}{'\n'}</Text>
            <Text>Navn: {firebase.auth().currentUser.uid}{'\n'}</Text>
            <Button onPress={() => handleLogOut()} title="Log ud" />
        </View>
        </ScrollView>
    );

    /*
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Profile</Text>
        </View>
    );
     */

}

// Styling
const styles = StyleSheet.create({
    container: {
        flex: 5,
        justifyContent: 'space-between',
        paddingTop: '5%',
        backgroundColor: '#E3DBDB',
        padding: 8,
        alignItems: 'center',
    },
    root: {
        paddingLeft: 10,
        paddingRight:10,
        backgroundColor: "#E3DBDB",
    },
    text: {
        textAlign: 'left',
        paddingBottom: 15,
        paddingTop: 25,
        fontSize: 20,
        fontWeight: "bold",
        paddingLeft: 12,
    },
    title: {
        fontSize: 70,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#4E3D42',
        paddingTop: 55,
        paddingBottom: 30
    }
});

export default ProfileScreen

/*import {StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, FlatList} from "react-native"
import * as React from "react";

function Profile ({navigation}) {
    return (
        <ScrollView style={styles.root}>
            <View>
                <Text style={{
                    fontSize: 70,
                    fontWeight: 'bold',
                    justifyContent: 'center',
                    textAlign: 'center',
                    color: '#A07FD8',
                    paddingTop: 55,
                    paddingBottom: 30}}>
                    Profile
                </Text>
            </View>
        </ScrollView>
    )
}

//Lokal styling
const styles = StyleSheet.create({
    root: {
        paddingLeft: 10,
        paddingRight:10,
        backgroundColor: "#FFFFFF",
    },
    text: {
        textAlign: 'left',
        paddingBottom: 15,
        paddingTop: 25,
        fontSize: 20,
        fontWeight: "bold",
        paddingLeft: 12,
    },
    event: {
        height: 150,
        width: 350,
        resizeMode: "stretch",
    },
});

export default Profile*/