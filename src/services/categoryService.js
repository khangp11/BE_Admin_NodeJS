const DB = require('../configs/database');

const categoryService = {
    findAll: async () => {
        const VIETNAMESE_LANG_ID = 1;
        try {
            const categories = await DB('categories')
                .join('categories_lang', 'categories.id', '=', 'categories_lang.cat_id')
                .where('categories_lang.lang_id', VIETNAMESE_LANG_ID)
                .select('categories.id', 'categories.company_id', 'categories.parent_id', 'categories.image', 'categories.status', 'categories.sort_order', 'categories.updated_at', 'categories.created_at', 'categories.file', 'categories_lang.name as name');
            return categories;
        } catch (error) {
            console.error('Error fetching Vietnamese news categories:', error);
            return [];
        }
    },
    findById: async (ID) => {
        const VIETNAMESE_LANG_ID = 1;
        try {
            const category = await DB('categories')
                .join('categories_lang', 'categories.id', '=', 'categories_lang.cat_id')
                .where('categories_lang.lang_id', VIETNAMESE_LANG_ID)
                .where('categories.id', ID)
                .select('categories.id', 'categories.company_id', 'categories.parent_id', 'categories.image', 'categories.status', 'categories.sort_order', 'categories.updated_at', 'categories.created_at', 'categories.file', 'categories_lang.name as name')
                .first();
            return category;
        } catch (error) {
            console.error('Error fetching Vietnamese news category by ID:', error);
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
    update: async (id, name, status) => {
        try {
            const result1 = await DB('categories_lang').where({ cat_id: id }).update({ name });
            const result2 = await DB('categories').where({ id }).update({ status: status });
            return { result1, result2 };
        } catch (error) {
            console.error('Lỗi khi cập nhật danh mục:', error);
            throw error;
        }
    },
    search: async (name) => {
        try {
            if (name != "") {
                const dataSearch = await DB("categories_lang").where("name", "like", `%${name}%`);
                return dataSearch;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Lỗi khi tìm kiếm danh mục:", error);
            throw error;
        }
    }

};
module.exports = categoryService;
