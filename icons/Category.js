import Svg, { Path, Rect } from "react-native-svg";

const CategoryIcon = () => {
  return (
    <Svg
      width="41"
      height="40"
      viewBox="0 0 41 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect x="0.5" width="40" height="40" rx="20" fill="#C3784C" />
      <Path
        d="M13.5 18H15.5C17.5 18 18.5 17 18.5 15V13C18.5 11 17.5 10 15.5 10H13.5C11.5 10 10.5 11 10.5 13V15C10.5 17 11.5 18 13.5 18Z"
        stroke="white"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M25.5 18H27.5C29.5 18 30.5 17 30.5 15V13C30.5 11 29.5 10 27.5 10H25.5C23.5 10 22.5 11 22.5 13V15C22.5 17 23.5 18 25.5 18Z"
        stroke="white"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M25.5 30H27.5C29.5 30 30.5 29 30.5 27V25C30.5 23 29.5 22 27.5 22H25.5C23.5 22 22.5 23 22.5 25V27C22.5 29 23.5 30 25.5 30Z"
        stroke="white"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M13.5 30H15.5C17.5 30 18.5 29 18.5 27V25C18.5 23 17.5 22 15.5 22H13.5C11.5 22 10.5 23 10.5 25V27C10.5 29 11.5 30 13.5 30Z"
        stroke="white"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default CategoryIcon;
