import Button from "./Button/Button";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { StyleSheet, View } from "react-native";
import DefaultText from "./DefaultText";
import { Colors } from "@/constants/Colors";
import { VisuallyHidden } from "@/constants/VisuallyHidden";


type CounterProps = {
    current: number,
    onIncrease: () => void,
    onDecrease: () => void,
    alt: string,
    after?: string,
    orientation?: "vertical" | "horizontal"
}


export default function Counter({current, onIncrease, onDecrease, alt, after="", orientation="vertical"} : CounterProps) {

    return(
        <View 
            style={orientation === "horizontal" ? {...styles.main, flexDirection: "row-reverse"} : styles.main}
        >
            <DefaultText style={VisuallyHidden}>{alt}</DefaultText>
            <View style={styles.buttonContainer}>
                <Button style={{flex: 1}} onPress={(_) => onIncrease()} category="tertiary" icon={faPlus} description="Click to increase this value." />
            </View>
            <DefaultText style={styles.current} fontWeight="semibold" size="xl">{current}{after}</DefaultText>
            <View style={styles.buttonContainer}>
                <Button style={{flex: 1, height: "100%"}} onPress={(_) => onDecrease()} category="tertiary" icon={faMinus} description="Click to decrease this value." />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    main: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        flex: 1
        
    },
    current: {
        backgroundColor: Colors.white,
        textAlign: "center",
        padding: 10,
        borderWidth: 2,
        borderColor: Colors.tertiary,
        borderRadius: 5,
        flex: 1,
        width: "100%"
    },
    buttonContainer: {
        flex: 1,
        width: "100%"
    }
});