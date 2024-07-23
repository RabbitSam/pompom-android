import PageContainer from "@/components/PageContainer";
import { StyleSheet, View } from "react-native";
import HeaderText from "@/components/HeaderText";
import HeaderIcon from "@/components/HeaderIcon";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import TaskForm from "@/components/TaskForm";
import { useLocalSearchParams } from "expo-router";


export default function CreateTask() {
    const { projectId } = useLocalSearchParams<{projectId: string}>();

    return (
        <PageContainer>
            <View style={styles.header}>
                <HeaderIcon icon={faPlus}/>
                <HeaderText>
                    Create Task 
                </HeaderText>
            </View>
            <TaskForm
                isEdit={false}
                projectId={projectId || ""}
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