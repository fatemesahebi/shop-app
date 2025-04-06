import express from 'express';
import accountRoutes from './routers/accountRoutes';
import productRoutes from './routers/productRoutes';
import orderRoutes from './routers/accountOrderRoutes';
import commentRoutes from './routers/commentRoutes';
import discountCodeRoutes from './routers/discountCodeRoutes';

const app = express();

app.use(express.json());

app.use('/api/accounts', accountRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/discount-codes', discountCodeRoutes);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 