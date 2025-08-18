import Svg, { Path, Rect } from "react-native-svg";

const ReadingHourIcon = () => {
  return (
    <Svg
      width="36"
      height="37"
      viewBox="0 0 36 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect y="0.577148" width="36" height="36" rx="18" fill="#CFCFD9" />
      <Path
        d="M18 26.9106C22.5833 26.9106 26.3333 23.1606 26.3333 18.5772C26.3333 13.9939 22.5833 10.2439 18 10.2439C13.4166 10.2439 9.66663 13.9939 9.66663 18.5772C9.66663 23.1606 13.4166 26.9106 18 26.9106Z"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M14.4584 18.5771L16.8167 20.9354L21.5417 16.2188"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default ReadingHourIcon;
