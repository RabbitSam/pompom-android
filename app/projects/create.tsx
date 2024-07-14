import PageContainer from "@/components/PageContainer";
import { StyleSheet, View } from "react-native";
import HeaderText from "@/components/HeaderText";
import ProjectForm from "@/components/ProjectForm";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import HeaderIcon from "@/components/HeaderIcon";


export default function CreateProject() {

    return (
        <PageContainer>
            <View style={styles.header}>
                <HeaderIcon icon={faPlus}/>
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