"use client";
import Install from "@/goldlabel/components/Install";
import { createHomeMarkdown } from "@/goldlabel/lib/createHome";
export default function HomeSetupClient() {
    return (
        <>
            <div className="mobile-featured-image">
                <img
                    src="/png/og.png"
                    alt="Goldlabel Featured"
                    width={1200}
                    height={630}
                    style={{ objectFit: 'cover', width: '100%', borderRadius: '1.2rem', marginBottom: '2rem' }}
                />
            </div>
            <Install
                onSubmit={async (data) => {
                    await createHomeMarkdown({
                        sitename: data.appname,
                        description: "",
                        namespace: ""
                    });
                    window.location.reload();
                }}
            />
        </>
    );
}