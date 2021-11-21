import db from "../db/config";
import connect from "../db/patient";
import bcrypt from "bcrypt";



export const getHome = (req, res) => {
    const sql = "SELECT * FROM patients";
    connect.query(sql, (err, rows) => {
        if(err){
            return res.json("Error");
        }
        return res.render("home", { pageTitle: "home", rows: rows });
    })
    
}
export const postHome = (req, res) => {
    const { 
        searchData,
    } = req.body;
    const sql = "SELECT * FROM patients WHERE NAME=?";
    connect.query(sql, searchData, (err, rows) => {
        if(err) {
            return res.redirect("/");
        }
        const results = Object.values(JSON.parse(JSON.stringify(rows)));
        results.forEach( (v) =>{
            // const sql = 'INSERT INTO users(`id`,`pw`,`name`) VALUES (?,?,?)'
            // db.query()
            return res.render("home", {items: v});
        }
        )}
    );
    
    const sql2 = ""
    
}

export const getJoin = (req, res) => {
    return res.render("join", { pageTitle: "join" });
}

export const postJoin = (req, res, next) => {
    const { 
        userid,
        password1,
        password2,
        username
    } = req.body;
    
    if( password1 !== password2 ){
        return res.status(400).render("join", {
            errorMessage: "Password is not correct"
        })
    }

    bcrypt.hash(password1, 5, function(err, hash) {
        const sql = 'INSERT INTO users(`id`,`pw`,`name`) VALUES (?,?,?)'
        const param = [ userid, hash, username ];
        //아이디 중복체크
        //const exists = db.query(`SELECT EXISTS(SELECT * FROM users where id="${userid})"`);
        db.query(sql, param, (err,rows)=> {
            if(err){
                return res.status(400).render("join", {
                    errorMessage: "이미 존재하는 아이디 입니다. 다시 입력해주세요"
                })
            }
            else{
                return res.send("회원가입이 완료되었습니다.");
            }
        });
        
        // Store hash in your password DB.

})
}

export const getLogin = (req, res) => {
    return res.render("login");
}

export const postLogin = async(req, res) => {
    const { userid, password1 } = req.body;
    const sql = `SELECT id FROM users WHERE id= "${userid}" `;
    

    
    //비밀번호 확인
    db.query(`SELECT * FROM users WHERE id = ? `, userid, (err, result, fields) => {
        if(err) { 
            return res.status(400).render("login", {
            errorMessage: "존재하지 않는 아이디 입니다."
        });
        }
        else{
            if( result.length > 0 ){
                bcrypt.compare(password1, result[0].pw, (err,result) => {
                    if(err){
                        return res.status(400).render("login", {
                            errorMessage: "비밀번호를 다시 입력해주세요"
                        });
                    }
                    if(result===false){
                        return res.status(400).render("login", {
                            errorMessage: "비밀번호를 다시 입력해주세요"
                        });
                    }
                    //아이디 확인
                    db.query(sql, function (err, rows, result) {
                        if (err) {
                            return res.send("해당 아이디는 존재하지 않습니다.");
                        }else{
                            //아이디확인
                            const result = Object.values(JSON.parse(JSON.stringify(rows)));
                            result.forEach( (v) =>{
                                const { 
                                    id: user,
                                } = v;
                                req.session.user = user;
                                req.session.loggedIn = true;
                                return res.redirect("/");
                                
                            });
                            // console.log(rows); //row는 배열.
                            // console.log('fields', fields); //fields는 컬럼.
                        }
                    });
                });
            }
            else{
                return res.status(400).render("login", {
                    errorMessage: "존재하지 않는 아이디 입니다."
                });
            }
        }
    })
    
            
    

    
    
  

}

export const see = async(req, res) => {
    const { id } = req.params;
    try{
        const rows = await mdbConn.getUserList();
        const { 
            user_id: id,
        } = rows;

        return res.status(200).json(id);
    }catch(err){
        return res.status(400).send(err.message);
    }
}

export const logout = (req,res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(error);
            return res.status(500).send("<h1>500 error</h1>");
        }
        res.redirect("/"); });
 }

 export const getEdit = (req, res) => {
    const {
        userid,
        username
    } = req.body;
    console.log(req.session);
    return res.render("editUser");
 }
 
 export const postEdit = (req, res) => {
     const { 
         userid,
     } = req.body;
     
     db.query(`SELECT * FROM users WHERE id = ? `, userid, (err, result, fields) => {
         if(err){
            console.log(hi);
        }
        
        else{
            const sql = `UPDATE users SET id=? WHERE id=?`;
            db.query(sql, [userid, userid], (err, result) => {
                console.log(result);
            })
            return res.redirect("/");
         }
     
           })
    }
    
     
 