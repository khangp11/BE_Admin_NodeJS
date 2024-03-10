const DB = require('../../configs/database');

const menuService = {
    findAll: async () => {
        try {
            const data = await DB('menu_type');
            return data;
        } catch (error) {
            console.error("Error in findAll:", error);
            throw error;
        }
    },
    findById: async (id) => {
        try {
            const data = await DB('menu_type').where('id', id).first();
            return data;
        } catch (error) {
            console.error("Error in findById:", error);
            throw error;
        }
    },
    create: async (data) => {
        try {
            const newData = await DB('menu_type').insert(data);
            return newData;
        } catch (error) {
            console.error("Error in create:", error);
            throw error;
        }
    },
    delete: async (id) => {
        try {
            const result = await DB('menu_type').where('id', id).del();
            return result;
        } catch (error) {
            console.error("Error in delete:", error);
            throw error;
        }
    },
    update: async (id, data) => {
        try {
            const updatedData = await DB('menu_type').where('id', id).update(data);
            return updatedData[0];
        } catch (error) {
            console.error("Error in update function of dashboardService:", error);
            throw error;
        }
    }
};

module.exports = menuService;
