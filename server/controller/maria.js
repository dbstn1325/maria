export const getSearch = (req, res) => { 
    return res.render("search");
}

export const postSearch = (req, res) => { 
    return res.redirect("/");
}