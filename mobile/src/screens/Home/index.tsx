import React from "react";

import { View, Text } from 'react-native'
import { Header } from "../../componets/Header";
import { styles } from "./style";

export function Home() {
    return (
        <View style={styles.container}>
            <Header />
            <Text style={styles.text} >Olá!</Text>
        </View>
    )
}