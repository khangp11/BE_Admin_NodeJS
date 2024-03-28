const DB = require('../../configs/database');

const userService = {
    findAll: async (infor, role, start, end) => {
        try {
            const query = DB('users')
            if (role) {
                query.where('role_id', role)
            }
            if (infor) {
                query.where(function () {
                    this.whereILike('users.fullname', `%${infor}%`)
                        .orWhereILike('users.username', `%${infor}%`)
                        .orWhereILike('users.id', `%${infor}%`)
                        .orWhereILike('users.email', `%${infor}%`);
                })
            }
            return query;
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
    findByUsername: async (email) => {
        try {
            const data = await DB('users').where('email', email).first();
            return data;
        } catch (error) {
            console.error("Error in findByUsername:", error);
            throw error;
        }
    },
    create: async (data) => {
        try {
            const newData = await DB('users').insert(data);
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
            const updatedData = await DB('users').where('id', id).update(data);
            return updatedData;
        } catch (error) {
            console.error("Error in update:", error);
            throw error;
        }
    }
};
module.exports = userService;
