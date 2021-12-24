import React, { useContext, useState } from "react";
import { Text, View } from 'react-native'
import { AuthProvider, userAuth } from "../../hooks/auth";
import { COLORS } from "../../theme";
import { Button } from "../Button";
import { styles } from "./styles";

export function SigninBox() {
    const { signIn, isProcessing } = userAuth();


    return (
        <View style={styles.container}>
            <Button
                icon="github"
                label="ENTRAR COM O GITHUB"
                backgroundColor={COLORS.YELLOW}
                color={COLORS.BLACK_PRIMARY}
                isLoading={isProcessing}
                onPress={signIn}
            />
        </View>
    )
}
