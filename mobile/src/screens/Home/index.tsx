import React from "react";

import { View, Text, LogBox, KeyboardAvoidingView, Platform } from 'react-native'
import { Header } from "../../componets/Header";
import { styles } from "./style";
import { MessageList } from "../../componets/MessageList";
import { SigninBox } from "../../componets/SigninBox";
import { SendMessageForm } from "../../componets/SendMessageForm";
import { userAuth } from "../../hooks/auth";

export function Home() {
    const { user } = userAuth();
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.container}>
                <Header />
                <MessageList />
                {user ? <SendMessageForm /> : <SigninBox />}
            </View>
        </KeyboardAvoidingView>
    )
}