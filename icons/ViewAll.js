import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

const ViewAllIcon = () => {
  return (
    <Svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G clipPath="url(#clip0_0_1104)">
        <Path
          d="M8 0.75C3.71875 0.75 0.25 4.21875 0.25 8.5C0.25 12.7812 3.71875 16.25 8 16.25C12.2812 16.25 15.75 12.7812 15.75 8.5C15.75 4.21875 12.2812 0.75 8 0.75ZM4.44063 7.96875L8.675 3.73438C8.96875 3.44062 9.44375 3.44062 9.73438 3.73438L10.2656 4.26562C10.5594 4.55938 10.5594 5.03437 10.2656 5.325L7.09062 8.5L10.2656 11.675C10.5594 11.9688 10.5594 12.4438 10.2656 12.7344L9.73438 13.2656C9.44063 13.5594 8.96563 13.5594 8.675 13.2656L4.44063 9.03125C4.14688 8.7375 4.14688 8.2625 4.44063 7.96875Z"
          fill="#CE9664"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_0_1104">
          <Rect
            width="16"
            height="16"
            fill="white"
            transform="matrix(-1 0 0 1 16 0.5)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default ViewAllIcon;
