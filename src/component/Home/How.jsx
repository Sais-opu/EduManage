import { easeOut } from "motion";
import { motion } from "motion/react";
import help1 from '../../assets/how/1664129399748.jpg'
import help2 from '../../assets/how/Education-1280x720-1.jpg'


const How = () => {
    return (
        <div>
            <div className="hero bg-base-200 mb-10">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <motion.img
                        src={help2}
                        animate={{y:[0,80,0]}}
                        transition={{duration:5, repeat:Infinity}}
                        className="max-w-sm w-64 rounded-t-[40px] border-l-4 border-b-4 border-purple-400  rounded-br-[4px] shadow-2xl" />
                    <motion.img
                        src={help1}
                        animate={{x:[0,80,0]}}
                        transition={{duration:5, repeat:Infinity}}
                        className="max-w-sm w-64 rounded-t-[40px] border-l-4 border-b-4 border-purple-400  rounded-br-[4px] shadow-2xl" />
                    <div>
                        <h1 className="text-5xl font-bold">The Transformative Power of Education: </h1>
                        <motion.h1 className="text-5xl font-bold"
                            animate={{ x: 50, color: ['red'] }}
                            transition={{ duration: 2, delay: 1, ease: easeOut, repeat: Infinity }}
                        >Shaping Futures and Societies</motion.h1>
                        <p className="py-6">
                        Education is the cornerstone of personal growth and societal progress. It empowers individuals with knowledge, skills, and critical thinking, enabling them to break free from cycles of poverty and inequality. Beyond personal success, education fosters innovation, strengthens economies, and promotes social cohesion by nurturing informed and responsible citizens. By bridging gaps and unlocking potential, education creates opportunities, transforms lives, and paves the way for a brighter, more equitable future.</p>
                        <button className="btn bg-purple-600 text-white ">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default How;
