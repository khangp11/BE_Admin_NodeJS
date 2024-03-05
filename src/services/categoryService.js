const DB = require('../configs/database');

const categoryService = {
    findAll: async () => {
        try {
            const categories = await DB("categories");
            return categories;
        } catch (error) {
            console.error("Error in findAll function of categoryService:", error);
            throw error;
        }
    },
    findById: async (ID) => {
        try {
            const category = await DB("categories").where('id', ID);
            console.log(ID);
            return category;
        } catch (error) {
            console.error("Error in findById function of categoryService:", error);
            throw error;
        }
    },
    create: async (categoryData) => {
        try {
            const newCategory = await DB('categories').insert(categoryData).returning('*');
            return newCategory;
        } catch (error) {
            console.error("Error in create function of categoryService:", error);
            throw error;
        }
    },
    delete: async (id) => {
        try {
            const result = await knex('categories').where({ id }).del();
            return result;
        } catch (error) {
            console.error("Error in delete function of categoryService:", error);
            throw error;
        }
    },
    update: async (id, categoryData) => {
        try {
            const updatedCategory = await knex('categories').where({ id }).update(categoryData, { returning: true });
            return updatedCategory[0];
        } catch (error) {
            console.error("Error in update function of categoryService:", error);
            throw error;
        }
    }
};

module.exports = categoryService;
