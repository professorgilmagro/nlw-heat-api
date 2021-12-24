import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from 'react-native'
import { styles } from "./styles";
import { Message, MessageProps } from "../Message";
import { api } from "../../services/api";
import { socket } from "../../services/io";

export function MessageList() {
    const [messages, setMessages] = useState<MessageProps[]>([]);

    const messageQueue: MessageProps[] = [];
    socket.on('new_message', (newMessage: MessageProps) => {
        messageQueue.push(newMessage);
    });

    useEffect(() => {
        const timer = setInterval(() => {
            if (messageQueue.length > 0) {
                setMessages(prevState => [
                    messageQueue[0],
                    prevState[0],
                    prevState[1]
                ].filter(Boolean)
                )

                messageQueue.shift();

            }
        }, 3000);

        return () => clearInterval(timer);
    }, [])

    useEffect(() => {
        async function loadMessages() {
            const listResponse = await api.get<MessageProps[]>('/messages/last3');
            setMessages(listResponse.data);
        }

        loadMessages();
    }, [])

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="never"
        >
            {messages.map(messageData => <Message key={messageData.id} data={messageData} />)}
        </ScrollView >
    )
}