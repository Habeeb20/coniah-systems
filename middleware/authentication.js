const isLoggedin = (async(req, res) => {

    try {
        let user_id;
        let is_admin;
        if (!req.session.user_id && req.session.is_admin == 1) {
            res.redirect('/login')

           } else {
            res.render("welcome")

           }
        
        
    } catch (error) {
        console.log(error)
        
    }
});


const isloggedout = (async(req, res, next )=>{
 
    try {
        let user_id;
        let is_admin;
        if(req.session.user_id && req.session.is_admin == 1){
        res.redirect('/profile')
        }
        next();
        
        
    } catch (error) {
        console.log(error)
        
    }
});


module.exports= {
    isLoggedin,
    isloggedout
}