import{R as n}from"./iframe-B_mmudIR.js";import{C as z}from"./Card-CKkp5u2D.js";import{B as A}from"./Badge-BPIp5YCF.js";import{T as M}from"./Tag-lxxaUVNV.js";import{B as y}from"./BtnRoute-CSLq5LVs.js";import{T as f}from"./Typography-B12vbEBn.js";import"./preload-helper-Dp1pzeXC.js";import"./Button-DWpNvyRL.js";function a(e,t,i){return(e==null?void 0:e[t])??(e==null?void 0:e[i])}function P(e,t,i){return!e||typeof e!="object"?!1:Object.prototype.hasOwnProperty.call(e,t)||Object.prototype.hasOwnProperty.call(e,i)}function I(e,t=220){if(typeof e!="string")return e;const i=e.trim();return i.length<=t?i:`${i.slice(0,t).trimEnd()}...`}function C({client:e,editHref:t,overviewLines:i,actionButton:S,style:T,...B}){const O=a(e,"first_name","firstName")||"Client",D=a(e,"last_name","lastName")||"",r=a(e,"skin_type","skinType"),s=a(e,"skin_overview","skinOverview"),d=a(e,"concern_tags","concernTags")||[],H=[O,D].filter(Boolean).join(" "),N=P(e,"skin_type","skinType"),W=typeof r=="string"?r.trim().length>0:!!r,m=typeof s=="string"?s.trim().length>0:!!s,F=I(s),j=Number.isInteger(i)&&i>0,p=S||(t&&m?n.createElement(y,{as:"a",href:t},"Edit client"):null);return n.createElement(z,{variant:"paper",padding:"lg",style:{position:"relative",overflow:"hidden",display:"flex",flexDirection:"column",gap:"18px",minHeight:"100%",...T},...B},n.createElement("div",{style:{minWidth:0,display:"flex",flexDirection:"column",gap:"14px"}},n.createElement("div",{style:{minWidth:0,display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:"12px",flexWrap:"wrap"}},n.createElement(f,{as:"h3",variant:"label",style:{margin:0,letterSpacing:"0.01em",textTransform:"none",fontSize:"1.7rem",lineHeight:1.1}},H),p?n.createElement("div",{style:{flex:"0 0 auto"}},p):null),N&&W?n.createElement("div",{style:{paddingBottom:"2px"}},n.createElement(A,{tone:"quiet"},r," Skin")):null,m?n.createElement("p",{style:{margin:0,fontSize:"1.02rem",lineHeight:1.55,color:"var(--leida-ink)",...j?{display:"-webkit-box",WebkitLineClamp:i,WebkitBoxOrient:"vertical",overflow:"hidden"}:null}},F):t?n.createElement("div",{style:{padding:"14px 16px",borderRadius:"var(--radius-lg)",background:"rgba(255,255,255,0.55)",border:"1px dashed rgba(168, 146, 122, 0.42)",display:"flex",flexDirection:"column",gap:"10px"}},n.createElement("p",{style:{margin:0,fontSize:"1rem",lineHeight:1.5,color:"var(--leida-ink)"}},"No skin overview yet. Create one to keep the client summary visible at a glance."),n.createElement(y,{as:"a",href:t,style:{alignSelf:"flex-start"}},"Create skin overview")):null,Array.isArray(d)&&d.length?n.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"8px"}},n.createElement(f,{as:"p",variant:"caption",color:"text.secondary",style:{margin:0}},"Concerns"),n.createElement("div",{style:{display:"flex",flexWrap:"wrap",gap:"8px"}},d.map((g,R)=>n.createElement(M,{key:`${String(g)}-${R}`,variant:"outline",style:{fontSize:"0.78rem",padding:"5px 10px"}},g)))):null))}C.__docgenInfo={description:`A responsive client detail card with the client name, skin overview,
concern tags, and quick state markers for skin type and pregnancy.`,methods:[],displayName:"ClientDetail"};const V={title:"Cards/ClientDetail",component:C,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"Responsive client detail card with a skin type badge, pregnancy tick, full overview by default, concern tags, and an empty-state edit link."}}},argTypes:{client:{control:!1},editHref:{control:"text"},overviewLines:{control:"number"}}},o={args:{client:{slug:"caroline-mayne",email:"c@goldlabel.pro",first_name:"Caroline",last_name:"Mayne",skin_type:"dry",is_pregnant:!1,concern_tags:["ageing","dehydration","pigmentation"],skin_overview:"Caroline has mature skin showing signs of reduced elasticity, uneven pigmentation and some dryness. Fine lines are visible around the eyes and mouth, with mild loss of firmness across the cheeks."},editHref:"/clients/caroline-mayne/edit"}},l={args:{client:{first_name:"Sofia",last_name:"Brown",skin_type:"combination",is_pregnant:!0,concern_tags:["sensitivity","hydration"],skin_overview:""},editHref:"/clients/sofia-brown/edit"}},c={args:{client:{slug:"caroline-mayne",email:"c@goldlabel.pro",first_name:"Caroline",last_name:"Mayne",skin_type:"dry",is_pregnant:!1,concern_tags:["ageing","dehydration","pigmentation"],skin_overview:"Caroline has mature skin showing signs of reduced elasticity, uneven pigmentation and some dryness. Fine lines are visible around the eyes and mouth, with mild loss of firmness across the cheeks. Skin appears slightly dehydrated, with occasional dullness and a need for improved barrier support."},overviewLines:2,editHref:"/clients/caroline-mayne/edit"}};var u,h,v;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    client: {
      slug: "caroline-mayne",
      email: "c@goldlabel.pro",
      first_name: "Caroline",
      last_name: "Mayne",
      skin_type: "dry",
      is_pregnant: false,
      concern_tags: ["ageing", "dehydration", "pigmentation"],
      skin_overview: "Caroline has mature skin showing signs of reduced elasticity, uneven pigmentation and some dryness. Fine lines are visible around the eyes and mouth, with mild loss of firmness across the cheeks."
    },
    editHref: "/clients/caroline-mayne/edit"
  }
}`,...(v=(h=o.parameters)==null?void 0:h.docs)==null?void 0:v.source}}};var k,_,w;l.parameters={...l.parameters,docs:{...(k=l.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    client: {
      first_name: "Sofia",
      last_name: "Brown",
      skin_type: "combination",
      is_pregnant: true,
      concern_tags: ["sensitivity", "hydration"],
      skin_overview: ""
    },
    editHref: "/clients/sofia-brown/edit"
  }
}`,...(w=(_=l.parameters)==null?void 0:_.docs)==null?void 0:w.source}}};var x,b,E;c.parameters={...c.parameters,docs:{...(x=c.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    client: {
      slug: "caroline-mayne",
      email: "c@goldlabel.pro",
      first_name: "Caroline",
      last_name: "Mayne",
      skin_type: "dry",
      is_pregnant: false,
      concern_tags: ["ageing", "dehydration", "pigmentation"],
      skin_overview: "Caroline has mature skin showing signs of reduced elasticity, uneven pigmentation and some dryness. Fine lines are visible around the eyes and mouth, with mild loss of firmness across the cheeks. Skin appears slightly dehydrated, with occasional dullness and a need for improved barrier support."
    },
    overviewLines: 2,
    editHref: "/clients/caroline-mayne/edit"
  }
}`,...(E=(b=c.parameters)==null?void 0:b.docs)==null?void 0:E.source}}};const X=["Default","PregnantWithEmptyOverview","TwoLineExtract"];export{o as Default,l as PregnantWithEmptyOverview,c as TwoLineExtract,X as __namedExportsOrder,V as default};
