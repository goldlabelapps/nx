import"./iframe-B_mmudIR.js";import{A as b}from"./Alert-9aEkhj1l.js";import"./preload-helper-Dp1pzeXC.js";const D={title:"Feedback/Alert",component:b,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:"Leida's replacement for MUI Alert. Four tones, no icon, with an optional dismiss action."}}},argTypes:{children:{control:"text"},title:{control:"text"},severity:{control:{type:"inline-radio"},options:["success","info","warning","error"]},dismissible:{control:"boolean"},onDismiss:{control:!1}}},e={args:{severity:"success",title:"Saved",children:"Your changes were saved and are now live."}},r={args:{severity:"info",title:"Heads up",children:"This is a helpful note for the current screen."}},s={args:{severity:"warning",title:"Action needed",children:"Please review the form before continuing."}},n={args:{severity:"error",title:"Something went wrong",children:"Try again in a moment or check your connection."}},o={args:{severity:"info",title:"Dismiss me",children:"Click the close button to hide this alert locally.",dismissible:!0}};var t,i,a;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    severity: "success",
    title: "Saved",
    children: "Your changes were saved and are now live."
  }
}`,...(a=(i=e.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};var c,l,d;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    severity: "info",
    title: "Heads up",
    children: "This is a helpful note for the current screen."
  }
}`,...(d=(l=r.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var m,u,p;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    severity: "warning",
    title: "Action needed",
    children: "Please review the form before continuing."
  }
}`,...(p=(u=s.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var g,h,y;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    severity: "error",
    title: "Something went wrong",
    children: "Try again in a moment or check your connection."
  }
}`,...(y=(h=n.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};var f,v,w;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    severity: "info",
    title: "Dismiss me",
    children: "Click the close button to hide this alert locally.",
    dismissible: true
  }
}`,...(w=(v=o.parameters)==null?void 0:v.docs)==null?void 0:w.source}}};const T=["Success","Info","Warning","Error","Dismissible"];export{o as Dismissible,n as Error,r as Info,e as Success,s as Warning,T as __namedExportsOrder,D as default};
