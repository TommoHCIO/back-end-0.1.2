export const errorHandler = (err, req, res, next) => {
  console.error(`Error ${err.status || 500}: ${err.message}`);
  console.error(err.stack);
  res.status(err.status || 500).json({ 
    error: process.env.NODE_ENV === 'production' ? 'Something went wrong!' : err.message
  });
};