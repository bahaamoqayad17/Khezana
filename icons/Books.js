import Svg, { Path } from "react-native-svg";

const BooksIcon = ({ color }) => {
  return color === "#65382C" ? (
    <Svg width="25" height="24" viewBox="0 0 25 24" fill="none">
      <Path
        d="M21 16V18.5C21 20.43 19.43 22 17.5 22H7.5C5.57 22 4 20.43 4 18.5V17.85C4 16.28 5.28 15 6.85 15H20C20.55 15 21 15.45 21 16Z"
        fill="#CE9664"
      />
      <Path
        d="M16 2H9C5 2 4 3 4 7V14.58C4.76 13.91 5.76 13.5 6.85 13.5H20C20.55 13.5 21 13.05 21 12.5V7C21 3 20 2 16 2ZM13.5 10.75H8.5C8.09 10.75 7.75 10.41 7.75 10C7.75 9.59 8.09 9.25 8.5 9.25H13.5C13.91 9.25 14.25 9.59 14.25 10C14.25 10.41 13.91 10.75 13.5 10.75ZM16.5 7.25H8.5C8.09 7.25 7.75 6.91 7.75 6.5C7.75 6.09 8.09 5.75 8.5 5.75H16.5C16.91 5.75 17.25 6.09 17.25 6.5C17.25 6.91 16.91 7.25 16.5 7.25Z"
        fill="#CE9664"
      />
    </Svg>
  ) : (
    <Svg width="25" height="24" viewBox="0 0 25 24" fill="none">
      <Path
        d="M4 18V7C4 3 5 2 9 2H16C20 2 21 3 21 7V17C21 17.14 21 17.28 20.99 17.42"
        stroke="#767676"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.5 7H16.5M8.5 10.5H13.5M6.85 15H21V18.5C21 20.43 19.43 22 17.5 22H7.5C5.57 22 4 20.43 4 18.5V17.85C4 16.28 5.28 15 6.85 15Z"
        stroke="#767676"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default BooksIcon;
