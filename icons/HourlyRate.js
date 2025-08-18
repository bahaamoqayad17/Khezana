import Svg, { Path, Rect } from "react-native-svg";

const HourlyRateIcon = () => {
  return (
    <Svg
      width="36"
      height="37"
      viewBox="0 0 36 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect y="0.5" width="36" height="36" rx="18" fill="#838383" />
      <Path
        d="M25.2917 19.5417C25.2917 23.5667 22.025 26.8333 18 26.8333C13.975 26.8333 10.7084 23.5667 10.7084 19.5417C10.7084 15.5167 13.975 12.25 18 12.25C22.025 12.25 25.2917 15.5167 25.2917 19.5417Z"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M18 15.1667V19.3334"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M15.5 10.1667H20.5"
        stroke="white"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default HourlyRateIcon;
