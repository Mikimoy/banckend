import Product from "../models/ProductModels.js";
import path from "path";
import fs from "fs";

export const getProduct = async(req, res) => {
    try {
        const response = await Product.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.massage);
    }
}

export const getProductById = async(req, res) => {
    try {
        const response = await Product.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.massage);
    }
}

export const createProduct = async(req, res) => {

    if(req.files === null) return res.status(400).json({msg:"No File Uploaded"});
    const name = req.body.title;
    const price = req.body.price;
    const desc = req.body.desc;
    const filosofi = req.body.filosofi;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.name + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg:"Invalid Images"});
    if(fileSize > 5000000) return res.status(422).json({msg:"File Must be Less 5MB"});
    
    file.mv(`./public/images/${fileName}`, async(err) =>{
        if(err) return res.status(500).json({msg: err.massage});
        try {
            await Product.create({name: name, image: fileName, url: url, price: price, desc: desc, filosofi: filosofi});
            res.status(201).json({msg:"Created Succesfully"});
        } catch (error) {
            console.log(error.massage);
        }
    })
}

export const updateProduct = async(req, res) => {

    const response = await Product.findOne({
        where:{
            id: req.params.id
        }
    });
    if(!Product) return res.status(404).json({msg:"No Data Found"});

    let fileName = "";
        if(req.files === null){
            fileName = product.image;
        }else{
            const file = req.files.file;
            const fileSize = file.data.length;
            const ext = path.extname(file.name);
            fileName = file + ext;
            const allowedType = [".png", ".jpg", ".jpeg"];

            if(!allowedType.includes(ext.toLocaleLowerCase())) return res.status(422).json({msg:"Invalid Images"});
            if(fileSize > 5000000) return res.status(422).json({msg:"File Must Less Then 5MM"});

            const filepath = `./public/images/${Product.image}`;
            fs.unlinkSync(filepath);

            file.mv(`./public/images/${fileName}`, (err) => {
                if(err) return res.status(500).json({msg: err.massage});
            });
        }

        const url = `${req.protocol}://${req.get("host")/images/{fileName}}`;
        const name = req.body.title;
        const price = req.body.price;
        const desc = req.body.desc;
        const filosofi = req.body.filosofi;

    try {
        await Product.update({name: name, image: fileName, url: url, price: price, desc: desc, filosofi: filosofi},{
            while:{
                id: req.params.id
            }
        })
        res.status(200).json({msg:"Update Product Sucessfully"});
    } catch (error) {
        console.log(error.massage);
    }
}


export const deleteProduct = async(req, res) => {
    const product = await Product.findOne({
        where:{
            id: req.params.id
        }
    });
    if(!product) return res.status(422).json({msg:"No Data Found"});

    try {
        const filepath = `./public/images/${product.image}`;
        fs.unlinkSync(filepath);
        await Product.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg:"Delete Product sucesfully"});
    } catch (error) {
        console.log(error.massage);
    }
}


