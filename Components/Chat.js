import {StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, FlatList} from "react-native"
import * as React from "react";

function Chat ({navigation}) {
    return (
        <ScrollView style={styles.root}>
            <View>
                <Text style={styles.title}>
                    Chat
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
    event: {
        height: 150,
        width: 350,
        resizeMode: "stretch",
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

export default Chat