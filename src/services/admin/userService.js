const DB = require('../../configs/database');

const userService = {
    findAll: async () => {
        try {
            const data = await DB('users');
            return data;
        } catch (error) {
            console.error("Error in findAll:", error);
            throw error;
        }
    },
    findById: async (id) => {
        try {
            const data = await DB('users').where('id', id).first();
            return data;
        } catch (error) {
            console.error("Error in findById:", error);
            throw error;
        }
    },
    findByUsername: async (username) => {
        try {
            const data = await DB('users').where('username', username).first();
            return data;
        } catch (error) {
            console.error("Error in findByUsername:", error);
            throw error;
        }
    },
    create: async (newUserData) => {
        try {
            const newData = await DB('users').insert(newUserData);
            return newData;
        } catch (error) {
            console.error("Error in create:", error);
            throw error;
        }
    },
    delete: async (id) => {
        try {
            const result = await DB('users').where('id', id).del();
            return result;
        } catch (error) {
            console.error("Error in delete:", error);
            throw error;
        }
    },
    update: async (id, data) => {
        try {
            const updatedData = await DB('users').where('id', id).update(data, { returning: true });
            return updatedData[0];
        } catch (error) {
            console.error("Error in update:", error);
            throw error;
        }
    }
};

module.exports = userService;
