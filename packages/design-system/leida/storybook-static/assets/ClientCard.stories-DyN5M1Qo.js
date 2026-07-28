import{R as r}from"./iframe-B_mmudIR.js";import{C as v}from"./Card-CKkp5u2D.js";import"./preload-helper-Dp1pzeXC.js";function N({firstName:k,lastName:s,href:a,onClick:c,onCta:x,onKeyDown:o,ctaLabel:w,role:d,tabIndex:m,style:E,...S}){const l=c||x,t=!!(l||a);function f(e){l&&l(e),!(e.defaultPrevented||!a)&&typeof window<"u"&&window.location.assign(a)}function b(e){o&&o(e),!(e.defaultPrevented||!t)&&(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),f(e))}return r.createElement(v,{variant:"tile",padding:"sm",hoverLift:!0,onClick:t?f:c,onKeyDown:t?b:o,role:t?d||(a?"link":"button"):d,tabIndex:t?m??0:m,style:{display:"flex",flexDirection:"column",position:"relative",cursor:t?"pointer":void 0,...E},...S},r.createElement("div",{style:{minWidth:0,flex:1}},r.createElement("div",{style:{display:"block",fontFamily:"var(--font-serif)",fontStyle:"italic",fontSize:"1.9rem",lineHeight:.95,color:"var(--leida-ink)"}},k,s?r.createElement("span",{style:{display:"block",fontSize:"1.1rem",lineHeight:1,marginTop:"4px"}},s):null)))}N.__docgenInfo={description:`A compact client card with a title and a single CTA, using the same
interactive shell as the product card.`,methods:[],displayName:"ClientCard"};const L={title:"Cards/ClientCard",component:N,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"Compact client card with a split first and last name title."}}},argTypes:{firstName:{control:"text"},lastName:{control:"text"},href:{control:"text"},onClick:{action:"card-clicked"}}},i={args:{firstName:"Ellie",lastName:"Morrison",href:"/clients/ellie-morrison"}},n={args:{firstName:"Nadia",href:"/clients/nadia"}};var p,u,g;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    firstName: "Ellie",
    lastName: "Morrison",
    href: "/clients/ellie-morrison"
  }
}`,...(g=(u=i.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var C,y,h;n.parameters={...n.parameters,docs:{...(C=n.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    firstName: "Nadia",
    href: "/clients/nadia"
  }
}`,...(h=(y=n.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};const T=["Default","SingleName"];export{i as Default,n as SingleName,T as __namedExportsOrder,L as default};
