module.exports = () => {
    const random = Math.random().toString(20).substring(2);
    const date = Date.now().toString(20);

    return random + date
}