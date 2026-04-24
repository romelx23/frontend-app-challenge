import { SvgProps } from "react-native-svg";

export interface IconProps extends SvgProps {
  isFocused: boolean;
  color: string;
}
