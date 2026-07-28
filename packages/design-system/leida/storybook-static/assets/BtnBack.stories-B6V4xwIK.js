import{R as m}from"./iframe-B_mmudIR.js";import{B as f}from"./Button-DWpNvyRL.js";import"./preload-helper-Dp1pzeXC.js";const g="Back",b=m.createElement("span",{"aria-hidden":"true"},"←");function p({children:h=g,icon:B=b,...k}){return m.createElement(f,{icon:B,...k,variant:"ghost",size:"md"},h)}p.__docgenInfo={description:`Ghost back-action CTA styled to match home route helper actions.
Pass an onClick handler like () => router.back() from the consuming app.`,methods:[],displayName:"BtnBack",props:{children:{defaultValue:{value:'"Back"',computed:!1},required:!1},icon:{defaultValue:{value:'<span aria-hidden="true">←</span>',computed:!1},required:!1}}};const E={title:"Btns/BtnBack",component:p,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"Ghost back-action CTA that mirrors the home route helper CTA style. Pair with router.back() in app code."}}},argTypes:{children:{control:"text"},disabled:{control:"boolean"}}},e={args:{children:"Back"}},a={args:{children:"Go Back"}},r={args:{children:"Back",disabled:!0}};var t,o,s;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    children: "Back"
  }
}`,...(s=(o=e.parameters)==null?void 0:o.docs)==null?void 0:s.source}}};var c,n,d;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    children: "Go Back"
  }
}`,...(d=(n=a.parameters)==null?void 0:n.docs)==null?void 0:d.source}}};var i,l,u;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    children: "Back",
    disabled: true
  }
}`,...(u=(l=r.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};const L=["Default","CustomLabel","Disabled"];export{a as CustomLabel,e as Default,r as Disabled,L as __namedExportsOrder,E as default};
