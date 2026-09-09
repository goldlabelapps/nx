---
order: 9000
title: Overview
description: Flash app documentation
icon: docs
tags: flash, actionscript, animation
image: flash
---

# Flash Package (`@goldlabelapps/flash`)

**`@goldlabelapps/flash`** is a lightweight React + TypeScript library inspired by the classic Macromedia / Adobe Flash programming model. It brings the familiar concepts of **Stages**, **MovieClips**, **Timelines**, **ActionScript**, and **Sprites** into modern web applications, combining React component composition with GSAP (GreenSock Animation Platform) for declarative, vector-driven animation.

## Key Concepts & Architecture

### 1. Stage (`<Stage />`)
The visual backdrop surface and layout container for Flash content. It controls dimensions (`width`, `height`), background color, and root container styles.

### 2. Flash Engine (`<Flash />`)
The main runtime component used to embed and execute animated Flash movies by name. It supports auto-play, looping, custom background colors, and a debug overlay.

```tsx
import { Flash } from '@goldlabelapps/flash';

<Flash 
  movie="pingpong" 
  width="100%" 
  height={300} 
  loop 
  autoPlay 
  debug 
/>
```

### 3. MovieClips
Presentational visual primitives modeled after Flash MovieClip symbols:
- **`Logo`**: Customizable brand emblem MovieClip.
- **`Pingpongball`**: Presentational vector graphics primitive.
- **`LightningBolt`**: Animated electric bolt clip.
- **`CleverText`**: Typewriter-style animated text element.
- **`TraceMC`**: On-stage debug overlay element.
- **`Sprite` / `SpriteMC`**: Scalable SVG character sprite with 8-directional facing and walking frame cycles.

### 4. ActionScript Extensibility (`registerActionScript`)
Animations in `@goldlabelapps/flash` are driven by ActionScript definitions—GSAP timeline factory functions. You can register custom ActionScripts dynamically to extend the library without touching core runtime code.

```tsx
import { registerActionScript, Flash } from '@goldlabelapps/flash';
import { gsap } from 'gsap';

// Register custom ActionScript timeline factory
registerActionScript('spinPulse', ({ target, loop }) => {
  const tl = gsap.timeline({ repeat: loop ? -1 : 0, yoyo: true });
  tl.to(target, { rotation: 360, scale: 1.4, duration: 1.5, ease: 'back.inOut(1.7)' });
  return tl;
});

// Render the movie in a Flash component
<Flash movie="spinPulse" width={400} height={300} loop autoPlay />
```

## Documentation Topics

- [Sprite](/nx/flash/sprite) - 8-directional vector character sprite documentation and usage guide.

