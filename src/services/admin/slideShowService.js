const DB = require('../../configs/database');

const slideShowService = {
    findAll: async (status, title, start, end) => {
        try {
            let data = DB('slideshow').limit(start).offset(end);

            if (status) {
                data = data.where('slideshow.status', status);
            }
            if (title) {
                data = data.where('slideshow.name', 'like', `%${title}%`);
            }

            const result = await data;

            return result;
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
            return result;
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
