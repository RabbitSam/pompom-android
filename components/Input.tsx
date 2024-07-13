import { StyleSheet, TextInput, TextInputProps } from "react-native";
import { Colors } from "@/constants/Colors";
import { useState } from "react";



export default function Input(props : TextInputProps) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <TextInput
            {...props}
            style={{
                ...styles.input,
                borderColor: isFocused ? Colors.primary : Colors.secondary

            }}
            onFocus={(_) => setIsFocused(true)}
            onBlur={(_) => setIsFocused(false)}
        />
    )
}


const styles = StyleSheet.create({
    input: {
        fontFamily: "Dosis_500Medium",
        backgroundColor: Colors.white,
        padding: 10,
        textAlign: "center",
        width: "100%",
        borderRadius: 5,
        borderWidth: 2,
    }
});