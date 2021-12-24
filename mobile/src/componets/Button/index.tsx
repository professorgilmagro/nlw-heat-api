import React from "react";
import { View, Text, TouchableOpacity, TouchableOpacityProps, ColorValue, ActivityIndicator } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

import { styles } from "./styles";


type Props = TouchableOpacityProps & {
    label: string;
    color: ColorValue;
    backgroundColor: ColorValue;
    icon?: React.ComponentProps<typeof AntDesign>['name'];
    isLoading?: boolean
}

export function Button({ label, color, icon, backgroundColor, isLoading = false, ...rest }: Props) {
    return (
        <TouchableOpacity
            style={[styles.container, { backgroundColor, opacity: isLoading ? 0.5 : 1 }]}
            activeOpacity={0.7}
            disabled={isLoading}
            {...rest}
        >
            {isLoading ?
                <ActivityIndicator color={color} style={styles.icon} /> :
                <AntDesign name={icon} size={24} style={styles.icon} />
            }
            <Text style={[styles.title, { color }]}>{label}</Text>
        </TouchableOpacity>
    )
}
