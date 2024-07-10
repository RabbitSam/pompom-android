import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { StyleSheet, View } from "react-native";
import DefaultText from "./DefaultText";
import { Colors } from "@/constants/Colors";


type CounterProps = {
    current: number,
    onIncrease: () => void,
    onDecrease: () => void,
    alt: string,
    after?: string
}


export default function Counter({current, onIncrease, onDecrease, alt, after=""} : CounterProps) {
    return(
        <View 
            style={styles.main}
        >
            <DefaultText style={styles.visuallyHidden}>{alt}</DefaultText>
            <Button onPress={(_) => onIncrease()} category="tertiary" icon={faPlus} description="Click to increase this value." />
            <DefaultText style={styles.current} fontWeight="semibold" size="xl">{current}{after}</DefaultText>
            <Button onPress={(_) => onDecrease()} category="tertiary" icon={faMinus} description="Click to decrease this value." />
        </View>
    );
}


const styles = StyleSheet.create({
    main: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 5
    },
    visuallyHidden: {
        height: 0,
        overflow: "hidden",
        position: "absolute",
        width: 0,
        flexWrap: "nowrap",
    },
    current: {
        backgroundColor: Colors.white,
        width: "100%",
        textAlign: "center",
        padding: 10,
        borderWidth: 2,
        borderColor: Colors.tertiary,
        borderRadius: 5,
    }
});