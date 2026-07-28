import"./iframe-B_mmudIR.js";import{S as d}from"./StepIndicator-DNmGdXxi.js";import"./preload-helper-Dp1pzeXC.js";const m=[{label:"Consult"},{label:"Plan"},{label:"Checkout"}],f={title:"Feedback/StepIndicator",component:d,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:"Horizontal step progress with numbered or custom markers and optional labels underneath."}}},argTypes:{currentStep:{control:{type:"inline-radio"},options:[0,1,2]},steps:{control:!1},lineStyle:{control:!1}}},e={args:{currentStep:1,steps:m}},t={args:{currentStep:2,steps:[{},{},{}]}},r={args:{currentStep:1,steps:[{label:"Skin quiz",indicator:"A"},{label:"Results",indicator:"B"},{label:"Routine",indicator:"C"}]}};var s,a,o;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    currentStep: 1,
    steps: baseSteps
  }
}`,...(o=(a=e.parameters)==null?void 0:a.docs)==null?void 0:o.source}}};var n,c,p;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    currentStep: 2,
    steps: [{}, {}, {}]
  }
}`,...(p=(c=t.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var i,l,u;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    currentStep: 1,
    steps: [{
      label: "Skin quiz",
      indicator: "A"
    }, {
      label: "Results",
      indicator: "B"
    }, {
      label: "Routine",
      indicator: "C"
    }]
  }
}`,...(u=(l=r.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};const C=["Default","WithoutLabels","CustomIndicators"];export{r as CustomIndicators,e as Default,t as WithoutLabels,C as __namedExportsOrder,f as default};
