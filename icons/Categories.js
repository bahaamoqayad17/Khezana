import Svg, { Path } from "react-native-svg";

const CategoriesIcon = ({ color }) => {
  return color === "#65382C" ? (
    <Svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M7.49 2H5.59C3.4 2 2.25 3.15 2.25 5.33V7.23C2.25 9.41 3.4 10.56 5.58 10.56H7.48C9.66 10.56 10.81 9.41 10.81 7.23V5.33C10.82 3.15 9.67 2 7.49 2Z"
        fill="#CE9664"
      />
      <Path
        d="M18.9199 2H17.0199C14.8399 2 13.6899 3.15 13.6899 5.33V7.23C13.6899 9.41 14.8399 10.56 17.0199 10.56H18.9199C21.0999 10.56 22.2499 9.41 22.2499 7.23V5.33C22.2499 3.15 21.0999 2 18.9199 2Z"
        fill="#CE9664"
      />
      <Path
        d="M18.9199 13.43H17.0199C14.8399 13.43 13.6899 14.58 13.6899 16.76V18.66C13.6899 20.84 14.8399 21.99 17.0199 21.99H18.9199C21.0999 21.99 22.2499 20.84 22.2499 18.66V16.76C22.2499 14.58 21.0999 13.43 18.9199 13.43Z"
        fill="#CE9664"
      />
      <Path
        d="M7.49 13.43H5.59C3.4 13.43 2.25 14.58 2.25 16.76V18.66C2.25 20.85 3.4 22 5.58 22H7.48C9.66 22 10.81 20.85 10.81 18.67V16.77C10.82 14.58 9.67 13.43 7.49 13.43Z"
        fill="#CE9664"
      />
    </Svg>
  ) : (
    <Svg width="25" height="24" viewBox="0 0 25 24" fill="none">
      <Path
        d="M5.25 10H7.25C9.25 10 10.25 9 10.25 7V5C10.25 3 9.25 2 7.25 2H5.25C3.25 2 2.25 3 2.25 5V7C2.25 9 3.25 10 5.25 10Z"
        stroke="#767676"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.25 10H19.25C21.25 10 22.25 9 22.25 7V5C22.25 3 21.25 2 19.25 2H17.25C15.25 2 14.25 3 14.25 5V7C14.25 9 15.25 10 17.25 10Z"
        stroke="#767676"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.25 22H19.25C21.25 22 22.25 21 22.25 19V17C22.25 15 21.25 14 19.25 14H17.25C15.25 14 14.25 15 14.25 17V19C14.25 21 15.25 22 17.25 22Z"
        stroke="#767676"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.25 22H7.25C9.25 22 10.25 21 10.25 19V17C10.25 15 9.25 14 7.25 14H5.25C3.25 14 2.25 15 2.25 17V19C2.25 21 3.25 22 5.25 22Z"
        stroke="#767676"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default CategoriesIcon;
