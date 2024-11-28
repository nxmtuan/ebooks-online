const generateSeed = () => {
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}-${now.getHours()}`;
};

const createRandomWithSeed = (seed) => {
    let value = 0;
    for (let i = 0; i < seed.length; i++) {
        value += seed.charCodeAt(i);
    }

    return () => {
        value = (value * 9301 + 49297) % 233280;
        return value / 233280;
    };
};

export { generateSeed, createRandomWithSeed }