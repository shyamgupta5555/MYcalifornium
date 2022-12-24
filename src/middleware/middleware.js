

exports.middlewareHeaders = (req ,res, next)=>{

let HeaderData =  req.headers
if(!HeaderData.isfreeappuser)return res.send({status: false , message :" headers key is required"})
next()

}

