const Laptop = require('../models/laptopModel')
const Cellphone = require('../models/cellphoneModel')
const LaptopVariant = require('../models/laptopVariantModel')
const CellphoneVariant = require('../models/cellphoneVariantModel')
const LaptopVariantField = require('../models/laptopVariantFieldModel')
const CellphoneVariantField = require('../models/cellphoneVariantFieldModel')
const Color = require('../models/colorModel')
const Origin = require('../models/originModel')
const Promotion = require('../models/promotionModel')

const getAllLaptopVariantsByProductId = async (req, res, next) => {
    try {
        let productId = req.params.productId
        if(!productId){
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            })
        }else{
            let laptop = await Laptop.findOne({product_id: productId})
            if(!laptop){
                return res.status(400).json({
                    success: false,
                    message: `Laptop with ID ${productId} is not exist`
                })
            }else{
                let variants = await LaptopVariant.find({product_id: productId})
                if(!variants){
                    return res.status(400).json({
                        success: false,
                        message: `Cannot get Laptop with ID ${productId}!`
                    })
                }else{
                    let variantList = []
                    for (let index = 0; index < variants.length; index++) {
                        let field = await LaptopVariantField.findOne({variant_id: variants[index].variant_id})
                        variantList.push({
                            variant: variants[index],
                            field: field
                        })
                    }
                    return res.status(200).json({
                        success: true,
                        message: `Get all variants of laptop with ID ${productId} succeeded!`,
                        variantsList: variantList
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

const getAllCellphoneVariantsByProductId = async (req, res, next) => {
    try {
        let productId = req.params.productId
        if(!productId){
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            })
        }else{
            let cellphone = await Cellphone.findOne({product_id: productId})
            if(!cellphone){
                return res.status(400).json({
                    success: false,
                    message: `Cellphone with ID ${productId} is not exist`
                })
            }else{
                let variants = await CellphoneVariant.find({product_id: productId})
                if(!variants){
                    return res.status(400).json({
                        success: false,
                        message: `Cannot get Cellphone with ID ${productId}!`
                    })
                }else{
                    let variantList = []
                    for (let index = 0; index < variants.length; index++) {
                        let field = await CellphoneVariantField.findOne({variant_id: variants[index].variant_id})
                        variantList.push({
                            variant: variants[index],
                            field: field
                        })
                    }
                    return res.status(200).json({
                        success: true,
                        message: `Get all variants of cellphone with ID ${productId} succeeded!`,
                        variantList: variantList
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

const getLaptopVariantById = async (req, res, next) => {
    try {
        let variantId = req.params.variantId
        if(!variantId){
            return res.status(400).json({
                success: false,
                message: "Variant ID is required"
            })
        }else{
            let variant = await LaptopVariant.find({variant_id: variantId})
            if(!variant){
                return res.status(400).json({
                    success: false,
                    message: `Laptop variant with ID ${variantId} is not exist!`
                })
            }else{
                return res.status(200).json({
                    success: true,
                    message: `Get laptop variant with ID ${productId} succeeded!`,
                    variant: variant
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            Error: `Error ${error.message}`
        })
    }
}

const getCellphoneVariantById = async (req, res, next) => {
    try {
        let variantId = req.params.variantId
        if(!variantId){
            return res.status(400).json({
                success: false,
                message: "Variant ID is required"
            })
        }else{
            let variant = await CellphoneVariant.find({variant_id: variantId})
            if(!variant){
                return res.status(400).json({
                    success: false,
                    message: `Cellphone variant with ID ${variantId} is not exist!`
                })
            }else{
                return res.status(200).json({
                    success: true,
                    message: `Get cellphone variant with ID ${productId} succeeded!`,
                    variant: variant
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            Error: `Error ${error.message}`
        })
    }
}

const createLaptopVariant = async (req, res, next) => {
    try {
        let productId = req.params.productId
        if(!productId){
            return res.status(400).json({
                success: false,
                message: "Product ID is required!"
            })
        }else{
            let laptop = await Laptop.findOne({product_id: productId})
            if(!laptop){
                return res.status(400).json({
                    success: false,
                    message: `Laptop with ID ${productId} is not exist!`
                })
            }else{
                //Variant info
                let variantName, price, promotionId, stock
                if(req.body.variant){
                    variantName = req.body.variant.name
                    if(!variantName){
                        return res.status(400).json({
                            success: false,
                            message: "Variant Name is required!"
                        })
                    }
                    price = req.body.variant.price
                    if(!price){
                        return res.status(400).json({
                            success: false,
                            message: "Variant Price is required!"
                        })
                    }
                    promotionId = req.body.variant.promotionId
                    if(!promotionId){
                        promotionId = "None";
                    }else{
                        let promotion = await Promotion.findOne({promotion_id: promotionId})
                        if(!promotion){
                            return res.status(400).json({
                                success: false,
                                message: `Promotion with ID ${promotionId} is not exist`
                            })
                        }
                    }
                    stock = req.body.variant.stock
                    if(!stock){
                        stock = 0
                    }
                }else{
                    return res.status(400).json({
                        success: false,
                        message: "Variant is required in body!"
                    })
                }
                
                //Field info
                let partNumber, mfgYear, originId, weight, colorId, material, maxRamUp, maxDriveUp, whdSize, cpu, vga, ram, drive, screen, port, os, keyboard, power
                let gears = []
                if(req.body.variantField){
                    partNumber = req.body.variantField.partNumber
                    if(!partNumber){
                        return res.status(400).json({
                            success: false,
                            message: "Variant field Part Number is required!"
                        })
                    }
                    mfgYear = req.body.variantField.mfgYear
                    if(!mfgYear){
                        return res.status(400).json({
                            success: false,
                            message: "Variant field MFG Year is required!"
                        })
                    }
                    originId = req.body.variantField.originId
                    if(!originId){
                        return res.status(400).json({
                            success: false,
                            message: "Variant field Origin ID is required!"
                        })
                    }else{
                        let origin = await Origin.findOne({origin_id: originId})
                        if(!origin){
                            return res.status(400).json({
                                success: false,
                                message: `Origin with ID ${originId} is not exist`
                            })
                        }
                    }
                    weight = req.body.variantField.weight
                    if(!weight){
                        return res.status(400).json({
                            success: false,
                            message: "Variant field Weight is required!"
                        })
                    }
                    colorId = req.body.variantField.colorId
                    if(!colorId){
                        return res.status(400).json({
                            success: false,
                            message: "Variant field Color ID is required!"
                        })
                    }else{
                        let color = await Color.findOne({color_id: colorId})
                        if(!color){
                            return res.status(400).json({
                                success: false,
                                message: `Color with ID ${colorId} is not exist`
                            })
                        }
                    }
                    material = req.body.variantField.material
                    if(!material){
                        return res.status(400).json({
                            success: false,
                            message: "Variant field Material is required!"
                        })
                    }
                    maxRamUp = req.body.variantField.maxRamUp
                    if(!maxRamUp){
                        maxRamUp = "Cannot Upgrade"
                    }
                    maxDriveUp = req.body.variantField.maxDriveUp
                    if(!maxDriveUp){
                        maxDriveUp = "Cannot Upgrade"
                    }
                    if(req.body.variantField.whdSize){
                        whdSize = {
                            width : req.body.variantField.whdSize.width,
                            height: req.body.variantField.whdSize.height,
                            depth: req.body.variantField.whdSize.depth
                        }
                        if(!whdSize.width || !whdSize.height || ! whdSize.depth){
                            return res.status(400).json({
                                success: false,
                                message: "Variant field whdsize Width, Height, Depth is all required!"
                            })
                        }
                    }else{
                        return res.status(400).json({
                            success: false,
                            message: "Variant field whdsize required!"
                        })
                    }
                    if(req.body.variantField.cpu){
                        cpu = {
                            brand: req.body.variantField.cpu.brand,
                            name: req.body.variantField.cpu.name,
                            model: req.body.variantField.cpu.model,
                            minRate: req.body.variantField.cpu.minRate
                        }
                        if(!cpu.brand || !cpu.name || !cpu.model || !cpu.minRate){
                            return res.status(400).json({
                                success: false,
                                message: "Variant field CPU Brand, Name, Model, Min rate is all required!"
                            })
                        }
                    }else{
                        return res.status(400).json({
                            success: false,
                            message: "Variant field cpu required!"
                        })
                    }
                    if(req.body.variantField.vga){
                        vga = {
                            brand: req.body.variantField.vga.brand,
                            name: req.body.variantField.vga.name,
                            model: req.body.variantField.vga.model
                        }
                        if(!vga.brand || !vga.name || !vga.model){
                            return res.status(400).json({
                                success: false,
                                message: "Variant field VGA Brand, Name, Model is all required!"
                            })
                        }
                    }else{
                        return res.status(400).json({
                            success: false,
                            message: "Variant field vga required!"
                        })
                    }
                    if(req.body.variantField.ram){
                        ram = {
                            ram_type: req.body.variantField.ram.type,
                            storage: req.body.variantField.ram.storage,
                            slots: req.body.variantField.ram.slots
                        }
                        if(!ram.ram_type || !ram.storage || !ram.slots){
                            return res.status(400).json({
                                success: false,
                                message: "Variant field RAM Type, Storage, Slots is all required!"
                            })
                        }
                    }else{
                        return res.status(400).json({
                            success: false,
                            message: "Variant field ram required!"
                        })
                    }
                    if(req.body.variantField.drive){
                        drive = {
                            drive_type: req.body.variantField.drive.type,
                            model: req.body.variantField.drive.model,
                            storage: req.body.variantField.drive.storage,
                            slots: req.body.variantField.drive.slots
                        }
                        if(!drive.drive_type || !drive.model || !drive.storage || !drive.slots){
                            return res.status(400).json({
                                success: false,
                                message: "Variant field Drive Type, Model, Storage, Slots is all required!"
                            })
                        }
                    }else{
                        return res.status(400).json({
                            success: false,
                            message: "Variant field drive required!"
                        })
                    }
                    if(req.body.variantField.screen){
                        if(req.body.variantField.screen.resolution){
                            screen = {
                                size: req.body.variantField.screen.size,
                                screen_type: req.body.variantField.screen.type,
                                resolution: {
                                    width: req.body.variantField.screen.resolution.width,
                                    height: req.body.variantField.screen.resolution.height
                                },
                                refreshRate: req.body.variantField.screen.refreshRate,
                                colorRate: req.body.variantField.screen.colorRate,
                                ratio: req.body.variantField.screen.ratio
                            }
                            if(!screen.size || !screen.screen_type || !screen.resolution.width || !screen.resolution.height || !screen.refreshRate || !screen.colorRate || !screen.ratio){
                                return res.status(400).json({
                                    success: false,
                                    message: "Screen Size, Type, Resolution (w,h), Refresh Rate, Color rate, Ratio is all required!"
                                })
                            }
                        }else{
                            return res.status(400).json({
                                success: false,
                                message: "Variant field screen resolution required!"
                            })
                        }
                    }else{
                        return res.status(400).json({
                            success: false,
                            message: "Variant field screen required!"
                        })
                    }
                    if(req.body.variantField.port){
                        if(req.body.variantField.port.usb1 && req.body.variantField.port.hdmi1){
                            port = {
                                wifi: req.body.variantField.port.wifi,
                                bluetooth: req.body.variantField.port.bluetooth,
                                webcam: req.body.variantField.port.webcam,
                                usb1: {
                                    usb_type: req.body.variantField.port.usb1.type,
                                    slots: req.body.variantField.port.usb1.slots
                                },
                                hdmi1: {
                                    version: req.body.variantField.port.hdmi1.version,
                                    slots: req.body.variantField.port.hdmi1.slots
                                },
                                cardReaderSlots: req.body.variantField.port.cardReaderSlots,
                                jack3p5mmSlots: req.body.variantField.port.jack3p5mmSlots
                            }
                            if(!port.wifi || !port.bluetooth || !port.usb1.usb_type || !port.usb1.slots || !port.hdmi1.version || !port.hdmi1.slots){
                                return res.status(400).json({
                                    success: false,
                                    message: "Variant field Wifi, Bluetooth, USB Port, HDMI Port is all required!"
                                })
                            }else{
                                if(!port.webcam){
                                    port.webcam = "None"
                                }
                                if(req.body.variantField.port.usb2){
                                    port.usb2.usb_type = req.body.variantFieldport.usb2.type
                                    port.usb2.slots = req.body.variantField.port.usb2.slots
                                }else{
                                    port.usb2 = "None"
                                }
                                if(req.body.variantField.port.hdmi2){
                                    port.hdmi2.version = req.body.variantFieldport.usb2.version
                                    port.hdmi2.slots = req.body.variantField.port.usb2.slots
                                }else{
                                    port.hdmi2 = "None"
                                }
                                if(!port.cardReaderSlots){
                                    port.cardReaderSlots = 0
                                }
                                if(!port.jack3p5mmSlots){
                                    port.jack3p5mmSlots = 0
                                }
                            }
                        }else{
                            return res.status(400).json({
                                success: false,
                                message: "Variant field port usb1, hdmi1 required!"
                            })
                        }
                    }else{
                        return res.status(400).json({
                            success: false,
                            message: "Variant field port required!"
                        })
                    }
                    if(req.body.variantField.os){
                        os = {
                            name: req.body.variantField.os.name,
                            version: req.body.variantField.os.version
                        }
                        if(!os.name || !os.version){
                            return res.status(400).json({
                                success: false,
                                message: "Variant field OS Name, Version is all required!"
                            })
                        }
                    }else{
                        return res.status(400).json({
                            success: false,
                            message: "Variant field os required!"
                        })
                    }
                    if(req.body.variantField.keyboard){
                        keyboard = {
                            keyboard_type: req.body.variantField.keyboard.type,
                            led: req.body.variantField.keyboard.led,
                            has_numpad: req.body.variantField.keyboard.hasNumpad,
                            touchpad: req.body.variantField.keyboard.touchpad
                        }
                        if(!keyboard.keyboard_type || !(keyboard.has_numpad == true || keyboard.has_numpad == false) || !keyboard.touchpad){
                            return res.status(400).json({
                                success: false,
                                message: "Variant field Keyboard Type, Has Numpad, Touchpad is all required!"
                            })
                        }else{
                            if(!keyboard.led){
                                keyboard.led = "None"
                            }
                        }
                    }else{
                        return res.status(400).json({
                            success: false,
                            message: "Variant field keyboard required!"
                        })
                    }
                    if(req.body.variantField.power){
                        power = {
                            capability: req.body.variantField.power.capability,
                            supply: req.body.variantField.power.supply
                        }
                        if(!power.capability || !power.supply){
                            return res.status(400).json({
                                success: false,
                                message: "Power capability, supply is all required!"
                            })
                        }
                    }else{
                        return res.status(400).json({
                            success: false,
                            message: "Variant field power required!"
                        }) 
                    }
                    if(req.body.variantField.gears){
                        req.body.variantField.gears.forEach(gear => {
                            gears.push(gear)
                        });
                    }
                }else{
                    return res.status(400).json({
                        success: false,
                        message: "variantField is required in body!"
                    })
                }
                
                let sku = "L" + originId + "Y" + mfgYear.toString() + "C" + colorId
                
                let checkSkuExist = await LaptopVariant.findOne({sku: sku})
                if(checkSkuExist){
                    return res.status(400).json({
                        success: false,
                        message: `SKU ${sku} has been used by other variant`
                    })
                }

                let variant = new LaptopVariant({
                    variant_id: "temp",
                    product_id: productId,
                    variant_name: variantName,
                    sku: sku,
                    price: price,
                    promotion_id: promotionId,
                    stock: stock
                })
                variant.variant_id = variant._id.toString()
                variant.variant_id.replace('new Object Id(', '')
                variant.variant_id.replace(')', '')
                let variantId = variant.variant_id

                let variantField = new LaptopVariantField({
                    variant_field_id: "temp",
                    variant_id: variantId,
                    part_number: partNumber,
                    mfg_year: mfgYear,
                    origin_id: originId,
                    weight: weight,
                    color_id: colorId,
                    material: material,
                    max_ram_up: maxRamUp,
                    max_drive_up: maxDriveUp,
                    whd_size: whdSize,
                    cpu: cpu,
                    vga: vga,
                    ram: ram,
                    drive: drive,
                    screen: screen,
                    keyboard: keyboard,
                    port: port,
                    os: os,
                    power: power,
                    gears: gears
                })
                variantField.variant_field_id = variantField._id.toString()
                variantField.variant_field_id.replace('new Object Id(', '')
                variantField.variant_field_id.replace(')', '')

                let fieldSave = await variantField.save()
                if(!fieldSave){
                    return res.status(400).json({
                        success: false,
                        message: "Cannot save laptop variant field"
                    })
                }else{
                    let variantSave = await variant.save()
                    if(!variantSave){
                        await LaptopVariantField.findOneAndDelete({variant_field_id: variantFieldId})
                        return res.status(400).json({
                            success: false,
                            message: "Cannot save laptop variant"
                        })
                    }else{
                        return res.status(200).json({
                            success: true,
                            message: "Save laptop variant succeeded",
                            variant: variant,
                            fields: variantField
                        })
                    }
                }
            }
        }
        
    } catch (error) {
        return res.status(500).json({
            Error: `Error ${error.message}`
        })
    }
}

const createCellphoneVariant = async (req, res, next) => {
    try {
        let productId = req.params.productId
        if(!productId){
            return res.status(400).json({
                success: false,
                message: "Product ID is required!"
            })
        }else{
            let cellphone = await Cellphone.findOne({product_id: productId})
            if(!cellphone){
                return res.status(400).json({
                    success: false,
                    message: `Cellphone with ID ${productId} is not exist!`
                })
            }else{
                //Variant info
                let variantName, price, promotionId, stock
                if(req.body.variant){
                    variantName = req.body.variant.name
                    if(!variantName){
                        return res.status(400).json({
                            success: false,
                            message: "variant.name is required!"
                        })
                    }
                    price = req.body.variant.price
                    if(!price){
                        return res.status(400).json({
                            success: false,
                            message: "variant.price is required!"
                        })
                    }
                    promotionId = req.body.variant.promotionId
                    if(!promotionId){
                        promotionId = "None";
                    }else{
                        let promotion = await Promotion.findOne({promotion_id: promotionId})
                        if(!promotion){
                            return res.status(400).json({
                                success: false,
                                message: `Promotion with ID ${promotionId} is not exist`
                            })
                        }
                    }
                    stock = req.body.variant.stock
                    if(!stock){
                        stock = 0
                    }
                }else{
                    return res.status(400).json({
                        success: false,
                        message: `variant is required in body!`
                    })
                }
                //Field info
                let mfgYear, originId, weight, colorId, material, waterResist, ramStorage, gpu, whdSize, cpu, connectors, storage, screen, power
                let gears = []
                let cameras = {
                    backCamera: [],
                    frontCamera: {
                        camera_type: "",
                        resolution: "",
                        video_resolution: ""
                    }
                }
                if(req.body.variantField){
                    mfgYear = req.body.variantField.mfgYear
                    if(!mfgYear){
                        return res.status(400).json({
                            success: false,
                            message: "variantField.mfgYear is required!"
                        })
                    }
                    originId = req.body.variantField.originId
                    if(!originId){
                        return res.status(400).json({
                            success: false,
                            message: "variantField.originId is required!"
                        })
                    }else{
                        let origin = await Origin.findOne({origin_id: originId})
                        if(!origin){
                            return res.status(400).json({
                                success: false,
                                message: `Origin with ID ${originId} is not exist`
                            })
                        }
                    }
                    weight = req.body.variantField.weight
                    if(!weight){
                        return res.status(400).json({
                            success: false,
                            message: "variantField.weight is required!"
                        })
                    }
                    colorId = req.body.variantField.colorId
                    if(!colorId){
                        return res.status(400).json({
                            success: false,
                            message: "variantField.colorId is required!"
                        })
                    }else{
                        let color = await Color.findOne({color_id: colorId})
                        if(!color){
                            return res.status(400).json({
                                success: false,
                                message: `Color with ID ${colorId} is not exist`
                            })
                        }
                    }
                    material = req.body.variantField.material
                    if(!material){
                        return res.status(400).json({
                            success: false,
                            message: "variantField.material is required!"
                        })
                    }
                    waterResist = req.body.variantField.waterResist
                    if(!waterResist){
                        waterResist = "None"
                    }
                    ramStorage = req.body.variantField.ramStorage
                    if(!ramStorage){
                        return res.status(400).json({
                            success: false,
                            message: "variantField.ramStorage is required!"
                        })
                    }
                    gpu = req.body.variantField.gpu
                    if(!gpu){
                        gpu = "None"
                    }
                    if(req.body.variantField.whdSize){
                        let whdSize = {
                            width : req.body.variantField.whdSize.width,
                            height: req.body.variantField.whdSize.height,
                            depth: req.body.variantField.whdSize.depth
                        }
                        if(!whdSize.width || !whdSize.height || ! whdSize.depth){
                            return res.status(400).json({
                                success: false,
                                message: "Width, Height, Depth is all required!"
                            })
                        }
                    }else{
                        return res.status(400).json({
                            success: false,
                            message: `variantField.whdSize is required in body!`
                        })
                    }
                    if(req.body.variantField.cpu){
                        cpu = {
                            version: req.body.variantField.cpu.version,
                            name: req.body.variantField.cpu.name,
                            processorNum: req.body.variantField.cpu.processorNum,
                            maxRate: req.body.variantField.cpu.maxRate
                        }
                        if(!cpu.version || !cpu.name || !cpu.processorNum || !cpu.maxRate){
                            return res.status(400).json({
                                success: false,
                                message: "CPU Version, Name, Number of processors, Max rate is all required!"
                            })
                        }
                    }else{
                        return res.status(400).json({
                            success: false,
                            message: `variantField.cpu is required in body!`
                        })
                    }
                    if(req.body.variantField.connectors){
                        connectors = {
                            wifi: req.body.variantField.connectors.wifi,
                            bluetooth: req.body.variantField.connectors.bluetooth,
                            sim: req.body.variantField.connectors.sim,
                            internet: req.body.variantField.connectors.internet,
                            chargerType: req.body.variantField.connectors.chargerType,
                            hasJack3p5mm: req.body.variantField.connectors.hasJack3p5mm,
                            gpsSupport: []
                        }
                        if(!req.body.variantField.connectors.sim || !connectors.chargerType){
                            return res.status(400).json({
                                success: false,
                                message: "Connector SIM, Charger Type is all required!"
                            })
                        }else{
                            if(!connectors.hasJack3p5mm){
                                connectors.hasJack3p5mm = false;
                            }
                            if(!connectors.wifi){
                                connectors.wifi = "Not available"
                            }
                            if(!connectors.bluetooth){
                                connectors.bluetooth = "Not available"
                            }
                            if(!connectors.internet){
                                connectors.internet = "Not supported"
                            }
                            if(!req.body.variantField.connectors.gpsSupport){
                                connectors.gpsSupport = "Not supported"
                            }else{
                                req.body.variantField.connectors.gpsSupport.forEach(gps => {
                                    connectors.gpsSupport.push(gps)
                                });
                            }
                        }
                    }else{
                        return res.status(400).json({
                            success: false,
                            message: `variantField.connectors is required in body!`
                        })
                    }
                    if(req.body.variantField.storage){
                        storage = {
                            rom: req.body.variantField.storage.rom,
                            driveSupport: req.body.variantField.storage.driveSupport,
                            maxDriveSupport: req.body.variantField.storage.maxDriveSupport
                        }
                        if(!storage.rom){
                            return res.status(400).json({
                                success: false,
                                message: "Storage ROM is required!"
                            })
                        }else{
                            if(!storage.driveSupport){
                                storage.driveSupport = "Not support"
                                storage.driveSupport.maxDriveSupport = 0
                            }else{
                                if(!storage.maxDriveSupport){
                                    return res.status(400).json({
                                        success: false,
                                        message: "Storage Max drive support is required!"
                                    })
                                }
                            }
                        }
    
                    }else{
                        return res.status(400).json({
                            success: false,
                            message: `variantField.storage is required in body!`
                        })
                    }
                    if(req.body.variantField.cameras){
                        if(!req.body.variantField.cameras.backCamera){
                            cameras.backCamera = "None"
                        }else{
                            cameras.backCamera = []
                            req.body.variantField.cameras.backCamera.forEach(camera => {
                                cameras.backCamera.push(camera)
                            });
                        }
                        if(!req.body.variantField.cameras.frontCamera){
                            cameras.front_camera = "None"
                        }else{
                            
                            cameras.frontCamera.camera_type = req.body.variantField.cameras.frontCamera.type
                            cameras.frontCamera.resolution = req.body.variantField.cameras.frontCamera.resolution
                            cameras.frontCamera.video_resolution = req.body.variantField.cameras.frontCamera.videoResolution
                        }
                        
                    }
                    
                    if(req.body.variantField.screen){
                        if(req.body.variantField.screen.resolution){
                            screen = {
                                size: req.body.variantField.screen.size,
                                type: req.body.variantField.screen.type,
                                resolution: {
                                    width: req.body.variantField.screen.resolution.width,
                                    height: req.body.variantField.screen.resolution.height
                                },
                                refreshRate: req.body.variantField.screen.refreshRate,
                                brightRate: req.body.variantField.screen.brightRate,
                                touchRate: req.body.variantField.screen.touchRate,
                                material: req.body.variantField.screen.material
                            }
                            if(!screen.size || !screen.type || !screen.refreshRate || !screen.brightRate || !screen.material){
                                return res.status(400).json({
                                    success: false,
                                    message: "Screen Size, Type, Refresh Rate, Bright rate, Material is all required!"
                                })
                            }else{
                                if(!screen.touchRate){
                                    screen.touchRate = "Not available"
                                }
                            }
                        }else{
                            return res.status(400).json({
                                success: false,
                                message: "variantField.screen.resolution width, height is all required!"
                            })
                        }
                    }else{
                        return res.status(400).json({
                            success: false,
                            message: `variantField.screen is required in body!`
                        })
                    }
                    if(req.body.variantField.power){
                        power = {
                            batteryType: req.body.variantField.power.batteryType,
                            capability: req.body.variantField.power.capability,
                            charger: req.body.variantField.power.charger
                        }
                        if(!power.batteryType || !power.capability || !power.charger){
                            return res.status(400).json({
                                success: false,
                                message: "Power battery type, capility, charger is all required!"
                            })
                        }
                    }else{
                        return res.status(400).json({
                            success: false,
                            message: `variantField.power is required in body!`
                        })
                    }
                    if(req.body.variantField.gears){
                        req.body.variantField.gears.forEach(gear => {
                            gears.push(gear)
                        });
                    }
                }else{
                    return res.status(400).json({
                        success: false,
                        message: `variantField is required in body!`
                    })
                }
                
                
                let sku = "C" + originId + "R" + storage.rom + "C" + colorId
                
                let checkSkuExist = await CellphoneVariant.findOne({sku: sku})
                if(checkSkuExist){
                    return res.status(400).json({
                        success: false,
                        message: `SKU ${sku} has been used by other variant`
                    })
                }

                let variant = new CellphoneVariant({
                    variant_id: "temp",
                    product_id: productId,
                    variant_name: variantName,
                    sku: sku,
                    price: price,
                    promotion_id: promotionId,
                    stock: stock
                })
                variant.variant_id = variant._id.toString()
                variant.variant_id.replace('new Object Id(', '')
                variant.variant_id.replace(')', '')
                let variantId = variant.variant_id

                let variantField = new CellphoneVariantField({
                    variant_field_id: "temp",
                    variant_id: variantId,
                    mfg_year: mfgYear,
                    origin_id: originId,
                    weight: weight,
                    color_id: colorId,
                    water_resist: waterResist,
                    material: material,
                    ram_storage: ramStorage,
                    gpu: gpu,
                    whd_size: whdSize,
                    screen: screen,
                    cpu: cpu,
                    connectors: connectors,
                    storage: storage,
                    camera: cameras,
                    screen: screen,
                    power: power,
                    gears: gears
                })
                variantField.variant_field_id = variantField._id.toString()
                variantField.variant_field_id.replace('new Object Id(', '')
                variantField.variant_field_id.replace(')', '')

                let fieldSave = await variantField.save()
                if(!fieldSave){
                    return res.status(400).json({
                        success: false,
                        message: "Cannot save cellphone variant field"
                    })
                }else{
                    let variantSave = await variant.save()
                    if(!variantSave){
                        await CellphoneVariantField.findOneAndDelete({variant_field_id: variantFieldId})
                        return res.status(400).json({
                            success: false,
                            message: "Cannot save cellphone variant"
                        })
                    }else{
                        return res.status(200).json({
                            success: true,
                            message: "Save cellphone variant succeeded",
                            variant: variant,
                            fields: variantField
                        })
                    }
                }
            }
        }
        
    } catch (error) {
        return res.status(500).json({
            Error: `Error ${error.message}`
        })
    }
}

const updateLaptopVariantById = async (req, res, next) => {
    try {
        let variantId = req.params.variantId
        if(!variantId){
            return res.status(400).json({
                success: false,
                message: "Variant ID is required!"
            })
        }else{
            let variant = await LaptopVariant.findOne({variant_id: variantId})
            if(!variant){
                return res.status(400).json({
                    success: false,
                    message: `Variant with ID ${variantId} is not exist!`
                })
            }else{
                if(req.body.variant){
                    let variantName = req.body.variant.name
                    if(variantName){
                        variant.variant_name = variantName
                    }
                    let price = req.body.variant.price
                    if(price){
                        variant.price = price
                    }
                    promotionId = req.body.variant.promotionId
                    if(promotionId){
                        let promotion = await Promotion.findOne({promotion_id: promotionId})
                        if(!promotion){
                            return res.status(400).json({
                                success: false,
                                message: `Promotion with ID ${promotionId} is not exist`
                            })
                        }else{
                            variant.promotion_id = promotionId
                        }
                    }
                    stock = req.body.variant.stock
                    if(stock && stock > 0){
                        variant.stock += stock
                    }
                }
                
                //Field info
                let variantField = await LaptopVariantField.findOne({variant_id: variantId})
                if(req.body.variantField){
                    let partNumber = req.body.variantField.partNumber
                    if(partNumber){
                        variantField.part_number = partNumber
                    }
                    let mfgYear = req.body.variantField.mfgYear
                    if(mfgYear){
                        variantField.mfg_year = mfgYear
                    }

                    let originId = req.body.variantField.originId
                    if(originId){
                        let origin = await Origin.findOne({origin_id: originId})
                        if(!origin){
                            return res.status(400).json({
                                success: false,
                                message: `Origin with ID ${originId} is not exist`
                            })
                        }else{
                            variantField.origin_id = originId
                        }
            
                    }
                    let weight = req.body.variantField.weight
                    if(weight){
                        variantField.weight = weight
                    }
                    let colorId = req.body.variantField.colorId
                    if(colorId){
                        let color = await Color.findOne({color_id: colorId})
                        if(!color){
                            return res.status(400).json({
                                success: false,
                                message: `Color with ID ${colorId} is not exist`
                            })
                        }else{
                            variantField.color_id = colorId
                        }
                        
                    }

                    let material = req.body.variantField.material
                    if(material){
                        variantField.material = material
                    }
                    let maxRamUp = req.body.variantField.maxRamUp
                    if(maxRamUp){
                        variantField.max_ram_up = maxRamUp
                    }
                    let maxDriveUp = req.body.variantField.maxDriveUp
                    if(maxDriveUp){
                        variantField.max_drive_up = maxDriveUp
                    }
                    if(req.body.variantField.whdSize){
                        let whdSize = {
                            width : req.body.variantField.whdSize.width,
                            height: req.body.variantField.whdSize.height,
                            depth: req.body.variantField.whdSize.depth
                        }
                        if(whdSize.width){
                            variantField.whd_size.width = whdSize.width
                        }
                        if(whdSize.height){
                            variantField.whd_size.height = whdSize.height
                        }
                        if(whdSize.depth){
                            variantField.whd_size.depth = whdSize.depth
                        }
                    }

                    if(req.body.variantField.cpu){
                        let cpu = {
                            brand: req.body.variantField.cpu.brand,
                            name: req.body.variantField.cpu.name,
                            model: req.body.variantField.cpu.model,
                            minRate: req.body.variantField.cpu.minRate
                        }
                        if(cpu.brand){
                            variantField.cpu.brand = cpu.brand
                        }
                        if(cpu.name){
                            variantField.cpu.name = cpu.name
                        }
                        if(cpu.model){
                            variantField.cpu.model = cpu.model
                        }
                        if(cpu.minRate){
                            variantField.cpu.min_rate = cpu.minRate
                        }
                    }

                    if(req.body.variantField.vga){
                        let vga = {
                            brand: req.body.variantField.vga.brand,
                            name: req.body.variantField.vga.name,
                            model: req.body.variantField.vga.model
                        }
                        if(vga.brand){
                            variantField.vga.brand = vga.brand
                        }
                        if(vga.name){
                            variantField.vga.name = vga.name
                        }
                        if(vga.model){
                            variantField.vga.model = vga.model
                        }
                    }

                    if(req.body.variantField.ram){
                        let ram = {
                            type: req.body.variantField.ram.type,
                            storage: req.body.variantField.ram.storage,
                            slots: req.body.variantField.ram.slots
                        }
                        if(ram.brand){
                            variantField.ram.ram_type = ram.type
                        }
                        if(ram.storage){
                            variantField.ram.storage = ram.storage
                        }
                        if(ram.slots){
                            variantField.ram.slots = ram.slots
                        }
                    }
                    if(req.body.variantField.drive){
                        let drive = {
                            type: req.body.variantField.drive.type,
                            model: req.body.variantField.drive.model,
                            storage: req.body.variantField.drive.storage,
                            slots: req.body.variantField.drive.slots
                        }
                        if(drive.type){
                            variantField.drive.drive_type = drive.type
                        }
                        if(drive.name){
                            variantField.drive.model = drive.model
                        }
                        if(drive.storage){
                            variantField.drive.storage = drive.storage
                        }
                        if(drive.slots){
                            variantField.drive.slots = drive.slots
                        }
                    }
                    
                    if(req.body.variantField.screen){
                        let screen = {
                            size: req.body.variantField.screen.size,
                            type: req.body.variantField.screen.type,
                            refreshRate: req.body.variantField.screen.refreshRate,
                            colorRate: req.body.variantField.screen.colorRate,
                            ratio: req.body.variantField.screen.ratio
                        }
                        
                        if(screen.size){
                            variantField.screen.size = screen.size
                        }
                        if(screen.type){
                            variantField.screen.screen_type = screen.type
                        }
                        if(screen.refreshRate){
                            variantField.screen.refresh_rate = screen.refreshRate
                        }
                        if(screen.colorRate){
                            variantField.screen.color_rate = screen.colorRate
                        }
                        if(screen.ratio){
                            variantField.screen.ratio = screen.ratio
                        }

                        if(req.body.variantField.screen.resolution){
                            if(req.body.variantField.screen.resolution.width){
                                variantField.screen.resolution.width = req.body.variantField.screen.resolution.width
                            }
                            if(req.body.variantField.screen.resolution.height){
                                variantField.screen.resolution.height = req.body.variantField.screen.resolution.height
                            }
                        }
                    }
                    
                    if(req.body.variantField.port){
                        let port = {
                            wifi: req.body.variantField.port.wifi,
                            bluetooth: req.body.variantField.port.bluetooth,
                            webcam: req.body.variantField.port.webcam,
                            cardReaderSlots: req.body.variantField.port.cardReaderSlots,
                            jack3p5mmSlots: req.body.variantField.port.jack3p5mmSlots
                        }
                        if(port.wifi){
                            variantField.port.wifi = port.wifi
                        }
                        if(port.bluetooth){
                            variantField.port.bluetooth = port.bluetooth
                        }
                        if(port.webcam){
                            variantField.port.webcam = port.webcam
                        }
                        if(port.cardReaderSlots){
                            variantField.port.cardreader_slots = port.cardReaderSlots
                        }
                        if(port.jack3p5mmSlots){
                            variantField.port.jack3p5mm_slots = port.jack3p5mmSlots
                        }
                        if(req.body.variantField.port.usb1){
                            if(req.body.variantField.port.usb1.type){
                                variantField.port.usb_1.usb_type = req.body.variantField.port.usb1.type
                            }
                            if(req.body.variantField.port.usb1.slots){
                                variantField.port.usb_1.slots = req.body.variantField.port.usb1.slots
                            }
                        }
                        if(req.body.variantField.port.hdmi1){
                                if(req.body.variantField.port.hdmi1.version){
                                    variantField.port.hdmi_1.version = req.body.variantField.port.hdmi1.version
                                }
                                if(req.body.variantField.port.hdmi1.slots){
                                    variantField.port.hdmi_1.slots = req.body.variantField.port.hdmi1.slots
                                }
                        }  
                    }
                    if(req.body.variantField.os){
                        let os = {
                            name: req.body.variantField.os.name,
                            version: req.body.variantField.os.version
                        }
                        if(os.name){
                            variantField.os.name = os.name
                        }
                        if(os.version){
                            variantField.os.version = os.version
                        }
                    }
                    if(req.body.variantField.keyboard){
                        keyboard = {
                            type: req.body.variantField.keyboard.type,
                            led: req.body.variantField.keyboard.led,
                            hasNumpad: req.body.variantField.keyboard.hasNumpad,
                            touchpad: req.body.variantField.keyboard.touchpad
                        }
                        if(keyboard.type){
                            variantField.keyboard.keyboard_type = keyboard.type
                        }
                        if(keyboard.led){
                            variantField.keyboard.led = keyboard.led
                        }
                        if(keyboard.hasNumpad == true || keyboard.hasNumpad == false){
                            variantField.keyboard.has_numpad = keyboard.hasNumpad
                        }
                        if(keyboard.touchpad){
                            variantField.keyboard.touchpad = keyboard.touchpad
                        }
                    }
                    if(req.body.variantField.power){
                        power = {
                            capability: req.body.variantField.power.capability,
                            supply: req.body.variantField.power.supply
                        }
                        if(power.capability){
                            variantField.power.capability = power.capability
                        }
                        if(power.supply){
                            variantField.power.supply = power.supply
                        }
                    }
                    if(req.body.variantField.gears){
                        variantField.gears = []
                        req.body.variantField.gears.forEach(gear => {
                            variantField.gears.push(gear)
                        });
                    }
                }
                
                let sku = "L" + variantField.origin_id + "Y" + variantField.mfg_year.toString() + "C" + variantField.color_id
                variant.sku = sku
                let fieldSave = await variantField.save()
                if(!fieldSave){
                    return res.status(400).json({
                        success: false,
                        message: "Cannot update laptop variant field"
                    })
                }else{
                    let variantSave = await variant.save()
                    if(!variantSave){
                        await LaptopVariantField.findOneAndDelete({variant_field_id: variantFieldId})
                        return res.status(400).json({
                            success: false,
                            message: "Cannot update laptop variant"
                        })
                    }else{
                        return res.status(200).json({
                            success: true,
                            message: "update laptop variant succeeded",
                            variant: variant,
                            fields: variantField
                        })
                    }
                }
            }
        }
        
    } catch (error) {
        return res.status(500).json({
            Error: `Error ${error.message}`
        })
    }
}

const updateCellphoneVariantById = async (req, res, next) => {
    try {
        let variantId = req.params.variantId
        if(!variantId){
            return res.status(400).json({
                success: false,
                message: "Variant ID is required!"
            })
        }else{
            let variant = await CellphoneVariant.findOne({variant_id: variantId})
            if(!variant){
                return res.status(400).json({
                    success: false,
                    message: `Variant with ID ${variantId} is not exist!`
                })
            }else{
                if(req.body.variant){
                    let variantName = req.body.variant.name
                    if(variantName){
                        variant.variant_name = variantName
                    }
                    let price = req.body.variant.price
                    if(price){
                        variant.price = price
                    }
                    promotionId = req.body.variant.promotionId
                    if(promotionId){
                        let promotion = await Promotion.findOne({promotion_id: promotionId})
                        if(!promotion){
                            return res.status(400).json({
                                success: false,
                                message: `Promotion with ID ${promotionId} is not exist`
                            })
                        }else{
                            variant.promotion_id = promotionId
                        }
                    }
                    stock = req.body.variant.stock
                    if(stock && stock > 0){
                        variant.stock += stock
                    }
                }
                
                //Field info
                let variantField = await CellphoneVariantField.findOne({variant_id: variantId})
                console.log(variantField)
                if(req.body.variantField){
                    let mfgYear = req.body.variantField.mfgYear
                    if(mfgYear){
                        variantField.mfg_year = mfgYear
                    }

                    let originId = req.body.variantField.originId
                    if(originId){
                        let origin = await Origin.findOne({origin_id: originId})
                        if(!origin){
                            return res.status(400).json({
                                success: false,
                                message: `Origin with ID ${originId} is not exist`
                            })
                        }else{
                            variantField.origin_id = originId
                        }
            
                    }
                    let weight = req.body.variantField.weight
                    if(weight){
                        variantField.weight = weight
                    }
                    let colorId = req.body.variantField.colorId
                    if(colorId){
                        let color = await Color.findOne({color_id: colorId})
                        if(!color){
                            return res.status(400).json({
                                success: false,
                                message: `Color with ID ${colorId} is not exist`
                            })
                        }else{
                            variantField.color_id = colorId
                        }
                        
                    }
                    let waterResist = req.body.variantField.waterResist
                    if(waterResist){
                        variantField.water_resist = waterResist
                    }
                    let material = req.body.variantField.material
                    if(material){
                        variantField.material = material
                    }
                    let ramStorage = req.body.variantField.ramStorage
                    if(ramStorage){
                        variantField.ram_storage = ramStorage
                    }
                    let gpu = req.body.variantField.gpu
                    if(gpu){
                        variantField.gpu = gpu
                    }
                    if(req.body.variantField.whdSize){
                        let whdSize = {
                            width : req.body.variantField.whdSize.width,
                            height: req.body.variantField.whdSize.height,
                            depth: req.body.variantField.whdSize.depth
                        }
                        if(whdSize.width){
                            variantField.whd_size.width = whdSize.width
                        }
                        if(whdSize.height){
                            variantField.whd_size.height = whdSize.height
                        }
                        if(whdSize.depth){
                            variantField.whd_size.depth = whdSize.depth
                        }
                    }

                    if(req.body.variantField.screen){
                        let screen = {
                            size: req.body.variantField.screen.size,
                            type: req.body.variantField.screen.type,
                            refreshRate: req.body.variantField.screen.refreshRate,
                            brightRate: req.body.variantField.screen.brightRate,
                            touchRate: req.body.variantField.screen.touchRate,
                            material: req.body.variantField.screen.material
                        }
                        
                        if(screen.size){
                            variantField.screen.size = screen.size
                        }
                        if(screen.type){
                            variantField.screen.screen_type = screen.type
                        }
                        if(screen.refreshRate){
                            variantField.screen.refresh_rate = screen.refreshRate
                        }
                        if(screen.brightRate){
                            variantField.screen.bright_rate = screen.brightRate
                        }
                        if(screen.touchRate){
                            variantField.screen.touch_rate = screen.touchRate
                        }
                        if(screen.material){
                            variantField.screen.material = screen.material
                        }

                        if(req.body.variantField.screen.resolution){
                            if(req.body.variantField.screen.resolution.width){
                                variantField.screen.resolution.width = req.body.variantField.screen.resolution.width
                            }
                            if(req.body.variantField.screen.resolution.height){
                                variantField.screen.resolution.height = req.body.variantField.screen.resolution.height
                            }
                        }
                    }

                    if(req.body.variantField.cpu){
                        let cpu = {
                            version: req.body.variantField.cpu.version,
                            name: req.body.variantField.cpu.name,
                            processorNum: req.body.variantField.cpu.processorNum,
                            maxRate: req.body.variantField.cpu.maxRate
                        }
                        if(cpu.version){
                            variantField.cpu.version = cpu.version
                        }
                        if(cpu.name){
                            variantField.cpu.name = cpu.name
                        }
                        if(cpu.processorNum){
                            variantField.cpu.processor_num = cpu.processorNum
                        }
                        if(cpu.maxRate){
                            variantField.cpu.max_rate = cpu.maxRate
                        }
                    }

                    if(req.body.variantField.vga){
                        let vga = {
                            brand: req.body.variantField.vga.brand,
                            name: req.body.variantField.vga.name,
                            model: req.body.variantField.vga.model
                        }
                        if(vga.brand){
                            variantField.vga.brand = vga.brand
                        }
                        if(vga.name){
                            variantField.vga.name = vga.name
                        }
                        if(vga.model){
                            variantField.vga.model = vga.model
                        }
                    }

                    if(req.body.variantField.connectors){
                        let connectors = {
                            wifi: req.body.variantField.connectors.wifi,
                            bluetooth: req.body.variantField.connectors.bluetooth,
                            internet: req.body.variantField.connectors.internet,
                            chargerType: req.body.variantField.connectors.chargerType,
                            hasJack3p5mm: req.body.variantField.connectors.hasJack3p5mm
                        }
                        if(connectors.wifi){
                            variantField.connectors.wifi = connectors.wifi
                        }
                        if(connectors.bluetooth){
                            variantField.connectors.bluetooth = connectors.bluetooth
                        }
                        if(connectors.internet){
                            variantField.connectors.internet = connectors.internet
                        }
                        if(connectors.chargerType){
                            variantField.connectors.charger_type = connectors.chargerType
                        }
                        if(connectors.hasJack3p5mm == true || connectors.hasJack3p5mm == false){
                            variantField.connectors.has_jack3p5mm = connectors.hasJack3p5mm
                        }
                        if(req.body.variantField.connectors.sim){
                            if(req.body.variantField.connectors.sim.type){
                                variantField.connectors.sim.sim_type = req.body.variantField.connectors.sim.type
                            }
                            if(req.body.variantField.connectors.sim.slots){
                                variantField.connectors.sim.slots = req.body.variantField.connectors.sim.slots
                            }
                        }
                        if(req.body.variantField.connectors.gpsSupport){
                            variantField.connectors.gps_support = []
                            req.body.variantField.connectors.gpsSupport.forEach(gps => {
                                variantField.connectors.gps_support.push(gps)
                            });
                        }
                    }
                    if(req.body.variantField.storage){
                        let storage = {
                            rom: req.body.variantField.storage.rom,
                            driveSupport: req.body.variantField.storage.driveSupport,
                            maxDriveSupport: req.body.variantField.storage.maxDriveSupport,
                        }
                        if(storage.rom){
                            variantField.storage.rom = storage.rom
                        }
                        if(storage.driveSupport){
                            variantField.storage.drive_support = storage.driveSupport
                        }
                        if(storage.maxDriveSupport){
                            variantField.storage.max_drive_support = storage.maxDriveSupport
                        }
                    }
                    
                    if(req.body.variantField.camera){
                       if(req.body.variantField.camera.backCamera){
                            variantField.camera.back_camera = []
                            req.body.variantField.camera.backCamera.forEach(camera => {
                                variantField.camera.back_camera.push({
                                    camera_type: camera.type,
                                    resolution: camera.resolution,
                                    video_resolution: camera.videoResolution
                                })
                            });
                       }
                       if(req.body.variantField.camera.frontCamera){
                            variantField.camera.front_camera.camera_type = req.body.variantField.camera.frontCamera.type
                            variantField.camera.front_camera.resolution = req.body.variantField.camera.frontCamera.resolution
                            variantField.camera.front_camera.video_resolution = req.body.variantField.camera.frontCamera.videoResolution
                        }
                    }
                    
                    if(req.body.variantField.power){
                        power = {
                            batteryType: req.body.variantField.power.batteryType,
                            capability: req.body.variantField.power.capability,
                            charger: req.body.variantField.power.charger
                        }
                        if(power.batteryType){
                            variantField.power.battery_type = power.batteryType
                        }
                        if(power.capability){
                            variantField.power.supply = power.capability
                        }
                        if(power.charger){
                            variantField.power.charger = power.charger
                        }
                    }
                    if(req.body.variantField.gears){
                        variantField.gears = []
                        req.body.variantField.gears.forEach(gear => {
                            variantField.gears.push(gear)
                        });
                    }
                }
                let sku = "L" + variantField.origin_id + "Y" + variantField.mfg_year.toString() + "C" + variantField.color_id
                variant.sku = sku
                let fieldSave = await variantField.save()
                if(!fieldSave){
                    return res.status(400).json({
                        success: false,
                        message: "Cannot update cellphone variant field"
                    })
                }else{
                    let variantSave = await variant.save()
                    if(!variantSave){
                        await CellphoneVariantField.findOneAndDelete({variant_field_id: variantFieldId})
                        return res.status(400).json({
                            success: false,
                            message: "Cannot update cellphone variant"
                        })
                    }else{
                        return res.status(200).json({
                            success: true,
                            message: "update laptop cellphone succeeded",
                            variant: variant,
                            fields: variantField
                        })
                    }
                }
            }
        }
        
    } catch (error) {
        return res.status(500).json({
            Error: `Error ${error.message}`
        })
    }
}

const deleteLaptopVariantById = async (req, res, next) => {
    try {
        let variantId = req.params.variantId
        if(!variantId){
            res.status(400).json({
                message: "Variant ID is required"
            })
        }else{
            let variant = await LaptopVariant.findOne({variant_id: variantId})
            let field = await LaptopVariantField.findOne({variant_id: variantId})
            if(!variant || !field){
                res.status(400).json({
                    message: `Laptop variant or field with variant ID ${variantId} is not exist!`
                })
            }else{
                let deleteVariant = await LaptopVariant.findOneAndDelete({variant_id: variantId})
                let deleteField = await LaptopVariantField.findOneAndDelete({variant_id: variantId})
                if(!deleteVariant || !deleteField){
                    if(!deleteVariant){
                        await variant.save()
                    }
                    if(!deleteField){
                        await field.save()
                    }
                    res.status(400).json({
                        message: `Cannot remove Laptop variant with ID ${variantId}!`
                    })
                }else{
                    res.status(200).json({
                        message: `Remove laptop variant with ID ${variantId} succeeded!`,
                    })
                }
            }
        }
    } catch (error) {
        res.status(500).json({
            Error: `Error ${error.message}`
        })
    }
}

const deleteCellphoneVariantById = async (req, res, next) => {
    try {
        let variantId = req.params.variantId
        if(!variantId){
            res.status(400).json({
                message: "Variant ID is required"
            })
        }else{
            let variant = await CellphoneVariant.findOne({variant_id: variantId})
            let field = await CellphoneVariantField.findOne({variant_id: variantId})
            if(!variant || !field){
                res.status(400).json({
                    message: `Cellphone variant or field with variant ID ${variantId} is not exist!`
                })
            }else{
                let deleteVariant = await CellphoneVariant.findOneAndDelete({variant_id: variantId})
                let deleteField = await CellphoneVariantField.findOneAndDelete({variant_id: variantId})
                if(!deleteVariant || !deleteField){
                    if(!deleteVariant){
                        await variant.save()
                    }
                    if(!deleteField){
                        await field.save()
                    }
                    res.status(400).json({
                        message: `Cannot remove Cellphone variant with ID ${variantId}!`
                    })
                }else{
                    res.status(200).json({
                        message: `Remove cellphone variant with ID ${variantId} succeeded!`,
                    })
                }
            }
        }
    } catch (error) {
        res.status(500).json({
            Error: `Error ${error.message}`
        })
    }
}

module.exports = {
    getAllCellphoneVariantsByProductId,
    getAllLaptopVariantsByProductId,
    getLaptopVariantById,
    getCellphoneVariantById,
    createLaptopVariant,
    createCellphoneVariant,
    updateLaptopVariantById,
    updateCellphoneVariantById,
    deleteLaptopVariantById,
    deleteCellphoneVariantById
}