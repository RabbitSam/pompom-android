import { ImageStyle, TextStyle, ViewStyle } from "react-native";

export const VisuallyHidden : ViewStyle | ImageStyle | TextStyle  = {
    height: 0,
    overflow: "hidden",
    position: "absolute",
    width: 0,
    flexWrap: "nowrap",
};