import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { selectBanners, selectBannerStatus } from "../../slice/BannerSlice"; // Corrected selector name
import type { AppDispatch } from "../../../../redux/store";
import { fetchBanners } from "../../action/BannerAction";
import type { BannerDetail } from "../../model/BannerModel";

const INTERVAL_TIME = 3000;

// Define a static list of Tailwind CSS colors to use
const BANNER_COLORS = ["bg-[#3b4ca5]", "bg-[#186a8e]"];

export const Banner = () => {
  const dispatch = useDispatch<AppDispatch>();
  const banners: BannerDetail[] = useSelector(selectBanners);
  const status = useSelector(selectBannerStatus);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [progress, setProgress] = useState(0);
  const directionRef = useRef(1);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const bannerVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    animate: {
      x: "0%",
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  useEffect(() => {
    // Only dispatch if status is 'idle'
    if (status === "idle") {
      dispatch(fetchBanners());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (banners.length === 0) return;

    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          const newIndex = (currentBanner + 1) % banners.length;
          directionRef.current = 1;
          setCurrentBanner(newIndex);
          return 0;
        }
        return prevProgress + 1;
      });
    }, INTERVAL_TIME / 100);

    return () => clearInterval(timer);
  }, [currentBanner, banners]);

  const handleDotClick = (index: number) => {
    if (index === currentBanner) return;
    directionRef.current = index > currentBanner ? 1 : -1;
    setCurrentBanner(index);
    setProgress(0);
  };

  const currentBannerData = banners[currentBanner];

  // Dynamically select a color based on the banner's index
  const currentColorClass = BANNER_COLORS[currentBanner % BANNER_COLORS.length];

  if (status === "loading" || status === "idle") {
    return <div className="p-4 text-center">Loading banners...</div>;
  }

  if (!banners || banners.length === 0) {
    return (
      <div
        className={`
               absolute top-0 left-0 w-full 
                 flex justify-center p-8 relative overflow-hidden rounded-lg shadow-lg h-45
               ${currentColorClass} 
             `}
      >
        <p className="text-xl font-medium text-white ">No banners available</p>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow-lg h-45">
      <AnimatePresence initial={false} custom={directionRef.current}>
        <motion.div
          key={currentBannerData.id}
          className={`
            absolute top-0 left-0 w-full h-full 
              flex justify-between p-8
            ${currentColorClass} 
          `}
          custom={directionRef.current}
          variants={bannerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.8,
          }}
        >
          <div className="content-center">
            <p className="text-xl font-medium text-white ">
              {currentBannerData.title}
            </p>
            <p className="text-sm font-medium text-white mt-2">
              {currentBannerData.description}
            </p>
          </div>

          <img
            src={`${baseUrl}${currentBannerData.image_url}`} 
            className="w-50 object-contain"
            alt="Working"
          />
        </motion.div>
      </AnimatePresence>

      {/* ... (Dots/pagination logic remains the same) ... */}
      <div className="absolute bottom-4 left-15 transform -translate-x-1/2 flex space-x-2">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`
              relative h-2 rounded-full cursor-pointer transition-all duration-300 
              ${index === currentBanner ? "w-7 bg-gray-400" : "w-2 bg-gray-400"}
            `}
            onClick={() => handleDotClick(index)}
          >
            {index === currentBanner && (
              <motion.div
                className="absolute top-0 left-0 h-full bg-white rounded-full"
                animate={{ width: `${progress}%` }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
