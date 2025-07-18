

export const toTitleCase = (str: string) => {
    const spaceResult = str.toLowerCase().split(' ').map(function (word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
    const bracketResult = spaceResult.split('(').map(function (word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join('(');
    return bracketResult;
}