import { StyleSheet, View, Animated } from "react-native";
import DefaultText from "./DefaultText";
import { TinyEmitter } from "tiny-emitter";
import { useEffect, useRef, useState } from "react";
import { Colors } from "@/constants/Colors";
const emitter : TinyEmitter = require("tiny-emitter/instance");

type ToastType = "success" | "error";

const HIDE_AREA = 1500;

export default function CustomToast() {
    const [visible, setVisible] = useState(false);
    const [type, setType] = useState<ToastType>("error");
    const [message, setMessage] = useState("");
    const fadeAnim = useRef(new Animated.Value(HIDE_AREA)).current;

    const fadeIn = Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
    });

    const fadeOut = Animated.timing(fadeAnim, {
        toValue: HIDE_AREA,
        duration: 1000,
        useNativeDriver: true
    });

    const quickFadeOut = Animated.timing(fadeAnim, {
        toValue: HIDE_AREA,
        duration: 150,
        useNativeDriver: true
    });

    const startHideTimeout = () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            setVisible(false);
        }, 3000);
    };

    let timeout : NodeJS.Timeout;

    const showToast = (toastType : ToastType, toastMessage: string) => {
        setType(toastType);
        setMessage(toastMessage);

        setVisible(prev => {
            if (prev) {
                quickFadeOut.start();
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    fadeIn.start();
                    startHideTimeout();
                }, 50);
            } else {
                startHideTimeout();
            }

            return true;
        });
    };

    useEffect(() => {
        emitter.on("show-toast", showToast);

        return () => {
            emitter.off("show-toast");
        };
    }, []);

    if (visible) {
        fadeIn.start();
    } else {
        fadeOut.start();
    }

    return (
        <Animated.View
            style={{
                ...styles.toast,
                backgroundColor: type === "error" ? Colors.tertiary : Colors.primary,
                transform: [
                    {
                        translateY: fadeAnim
                    }
                ]
            }}
        >
            <DefaultText
                size="sm"
                style={styles.text}
            >
                {message}
            </DefaultText>
        </Animated.View>
    );
}


const styles = StyleSheet.create({
    toast: {
        borderRadius: 30,
        padding: 10,
        paddingHorizontal: 20,
        maxWidth: "90%",
        position: "absolute",
        bottom: 50,
        elevation: 300,
        zIndex: 300,
        alignSelf: "center",
        borderWidth: 2,
        borderColor: Colors.background
    },
    text: {
        color: Colors.white,
    }
});
