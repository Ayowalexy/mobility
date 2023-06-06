import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import EvilIcons from '@expo/vector-icons/EvilIcons'
import { colors } from "../../utils/colors";
import { IText } from "../Text";
import { useAppSelector } from "../../redux/store";

export const Header = () => {
    const {  user: { firstName, lastName } } = useAppSelector(({ authReducer }) => authReducer)
    return (
        <View style={styles.container}>
            <View style={styles.name}>
                <EvilIcons name='user' color={colors.black} size={35} />
                <IText type="sm" extrastyles={styles.username}>{firstName} {lastName}</IText>
            </View>
            <TouchableOpacity>
                <EvilIcons name='bell' color={colors.black} size={30} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 20
    }, name: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    username: {
        fontSize: 16,
        paddingLeft: 10
    }
})