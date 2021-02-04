const errObj = (e) => ({
    success: false,
    msg: e.message,
    data: {
        error: e
    }
})

module.exports = {
    errObj
}