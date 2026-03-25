---
order: 70
slug: /cartridges/uberedux
title: Uberedux
description: All apps need state management
tags: features, uberedux
icon: api
---

> Otherwise you'd be back in jQuery callback hell. Nobody wants that.

Uberedux is a simple, zero-config wrapper around Redux. It plugs cleanly into how the app already works and gives you the global state access you need without boilerplate or fuss. There’s nothing clever here — and that’s the point. Uberedux is fast, familiar, and already done for you.

If you've used Redux before, you already know how to use Uberedux. If you haven't, don't worry — the basics are dead simple. Actions update the store. Components subscribe to the parts they care about. That’s it.

We’ve trimmed the fat: no reducers to wire up manually, no sprawling folder trees, no indirection. Instead, you get a single useSlice() hook that gives you what you need, when you need it — whether that's in a form field, a route guard, or a floating modal.

Uberedux isn’t trying to win design awards. It's just here to work — cleanly, quietly, and consistently across your app. No surprises. No rewrites. Just state management that stays out of your way.


"I'm not sure if we need redux". This worries me.

I've lost count of the number of times I've implemented redux, but it's a LOT. It's the first thing I do on every single App I've bootstrapped for the past 5 years. So much so that I've made it as easy as quick as possible. 

It has to have a name and I can't call it redux, so the current name I'm using is Uberedux. It comes in a nice directory which gets pasted into any react app. You can connect it up and start using redux in under 10 mins.

Let's see how that is implemented
