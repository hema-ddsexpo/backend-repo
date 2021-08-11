const bcrypt = require('bcrypt');

class Router {
    constructor(app, db) {
        this.login(app, db);
    }


    login(app, db) {

        app.post('/login', (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
        
           username=username.toLowerCase();
           if(username.length >12 || password.length >12){
               res.json({
                   success:false,
                   msg:'an error occured! please try again'
               })
               return;
           }

           let cols=[username];
           db.query('select * from userinfo WHERE username=? LIMIT 1',cols, (err,data,fields)=>{
               if(err){
                   res.json({
                       success:false,
                       msg:'an error occured'
                   });
                  return; 
               }
               if(data && data.length==1){
                   
                   let verified=password.localeCompare(data[0].password);
                     if(!verified){
                           req.session.userId=data[0].id;
                           res.json({
                               success:true,
                               msg:'valid user'

                           })
                           return;
                       }
                       else
                       {
                           res.json({
                               success:false,
                               msg:'invalid password'
                           })
                           return;
                       }
                   
               }
               else{
                   res.json({
                       success:false,
                       msg:'User not Found'
                   })
                   return;
               }
            });
               
           
        });
    }

}
module.exports = Router;
