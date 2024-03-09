function authMdw(req,res,next){

    if(req.session?.user) {
        return next()
    }
}

module.exports =authMdw