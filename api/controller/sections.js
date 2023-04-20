const Section = require('../models/sections');

exports.CreateNewSection = (req, res, next) =>{
    try{

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status:500,
            error: err
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
}