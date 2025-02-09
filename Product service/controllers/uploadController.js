const Upload = require('../models/productUploadModel')

const getAllUploads = async (req, res, next) => {
    try {
        let uploads = await Upload.find()

        return res.status(200).json({
            success: true,
            message: "Get all uploads succeeded",
            uploads: uploads
        })
        
    } catch (error) {
        return res.status(500).json({
            Error: `Error: ${error.message}`
        })
    }
}

const getUploadsByProductId = async (req, res, next) => {
    try {
        let uploads = await Upload.find({product_id: req.params.productId})

        return res.status(200).json({
            success: true,
            message: `Get uploads of product ID ${req.params.productId}`,
            uploads: uploads
        })
        
    } catch (error) {
        return res.status(500).json({
            Error: `Error: ${error.message}`
        })
    }
}
const getUploadById = async (req, res, next) => {
    try {
        let uploadId = req.params.uploadId
        let upload = await Upload.findOne({upload_id: uploadId})
        if(!upload){
            return res.status(400).json({
                success: false,
                message: `upload ID ${error.uploadId} not exist`
            })
        }
        return res.status(200).json({
            success: true,
            message: `Get upload ID ${req.params.productId}`,
            upload: upload
        })
        
    } catch (error) {
        return res.status(500).json({
            Error: `Error: ${error.message}`
        })
    }
}

const uploadImage = async (req, res) => {
    try {
        if (!req.files) {
            return res.status(413).json(
                { success: false,
                    message: `File not uploaded!, Please attach jpeg file`});
        }
        let productId = req.params.productId
        let uploads = []
        for (let i = 0; i < req.files.length; i++) {
            let src = `localhost:5002/uploads/${req.files[i].filename}`
            let uploadImg = new Upload({
                upload_id: "temp",
                product_id: productId,
                upload_src: src
            })
            uploadImg.upload_id = uploadImg._id.toString()
            uploadImg.upload_id.replace('new ObjectId(', '')
            uploadImg.upload_id.replace(')', '')
    
            await uploadImg.save()
            uploads.push(uploadImg)
        }

        return res.status(200).json({
            success: true,
            message: "Upload img succeeded",
            uploads: uploads
        })
        
    } catch (error) {
        return res.status(500).json({
            Error: `Error: ${error.message}`
        })
    }
}

const updateUploadById = async (req, res) => {
    try {
        let uploadId = req.params.uploadId
        let upload = await Upload.findOne({upload_id: uploadId})
        if(!upload){
            return res.status(400).json({
                success: false,
                message: `upload ID ${error.uploadId} not exist`
            })
        }
        if(req.file){
            upload.upload_src = `localhost:5002/uploads/${req.file.filename}`

        }
        await upload.save()

        return res.status(200).json({
            success: true,
            message: "Updated upload",
            upload: upload
        })
        
    } catch (error) {
        return res.status(500).json({
            Error: `Error: ${error.message}`
        })
    }
}

const deleteUploadById = async (req, res, next) => {
    try {
        let upload = await Upload.findOne({upload_id: uploadId})
        if(!upload){
            return res.status(400).json({
                success: false,
                message: `upload ID ${error.uploadId} not exist`
            })
        }
        await Upload.findOneAndDelete({upload_id: uploadId})
        return res.status(200).json({
            success: true,
            message: `Deleted upload ID ${uploadId}`,
        })
        
    } catch (error) {
        return res.status(500).json({
            Error: `Error: ${error.message}`
        })
    }
}

module.exports = {
    getAllUploads,
    getUploadById,
    getUploadsByProductId,
    uploadImage,
    updateUploadById,
    deleteUploadById
}