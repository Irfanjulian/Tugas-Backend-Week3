const validate = (req, res, next)=>{
    const stock = req.body.stock

    if(stock < 1){
        res.json({
            message: 'Stok tidak boleh kosong'
        })
    }
    next()
}

module.exports = {
    validate
}