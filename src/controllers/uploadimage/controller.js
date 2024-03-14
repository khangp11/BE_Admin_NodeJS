const cloudinaryService = require('../uploadimage/cloudinaryService');

const uploadController = {
    uploadFile: async (req, res) => {
        try {
            const user_id = req.user_id;
            const company_id = req.companyInfo;
            const url = await cloudinaryService.uploadFile(req.file, user_id, company_id);
            return res.json({ url });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Upload failed' });
        }
    },
};

module.exports = uploadController;