const DB = require('../../configs/database');

const langsService = {
    findAll: async (start, end) => {
        try {
            const data = await DB('languages').limit(start).offset(end);
            return data;
        } catch (error) {
            console.error("Error in findAll:", error);
            throw error;
        }
    },
    findById: async (id) => {
        try {
            const data = await DB('languages').where('id', id).first();
            return data;
        } catch (error) {
            console.error("Error in findById:", error);
            throw error;
        }
    },
    create: async (data) => {
        try {
            const newData = await DB('languages').insert(data);
            return newData;
        } catch (error) {
            console.error("Error in create:", error);
            throw error;
        }
    },
    delete: async (id) => {
        try {
            const result = await DB('languages').where('id', id).del();
            return result;
        } catch (error) {
            console.error("Error in delete:", error);
            throw error;
        }
    },
    update: async (id, data) => {
        try {
            const updatedData = await DB('languages').where('id', id).update(data);
            return updatedData;
        } catch (error) {
            console.error("Error in update:", error);
            throw error;
        }
    }
};
module.exports = langsService;
