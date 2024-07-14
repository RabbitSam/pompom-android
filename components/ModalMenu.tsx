import { Modal, View, Pressable, StyleSheet } from "react-native";
import DefaultText from "./DefaultText";
import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { Colors } from "@/constants/Colors";


type ModalMenuProps = {
    visible: boolean,
    onModalClose: () => void,
    children?: ReactNode,
    title: string
}


export default function ModalMenu({ visible, onModalClose, children, title } : ModalMenuProps) {
    return (
        <Modal animationType="fade" visible={visible} transparent={true}>
            <Pressable style={styles.modalBackground} accessibilityHint="Press to close." onPress={(_) => onModalClose()} />
            <View style={styles.modalContent}>
                <View style={styles.modalHeaderContainer}>
                    <DefaultText fontWeight="semibold" size="xl" style={styles.modalHeader}>{title}</DefaultText>
                    <Pressable
                        accessibilityHint="Press to close."
                        onPress={(_) => onModalClose()}
                        style={styles.modalCloseButton}
                    >
                        <FontAwesomeIcon icon={faX}/>
                    </Pressable>
                </View>
                {children}
            </View>
        </Modal>
    );
}


const styles = StyleSheet.create({
    modalBackground: {
        backgroundColor: Colors.black,
        flex: 1,
        position: "absolute",
        opacity: 0.5,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: "100%",
        width: "100%",
    },
    modalMain: {
        padding: 20,
        width: "100%",
        alignSelf: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        gap: 10,
    },
    modalContent: {
        borderWidth: 2,
        borderColor: Colors.tertiary,
        borderRadius: 5,
        width: "90%",
        padding: 20,
        backgroundColor: Colors.background,
        margin: "auto"
    },
    modalHeaderContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 2,
        borderBottomColor: Colors.darkenedBackground,
    },
    modalHeader: {
        paddingLeft: 10,
        paddingBottom: 10
    },
    modalCloseButton: {
        padding: 10,
    }
});