# NX Admin

NX Admin covers the management of data, storage users etc. 

> On any WordPress website you can always addd /wp-admin to the top level domain and you'll be resented with the admin login screen. Same with NX - the admin route is always [${config.url}/nx-admin](https://goldlabel.pro/nx-admin)

## Firebase Event Updates

Interestingly, all data on the screen is a live representation of what's in the DB, whomever is looking at it, it gets updated in real time on their screen as it changes. This is because the app subscribes to changes. When they happen, those change events are broadcast to subscribed parties. This reduces collision problems, but also makes the app far more useable. No polling, no page refresh, no repeated API requests. It's simple, fast and effective. Why isn't it used more? 

### Links

[Cartridges](https://github.com/goldlabelapps/nx/tree/master/app/NX)
