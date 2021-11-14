export const handleHome = (req, res) => {
    return res.render("home", { pageTitle: "home" });
}

export const getJoin = (req, res) => {
    return res.render("join", { pageTitle: "join" });
}

export const postJoin = (req, res) => {
    const { userid, email, username, password1, password2 } = req.body;
    const pageTitle = "join";
    
    if(password1 !== password2){
        return res.status(400).render("join", {
            pageTitle,
            errorMessage: "비밀번호가 틀렸습니다."
        })
    }

    try{
        return res.redirect("/login");
    }catch(error){
        return res.status(400).render("404", {
            pageTitle,
            errorMessage: "Error",
        })
    }
}

export const getLogin = (req, res) => {
    return res.render("login");
}

export const postLogin = (req, res) => {
    return res.redirect("login");
}

export const logout = (req, res) => {
    return res.redirect("/");
}

export const see = (req, res) => {
    const { id } = req.params;
    return res.status(200).json({id: id});
}