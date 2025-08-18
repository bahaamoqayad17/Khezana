import Svg, { Path, Rect } from "react-native-svg";

const ChainIcon = () => {
  return (
    <Svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect width="36" height="36" rx="18" fill="#5D5DFF" />
      <Path
        d="M20.4917 22.5834H21.75C24.2667 22.5834 26.3334 20.5251 26.3334 18.0001C26.3334 15.4834 24.275 13.4167 21.75 13.4167H20.4917"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M15.5 13.4167H14.25C11.725 13.4167 9.66663 15.4751 9.66663 18.0001C9.66663 20.5167 11.725 22.5834 14.25 22.5834H15.5"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M14.6666 18H21.3333"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default ChainIcon;
