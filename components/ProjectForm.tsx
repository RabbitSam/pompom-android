import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import { GestureResponderEvent, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import Input from "./Input";
import Button from "./Button";
import Loading from "./Loading";
import { router } from "expo-router";
import { createProject, editProject, getProject } from "@/events/projectEvents";



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

                    router.push(`/projects/${res.data}`);
                })
                .catch();

        } else {
            editProject(projectId, title)
                .then(res => {
                    setTitle("");
                    setLoading(false);

                    router.push(`/projects/${projectId}`);
                })
                .catch();
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
                    <Button category="primary" onPress={handleSubmit}>
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