const admin = require("firebase-admin");
const auth = admin.auth(); 

const chechAuth=(req,res,next)=>{
const idTokenCookie= req.cookies.token
if(!idTokenCookie){
   return res.redirect("/login")
   
}
auth.verifyIdToken(idTokenCookie)
.then((decodedToken)=>{
    req.user=decodedToken
next()
})
.catch((error)=>{
    console.log(`error al verificar el toen de las cookies ${error}`)
})
}


module.exports=chechAuth