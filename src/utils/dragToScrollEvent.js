const dragToScrollEvent = (rowRef) => {
    const row = rowRef.current;
    if (!row) return;

    let isDragging = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
        isDragging = true;
        startX = e.pageX - row.offsetLeft;
        scrollLeft = row.scrollLeft;
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - row.offsetLeft;
        const walk = x - startX;
        row.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUpOrLeave = () => {
        isDragging = false;
    };

    row.addEventListener('mousedown', handleMouseDown);
    row.addEventListener('mousemove', handleMouseMove);
    row.addEventListener('mouseup', handleMouseUpOrLeave);
    row.addEventListener('mouseleave', handleMouseUpOrLeave);

    return () => {
        row.removeEventListener('mousedown', handleMouseDown);
        row.removeEventListener('mousemove', handleMouseMove);
        row.removeEventListener('mouseup', handleMouseUpOrLeave);
        row.removeEventListener('mouseleave', handleMouseUpOrLeave);
    };
};

export default dragToScrollEvent