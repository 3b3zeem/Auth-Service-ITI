import 'dotenv/config';
import app from './src/app.controller.js';
const { PORT } = process.env;

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});