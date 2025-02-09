const mongoose = require("mongoose")

const cellphoneVariantFieldSchema = new mongoose.Schema({
    variant_field_id: {
        type: String,
        required: true,
        unique: true
    },
    variant_id: {
        type: String,
        required: true,
        unique: true
    },
    mfg_year: {
        type: Number,
        required: true
    },
    origin_id: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    color_id: {
        type: String,
        required: true
    },
    water_resist: {
        type: String
    },
    material: {
        type: String,
        required: true
    },
    ram_storage: {
        type: String,
        required: true
    },
    gpu: {
        type: String
    },
    whd_size: {
        width: Number,
        height: Number,
        depth: Number
    },
    screen: {
        size: String,
        screen_type: String,
        resolution: {
            width: Number,
            height: Number
        },
        refresh_rate: Number,
        bright_rate: String,
        touch_rate: String,
        material: String
    },
    cpu: {
        version: String,
        name: String,
        processor_num: Number,
        max_rate: String
    },
    connectors: {
        wifi: String,
        bluetooth: String,
        sim: {
            sim_type: String,
            slots: Number
        },
        internet: String,
        charger_type: String,
        has_jack3p5mm: Boolean,
        gps_support: [String]
    },
    storage: {
        rom: String,
        drive_support: String,
        max_drive_support: Number
    },
    camera: {
        back_camera: [{
            camera_type: String,
            resolution: String,
            video_resolution: String
        }],
        front_camera: {
            camera_type:String,
            resolution: String,
            video_resolution: String
        }
    },
    power: {
        battery_type: String,
        capability: Number,
        charger: String
    },
    gears:[
        String
    ]
    
})

const cellphoneVariantFieldModel = mongoose.model("Cellphone_Variant_Field", cellphoneVariantFieldSchema)

module.exports = cellphoneVariantFieldModel