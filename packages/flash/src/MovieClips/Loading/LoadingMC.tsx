"use client";

import React from 'react';
import { useTheme } from '@mui/material';
import { CharacterAvatar } from './characters/CharacterAvatar';
import { CHARACTER_NAMES, type CharacterName } from './characters/types';

export interface LoadingMCProps {
  /** Primary accent color for the glowing elements. Defaults to golden amber #f59e0b */
  color?: string;
  /** Secondary glow color. Defaults to sky blue #38bdf8 */
  secondaryColor?: string;
  /** Base size in pixels of the movie clip viewport (default: 320). */
  size?: number;
  /** Base size in pixels of each character avatar (default: 46). */
  characterSize?: number;
  /** Array of character names to display in orbit (defaults to all 9 characters). */
  characters?: CharacterName[];
  /** Semi-major horizontal orbital radius in px (defaults to size * 0.38). */
  radiusX?: number;
  /** Semi-minor vertical orbital radius in px (defaults to size * 0.22). */
  radiusY?: number;
  /** Whether to display the central pulsing energy core / ticket (default: false). */
  showCore?: boolean;
  /** Whether to display the orbital guide tracks and glow rings (default: true). */
  showTrack?: boolean;
  /** Whether to show ambient floating stardust / particles (default: false). */
  showParticles?: boolean;
  /** Whether character avatars should render inside glowing circular holographic badges (default: true). */
  characterBadge?: boolean;
  /** Optional class name */
  className?: string;
  /** Optional inline styles */
  style?: React.CSSProperties;
}

export const LoadingMC: React.FC<LoadingMCProps> = ({
  color,
  secondaryColor,
  size = 320,
  characterSize = 46,
  characters = CHARACTER_NAMES,
  radiusX,
  radiusY,
  showCore = false,
  showTrack = true,
  showParticles = false,
  characterBadge = true,
  className,
  style,
}) => {
  const theme = useTheme();
  const isDark = theme.palette?.mode === 'dark';

  const defaultPrimary = isDark
    ? theme.palette?.primary?.main || '#f59e0b'
    : theme.palette?.primary?.main || '#d97706';
  const defaultSecondary = isDark
    ? theme.palette?.secondary?.main || '#38bdf8'
    : theme.palette?.secondary?.main || '#0284c7';

  const primaryColor = color || defaultPrimary;
  const secColor = secondaryColor || defaultSecondary;
  const gradientId = React.useId ? React.useId().replace(/:/g, '') : 'loading-orbit-gradient';

  const rx = radiusX ?? Math.round(size * 0.38);
  const ry = radiusY ?? Math.round(size * 0.22);
  const centerX = size / 2;
  const centerY = size / 2;

  const charList = characters.length > 0 ? characters : CHARACTER_NAMES;
  const count = charList.length;

  // Stardust / sparkle particles positions
  const particles = React.useMemo(() => [
    { angle: 0.3, distance: rx * 0.6, size: 3, delay: 0.2 },
    { angle: 1.2, distance: rx * 1.1, size: 2, delay: 0.8 },
    { angle: 2.1, distance: rx * 0.75, size: 4, delay: 1.4 },
    { angle: 3.4, distance: rx * 1.05, size: 3, delay: 0.5 },
    { angle: 4.5, distance: rx * 0.65, size: 2.5, delay: 1.1 },
    { angle: 5.6, distance: rx * 1.15, size: 3.5, delay: 1.7 },
  ], [rx]);

  return (
    <div
      data-loading-mc="true"
      data-radius-x={rx}
      data-radius-y={ry}
      data-character-size={characterSize}
      className={className}
      style={{
        position: 'relative',
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        overflow: 'visible',
        ...style,
      }}
    >
      {/* 1. Deep Ethereal Cosmic Background Aura (Almost Invisible) */}
      <div
        data-loading-aura="true"
        style={{
          position: 'absolute',
          inset: 0,
          margin: 'auto',
          width: size * 0.9,
          height: size * 0.6,
          borderRadius: '50%',
          background: `radial-gradient(ellipse at center, ${primaryColor}15 0%, ${secColor}08 45%, transparent 72%)`,
          filter: 'blur(20px)',
          opacity: 0.1,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* 2. SVG Orbital Tracks & Energy Rings (Ultra Subtle) */}
      {showTrack && (
        <svg
          data-loading-track="true"
          viewBox={`0 0 ${size} ${size}`}
          width={size}
          height={size}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            overflow: 'visible',
            zIndex: 1,
          }}
        >
          <defs>
            <linearGradient id={`${gradientId}-track`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={primaryColor} stopOpacity={0.15} />
              <stop offset="50%" stopColor={secColor} stopOpacity={0.1} />
              <stop offset="100%" stopColor={primaryColor} stopOpacity={0.15} />
            </linearGradient>
            <radialGradient id={`${gradientId}-glow`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={primaryColor} stopOpacity={0.2} />
              <stop offset="100%" stopColor={secColor} stopOpacity={0} />
            </radialGradient>
          </defs>

          {/* Primary Orbital Ellipse Path */}
          <ellipse
            cx={centerX}
            cy={centerY}
            rx={rx}
            ry={ry}
            fill="none"
            stroke={`url(#${gradientId}-track)`}
            strokeWidth={1}
            strokeDasharray="6 6"
            opacity={0.15}
          />

          {/* Inner Accent Ring */}
          <ellipse
            data-loading-ring-inner="true"
            cx={centerX}
            cy={centerY}
            rx={rx * 0.7}
            ry={ry * 0.7}
            fill="none"
            stroke={secColor}
            strokeWidth={0.75}
            strokeDasharray="3 9"
            opacity={0.08}
          />

          {/* Outer Ambient Perimeter Glow Track */}
          <ellipse
            data-loading-ring-outer="true"
            cx={centerX}
            cy={centerY}
            rx={rx * 1.18}
            ry={ry * 1.18}
            fill="none"
            stroke={primaryColor}
            strokeWidth={0.5}
            strokeDasharray="1 12"
            opacity={0.06}
          />
        </svg>
      )}

      {/* 3. Ambient Star / Sparkle Particles */}
      {showParticles && (
        <div
          data-loading-particles="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 2,
          }}
        >
          {particles.map((p, idx) => {
            const px = centerX + Math.cos(p.angle) * p.distance;
            const py = centerY + Math.sin(p.angle) * (p.distance * (ry / rx));
            return (
              <div
                key={idx}
                data-loading-particle="true"
                style={{
                  position: 'absolute',
                  left: px,
                  top: py,
                  width: p.size,
                  height: p.size,
                  borderRadius: '50%',
                  backgroundColor: idx % 2 === 0 ? primaryColor : secColor,
                  boxShadow: `0 0 6px ${idx % 2 === 0 ? primaryColor : secColor}`,
                  opacity: 0.7,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            );
          })}
        </div>
      )}

      {/* 4. Central Core Emblem / Golden Ticket / Hologram */}
      {showCore && (
        <div
          data-loading-core="true"
          style={{
            position: 'absolute',
            inset: 0,
            margin: 'auto',
            width: size * 0.28,
            height: size * 0.28 * (307 / 397),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 4,
            filter: `drop-shadow(0 0 14px ${primaryColor}70)`,
          }}
        >
          <svg
            viewBox="0 0 397 307"
            width="100%"
            height="100%"
            style={{
              overflow: 'visible',
            }}
          >
            <defs>
              <linearGradient id={`${gradientId}-ticket`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={primaryColor} />
                <stop offset="50%" stopColor="#fff" stopOpacity={0.8} />
                <stop offset="100%" stopColor={secColor} />
              </linearGradient>
            </defs>
            <path
              d="M397,153.5 L303.815278,284.523214 C299.036574,291.101786 293.338889,296.49256 286.722222,300.695536 C280.105556,304.898512 272.753704,307 264.666667,307 L33.083333,307 C23.985417,307 16.1970486,303.779241 9.7182292,297.337723 C3.2394097,290.896205 0,283.152679 0,274.107143 L0,32.892857 C0,23.847321 3.2394097,16.103795 9.7182292,9.662277 C16.1970486,3.220759 23.985417,0 33.083333,0 L264.666667,0 C272.753704,0 280.105556,2.101488 286.722222,6.304464 C293.338889,10.50744 299.036574,15.898214 303.815278,22.476786 L397,153.5 Z"
              fill={`url(#${gradientId}-ticket)`}
              fillOpacity={0.18}
              stroke={`url(#${gradientId}-ticket)`}
              strokeWidth={20}
              strokeLinejoin="round"
            />
            {/* Center NX Spark / Ticket Notch */}
            <circle cx="198.5" cy="153.5" r="32" fill={primaryColor} opacity={0.6} />
            <polygon
              points="198.5,123.5 208,144 228.5,153.5 208,163 198.5,183.5 189,163 168.5,153.5 189,144"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      )}

      {/* 5. Orbiting Characters Container */}
      <div
        data-loading-orbit-system="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        {charList.map((charName, index) => {
          // Angle around orbit
          const baseAngle = (2 * Math.PI * index) / count;
          // Initial static coordinate placement (GSAP or CSS will animate dynamically)
          const initialX = centerX + Math.cos(baseAngle) * rx;
          const initialY = centerY + Math.sin(baseAngle) * ry;
          const isForeground = Math.sin(baseAngle) >= 0;
          const zIndex = isForeground ? 10 + index : 2 + index;
          const initialScale = isForeground ? 1.05 : 0.78;
          const initialOpacity = isForeground ? 1.0 : 0.65;

          return (
            <div
              key={`${charName}-${index}`}
              data-loading-character={charName}
              data-index={index}
              data-base-angle={baseAngle}
              style={{
                position: 'absolute',
                left: initialX,
                top: initialY,
                transform: `translate(-50%, -50%) scale(${initialScale})`,
                opacity: initialOpacity,
                zIndex,
                willChange: 'transform, opacity, z-index',
                transition: 'filter 0.3s ease',
              }}
            >
              <CharacterAvatar
                name={charName}
                size={characterSize}
                badge={characterBadge}
                glowColor={undefined}
                style={{
                  filter: 'none',
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LoadingMC;
