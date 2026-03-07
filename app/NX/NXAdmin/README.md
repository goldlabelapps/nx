```js
import { getFirebaseFirestore } from '../lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { query, where, doc, getDoc } from 'firebase/firestore'; React.useEffect(() => {
  dispatch(setFeedback({
    severity: 'success',
    title: 'Welcome to NX Admin'
  }))
  dispatch(setNXAdmin('CRUDMode', 'read'));
  // List collections 
  // (Firestore does not support listing collections client-side directly)
  // You must know the collection names or fetch them from config or backend
  const collectionsToSubscribe = [
    'share',
  ];

  // Subscribe to all collections in Firestore
  const db = getFirebaseFirestore();
  let unsubscribers: (() => void)[] = [];

  // Helper to fetch all collection names
  async function subscribeToCollections() {
    collectionsToSubscribe.forEach((colName) => {
      const colRef = collection(db, colName);
      const q = query(colRef, where('tenant', '==', tenant));
      const unsubscribe = onSnapshot(q, async (snapshot: import('firebase/firestore').QuerySnapshot) => {
        const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const typescriptDocSnap = await getDoc(doc(colRef, 'typescript'));
        let typescript = undefined;
        if (typescriptDocSnap.exists()) {
          typescript = typescriptDocSnap.data();
        }
        dispatch(setNXAdmin(colName, { typescript, docs }));
      });
      unsubscribers.push(unsubscribe);
    });
  }

  subscribeToCollections();

  return () => {
    unsubscribers.forEach(unsub => unsub());
  };
}, [dispatch]);
```



# NX Admin

NX Admin covers the management of data, storage users etc. 

> On any WordPress website you can always addd /wp-admin to the top level domain and you'll be resented with the admin login screen. Same with NX - the admin route is always [${config.url}/nx-admin](https://goldlabel.pro/nx-admin)

## Firebase Event Updates

Interestingly, all data on the screen is a live representation of what's in the DB, whomever is looking at it, it gets updated in real time on their screen as it changes. This is because the app subscribes to changes. When they happen, those change events are broadcast to subscribed parties. This reduces collision problems, but also makes the app far more useable. No polling, no page refresh, no repeated API requests. It's simple, fast and effective. Why isn't it used more? 

### Links

[Cartridges](https://github.com/goldlabelapps/nx/tree/master/app/NX)
