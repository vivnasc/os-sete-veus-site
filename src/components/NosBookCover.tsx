"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  title: string;
  color: string;
  width: number;
  height: number;
  className?: string;
};

export function NosBookCover({ src, alt, title, color, width, height, className }: Props) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={className}
        style={{
          width,
          height,
          background: `linear-gradient(135deg, ${color}22, ${color}44)`,
          border: `1px solid ${color}33`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 4,
        }}
      >
        <span
          style={{
            fontSize: width < 60 ? 6 : 9,
            color,
            textAlign: "center",
            lineHeight: 1.3,
            fontFamily: "serif",
          }}
        >
          {title}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setError(true)}
    />
  );
}
