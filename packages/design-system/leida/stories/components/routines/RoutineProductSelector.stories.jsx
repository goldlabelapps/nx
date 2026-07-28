import React from "react";
import { RoutineProductSelector } from "../../../components/routines/RoutineProductSelector.jsx";

const PRODUCTS = [
  { id: "cicaplast", routine_step: "Cleanse", product_name: "Cicaplast B5 Cleansing Gel", brand: "La Roche-Posay", am_pm: "both", thumbnail: "./replit/client/public/products/cicaplast-cleanser.jpg" },
  { id: "peptide", routine_step: "Treat", product_name: "The 6 Peptide Skin Booster", brand: "COSRX", am_pm: "am", thumbnail: "./replit/client/public/products/peptide-booster.jpg" },
  { id: "retinal", routine_step: "Treat", product_name: "Crystal Retinal 3", brand: "Medik8", am_pm: "pm", thumbnail: "./replit/client/public/products/crystal-retinal-3.webp" },
  { id: "moist", routine_step: "Moisturise", product_name: "Total Moisture Daily Cream", brand: "Medik8", am_pm: "both", thumbnail: "./replit/client/public/products/medik8-moisturiser.jpg" },
  { id: "spf", routine_step: "SPF", product_name: "Relief Sun SPF50+", brand: "Beauty of Joseon", am_pm: "am", thumbnail: "./replit/client/public/products/boj-spf.jpg" },
];

function ControlledPreview(args) {
  const [value, setValue] = React.useState({
    cicaplast: { productId: "cicaplast", amPm: "both", usageNote: "" },
    spf: { productId: "spf", amPm: "am", usageNote: "Reapply every 2 hours" },
  });

  return (
    <RoutineProductSelector
      {...args}
      value={value}
      onChange={setValue}
      style={{ width: "min(100vw - 40px, 760px)" }}
    />
  );
}

const meta = {
  title: "Routines/RoutineProductSelector",
  component: RoutineProductSelector,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Routine creation selector from the app flow: choose products, set AM/PM usage, and add optional usage notes per product.",
      },
    },
  },
  argTypes: {
    products: { control: false },
    value: { control: false },
    defaultValue: { control: false },
    onChange: { control: false },
    stepOrder: { control: false },
    amPmOptions: { control: false },
  },
};

export default meta;

export const Default = {
  args: {
    products: PRODUCTS,
  },
  render: (args) => <ControlledPreview {...args} />,
};
