---
order: 200
slug: /async
title: Async
description: NX's USP.
tags: tenants, async,
icon: async
---

> Async is the core difference between NX and everything else. The USP.


How does it work? well, first we need to identify the user. Either they are authenticated, or they are not. If they are, we know their Firebase UID and can look in the async collection for a document with that UID. Chances are very high that it will exist, so we subscribe to it. If they are not authed, then they still have a fingerprint, so next we'll try looking for that. If a doc does exist for that fingerprint, great, we'll subscribe to it. Lastly, if it's the first time the user has opened the app there will be no document containing that fingerprint, so we will create one and subscribe to it.

