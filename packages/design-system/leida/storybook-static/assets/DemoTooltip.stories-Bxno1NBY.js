import{R as e}from"./iframe-B_mmudIR.js";import"./preload-helper-Dp1pzeXC.js";const d={left:"flex-start",center:"center",right:"flex-end"},c={"bottom-center":{bottom:-7,left:"50%",marginLeft:-7},"bottom-right":{bottom:-7,right:32},"top-center":{top:-7,left:"50%",marginLeft:-7}},p={clay:{background:"var(--leida-clay)",color:"var(--leida-parchment)",border:"1px solid rgba(255,255,255,0.16)"},frost:{background:"rgba(255,255,255,0.82)",color:"var(--leida-ink)",border:"1px solid rgba(255,255,255,0.86)"}};function i({text:n,children:w,align:E="center",tail:l="bottom-center",tone:k="clay",icon:s="✦",maxWidth:T="34rem",style:S,bubbleStyle:V,..._}){const A=w||n,D=d[E]||d.center,P=c[l]||c["bottom-center"],t=p[k]||p.clay;return e.createElement("div",{style:{display:"flex",justifyContent:D,padding:l==="top-center"?"10px 0 0":"0 0 10px",...S},..._},e.createElement("div",{style:{position:"relative",display:"inline-flex",alignItems:"center",gap:"10px",padding:"8px 12px",borderRadius:"12px",fontFamily:"var(--font-serif)",fontSize:"0.95rem",lineHeight:1.45,maxWidth:T,boxShadow:"0 8px 20px rgba(40,34,28,0.16)",...t,...V}},s?e.createElement("span",{"aria-hidden":"true",style:{display:"inline-flex",lineHeight:1,flexShrink:0}},s):null,A,e.createElement("span",{"aria-hidden":"true",style:{position:"absolute",width:14,height:14,background:t.background,borderRight:t.border,borderBottom:t.border,transform:"rotate(45deg)",...P}})))}i.__docgenInfo={description:"Guided demo callout bubble with an optional icon and directional tail.",methods:[],displayName:"DemoTooltip",props:{align:{defaultValue:{value:'"center"',computed:!1},required:!1},tail:{defaultValue:{value:'"bottom-center"',computed:!1},required:!1},tone:{defaultValue:{value:'"clay"',computed:!1},required:!1},icon:{defaultValue:{value:'"✦"',computed:!1},required:!1},maxWidth:{defaultValue:{value:'"34rem"',computed:!1},required:!1}}};const N={title:"Feedback/DemoTooltip",component:i,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"Guided demo callout bubble used for in-flow coaching prompts and walkthrough hints."}}},argTypes:{text:{control:"text"},align:{control:{type:"inline-radio"},options:["left","center","right"]},tail:{control:{type:"inline-radio"},options:["bottom-center","bottom-right","top-center"]},tone:{control:{type:"inline-radio"},options:["clay","frost"]},icon:{control:!1},bubbleStyle:{control:!1}}},o={args:{text:"Now choose Ellie's cleanser to begin the routine.",align:"center",tail:"bottom-center",tone:"clay"}},r={args:{text:"This hint sits below the target with an upward tail.",tail:"top-center",align:"center",tone:"clay"}},a={args:{text:"Use the frosted tone for lighter overlays and preview states.",tail:"bottom-right",align:"right",tone:"frost",icon:e.createElement("span",{"aria-hidden":"true"},"i")},render:n=>e.createElement("div",{style:{width:"min(560px, 92vw)",padding:16,background:"linear-gradient(180deg, #ece8df 0%, #dfd7c9 100%)",borderRadius:16}},e.createElement(i,{...n}))};var u,g,m;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    text: "Now choose Ellie's cleanser to begin the routine.",
    align: "center",
    tail: "bottom-center",
    tone: "clay"
  }
}`,...(m=(g=o.parameters)==null?void 0:g.docs)==null?void 0:m.source}}};var f,b,h;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    text: "This hint sits below the target with an upward tail.",
    tail: "top-center",
    align: "center",
    tone: "clay"
  }
}`,...(h=(b=r.parameters)==null?void 0:b.docs)==null?void 0:h.source}}};var y,x,v;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    text: "Use the frosted tone for lighter overlays and preview states.",
    tail: "bottom-right",
    align: "right",
    tone: "frost",
    icon: <span aria-hidden="true">i</span>
  },
  render: args => <div style={{
    width: "min(560px, 92vw)",
    padding: 16,
    background: "linear-gradient(180deg, #ece8df 0%, #dfd7c9 100%)",
    borderRadius: 16
  }}>
            <DemoTooltip {...args} />
        </div>
}`,...(v=(x=a.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};const F=["Default","PointingUp","FrostVariant"];export{o as Default,a as FrostVariant,r as PointingUp,F as __namedExportsOrder,N as default};
