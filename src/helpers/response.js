module.exports = {
    response : (res, status, data, statusCode) => {
        const result = {
            data: data || null,
            success: status || false,
            status : statusCode
        }

        return res.status(result.status).json({
            success: result.success,
            data: data
        })
    }
}