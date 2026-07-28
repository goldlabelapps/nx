import{R as a}from"./iframe-B_mmudIR.js";import"./preload-helper-Dp1pzeXC.js";const x="M363.016,126.741L363.016,126.741c-49,30.938-80.537,49.425-106.386,53.948c-7.069-24.185-4.695-58.59,0.83-111.937c-13.971,53.275-24.017,86.695-39.851,106.678c-22.963-11.048-46.62-36.682-82.476-78.408c28.295,45.473,45.492,75.342,49.761,100.16c-25.218,7.258-61.668,4.454-119.274-1.895c57.386,14.647,92.789,24.982,113.674,41.246c-11.668,23.749-38.958,48.537-84.088,86.806c48.945-30.904,80.467-49.384,106.3-53.934c7.035,24.18,4.66,58.565-0.858,111.842c13.966-53.257,24.01-86.673,39.835-106.658c23.004,11.014,46.683,36.663,82.606,78.468c-28.337-45.54-45.542-75.43-49.779-100.269c25.215-7.223,61.646-4.417,119.178,1.924c-57.285-14.621-92.663-24.947-113.562-41.161C290.592,189.802,317.882,165.012,363.016,126.741z",b={ink:"#1a1814",dusty:"#2c2c2a",clay:"#a8927a",offwhite:"#f7f7f4",current:"currentColor"};function s({size:r=24,tone:c="ink",title:e,style:v,...h}){const y=b[c]||c;return a.createElement("svg",{viewBox:"65.62 68.752 326.868 312.495",width:r,height:r,fill:y,role:e?"img":"presentation","aria-hidden":e?void 0:!0,"aria-label":e,style:{display:"block",flex:"0 0 auto",...v},...h},e?a.createElement("title",null,e):null,a.createElement("path",{d:x}))}s.__docgenInfo={description:`Leida's signature eight-point sparkle - the mark lifted from the
dot of the "i" in the wordmark. Use as an app icon, favicon, quiet
inter-section accent, or loading glyph.`,methods:[],displayName:"StarMark",props:{size:{defaultValue:{value:"24",computed:!1},required:!1},tone:{defaultValue:{value:'"ink"',computed:!1},required:!1}}};const E={title:"Brand/StarMark",component:s,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"The standalone sparkle icon used for app accents, favicons, quiet separators, and compact brand moments."}}},argTypes:{size:{control:{type:"range",min:12,max:120,step:1}},tone:{control:{type:"inline-radio"},options:["ink","dusty","clay","offwhite","current"]},title:{control:"text",description:"Optional accessible title. Leave blank for decorative use."}}},t={args:{size:40,tone:"ink"}},n={args:{size:56,tone:"clay",title:"Leida sparkle mark"}},o={args:{size:44,tone:"current"},render:r=>a.createElement("div",{style:{padding:"28px",borderRadius:"var(--radius-xl)",background:"var(--leida-ink)",color:"var(--leida-parchment)"}},a.createElement(s,{...r}))};var i,d,l;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    size: 40,
    tone: "ink"
  }
}`,...(l=(d=t.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};var p,u,m;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    size: 56,
    tone: "clay",
    title: "Leida sparkle mark"
  }
}`,...(m=(u=n.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var f,g,k;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    size: 44,
    tone: "current"
  },
  render: args => <div style={{
    padding: "28px",
    borderRadius: "var(--radius-xl)",
    background: "var(--leida-ink)",
    color: "var(--leida-parchment)"
  }}>
      <StarMark {...args} />
    </div>
}`,...(k=(g=o.parameters)==null?void 0:g.docs)==null?void 0:k.source}}};const w=["Default","Accent","Inverse"];export{n as Accent,t as Default,o as Inverse,w as __namedExportsOrder,E as default};
