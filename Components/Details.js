
import {View, Text, Platform, FlatList, StyleSheet, Button, Alert, ScrollView, Image, TouchableOpacity} from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";
import React, { Component } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";

const Details = ({route,navigation}) => {
    const [event,setEvent] = useState({});
    const [value, setValue] = useState("Tilmeld event");

    useEffect(() => {
        /*Henter car values og sætter dem*/
        setEvent(route.params.event[1]);

        /*Når vi forlader screen, tøm object*/
        return () => {
            setEvent({})
        }
    });

    const handleEdit = () => {
        // Vi navigerer videre til EditCar skærmen og sender bilen videre med
        const event = route.params.event
        navigation.navigate('Edit Event', { event });
    };

    const tilmeld = () => {
        /*Er det mobile?*/
        if(Platform.OS ==='ios' || Platform.OS ==='android'){
            Alert.alert('Du er tilmeldt event' );
            setValue("Du er tilmeldt event");
        }
    };

    const afmeld = () => {
        /*Er det mobile?*/
        if(Platform.OS ==='ios' || Platform.OS ==='android'){
            Alert.alert('Du er afmeldt event' );
            setValue("Du er afmeldt event");
        }
    };


    // Vi spørger brugeren om han er sikker
    const confirmDelete = () => {
        /*Er det mobile?*/
        if(Platform.OS ==='ios' || Platform.OS ==='android'){
            Alert.alert('Are you sure?', 'Do you want to delete the event?', [
                { text: 'Cancel', style: 'cancel' },
                // Vi bruger this.handleDelete som eventHandler til onPress
                { text: 'Delete', style: 'destructive', onPress: () => handleDelete() },
            ]);
        }
    };


    // Vi sletter den aktuelle bil
    const  handleDelete = () => {
        const id = route.params.event[0];
        try {
            firebase
                .database()
                // Vi sætter bilens ID ind i stien
                .ref(`/Event/${id}`)
                // Og fjerner data fra den sti
                .remove();
            // Og går tilbage når det er udført
            navigation.goBack();
        } catch (error) {
            Alert.alert(error.message);
        }
    };


    if (!event) {
        return <Text>No data</Text>;
    }

    //all content
    return (
        <View style={{backgroundColor: "#E3DBDB"}}>
            <TouchableOpacity onPress={() => navigation.goBack()} >
                <Ionicons name="arrow-back" style={{top: 20, fontSize:45, margin: 10,}} />
            </TouchableOpacity>
        <ScrollView style={styles.root}>
            <Text style={styles.title}>
                Details
            </Text>
        <View style={styles.container}>
            <Image style={styles.event} source={require("../assets/event.jpg")}/>
            {
                Object.entries(event).map((item,index)=>{
                    return(
                        <View style={styles.row} key={index}>
                            {/*Vores car keys navn*/}
                            <Text style={styles.label}>{item[0]} </Text>
                            {/*Vores car values navne */}
                            <Text style={styles.value}>{item[1]}</Text>
                        </View>
                    )
                })
            }
            <Text onPress={value} style={{fontSize: 25, paddingTop: 5}}> Status: {value} </Text>
            <Button title="Edit" onPress={ () => handleEdit()} />
            <Button title="Delete" onPress={() => confirmDelete()} />
            <Button title="Tilmeld event" onPress={() => tilmeld()} />
            <Button title="Afmeld event" onPress={() => afmeld()} />
        </View>
        </ScrollView>
        </View>
    );
}

export default Details;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
       paddingBottom: "100%",
    },
    row: {
        flexDirection: 'row',
        height: "6%",
        margin: 10,
    },
    label: {
        fontWeight: 'bold',
        width: 100,
        height: "300%",
    },
    value: {
        width: 180,
        height: "300%",
    },
    input: {
        borderWidth: 1,
        padding:5,
        flex: 1
    },
    root: {
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: "#E3DBDB",
        paddingBottom: "35%"
    },
    event: {
        height: 200,
        width: '100%',
        resizeMode: "stretch",

    },
    title: {
        fontSize: 70,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#4E3D42',
        paddingTop: 5,
        paddingBottom: "10%"
    }
});