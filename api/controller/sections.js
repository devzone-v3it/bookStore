const Section = require('../models/sections');
const Book = require('../models/books');
const mongoose = require('mongoose');

exports.CreateNewSection = async (req, res, next) =>{
    try{
        const section = await Section.findOne({sectionCode: req.params.sectionCode}).exec();

        if(!section){
            const book = await Book.findOne({_id: req.body.bookId}).exec();

            if(book){
                const newSection = new Section({
                    _id: new mongoose.Types.ObjectId(),
                    sectionCode: req.body.sectionCode,
                    book: req.body.bookId,
                    quantity: req.body.quantity
                });

                await newSection.save();

                await res.status(201).json({
                    status: 201,
                    message: `New section ${newSection._id} has been added to the store with quantity of ${newSection.quantity} books`,
                    request: {
                        type: 'GET',
                        url: '/books/'+ newSection.book
                    }
                });
            }
            else{
                res.status(404).json({
                    status: 404,
                    message: 'New section could not be added as the corresponding book does not exist.',
                    request:{
                        doc: 'add new books using below params',
                        type: 'POST',
                        url: '/books/'+ req.body.bookId
                    }
                })
            }
        }
        else{
            res.status(404).json({
                status: 404,
                message: 'New section could not be added as the corresponding book does not exist.',
                request: {
                    doc: 'Get list of all secions',
                    type: 'GET',
                    url: '/sections'
                }
            });
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status:500,
            error: err + " in POST /sections"
        })
    }
}

exports.GetSection_all = async (req, res, next) => {

    try{
        const sections = await Section.find({}).exec();
        await res.status(200).json({
            count: sections.length,
            sections: sections.map(section => {
                return {
                    _id: section._id,
                    sectionCode: section.sectionCode,
                    bookId: section.book,
                    quantity: section.quantity,
                    request: {
                        type: 'GET',
                        url: 'sections/' + section._id 
                    }
                }
            })
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status: 500,
            error: err
        });
    }
};

exports.GetSection_usingSectionId = async (req, res, next) => {
    try{
        const section = await Section.findOne({_id: req.params.sectionId}).exec();
        await res.status(200).json({
            _id: section._id,
            sectionCode: section.sectionCode,
            bookId: section.book,
            quantity: section.quantity,
            request: {
                type: 'GET',
                url: 'localhost:3000/sections/'
            }
        })
    }
    catch(err){
        console.log(err);
        res.status(200).json({
            status: 200,
            error: err
        })
    }
};

exports.DeleteSection_usingSectionId = async (req, res, next) => {
    try{
        const section = await Section.findOne({_id: req.params.sectionId}).exec();
        if(section){
            await Section.deleteOne({_id: req.params.sectionId}).exec();

            res.status(204).json({
                status: 204,
                message: "Section deleted successfully.",
                request: {
                    type: "POST",
                    url: "/sections",
                    params: {
                        sectionCode: "<String>",
                        bookId: "<string>",
                        quantity: "<Number>"
                    },
                    doc: "To create new section"
                }
            })
        }
        else{   
            res.status(404).json({
                status:404,
                message: "Section you want to delete does not exist",
                request: {
                    doc: "To get _id, please search the below path",
                    type: 'GET',
                    url: "/sections"
                }
            })

        }
    }
    catch (err) {
        res.status(500).json({
            status: 500,
            message: err + " in DELETE /sections"
        })
    }
}