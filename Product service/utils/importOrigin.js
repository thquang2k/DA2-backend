const Origin = require('../models/originModel')

const ORIGINS = [
    {
        id: "CN",
        name: "China"
    },
    {
        id: "US",
        name: "USA"
    },
    {
        id: "VN",
        name: "Vietnam"
    },
    {
        id: "JP",
        name: "Japan"
    },
    {
        id: "GB",
        name: "Global"
    },
    {
        id: "KR",
        name: "Korea"
    },
    {
        id: "HK",
        name: "Hongkong"
    },
    {
        id: "TP",
        name: "Tapei"
    },
    {
        id: "UK",
        name: "United Kingdom"
    }
]

const importOrigin = async () => {
    try {
        let origins = await Origin.countDocuments()
    if(origins != 0){
        console.log("Origin data has been already initialized!")
    }else{
        ORIGINS.forEach(async (origin) => {
            let originData = new Origin({
                origin_id: origin.id,
                country: origin.name
            })
            let save = await originData.save()
            if(!save){
                console.log("Cannot save origin data")
            }
        });
        console.log("Origin data has been initialized!")
    }
    } catch (error) {
        console.log(`Error: ${error.message}`)
    }
}

module.exports = importOrigin