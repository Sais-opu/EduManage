import React from "react";

const PartnerSection = () => {
    const partners = [
        { id: 1, src: "https://i.ibb.co.com/QcZFM51/https-dev-to-uploads-s3-amazonaws-com-uploads-articles-cer3l19eex0wy900b101.jpg", alt: "Codeforces" },
        { id: 2, src: "https://i.ibb.co.com/D178NKw/logo-physics-school-subject-hand-drawn-icon-molecules-title-emblem-pop-art-style-vector-illustration.jpg", alt: "Physics" },
        { id: 3, src: "https://i.ibb.co.com/SdLdG8q/csg132-01-cisco-packet-tracer.png", alt: "Cisco Logo" },
        { id: 4, src: "https://i.ibb.co.com/qmmkdHW/images-q-tbn-ANd9-Gc-Re-Hx-PC-DGRTX-9-v-QFh-Qb-At-NNV6cc-Txg-Onu-Q-s.jpg", alt: "Khan Academy" },
        { id: 5, src: "https://i.ibb.co.com/N3dpBVP/maxresdefault.jpg", alt: "EFMD" },
        { id: 6, src: "https://i.ibb.co.com/N3dpBVP/maxresdefault.jpg", alt: "Great Learning" },
        { id: 7, src: "https://i.ibb.co.com/Fwmm9Hk/images-q-tbn-ANd9-Gc-T7-Cyo-Gx9-JJTjhfn19m-Ur7ycra9-W2-f-X2p-w-s.png", alt: "VLACS" },
        { id: 8, src: "https://i.ibb.co.com/MSwpvrN/images-q-tbn-ANd9-Gc-Se-FYq8-YMo-NFa-q-EGw-Usof-LCIhb-Zkl-UYULp-A-s.jpg", alt: "SimpliLearn" },
    ];

    return (
        <section className="bg-black py-10">
            <div className="container mx-auto text-center">
                <h2 className="text-lg lg:text-xl font-semibold mb-6">
                    Trusted by over 15,000 companies and millions of learners around the world
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 items-center">
                    {partners.map((partner) => (
                        <img
                            key={partner.id}
                            src={partner.src}
                            alt={partner.alt}
                            className="h-12 mx-auto opacity-70 hover:opacity-100 transition"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PartnerSection;
