---
order: 35
slug: /typescript/vanilla-js
title: Vanilla JS
tags: ed-tech, copilot, ai, free, GitHub, Python
---

# Vanilla Viewer <=> Next/React

[Branch vucity-3d-web-connect](https://gitlab.com/vucity/web/vu-web-monorepo/-/tree/apps/vucity-3d-web-connect?ref_type=heads)

This JavaScript app has 2 distinct parts. A Next/React app, which is written in React's functional component style. I'll call that the **Next App**. 

Secondly there is the ThreeJS viewer written in Vanilla JavaScript. I'll call that the **Vanilla Viewer**. 

We need to link these two parts together with a single source of truth. Each part must be able to both dispatch actions and subscribe to updates from the same SOT

#### Problems

1.	Redux Hooks Can’t Be Used in Vanilla JS: Hooks (useSelector, useDispatch) are React-specific and can’t be directly used in Vanilla JavaScript.

2.	Two-Way Communication: Vanilla JS and React need to communicate seamlessly, dispatching actions and subscribing to store changes.

#### Solution

The Next app already has redux pattern setup which uses redux-toolkit and is found in the `core/uberedux` dir. To link the React app with the Vanilla Viewer using Redux Toolkit in the existing setup, here’s an approach:

1.	Expose the Redux Store Globally 

Modify the Redux store setup in the Next.js app (core/uberedux/store.ts) to make it accessible globally:

```javascript
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';

const store = configureStore({
    reducer: rootReducer,
});

// Expose store globally
if (typeof window !== 'undefined') {
    (window as any).__REDUX_STORE__ = store;
}

export default store;
```

2.	Access Redux Store in Vanilla JS

In the Vanilla JS app (viewer/index.js or similar), access the store via window:

```javascript
const store = window.__REDUX_STORE__;

// Dispatch an action
store.dispatch({
    type: 'your/actionType',
    payload: { key: 'value' },
});

// Subscribe to store changes
store.subscribe(() => {
    const state = store.getState();
    console.log('State updated:', state);
});
```

3.	Define Shared Actions

Create action creators in the Redux slice or manually define them for consistency across apps. eg:

```javascript
import { createAction } from '@reduxjs/toolkit';

export const updateViewState = createAction('viewState/update');
```

Use these actions in both React and Vanilla JS.

4.	Bridge Between React and Vanilla JS

    - React to Vanilla JS: Dispatch actions in React components, and the Vanilla JS app can subscribe to state changes
    
    - Vanilla JS to React: Dispatch actions from the Vanilla JS app to update Redux state, triggering React re-renders.

5.	Simplify Communication with a Bridge Module

Create a bridge module (bridge.js) for encapsulating Redux interactions:

```javascript
// viewer/bridge.js
const store = window.__REDUX_STORE__;

export function dispatchAction(type, payload) {
    store.dispatch({ type, payload });
}

export function subscribeToState(callback) {
    return store.subscribe(() => callback(store.getState()));
}
```

Use this in viewer/index.js:

```javascript
import { dispatchAction, subscribeToState } from './bridge';

dispatchAction('viewState/update', { zoom: 5 });

subscribeToState((state) => {
    console.log('Updated state:', state);
});
```

#### Benefits

- Seamless State Sharing: Both applications interact with a single source of truth

- Encapsulation: The bridge abstracts Redux store interaction, simplifying integration

- Future-Ready: This setup allows easy expansion to future use with State-a-base
 