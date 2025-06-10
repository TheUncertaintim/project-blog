import React from "react";
import { Code } from "bright";

import theme from "./theme";
import styles from "./CodeSnippet.module.css";

function CodeSnippet({ children, ...delegated }) {
  return (
    <Code {...delegated} theme={theme} className={styles.wrapper}>
      {children}
    </Code>
  );
}

export default CodeSnippet;
