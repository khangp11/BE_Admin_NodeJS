const DB = require('../../configs/database');

const userService = {
    update: async (id, data) => {
        try {
            const updatedData = await DB('site_config').where('id', id).update(data);
            if (updatedData !== null) {
                return { success: true, message: "Site đã được cập nhật thành công.", data: updatedData[0] };
            } else {
                return { success: false, message: "Không thể cập nhật Site." };
            }
        } catch (error) {
            console.error("Error in update:", error);
            throw error;
        }
    }
};
module.exports = userService;
