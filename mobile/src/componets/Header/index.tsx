import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles"
import LogoSvg from '../../assets/logo.svg'

import { UserPhoto } from "../UserPhoto";
import { userAuth } from "../../hooks/auth";
export function Header() {
    const { signOut, user } = userAuth();

    return (
        <View style={styles.container}>
            <LogoSvg />
            <View style={styles.logoutButton}>
                {!!user &&
                    <TouchableOpacity onPress={signOut}>
                        <Text style={styles.logoutText}>Sair</Text>
                    </TouchableOpacity>
                }
                <UserPhoto imageUri={user?.avatar_url} />

            </View>
        </View>
    )
}