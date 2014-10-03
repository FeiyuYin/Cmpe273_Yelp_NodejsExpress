
/*
 * GET home page.
 */

function index(req, res){
	
	res.render("index", {isAuthenticated: req.isAuthenticated(), user: req.user});
}

exports.index = index;