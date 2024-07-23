import PageContainer from "@/components/PageContainer";
import { StyleSheet, View } from "react-native";
import HeaderText from "@/components/HeaderText";
import HeaderIcon from "@/components/HeaderIcon";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import TaskForm from "@/components/TaskForm";
import { useLocalSearchParams } from "expo-router";


export default function EditTask() {
    const { projectId, taskId } = useLocalSearchParams<{projectId: string, taskId: string}>();

    return (
        <PageContainer>
            <View style={styles.header}>
                <HeaderIcon icon={faPenToSquare}/>
                <HeaderText>
                    Edit Task 
                </HeaderText>
            </View>
            <TaskForm
                isEdit={true}
                projectId={projectId || ""}
                taskId={taskId || ""}
            />
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
    }
});