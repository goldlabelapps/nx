That's great. I do want to set up separate Redux stores for each instance of `Flash`, but I would also now like to use the Redux Persist (https://www.npmjs.com/package/redux-persist) library to persist the state of each individual store. The idea is that for each flash scene there is a persisted redux store so that if they come back after a page refresh, the flash scene will be able to be in the same state as last time they were there, avoiding repetitive animation and allowing for a more gamelike experience

I have refactored the project somewhat to separate out a specific use of Flash in the /LatencySpike directory

I uploaded a new zip with the refactored code called core.zip. I want to create this redux functionality in the /flash/state directory. And from in my LatencySpike.tsx I should be able to wrap the Flash in a Provider component that that persists state for that unique component id

Please go ahead and show me how to do this

___

