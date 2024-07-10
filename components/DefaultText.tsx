import { Text, TextStyle, StyleSheet } from "react-native";
import { PropsWithChildren } from "react";


type DefaultTextProps = PropsWithChildren<{ style?: TextStyle, fontWeight?: "normal" | "medium" | "bold" | "semibold" | "extrabold" }>

export default function DefaultText({children, style, fontWeight="normal"} : DefaultTextProps) {
    return (
        <Text style={{...styles.text, ...style, fontFamily: fontWeightMap[fontWeight]}}>
            {children}
        </Text>
    );
}


const styles = StyleSheet.create({
    text: {
        lineHeight: 24,
        fontSize: 16
    }
});


const fontWeightMap = {
    normal: "Dosis_400Regular",
    medium: "Dosis_500Medium",
    semibold: "Dosis_600SemiBold",
    bold: "Dosis_700Bold",
    extrabold: "Dosis_800ExtraBold"
}