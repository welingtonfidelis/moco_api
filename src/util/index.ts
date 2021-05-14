import crypto from 'crypto';

export const randomHash = (maxLength = 8) => {
    const maxLengthHandled = Math.floor(maxLength/2);
    const random = crypto.randomBytes(maxLengthHandled).toString('hex');

    return random;
}

export const removeSpecialCharacters = (word: string) => {
    const wordHandled = word.replace(/[^\w\s]/gi, '');

    return wordHandled;
}

export const isEmptyObject = (obj: object) => {
    return Object.keys(obj).length === 0;
}