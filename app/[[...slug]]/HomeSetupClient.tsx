"use client";
import Setup from "@/goldlabel/components/Setup";
import { createHomeMarkdown } from "@/goldlabel/lib/createHome";
export default function HomeSetupClient() {
    return (
        <Setup
            onSubmit={async (data) => {
                await createHomeMarkdown(data);
                window.location.reload();
            }}
        />
    );
}