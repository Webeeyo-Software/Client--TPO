import React from "react";
import { ThemeProvider } from "../../../context/ThemeContext";
import ThemeScreen from "../../screens/theme/ThemeScreen"; // just for demo

export default function App() {
  return (
    <ThemeProvider>
      <ThemeScreen />
    </ThemeProvider>
  );
}
