import React, { forwardRef, ReactNode } from "react";
import {
  ActivityIndicator,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";

export type TButtonVariants = "solid" | "outline" | "default";
export type TButtonSize = "xs" | "sm" | "default" | "lg" | "xl";

export interface IButtonProps extends Omit<TouchableOpacityProps, "style"> {
  children?: ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  className?: string;
  color?: string;
  variant?: TButtonVariants;
  size?: TButtonSize;
  isDisabled?: boolean;
  isLoading?: boolean;
  icon?: ReactNode;
  rightIcon?: ReactNode;
  rounded?: boolean;
}

const Button = forwardRef<
  React.ComponentRef<typeof TouchableOpacity>,
  IButtonProps
>((props, ref) => {
  const {
    children,
    style,
    textStyle,
    className,
    color = "#65382C",
    variant = "solid",
    size = "default",
    isDisabled = false,
    isLoading = false,
    icon,
    rightIcon,
    rounded = true,
    ...rest
  } = props;

  const HAS_CHILDREN = typeof children !== "undefined";

  // Get base button classes
  const getBaseClasses = () => {
    return "flex-row items-center justify-center";
  };

  // Get variant classes
  const getVariantClasses = () => {
    const opacity = isDisabled ? "opacity-50" : "";

    switch (variant) {
      case "solid":
        return `bg-[${color}] border border-[${color}] ${opacity}`;
      case "outline":
        return `bg-transparent border border-[${color}] ${opacity}`;
      case "default":
        return `bg-transparent border-0 ${opacity}`;
      default:
        return "";
    }
  };

  // Get size classes
  const getSizeClasses = () => {
    switch (size) {
      case "xs":
        return HAS_CHILDREN
          ? "px-3 py-1 min-h-[24px]"
          : "px-1 py-1 min-h-[24px]";
      case "sm":
        return HAS_CHILDREN
          ? "px-4 py-1.5 min-h-[32px]"
          : "px-2 py-1.5 min-h-[32px]";
      case "default":
        return HAS_CHILDREN
          ? "px-5 py-2 min-h-[40px]"
          : "px-3 py-2 min-h-[40px]";
      case "lg":
        return HAS_CHILDREN
          ? "px-6 py-2.5 min-h-[48px]"
          : "px-4 py-2.5 min-h-[48px]";
      case "xl":
        return HAS_CHILDREN
          ? "px-7 py-3 min-h-[56px]"
          : "px-5 py-3 min-h-[56px]";
      default:
        return "";
    }
  };

  // Get text color classes
  const getTextColorClasses = () => {
    switch (variant) {
      case "solid":
        return "text-white font-SomarBold";
      case "outline":
        return `text-[${color}] font-SomarBold`;
      case "default":
        return `text-[${color}] font-SomarRegular`;
      default:
        return "";
    }
  };

  // Get text size classes
  const getTextSizeClasses = () => {
    switch (size) {
      case "xs":
        return "text-xs";
      case "sm":
        return "text-sm";
      case "default":
        return "text-base";
      case "lg":
        return "text-lg";
      case "xl":
        return "text-xl";
      default:
        return "";
    }
  };

  // Get icon size
  const getIconSize = () => {
    switch (size) {
      case "xs":
        return 14;
      case "sm":
        return 16;
      case "default":
        return 20;
      case "lg":
        return 24;
      case "xl":
        return 28;
      default:
        return 20;
    }
  };

  // Get icon margin classes
  const getIconMarginClasses = () => {
    if (!HAS_CHILDREN) return "";

    switch (size) {
      case "xs":
        return "mr-1";
      case "sm":
        return "mr-1.5";
      case "default":
        return "mr-2";
      case "lg":
        return "mr-2.5";
      case "xl":
        return "mr-3";
      default:
        return "mr-2";
    }
  };

  // Get right icon margin classes
  const getRightIconMarginClasses = () => {
    if (!HAS_CHILDREN) return "";

    switch (size) {
      case "xs":
        return "ml-1";
      case "sm":
        return "ml-1.5";
      case "default":
        return "ml-2";
      case "lg":
        return "ml-2.5";
      case "xl":
        return "ml-3";
      default:
        return "ml-2";
    }
  };

  const buttonClasses = [
    getBaseClasses(),
    getVariantClasses(),
    getSizeClasses(),
    rounded ? "rounded-lg" : "",
    className || "",
  ].join(" ");

  const textClasses = [
    getTextColorClasses(),
    getTextSizeClasses(),
    "text-center",
  ].join(" ");

  const iconSize = getIconSize();
  const iconMarginClasses = getIconMarginClasses();
  const rightIconMarginClasses = getRightIconMarginClasses();

  return (
    <TouchableOpacity
      ref={ref}
      className={buttonClasses}
      style={style}
      disabled={isDisabled || isLoading}
      activeOpacity={0.7}
      {...rest}
    >
      {(icon || isLoading) && (
        <View className={iconMarginClasses}>
          {isLoading ? (
            <ActivityIndicator
              size="small"
              color={variant === "solid" ? "#FFFFFF" : color}
            />
          ) : (
            icon
          )}
        </View>
      )}

      {HAS_CHILDREN && (
        <Text className={textClasses} style={textStyle} numberOfLines={1}>
          {children}
        </Text>
      )}

      {rightIcon && <View className={rightIconMarginClasses}>{rightIcon}</View>}
    </TouchableOpacity>
  );
});

Button.displayName = "Button";

export default Button;
