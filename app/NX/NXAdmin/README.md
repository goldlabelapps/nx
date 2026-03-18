# NX Admin

NX Admin covers the management of data, storage users etc. 

> On any WordPress website you can always addd /wp-admin to the top level domain and you'll be resented with the admin login screen. Same with NX - the admin route is always [${config.url}/nx-admin](https://goldlabel.pro/nx-admin)

## Firebase Event Updates

Interestingly, all data on the screen is a live representation of what's in the DB, whomever is looking at it, it gets updated in real time on their screen as it changes. This is because the app subscribes to changes. When they happen, those change events are broadcast to subscribed parties. This reduces collision problems, but also makes the app far more useable. No polling, no page refresh, no repeated API requests. It's simple, fast and effective. Why isn't it used more? 

### Links

[Cartridges](https://github.com/goldlabelapps/nx/tree/master/app/NX)

    {
        "id": "account",
        "title": "Account",
        "icon": "account"
    },


## Lorem Ipsum

```markdown
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id arcu ac nisi tempus ultrices id non ex. Donec eleifend pulvinar nunc vitae tristique. Etiam quis tortor ex. Mauris feugiat at ligula a tincidunt. Fusce eu arcu maximus, auctor felis sit amet, imperdiet nunc. Sed ultrices pulvinar dui sed sodales. Nam eget maximus sem. Proin sed maximus sem. Quisque a ultrices massa. Donec cursus aliquet egestas. Maecenas nec turpis vitae massa rutrum eleifend sit amet ac enim. Phasellus pellentesque non augue ac porta.

Aliquam malesuada sed risus quis mollis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus sit amet sagittis arcu. Suspendisse fringilla neque eget quam lacinia, nec mollis lectus imperdiet. Aenean venenatis ligula eros, et congue dolor vestibulum id. Praesent pellentesque fringilla tortor, vel eleifend urna convallis egestas. Suspendisse et condimentum nulla. Sed malesuada lorem aliquet risus finibus laoreet. Donec sollicitudin augue semper pulvinar pulvinar. Suspendisse eleifend dui vitae augue suscipit pulvinar.

Donec volutpat id velit quis cursus. Suspendisse blandit posuere velit et ultricies. Proin egestas eu sapien vulputate tempor. Quisque molestie dignissim pellentesque. Morbi sodales mi sed pulvinar tempus. Integer hendrerit tellus ut consequat euismod. Vivamus placerat a eros vel mollis.
```