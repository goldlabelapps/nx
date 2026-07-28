import"./iframe-B_mmudIR.js";import{I as E}from"./Input-ChQHWnuM.js";import"./preload-helper-Dp1pzeXC.js";const I={title:"Forms/Input",component:E,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"Rounded text field with optional label, helper text, and error state."}}},argTypes:{label:{control:"text"},hint:{control:"text"},error:{control:"text"},validationState:{control:{type:"inline-radio"},options:["valid","invalid"]},id:{control:"text"},wrapStyle:{control:!1}}},e={args:{label:"Email address",placeholder:"hello@leida.co",hint:"We only use this to send your living page."}},a={args:{label:"Phone number",placeholder:"+44 7000 000000",error:"Please include a valid mobile number.",validationState:"invalid"}},r={args:{label:"Email address",placeholder:"hello@leida.co",hint:"Looks good.",validationState:"valid"}},o={args:{label:"Email address",placeholder:"hello@leida.co",error:"Please enter a valid email address.",validationState:"invalid"}},l={args:{placeholder:"Type here"}};var t,s,n;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    label: "Email address",
    placeholder: "hello@leida.co",
    hint: "We only use this to send your living page."
  }
}`,...(n=(s=e.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};var i,d,c;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    label: "Phone number",
    placeholder: "+44 7000 000000",
    error: "Please include a valid mobile number.",
    validationState: "invalid"
  }
}`,...(c=(d=a.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var p,m,u;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    label: "Email address",
    placeholder: "hello@leida.co",
    hint: "Looks good.",
    validationState: "valid"
  }
}`,...(u=(m=r.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var h,g,v;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    label: "Email address",
    placeholder: "hello@leida.co",
    error: "Please enter a valid email address.",
    validationState: "invalid"
  }
}`,...(v=(g=o.parameters)==null?void 0:g.docs)==null?void 0:v.source}}};var S,b,y;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    placeholder: "Type here"
  }
}`,...(y=(b=l.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};const T=["Default","ErrorState","ValidState","InvalidState","Minimal"];export{e as Default,a as ErrorState,o as InvalidState,l as Minimal,r as ValidState,T as __namedExportsOrder,I as default};
