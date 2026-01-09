
import Image from "next/image";
import Link from "next/link";
import HomeInstallWrapper from "../goldlabel/components/HomeInstallWrapper";


interface PageProps {
    params: Promise<{
        slug?: string[];
    }>;
}



export default function Page() {
    // Placeholder: Render HomeInstallWrapper only
    return (
        <div className="page-layout">
            <main className="page-content">
                <article>
                    <HomeInstallWrapper />
                </article>
            </main>
        </div>
    );
}
