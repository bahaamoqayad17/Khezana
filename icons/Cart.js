import Svg, { Path } from "react-native-svg";

const CartIcon = () => {
  return (
    <Svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M7.70002 5.95837H14.3C17.4167 5.95837 17.7284 7.41587 17.9392 9.19421L18.7642 16.0692C19.03 18.3242 18.3334 20.1667 15.125 20.1667H6.88419C3.66669 20.1667 2.97002 18.3242 3.24502 16.0692L4.07003 9.19421C4.2717 7.41587 4.58336 5.95837 7.70002 5.95837Z"
        stroke="#CE9664"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M7.33325 7.33337V4.12504C7.33325 2.75004 8.24992 1.83337 9.62492 1.83337H12.3749C13.7499 1.83337 14.6666 2.75004 14.6666 4.12504V7.33337"
        stroke="#CE9664"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M18.7091 15.6108H7.33325"
        stroke="#CE9664"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default CartIcon;
