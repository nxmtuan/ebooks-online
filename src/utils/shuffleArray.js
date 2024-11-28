import { createRandomWithSeed } from '~/seed/seedRandom'

const shuffleArray = (array, seed) => {
    const random = createRandomWithSeed(seed)
    const newArray = [...array]
    return newArray.sort(() => random() - 0.5)
}

export default shuffleArray