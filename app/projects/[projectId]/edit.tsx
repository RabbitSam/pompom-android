import PageContainer from "@/components/PageContainer";
import { StyleSheet, View } from "react-native";
import HeaderText from "@/components/HeaderText";
import ProjectForm from "@/components/ProjectForm";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useLocalSearchParams } from "expo-router";
import HeaderIcon from "@/components/HeaderIcon";


export default function EditProject() {
    const { projectId } = useLocalSearchParams<{projectId: string}>();

    return (
        <PageContainer>
            <View style={styles.header}>
                <HeaderIcon icon={faPenToSquare} />
                <HeaderText>
                    Edit Project 
                </HeaderText>
            </View>
            <ProjectForm isEdit={true} projectId={projectId}  />
        </PageContainer>
    )
}


const styles = StyleSheet.create({
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5
    }
});