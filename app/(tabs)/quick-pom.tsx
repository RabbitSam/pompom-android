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
import { useDispatch } from "react-redux";
import { router } from "expo-router";
import { setTimers } from "@/stores/currentTimerSlice";
import HeaderIcon from "@/components/HeaderIcon";


export default function QuickPom() {
    const [timerState, setTimerState] = useState<TimerState>(DefaultTimerState);
    const dispatch = useDispatch();

    const handleReset = () => {
        setTimerState(DefaultTimerState);
    };

    const handleStart = () => {
        dispatch(setTimers(timerState));

        router.navigate("/start-timer/");
    };

    return (
        <PageContainer>
            <View style={styles.header}>
                <HeaderIcon icon={faStopwatch}/>
                <HeaderText>
                    Quick Pom
                </HeaderText>
            </View>
            <PomSetterGrid 
                value={timerState}
                onChange={setTimerState}
            />
            <View style={styles.buttons}>
                <Button category="primary" onPress={(_) => handleStart()}>
                    {
                        (color) => (
                            <>
                                <FontAwesomeIcon icon={faPlay} color={color}/> Start Pom
                            </>
                        )
                    }
                    
                </Button>
                <Button category="tertiary" onPress={(_) => handleReset()}>
                    {
                        (color) => (
                            <>
                                <FontAwesomeIcon icon={faRefresh} color={color}/> Reset
                            </>
                        )
                    }
                </Button>
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