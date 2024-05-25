import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { storageUrl } from "../utils/baseUrl";


const  slideVariants = {
    hiddenRight: {
        x: "100%",
        opacity: 0,
    },

    hiddenLeft: {
        x: "-100%",
        opacity: 0,
    },

    visible: {
        x : "0",
        opacity: 1,
        transition: {
            duration: 1,
        },
    },

    exit: {
        opacity: 0,
        scale: 0.8,
        transition: {
            duration: 0,
        },
    },
}

const slidersVariants = {
    hover: {
      scale: 1.2,
      backgroundColor: "#ff0000",
    },
}; 


const dotsVariants = {
    initial: {
      y: 0,
    },
    animate: {
      y: -10,
      scale: 1.3,
      transition: { type: "spring", stiffness: 1000, damping: "5" },
    },
    hover: {
      scale: 1.3,
      transition: { duration: 0.2 },
    },
};


type ProductCarouselProps = {
    images: string[];
};


export default function ProductCarousel({images} : ProductCarouselProps) {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState<"right" | "left">("left");

    const handleNext = () => {
        setDirection("right");
        setCurrentIndex((prevIndex) =>
          prevIndex + 1 === images.length ? 0 : prevIndex + 1
        );
    };

    const handlePrevious = () => {
        setDirection("left");
        setCurrentIndex((prevIndex) =>
          prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleDotClick = (index: number) => {
        setDirection(index > currentIndex ? "right" : "left");
        setCurrentIndex(index);
    };

    return(
        
        <div 
            className="carousel-images"
            style={{
                position: "relative",
                borderRadius: "10px",
                height: "400px",
                maxWidth: "650px",
                width: "100%",
                margin: "auto",
                overflow: "hidden"
            }}
        
        >
            <AnimatePresence>
                <motion.img
                    key={currentIndex}
                    src={`${storageUrl}${images[currentIndex]}?alt=media`}
                    style={{
                        width: "99%",
                        height: "100%",
                        
                        borderRadius: "8px",
                        objectFit: "contain",
                        border: "1px solid #ff0000"
                    }}
                    variants={slideVariants}
                    initial={direction=="right" ? "hiddenRight" : "hiddenLeft"}
                    animate="visible"
                    exit="exit"
                />
            </AnimatePresence>
            

            <div className="slide_direction"
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <motion.div 
                    variants={slidersVariants}
                    whileHover={"hover"}
                    className="left"
                    onClick={handlePrevious}
                    style={{
                        backgroundColor: "#fb666675",
                        color:"#ffff",
                        padding: "15px",
                        borderRadius: "50%",
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        margin: "auto 10px",
                        height: "25px",
                        width: "25px",
                        left: 0,
                        cursor: "pointer"
                    }}
                >

                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 96 960 960"
                    width="20"
                    style={{
                        position: "absolute",
                        top: 4,
                        left: 9,
                    }}
                    >
                    <path d="M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z" />
                    </svg>
                </motion.div>
                <motion.div
                    variants={slidersVariants} 
                    whileHover={"hover"}
                    className="right" 
                    onClick={handleNext}
                    style={{
                        backgroundColor: "#fb666675",
                        color:"#ffff",
                        padding: "15px",
                        borderRadius: "50%",
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        margin: "auto 20px",
                        height: "25px",
                        width: "25px",
                        right: 0,
                        cursor: "pointer"
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"
                        viewBox="0 96 960 960"
                        width="20"
                        style={{
                            position: "absolute",
                            top: 5,
                            right: 4,
                        }}
                    >
                        <path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z" />
                    </svg>
                </motion.div>
            </div>
            <div className="carousel-indicator"
                style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                    position: "absolute",
                    bottom: 10,
                    left: "50%",
                    transform: "translateX(-50%)"
                }}
            >
                {images.map((_, index : number) => (
                    
                    <motion.div
                        key={index}
                        className="dot"
                        variants={dotsVariants}
                        whileHover={"hover"}
                        initial={"initial"}
                        animate={currentIndex === index ? "animate" : ""}
                        style={{
                            backgroundColor: currentIndex === index ? "#fa2020" : "#eee",
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            cursor: "pointer",
                        
                        }}
                        onClick={() => handleDotClick(index)}
                    ></motion.div>
                ))}

            </div>
        </div>
    );
}