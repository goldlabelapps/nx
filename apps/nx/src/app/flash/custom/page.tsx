'use client';

import { useEffect, useState } from 'react';
import { Flash, registerActionScript } from '@goldlabelapps/flash';
import { FeaturedImage } from '@goldlabelapps/theme';
import { gsap } from 'gsap';
import { Cpu, Code2, Sparkles, CheckCircle2 } from 'lucide-react';

export default function CustomActionScriptPage() {
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    // Register custom ActionScript timeline factory: 'spinPulse'
    registerActionScript('spinPulse', ({ target, loop }) => {
      const tl = gsap.timeline({ repeat: loop ? -1 : 0, yoyo: true });
      tl.to(target, {
        rotation: 360,
        scale: 1.4,
        duration: 1.5,
        ease: 'back.inOut(1.7)',
      }).to(target, {
        rotation: 720,
        scale: 0.9,
        duration: 1.5,
        ease: 'power2.inOut',
      });
      return tl;
    });

    // Register second custom ActionScript timeline factory: 'bounceShake'
    registerActionScript('bounceShake', ({ target, loop }) => {
      const tl = gsap.timeline({ repeat: loop ? -1 : 0 });
      tl.to(target, {
        y: -40,
        scaleY: 1.2,
        scaleX: 0.8,
        duration: 0.4,
        ease: 'power2.out',
      })
        .to(target, {
          y: 0,
          scaleY: 0.8,
          scaleX: 1.2,
          duration: 0.3,
          ease: 'power2.in',
        })
        .to(target, {
          rotation: 15,
          duration: 0.1,
        })
        .to(target, {
          rotation: -15,
          duration: 0.1,
        })
        .to(target, {
          rotation: 0,
          scaleY: 1,
          scaleX: 1,
          duration: 0.1,
        });
      return tl;
    });

    requestAnimationFrame(() => {
      setRegistered(true);
    });
  }, []);

  const sampleRegistrationCode = `import { registerActionScript, Flash } from '@goldlabelapps/flash';
import { gsap } from 'gsap';

// 1. Register custom ActionScript animation factory
registerActionScript('spinPulse', ({ target, loop }) => {
  const tl = gsap.timeline({ repeat: loop ? -1 : 0, yoyo: true });
  tl.to(target, {
    rotation: 360,
    scale: 1.4,
    duration: 1.5,
    ease: 'back.inOut(1.7)',
  });
  return tl;
});

// 2. Render Flash component using custom movie name
export default function App() {
  return (
    <Flash
      movie="spinPulse"
      width={400}
      height={300}
      color="#0f172a"
      loop
      debug
    />
  );
}`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <FeaturedImage slug="flash" height={260} />
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Cpu className="w-6 h-6 text-amber-400" />
          Custom ActionScript Extensibility
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Register custom GSAP timeline animation definitions with <code className="text-amber-400">registerActionScript()</code> and render them dynamically in <code className="text-amber-400">&lt;Flash /&gt;</code>.
        </p>
      </div>

      {registered ? (
        <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-mono">
          <CheckCircle2 className="w-4 h-4" />
          <span>Custom ActionScripts &quot;spinPulse&quot; and &quot;bounceShake&quot; registered successfully!</span>
        </div>
      ) : null}

      {/* Grid Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Card 1: spinPulse */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-lg flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Custom Movie: &quot;spinPulse&quot;
              </h3>
              <p className="text-xs text-slate-400">GSAP Back easing, rotation and scale pulse</p>
            </div>
            <span className="px-2.5 py-1 text-xs font-mono font-medium rounded-lg bg-amber-400/10 text-amber-400 border border-amber-400/20">
              movie=&quot;spinPulse&quot;
            </span>
          </div>

          <div className="h-72 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 relative">
            {registered && (
              <Flash movie="spinPulse" width="100%" height="100%" color="#090d16" loop autoPlay debug />
            )}
          </div>
        </div>

        {/* Card 2: bounceShake */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-lg flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Custom Movie: &quot;bounceShake&quot;
              </h3>
              <p className="text-xs text-slate-400">GSAP Squash &amp; Stretch bounce with rotational shake</p>
            </div>
            <span className="px-2.5 py-1 text-xs font-mono font-medium rounded-lg bg-amber-400/10 text-amber-400 border border-amber-400/20">
              movie=&quot;bounceShake&quot;
            </span>
          </div>

          <div className="h-72 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 relative">
            {registered && (
              <Flash movie="bounceShake" width="100%" height="100%" color="#090d16" loop autoPlay debug />
            )}
          </div>
        </div>
      </div>

      {/* ActionScript Code Explanation */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2 text-slate-200 font-semibold text-base">
          <Code2 className="w-5 h-5 text-amber-400" />
          <span>How to Register Custom ActionScripts</span>
        </div>
        <p className="text-sm text-slate-300">
          The ActionScript registry allows extending `@goldlabelapps/flash` with arbitrary GSAP animation timelines without modifying the core runtime package.
        </p>
        <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-amber-300 overflow-x-auto">
          <code>{sampleRegistrationCode}</code>
        </pre>
      </div>
    </div>
  );
}
