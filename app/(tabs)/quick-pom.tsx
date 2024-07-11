import HeaderText from "@/components/HeaderText";
import PageContainer from "@/components/PageContainer";
import PomSetterGrid from "@/components/PomSetterGrid";
import { StyleSheet, View } from "react-native";
import { faPlay, faRefresh, faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { DefaultTimerState } from "@/constants/DefaultTimerState";
import Button from "@/components/Button";


export default function QuickPom() {
    const [timerState, setTimerState] = useState<TimerState>(DefaultTimerState);

    const handleReset = () => {
        setTimerState(DefaultTimerState);
    };

    return (
        <PageContainer>
            <View style={styles.header}>
                <FontAwesomeIcon size={28} icon={faStopwatch} color={Colors.primary} />
                <HeaderText>
                    Quick Pom
                </HeaderText>
            </View>
            <PomSetterGrid 
                value={timerState}
                onChange={setTimerState}
            />
            <View style={styles.buttons}>
                <Button category="primary" icon={faPlay}> Start Pom</Button>
                <Button category="tertiary" icon={faRefresh} onPress={(_) => handleReset()}> Reset</Button>
            </View>
        </PageContainer>
    );
}


const styles = StyleSheet.create({
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        width: "100%"
    },
    buttons: {
        display: "flex",
        gap: 10,
        width: "100%"
    }
});