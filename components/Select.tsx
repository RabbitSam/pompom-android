import { Pressable, StyleSheet } from "react-native";
import DefaultText from "./DefaultText";
import { Colors } from "@/constants/Colors";
import ModalMenu from "./ModalMenu";
import { ReactNode, useState } from "react";
import { faCaretDown, faDotCircle, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";


type DropdownProps = {
    title: ReactNode,
    dropdownTitle: string,
    options: {key: string, title: string}[],
    selectedIndex: number,
    onSelectionChanged : (index: number) => void,
}


export default function Select({ title, dropdownTitle, options, selectedIndex, onSelectionChanged } : DropdownProps) {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const handleSelected = (index : number) => {
        setDropdownVisible(false);
        onSelectionChanged(index);
    };

    return (
        <>
            <Pressable
                style={({pressed}) => ({
                    ...styles.button,
                    backgroundColor: pressed ? Colors.background : Colors.darkenedBackground
                })}
                onPress={(_) => setDropdownVisible(true)}
            >
                <DefaultText size="lg" fontWeight="semibold">
                    {title}
                </DefaultText>
                <FontAwesomeIcon icon={faCaretDown}/>
            </Pressable>
            <ModalMenu
                visible={dropdownVisible}
                onModalClose={() => setDropdownVisible(false)}
                title={dropdownTitle}
            >
                {
                    options.map((option, indx) => 
                        <SelectOption 
                            key={option.key}
                            title={option.title}
                            selected={indx === selectedIndex} 
                            onSelected={() => handleSelected(indx)}
                            last={indx === options.length - 1}
                        />
                    )
                }
            </ModalMenu>
        </>
    );
}


type DropdownItemProps = {
    title: string,
    selected: boolean,
    onSelected: () => void,
    last?: boolean
}


function SelectOption({ title, onSelected, selected, last=false} : DropdownItemProps) {
    return (
        <Pressable
            onPress={(_) => onSelected()}
            style={({ pressed }) => ({
                ...styles.dropdownItem,
                backgroundColor: pressed ? Colors.darkenedBackground : Colors.background,
                borderBottomWidth: last ? 0 : 2,
            })}
        >
            <FontAwesomeIcon icon={selected ? faCircleCheck : faDotCircle} color={Colors.tertiary}/>
            <DefaultText size="lg" fontWeight="semibold" style={{ flex: 1 }}>
                {title}
            </DefaultText>
        </Pressable>
    );
}



const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: Colors.darkenedBackground,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    dropdownItem: {
        padding: 10,
        borderBottomColor: Colors.darkenedBackground,
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
});