import { Colors } from "@/constants/Colors";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function HeaderIcon({ icon } : {icon : IconProp}) {
    return (
        <FontAwesomeIcon icon={icon} color={Colors.primary} size={28}/>
    );
}