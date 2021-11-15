import db from "../db/config";
import bcrypt from "bcrypt";


export const handleHome = (req, res) => {
    return res.render("home", { pageTitle: "home" });
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
    }else{
        bcrypt.hash(password1, 5, function(err, hash) {
            const sql = 'INSERT INTO users(`id`,`pw`,`name`) VALUES (?,?,?)'
            const param = [ userid, hash, username ];
            //const exists = db.query(`SELECT EXISTS(SELECT * FROM users where id="${userid})"`);
            db.query(sql, param, (err,rows)=> {
                if(err){
                    return res.status(400).render("join", {
                        errorMessage: "이미 존재하는 아이디 입니다. 다시 입력해주세요"
                    })
                }
                else{
                    res.send("회원가입이 완료되었습니다.");
                    console.log(hash);
                }
            });
            
            // Store hash in your password DB.

    })}
}

export const getLogin = (req, res) => {
    return res.render("login");
}

export const postLogin = async(req, res) => {
    const { userid, password1 } = req.body;
    

    
    //비밀번호 확인
    const password = bcrypt.hash(password1, 5, function(err, hash) {
        const sql2 =`SELECT pw FROM users WHERE pw="${hash}"`;
        db.query(sql2, function(err, rows, result) {
            if(err){
                return res.send("비밀번호가 틀렸습니다.");
            }
        }
        )
        console.log(hash);
    })
    
            
    const sql = `SELECT id FROM users WHERE id="${userid}"`;

    db.query(sql, function (err, rows, result) {
        if (err) {
            res.send("해당 아이디는 존재하지 않습니다.");
        }else{
            //아이디확인
            const result = Object.values(JSON.parse(JSON.stringify(rows)));
            result.forEach( (v) =>{
                const { id:user } = v;
                
                req.session.loggedIn = true;
                req.session.user = user;
                
                return res.redirect("/");
            });
            // console.log(rows); //row는 배열.
            // console.log('fields', fields); //fields는 컬럼.
        }
    
    });
  

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
        res.status(400).send(err.message);
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
