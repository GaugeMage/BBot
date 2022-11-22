exports.run = (niceText, returnValue) => e => {
    console.error(`!!! ERROR: ${niceText}`, e);
    return returnValue;
};