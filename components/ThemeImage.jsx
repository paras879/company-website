"use client";

import Image from "next/image";

export default function ThemeImage({
  lightSrc,
  darkSrc,
  alt,
  className = "",
  ...props
}) {
  return (
    <>
      <Image
        src={lightSrc}
        alt={alt}
        className={`${className} dark:hidden block`}
        {...props}
      />
      <Image
        src={darkSrc}
        alt={alt}
        className={`${className} hidden dark:block`}
        {...props}
      />
    </>
  );
}
