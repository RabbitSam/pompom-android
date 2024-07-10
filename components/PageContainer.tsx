import { View, StatusBar, StyleSheet } from "react-native";
import { PropsWithChildren } from "react";
import { Colors } from "@/constants/Colors";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function PageContainer({children}: PropsWithChildren ) {
    return (
        <>
            <View style={styles.body}>
                <SafeAreaProvider>
                    <SafeAreaView style={styles.main}>
                        {children}
                    </SafeAreaView>
                </SafeAreaProvider>
            </View>
        </>
    );
}


const styles = StyleSheet.create({
    main: {
        display: "flex",
        flex: 1,
        padding: 10
    },
    body: {
        backgroundColor: Colors.background,
        display: "flex",
        flex: 1
    }
})