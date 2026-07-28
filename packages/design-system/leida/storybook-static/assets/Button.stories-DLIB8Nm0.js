import{R as s}from"./iframe-B_mmudIR.js";import{B as q}from"./Button-DWpNvyRL.js";import"./preload-helper-Dp1pzeXC.js";const E=()=>s.createElement("span",{"aria-hidden":"true"},"→"),D={title:"Forms/Button",component:q,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"Mono-caps pill button with primary, ghost, and quiet variants plus size and block modes."}}},argTypes:{children:{control:"text"},variant:{control:{type:"inline-radio"},options:["primary","ghost","quiet"]},size:{control:{type:"inline-radio"},options:["sm","md"]},block:{control:"boolean"},disabled:{control:"boolean"},as:{control:{type:"inline-radio"},options:["button","a"]},icon:{control:!1}}},r={args:{children:"Book now",variant:"primary",size:"md",icon:s.createElement(E,null)}},e={args:{children:"See details",variant:"ghost",size:"md"}},a={args:{children:"Save draft",variant:"quiet",size:"sm"}},n={render:x=>s.createElement("div",{style:{width:"min(360px, 100vw)"}},s.createElement(q,{...x})),args:{children:"Continue",variant:"primary",block:!0}},t={args:{children:"Unavailable",variant:"quiet",disabled:!0}},o={args:{as:"a",href:"#",children:"Open page",variant:"ghost"}};var i,c,d;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    children: "Book now",
    variant: "primary",
    size: "md",
    icon: <Arrow />
  }
}`,...(d=(c=r.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var l,m,p;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    children: "See details",
    variant: "ghost",
    size: "md"
  }
}`,...(p=(m=e.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var u,g,h;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    children: "Save draft",
    variant: "quiet",
    size: "sm"
  }
}`,...(h=(g=a.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var v,b,y;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: args => <div style={{
    width: "min(360px, 100vw)"
  }}>
      <Button {...args} />
    </div>,
  args: {
    children: "Continue",
    variant: "primary",
    block: true
  }
}`,...(y=(b=n.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};var k,B,S;t.parameters={...t.parameters,docs:{...(k=t.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    children: "Unavailable",
    variant: "quiet",
    disabled: true
  }
}`,...(S=(B=t.parameters)==null?void 0:B.docs)==null?void 0:S.source}}};var w,f,z;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    as: "a",
    href: "#",
    children: "Open page",
    variant: "ghost"
  }
}`,...(z=(f=o.parameters)==null?void 0:f.docs)==null?void 0:z.source}}};const G=["Primary","Ghost","Quiet","Block","Disabled","LinkButton"];export{n as Block,t as Disabled,e as Ghost,o as LinkButton,r as Primary,a as Quiet,G as __namedExportsOrder,D as default};
