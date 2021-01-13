
const me = async (req, res) => {
    res.json({
        success: true,
        msg: 'HOORRAY',
        data: {
            user: {
                some: 'thing'
            }
        }
    })
}

module.exports = {
    me
}