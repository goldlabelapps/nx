import{R as s}from"./iframe-B_mmudIR.js";import{P as m}from"./ProductCard-CfFAgmwj.js";import{F as u}from"./fixtures-Coskpk_N.js";import"./preload-helper-Dp1pzeXC.js";import"./Card-CKkp5u2D.js";import"./Tag-lxxaUVNV.js";import"./Typography-B12vbEBn.js";import"./BtnRoute-CSLq5LVs.js";import"./Button-DWpNvyRL.js";import"./BtnPrimary-Wd1N2_g5.js";const{fn:l}=__STORYBOOK_MODULE_TEST__,C={title:"Cards/ProductCard",component:m,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"Aftercare product card with image, serif product name, brand line, price, optional tag, and optional quiet buy action."}}},argTypes:{image:{control:!1},href:{control:"text"},name:{control:"text"},brand:{control:"text"},price:{control:"text"},tag:{control:"text"},showBuyButton:{control:"boolean"},buyLabel:{control:"text"},onBuy:{control:!1},onClick:{action:"card-clicked"}}},e={args:{image:s.createElement(u,{label:"Vitamin C15",subtitle:"Brightening serum"}),name:"Vitamin C15",brand:"Medik8",price:"£38",tag:"New",href:"/products/vitamin-c15",showBuyButton:!0,buyLabel:"Buy",onBuy:l()}},t={args:{name:"Gentle Cleanser",brand:"Mesoestetic",price:"£24",tag:"Routine"}};var r,o,a;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  args: {
    image: <FauxArtwork label="Vitamin C15" subtitle="Brightening serum" />,
    name: "Vitamin C15",
    brand: "Medik8",
    price: "£38",
    tag: "New",
    href: "/products/vitamin-c15",
    showBuyButton: true,
    buyLabel: "Buy",
    onBuy: fn()
  }
}`,...(a=(o=e.parameters)==null?void 0:o.docs)==null?void 0:a.source}}};var n,i,c;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    name: "Gentle Cleanser",
    brand: "Mesoestetic",
    price: "£24",
    tag: "Routine"
  }
}`,...(c=(i=t.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};const k=["WithArtwork","PlaceholderImage"];export{t as PlaceholderImage,e as WithArtwork,k as __namedExportsOrder,C as default};
