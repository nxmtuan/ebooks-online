const dragToScrollEvent = (rowRef) => {
    const row = rowRef.current;
    if (!row) return;

    let isDragging = false;
    let startX, startY;
    let scrollLeft;
    let isHorizontalScroll = false;

    const handleStart = (e) => {
        isDragging = true;
        const touch = e.touches ? e.touches[0] : e;
        startX = touch.pageX - row.offsetLeft;
        startY = touch.pageY; // Lấy tọa độ Y để phát hiện cuộn dọc
        scrollLeft = row.scrollLeft;
        isHorizontalScroll = false; // Reset trạng thái cuộn ngang
    };

    const handleMove = (e) => {
        if (!isDragging) return;

        const touch = e.touches ? e.touches[0] : e;
        const deltaX = touch.pageX - row.offsetLeft - startX;
        const deltaY = touch.pageY - startY;

        // Phát hiện cuộn ngang nếu người dùng kéo ngang đáng kể
        if (!isHorizontalScroll && Math.abs(deltaX) > Math.abs(deltaY)) {
            isHorizontalScroll = true; // Xác nhận là cuộn ngang
        }

        // Chỉ ngăn chặn hành vi mặc định khi cuộn ngang
        if (isHorizontalScroll) {
            e.preventDefault();
            row.scrollLeft = scrollLeft - deltaX; // Cuộn ngang
        }
    };

    const handleEnd = () => {
        isDragging = false;
    };

    // Thêm sự kiện chuột
    row.addEventListener('mousedown', handleStart);
    row.addEventListener('mousemove', handleMove);
    row.addEventListener('mouseup', handleEnd);
    row.addEventListener('mouseleave', handleEnd);

    // Thêm sự kiện cảm ứng
    row.addEventListener('touchstart', handleStart, { passive: false });
    row.addEventListener('touchmove', handleMove, { passive: false });
    row.addEventListener('touchend', handleEnd);

    // Dọn dẹp sự kiện
    return () => {
        row.removeEventListener('mousedown', handleStart);
        row.removeEventListener('mousemove', handleMove);
        row.removeEventListener('mouseup', handleEnd);
        row.removeEventListener('mouseleave', handleEnd);

        row.removeEventListener('touchstart', handleStart);
        row.removeEventListener('touchmove', handleMove);
        row.removeEventListener('touchend', handleEnd);
    };
};

export default dragToScrollEvent;
