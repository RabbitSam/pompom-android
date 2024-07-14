import PageContainer from "@/components/PageContainer";
import { StyleSheet, View } from "react-native";
import HeaderText from "@/components/HeaderText";
import { Colors } from "@/constants/Colors";
import ProjectForm from "@/components/ProjectForm";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


export default function CreateProject() {

    return (
        <PageContainer>
            <View style={styles.header}>
                <FontAwesomeIcon icon={faPlus} color={Colors.primary} size={28}/>
                <HeaderText>
                    Create Project 
                </HeaderText>
            </View>
            <ProjectForm isEdit={false}  />
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