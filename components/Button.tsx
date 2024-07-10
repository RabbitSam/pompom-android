import { Colors } from "@/constants/Colors";
import { Pressable, StyleSheet, GestureResponderEvent } from "react-native";
import { Link } from "expo-router";
import DefaultText from "./DefaultText";
import { useState, PropsWithChildren, ReactNode } from "react";


type ButtonProps = PropsWithChildren<{
    category: "primary" | "secondary" | "tertiary",
    onPress?: null | ((e : GestureResponderEvent) => void),
}>


export default function Button({ category, onPress, children } : ButtonProps) {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <Pressable
            onPressIn={(_) => setIsPressed(true)}
            onPressOut={(_) => setIsPressed(false)}
            onPress={onPress}
            style={{
                ...styles.button,
                ...styles.buttonAndLink,
                borderColor: Colors[category],
                backgroundColor: isPressed ? Colors.white : Colors[category]
            }}
        >
            <DefaultText style={{color: isPressed ? Colors[category] : Colors.white}} fontWeight="semibold" size="lg">{children}</DefaultText>
        </Pressable>
    );
}


type ButtonLinkProps = Omit<ButtonProps, "onPress"> & { href: string };

export function ButtonLink({category, children, href}: ButtonLinkProps) {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <Link 
            href={href}
            onPressIn={(_) => setIsPressed(true)}
            onPressOut={(_) => setIsPressed(false)}
            style={{
                ...styles.buttonLink,
                ...styles.buttonAndLink,
                borderColor: Colors[category],
                backgroundColor: isPressed ? Colors.white : Colors[category]
            }}
        >
            <DefaultText style={{color: isPressed ? Colors[category] : Colors.white}} fontWeight="semibold" size="lg">{children}</DefaultText>
        </Link>
    );
}


const styles = StyleSheet.create({
    button: {
        padding: 10,
        paddingBottom: 6,
    },
    buttonLink: {
        padding: 12,
        paddingBottom: 6,
        textAlign: "center"
    },
    buttonAndLink: {
        borderWidth: 2,
        borderRadius: 5,
        position: "relative",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
});