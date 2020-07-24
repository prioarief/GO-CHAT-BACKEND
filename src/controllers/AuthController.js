const { genSaltSync, compareSync, hashSync } = require('bcrypt');
const AuthModel = require('../models/Auth');
const validate = require('../helpers/validation');
module.exports = {
	register: async (req, res) => {
		const data = req.body;
		try {
			const validation = validate.AuthValidation(data);
			if (validation.error === undefined) {
				data.password = hashSync(req.body.password, genSaltSync(1));
				const result = await AuthModel.Register(data);
				if(result){
                    return res.status(200).json({
                        success: true,
                        message: 'Register Success',
                        data: result,
                    });
                }
                return res.status(400).json({
                    success: false,
					message: 'Register Failled',
				});
			}
            let errorMessage = validation.error.details[0].message;
            errorMessage = errorMessage.replace(/"/g, '');
            return res.status(502).json({
                success: false,
                message: errorMessage,
            });
		} catch (error) {
			return res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
		}
	},
};
