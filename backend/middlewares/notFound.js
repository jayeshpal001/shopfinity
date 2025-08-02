const notFound = (req, res, next)=>{
   res.status(404).json({
    message: `Route not found`, 
    path: req.originalUrl, 
    method: req.method
   }); 
}; 

module.exports = notFound; 