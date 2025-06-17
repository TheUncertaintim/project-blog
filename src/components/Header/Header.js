"use client";
import React from "react";
import clsx from "clsx";
import { Rss, Sun, Moon } from "react-feather";

import Logo from "@/components/Logo";
import VisuallyHidden from "@/components/VisuallyHidden";
import { LIGHT_TOKENS, DARK_TOKENS } from "@/constants";

import styles from "./Header.module.css";
import Cookies from "js-cookie";

function Header({ theme, className, ...delegated }) {
  const [currentTheme, setCurrentTheme] = React.useState(theme);

  function handleClick() {
    const nextTheme = currentTheme === "light" ? "dark" : "light";
    setCurrentTheme(nextTheme);
    // update cookies
    Cookies.set("color-theme", nextTheme, { expires: 1000 });
    // update global style
    const root = document.documentElement;
    const colors = nextTheme === "light" ? LIGHT_TOKENS : DARK_TOKENS;
    // set data attribute
    root.setAttribute("data-color-theme", nextTheme);
    // set CSS variables
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }
  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <Logo />

      <div className={styles.actions}>
        <button className={styles.action}>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: "translate(2px, -2px)",
            }}
          />
          <VisuallyHidden>View RSS feed</VisuallyHidden>
        </button>
        <button className={styles.action} onClick={handleClick}>
          {currentTheme === "light" ? (
            <Sun size="1.5rem" />
          ) : (
            <Moon size="1.5rem" />
          )}
          <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;
