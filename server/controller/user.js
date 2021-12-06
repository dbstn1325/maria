import db from "../db/user";
import connect from "../db/patient";
import bcrypt from "bcrypt";



export const getHome = (req, res) => {
    const sql = "SELECT * FROM patients";
    connect.query(sql, (err, rows) => {
        if(err){
            return res.status(400).render("404", { errorMessage: "getHome DB select Error"});
        }
        return res.status(200).render("home", { pageTitle: "home", rows: rows });
    })
    
}
export const postHome = (req, res) => {
    const { 
        searchData,
        enrollData,
    } = req.body;
    console.log(enrollData);
    const sql = "SELECT * FROM patients WHERE NAME=?";
    connect.query(sql, searchData, (err, rows) => {
        if(err) {
            return res.status(400).render("404", { errorMessage: "postHome DB select Error"});
        }
        const results = Object.values(JSON.parse(JSON.stringify(rows)));
        results.forEach( (v) =>{
            // const sql = 'INSERT INTO users(`id`,`pw`,`name`) VALUES (?,?,?)'
            // db.query()
            console.log(v);
            return res.status(200).render("home", {items: v});
        }
        )}
    );
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
                return res.status(201).send("회원가입이 완료되었습니다.");
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
                        return res.status(404).render("login", {
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
                            return res.status(400).send("해당 아이디는 존재하지 않습니다.");
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
            return res.status(400).render("404", { errorMessage: "logout Error"});
        }
        res.redirect("/"); });
 }
 
 export const getEnrollPatient = (req, res) => {
    return res.render("enrollPatient")
 }

 export const postEnrollPatient = (req, res) => {
    const {
        patientName,
        disease
    } = req.body;
    const today = new Date();
    
    connect.query("ALTER TABLE patients AUTO_INCREMENT=1;", (err, result, fields) => {
        const sql = 'INSERT INTO patients(`NAME`,`DISEASE`, `CREATED_AT`, `UPDATED_AT`) VALUES (?,?,?,?)'
        connect.query(sql, [patientName, disease, today, today], (error, result) => {
            if(error){
                return res.status(400).render("404", { errorMessage: "postEnroll DB insert Error"});
            }
            return res.redirect("/");
        })
    });
 }

 export const getEditPatient = (req, res) => {
    const { id } = req.params;
    console.log(id);
    const sql = `SELECT * FROM patients WHERE ID=${id}`;
    connect.query(sql, (err, rows) => {
        if(err){
            return res.status(400).render("404", { errorMessage: "getEdit DB select Error"});
        }
        const results = Object.values(JSON.parse(JSON.stringify(rows)));
        results.forEach( (v) =>{
            return res.render("editPatient", {items: v});
    })
    
 })
}

 export const postEditPatient = (req, res) => {
    const {
        patientName,
        disease
    } = req.body;
    const { id } = req.params;
    console.log(disease);
    
    const sql = `SELECT * FROM patients WHERE ID=${id}`;
    connect.query(sql, (err, rows) => {
        if(err){
            return res.status(400).render("404", { errorMessage: "postEdit DB select Error"});
        }
        const results = Object.values(JSON.parse(JSON.stringify(rows)));
        results.forEach( (v) =>{
            const sql2 = `UPDATE patients SET NAME=?, DISEASE=? WHERE ID=${id}`;
            connect.query(sql2, [patientName, disease], (err, result, fields) => {
                if(err){
                    return res.status(400).render("404", { errorMessage: "postEdit DB update Error"});
                }
                return res.status(201).redirect("/");
        })
    })
})
  

    
 }
 
 export const deletePatient = (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM patients WHERE ID=${id}`;
    connect.query(sql, (err, result, fields) => {
        if(err){
            return res.status(400).json(err);
        }
        return res.status(204).redirect("/");
    })
 }


 
    
     
 
