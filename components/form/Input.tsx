import React, { forwardRef } from "react";
import { TextInput, TextInputProps } from "react-native";
import { IValidationBaseProps } from "./Validation";

export type TInputVariants = "solid" | "outline" | "split";
export type TInputDimension = "xs" | "sm" | "default" | "lg" | "xl";

interface IInputProps extends TextInputProps, Partial<IValidationBaseProps> {
  className?: string;
  name: string;
  dimension?: TInputDimension;
  variant?: TInputVariants;
}

const Input = forwardRef<TextInput, IInputProps>((props, ref) => {
  const {
    className = "",
    name,
    dimension = "default",
    variant = "solid",
    isValid,
    isTouched,
    invalidFeedback,
    style,
    ...rest
  } = props;

  // Base input styling - check if we're in split design (no border/background)
  const isSplitDesign =
    className.includes("border-0") || className.includes("bg-transparent");

  let inputClasses = "w-full text-black dark:text-white";

  if (!isSplitDesign) {
    // Add background and border only if not in split design
    inputClasses += " border border-gray-200 dark:border-gray-800";

    // Validation styling for standalone inputs
    if (!isValid && isTouched && invalidFeedback) {
      inputClasses += " border-red-500";
    } else if (!isValid && isTouched && !invalidFeedback) {
      inputClasses += " border-green-500";
    }

    // Add rounded corners for standalone inputs
    inputClasses += " rounded-md";
  }

  // Dimension-based styling
  switch (dimension) {
    case "xs":
      inputClasses += " text-xs";
      if (!isSplitDesign) inputClasses += " px-1.5 py-0.5";
      break;
    case "sm":
      inputClasses += " text-sm";
      if (!isSplitDesign) inputClasses += " px-1.5 py-1";
      break;
    case "default":
      inputClasses += " text-base";
      if (!isSplitDesign) inputClasses += " px-1.5 py-1.5";
      break;
    case "lg":
      inputClasses += " text-lg";
      if (!isSplitDesign) inputClasses += " px-1.5 py-2";
      break;
    case "xl":
      inputClasses += " text-xl";
      if (!isSplitDesign) inputClasses += " px-1.5 py-2.5";
      break;
  }

  // For split design, add specific height
  if (isSplitDesign) {
    inputClasses += " h-12"; // Match the minHeight from FieldWrap
  }

  // Combine with custom className
  const finalClasses =
    `${inputClasses} ${className} font-SomarRegular bg-gray-50 dark:bg-gray-800`.trim();

  return (
    <TextInput
      ref={ref}
      className={finalClasses}
      style={style}
      placeholderTextColor="#888888"
      {...rest}
    />
  );
});

Input.displayName = "Input";

export default Input;
