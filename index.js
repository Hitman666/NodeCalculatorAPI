const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/calculate', (req, res) => {
    const { x, y, op } = req.query;

    if (!x || !y || !op) {
        return res.status(400).json({ error: 'x, y, and op parameters are required' });
    }

    const numX = parseFloat(x);
    const numY = parseFloat(y);

    if (isNaN(numX) || isNaN(numY)) {
        return res.status(400).json({ error: 'x and y must be numbers' });
    }

    let result;

    switch (op) {
        case 'add':
            result = numX + numY;
            break;
        case 'subtract':
            result = numX - numY;
            break;
        case 'multiply':
            result = numX * numY;
            break;
        case 'divide':
            if (numY === 0) {
                return res.status(400).json({ error: 'Cannot divide by zero' });
            }
            result = numX / numY;
            break;
        default:
            return res.status(400).json({ error: 'Invalid operation' });
    }

    res.json({ result });
});

app.listen(port, () => {
    console.log(`Calculator API listening at http://localhost:${port}`);
});
