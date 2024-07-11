import { StyleSheet, View } from "react-native";
import Counter from "./Counter";
import DefaultText from "./DefaultText";


type TimeSetterProps = {
    title: string,
    value: TimeState,
    onChange?: (value : TimeState) => void
};


export default function TimeSetter({ title, value, onChange } : TimeSetterProps) {
    const increment = (key: "hour" | "minute") : void => {
        const finalTime : TimeState = {...value};
        switch (key) {
            case "hour":
                finalTime.hour += 1;
                break;

            case "minute":
                if (finalTime.minute === 59) {
                    finalTime.hour += 1;
                    finalTime.minute = 0;
                } else {
                    finalTime.minute += 1;
                }
                break;

            default:
                break;
        }

        if (onChange) {
            onChange(finalTime);
        }
    };

    const decrement = (key: "hour" | "minute") : void => {
        const finalTime : TimeState = {...value};
        switch (key) {
            case "hour":
                finalTime.hour = Math.max(0, finalTime.hour - 1);
                finalTime.minute = finalTime.hour >= 1 ? finalTime.minute : Math.max(1, finalTime.minute);
                break;

            case "minute":
                if (finalTime.minute === 0 && finalTime.hour >= 1) {
                    finalTime.hour -= 1;
                    finalTime.minute = 59;
                } else {
                    finalTime.minute = Math.max(finalTime.hour >= 1 ? 0 : 1, finalTime.minute - 1);
                }
                break;

            default:
                break;
        }

        if (onChange) {
            onChange(finalTime);
        }
    };

    return (
        <View style={styles.timer}>
            <DefaultText style={styles.title} size="xl" fontWeight="bold">{title}</DefaultText>
            <View style={styles.timeControls}>
                <Counter
                    current={value.hour}
                    alt={`${title} Hours`}
                    after="h"
                    onIncrease={() => increment("hour")}
                    onDecrease={() => decrement("hour")}
                />
                <DefaultText size="xl" fontWeight="extrabold">:</DefaultText>
                <Counter
                    current={value.minute}
                    alt={`${title} Minute`}
                    after="m"
                    onIncrease={() => increment("minute")}
                    onDecrease={() => decrement("minute")}
                />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    timer: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        width: "100%",
    },
    title: {
        textAlign: "center",
    },
    timeControls: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10
    }
});