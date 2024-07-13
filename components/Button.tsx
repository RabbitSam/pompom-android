import { Colors } from "@/constants/Colors";
import { Pressable, StyleSheet, GestureResponderEvent, ViewStyle } from "react-native";
import { Link } from "expo-router";
import DefaultText from "./DefaultText";
import { useState, ReactNode } from "react";


type RenderProps = (color: string) => ReactNode

type ButtonProps = {
    category: "primary" | "secondary" | "tertiary",
    onPress?: null | ((e : GestureResponderEvent) => void),
    description?: string,
    style?: Omit<ViewStyle, "padding" | "display" | "flexDirection" | "gap" | "textAlign">,
    children?: ReactNode | RenderProps,
    disabled?: boolean
};


export default function Button({ category, onPress, children, description, style={}, disabled=false } : ButtonProps) {
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
                backgroundColor: isPressed ? Colors.white : Colors[category],
                ...style
            }}
            accessibilityHint={description}
            disabled={disabled}
        >
            
            <DefaultText style={{color: isPressed ? Colors[category] : Colors.white}} fontWeight="semibold" size="lg">
                {
                    typeof children === "function"
                    ?
                    children(isPressed ? Colors[category] : Colors.white)
                    :
                    children
                }
            </DefaultText>
        </Pressable>
    );
}


type ButtonLinkProps = Omit<ButtonProps, "onPress" | "disabled"> & { href: string };

export function ButtonLink({category, children, href, style={}}: ButtonLinkProps) {
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
                backgroundColor: isPressed ? Colors.white : Colors[category],
                ...style
            }}
        >
            <DefaultText style={{color: isPressed ? Colors[category] : Colors.white}} fontWeight="semibold" size="lg">
                {
                    typeof children === "function"
                    ?
                    children(isPressed ? Colors[category] : Colors.white)
                    :
                    children
                }
            </DefaultText>
        </Link>
    );
}


const styles = StyleSheet.create({
    button: {
        padding: 10,
    },
    buttonLink: {
        padding: 12,
        textAlign: "center",
        textAlignVertical: "center"
    },
    buttonAndLink: {
        borderWidth: 2,
        borderRadius: 5,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 5
    }
});