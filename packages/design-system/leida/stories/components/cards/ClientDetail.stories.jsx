import React from "react";
import { ClientDetail } from "../../../components/cards/ClientDetail.jsx";

const meta = {
  title: "Cards/ClientDetail",
  component: ClientDetail,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Responsive client detail card with a skin type badge, pregnancy tick, full overview by default, concern tags, and an empty-state edit link.",
      },
    },
  },
  argTypes: {
    client: { control: false },
    editHref: { control: "text" },
    overviewLines: { control: "number" },
  },
};

export default meta;

export const Default = {
  args: {
    client: {
      slug: "caroline-mayne",
      email: "c@goldlabel.pro",
      first_name: "Caroline",
      last_name: "Mayne",
      skin_type: "dry",
      is_pregnant: false,
      concern_tags: ["ageing", "dehydration", "pigmentation"],
      skin_overview:
        "Caroline has mature skin showing signs of reduced elasticity, uneven pigmentation and some dryness. Fine lines are visible around the eyes and mouth, with mild loss of firmness across the cheeks.",
    },
    editHref: "/clients/caroline-mayne/edit",
  },
};

export const PregnantWithEmptyOverview = {
  args: {
    client: {
      first_name: "Sofia",
      last_name: "Brown",
      skin_type: "combination",
      is_pregnant: true,
      concern_tags: ["sensitivity", "hydration"],
      skin_overview: "",
    },
    editHref: "/clients/sofia-brown/edit",
  },
};

export const TwoLineExtract = {
  args: {
    client: {
      slug: "caroline-mayne",
      email: "c@goldlabel.pro",
      first_name: "Caroline",
      last_name: "Mayne",
      skin_type: "dry",
      is_pregnant: false,
      concern_tags: ["ageing", "dehydration", "pigmentation"],
      skin_overview:
        "Caroline has mature skin showing signs of reduced elasticity, uneven pigmentation and some dryness. Fine lines are visible around the eyes and mouth, with mild loss of firmness across the cheeks. Skin appears slightly dehydrated, with occasional dullness and a need for improved barrier support.",
    },
    overviewLines: 2,
    editHref: "/clients/caroline-mayne/edit",
  },
};