import React from "react";
import img from "../../assets/banar/demu.jpg"

const JoinAsATeacher = () => {


    return (
        <section className="bg-gray-100 py-12">
            <div className="container mx-auto flex flex-col lg:flex-row items-center lg:justify-between px-6">
                <div className="lg:w-1/2 text-center lg:text-left">
                    <h2 className="text-3xl font-bold mb-4 text-gray-800">Share Your Passion for Teaching</h2>
                    <p className="text-lg text-gray-600 mb-6">
                        Join a vibrant community of educators making a difference worldwide. Use
                        our tools and resources to create and share courses on what you love.
                    </p>
                    <button
                        className="bg-black text-white hover:bg-gray-800 px-6 py-3 rounded-md text-lg"
                        onClick={() => {
                            window.location.href = "/teachon";
                        }}
                    >
                        Start as a Teacher Today
                    </button>
                </div>
                <div className="lg:w-1/2 mt-8 lg:mt-0">
                    <div className="bg-yellow-300 p-4 rounded-lg">
                        <img
                            src={img}
                            alt="Inspire Teachers"
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JoinAsATeacher;
