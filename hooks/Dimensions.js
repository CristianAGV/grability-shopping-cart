import { useState, useEffect } from "react";
import { Dimensions } from "react-native";

export default function useScreenDimensions() {
  const [screenData, setScreenData] = useState(Dimensions.get("window"));

  useEffect(() => {
    const onChange = (result) => {
      setScreenData(result.screen);
    };

    Dimensions.addEventListener("change", onChange);
  });

  return screenData.width;
}
