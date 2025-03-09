const express = require('express');
const pool = require('./db/db');

const app = express();
const PORT = 5002;

// Middleware to parse JSON
app.use(express.json());

// Importing Routes
app.use('/api/account', require('./routers/accountRoutes'));
app.use('/api/product', require('./routers/productRoutes'));
app.use('/api/discountCode', require('./routers/discountCodeRoutes'));
app.use('/api/comment', require('./routers/commentRoutes'));
app.use('/api/accountOrder', require('./routers/accountOrderRoutes'));

// Non-exist pages handler
app.get('*', (req, res) => {
    res.status(404).json({'404': 'Page Not Found'});
});  
  
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
  
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});