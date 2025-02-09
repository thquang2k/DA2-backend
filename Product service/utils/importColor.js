const Color = require('../models/colorModel')

const COLORS = [
    {
        id: "RD",
        name: "Red"
    },
    {
        id: "BK",
        name: "Black"
    },
    {
        id: "WH",
        name: "White"
    },
    {
        id: "BE",
        name: "Blue"
    },
    {
        id: "GA",
        name: "Gray"
    },
    {
        id: "GE",
        name: "Grey"
    },
    {
        id: "CY",
        name: "Cyan"
    },
    {
        id: "EM",
        name: "Emerald"
    },
    {
        id: "GR",
        name: "Green"
    },
    {
        id: "PO",
        name: "Peach Orange"
    },
]

const importColor = async () => {
    try {
        let colors = await Color.countDocuments()
    if(colors != 0){
        console.log("Color data has been already initialized!")
    }else{
        COLORS.forEach(async (color) => {
            let colorData = new Color({
                color_id: color.id,
                color: color.name
            })
            let save = await colorData.save()
            if(!save){
                console.log("Cannot save color data")
            }
        });
        console.log("Color data has been initialized!")
    }
    } catch (error) {
        console.log(`Error: ${error.message}`)
    }
}

module.exports = importColor