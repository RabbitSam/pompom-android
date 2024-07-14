import PageContainer from "@/components/PageContainer";
import { StyleSheet, View } from "react-native";
import HeaderText from "@/components/HeaderText";
import { Colors } from "@/constants/Colors";
import ProjectForm from "@/components/ProjectForm";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useLocalSearchParams } from "expo-router";


export default function EditProject() {
    const { projectId } = useLocalSearchParams<{projectId: string}>();

    return (
        <PageContainer>
            <View style={styles.header}>
                <FontAwesomeIcon icon={faPenToSquare} color={Colors.primary} size={28}/>
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