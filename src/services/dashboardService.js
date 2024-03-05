const DB = require('../configs/database');

const dashboardService = {
    findAll: async () => {
        try {
            const data = await DB('news');
            return data;
        } catch (error) {
            console.error("Error in findAll function of dashboardService:", error);
            throw error;
        }
    },
    findById: async (id) => {
        try {
            const data = await DB('news').where('id', id).first();
            return data;
        } catch (error) {
            console.error("Error in findById function of dashboardService:", error);
            throw error;
        }
    },
    create: async (data) => {
        try {
            const newData = await DB('news').insert(data);
            return newData;
        } catch (error) {
            console.error("Error in create function of dashboardService:", error);
            throw error;
        }
    },
    delete: async (id) => {
        try {
            const result = await DB('news').where('id', id).del();
            return result;
        } catch (error) {
            console.error("Error in delete function of dashboardService:", error);
            throw error;
        }
    },
    update: async (id, data) => {
        try {
            const updatedData = await DB('news').where('id', id).update(data, { returning: true });
            return updatedData[0];
        } catch (error) {
            console.error("Error in update function of dashboardService:", error);
            throw error;
        }
    }
};

module.exports = dashboardService;
