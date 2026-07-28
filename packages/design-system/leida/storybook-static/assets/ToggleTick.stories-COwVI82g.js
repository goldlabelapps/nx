import{R as e}from"./iframe-B_mmudIR.js";import"./preload-helper-Dp1pzeXC.js";const x={sm:20,md:24,lg:30},b={sm:.76,md:1,lg:1.18};function n({checked:u,defaultChecked:p=!1,onChange:r,size:l="md",disabled:t=!1,style:F,...L}){const[w,q]=e.useState(!!p),[m,f]=e.useState(!1),g=u!==void 0,a=g?u:w,h=x[l]||x.md,o=b[l]||b.md;return e.createElement("button",{type:"button","aria-pressed":a,disabled:t,onClick:A=>{if(t)return;const k=!a;g||q(k),r==null||r(k,A)},onMouseEnter:()=>f(!0),onMouseLeave:()=>f(!1),style:{width:`${h}px`,height:`${h}px`,borderRadius:"999px",display:"inline-flex",alignItems:"center",justifyContent:"center",border:`1.5px solid ${a?"var(--leida-ink)":"rgba(168,146,122,0.44)"}`,background:a?"var(--leida-ink)":"rgba(255,255,255,0.5)",backdropFilter:a?void 0:"var(--blur-chip)",WebkitBackdropFilter:a?void 0:"var(--blur-chip)",boxShadow:m&&!t?"0 6px 14px rgba(40,34,28,0.18)":a?"0 2px 7px rgba(40,34,28,0.22)":"none",transform:m&&!t?"translateY(-1px)":"none",cursor:t?"not-allowed":"pointer",opacity:t?.45:1,transition:"all var(--dur-fast) var(--ease-out)",...F},...L},a?e.createElement("span",{"aria-hidden":"true",style:{display:"inline-block",width:`${Math.round(10*o)}px`,height:`${Math.round(5*o)}px`,borderLeft:`${Math.max(2,Math.round(2*o))}px solid var(--leida-parchment)`,borderBottom:`${Math.max(2,Math.round(2*o))}px solid var(--leida-parchment)`,transform:"translateY(-1px) rotate(-45deg)"}}):null)}n.__docgenInfo={description:"A circular, press-to-toggle tick control for routine/product selection.",methods:[],displayName:"ToggleTick",props:{defaultChecked:{defaultValue:{value:"false",computed:!1},required:!1},size:{defaultValue:{value:'"md"',computed:!1},required:!1},disabled:{defaultValue:{value:"false",computed:!1},required:!1}}};const V={title:"Forms/ToggleTick",component:n,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"Circular tick selector for product/routine pickers. Works in controlled and uncontrolled modes."}}},argTypes:{checked:{control:"boolean"},defaultChecked:{control:"boolean"},size:{control:{type:"inline-radio"},options:["sm","md","lg"]},disabled:{control:"boolean"},onChange:{control:!1}}},s={args:{defaultChecked:!1,size:"md","aria-label":"Select this product"}},c={args:{defaultChecked:!0,size:"md","aria-label":"Select this product"}},d={render:()=>e.createElement("div",{style:{display:"flex",alignItems:"center",gap:16}},e.createElement(n,{size:"sm",defaultChecked:!0,"aria-label":"Small selected"}),e.createElement(n,{size:"md",defaultChecked:!0,"aria-label":"Medium selected"}),e.createElement(n,{size:"lg",defaultChecked:!0,"aria-label":"Large selected"}))},i={render:function(p){const[r,l]=e.useState(!1);return e.createElement("div",{style:{display:"flex",alignItems:"center",gap:12}},e.createElement(n,{...p,checked:r,onChange:t=>l(t)}),e.createElement("span",{style:{fontFamily:"var(--font-mono)",fontSize:"0.75rem",letterSpacing:"0.08em",textTransform:"uppercase"}},r?"Selected":"Not selected"))},args:{size:"md","aria-label":"Toggle selection"}};var C,S,v;s.parameters={...s.parameters,docs:{...(C=s.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    defaultChecked: false,
    size: "md",
    "aria-label": "Select this product"
  }
}`,...(v=(S=s.parameters)==null?void 0:S.docs)==null?void 0:v.source}}};var y,T,z;c.parameters={...c.parameters,docs:{...(y=c.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    defaultChecked: true,
    size: "md",
    "aria-label": "Select this product"
  }
}`,...(z=(T=c.parameters)==null?void 0:T.docs)==null?void 0:z.source}}};var E,M,I;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    alignItems: "center",
    gap: 16
  }}>
            <ToggleTick size="sm" defaultChecked aria-label="Small selected" />
            <ToggleTick size="md" defaultChecked aria-label="Medium selected" />
            <ToggleTick size="lg" defaultChecked aria-label="Large selected" />
        </div>
}`,...(I=(M=d.parameters)==null?void 0:M.docs)==null?void 0:I.source}}};var $,R,_;i.parameters={...i.parameters,docs:{...($=i.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: function Render(args) {
    const [checked, setChecked] = React.useState(false);
    return <div style={{
      display: "flex",
      alignItems: "center",
      gap: 12
    }}>
                <ToggleTick {...args} checked={checked} onChange={next => setChecked(next)} />
                <span style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.75rem",
        letterSpacing: "0.08em",
        textTransform: "uppercase"
      }}>
                    {checked ? "Selected" : "Not selected"}
                </span>
            </div>;
  },
  args: {
    size: "md",
    "aria-label": "Toggle selection"
  }
}`,...(_=(R=i.parameters)==null?void 0:R.docs)==null?void 0:_.source}}};const D=["Default","Checked","Sizes","Controlled"];export{c as Checked,i as Controlled,s as Default,d as Sizes,D as __namedExportsOrder,V as default};
