import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import PageContainer from "@/components/PageContainer";
import HeaderText from "@/components/HeaderText";
import HeaderIcon from "@/components/HeaderIcon";
import { GestureResponderEvent, StyleSheet, View } from "react-native";
import DefaultText from "@/components/DefaultText";
import { deleteProject, getProject } from "@/events/projectEvents";
import Button from "@/components/Button";
import { router } from "expo-router";
import Loading from "@/components/Loading";


export default function Delete() {
    const { projectId } = useLocalSearchParams<{projectId: string}>();
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProject(projectId || "")
            .then(res => {
                setTitle(res.data.title);
                setLoading(false);
            });
    }, []);


    const handleSubmit = (e: GestureResponderEvent) => {
        setLoading(true);
        deleteProject(projectId || "")
            .then(res => {
                setTitle("");
                setLoading(false);
                router.push("/projects/");
            });
    };


    return (
        <PageContainer>
            <View style={styles.header}>
                <HeaderIcon icon={faTrash}/>
                <HeaderText>
                    Delete Project 
                </HeaderText>
            </View>
            <DefaultText>
                Are you sure you want to delete this project? <DefaultText fontWeight="bold">This cannot be undone.</DefaultText>
            </DefaultText>
            <DefaultText fontWeight="bold">
                Project Name: {title}
            </DefaultText>
            <View style={styles.buttons}>
                <Button category="tertiary" onPress={handleSubmit}>
                    Delete Project
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