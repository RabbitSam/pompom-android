import PageContainer from "@/components/PageContainer";
import { selectTimer } from "@/stores/currentTimerSlice";
import { useEffect, useState } from "react";
import { GestureResponderEvent, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import Button from "@/components/Button";
import { faArrowLeft, faPause, faPlay, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { router } from "expo-router";
import DefaultText from "@/components/DefaultText";
import Svg, { SvgProps, Path } from "react-native-svg";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";


function convertToSeconds({hour, minute, second} : {hour: number, minute: number, second?: number}) : number {
    return (hour * 60 * 60) + (minute * 60) + (second ? second : 0);
}


function formatTime(seconds: number) : string {
    const finalSeconds : number = seconds % 60;
    const finalMinutes : number = Math.floor((seconds / 60)) % 60;
    const finalHours : number = Math.floor(seconds / (60 * 60));


    return `${finalHours}h ${finalMinutes}m ${finalSeconds}s`;
}

export default function StartTimer() {
    const timer = useSelector(selectTimer);

    const [pomsLeft, setPomsLeft] = useState(timer.pomCount);
    const [pomTime, setPomTime] = useState(convertToSeconds(timer.pomTime));
    const [breakTime, setBreakTime] = useState(convertToSeconds(timer.breakTime));
    const [longBreakTime, setLongBreakTime] = useState(convertToSeconds(timer.longBreakTime));

    const [currentStage, setCurrentStage] = useState(0);
    const [stageComplete, setStageComplete] = useState(false);

    const [isPaused, setIsPaused] = useState(false);

    let intervalId : NodeJS.Timeout;

    useEffect(() => {
        if (pomsLeft && !isPaused) {
            intervalId = setInterval(() => {
                switch (currentStage) {
                    case 0:
                        const newPomTime = pomTime - 1;

                        if (newPomTime === 0) {
                            setPomTime(convertToSeconds(timer.pomTime));

                            if ((timer.pomCount - pomsLeft) % 4 === 3) {
                                setCurrentStage(2);
                            } else {
                                setCurrentStage(1);
                            }

                            handleStageComplete();
                            setPomsLeft(prev => prev - 1);
                        } else {
                            setPomTime(newPomTime);
                        }
                        break;
                    
                    case 1:
                        const newBreakTime = breakTime - 1;

                        if (newBreakTime === 0) {
                            setBreakTime(convertToSeconds(timer.breakTime));

                            setCurrentStage(0);
                            handleStageComplete();
                        } else {
                            setBreakTime(newBreakTime);
                        }
                        break;
                    
                    case 2:
                        const newLongBreakTime = longBreakTime - 1;

                        if (newLongBreakTime === 0) {
                            setLongBreakTime(convertToSeconds(timer.longBreakTime));

                            setCurrentStage(0);
                            handleStageComplete();
                        } else {
                            setLongBreakTime(newLongBreakTime);
                        }
                        break;
                
                    default:
                        break;
                }
            }, 1000);
        

            return () => clearInterval(intervalId);
        }
    }, [pomTime, breakTime, longBreakTime, pomsLeft, currentStage, isPaused]);

    const handleStageComplete = () => {
        setStageComplete(prev => !prev);

        setTimeout(() => {
            setStageComplete(false);
        }, 5000);
    };

    const handleBack = (e : GestureResponderEvent) => {
        router.back();
    };

    const handlePause = (e: GestureResponderEvent) => {
        if (!isPaused) {
            if (intervalId) {
                clearInterval(intervalId);
            }
        }

        setIsPaused(!isPaused);
    };

    const handleRestart = (e: GestureResponderEvent) => {
        setPomsLeft(timer.pomCount);
        setPomTime(convertToSeconds(timer.pomTime));
        setBreakTime(convertToSeconds(timer.breakTime));
        setLongBreakTime(convertToSeconds(timer.longBreakTime));
        setCurrentStage(0);
    }

    const handleRestartCurrent = (e: GestureResponderEvent) => {
        if (currentStage !== 0) {
            setPomsLeft(prev => prev + 1);
        }
        setPomTime(convertToSeconds(timer.pomTime));
        setBreakTime(convertToSeconds(timer.breakTime));
        setLongBreakTime(convertToSeconds(timer.longBreakTime));
        setCurrentStage(0);
    }

    return (
        <PageContainer>
            <Button
                category="tertiary"
                style={{paddingHorizontal: 15, flex: 1}}
                onPress={handleBack}
                description="Tap to go back to the previous page" 
            >
                {
                    color => (
                        <FontAwesomeIcon icon={faArrowLeft} color={color}/>
                    )
                }
            </Button>
            <DefaultText style={styles.pomsLeft} size="lg" fontWeight="semibold" >
                {
                    pomsLeft >= 2 ?
                    <>
                        Poms Left: {pomsLeft}
                    </>
                    :
                    pomsLeft === 1 &&
                    <>
                        Last Pom!
                    </>
                }
            </DefaultText>
            {
                pomsLeft > 0 ?
                <View style={styles.timerSection}>
                    {
                        currentStage === 0 &&
                            <>
                                <DefaultText fontWeight="semibold" style={{textAlign: "center"}} size="xl">
                                    Get to Work!
                                </DefaultText>
                                <DefaultText fontWeight="bold" size="4xl">
                                    {formatTime(pomTime)}
                                </DefaultText>
                            </>
                    }
                    {
                        currentStage === 1 &&
                            <>
                                <DefaultText fontWeight="semibold" style={{textAlign: "center"}} size="xl">
                                    Take a break!
                                </DefaultText>
                                <DefaultText fontWeight="bold" size="4xl">
                                    {formatTime(breakTime)}
                                </DefaultText>
                            </>
                    }
                    {
                        currentStage === 2 &&
                            <>
                                <DefaultText fontWeight="semibold" style={{textAlign: "center"}} size="xl">
                                    Relax!
                                </DefaultText>
                                <DefaultText fontWeight="bold" size="4xl">
                                    {formatTime(longBreakTime)}
                                </DefaultText>
                            </>
                    }
                </View>
                :
                <DefaultText size="xl" style={{padding: 10}} fontWeight="semibold">
                    You've completed your poms!
                </DefaultText>
            }
            <View style={styles.buttons}>
                <View style={styles.buttonContainer}>
                    <Button 
                        style={{flex: 1, borderRadius: 1000, aspectRatio: 1}}
                        category="primary"
                        description={`${isPaused ? "Start" : "Pause"} Timer`}
                        onPress={handlePause}
                    >
                        {
                            color => (
                                <FontAwesomeIcon icon={isPaused ? faPlay : faPause} color={color}/>
                            )
                        }
                    </Button>
                </View>
                <View style={styles.buttonContainer}>
                    <Button 
                        style={{flex: 1, borderRadius: 1000, aspectRatio: 1}}
                        category="tertiary"
                        description={`Restart Current Pom`}
                        onPress={handleRestartCurrent}
                    >
                        {
                            (color) => (
                                <Svg
                                    width={20}
                                    height={20}
                                    viewBox="0 0 512 512"
                                >
                                    {/* <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                                    <Path
                                        fill={color}
                                        d="M0 224c0 17.7 14.3 32 32 32s32-14.3 32-32c0-53 43-96 96-96h160v32c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-9.2-9.2-22.9-11.9-34.9-6.9S320 19.1 320 32v32H160C71.6 64 0 135.6 0 224zm512 64c0-17.7-14.3-32-32-32s-32 14.3-32 32c0 53-43 96-96 96H192v-32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V448h160c88.4 0 160-71.6 160-160z"
                                    />
                                    <Path
                                        stroke={color}
                                        strokeLinecap="round"
                                        strokeWidth={50}
                                        d="M260 320V200M220 220l40-20"
                                    />
                                </Svg>
                            )
                        }
                    </Button>
                </View>
                <View style={styles.buttonContainer}>
                    <Button 
                        style={{flex: 1, borderRadius: 1000, aspectRatio: 1}}
                        category="tertiary"
                        description={`Restart from the Beginning`}
                        onPress={handleRestart}
                    >
                        {
                            (color) => (
                                <>
                                    <FontAwesomeIcon icon={faRefresh} color={color}/>
                                </>
                            )
                        }
                    </Button>
                </View>
            </View>
        </PageContainer>
    )
}


const styles = StyleSheet.create({
    main: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        display: "flex",
        alignContent: "flex-start",
        alignSelf: "flex-start",
        alignItems: "flex-start"
    },
    pomsLeft: {
        display: "flex",
        width: "100%",
        alignSelf: "center",
        textAlign: "center"
        
    },
    timerSection: {
        padding: 10,
        display: "flex",
        gap: 5
    },
    buttons: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "center",
        width: 250
    },
    buttonContainer: {
        flex: 1,
        width: "100%"
    }
});