import app from './app';
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
    console.log(`BookMark App ready on port ${PORT}!`),
)
export {
    app
}
