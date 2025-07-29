import React, { FC } from "react";
import { Text, TextProps } from "react-native";

interface ILabelProps extends TextProps {
  children: React.ReactNode;
  description?: string;
  className?: string;
  htmlFor?: string; // Keep for compatibility but won't be used in React Native
}

const Label: FC<ILabelProps> = (props) => {
  const { children, className = "", description, htmlFor, ...rest } = props;

  const labelClasses =
    `mb-2 text-sm text-black dark:text-white ${className}`.trim();

  return (
    <Text className={labelClasses} {...rest}>
      {children}
      {description && ` (${description})`}
    </Text>
  );
};

export default Label;
