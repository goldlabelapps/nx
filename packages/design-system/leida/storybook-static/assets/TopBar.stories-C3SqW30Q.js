import{R as e}from"./iframe-B_mmudIR.js";import{T as o}from"./TopBar-Bqouov-d.js";import{a as s}from"./fixtures-Coskpk_N.js";import"./preload-helper-Dp1pzeXC.js";import"./Logo-VsZu3W5R.js";import"./Button-DWpNvyRL.js";const{fn:l}=__STORYBOOK_MODULE_TEST__,f={title:"Navigation/TopBar",component:o,tags:["autodocs"],parameters:{layout:"fullscreen",docs:{description:{component:"Sticky frosted top bar with logo, mono caps links, and a primary CTA."}}},argTypes:{links:{control:!1},cta:{control:"text"},onCta:{control:!1},logoHeight:{control:{type:"range",min:20,max:60,step:1}}}},a={args:{links:s,cta:"Start now",onCta:l(),logoHeight:30},render:i=>e.createElement("div",{style:{minHeight:"70vh",background:"linear-gradient(180deg, rgba(168,146,122,0.10), transparent 36%), var(--surface-page)"}},e.createElement(o,{...i}),e.createElement("div",{style:{maxWidth:"1080px",margin:"0 auto",padding:"64px 24px"}},e.createElement("p",{style:{maxWidth:"56ch",fontSize:"1.15rem",lineHeight:1.65}},"The top bar should feel like it belongs to a calm, editorial landing page. This story gives it the kind of space it has in the app.")))};var t,n,r;a.parameters={...a.parameters,docs:{...(t=a.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    links: sampleBrandLinks,
    cta: "Start now",
    onCta: fn(),
    logoHeight: 30
  },
  render: args => <div style={{
    minHeight: "70vh",
    background: "linear-gradient(180deg, rgba(168,146,122,0.10), transparent 36%), var(--surface-page)"
  }}>
      <TopBar {...args} />
      <div style={{
      maxWidth: "1080px",
      margin: "0 auto",
      padding: "64px 24px"
    }}>
        <p style={{
        maxWidth: "56ch",
        fontSize: "1.15rem",
        lineHeight: 1.65
      }}>
          The top bar should feel like it belongs to a calm, editorial landing page. This story gives it the kind of space it has in the app.
        </p>
      </div>
    </div>
}`,...(r=(n=a.parameters)==null?void 0:n.docs)==null?void 0:r.source}}};const u=["Default"];export{a as Default,u as __namedExportsOrder,f as default};
