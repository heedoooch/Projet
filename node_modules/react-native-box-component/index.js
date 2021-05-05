// @flow
/* -----------------Globals--------------- */
import * as React from "react";
import { View } from "react-native";

/* -----------------Props--------------- */
type Props = {
  children?: *,
  onLayout?: *,
  zIndex?: number,
  borderColor?: *,
  borderWidth?: *,
  borderStyle?: "solid" | "dotted" | "dashed",
  borderRadius?: number,
  minWidth?: number,
  maxWidth?: number,
  borderRoundness?: number,
  display?: "none" | "flex",
  height?: number | string,
  width?: number | string,
  position?: "relative" | "absolute",
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse",
  justifyContent?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly",
  alignItems?: "stretch" | "center" | "flex-start" | "flex-end" | "baseline",
  alignSelf?: "flex-start" | "flex-end" | "center" | "stretch",
  padding?: number,
  paddingVertical?: number,
  paddingHorizontal?: number,
  paddingTop?: number,
  paddingRight?: number,
  paddingBottom?: number,
  paddingLeft?: number,
  margin?: number,
  overflow?: string,
  marginVertical?: number,
  marginHorizontal?: number,
  marginTop?: number,
  marginRight?: number,
  marginBottom?: number,
  marginLeft?: number,
  color?: string,
  fontColor?: string,
  pointerEvents?: *,
  backgroundColor?: string,
  flex?: number,
  flexWrap?: "wrap" | "nowrap",
  flexGrow?: number,
  flexBasis?: *,
  alignContent?: "center",
};

/* -----------------Component--------------- */
const Box = (props: Props)  : React.Node=> {
  const { children, onLayout, pointerEvents, ...rest } = props;
  const handleOnLayout = (e) => {
    if (onLayout) {
      onLayout(e);
    }
  };
  return (
    <View
      //$FlowFixMeProps
      style={{ ...rest, display: "flex" }}
      onLayout={handleOnLayout}
      pointerEvents={pointerEvents}
    >
      {children}
    </View>
  );
};

export default Box;
