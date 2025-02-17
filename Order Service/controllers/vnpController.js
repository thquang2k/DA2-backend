const moment = require('moment')
const request = require('request');
const url = require('url')
const axios = require('axios')
const Order = require('../models/orderModel')
const OrderDetail = require('../models/orderDetailModel')
const Transaction = require('../models/transactionModel')

const sortObject = (obj) => {
	let sorted = {};
	let str = [];
	let key;
	for (key in obj){
		if (obj.hasOwnProperty(key)) {
		str.push(encodeURIComponent(key));
		}
	}
	str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

const createPaymentUrl = async (req, res, next) => {
    try {
        let orderId = req.body.orderId
    if(!orderId){
        return res.status(400).json({
            success: false,
            message: "Require Order ID"
        })
    }
    let order = await Order.findOne({order_id: orderId})
    if(!order){
        return res.status(400).json({
            success: false,
            message: `Order with ID ${orderId} is not exist`
        })
    }
    
    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');
    
    let ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    let config = require('config');
    
    let tmnCode = config.get('vnp_TmnCode');
    let secretKey = config.get('vnp_HashSecret');
    let vnpUrl = config.get('vnp_Url');
    let returnUrl = config.get('vnp_ReturnUrl');
    let amount = order.total_cost;
    let bankCode = req.body.bankCode || '';
    
    let locale = 'vn';
    let currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD: ' + orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = order.total_cost * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    console.log(returnUrl)
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if(bankCode !== null && bankCode !== ''){
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");     
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex"); 
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    return res.status(200).json({
        success: true,
        message: "Create payment url success",
        url: vnpUrl
    })

    } catch (error) {
        return res.status(500).json({
            Error: `Error: ${error.message}`
        })
    }
}


const vnpIpn = async (req, res, next) => {
    let vnp_Params = req.query;
    
        let secureHash = vnp_Params['vnp_SecureHash'];
        
        let orderId = vnp_Params['vnp_TxnRef'];
        let rspCode = vnp_Params['vnp_ResponseCode'];
    
        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];
    
        vnp_Params = sortObject(vnp_Params);
        let config = require('config');
        let secretKey = config.get('vnp_HashSecret');
        let querystring = require('qs');
        let signData = querystring.stringify(vnp_Params, { encode: false });
        let crypto = require("crypto");     
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex"); 
        console.log(signed)
        console.log(secureHash)   
        
        let paymentStatus = '0'; // Giả sử '0' là trạng thái khởi tạo giao dịch, chưa có IPN. Trạng thái này được lưu khi yêu cầu thanh toán chuyển hướng sang Cổng thanh toán VNPAY tại đầu khởi tạo đơn hàng.
        //let paymentStatus = '1'; // Giả sử '1' là trạng thái thành công bạn cập nhật sau IPN được gọi và trả kết quả về nó
        //let paymentStatus = '2'; // Giả sử '2' là trạng thái thất bại bạn cập nhật sau IPN được gọi và trả kết quả về nó
        
        let checkOrderId = true; // Mã đơn hàng "giá trị của vnp_TxnRef" VNPAY phản hồi tồn tại trong CSDL của bạn
        let checkAmount = true; // Kiểm tra số tiền "giá trị của vnp_Amout/100" trùng khớp với số tiền của đơn hàng trong CSDL của bạn
        if(secureHash === signed){ //kiểm tra checksum
            if(checkOrderId){
                if(checkAmount){
                    if(paymentStatus=="0"){ //kiểm tra tình trạng giao dịch trước khi cập nhật tình trạng thanh toán
                        if(rspCode=="00"){
                            //thanh cong
                            //paymentStatus = '1'
                            // Ở đây cập nhật trạng thái giao dịch thanh toán thành công vào CSDL của bạn
                            res.status(200).json({RspCode: '00', Message: 'Success'})
                        }
                        else {
                            //that bai
                            //paymentStatus = '2'
                            // Ở đây cập nhật trạng thái giao dịch thanh toán thất bại vào CSDL của bạn
                            res.status(200).json({RspCode: '00', Message: 'Success'})
                        }
                    }
                    else{
                        res.status(200).json({RspCode: '02', Message: 'This order has been updated to the payment status'})
                    }
                }
                else{
                    res.status(200).json({RspCode: '04', Message: 'Amount invalid'})
                }
            }       
            else {
                res.status(200).json({RspCode: '01', Message: 'Order not found'})
            }
        }
        else {
            res.status(200).json({RspCode: '97', Message: 'Checksum failed'})
        }
}

const vnpReturn =  async (req, res, next) => {
    try {
        let vnp_Params = req.query;
    if(vnp_Params['vnp_TransactionStatus'] != '00'){
        let orderDetail = await OrderDetail.find({order_id: vnp_Params['vnp_TxnRef']})
        for (let i = 0; i < orderDetail.length; i++) {
            await axios.put(`${process.env.PRODUCT_SERVICE_URL}/products/variant/update/${orderDetail[i].variant_id}/increase/${orderDetail[i].quantity}`)
        }
        res.redirect(url.format({
            pathname:"http://localhost:3000/complete",
            query: vnp_Params
          }));
    }else{
        let secureHash = vnp_Params['vnp_SecureHash'];
    
        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];
    
        vnp_Params = sortObject(vnp_Params);
    
        let config = require('config');
        let tmnCode = config.get('vnp_TmnCode');
        let secretKey = config.get('vnp_HashSecret');
    
        let querystring = require('qs');
        let signData = querystring.stringify(vnp_Params, { encode: false });
        let crypto = require("crypto");     
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");     
    
        if(secureHash === signed){
            //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
            vnp_Params['vnp_OrderInfo'].replace('+', ' ')
            vnp_Params['vnp_OrderInfo'].replace('%3A', ':')
            let description = vnp_Params['vnp_OrderInfo']
            let transaction = new Transaction({
                transaction_id: vnp_Params['vnp_TransactionNo'],
                order_id: vnp_Params['vnp_TxnRef'],
                amount: vnp_Params['vnp_Amount'],
                method: "VNPay",
                description: description
            })
    
            let order = await Order.findOne({order_id: transaction.order_id})
            order.status = "Paid"
            await axios.delete(`${process.env.PRODUCT_SERVICE_URL}/cart/clear/${order.user_id}`)
            let save =  await order.save()
            if(!save){
                return res.status(400).json({success: false, message: "Cannot save transaction"})
            }
            transaction.user_id = order.user_id
            await transaction.save()
            //return res.status(200).json({success: true, transaction: transaction, order: order})
            res.redirect(url.format({
                pathname:"http://localhost:3000/complete",
                query: vnp_Params
              }));

            } else{
                return res.status(400).json({
                    success: false,
                    message: "Checksum failed"
                })
            }
    }

    } catch (error) {
        return res.status(500).json({
            Error: `Error: ${error.message}`
        })
    }
}

module.exports = {
    createPaymentUrl,
    vnpIpn,
    vnpReturn
}