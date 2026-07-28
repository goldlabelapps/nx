import{R as s}from"./iframe-B_mmudIR.js";import{B}from"./Button-DWpNvyRL.js";import"./preload-helper-Dp1pzeXC.js";const C="New",E=s.createElement("span",{"aria-hidden":"true"},"+");function f({label:w=C,...h}){return s.createElement(B,{icon:E,...h,variant:"primary",size:"md"},w)}f.__docgenInfo={description:'Generic "new" CTA skin for creating entities like clients, products, or routines.',methods:[],displayName:"BtnNew",props:{label:{defaultValue:{value:'"New"',computed:!1},required:!1}}};const A={title:"Btns/BtnNew",component:f,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"Generic primary CTA skin for create actions. Pass the label for the specific thing being created."}}},argTypes:{label:{control:"text"},disabled:{control:"boolean"}}},e={args:{label:"New Client"}},r={args:{label:"New Product"}},a={args:{label:"New Routine",icon:s.createElement("span",{"aria-hidden":"true"},"+")}},t={args:{label:"New Client",disabled:!0}};var n,o,c;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    label: "New Client"
  }
}`,...(c=(o=e.parameters)==null?void 0:o.docs)==null?void 0:c.source}}};var i,l,d;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    label: "New Product"
  }
}`,...(d=(l=r.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var p,u,m;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    label: "New Routine",
    icon: <span aria-hidden="true">+</span>
  }
}`,...(m=(u=a.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var b,g,N;t.parameters={...t.parameters,docs:{...(b=t.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    label: "New Client",
    disabled: true
  }
}`,...(N=(g=t.parameters)==null?void 0:g.docs)==null?void 0:N.source}}};const P=["Default","Product","WithIcon","Disabled"];export{e as Default,t as Disabled,r as Product,a as WithIcon,P as __namedExportsOrder,A as default};
