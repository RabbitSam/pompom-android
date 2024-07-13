import HeaderText from "@/components/HeaderText";
import PageContainer from "@/components/PageContainer";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLaptop, faPlus } from "@fortawesome/free-solid-svg-icons";
import HeaderIcon from "@/components/HeaderIcon";
import { StyleSheet, View } from "react-native";
import { ButtonLink } from "@/components/Button";
import DefaultText from "@/components/DefaultText";


export default function Projects() {
    const projectIds : string[] = [];

    return (
        <PageContainer>
            <View style={styles.wrapper}>
                <View style={styles.header}>
                    <HeaderIcon icon={faLaptop}/>
                    <HeaderText>
                        Projects
                    </HeaderText>
                </View>
                <ButtonLink href="projects/create" category="primary" style={styles.newProjectButton}>
                    {
                        (color) => (
                            <FontAwesomeIcon icon={faPlus} color={color} />
                        )
                    }
                </ButtonLink>
                {
                    !projectIds.length &&
                    <DefaultText>
                        No projects yet.
                    </DefaultText>
                }
            </View>
        </PageContainer>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        display: "flex",
        width: "100%",
        position: "relative",
        gap: 20
    },
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        width: "100%",
    },
    newProjectButton: {
        position: "absolute",
        elevation: 100,
        bottom: 0,
        right: 0,
        width: 80,
        aspectRatio: 1,
        borderRadius: 1000,
    },
})