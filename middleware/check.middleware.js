const check = (givenRole) => {
    return (req, res, next) => {
        console.log(req.user.user[0].role)
        try {
            const role = req.user.user[0].role;
            if (givenRole.includes(role)) {
                next();
            } else {
                res.send('You are not authorized to perform this action');
            }
        } catch (error) {
            res.send(error.message);
        }
    }
}

module.exports = { check };