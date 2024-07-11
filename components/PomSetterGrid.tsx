import TimeSetter from "./TimeSetter";
import { View, StyleSheet } from "react-native";
import Counter from "./Counter";
import DefaultText from "./DefaultText";


type PomSetterGridProps = {
    value: TimerState,
    onChange: (timer : TimerState) => void,
};


export default function PomSetterGrid({ value, onChange }: PomSetterGridProps) {
    const numLongBreaks : number = Math.floor(value.pomCount / 5);

    const totalPomMinutes : number = ((value.pomTime.minute + value.breakTime.minute) * value.pomCount) + (value.longBreakTime.minute * numLongBreaks);
    const finalHours = ((value.pomTime.hour + value.breakTime.hour) * value.pomCount) + Math.floor(totalPomMinutes / 60) + (value.longBreakTime.hour * numLongBreaks);
    const finalMinutes = totalPomMinutes % 60;

    return (
        <View style={styles.timers}>
            <TimeSetter
                value={value.pomTime}
                title="Work Length"
                onChange={(timeState) => onChange({...value, pomTime: timeState})}
            />
            <TimeSetter
                value={value.breakTime}
                title="Break Length"
                onChange={(timeState) => onChange({...value, breakTime: timeState})}
            />
            <TimeSetter
                value={value.longBreakTime}
                title="Long Break Length"
                onChange={(timeState) => onChange({...value, longBreakTime: timeState})}
            />
            <View style={styles.pomodoros}>
                <DefaultText size="xl" fontWeight="bold">Pomodoros</DefaultText>
                <Counter
                    alt="Pomodoros"
                    current={value.pomCount}
                    onIncrease={() => onChange({...value, pomCount: value.pomCount + 1})}
                    onDecrease={() => onChange({...value, pomCount: Math.max(1, value.pomCount - 1)})}
                    orientation="horizontal"
                />
            </View>
            <View style={styles.timeFinal}>
                <DefaultText size="2xl" fontWeight="bold">Total Time: {finalHours}h {finalMinutes}m</DefaultText>
                {
                    numLongBreaks > 0 &&
                    <DefaultText size="sm" fontWeight="medium">Includes {numLongBreaks} long break(s).</DefaultText>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    timers: {
        display: "flex",
        flexDirection: "column",
        gap: 30,
        width: "100%",
    },
    pomodoros: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10
    },
    timeFinal: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 5
    }
});