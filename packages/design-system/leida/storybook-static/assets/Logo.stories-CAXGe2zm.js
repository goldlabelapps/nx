import{R as n}from"./iframe-B_mmudIR.js";import{L as u}from"./Logo-VsZu3W5R.js";import"./preload-helper-Dp1pzeXC.js";const y={title:"Brand/Logo",component:u,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"Editorial logo mark with a full wordmark variant and a standalone sparkle mark for compact placements."}}},argTypes:{variant:{control:{type:"inline-radio"},options:["full","mark"]},height:{control:{type:"range",min:24,max:120,step:1}},tone:{control:{type:"inline-radio"},options:["ink","dusty","offwhite","current"]}}},r={args:{variant:"full",height:44,tone:"ink"}},a={args:{variant:"mark",height:56,tone:"clay"}},e={args:{variant:"full",height:44,tone:"current",style:{color:"var(--leida-parchment)"}},render:g=>n.createElement("div",{style:{padding:"28px",borderRadius:"var(--radius-xl)",background:"var(--leida-ink)"}},n.createElement(u,{...g}))};var t,o,s;r.parameters={...r.parameters,docs:{...(t=r.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    variant: "full",
    height: 44,
    tone: "ink"
  }
}`,...(s=(o=r.parameters)==null?void 0:o.docs)==null?void 0:s.source}}};var i,l,c;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    variant: "mark",
    height: 56,
    tone: "clay"
  }
}`,...(c=(l=a.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var d,m,p;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    variant: "full",
    height: 44,
    tone: "current",
    style: {
      color: "var(--leida-parchment)"
    }
  },
  render: args => <div style={{
    padding: "28px",
    borderRadius: "var(--radius-xl)",
    background: "var(--leida-ink)"
  }}>
      <Logo {...args} />
    </div>
}`,...(p=(m=e.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};const f=["FullWordmark","MarkOnly","Inverse"];export{r as FullWordmark,e as Inverse,a as MarkOnly,f as __namedExportsOrder,y as default};
