import Svg, { Path, Rect } from "react-native-svg";

const CompletedBooksIcon = () => {
  return (
    <Svg
      width="37"
      height="37"
      viewBox="0 0 37 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect
        x="0.5"
        y="0.577148"
        width="36"
        height="36"
        rx="18"
        fill="#D7B367"
      />
      <Path
        d="M26.8333 22.5272V12.4689C26.8333 11.4689 26.0166 10.7272 25.025 10.8106H24.975C23.225 10.9606 20.5666 11.8522 19.0833 12.7856L18.9416 12.8772C18.7 13.0272 18.3 13.0272 18.0583 12.8772L17.85 12.7522C16.3666 11.8272 13.7166 10.9439 11.9666 10.8022C10.975 10.7189 10.1666 11.4689 10.1666 12.4606V22.5272C10.1666 23.3272 10.8166 24.0772 11.6166 24.1772L11.8583 24.2106C13.6666 24.4522 16.4583 25.3689 18.0583 26.2439L18.0916 26.2606C18.3166 26.3856 18.675 26.3856 18.8916 26.2606C20.4916 25.3772 23.2916 24.4522 25.1083 24.2106L25.3833 24.1772C26.1833 24.0772 26.8333 23.3272 26.8333 22.5272Z"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M18.5 13.1521V25.6521"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M14.9584 15.6521H13.0834"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M15.5834 18.1521H13.0834"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default CompletedBooksIcon;
