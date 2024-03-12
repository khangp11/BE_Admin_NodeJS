const DB = require('../../configs/database');

const slideShowService = {
    findAll: async () => {
        try {
            const data = await DB('slideshow');
            if (data.length > 0) {
                return { success: true, message: "Danh sách slideshow đã được tìm thấy.", data: data };
            } else {
                return { success: false, message: "Không tìm thấy bất kỳ slideshow nào." };
            }
        } catch (error) {
            console.error("Error in findAll:", error);
            throw error;
        }
    },
    findById: async (id) => {
        try {
            const data = await DB('slideshow').where('id', id).first();
            if (data) {
                return { success: true, message: "slideshow đã được tìm thấy.", data: data };
            } else {
                return { success: false, message: "Không tìm thấy slideshow với ID đã cho." };
            }
        } catch (error) {
            console.error("Error in findById:", error);
            throw error;
        }
    },

    create: async (data) => {
        try {
            const newData = await DB('slideshow').insert(data);
            if (newData.length > 0) {
                return { success: true, message: "slideshow đã được tạo mới thành công.", data: newData };
            } else {
                return { success: false, message: "Không thể tạo mới slideshow." };
            }
        } catch (error) {
            console.error("Error in create:", error);
            throw error;
        }
    },
    delete: async (id) => {
        try {
            const result = await DB('slideshow').where('id', id).del();
            if (result) {
                return { success: true, message: "slideshow đã được xóa thành công." };
            } else {
                return { success: false, message: "Không thể xóa slideshow." };
            }
        } catch (error) {
            console.error("Error in delete:", error);
            throw error;
        }
    },
    update: async (id, data) => {
        try {
            const updatedData = await DB('slideshow').where('id', id).update(data);
            if (updatedData !== null) {
                return { success: true, message: "slideshow đã được cập nhật thành công.", data: updatedData[0] };
            } else {
                return { success: false, message: "Không thể cập nhật slideshow." };
            }
        } catch (error) {
            console.error("Error in update:", error);
            throw error;
        }
    }
};
module.exports = slideShowService;
