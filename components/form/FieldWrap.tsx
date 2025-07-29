import React, {
  cloneElement,
  forwardRef,
  ReactElement,
  ReactNode,
} from "react";
import { View, ViewProps } from "react-native";
import { IValidationBaseProps } from "./Validation";

interface IFieldWrapProps extends ViewProps, Partial<IValidationBaseProps> {
  children: ReactElement;
  className?: string;
  firstSuffix?: ReactNode;
  lastSuffix?: ReactNode;
}

const FieldWrap = forwardRef<View, IFieldWrapProps>((props, ref) => {
  const {
    children,
    className = "",
    firstSuffix,
    lastSuffix,
    isValidMessage,
    isValid,
    isTouched,
    invalidFeedback,
    validFeedback,
    style,
    ...rest
  } = props;

  // Container styling with proper border and split design
  const containerClasses =
    `relative flex-row items-center border border-gray-300 rounded-lg overflow-hidden ${className}`.trim();

  // Icon area width
  const ICON_AREA_WIDTH = 50;

  const childStyle = {
    flex: 1,
    paddingLeft: firstSuffix ? 12 : 16, // Less padding since we have dedicated icon area
    paddingRight: lastSuffix ? 50 : 16,
    ...(children.props as any)?.style,
  };

  return (
    <View ref={ref} className={containerClasses} style={style} {...rest}>
      {/* First Icon Area with Divider */}
      {firstSuffix && (
        <>
          <View
            className="flex justify-center items-center bg-gray-50"
            style={{ width: ICON_AREA_WIDTH, height: "100%", minHeight: 48 }}
          >
            {firstSuffix}
          </View>
          {/* Vertical Divider */}
          <View className="w-px bg-gray-300 h-full" />
        </>
      )}

      {/* Input Area */}
      <View className="flex-1">
        {cloneElement(children, {
          // @ts-ignore
          isValid,
          isTouched,
          invalidFeedback,
          style: childStyle,
          className: "border-0 bg-transparent", // Remove border and background from input since container handles it
        })}
      </View>

      {/* Last Icon Area */}
      {lastSuffix && (
        <View className="absolute right-0 top-0 bottom-0 flex justify-center items-center px-3 z-10">
          {lastSuffix}
        </View>
      )}
    </View>
  );
});

FieldWrap.displayName = "FieldWrap";

export default FieldWrap;
