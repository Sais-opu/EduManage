import React from 'react';

const Banner = () => {
    return (
        <div>
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage: "url(https://i.ibb.co.com/DV76Y5Y/b.jpg)",
                }}>
                {/* style={{
                    backgroundImage: "url(https://i.ibb.co.com/dpxRZpY/images-q-tbn-ANd9-Gc-RV-K5-MP72h09bvb9-Hwh-YE7-Fe-M5-Mo-WE7-J3gfg-s.jpg)",
                }}> */}
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Empowering Education, Enabling Success

                        </h1>
                        <p className="mb-5 text-2xl">
                            Discover innovative tools and resources to transform learning experiences. Manage courses, track progress, and foster growth effortlessly. Empower educators and inspire learners for a brighter future!


                        </p>
                
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;