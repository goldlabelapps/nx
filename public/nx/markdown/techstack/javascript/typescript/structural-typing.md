---
order: 55
title: Structural Typing
description: TypeScript’s type system is based on shape compatibility, not nominal typing
slug: /work/expetechstacktise/javascript/typescript/structural-typing
icon: js
image: https://live.staticflickr.com/65535/54929673394_69c76ac4a3_b.jpg
tags: JavaScript, Vanilla JavaScript, TypeScript, React
---

> TypeScript’s type system is based on shape compatibility, not nominal typing. That means two types are considered compatible if their structure (shape) matches — not because they have the same declared name or class.

🧱 1. What is nominal typing?

In nominally typed languages (like Java, C#, Swift, or Rust),
type compatibility is based on declared identity (the name) — not structure.

Example (in a nominal system):

```
class Dog {}
class Cat {}

Dog d = new Cat(); // ❌ Error — different types, even if they look identical
```

Even if Dog and Cat had the same fields and methods, the compiler says no,
because they are different names — their nominal identity differs.

🧩 2. TypeScript uses structural typing

TypeScript doesn’t care what you called it — only what it contains.

Example:

```
type Dog = { name: string };
type Cat = { name: string };

const myDog: Dog = { name: "Rex" };
const myCat: Cat = myDog; // ✅ Fine in TypeScript
```

Even though Dog and Cat are separate types by name,
TypeScript considers them compatible because they have the same shape:

`{ name: string }`

That’s structural compatibility.
