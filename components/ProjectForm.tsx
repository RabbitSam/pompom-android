import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import { GestureResponderEvent, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import Input from "./Input";
import Button from "./Button";
import Loading from "./Loading";
import { router } from "expo-router";
import { createProject, editProject, getProject } from "@/events/projectEvents";
import { TinyEmitter } from "tiny-emitter";
const emitter : TinyEmitter = require("tiny-emitter/instance");



type ProjectFormProps = {
    isEdit: boolean,
    projectId?: string
}


export default function ProjectForm({ isEdit, projectId="" } : ProjectFormProps ) {
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(isEdit);

    useEffect(() => {
        if (isEdit) {
            setLoading(true);
            getProject(projectId)
                .then(res => {
                    setTitle(res.data.title);
                    setLoading(false);
                })
                .catch(err => {
                    emitter.emit("show-toast", "error", "An unexpected error occurred, please try again.");
                    setLoading(false);
                    router.re();
                });
        }
    }, [projectId, isEdit]);

    const handleSubmit = (e: GestureResponderEvent) => {
        setLoading(true);

        if (!isEdit) {
            createProject(title)
                .then(res => {
                    setTitle("");
                    setLoading(false);
                    
                    emitter.emit("show-toast", "SUCCESS", "Successfully created project.");
                    router.push(`/projects/${res.data}`);
                })
                .catch(err => {
                    emitter.emit("show-toast", "error", "An unexpected error occurred, please try again.");
                    setLoading(false);
                });

        } else {
            editProject(projectId, title)
                .then(res => {
                    setTitle("");
                    setLoading(false);

                    emitter.emit("show-toast", "SUCCESS", "Successfully edited project title.");
                    router.push(`/projects/${projectId}`);
                })
                .catch(err => {
                    emitter.emit("show-toast", "error", "An unexpected error occurred, please try again.");
                    setLoading(false);
                });
        }
    };

    return (
        <>
            <Loading isLoading={loading}/>
            <KeyboardAvoidingView style={styles.wrapper}>
                <Input
                    onChangeText={setTitle}
                    placeholder="Enter Project Name"
                    value={title}
                />
                <View style={styles.buttons}>
                    <Button category="primary" onPress={handleSubmit} disabled={!title.length}>
                        {isEdit ? "Submit Changes" : "Submit"}
                    </Button>
                    <Button category="tertiary" onPress={(_) => router.back()}>
                        Cancel
                    </Button>
                </View>
            </KeyboardAvoidingView>
        </>
    );
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