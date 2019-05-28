var express = require('express');
var router = express.Router();
var passport = require('passport');
var usersModel = require('../models/usersModel');
var productsModel = require('../models/productsModel');
var cartsModel = require('../models/cartsModel');
var categoriesModel = require('../models/categoriesModel');
var cartProductModel = require('../models/cartProductModel');
var ordersModel = require('../models/ordersModel');


router.post('/register', async (req, res) => {

    let checkId = await usersModel.find({ userId: req.body.newUser.userId });
    let checkUsername = await usersModel.find({ username: req.body.newUser.username });

    if (req.body.step == "one") {

        if (checkId.length != 0) {

            res.json({ status: "error", msg: "ID already exists - Please login with your account!" });

        }
        else {

            if (checkUsername.length != 0) {

                res.json({ status: "error", msg: "Email already exists - Please login with your account!" });

            }
            else {

                res.json({ status: "ok" });

            }

        }

    }
    else {

        if (req.body.newUser.username && req.body.newUser.password && checkId.length == 0 && checkUsername.length == 0) {

            let objToSave = {
                firstName: req.body.newUser.firstName,
                lastName: req.body.newUser.lastName,
                username: req.body.newUser.username,
                userId: req.body.newUser.userId,
                city: req.body.newUser.city,
                street: req.body.newUser.street,
                role: "user"
            }

            usersModel.register(new usersModel(objToSave), req.body.newUser.password, async (err, users) => {

                if (err) {
                    res.json(err);
                }

                let user = await usersModel.find({ username: objToSave.username });

                req.session.user = user[0];

                res.json({ msg: "The registration was successful!" });

            });

        }

    }

});


router.post('/login', passport.authenticate('local', { failureRedirect: 'http://localhost:3000/api/login' }), async (req, res) => {

    let user = await usersModel.find({ username: req.body.username });

    let userCart = {
        isOpen: false,
        cartId: null,
        date: null,
        totalPrice: null,
        productsCart: null
    }

    let lastOrder = null;

    let userCarts = await cartsModel.find({ userId: user[0].userId });
    let cartOpen = userCarts.find(cart => cart.isOpen == true);

    if (cartOpen) {

        userCart.isOpen = cartOpen.isOpen;
        userCart.date = cartOpen.cartDate;
        userCart.cartId = cartOpen._id;

        let allProductsOfCart = await cartProductModel.find({ cartId: cartOpen._id });
        let allProduct = await productsModel.find();
        let sum = 0;

        let newAllProductsOfCart = allProductsOfCart.map(productCart => {

            sum += productCart.totalPrice;

            let currentProduct = allProduct.find(product => product._id == productCart.productId);

            return {
                productCartId: productCart._id,
                productId: productCart.productId,
                productName: currentProduct.productName,
                quantity: productCart.quantity,
                productTotalPrice: productCart.totalPrice,
                productImg: currentProduct.image,
                cartId: productCart.cartId,
                categoryId: currentProduct.categoryId
            }

        });

        userCart.totalPrice = sum;
        userCart.productsCart = newAllProductsOfCart;

    }

    let allUserOrders = await ordersModel.find({ userId: user[0].userId });

    if (allUserOrders.length != 0) {
        lastOrder = allUserOrders[allUserOrders.length - 1].orderDate;
    }

    req.session.user = user[0];

    res.json({
        status: "ok",
        user: req.session.user,
        lastOrder: lastOrder,
        userCart: userCart
    });

});


router.get('/login', async (req, res) => {

    if (req.session.user) {

        let userCart = {
            isOpen: false,
            cartId: null,
            date: null,
            totalPrice: null,
            productsCart: null
        }

        let lastOrder = null;

        let userCarts = await cartsModel.find({ userId: req.session.user.userId });
        let cartOpen = userCarts.find(cart => cart.isOpen == true);

        if (cartOpen) {

            userCart.isOpen = cartOpen.isOpen;
            userCart.date = cartOpen.cartDate;
            userCart.cartId = cartOpen._id;

            let allProductsOfCart = await cartProductModel.find({ cartId: cartOpen._id });
            let allProduct = await productsModel.find();
            let sum = 0;

            let newAllProductsOfCart = allProductsOfCart.map(productCart => {

                sum += productCart.totalPrice;

                let currentProduct = allProduct.find(product => product._id == productCart.productId);

                return {
                    productCartId: productCart._id,
                    productId: productCart.productId,
                    productName: currentProduct.productName,
                    quantity: productCart.quantity,
                    productTotalPrice: productCart.totalPrice,
                    productImg: currentProduct.image,
                    cartId: productCart.cartId,
                    categoryId: currentProduct.categoryId
                }

            });

            userCart.totalPrice = sum;
            userCart.productsCart = newAllProductsOfCart;

        }

        let allUserOrders = await ordersModel.find({ userId: req.session.user.userId });

        if (allUserOrders.length != 0) {
            lastOrder = allUserOrders[allUserOrders.length - 1].orderDate;
        }

        res.json({
            status: "ok",
            user: req.session.user,
            lastOrder: lastOrder,
            userCart: userCart
        });

    }
    else {

        res.json({ status: "error", msg: "Email address or password is incorrect!" });

    }

});


router.get('/logout', async (req, res) => {

    if (req.session.user.role == "user") {

        let userCarts = await cartsModel.find({ userId: req.session.user.userId });
        let cartOpen = userCarts.find(cart => cart.isOpen == true);

        if (cartOpen) {

            await cartsModel.findByIdAndUpdate(cartOpen._id, { isOpen: false });

        }

        req.session.user = null;

        res.json(req.session.user);

    }
    else {

        req.session.user = null;

        res.json(req.session.user);

    }

});


router.get('/total_products', async (req, res) => {

    let allProduct = await productsModel.find();

    let totalProduct = allProduct.length;

    res.json(totalProduct);

});


router.get('/total_orders', async (req, res) => {

    let allOrders = await ordersModel.find();

    let totalOrders = allOrders.length;

    res.json(totalOrders);

});


router.get('/empty_cart', async (req, res) => {

    if (req.session.user.role == "user") {

        let userCarts = await cartsModel.find({ userId: req.session.user.userId });
        let cartOpen = userCarts.find(cart => cart.isOpen == true);

        if (cartOpen) {

            await cartsModel.findByIdAndUpdate(cartOpen._id, { isOpen: false });

            res.json("cart closed!");

        }

    }

});


router.delete('/cartProduct/:id', async (req, res) => {

    if (req.session.user.role == "user") {

        let userCarts = await cartsModel.find({ userId: req.session.user.userId });
        let cartOpen = userCarts.find(cart => cart.isOpen == true);
        let allProductsOfCart = await cartProductModel.find({ cartId: cartOpen._id });
        let currentProductCartToRemove = allProductsOfCart.find(productCart => productCart._id == req.params.id);

        if (currentProductCartToRemove) {

            await cartProductModel.findByIdAndDelete(req.params.id);

            if (allProductsOfCart.length == 1) {

                await cartsModel.findByIdAndUpdate(cartOpen._id, { isOpen: false });

            }

            res.json("product removed!");

        }

    }

});


router.get('/categories', async (req, res) => {

    let allCategories = await categoriesModel.find();

    res.json(allCategories);

});


router.post('/products_of_category/:categoryId', async (req, res) => {

    if (req.session.user) {

        let allProducts = await productsModel.find({ categoryId: req.params.categoryId });

        let allCategories = await categoriesModel.find();

        let newAllProducts = allProducts.map(product => {

            currentCategory = allCategories.find(category => category._id == product.categoryId);

            return {
                _id: product._id,
                productName: product.productName,
                categoryId: currentCategory._id,
                categoryName: currentCategory.categoryName,
                price: product.price,
                image: product.image
            }

        });

        res.json(newAllProducts);

    }

});


router.post('/cart_product', async (req, res) => {

    if (req.session.user.role == "user" && req.body.quantity > 0 && req.body.quantity % 1 == 0) {

        let currentProduct = await productsModel.findById(req.body.productId);

        let totalPrice = currentProduct.price * req.body.quantity;

        let userCarts = await cartsModel.find({ userId: req.session.user.userId });
        let cartOpen = userCarts.find(cart => cart.isOpen == true);

        if (cartOpen) {

            let allProductsOfCart = await cartProductModel.find({ cartId: cartOpen._id });
            let isProductExsit = allProductsOfCart.find(productCart => productCart.productId == req.body.productId);

            if (isProductExsit) {

                await cartProductModel.findByIdAndUpdate(isProductExsit._id, { quantity: req.body.quantity, totalPrice: totalPrice });

                res.json("quantity update!");

            }
            else {

                let newProductCartObj = {
                    productId: req.body.productId,
                    quantity: req.body.quantity,
                    totalPrice: totalPrice,
                    cartId: cartOpen._id
                }

                let newProductCart = new cartProductModel(newProductCartObj);

                await newProductCart.save();

                res.json("product add to open cart!");

            }

        }
        else {

            let date = new Date().toLocaleDateString();

            let dateArry = date.split("-");

            let dateToSet = `${dateArry[2]}/${dateArry[1]}/${dateArry[0]}`;

            let cartObj = {
                userId: req.session.user.userId,
                cartDate: dateToSet,
                isOpen: true
            }

            let newCart = new cartsModel(cartObj);

            let newCartCreate = await newCart.save();

            let newProductCartObj = {
                productId: req.body.productId,
                quantity: req.body.quantity,
                totalPrice: totalPrice,
                cartId: newCartCreate._id
            }

            let newProductCart = new cartProductModel(newProductCartObj);

            await newProductCart.save();

            res.json("product add to new cart!");

        }

    }

});


router.post('/products/:productName', async (req, res) => {

    if (req.session.user) {

        let valueToSearch1 = req.params.productName.toLowerCase();
        let valueToSearch2 = req.params.productName.replace(req.params.productName.charAt(0), req.params.productName.charAt(0).toUpperCase());

        let allProducts = await productsModel.find();
        let productsResult = allProducts.filter(product => product.productName.includes(valueToSearch1) == true || product.productName.includes(valueToSearch2) == true);
        let allCategories = await categoriesModel.find();

        let newProduct = productsResult.map(product => {

            currentCategory = allCategories.find(category => category._id == product.categoryId);

            return {
                _id: product._id,
                productName: product.productName,
                categoryId: currentCategory._id,
                categoryName: currentCategory.categoryName,
                price: product.price,
                image: product.image
            }

        });

        res.json(newProduct);

    }

});


router.post('/check_delivery_date', async (req, res) => {

    let dateArry = req.body.deliveryDate.split("-");

    let fixDate = `${dateArry[2]}/${dateArry[1]}/${dateArry[0]}`;

    let checkDateOrder = await ordersModel.find({ deliveryDate: fixDate });

    if (checkDateOrder.length >= 3) {

        res.json({ deliveryDate: false });

    }
    else {

        res.json({ deliveryDate: true });

    }

});


router.post('/orders', async (req, res) => {

    if (req.session.user.role == "user") {

        let userCarts = await cartsModel.find({ userId: req.session.user.userId });
        let cartOpen = userCarts.find(cart => cart.isOpen == true);

        if (cartOpen) {

            let allProductsOfCart = await cartProductModel.find({ cartId: cartOpen._id });
            let sum = 0;

            for (let i = 0; i < allProductsOfCart.length; i++) {

                sum += allProductsOfCart[i].totalPrice;

            }

            let deliveryDateArry = req.body.deliveryDate.split("-");
            let fixDeliveryDate = `${deliveryDateArry[2]}/${deliveryDateArry[1]}/${deliveryDateArry[0]}`;

            let date = new Date().toLocaleDateString();
            let dateArry = date.split("-");
            let dateToSet = `${dateArry[2]}/${dateArry[1]}/${dateArry[0]}`;

            let newOrderObj = {
                userId: req.session.user.userId,
                cartId: cartOpen._id,
                totalPrice: sum.toFixed(2),
                city: req.body.city,
                street: req.body.street,
                deliveryDate: fixDeliveryDate,
                orderDate: dateToSet,
                creditCard: req.body.creditCard
            }

            let newOrder = new ordersModel(newOrderObj);

            let orderSave = await newOrder.save();
            await cartsModel.findByIdAndUpdate(cartOpen._id, { isOpen: false });

            res.json({
                status: "received",
                orderId: orderSave._id
            });

        }

    }

});


router.put('/products', async (req, res) => {

    if (req.session.user.role == "admin") {

        await productsModel.findByIdAndUpdate(req.body._id, req.body.newProduct);

        res.json({ msg: "Product successfully updated!" });

    }

});


router.post('/products', async (req, res) => {

    if (req.session.user.role == "admin") {

        let newProduct = new productsModel(req.body);

        await newProduct.save();

        res.json({ msg: "Product has been successfully added!" });

    }

});


// router.get('/create_categories', async (req, res) => {

//     let x1 = new categoriesModel({ categoryName: "Milk & Eggs" });
//     let x2 = new categoriesModel({ categoryName: "Fruits & Vegetables" });
//     let x3 = new categoriesModel({ categoryName: "Meat & Fish" });
//     let x4 = new categoriesModel({ categoryName: "Wine & Drinks" });


//     await x1.save();
//     await x2.save();
//     await x3.save();
//     await x4.save();

//     res.json("categories created!")

// });



module.exports = router;
