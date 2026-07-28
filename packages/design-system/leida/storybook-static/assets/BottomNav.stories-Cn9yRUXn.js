import{R as a}from"./iframe-B_mmudIR.js";import{d as E}from"./fixtures-Coskpk_N.js";import"./preload-helper-Dp1pzeXC.js";function i({items:t=[],value:r,onChange:l,onNavigate:s,ariaLabel:u="Bottom navigation",style:v,...f}){var d;const[x,b]=a.useState(r??((d=t[0])==null?void 0:d.value)),h=r??x,y=e=>{e.disabled||(r===void 0&&b(e.value),l&&l(e.value,e),s&&s(e))};return a.createElement("nav",{"aria-label":u,style:{position:"fixed",left:0,right:0,bottom:0,zIndex:40,padding:"10px max(12px, env(safe-area-inset-right)) calc(10px + env(safe-area-inset-bottom)) max(12px, env(safe-area-inset-left))",background:"transparent",backdropFilter:"var(--blur-bar)",WebkitBackdropFilter:"var(--blur-bar)",borderTop:"1px solid var(--leida-line)",...v},...f},a.createElement("div",{style:{display:"grid",gridTemplateColumns:`repeat(${Math.max(t.length,1)}, minmax(0, 1fr))`,gap:"8px",maxWidth:"640px",margin:"0 auto"}},t.map(e=>{const n=e.value===h;return a.createElement("button",{key:e.value,type:"button",onClick:()=>y(e),disabled:e.disabled,"aria-current":n?"page":void 0,style:{appearance:"none",border:n?"1px solid rgba(40,34,28,0.24)":"1px solid transparent",borderRadius:"16px",minHeight:"52px",padding:"8px 10px",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:"4px",background:n?"rgba(255,255,255,0.52)":"transparent",color:n?"var(--leida-ink)":"var(--leida-body)",boxShadow:n?"0 6px 18px rgba(40,34,28,0.10)":"none",cursor:e.disabled?"not-allowed":"pointer",opacity:e.disabled?.5:1,transition:"all var(--dur-fast) var(--ease-out)"}},e.icon?a.createElement("span",{style:{display:"inline-flex",lineHeight:0},"aria-hidden":"true"},e.icon):null,a.createElement("span",{style:{fontFamily:"var(--font-mono)",fontSize:"0.65rem",letterSpacing:"0.1em",textTransform:"uppercase",lineHeight:1.1}},e.label))})))}i.__docgenInfo={description:`A mobile-style bottom navigation bar with icon + label actions.
Uses a frosted, rounded surface that matches the Leida visual system.`,methods:[],displayName:"BottomNav",props:{items:{defaultValue:{value:"[]",computed:!1},required:!1},ariaLabel:{defaultValue:{value:'"Bottom navigation"',computed:!1},required:!1}}};const{fn:p}=__STORYBOOK_MODULE_TEST__,T={title:"Navigation/BottomNav",component:i,tags:["autodocs"],parameters:{layout:"fullscreen",docs:{description:{component:"Fixed bottom navigation with icon-plus-label items and a frosted surface."}}},argTypes:{items:{control:!1},value:{control:!1},onChange:{control:!1},onNavigate:{control:!1},ariaLabel:{control:"text"}}},o={args:{items:E,value:"routine",onChange:p(),onNavigate:p()},render:t=>a.createElement("div",{style:{minHeight:"100vh",paddingBottom:"120px",background:"linear-gradient(180deg, rgba(168,146,122,0.10), transparent 40%), var(--surface-page)"}},a.createElement("div",{style:{maxWidth:"720px",margin:"0 auto",padding:"64px 24px 160px",lineHeight:1.7}},a.createElement("h2",{style:{fontFamily:"var(--font-serif)",fontStyle:"italic",fontSize:"2.4rem",margin:"0 0 12px"}},"Living page"),a.createElement("p",null,"The bottom nav needs vertical space because it is fixed to the viewport. This story leaves enough room to see the control in context.")),a.createElement(i,{...t}))};var c,m,g;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    items: sampleBottomNavItems,
    value: "routine",
    onChange: fn(),
    onNavigate: fn()
  },
  render: args => <div style={{
    minHeight: "100vh",
    paddingBottom: "120px",
    background: "linear-gradient(180deg, rgba(168,146,122,0.10), transparent 40%), var(--surface-page)"
  }}>
      <div style={{
      maxWidth: "720px",
      margin: "0 auto",
      padding: "64px 24px 160px",
      lineHeight: 1.7
    }}>
        <h2 style={{
        fontFamily: "var(--font-serif)",
        fontStyle: "italic",
        fontSize: "2.4rem",
        margin: "0 0 12px"
      }}>Living page</h2>
        <p>
          The bottom nav needs vertical space because it is fixed to the viewport. This story leaves enough room to see the control in context.
        </p>
      </div>
      <BottomNav {...args} />
    </div>
}`,...(g=(m=o.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};const N=["Default"];export{o as Default,N as __namedExportsOrder,T as default};
