import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
const port = process.env.PORT || 3001;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from the backend!');
});

app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});
