import React, { useState } from "react";
import { View, TextInput, Alert, Keyboard } from 'react-native'
import { set } from "react-native-reanimated";
import { api } from "../../services/api";
import { COLORS } from "../../theme";
import { Button } from "../Button";
import { styles } from './styles'

export function SendMessageForm() {
    const [message, setMessage] = useState('');
    const [sendingMessage, setSendingMessage] = useState<boolean>(false);

    async function handleSubmit() {
        if (message.trim().length == 0) {
            Alert.alert('Escreva a mensagem para enviar.');
            setMessage('');
            return;
        }

        setSendingMessage(true);
        await api.post('messages', { message });
        setMessage('');
        Keyboard.dismiss();
        Alert.alert('Mesagem enviada com sucesso!');
        setSendingMessage(false);
    }

    return (
        <View style={styles.container}>
            <TextInput
                keyboardAppearance="dark"
                placeholder="Qual sua expectativa para o evento?"
                placeholderTextColor={COLORS.GRAY_PRIMARY}
                style={styles.input}
                onChangeText={setMessage}
                value={message}
                maxLength={140}
                editable={!sendingMessage}
                multiline
            />
            <Button
                label="ENVIAR MESAGEM"
                backgroundColor={COLORS.PINK}
                color={COLORS.WHITE}
                isLoading={sendingMessage}
                onPress={handleSubmit}
            />
        </View>
    )
}