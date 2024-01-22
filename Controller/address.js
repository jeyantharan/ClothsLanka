const addressModel = require('../Model/address')

exports.add_address = async(req,res)=>{
    try {
        let Address = new addressModel(req.body);
        Address.userId = req.user.id;
        let saveDetail = await Address.save();
        res.status(200).send({msg:"Address added successfully",Address:saveDetail})
    } catch (error) {
        if(error) throw error;
    }
}
