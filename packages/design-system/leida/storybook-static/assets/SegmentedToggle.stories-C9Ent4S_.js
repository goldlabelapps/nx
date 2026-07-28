import{R as s}from"./iframe-B_mmudIR.js";import{S as c}from"./SegmentedToggle-Dgmh4zSl.js";import{s as m}from"./fixtures-Coskpk_N.js";import"./preload-helper-Dp1pzeXC.js";import"./Button-DWpNvyRL.js";const C={title:"Forms/SegmentedToggle",component:c,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"Frosted segmented control for small option sets such as morning/evening routines."}}},argTypes:{options:{control:!1},value:{control:!1},onChange:{control:!1}}},e={args:{options:m}},o={render:p=>{const[i,u]=s.useState("evening");return s.createElement(c,{...p,value:i,onChange:u})},args:{options:m}};var t,n,r;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    options: sampleToggleOptions
  }
}`,...(r=(n=e.parameters)==null?void 0:n.docs)==null?void 0:r.source}}};var a,l,g;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = React.useState("evening");
    return <SegmentedToggle {...args} value={value} onChange={setValue} />;
  },
  args: {
    options: sampleToggleOptions
  }
}`,...(g=(l=o.parameters)==null?void 0:l.docs)==null?void 0:g.source}}};const R=["Routine","Controlled"];export{o as Controlled,e as Routine,R as __namedExportsOrder,C as default};
