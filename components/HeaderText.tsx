import { StyleSheet } from "react-native";
import { PropsWithChildren } from "react";
import { Colors } from "@/constants/Colors";
import DefaultText from "./DefaultText";


export default function HeaderText({children}: PropsWithChildren) {
    return (
        <DefaultText style={styles.text} fontWeight="bold" size="2xl">
            {children}
        </DefaultText>
    );
}


const styles = StyleSheet.create({
    text: {
        color: Colors.primary
    }
});
