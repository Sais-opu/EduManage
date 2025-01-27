import React from 'react';

const Another = () => {
    return (
        <div>
            <div className=" bg-[#adff2f] text-black min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-center text-6xl  mb-6">Mastering the Art of Problem-Solving: Strategies and Insights</h1>
                <div>
                    <p>Dive into this insightful video that unpacks effective problem-solving techniques to elevate your decision-making skills. Learn actionable strategies, innovative approaches, and mindset shifts to tackle challenges with confidence. Whether you're a student, professional, or simply looking to sharpen your critical thinking, this video offers valuable lessons for everyone. Watch now to transform the way you approach problems!F</p>
                </div>
                <div className=" p-10 flex justify-center">


                    <iframe width="560" height="315" src="https://www.youtube.com/embed/XQc6oUH4wNM?si=L-dO-ct7ale6sfPy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            </div>

        </div>
    );
};

export default Another;