import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"
import { IconProps } from "../../../interfaces/icon.type"
export const HistoryIcon = (props: IconProps) => (
    <Svg
        width={23}
        height={25}
        fill="none"
        {...props}
    >
        <Path
            fill={props.isFocused ? props.color : "#A7A7A7"}
            stroke="#A7A7A7"
            strokeMiterlimit={10}
            strokeWidth={0.5}
            d="M17.078 8.095h-6.107c-.232 0-.42-.211-.42-.47V1.47a.47.47 0 0 1 .248-.428.388.388 0 0 1 .453.078l6.106 6.154a.52.52 0 0 1 .114.52.425.425 0 0 1-.394.301Zm-5.686-.941h4.592L11.392 2.52v4.634Z"
        />
        <Path
            fill={props.isFocused ? props.color : "#A7A7A7"}
            stroke="#A7A7A7"
            strokeMiterlimit={10}
            strokeWidth={0.5}
            d="M15.074 23.989H3.43C2.094 23.989 1 22.8 1 21.339V3.65C1 2.189 2.089 1 3.431 1h7.54c.232 0 .421.211.421.47v5.678h5.692c.232 0 .42.212.42.471v4.767h-.84V8.09h-5.692c-.232 0-.42-.212-.42-.471V1.941H3.425c-.879 0-1.59.767-1.59 1.708v17.697c0 .941.711 1.707 1.59 1.707h11.642c.75 0 1.407-.579 1.558-1.37l.82.194c-.227 1.225-1.23 2.112-2.372 2.112Z"
        />
        <Path
            fill={props.isFocused ? props.color : "#A7A7A7"}
            stroke="#A7A7A7"
            strokeMiterlimit={10}
            strokeWidth={0.5}
            d="M17.261 22.208c-2.614 0-4.738-2.31-4.738-5.159 0-2.847 2.124-5.158 4.738-5.158 2.615 0 4.738 2.31 4.738 5.158 0 2.848-2.123 5.16-4.738 5.16Zm0-9.376c-2.15 0-3.902 1.894-3.902 4.217 0 2.323 1.752 4.218 3.902 4.218 2.151 0 3.903-1.895 3.903-4.218 0-2.322-1.752-4.217-3.903-4.217Z"
        />
        <Path
            fill={props.isFocused ? props.color : "#A7A7A7"}
            stroke="#A7A7A7"
            strokeMiterlimit={10}
            strokeWidth={0.582}
            d="M17.025 17.556v-2.582c0-.175.092-.32.21-.32.12 0 .21.145.21.32v2.582c0 .175-.09.32-.21.32-.118 0-.21-.145-.21-.32Z"
        />
        <Path
            fill={props.isFocused ? props.color : "#A7A7A7"}
            stroke="#A7A7A7"
            strokeMiterlimit={10}
            strokeWidth={0.582}
            d="M17.1 17.562c0-.175.092-.32.21-.32h1.71c.118 0 .21.145.21.32 0 .175-.092.32-.21.32h-1.71c-.118-.006-.21-.145-.21-.32Z"
        />
        <Path
            fill={props.isFocused ? props.color : "#A7A7A7"}
            stroke="#A7A7A7"
            strokeMiterlimit={10}
            strokeWidth={0.5}
            d="M8.644 6.086h-3.93c-.231 0-.42-.211-.42-.47 0-.26.189-.471.42-.471h3.93c.232 0 .42.21.42.47s-.188.47-.42.47ZM8.643 8.826h-3.93c-.231 0-.42-.211-.42-.47 0-.26.189-.471.42-.471h3.93c.232 0 .42.211.42.47 0 .26-.188.471-.42.471ZM11.198 14.293H4.713c-.231 0-.42-.211-.42-.47 0-.26.189-.471.42-.471h6.485c.232 0 .42.21.42.47s-.188.47-.42.47ZM10.793 17.031H4.708c-.232 0-.42-.211-.42-.47 0-.26.188-.471.42-.471h6.085c.232 0 .42.211.42.47 0 .26-.188.471-.42.471ZM11.198 19.771H4.713c-.231 0-.42-.21-.42-.47s.189-.47.42-.47h6.485c.232 0 .42.21.42.47s-.188.47-.42.47Z"
        />
        <Path
            stroke="#A7A7A7"
            strokeLinecap="round"
            strokeMiterlimit={10}
            strokeWidth={2}
            d="M4.558 11.137h5.034"
        />
        <Path
            stroke="#A7A7A7"
            strokeLinecap="round"
            strokeMiterlimit={10}
            strokeWidth={2.6}
            d="M11.84 11.137h.183"
        />
    </Svg>
)
