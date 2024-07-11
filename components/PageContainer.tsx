import { View, StatusBar, StyleSheet, ScrollView } from "react-native";
import { PropsWithChildren } from "react";
import { Colors } from "@/constants/Colors";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


export default function PageContainer({children}: PropsWithChildren ) {
    return (
        <>
            <SafeAreaProvider>
                <SafeAreaView style={styles.body}>
                    <ScrollView style={styles.main} contentContainerStyle={styles.content}>
                        {children}
                    </ScrollView>
                </SafeAreaView>
            </SafeAreaProvider>
        </>
    );
}


const styles = StyleSheet.create({
    main: {
        display: "flex",
        flex: 1,
    },
    body: {
        backgroundColor: Colors.background,
        display: "flex",
        flex: 1
    },
    content: {
        display: "flex",
        gap: 20,
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        flexGrow: 1
    }
    
})