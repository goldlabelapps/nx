<div>
    <h1 style="display: flex; align-items: center; gap: 8px;">
        <a href="https://goldlabel.pro/nx" target="_blank" rel="noreferrer" style="display: inline-flex; align-items: center;">
        <img
            src="public/nx/png/favicon.png"
            width="24"
            height="24"
        />
        </a>
        <span>NX°</span>
    </h1>
</div>

> **NEW July 2026** [NX° Turbo](https://github.com/goldlabelapps/nx-turbo) implementation with [turborepo](https://turborepo.dev/)

- [Documentation TOC](docs/README.md)

```javascript

{
  "name": "Natalie Brooks",
  "routineContext": "Looking for a pregnancy-safe skincare routine that keeps her skin hydrated, helps minimise pigmentation, and maintains a healthy complexion with a minimal number of products.",
  "skinOverview": "Combination skin with mild dehydration and early pregnancy-related pigmentation developing across the cheeks. Skin would benefit from gentle hydration, barrier support, and pregnancy-safe brightening ingredients.",
  "personalNotes": "Recently entered her second trimester and wants reassurance that her skincare products are pregnancy-safe. Enjoys long walks with her husband and is trying to be more consistent with daily SPF.",
  "skinType": "Combination",
  "concerns": [
    "Pigmentation",
    "Dehydration"
  ],
  "dateOfBirth": "11/04/1993",
  "pregnant": true,
  "breastfeeding": false
}



{
  "name": "Rachel Mercer",
  "routineContext": "Looking for a simple routine that controls excess oil, reduces breakouts and post-acne marks, and keeps the skin hydrated without feeling heavy."
  "skinOverview": "Oily skin with visible congestion through the T-zone, enlarged pores, and occasional post-blemish pigmentation. Skin would benefit from balancing oil production while maintaining hydration and supporting an even complexion.",
  "personalNotes": "Recently returned from maternity leave and is looking for a quick, effective skincare routine. Loves hiking at weekends and wants to be more consistent with daily SPF.",
  "skinType": "Oily",
  "concerns": [
    "Acne",
    "Pigmentation",
    "Dehydration"
  ],
  "dateOfBirth": "05/08/1988",
  "pregnant": false, "breastfeeding": false,
}

```


```sh
You are a Skin Care Therapist with 10 years experience. Create the details for a mock client a typical practitioner would encounter professionally. The mock client’s name is “My Friend” and approx age is “56”. Please generate the following for her:

Personal notes
Daughter called Florence 
Dog called Frank
Partner called Tom
Lives in Norwich

Skin type
One of 4; Dry, Oily, Combination or Normal

Skin Overview

This should be in the voice of a professional therapist. The overview should not contain any personal information. It should be about the length of a tweet. A good example would be 

Some pigmentation/freckles she would like to work on. Prone to sebaceous filaments and dehydration, likes nourishing, thick products. Wants to work on anti ageing without Botox.

Concerns
One or more of the following list  
Acne, Wrinkles, Redness, Pigmentation, Dehydration and Aging. 
These are the only possible concerns for now, more to come.



Date of birth 
format dd/mm/yyyy 
Take it from the age in the prompt or make it up

Pregnant or Breastfeeding
booleans

Routine Context

Should also be around the length of a tweet. It is designed to be part of an LLM prompt, the other part being the skin type. In this way we generate a unique routine every time. So the context should be a clear goal for the routine. Example context:

Wants to start a simple routine that cares for his skin and gets him looking his best for his Caribbean holiday at Christmas.

```