import Svg, { Path, Rect } from "react-native-svg";

const AuthorIcon = () => {
  return (
    <Svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect width="40" height="40" rx="20" fill="#65382C" />
      <Path
        d="M20 20C22.7614 20 25 17.7614 25 15C25 12.2386 22.7614 10 20 10C17.2386 10 15 12.2386 15 15C15 17.7614 17.2386 20 20 20Z"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M28.5899 30C28.5899 26.13 24.7399 23 19.9999 23C15.2599 23 11.4099 26.13 11.4099 30"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default AuthorIcon;
