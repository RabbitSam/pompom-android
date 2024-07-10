import { Text, TextStyle, StyleSheet } from "react-native";
import { PropsWithChildren } from "react";


type DefaultTextProps = PropsWithChildren<{ 
    style?: TextStyle, 
    fontWeight?: "normal" | "medium" | "bold" | "semibold" | "extrabold", 
    size?: "sm" | "md" | "lg" | "xl" | "2xl" }>

export default function DefaultText({children, style, fontWeight="normal", size="md"} : DefaultTextProps) {
    return (
        <Text style={{...styles[size], ...style, fontFamily: fontWeightMap[fontWeight]}}>
            {children}
        </Text>
    );
}


const styles = StyleSheet.create({
    sm: {
        fontSize: 14,
        lineHeight: 18
    },
    md: {
        fontSize: 16,
        lineHeight: 24
    },
    lg: {
        fontSize: 18,
        lineHeight: 27

    },
    xl: {
        fontSize: 20,
        lineHeight: 30
    },
    "2xl": {
        fontSize: 28,
        lineHeight: 42
    }
});


const fontWeightMap = {
    normal: "Dosis_400Regular",
    medium: "Dosis_500Medium",
    semibold: "Dosis_600SemiBold",
    bold: "Dosis_700Bold",
    extrabold: "Dosis_800ExtraBold"
}