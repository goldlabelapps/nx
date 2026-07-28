import{R as e}from"./iframe-B_mmudIR.js";import"./preload-helper-Dp1pzeXC.js";const m={sm:{padding:"7px 12px",fontSize:"0.85rem"},md:{padding:"10px 18px",fontSize:"0.95rem"}},Y={background:"rgba(255,255,255,0.4)",color:"var(--leida-ink)",border:"1px solid var(--leida-line)",backdropFilter:"var(--blur-chip)",WebkitBackdropFilter:"var(--blur-chip)"},A={background:"var(--leida-ink)",color:"var(--leida-parchment)",border:"1px solid transparent",boxShadow:"var(--shadow-button)"};function c({children:l,defaultPressed:F=!1,pressed:i,onChange:d,size:O="md",block:u=!1,disabled:r=!1,style:_,...D}){const[q,z]=e.useState(!!F),[B,p]=e.useState(!1),f=i!==void 0,a=f?i:q,I=m[O]||m.md,V=a?A:Y,L=B&&!r?{transform:"translateY(-2px)",boxShadow:a?"var(--shadow-button-hi)":"var(--shadow-card)"}:null;return e.createElement("button",{type:"button","aria-pressed":a,disabled:r,onClick:()=>{f||z(R=>!R),d==null||d(!a)},onMouseEnter:()=>p(!0),onMouseLeave:()=>p(!1),style:{display:u?"flex":"inline-flex",width:u?"100%":void 0,alignItems:"center",justifyContent:"center",gap:"9px",fontFamily:"var(--font-mono)",letterSpacing:"var(--track-button)",textTransform:"uppercase",borderRadius:"var(--radius-pill)",textDecoration:"none",cursor:r?"not-allowed":"pointer",opacity:r?.45:1,transition:"transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out), background var(--dur-fast)",...V,...I,...L,..._},...D},l)}c.__docgenInfo={description:"A pill toggle button. Click once to turn on, click again to turn off.",methods:[],displayName:"Toggle",props:{defaultPressed:{defaultValue:{value:"false",computed:!1},required:!1},size:{defaultValue:{value:'"md"',computed:!1},required:!1},block:{defaultValue:{value:"false",computed:!1},required:!1},disabled:{defaultValue:{value:"false",computed:!1},required:!1}}};const U={title:"Forms/Toggle",component:c,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"A button-style toggle that switches between neutral and primary states when pressed."}}},argTypes:{children:{control:"text"},pressed:{control:"boolean"},defaultPressed:{control:"boolean"},size:{control:{type:"inline-radio"},options:["sm","md"]},block:{control:"boolean"},disabled:{control:"boolean"},onChange:{control:!1}}},s={args:{children:"Enable reminders",defaultPressed:!1}},t={args:{children:"Enable reminders",defaultPressed:!0}},o={args:{children:"Save preferences",block:!0,defaultPressed:!1},render:l=>e.createElement("div",{style:{width:"min(360px, 100vw)"}},e.createElement(c,{...l}))},n={args:{children:"Unavailable",defaultPressed:!1,disabled:!0}};var b,g,v;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    children: "Enable reminders",
    defaultPressed: false
  }
}`,...(v=(g=s.parameters)==null?void 0:g.docs)==null?void 0:v.source}}};var h,x,S;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    children: "Enable reminders",
    defaultPressed: true
  }
}`,...(S=(x=t.parameters)==null?void 0:x.docs)==null?void 0:S.source}}};var k,w,y;o.parameters={...o.parameters,docs:{...(k=o.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    children: "Save preferences",
    block: true,
    defaultPressed: false
  },
  render: args => <div style={{
    width: "min(360px, 100vw)"
  }}>
            <Toggle {...args} />
        </div>
}`,...(y=(w=o.parameters)==null?void 0:w.docs)==null?void 0:y.source}}};var E,P,T;n.parameters={...n.parameters,docs:{...(E=n.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    children: "Unavailable",
    defaultPressed: false,
    disabled: true
  }
}`,...(T=(P=n.parameters)==null?void 0:P.docs)==null?void 0:T.source}}};const j=["Default","On","Block","Disabled"];export{o as Block,s as Default,n as Disabled,t as On,j as __namedExportsOrder,U as default};
