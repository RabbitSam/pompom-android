import PageContainer from "@/components/PageContainer";
import { getProject } from "@/events/projectEvents";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { GestureResponderEvent, Pressable, StyleSheet, View } from "react-native";
import HeaderText from "@/components/HeaderText";
import Button, { ButtonLink } from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPenToSquare, faTrash, faPlus, faPlay } from "@fortawesome/free-solid-svg-icons";
import DefaultText from "@/components/DefaultText";
import { Colors } from "@/constants/Colors";
import { useDispatch } from "react-redux";
import { setTimers } from "@/stores/currentTimerSlice";
import formatDate from "@/utils/formatDate";
import ModalMenu from "@/components/ModalMenu";
import { getTasks } from "@/events/projectTaskEvents";


export default function ViewProject() {
    const { projectId } = useLocalSearchParams<{projectId: string}>();
    const [project, setProject] = useState<Project>({
        id: "",
        createdAt: "",
        lastAccessed: "",
        lastModified: "",
        tasks: {
            current: [],
            completed: []
        },
        title: ""
    });
    const [tasks, setTasks] = useState<{completed: Task[], current: Task[]}>({
        completed: [],
        current: []
    });

    const [loading, setLoading] = useState(true);
    const [selectedTab, setSelectedTab] = useState<"current" | "completed">("current");

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    useEffect(() => {
        setLoading(true);
        getProject(projectId || "")
            .then(res => {
                setProject(res.data);
            })
            .then(() => getTasks(projectId || ""))
            .then(res => {
                setTasks(res.data);
                setLoading(false);
            });
    }, [projectId]);

    const handleTaskLongPress = (e: GestureResponderEvent, task: Task) => {
        setSelectedTask(task);
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setSelectedTask(null);
        setModalVisible(false);
    };

    return (
        <>
            <Loading isLoading={loading}/>
            <PageContainer>
                <View style={styles.wrapper}>
                    <View style={styles.header}>
                        <HeaderText>{project.title}</HeaderText>
                        <View style={styles.headerButtonContainer}>
                            <Button
                                category="tertiary"
                                description="Press to edit project."
                                style={styles.headerButton}
                                onPress={(_) => router.push(`/projects/${projectId}/edit`)}
                            >
                                {
                                    (color) => (
                                        <FontAwesomeIcon icon={faPenToSquare} color={color}/>
                                    )
                                }
                            </Button>
                            <Button
                                category="tertiary"
                                description="Press to delete project."
                                style={styles.headerButton}
                                onPress={(_) => router.push(`/projects/${projectId}/delete`)}
                            >
                                {
                                    (color) => (
                                        <FontAwesomeIcon icon={faTrash} color={color}/>
                                    )
                                }
                            </Button>
                        </View>
                    </View>
                    <View style={styles.tabs}>
                        <TabButton
                            title="Current"
                            selected={selectedTab === "current"}
                            onPress={(_) => setSelectedTab("current")}
                        />
                        <TabButton
                            title="Completed"
                            selected={selectedTab === "completed"}
                            onPress={(_) => setSelectedTab("completed")}
                        />
                    </View>
                    <View style={styles.tasks}>
                        {
                            tasks[selectedTab].map(task => (
                                <TaskItem task={task} onLongPress={e => handleTaskLongPress(e, task)}/>
                            ))
                        }
                    </View>
                </View>
            </PageContainer>
            <ButtonLink href={`/projects/${projectId}/tasks/create`} category="primary" style={styles.newTaskButton}>
                {
                    (color) => (
                        <FontAwesomeIcon icon={faPlus} color={color} />
                    )
                }
            </ButtonLink>
            <ModalMenu title={`Options for ${selectedTask?.title}`} visible={modalVisible} onModalClose={handleModalClose}>

            </ModalMenu>
        </>
    );
}


type TaskItemProps = {
    task: Task,
    onLongPress?: (e : GestureResponderEvent) => void
}


function TaskItem({ task, onLongPress } : TaskItemProps) {
    const dispatch = useDispatch();

    const handleTaskItemPressed = (e: GestureResponderEvent) => {
        e.preventDefault();

        dispatch(setTimers(task.timer));

        router.push("/start-timer/");
    };

    const calculateTotalPomTime = (timer : TimerState) => {
        const numLongBreaks : number = Math.floor(timer.pomCount / 5);

        const totalPomMinutes : number = ((timer.pomTime.minute + timer.breakTime.minute) * timer.pomCount) + (timer.longBreakTime.minute * numLongBreaks);
        const finalHours = ((timer.pomTime.hour + timer.breakTime.hour) * timer.pomCount) + Math.floor(totalPomMinutes / 60) + (timer.longBreakTime.hour * numLongBreaks);
        const finalMinutes = totalPomMinutes % 60;

        return `${finalHours}h ${finalMinutes}m`;
    }

    const taskIsComplete = !!task.completedAt;

    return (
        <Pressable
            style={({ pressed }) => ({
                ...styles.taskItem,
                backgroundColor: pressed ? Colors.darkenedBackground : Colors.background
            })}
            accessibilityHint="Long press for more options on this task."
            onLongPress={onLongPress}
            delayLongPress={200}
        >
            {
                taskIsComplete &&
                <Button
                    category="primary"
                    description="Start task."
                    onPress={handleTaskItemPressed}
                >
                    {
                        color => (
                            <FontAwesomeIcon icon={faPlay} color={color}/>
                        )
                    }
                </Button>
            }
            <View style={styles.taskInfo}>
                <DefaultText fontWeight="semibold" size="lg" style={styles.taskItemTitle}>
                    {task.title}
                </DefaultText>
                {
                    taskIsComplete ?
                    <DefaultText>
                        Completed On: {formatDate(task.completedAt || new Date())}
                    </DefaultText>
                    :
                    <>
                        <DefaultText>
                            Pomodoros: {task.timer.pomCount}
                        </DefaultText>
                        <DefaultText>
                            Total Time: {calculateTotalPomTime(task.timer)}
                        </DefaultText>
                    </>
                }
            </View>
        </Pressable>
    );
}



type TabButtonProps = {
    onPress?: (e: GestureResponderEvent) => void,
    title: string,
    selected: boolean
};


function TabButton({title, onPress, selected} : TabButtonProps) {
    return (
        <Pressable
            onPress={onPress}
            style={{
                ...styles.tabButton,
                backgroundColor: selected ? Colors.primary : Colors.background,
            }}
        >
            <DefaultText
                size="lg"
                fontWeight="bold"
                style={{
                    color: selected ? Colors.white : Colors.primary
                }}
            >
                {title}
            </DefaultText>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 5,
        width: "100%",
    },
    headerButton: {
        paddingHorizontal: 14,
        width: "auto"
    },
    headerButtonContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 5
    },
    wrapper: {
        flex: 1,
        display: "flex",
        gap: 20,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        width: "100%"
    },
    tabs: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        borderBottomColor: Colors.primary,
        borderBottomWidth: 2
    },
    tabButton: {
        flex: 1,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        padding: 10,
    },
    tasks: {
        display: "flex",
        gap: 10
    },
    taskItem: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        borderWidth: 2,
        borderRadius: 5,
        borderColor: Colors.tertiary
    },
    taskInfo: {
        flex: 1,
        display: "flex",
        gap: 5
    },
    taskItemTitle: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.tertiary,
        width: "100%"
    },
    newTaskButton: {
        position: "absolute",
        elevation: 100,
        bottom: 20,
        right: 20,
        width: 80,
        aspectRatio: 1,
        borderRadius: 1000,
    },
    playButton: {
        width: 50,
        aspectRatio: 1,
        borderRadius: 1000
    }
});