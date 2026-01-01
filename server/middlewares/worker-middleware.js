const workerMiddleware=async(req,res,next)=>{

  try {
   console.log(req.user);

   const workerRole=req.user.isWorker;
   if(!workerRole){

      return res
      .status(403)
      .json({message :"Access denied.User is not an worker."});
   }
  //  res.status(200).json({msg:req.user.isAdmin});
  // If user is an admin,proceed to the next middleware
   next();
  } catch (error) {
    next(error);
  }
};

module.exports=workerMiddleware;