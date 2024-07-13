import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { GestureResponderEvent, StyleSheet, View } from "react-native";
import Input from "./Input";
import Button from "./Button";
import { router } from "expo-router";
import { createProject } from "@/events/projectEvents";



type ProjectFormProps = {
    isEdit: boolean,
    projectId?: string
}


export default function ProjectForm({ isEdit, projectId } : ProjectFormProps ) {
    const [title, setTitle] = useState("");

    const handleSubmit = (e: GestureResponderEvent) => {
        if (!isEdit) {
            createProject(title)
                .then(res =>
                    router.push(`projects`)
                )
                .catch();

        } else {

        }
    };

    return (
        <>
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
        </>
    );
}


const styles = StyleSheet.create({
    buttons: {
        width: "100%",
        display: "flex",
        gap: 5
    }
});