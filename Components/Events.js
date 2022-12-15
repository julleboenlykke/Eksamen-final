import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Image} from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const navController = (navigation, route) => {
    navigation.navigate(route)
}

const Event = ({navigation}) => {

    const [events,setEvents] = useState()

    useEffect(() => {
        if(!events) {
            firebase
                .database()
                .ref('/Event')
                .on('value', snapshot => {
                    setEvents(snapshot.val())
                });
        }
    },[]);

    // Vi viser ingenting hvis der ikke er data
    if (!events) {
        return(
           <ScrollView style={{backgroundColor: '#E3DBDB'}}>
            <SafeAreaView style={styles.container}>
                <View>
                    <Text style={styles.title}>Events</Text>
                    <TouchableOpacity onPress={() => navController(navigation, "Create")} >
                        <Ionicons name="add-circle-outline" style={{left: 300, top: 2, fontSize:45}} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
           </ScrollView>
        )
    }

    const handleSelectEvent = id => {
        /*Her søger vi direkte i vores array af biler og finder bil objektet som matcher idet vi har tilsendt*/
        const event = Object.entries(events).find( event => event[0] === id /*id*/)
        navigation.navigate('Event Details', { event });
    };

    // Flatlist forventer et array. Derfor tager vi alle values fra vores cars objekt, og bruger som array til listen
    const eventArray = Object.values(events);
    const eventKeys = Object.keys(events);

    return (
<ScrollView style={{backgroundColor: '#E3DBDB'}}>
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>Events</Text>
                <TouchableOpacity onPress={() => navController(navigation, "Create")} >
                    <Ionicons name="add-circle-outline" style={{left: 280, top: -70, fontSize:45}} />
                </TouchableOpacity>
        <FlatList
            data={eventArray}
            // Vi bruger carKeys til at finde ID på den aktuelle bil og returnerer dette som key, og giver det med som ID til CarListItem
            keyExtractor={(item, index) => eventKeys[index]}
            renderItem={({ item, index }) => {
                return(
                    <TouchableOpacity style={styles.label} onPress={() => handleSelectEvent(eventKeys[index])}>
                        <Image style={styles.event} source={require("../assets/event.jpg")}/>
                        <Text style={{fontWeight: "bold", fontSize: 20}}>{item.Name}</Text>
                        <Text> {item.Location}, {item.Time}</Text>
                        <Text style={{textAlign: "right"}}>Se mere</Text>
                    </TouchableOpacity>
                )
            }}
        />
            </View>
        </SafeAreaView>
</ScrollView>
    );
}

export default Event;


const styles = StyleSheet.create({
    container: {
        margin: 20,
        justifyContent:'center',
        backgroundColor: '#E3DBDB'
    },
   label: {
       flex: 1,
       borderWidth: 1,
       borderRadius:10,
       margin: 10,
       paddingVertical: "30%",
       paddingHorizontal: "5%",
       justifyContent:'center',

   },
    title: {
        fontSize: 70,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'left',
        color: '#4E3D42',
        marginTop: 10,
    },
    event: {
        height: '300%',
        width: '99%',
        resizeMode: "stretch",
    },
});