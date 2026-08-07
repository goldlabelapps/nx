---
order: 322
slug: /characters/wei-zang/coder
title: Coder
description: iCode
tags: code, coding, characters
icon: virus
image: https://live.staticflickr.com/65535/54925135563_df675914c2_b.jpg
---

```javascript
  const handleBetragBlur = () => {
    let num = parseFloat(betragInput.replace(',', '.'));
    if (isNaN(num) || num < 1) num = 1;
    if (num > 10_000_000) num = 10_000_000;
    setBetragInput(num.toFixed(2));
    handleChange('Betrag', num);
  };
```

[PageLink url="/fables/tommy-one-leg" icon="right" iconAlign="right" title="Little Tommy One Leg" description="Didn't pass the genetic profiling"]  
