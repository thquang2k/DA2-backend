const mongoose = require('mongoose')

const laptopVariantFieldSchema = new mongoose.Schema({
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
    part_number: {
        type: String,
        required: true  
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
    material: {
        type: String,
        required: true
    },
    max_ram_up: {
        type: String
    },
    max_drive_up: {
        type: String
    },
    whd_size: {
        width: Number,
        height: Number,
        depth: Number
    },
    cpu: {
        brand: String,
        name: String,
        model: String,
        min_rate: Number
    },
    vga: {
        brand: String,
        name: String,
        model: String
    },
    ram: {
        ram_type: String,
        storage: String,
        slots: Number,
    },
    drive: {
        drive_type: String,
        model: String,
        storage: String,
        slots: Number
    },
    screen: {
        size: Number,
        screen_type: String,
        resolution: {
            width: Number,
            height: Number
        },
        refresh_rate: Number,
        color_rate: String,
        ratio: String
    },
    port: {
        wifi: String,
        bluetooth: String,
        webcam: String,
        usb_1: {
            usb_type: String,
            slots: Number
        },
        usb_2: {
            usb_type: String,
            slots: Number
        },
        hdmi_1: {
            version: String,
            slots: Number
        },
        hdmi_2: {
            version: String,
            slots: Number
        },
        cardreader_slots: Number,
        jack3p5mm_slots: Number
    }
    ,
    os:{
        name: String,
        version: String
    },
    keyboard: {
        keyboard_type: String,
        led: String,
        has_numpad: Boolean,
        touchpad: String
    },
    power: {
        capability: String,
        supply: String
    }
})

const laptopVariantFieldModel = mongoose.model("Laptop_Variant_Field", laptopVariantFieldSchema)

module.exports = laptopVariantFieldModel