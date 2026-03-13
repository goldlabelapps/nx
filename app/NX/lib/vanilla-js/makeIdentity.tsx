export const makeIdentity = () => {
    const choices = [
        'Biker',
        'Chix',
        'Dapper',
        'Hippy',
        'Hipster',
        'Mumma',
        'Punk',
        'Rasta',
        'Rocker',
    ]
    const choice = Math.floor(Math.random() * choices.length);
    return {
        name: choices[choice],
        avatar: `/shared/svg/characters/${choices[choice].toLowerCase()}.svg`
    };
};
