import { KeyboardAvoidingView, View, StyleSheet, GestureResponderEvent } from "react-native";
import Input from "./Input";
import Button from "./Button";
import { useEffect, useState } from "react";
import { DefaultTimerState } from "@/constants/DefaultTimerState";
import PomSetterGrid from "./PomSetterGrid";
import { router } from "expo-router";
import Loading from "./Loading";
import { createTask, editTask, getTask } from "@/events/projectTaskEvents";
import { TinyEmitter } from "tiny-emitter";
const emitter : TinyEmitter = require("tiny-emitter/instance");


type TaskFormProps = {
    isEdit: boolean,
    projectId: string,
    taskId?: string
};


export default function TaskForm({isEdit, projectId, taskId} : TaskFormProps) {
    const [task, setTask] = useState<Omit<Task, "id">>({
        title: "",
        timer: DefaultTimerState,
    });
    const [loading, setLoading] = useState(false);


    const handleSubmit = (e : GestureResponderEvent) => {
        if (isEdit) {
            editTask(taskId || "", {...task, id: taskId || ""})
                .then(res => {
                    setTask({
                        title: "",
                        timer: DefaultTimerState
                    });
                    emitter.emit("show-toast", "success", "Task edited successfully.");
                    router.push(`projects/${projectId}`);
                })
                .catch(err => {
                    emitter.emit("show-toast", "error", "An unexpected error occured, please try again.");
                    setLoading(false);
                });
        } else {
            createTask(projectId, task)
                .then(res => {
                    setTask({
                        title: "",
                        timer: DefaultTimerState
                    });
                    emitter.emit("show-toast", "success", "Task created successfully.");
                    router.push(`projects/${projectId}`);
                })
                .catch(err => {
                    emitter.emit("show-toast", "error", "An unexpected error occured, please try again.");
                    setLoading(false);
                });
        }
    };

    useEffect(() => {
        if (isEdit) {
            setLoading(true);

            getTask(taskId || "")
                .then(res => {
                    setTask(res.data)
                    setLoading(false);
                })
                .catch(err => {
                    emitter.emit("show-toast", "error", "An unexpected error occured, please try again.");
                    setLoading(false);
                    router.back();
                });;                                                                                                 
        }
    }, [taskId, isEdit]);

    return (
        <>
            <Loading isLoading={loading}/>
            <KeyboardAvoidingView style={styles.wrapper}>
                <Input
                    onChangeText={(val) => setTask(prev => ({...prev, title: val}))}
                    placeholder="Enter Task Name"
                    value={task.title}
                />
                <PomSetterGrid
                    onChange={(timer) => setTask({...task, timer})}
                    value={task.timer}
                />
                <View style={styles.buttons}>
                    <Button category="primary" onPress={handleSubmit}>
                        {isEdit ? "Submit Changes" : "Submit"}
                    </Button>
                    <Button category="tertiary" onPress={e => setTask({...task, timer: DefaultTimerState})}>
                        Reset Timer
                    </Button>
                    <Button category="tertiary" onPress={(_) => router.back()}>
                        Cancel
                    </Button>
                </View>
            </KeyboardAvoidingView>
        </>
    )
}


const styles = StyleSheet.create({
    wrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        gap: 20
    },
    buttons: {
        width: "100%",
        display: "flex",
        gap: 5
    }
});