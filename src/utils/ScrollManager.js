import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollManager = ({ children }) => {
  const location = useLocation();
  const scrollPositions = useRef({});

  useEffect(() => {
    // Lưu vị trí cuộn của trang hiện tại trước khi chuyển trang
    const handleScrollSave = () => {
      scrollPositions.current[location.pathname] = window.scrollY;
    };
    window.addEventListener("scroll", handleScrollSave);

    return () => {
      window.removeEventListener("scroll", handleScrollSave);
    };
  }, [location.pathname]);

  useEffect(() => {
    // Khi load lại trang hoặc quay lại, khôi phục vị trí cuộn
    const savedScroll = scrollPositions.current[location.pathname] || 0;
    window.scrollTo(0, savedScroll);
  }, [location.pathname]);

  return children;
};

export default ScrollManager;