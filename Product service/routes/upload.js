var express = require('express');
var router = express.Router();

const uploadController = require('../controllers/uploadController')

const upload = require('../upload')

router.get("/", uploadController.getAllUploads)
router.get("/:productId", uploadController.getUploadsByProductId)
router.get("/detail/:uploadId", uploadController.getUploadById)
router.post("/upload/:productId", upload.array("file"), uploadController.uploadImage);
router.put("/update/:uploadId", upload.array("file"), uploadController.updateUploadById);
router.delete("/delete/:uploadId", uploadController.deleteUploadById);

module.exports = router;
