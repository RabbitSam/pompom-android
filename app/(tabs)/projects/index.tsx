import HeaderText from "@/components/HeaderText";
import PageContainer from "@/components/PageContainer";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowDown, faArrowUp, faLaptop, faPlus } from "@fortawesome/free-solid-svg-icons";
import HeaderIcon from "@/components/HeaderIcon";
import { Pressable, StyleSheet, View, GestureResponderEvent } from "react-native";
import { ButtonLink } from "@/components/Button";
import DefaultText from "@/components/DefaultText";
import { useEffect, useState } from "react";
import natsort from "natsort";
import { getProjects } from "@/events/projectEvents";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import formatDate from "@/utils/formatDate";
import ModalMenu from "@/components/ModalMenu";
import Loading from "@/components/Loading";
import Select from "@/components/Select";


type SortingHeader = "title" | "createdAt" | "lastModified" | "lastAccessed";

const SortingHeaders : SortingHeader[] = [ "title", "createdAt", "lastModified", "lastAccessed" ];

const SortingHeadersMap : { [key in SortingHeader]: string } = {
    "title": "Project Name",
    "createdAt": "Created",
    "lastAccessed": "Last Accessed",
    "lastModified": "Last Modified"
};


export default function Projects() {
    const [projects, setProjects] = useState<Projects>({});
    const [sortingHeader, setSortingHeader] = useState(3);
    const [isAscending, setIsAscending] = useState(false);

    //#region PageVariables
    const [loading, setLoading] = useState(true);
    //#endregion

    //#region ModalVariables
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project>({
        id: "",
        createdAt: "",
        lastAccessed: "",
        lastModified: "",
        title: "",
        tasks: {
            completed: [],
            current: []
        }
    });
    //#endregion


    useEffect(() => {
        getProjects()
            .then(res => {
                setProjects(res.data);
                setLoading(false);
            });
    }, [])


    const handleOpenModal = (projectId : string) => {
        setSelectedProject(projects[projectId]);
        setModalVisible(true);
    };

    const handleSortingHeaderChange = (index: number) => {
        if (index === sortingHeader) {
            setIsAscending(prev => !prev);
        } else {
            setSortingHeader(index);
            setIsAscending(false);
        }
    };

    const projectIds : string[] = Object.keys(projects);
    projectIds.sort((a, b) => {
        const sorter = natsort({insensitive: true, desc: !isAscending});
        const selectedHeader : SortingHeader = SortingHeaders[sortingHeader];
        if (selectedHeader === "title") {
            return sorter(projects[a][selectedHeader], projects[b][selectedHeader]);
        }

        const aTime : number = new Date(projects[a][selectedHeader]).getTime();
        const bTime : number = new Date(projects[b][selectedHeader]).getTime();
        return sorter(aTime, bTime);
    });

    return (
        <>  
            <Loading isLoading={loading}/>
            <PageContainer>
                <View style={styles.wrapper}>
                    <View style={styles.header}>
                        <HeaderIcon icon={faLaptop}/>
                        <HeaderText>
                            Projects
                        </HeaderText>
                    </View>
                    
                    {
                        projectIds.length >= 1 ?
                        <>
                            <View style={styles.sortingButtons}>
                                <Select
                                    title={
                                        <>
                                            Sort by: {SortingHeadersMap[SortingHeaders[sortingHeader]]}&nbsp;
                                            <FontAwesomeIcon icon={isAscending ? faArrowUp : faArrowDown}/>
                                        </>
                                    }
                                    dropdownTitle="Sort by:"
                                    options={SortingHeaders.map(header => ({
                                        key: header,
                                        title: SortingHeadersMap[header]
                                    }))}
                                    selectedIndex={sortingHeader}
                                    onSelectionChanged={handleSortingHeaderChange}
                                >

                                </Select>
                            </View>
                            <View style={styles.projects}>
                                {
                                    projectIds.map(projectId => (
                                        <ProjectItem
                                            key={projectId}
                                            project={projects[projectId]}
                                            onLongPress={(_) => handleOpenModal(projectId)}
                                        />
                                    ))
                                }
                            </View>
                        </>
                        :
                        <DefaultText>
                            No projects yet.
                        </DefaultText>
                    }
                </View>
            </PageContainer>
            <ButtonLink href="projects/create" category="primary" style={styles.newProjectButton}>
                {
                    (color) => (
                        <FontAwesomeIcon icon={faPlus} color={color} />
                    )
                }
            </ButtonLink>
            <ProjectItemModal 
                selectedProject={selectedProject}
                visible={modalVisible}
                onModalClose={() => setModalVisible(false)}
            />
        </>
    );
}


function ProjectItem({ project, onLongPress } : { project : Project, onLongPress: (e : GestureResponderEvent) => void }) {
    return (
        <Pressable
            style={({ pressed }) => ({
                ...styles.projectItem,
                backgroundColor: pressed ? Colors.darkenedBackground : Colors.background
            })}
            onPress={(_) => router.push(`/projects/${project.id}`)}
            accessibilityHint="Press to view this project, long press for more options."
            onLongPress={onLongPress}
            delayLongPress={200}
        >
            <DefaultText fontWeight="semibold" size="lg" style={styles.projectItemTitle}>
                {project.title}
            </DefaultText>
            <DefaultText>
                Created: {formatDate(project.createdAt)}
            </DefaultText>
            <DefaultText>
                Last Modified: {formatDate(project.lastModified)}
            </DefaultText>
            <DefaultText>
                Last Accessed: {formatDate(project.lastAccessed)}
            </DefaultText>
        </Pressable>
    );
}


type ProjectItemModalProps = {
    visible: boolean,
    selectedProject: Project,
    onModalClose: () => void
};


function ProjectItemModal({ visible, selectedProject, onModalClose } : ProjectItemModalProps) {

    const handleModalItemPressed = (key: "edit" | "delete") => {
        onModalClose();
        router.push(`/projects/${selectedProject.id}/${key}`);
    };

    return (
        <ModalMenu onModalClose={onModalClose} title={`Options for ${selectedProject.title}`} visible={visible}>
            <Pressable
                style={({pressed}) => ({
                    borderBottomWidth: 2,
                    borderBottomColor: Colors.darkenedBackground,
                    padding: 10,
                    backgroundColor: pressed ? Colors.darkenedBackground : Colors.background,
                })}
                onPress={(_) => handleModalItemPressed("edit")}
            >
                <DefaultText fontWeight="medium" size="lg">
                    Edit
                </DefaultText>
            </Pressable>
            <Pressable
                style={({pressed}) => ({
                    padding: 10,
                    backgroundColor: pressed ? Colors.darkenedBackground : Colors.background,
                })}
                onPress={(_) => handleModalItemPressed("delete")}
            >
                <DefaultText fontWeight="medium" size="lg">
                    Delete
                </DefaultText>
            </Pressable>
        </ModalMenu>
    );
}


function SortingModal({ visible, onModalClose } : ProjectItemModalProps) {
    return (
        <ModalMenu title="Sort by" visible={visible} onModalClose={onModalClose}>

        </ModalMenu>
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
        bottom: 20,
        right: 20,
        width: 80,
        aspectRatio: 1,
        borderRadius: 1000,
    },
    projects: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: 15,
        width: "100%"
    },
    projectItem: {
        borderWidth: 2,
        borderColor: Colors.tertiary,
        width: "100%",
        padding: 10,
        borderRadius: 5,
        display: "flex",
        flexDirection: "column",
        gap: 5
    },
    projectItemTitle: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.tertiary,
        width: "100%",
    },
    sortingButtons: {

    }
});