import ModalMenu from "./ModalMenu";
import DefaultText from "./DefaultText";
import { GestureResponderEvent, Pressable } from "react-native";
import { Colors } from "@/constants/Colors";


type OptionsModalProps = {
    visible: boolean,
    title: string,
    onModalClose: () => void,
    onItemPressed: (index: number) => void,
    items: {key: string, title: string}[]
};


export default function OptionsMenu({ visible, title, onModalClose, onItemPressed, items } : OptionsModalProps) {
    return (
        <ModalMenu onModalClose={onModalClose} title={title} visible={visible}>
            {
                items.map((item, index) => (
                    <Pressable
                        style={({pressed}) => ({
                            borderBottomWidth: index !== items.length - 1 ? 2 : 0,
                            borderBottomColor: Colors.darkenedBackground,
                            padding: 10,
                            backgroundColor: pressed ? Colors.darkenedBackground : Colors.background,
                        })}
                        onPress={(_) => onItemPressed(index)}
                        key={item.key}
                    >
                        <DefaultText size="lg" fontWeight="medium">
                            {item.title}
                        </DefaultText>
                    </Pressable>
                ))
            }
        </ModalMenu>
    );
}