const Category = require('../models/categoryModel')

const getAllCategory = async (req, res, next) => {
    try {
        let categories = await Category.find()
    if(!categories){
        return res.status(400).json({
            success: false,
            message: "Cannot get all categories"
        })
    }else{
        return res.status(200).json({
            success: true,
            message: "Get all categories succeeded!",
            categories: categories
        })
    }
    } catch (error) {
        return res.status(500).json({
            error: `Error: ${error.message}`
        })
    }   
}

const getCategoryById = async (req, res, next) => {
    try {
        let categoryId =req.params.categoryId
        if(!categoryId){
            return res.status(400).json({
                success: false,
                message: "Category ID is required!"
            })
        }else{
            let category = await Category.findOne({category_id: categoryId})
            if(!category){
                return res.status(400).json({
                    success: false,
                    message: `Category with ID ${categoryId} is not exist`
                })
            }else{
                return res.status(200).json({
                    success: true,
                    message: `Get Category with ID ${categoryId} succeeded`,
                    category: category
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            error: `Error: ${error.message}`
        })
    }
}

const createCategory = async (req, res, next) => {
    try {
        let categoryId =req.body.categoryId
        if(!categoryId){
            return res.status(400).json({
                success: false,
                message: "Category ID is required!"
            })
        }else{
            let category = await Category.findOne({category_id: categoryId})
            if(category){
                return res.status(400).json({
                    success: false,
                    message: `Category ID ${categoryId} has been used`
                })
            }
        }
        let categoryName =req.body.categoryName
        if(!categoryName){
            return res.status(400).json({
                success: false,
                message: "Category Name is required!"
            })
        }
        let category = new Category({
            category_id: categoryId,
            category_name: categoryName
        })

        let save = await category.save()
        if(!save){
            return res.status(400).json({
                success: false,
                message: `Cannot save category`
            })
        }else{
            return res.status(200).json({
                success: true,
                message: `New category created`,
                category: category
            })
        }
    } catch (error) {
        return res.status(500).json({
            error: `Error: ${error.message}`
        })
    }
}

const updateCategoryById = async (req, res, next) => {
    try {
        let categoryId =req.params.categoryId
        if(!categoryId){
            return res.status(400).json({
                success: false,
                message: "Category ID is required!"
            })
        }else{
            let category = await Category.findOne({category_id: categoryId})
            if(!category){
                return res.status(400).json({
                    success: false,
                    message: `Category ID ${categoryId} is not exist`
                })
            }
            let categoryName =req.body.categoryName
            if(categoryName){
                category.category_name = categoryName
            }
            let save = await category.save()
            if(!save){
                return res.status(400).json({
                    success: false,
                    message: `Cannot save category`
                })
            }else{
                return res.status(200).json({
                    success: true,
                    message: `Category updated`,
                    category: category
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            error: `Error: ${error.message}`
        })
    }
}

const deleteCategoryById = async (req, res, next) => {
    try {
        let categoryId =req.params.categoryId
        if(!categoryId){
            return res.status(400).json({
                success: false,
                message: "Category ID is required!"
            })
        }else{
            let category = await Category.findOne({category_id: categoryId})
            if(!category){
                return res.status(400).json({
                    success: false,
                    message: `Category ID ${categoryId} is not exist`
                })
            }else{
                let deleted = await Category.findOneAndDelete({category_id: categoryId})
                if(!deleted){
                    return res.status(400).json({
                        success: false,
                        message: `Cannot delete category`
                    })
                }else{
                    return res.status(200).json({
                        success: true,
                        message: `Category deleted`
                    })
                }
            }
        }
    } catch (error) {
        return res.status(500).json({
            error: `Error: ${error.message}`
        })
    }
}

module.exports = {
    getAllCategory,
    getCategoryById,
    createCategory,
    updateCategoryById,
    deleteCategoryById
}