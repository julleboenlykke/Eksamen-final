import * as React from 'react';
import {View, Text, StyleSheet, TextInput, Button, Alert, ScrollView, SafeAreaView, Platform, KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";


const Create = ({navigation,route}) => {
    const initialState = { Name: '', Location: '', Time: '', Category: '', Participants: '', Description: '',Image: '' }
    const [newEvent,setNewEvent] = useState(initialState);



    /*Returnere true, hvis vi er på edit car*/
    const isEditEvent = route.name === "Edit Event";

    useEffect(() => {
        if(isEditEvent){
            const event = route.params.event[1];
            setNewEvent(event)
        }
        /*Fjern data, når vi går væk fra screenen*/
        return () => {
            setNewEvent(initialState)
        };
    }, []);

    const changeTextInput = (name,event) => {
        setNewEvent({...newEvent, [name]: event});
    }

    const handleSave = () => {

        const { Name, Location, Time, Category, Participants, Image, Description } = newEvent;

        if(Name.length === 0 || Location.length === 0 || Time.length === 0 || Category.length === 0 || Participants.length === 0 || Image.length === 0 || Description.length === 0){
            return Alert.alert('Et af felterne er tomme!');
        }

        if(isEditEvent){
            const id = route.params.event[0];
            try {
                firebase
                    .database()
                    .ref(`/Event/${id}`)
                    // Vi bruger update, så kun de felter vi angiver, bliver ændret
                    .update({ Name, Location, Time, Category, Participants, Image, Description });
                // Når bilen er ændret, går vi tilbage.
                Alert.alert("Din info er nu opdateret");
                const event = [id,newEvent]
                navigation.navigate("Details",{event});
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }

        }else{

            try {
                firebase
                    .database()
                    .ref('/Event/')
                    .push({ Name, Location, Time, category: Category, Participants, Image, Description});
                Alert.alert(`Saved`);
                setNewEvent(initialState)
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }
        }

    };

    return (
        <KeyboardAvoidingView //Bruger denne funktion så tastatur ikke dækker for vores inputs.
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
        <ScrollView style={{backgroundColor: '#E3DBDB'}}>
            <View>
                <Text style={styles.title}>
                    Create
                </Text>
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {
                    Object.keys(initialState).map((key,index) =>{
                        return(
                            <View style={styles.row} key={index}>
                                <Text style={styles.label}>{key}</Text>
                                <TextInput
                                    value={newEvent[key]}
                                    onChangeText={(event) => changeTextInput(key,event)}
                                    style={styles.input}
                                />
                            </View>
                        )
                    })
                }
                {/*Hvis vi er inde på edit car, vis save changes i stedet for add car*/}
                <Button title={ isEditEvent ? "Save changes" : "Add event"} onPress={() => handleSave()} />
                <Button style={styles.button} title="Gå tilbage" onPress={() => navigation.goBack()}/>
            </ScrollView>
        </SafeAreaView>
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default Create;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        height: 35,
        margin: 10,
    },
    label: {
        fontWeight: 'bold',
        width: 110,
        height: 100
    },
    input: {
        borderWidth: 1,
        padding:5,
        flex: 1
    },
    title:{
        fontSize: 70,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#4E3D42',
        paddingTop: 55,
        paddingBottom: 30
    }
});