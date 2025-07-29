import React, { cloneElement, FC, ReactElement } from "react";
import { Text, View } from "react-native";

export interface IValidationBaseProps {
  isValidMessage?: boolean;
  isValid: boolean;
  isTouched: boolean | undefined;
  invalidFeedback: string | undefined;
  validFeedback?: string;
}

interface IValidationProps extends IValidationBaseProps {
  children: ReactElement | string;
}

const Validation: FC<IValidationProps> = (props) => {
  const {
    children,
    isValidMessage = true,
    isValid,
    isTouched,
    invalidFeedback,
    validFeedback,
  } = props;

  // If children is a string, just display the validation message
  if (typeof children === "string") {
    return (
      <>
        {isValidMessage && !isValid && isTouched && (
          <View className="mt-2">
            {children
              .split(".")
              .filter((i) => i !== "")
              .map((i, index) => (
                <Text
                  key={index}
                  className="text-xs text-red-500/70 font-SomarRegular"
                >
                  {i}.
                </Text>
              ))}
          </View>
        )}
      </>
    );
  }

  // Original behavior for ReactElement children
  return (
    <>
      {cloneElement(children, {
        // @ts-ignore
        isValid,
        isTouched,
        invalidFeedback,
      })}
      {isValidMessage && !isValid && isTouched && (
        <>
          {invalidFeedback && (
            <View className="mt-2">
              {invalidFeedback
                .split(".")
                .filter((i) => i !== "")
                .map((i, index) => (
                  <Text
                    key={index}
                    className="text-xs text-red-500/70 font-SomarRegular"
                  >
                    {i}.
                  </Text>
                ))}
            </View>
          )}
          {!invalidFeedback && validFeedback && (
            <View className="mt-2">
              {validFeedback
                .split(".")
                .filter((i) => i !== "")
                .map((i, index) => (
                  <Text
                    key={index}
                    className="text-xs text-green-500/70 font-SomarRegular"
                  >
                    {i}.
                  </Text>
                ))}
            </View>
          )}
        </>
      )}
    </>
  );
};

export default Validation;
