const swag = require('../controller/swag_controller');

module.exports = {
    add: (req, res, next) => {
        const { id } = req.query;
        let { cart } = req.session.user;
        //This line goes through the cart array to make sure the item is not in the cart/array already. findIndex returns
        // -1 if the item is not found in the array, hence the if argument of i === -1.
        const i = cart.findIndex(swag => swag.id == id);
        if (i === -1) {
            const currentSwag = swag.find(swag => swag.id == id)
            cart.push(currentSwag);
            req.session.user.total += currentSwag.price;
            res.status(200).send(req.session.user)
        } else {
            res.status(200).send(req.session.user)
        }
    },
    //obviously this is the opposite of add, so similarly it will function the same. The only difference is you will declare
    //the currentSwag first because it is already in the cart. Inside of the if statement you will need to determine where
    // the item is in the cart. This will also give you an index (i) which will make it easier to splice the item out.
    remove: (req, res, next) => {
        const { id } = req.query;
        const currentSwag = swag.find(swag => swag.id == id)
        if (currentSwag) {
            const i = cart.findIndex(swag => swag.id == id);
            cart.splice(i, 1);
            req.session.user.totle -= currentSwag.price;
            res.status(200).send(req.session.user)
        }
    },
    //you need to destructure the user to the session. This allows you to use user. Since you are setting that "state" 
    //of cart and total to 0, you can simply say so.
    checkout: (req, res, next) => {
        const { user } = req.session;
        user.cart = [];
        user.total = 0;
        res.status(200).send(req.session.user)
    }
}