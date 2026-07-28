import{R as e}from"./iframe-B_mmudIR.js";import"./preload-helper-Dp1pzeXC.js";function x({label:a,value:t,min:o=0,max:h=100,step:v=1,onChange:i,formatValue:s,style:y,...k}){const[w,S]=e.useState(t??o),l=t??w,E=s?s(l):l,R=V=>{const d=Number(V.target.value);t===void 0&&S(d),i&&i(d)},c=e.useId();return e.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"10px",...y}},e.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"baseline"}},a?e.createElement("label",{htmlFor:c,style:{fontFamily:"var(--font-mono)",fontSize:"0.7rem",letterSpacing:"0.08em",textTransform:"uppercase",color:"var(--leida-body)"}},a):e.createElement("span",null),e.createElement("span",{style:{fontFamily:"var(--font-serif)",fontStyle:"italic",fontSize:"1.3rem",color:"var(--leida-ink)"}},E)),e.createElement("input",{id:c,type:"range",min:o,max:h,step:v,value:l,onChange:R,className:"leida-range",...k}),e.createElement("style",null,`
        .leida-range { -webkit-appearance: none; appearance: none; width: 100%; height: 3px; border-radius: 3px; background: var(--leida-line); outline: none; margin: 0; }
        .leida-range::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 22px; height: 22px; border-radius: 50%; background: var(--leida-ink); cursor: pointer; border: 3px solid var(--leida-parchment); box-shadow: 0 2px 8px rgba(26,24,20,0.3); }
        .leida-range::-moz-range-thumb { width: 22px; height: 22px; border-radius: 50%; background: var(--leida-ink); cursor: pointer; border: 3px solid var(--leida-parchment); box-shadow: 0 2px 8px rgba(26,24,20,0.3); }
      `))}x.__docgenInfo={description:`The "cost calculator" range slider - a 3px hairline track with a round
ink thumb ringed in parchment. Shows a label + serif italic value.`,methods:[],displayName:"RangeSlider",props:{min:{defaultValue:{value:"0",computed:!1},required:!1},max:{defaultValue:{value:"100",computed:!1},required:!1},step:{defaultValue:{value:"1",computed:!1},required:!1}}};const _={title:"Forms/RangeSlider",component:x,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"Hairline range control for live calculators and adjustable pricing flows."}}},argTypes:{label:{control:"text"},value:{control:{type:"range",min:0,max:100,step:1}},min:{control:"number"},max:{control:"number"},step:{control:"number"},formatValue:{control:!1}}},r={args:{label:"Weekly appointments",value:28,min:0,max:100}},n={args:{label:"Monthly budget",value:45,min:0,max:100,formatValue:a=>`£${a*10}`}};var p,u,m;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    label: "Weekly appointments",
    value: 28,
    min: 0,
    max: 100
  }
}`,...(m=(u=r.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var g,f,b;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    label: "Monthly budget",
    value: 45,
    min: 0,
    max: 100,
    formatValue: value => \`£\${value * 10}\`
  }
}`,...(b=(f=n.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};const q=["Default","Currency"];export{n as Currency,r as Default,q as __namedExportsOrder,_ as default};
