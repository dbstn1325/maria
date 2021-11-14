export const getSearch = (req, res) => { 
    return res.render("search");
}

export const postSearch = (req, res) => { 
    return res.redirect("/");
}

export const getLogin = (req, res) => {
    return res.render("login");
}

export const postLogin = (req, res) => {
    return res.redirect("login");
}