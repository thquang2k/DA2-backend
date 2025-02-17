const Cart = require('../models/cartModel')
const CartDetail = require('../models/cartDetailModel')
const Laptop = require('../models/laptopModel')
const LaptopVariant = require('../models/laptopVariantModel')
const Cellphone = require('../models/cellphoneModel')
const CellphoneVariant = require('../models/cellphoneVariantModel')


const getCurrentUserCart = async (req, res, next) => {
    try {
        let user = req.user
        if(!user){
            return res.status(401).json({
                success: false,
                message: "Not login"
            })
        }
        let cart = await Cart.findOne({user_id: user.userId})
        if(!cart){
            return res.status(400).json({
                success: false,
                message: `Cannot find cart with user ID ${user.userId}`
            })
        }

        let cartDetail
        if(cart){
            cartDetail = await CartDetail.find({cart_id: cart.cart_id})
        }
        return res.status(200).json({
            success: true,
            message: "Get cart succeeded",
            cart: cart,
            detail: cartDetail
        })
    } catch (error) {
        return res.status(500).json({
            Error: `Error ${error.message}`
        })
    }
}

const removeFromCartByVariantId = async (req, res, next) => {
    try {
        let user = req.user
        if(!user){
            return res.status(401).json({
                success: false,
                message: "Not login"
            })
        }
        let cart = await Cart.findOne({user_id: user.userId})
        if(!cart){
            return res.status(200).json({
                success: false,
                message: `Cannot find cart with user ID ${user.userId}`
            })
        }
        let variantId = req.params.variantId
        let cartDetail = await CartDetail.findOne({cart_id: cart.cart_id, variant_id: variantId})
        if(!cartDetail){
            return res.status(200).json({
                success: false,
                message: `Variant with ID ${variantId} is not in cart`
            })
        }
        cart.total_item -= cartDetail.quantity
        cart.total_price -= cartDetail.subtotal
        await cart.save()
        await CartDetail.findOneAndDelete({cart_id: cart.cart_id, variant_id: variantId})
        return res.status(200).json({
            success: true,
            message: `Removed variant with ID ${variantId} from cart`
        })
    } catch (error) {
        return res.status(500).json({
            Error: `Error ${error.message}`
        })
    }
}

const createCart = async (req, res, next) => {
    try {
        let userId = req.body.userId
        if(!userId){
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            })
        }else{
            let cart = new Cart({
                cart_id: "temp",
                user_id: userId
            })
            cart.cart_id = cart._id.toString()
            cart.cart_id.replace('new ObjectId(', '')
            cart.cart_id.replace(')', '')

            let save = await cart.save()
            if(!save){
                return res.status(400).json({
                    success: false,
                    message: "Cannot save cart"
                })
            }else{
                return res.status(200).json({
                    success: true,
                    message: "created cart",
                    cart: cart
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            Error: `Error ${error.message}`
        })
    }
}
const addToCart = async (req, res, next) => {
    try {
        let user = req.user
        if(!user){
            return res.status(400).json({
                success: false,
                message: "Not login"
            })
        }
        let cart = await Cart.findOne({user_id: user.userId})
        if(!cart){
            return res.status(400).json({
                success: false,
                message: `Cannot find cart with user ID ${user.userId}`
            })
        }

        let variantId = req.params.variantId
        if(!variantId){
            return res.status(400).json({
                success: false,
                message: "variant ID is required",
            })
        }else{
            let quantity = req.body.quantity
            if(quantity == 0 || quantity % 1 !== 0){
                return res.status(400).json({
                    success: false,
                    message: `Quantity cannot equal 0 or is a float`
                })
            } 

            let detail = await CartDetail.findOne({cart_id: cart.cart_id, variant_id: variantId})
            if(detail){
                detail.quantity += quantity
                detail.subtotal = detail.variant_price * detail.quantity

                let save = await detail.save()
                if(!save){
                    return res.status(400).json({
                        success: false,
                        message: `Cannot add to cart`
                    })
                }else{
                    detail = await CartDetail.find({cart_id: cart.cart_id})
                    cart.total_item = 0
                    cart.total_price = 0
                    for (let i = 0; i < detail.length; i++) {
                        cart.total_item += detail[i].quantity
                        cart.total_price += detail[i].subtotal
                    }
                    await cart.save()
                    return res.status(200).json({
                        success: true,
                        message: "Add to cart succeeded",
                        cart: cart,
                        detail: detail
                    })
                }
            }else{
                let variant = await LaptopVariant.findOne({variant_id: variantId})
                let product
                if(!variant){
                    variant = await CellphoneVariant.findOne({variant_id: variantId})
                    if(!variant){
                        return res.status(400).json({
                            success: false,
                            message: `Cannot find variant with ID ${variantId}`
                        })
                    }
                    product = await Cellphone.findOne({product_id: variant.product_id})
                }else{
                    product = await Laptop.findOne({product_id: variant.product_id})
                }
                if(quantity > variant.stock){
                    return res.status(400).json({
                        success: false,
                        message: `Quantity is greater than stock. Stock current: ${variant.stock}`
                    })
                }
    
                let subtotal = quantity * variant.price
                let cartDetail = new CartDetail({
                    cart_id: cart.cart_id,
                    variant_id: variant.variant_id,
                    product_img: product.feature_img_src,
                    product_name: product.product_name,
                    variant_name: variant.variant_name,
                    variant_price: variant.price,
                    promotion_id: variant.promotion_id,
                    quantity: quantity,
                    subtotal: subtotal
                })
    
                let save = await cartDetail.save()
                if(!save){
                    return res.status(400).json({
                        success: false,
                        message: `Cannot add to cart`
                    })
                }else{
                    let detail = await CartDetail.find({cart_id: cart.cart_id})
                    cart.total_item = 0
                    cart.total_price = 0
                    for (let i = 0; i < detail.length; i++) {
                        cart.total_item += detail[i].quantity
                            cart.total_price += detail[i].subtotal
                    }
                    await cart.save()
                    return res.status(200).json({
                        success: true,
                        message: "Add to cart succeeded",
                        cart: cart,
                        detail: cartDetail
                    })
                }

            }
        }
    } catch (error) {
        return res.status(500).json({
            Error: `Error ${error.message}`
        })
    }
}

const removeCart = async (req, res, next) => {
    try {
        let userId = req.body.userId
        if(!userId){
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            })
        }else{
            let cart = await Cart.findOne({user_id: userId})
            if(!cart){
                return res.status(400).json({
                    success: false,
                    message: `Cannot find cart with user ID ${userId}`
                })
            }else{
                let cartDetail = await CartDetail.findOneAndDelete({cart_id: cart.cart_id})
                if(cartDetail){
                    let deleted = await Cart.findOneAndDelete({user_id: userId})
                    if(deleted){
                        return res.status(200).json({
                            success: true,
                            message: "deleted cart",
                        })
                    }else{
                        return res.status(400).json({
                            success: false,
                            message: "Cannot delete cart"
                        })
                    }
                }else{
                    return res.status(400).json({
                        success: false,
                        message: "Cannot delete cart detail"
                    })
                }
            }
            
        }
    } catch (error) {
        return res.status(500).json({
            Error: `Error ${error.message}`
        })
    }
}
const clearCart = async (req, res, next) => {
    try {
        let userId = req.params.userId
        let cart = await Cart.findOne({user_id: userId})
        if(!cart){
            return res.status(400).json({
                success: false,
                message: "user ID is not exist"
            })
        }
        cart.total_item = 0
        cart.total_price = 0
        await CartDetail.deleteMany({cart_id: cart.cart_id})
        return res.status(200).json({
            success: true,
            message: "Cart cleared"
        })
    } catch (error) {
        return res.status(500).json({
            Error: `Error ${error.message}`
        })
    }
}

module.exports = {
    getCurrentUserCart,
    createCart,
    removeCart,
    addToCart,
    removeFromCartByVariantId,
    clearCart
}