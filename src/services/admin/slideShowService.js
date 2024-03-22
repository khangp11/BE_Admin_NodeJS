const DB = require('../../configs/database');

const slideShowService = {
    findAll: async () => {
        try {
            const data = await DB('slideshow');
            return data;
        } catch (error) {
            console.error("Error in findAll:", error);
            throw error;
        }
    },
    findById: async (id) => {
        try {
            const data = await DB('slideshow').where('id', id).first();
            return data;
        } catch (error) {
            console.error("Error in findById:", error);
            throw error;
        }
    },

    create: async (data) => {
        try {
            const newData = await DB('slideshow').insert(data);
            return data;
        } catch (error) {
            console.error("Error in create:", error);
            throw error;
        }
    },
    delete: async (id) => {
        try {
            const result = await DB('slideshow').where('id', id).del();
            return data;
        } catch (error) {
            console.error("Error in delete:", error);
            throw error;
        }
    },
    update: async (id, data) => {
        try {
            const updatedData = await DB('slideshow').where('id', id).update(data);
            return data;
        } catch (error) {
            console.error("Error in update:", error);
            throw error;
        }
    }
};
module.exports = slideShowService;
