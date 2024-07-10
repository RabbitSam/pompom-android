import { StyleSheet } from "react-native";
import { PropsWithChildren } from "react";
import { Colors } from "@/constants/Colors";
import DefaultText from "./DefaultText";


export default function HeaderText({children}: PropsWithChildren) {
    return (
        <DefaultText style={styles.text} fontWeight="bold">
            {children}
        </DefaultText>
    );
}


const styles = StyleSheet.create({
    text: {
        fontSize: 28,
        lineHeight: 36,
        color: Colors.primary
    }
});
