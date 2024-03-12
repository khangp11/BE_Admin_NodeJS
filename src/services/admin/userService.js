const DB = require('../../configs/database');

const userService = {
    findAll: async () => {
        try {
            const data = await DB('users');
            if (data.length > 0) {
                return { success: true, message: "Danh sách người dùng đã được tìm thấy.", data: data };
            } else {
                return { success: false, message: "Không tìm thấy bất kỳ người dùng nào." };
            }
        } catch (error) {
            console.error("Error in findAll:", error);
            throw error;
        }
    },
    findById: async (id) => {
        try {
            const data = await DB('users').where('id', id).first();
            if (data) {
                return { success: true, message: "Người dùng đã được tìm thấy.", data: data };
            } else {
                return { success: false, message: "Không tìm thấy người dùng với ID đã cho." };
            }
        } catch (error) {
            console.error("Error in findById:", error);
            throw error;
        }
    },
    findByUsername: async (username) => {
        try {
            const data = await DB('users').where('username', username).first();
            if (data) {
                return { success: true, message: "Người dùng đã được tìm thấy.", data: data };
            } else {
                return { success: false, message: "Không tìm thấy người dùng với username người dùng đã cho." };
            }
        } catch (error) {
            console.error("Error in findByUsername:", error);
            throw error;
        }
    },
    create: async (data) => {
        try {
            const newData = await DB('users').insert(data);
            if (newData.length > 0) {
                return { success: true, message: "Người dùng đã được tạo mới thành công.", data: newData };
            } else {
                return { success: false, message: "Không thể tạo mới người dùng." };
            }
        } catch (error) {
            console.error("Error in create:", error);
            throw error;
        }
    },
    delete: async (id) => {
        try {
            const result = await DB('users').where('id', id).del();
            if (result) {
                return { success: true, message: "Người dùng đã được xóa thành công." };
            } else {
                return { success: false, message: "Không thể xóa người dùng." };
            }
        } catch (error) {
            console.error("Error in delete:", error);
            throw error;
        }
    },
    update: async (id, data) => {
        try {
            const updatedData = await DB('users').where('id', id).update(data);
            if (updatedData !== null) {
                return { success: true, message: "Người dùng đã được cập nhật thành công.", data: updatedData[0] };
            } else {
                return { success: false, message: "Không thể cập nhật người dùng." };
            }
        } catch (error) {
            console.error("Error in update:", error);
            throw error;
        }
    }
};
module.exports = userService;
