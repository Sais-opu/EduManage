import React from "react";

const PartnerSection = () => {
    const partners = [
        { id: 1, src: "volkswagen-logo.png", alt: "Volkswagen Logo" },
        { id: 2, src: "samsung-logo.png", alt: "Samsung Logo" },
        { id: 3, src: "cisco-logo.png", alt: "Cisco Logo" },
        { id: 4, src: "att-logo.png", alt: "AT&T Logo" },
        { id: 5, src: "pg-logo.png", alt: "P&G Logo" },
        { id: 6, src: "hp-logo.png", alt: "Hewlett Packard Logo" },
        { id: 7, src: "citi-logo.png", alt: "Citi Logo" },
        { id: 8, src: "ericsson-logo.png", alt: "Ericsson Logo" },
    ];

    return (
        <section className="bg-gray-100 py-10">
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
