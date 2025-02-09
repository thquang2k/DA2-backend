const Brand = require('../models/brandModel')

const BRANDS = [
    {
        id: "AP",
        name: "Apple"
    },
    {
        id: "LV",
        name: "Lenovo"
    },
    {
        id: "SS",
        name: "Samsung"
    },
    {
        id: "AS",
        name: "Asus"
    },
    {
        id: "MI",
        name: "MSI"
    },
    {
        id: "XM",
        name: "Xiaomi"
    },
    {
        id: "HW",
        name: "Huawei"
    },
    {
        id: "AC",
        name:"Acer"
    },
    {
        id: "DL",
        name: "Dell"
    },
    {
        id: "OT",
        name: "Other"
    }

]

const importBrand = async () => {
    try {
        let brands = await Brand.countDocuments()
    if(brands != 0){
        console.log("Brand data has been already initialized!")
    }else{
        BRANDS.forEach(async (brand) => {
            let brandData = new Brand({
                brand_id: brand.id,
                brand_name: brand.name
            })
            let save = await brandData.save()
            if(!save){
                console.log("Cannot save brand data")
            }
        });
        console.log("Brand data has been initialized!")
    }
    } catch (error) {
        console.log(`Error: ${error.message}`)
    }
}

module.exports = importBrand