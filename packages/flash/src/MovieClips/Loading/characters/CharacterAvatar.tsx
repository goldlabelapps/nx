"use client";

import React from "react";
import type { CharacterAvatarProps, CharacterName } from "./types";
import { BikerAvatar } from "./BikerAvatar";
import { ChixAvatar } from "./ChixAvatar";
import { DapperAvatar } from "./DapperAvatar";
import { HippyAvatar } from "./HippyAvatar";
import { HipsterAvatar } from "./HipsterAvatar";
import { MummaAvatar } from "./MummaAvatar";
import { PunkAvatar } from "./PunkAvatar";
import { RastaAvatar } from "./RastaAvatar";
import { RockerAvatar } from "./RockerAvatar";

const characterMap: Record<CharacterName, React.FC<React.SVGProps<SVGSVGElement>>> = {
  biker: BikerAvatar,
  chix: ChixAvatar,
  dapper: DapperAvatar,
  hippy: HippyAvatar,
  hipster: HipsterAvatar,
  mumma: MummaAvatar,
  punk: PunkAvatar,
  rasta: RastaAvatar,
  rocker: RockerAvatar,
};

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  name,
  size = 48,
  badge = false,
  glowColor,
  className,
  style,
  ...props
}) => {
  const Component = characterMap[name] || BikerAvatar;
  const numSize = typeof size === "number" ? size : 48;

  if (badge) {
    return (
      <div
        className={className}
        style={{
          position: "relative",
          width: numSize,
          height: numSize,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
          boxShadow: "none",
          border: "none",
          backdropFilter: "none",
          ...style,
        }}
      >
        <Component
          width={numSize * 0.82}
          height={numSize * 0.82}
          {...props}
        />
      </div>
    );
  }

  return (
    <Component
      width={size}
      height={size}
      className={className}
      style={{
        filter: glowColor ? `drop-shadow(0 0 8px ${glowColor})` : undefined,
        ...style,
      }}
      {...props}
    />
  );
};

export default CharacterAvatar;
