const Category = require('../models/categoryModel')

const CATEGORIES = [
    {
        id: "LT",
        name: "Laptop"
    },
    {
        id: "CP",
        name: "Cellphone"
    }
]

const importCategory = async () => {
    try {
        let cats = await Category.countDocuments()
    if(cats != 0){
        console.log("Category data has been already initialized!")
    }else{
        CATEGORIES.forEach(async (cat) => {
            let catData = new Category({
                category_id: cat.id,
                category_name: cat.name
            })
            let save = await catData.save()
            if(!save){
                console.log("Cannot save category data")
            }
        });
        console.log("Category data has been initialized!")
    }
    } catch (error) {
        console.log(`Error: ${error.message}`)
    }
}

module.exports = importCategory