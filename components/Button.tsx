import { Colors } from "@/constants/Colors";
import { Pressable, StyleSheet, GestureResponderEvent } from "react-native";
import { Link } from "expo-router";
import DefaultText from "./DefaultText";
import { useState, PropsWithChildren, ReactNode } from "react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";


type ButtonProps = PropsWithChildren<{
    category: "primary" | "secondary" | "tertiary",
    onPress?: null | ((e : GestureResponderEvent) => void),
    icon?: IconDefinition,
    description?: string
}>


export default function Button({ category, onPress, children, icon, description } : ButtonProps) {
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
            accessibilityHint={description}
        >
            
            <DefaultText style={{color: isPressed ? Colors[category] : Colors.white}} fontWeight="semibold" size="lg">
                {
                    icon && <FontAwesomeIcon icon={icon} color={isPressed ? Colors[category] : Colors.white}/>
                }
                {children}
            </DefaultText>
        </Pressable>
    );
}


type ButtonLinkProps = Omit<ButtonProps, "onPress"> & { href: string };

export function ButtonLink({category, children, href, icon}: ButtonLinkProps) {
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
            <DefaultText style={{color: isPressed ? Colors[category] : Colors.white}} fontWeight="semibold" size="lg">
                {
                    icon && <FontAwesomeIcon icon={icon} color={isPressed ? Colors[category] : Colors.white}/>
                }
                {children}
            </DefaultText>
        </Link>
    );
}


const styles = StyleSheet.create({
    button: {
        padding: 10,
        paddingBottom: 6,
        display: "flex",
        flexDirection: "row",
        gap: 5
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