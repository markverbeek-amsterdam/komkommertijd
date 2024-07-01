"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Komkommertijd() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleImageClick = () => {
      setIsVisible(true);
    };

    const image = document.getElementById("mainImage");
    if (image) {
      image.addEventListener("click", handleImageClick);
    }

    return () => {
      if (image) {
        image.removeEventListener("click", handleImageClick);
      }
    };
  }, []);

  // Effect to flip the card after 2 seconds
  useEffect(() => {
    let flipTimeout: string | number | NodeJS.Timeout | undefined;
    if (isVisible) {
      flipTimeout = setTimeout(() => {
        setIsFlipped(true);
      }, 3000); // 2000 milliseconds = 2 seconds
    }

    return () => clearTimeout(flipTimeout);
  }, [isVisible]);

  useEffect(() => {
    let appearTimeout: string | number | NodeJS.Timeout | undefined;
    if (!isVisible) {
      appearTimeout = setTimeout(() => {
        setIsVisible(true);
      }, 3000); // 2000 milliseconds = 2 seconds
    }

    return () => clearTimeout(appearTimeout);
  }, []);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNav = () => {
    router.push("hpm.nl/team");
  };

  return (
    <main>
      <div className="bg-[white] min-h-screen">
        <div id="mainImage" className="absolute z-[1000] w-full h-full">
          <Image
            className="cursor-custom-image lg:relative object-cover"
            src="/CowField.jpg"
            alt="wei met koeien"
            fill
            priority
          />
          <Image
            className="cursor-custom-image relative lg:hidden  object-cover object-[calc(50%+45px)] xs:object-center "
            src="/CowVert11.png"
            alt="wei met koeien"
            fill
            priority
          />
        </div>

        <div className="relative w-screen px-0">
          <div className="relative opacity-80 bg-[white] z-11"></div>
        </div>

        <AnimatePresence>
          {isVisible && (
            <motion.div
              id="animatedDiv"
              className="cursor-custom-image z-[1100] fixed inset-0 flex items-start lg:items-center top-28 lg:top-0 justify-center"
              initial={{ y: "100%", opacity: 1 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div
                id="cardDiv"
                className="-rotate-6 perspective w-[95vw] md:w-[76vw] lg:w-[65vw] aspect-[51/36]"
                // onClick={handleClick}
              >
                <motion.div
                  className={`relative w-full h-full  transition-transform duration-700 transform-style-preserve-3d ${
                    isFlipped ? "rotate-y-180" : ""
                  }`}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div
                    className="absolute w-full h-full backface-hidden  text-white flex items-center justify-center"
                    onClick={handleClick}
                  >
                    <Image
                      src="/voorkant.png"
                      alt="Your image"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div
                    className="absolute w-full h-full backface-hidden text-white flex items-center justify-center transform rotate-y-180"
                    onClick={handleClick}
                  >
                    <Image
                      src="/achterkant.png"
                      alt="Your image"
                      layout="fill"
                      objectFit="cover"
                    />
                    <a
                      className="text-black z-10 bg-[blue] absolute right-4 top-4 h-[25%] opacity-0 w-[30%]"
                      // onClick={handleNav}
                      href="https://www.hpm.nl/team"
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
