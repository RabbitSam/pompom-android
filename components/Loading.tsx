import { Colors } from "@/constants/Colors";
import { useRef } from "react";
import { StyleSheet, View, Image, Animated } from "react-native";
import DefaultText from "./DefaultText";


export default function Loading({ isLoading } : { isLoading: boolean }) {
    const bounceAnim = useRef(new Animated.Value(1)).current;

    const bounceStart = Animated.timing(bounceAnim, {
        toValue: 1.25,
        duration: 1000,
        useNativeDriver: true
    });

    const bounceEnd = Animated.timing(bounceAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
    });

    const bounceSequence = Animated.sequence([bounceStart, bounceEnd]);

    const bounceLoop = Animated.loop(bounceSequence);

    bounceLoop.start();

    return (
        isLoading ?
        <View style={styles.loading}>
            <View style={styles.background}></View>
            <Animated.Image 
                source={require("@/assets/images/logo.png")}
                style={[
                    {
                        aspectRatio: 1,
                        height: 100
                    },
                    {
                        transform: [{scale: bounceAnim}]
                    }
                ]}
            />
            <DefaultText fontWeight="semibold" size="xl">Loading...</DefaultText>
        </View>
        :
        <></>
    )
}


const styles = StyleSheet.create({
    loading: {
        flex: 1,
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        elevation: 200,
        gap: 10,
        zIndex: 200
    },
    background: {
        position: "absolute",
        backgroundColor: Colors.darkenedBackground,
        flex: 1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: "100%",
        width: "100%",
        opacity: 0.75,
    },
});