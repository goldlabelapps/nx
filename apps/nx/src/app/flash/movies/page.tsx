'use client';

import { Flash, Stage, Logo, Pingpongball, TraceMC, CleverText } from '@goldlabelapps/flash';
import { FeaturedImage } from '@goldlabelapps/theme';
import { Film, Box, PlayCircle } from 'lucide-react';

export default function FlashMoviesPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <FeaturedImage slug="flash" height={260} />
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Film className="w-6 h-6 text-amber-400" />
          Movie Clips &amp; Components Gallery
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Explore built-in Flash movies running side by side along with direct presentational MovieClip components.
        </p>
      </div>

      {/* Section 1: Built-in Movies Showcase */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <PlayCircle className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-semibold text-white">Built-in Animated Movies</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Movie 1: Pingpong */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-white text-base">Pingpong Movie</h4>
                <p className="text-xs text-slate-400">GSAP physics bouncing ball animation timeline</p>
              </div>
              <span className="px-2.5 py-1 text-xs font-mono font-medium rounded-lg bg-amber-400/10 text-amber-400 border border-amber-400/20">
                movie=&quot;pingpong&quot;
              </span>
            </div>
            <div className="h-64 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 relative">
              <Flash movie="pingpong" width="100%" height="100%" color="#020617" loop autoPlay debug />
            </div>
          </div>

          {/* Movie 2: Logo */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-white text-base">Logo Movie</h4>
                <p className="text-xs text-slate-400">GSAP scaling &amp; pulse brand logo animation timeline</p>
              </div>
              <span className="px-2.5 py-1 text-xs font-mono font-medium rounded-lg bg-amber-400/10 text-amber-400 border border-amber-400/20">
                movie=&quot;logo&quot;
              </span>
            </div>
            <div className="h-64 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 relative">
              <Flash movie="logo" width="100%" height="100%" color="#020617" loop autoPlay debug />
            </div>
          </div>

          {/* Movie 3: Loading */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-white text-base">Loading Movie</h4>
                <p className="text-xs text-slate-400">Orbital avatars &amp; ticket core loading timeline</p>
              </div>
              <span className="px-2.5 py-1 text-xs font-mono font-medium rounded-lg bg-amber-400/10 text-amber-400 border border-amber-400/20">
                movie=&quot;loading&quot;
              </span>
            </div>
            <div className="h-64 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 relative flex items-center justify-center">
              <Flash movie="loading" width={240} height={240} color="#020617" loop autoPlay debug />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Direct Presentational MovieClips */}
      <section className="space-y-4 pt-4 border-t border-slate-900">
        <div className="flex items-center gap-2">
          <Box className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-semibold text-white">Presentational MovieClip Primitives</h3>
        </div>
        <p className="text-xs text-slate-400">
          MovieClips are purely presentational React components that render visual elements without owning animation timeline logic.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Primitive 1: Logo */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col items-center justify-center text-center space-y-3">
            <div className="h-36 w-full bg-slate-950 rounded-xl flex items-center justify-center border border-slate-800">
              <Logo size={64} color="#f59e0b" text="FLASH" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">&lt;Logo /&gt;</h4>
              <p className="text-xs text-slate-400 mt-1">Standard brand badge MovieClip</p>
            </div>
          </div>

          {/* Primitive 2: Pingpongball */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col items-center justify-center text-center space-y-3">
            <div className="h-36 w-full bg-slate-950 rounded-xl flex items-center justify-center border border-slate-800">
              <Pingpongball size={40} color="#fbbf24" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">&lt;Pingpongball /&gt;</h4>
              <p className="text-xs text-slate-400 mt-1">Presentational ball graphics primitive</p>
            </div>
          </div>

          {/* Primitive 3: TraceMC */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col items-center justify-center text-center space-y-3">
            <div className="h-36 w-full bg-slate-950 rounded-xl relative overflow-hidden border border-slate-800">
              <TraceMC movie="gallery_inspect" active={true} />
              <div className="h-full flex items-center justify-center text-slate-600 text-xs font-mono">
                Stage Container
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">&lt;TraceMC /&gt;</h4>
              <p className="text-xs text-slate-400 mt-1">Lightweight debug overlay element</p>
            </div>
          </div>

          {/* Primitive 4: CleverText */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col items-center justify-center text-center space-y-3">
            <div className="h-36 w-full bg-slate-950 rounded-xl p-4 border border-slate-800 flex items-center justify-center text-amber-400 font-mono text-xs overflow-hidden">
              <CleverText text="Flash CleverText typewriter effect..." speed={40} />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">&lt;CleverText /&gt;</h4>
              <p className="text-xs text-slate-400 mt-1">Animated typewriter text MovieClip</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Stage Surface */}
      <section className="space-y-4 pt-4 border-t border-slate-900">
        <div className="flex items-center gap-2">
          <Stage className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-semibold text-white">&lt;Stage /&gt; Surface Component</h3>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <p className="text-sm text-slate-300 mb-4">
            The Stage provides the layout root and backdrop background color for Flash rendering.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Stage width="100%" height={120} color="#1e1b4b" className="rounded-xl border border-indigo-500/30 flex items-center justify-center text-indigo-300 text-sm font-medium">
              Stage (color=&quot;#1e1b4b&quot;)
            </Stage>
            <Stage width="100%" height={120} color="#064e3b" className="rounded-xl border border-emerald-500/30 flex items-center justify-center text-emerald-300 text-sm font-medium">
              Stage (color=&quot;#064e3b&quot;)
            </Stage>
          </div>
        </div>
      </section>
    </div>
  );
}
