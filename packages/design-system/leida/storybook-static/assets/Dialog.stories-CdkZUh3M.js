import{R as e}from"./iframe-B_mmudIR.js";import{B as n}from"./Button-DWpNvyRL.js";import{D as C}from"./Dialog-BmlsP9XZ.js";import"./preload-helper-Dp1pzeXC.js";import"./index-CTGPg97s.js";import"./index-rswOeGOU.js";import"./Card-CKkp5u2D.js";const T={title:"Feedback/Dialog",component:C,tags:["autodocs"],parameters:{layout:"fullscreen",docs:{description:{component:"Leida's replacement for MUI Dialog. Controlled, centered, and built for confirmation or focused tasks."}}},argTypes:{open:{control:"boolean"},title:{control:"text"},description:{control:"text"},children:{control:"text"},actions:{control:!1},size:{control:{type:"inline-radio"},options:["sm","md","lg","xl"]},dismissible:{control:"boolean"},closeOnBackdropClick:{control:"boolean"},closeOnEscapeKeyDown:{control:"boolean"},onClose:{control:!1}}},r={args:{open:!0,title:"Delete client note?",description:"This action cannot be undone once the note is removed from the timeline.",size:"md",dismissible:!0,children:"A dialog body can hold longer copy, form fields, or any custom layout.",actions:e.createElement(e.Fragment,null,e.createElement(n,{variant:"quiet"},"Cancel"),e.createElement(n,{variant:"primary"},"Delete note"))}},a={args:{open:!0,title:"Session details",description:"Use a wider dialog when the content needs more breathing room.",size:"xl",dismissible:!0,children:"This variant is useful for forms or multi-section review screens.",actions:e.createElement(e.Fragment,null,e.createElement(n,{variant:"quiet"},"Back"),e.createElement(n,{variant:"secondary"},"Save draft"))}},s={render:function(t){const[D,l]=e.useState(t.open);return e.createElement(e.Fragment,null,e.createElement(n,{variant:"primary",onClick:()=>l(!0)},"Open dialog"),e.createElement(C,{...t,open:D,onClose:(w,o)=>{var c;(o==="closeButtonClick"||o==="backdropClick"||o==="escapeKeyDown")&&l(!1),(c=t.onClose)==null||c.call(t,w,o)}}))},args:{open:!1,title:"Review changes",description:"This story demonstrates the close button, backdrop click, and escape key behavior.",size:"md",dismissible:!0,children:"Dismissed by parent state, like a real MUI Dialog replacement.",actions:e.createElement(e.Fragment,null,e.createElement(n,{variant:"quiet"},"Cancel"),e.createElement(n,{variant:"secondary"},"Continue"))}},i={args:{open:!0,title:"Launch checklist",description:"Complete each requirement before publishing this routine.",size:"md",dismissible:!0,requirements:[{label:"Brand voice approved",complete:!0},{label:"Before and after photos uploaded",complete:!0},{label:"Client consent added",complete:!1},{label:"Follow-up reminder scheduled",complete:!1}],children:"Outstanding requirements are shown with open circles and completed steps use tick marks.",actions:e.createElement(e.Fragment,null,e.createElement(n,{variant:"quiet"},"Back"),e.createElement(n,{variant:"secondary"},"Save draft"))}};var d,m,u;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    open: true,
    title: "Delete client note?",
    description: "This action cannot be undone once the note is removed from the timeline.",
    size: "md",
    dismissible: true,
    children: "A dialog body can hold longer copy, form fields, or any custom layout.",
    actions: <>
        <Button variant="quiet">Cancel</Button>
        <Button variant="primary">Delete note</Button>
      </>
  }
}`,...(u=(m=r.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var p,h,f;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    open: true,
    title: "Session details",
    description: "Use a wider dialog when the content needs more breathing room.",
    size: "xl",
    dismissible: true,
    children: "This variant is useful for forms or multi-section review screens.",
    actions: <>
        <Button variant="quiet">Back</Button>
        <Button variant="secondary">Save draft</Button>
      </>
  }
}`,...(f=(h=a.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var b,g,v;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: function Render(args) {
    const [open, setOpen] = React.useState(args.open);
    return <>
        <Button variant="primary" onClick={() => setOpen(true)}>
          Open dialog
        </Button>
        <Dialog {...args} open={open} onClose={(event, reason) => {
        if (reason === "closeButtonClick" || reason === "backdropClick" || reason === "escapeKeyDown") {
          setOpen(false);
        }
        args.onClose?.(event, reason);
      }} />
      </>;
  },
  args: {
    open: false,
    title: "Review changes",
    description: "This story demonstrates the close button, backdrop click, and escape key behavior.",
    size: "md",
    dismissible: true,
    children: "Dismissed by parent state, like a real MUI Dialog replacement.",
    actions: <>
        <Button variant="quiet">Cancel</Button>
        <Button variant="secondary">Continue</Button>
      </>
  }
}`,...(v=(g=s.parameters)==null?void 0:g.docs)==null?void 0:v.source}}};var k,B,y;i.parameters={...i.parameters,docs:{...(k=i.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    open: true,
    title: "Launch checklist",
    description: "Complete each requirement before publishing this routine.",
    size: "md",
    dismissible: true,
    requirements: [{
      label: "Brand voice approved",
      complete: true
    }, {
      label: "Before and after photos uploaded",
      complete: true
    }, {
      label: "Client consent added",
      complete: false
    }, {
      label: "Follow-up reminder scheduled",
      complete: false
    }],
    children: "Outstanding requirements are shown with open circles and completed steps use tick marks.",
    actions: <>
        <Button variant="quiet">Back</Button>
        <Button variant="secondary">Save draft</Button>
      </>
  }
}`,...(y=(B=i.parameters)==null?void 0:B.docs)==null?void 0:y.source}}};const L=["Default","Large","ControlledDismiss","RequirementsChecklist"];export{s as ControlledDismiss,r as Default,a as Large,i as RequirementsChecklist,L as __namedExportsOrder,T as default};
