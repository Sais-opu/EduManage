import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import axios from 'axios';

const HighlightClasses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('https://edumanage-server-nine.vercel.app/courses');
                console.log("Fetched courses:", response.data);
                setCourses(response.data.sort((a, b) => b.enrollment - a.enrollment).slice(0, 6));
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, []);
    

    return (
        <div className="highlight-classes p-4">
            <h2 className="text-2xl font-bold mb-4">Popular Classes</h2>
            <Swiper
                navigation={true}
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                className="mySwiper"
            >
                {courses.map((course) => (
                    <SwiperSlide key={course.id} className="p-4 bg-white rounded shadow-md">
                        <div className="course-card">
                            <img
                                src={course.image}
                                alt={course.title}
                                className="w-full h-40 object-cover rounded-md mb-4"
                            />
                            <h3 className="text-lg font-semibold text-neutral-900 mb-2">{course.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">{course.short_description}</p>
                            <p className="text-sm font-bold text-indigo-600">Enrollments: {course.enroll}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HighlightClasses;
