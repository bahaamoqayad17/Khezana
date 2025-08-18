import Svg, { Path, Rect } from "react-native-svg";

const ConsecutiveDaysIcon = () => {
  return (
    <Svg
      width="36"
      height="37"
      viewBox="0 0 36 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect y="0.154053" width="36" height="36" rx="18" fill="#FF1EDA" />
      <Path
        d="M21.75 16.0708L18.25 19.5708L16.9167 17.5708L14.25 20.2375"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M20.0834 16.0708H21.75V17.7375"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M15.5 26.4875H20.5C24.6666 26.4875 26.3333 24.8208 26.3333 20.6541V15.6541C26.3333 11.4875 24.6666 9.8208 20.5 9.8208H15.5C11.3333 9.8208 9.66663 11.4875 9.66663 15.6541V20.6541C9.66663 24.8208 11.3333 26.4875 15.5 26.4875Z"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default ConsecutiveDaysIcon;
