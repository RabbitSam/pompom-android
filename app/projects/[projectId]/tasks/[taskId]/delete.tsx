import PageContainer from "@/components/PageContainer";
import { GestureResponderEvent, StyleSheet, View } from "react-native";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import HeaderIcon from "@/components/HeaderIcon";
import HeaderText from "@/components/HeaderText";
import Loading from "@/components/Loading";
import Button from "@/components/Button";
import DefaultText from "@/components/DefaultText";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { DefaultTimerState } from "@/constants/DefaultTimerState";
import { deleteTask, getTask } from "@/events/projectTaskEvents";
import { router } from "expo-router";
import { TinyEmitter } from "tiny-emitter";
const emitter : TinyEmitter = require("tiny-emitter/instance");


export default function DeleteTask() {
    const { projectId, taskId } = useLocalSearchParams<{projectId: string, taskId: string}>();
    const [task, setTask] = useState<Task>({
        id: "",
        timer: DefaultTimerState,
        title: ""
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTask(taskId || "")
            .then(res => {
                setTask(res.data);
                setLoading(false);
            })
            .catch(err => {
                emitter.emit("show-toast", "error", "An unexpected error occured, please try again.");
                setLoading(false);
                router.back();
            });
    }, [taskId]);

    const handleSubmit = (e: GestureResponderEvent) => {
        setLoading(true);
        deleteTask(projectId || "", taskId || "")
            .then(data => {
                setLoading(false);
                setTask({
                    id: "",
                    timer: DefaultTimerState,
                    title: ""
                });
                emitter.emit("show-toast", "success", "Task deleted successfully.");
                router.push(`/projects/${projectId}/`);
            })
            .catch(err => {
                emitter.emit("show-toast", "error", "An unexpected error occured, please try again.");
                setLoading(false);
            });;
    };


    return (
        <PageContainer>
            <View style={styles.header}>
                <HeaderIcon icon={faTrash}/>
                <HeaderText>
                    Edit Task 
                </HeaderText>
            </View>
            <DefaultText>
                Are you sure you want to delete this task? <DefaultText fontWeight="bold">This cannot be undone.</DefaultText>
            </DefaultText>
            <DefaultText fontWeight="bold">
                Task Name: {task.title}
            </DefaultText>
            <View style={styles.buttons}>
                <Button category="tertiary" onPress={handleSubmit}>
                    Delete Task
                </Button>
                <Button category="secondary" onPress={(_) => router.back()}>
                    No, Go Back
                </Button>
            </View>
            <Loading isLoading={loading}/>
        </PageContainer>
    );
}


const styles = StyleSheet.create({
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5
    },
    buttons: {
        width: "100%",
        display: "flex",
        gap: 5
    }
});