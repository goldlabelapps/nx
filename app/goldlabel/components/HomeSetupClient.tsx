"use client";

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
        </>
    );
}
