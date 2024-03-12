const DB = require('../../configs/database');

const langsService = {
    findAll: async () => {
        try {
            const data = await DB('languages');
            if (data.length > 0) {
                return { success: true, message: "Danh sách ngôn ngữ đã được tìm thấy.", data: data };
            } else {
                return { success: false, message: "Không tìm thấy bất kỳ ngôn ngữ nào." };
            }
        } catch (error) {
            console.error("Error in findAll:", error);
            throw error;
        }
    },
    findById: async (id) => {
        try {
            const data = await DB('languages').where('id', id).first();
            if (data) {
                return { success: true, message: "Ngôn ngữ đã được tìm thấy.", data: data };
            } else {
                return { success: false, message: "Không tìm thấy ngôn ngữ với ID đã cho." };
            }
        } catch (error) {
            console.error("Error in findById:", error);
            throw error;
        }
    },
    create: async (data) => {
        try {
            const newData = await DB('languages').insert(data);
            if (newData.length > 0) {
                return { success: true, message: "Ngôn ngữ đã được thêm mới thành công.", data: newData };
            } else {
                return { success: false, message: "Không thể thêm mới ngôn ngữ." };
            }
        } catch (error) {
            console.error("Error in create:", error);
            throw error;
        }
    },
    delete: async (id) => {
        try {
            const result = await DB('languages').where('id', id).del();
            if (result) {
                return { success: true, message: "Ngôn ngữ đã được xóa thành công." };
            } else {
                return { success: false, message: "Không thể xóa ngôn ngữ." };
            }
        } catch (error) {
            console.error("Error in delete:", error);
            throw error;
        }
    },
    update: async (id, data) => {
        try {
            const updatedData = await DB('languages').where('id', id).update(data);
            if (updatedData) {
                return { success: true, message: "Thông tin ngôn ngữ đã được cập nhật thành công.", data: updatedData[0] };
            } else {
                return { success: false, message: "Không thể cập nhật thông tin ngôn ngữ." };
            }
        } catch (error) {
            console.error("Error in update:", error);
            throw error;
        }
    }
};
module.exports = langsService;
