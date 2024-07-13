import HeaderText from "@/components/HeaderText";
import PageContainer from "@/components/PageContainer";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLaptop, faPlus } from "@fortawesome/free-solid-svg-icons";
import HeaderIcon from "@/components/HeaderIcon";
import { StyleSheet, View } from "react-native";
import { ButtonLink } from "@/components/Button";
import DefaultText from "@/components/DefaultText";
import { useEffect, useState } from "react";
import natsort from "natsort";
import { getProjects } from "@/events/projectEvents";


export default function Projects() {
    const [projects, setProjects] = useState<Projects>({});
    const [sortingHeader, setSortingHeader] = useState<"title" | "createdAt" | "lastModified" | "lastAccessed">("lastAccessed");

    useEffect(() => {
        getProjects()
            .then(res => setProjects(res.data));
    }, [])

    const projectIds : string[] = Object.keys(projects);
    projectIds.sort((a, b) => {
        const sorter = natsort({insensitive: true, desc: false});
        if (sortingHeader === "title") {
            return sorter(projects[a][sortingHeader], projects[b][sortingHeader]);
        }

        const aTime : number = new Date(projects[a][sortingHeader]).getTime();
        const bTime : number = new Date(projects[b][sortingHeader]).getTime();
        return sorter(aTime, bTime);
    });

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
                    projectIds.length >= 1 ?
                    <View style={styles.projects}>
                        {
                            projectIds.map(projectId => (
                                <DefaultText key={projectId}>{projects[projectId].title}</DefaultText>
                            ))
                        }
                    </View>
                    :
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
    projects: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: 5,
    }
});