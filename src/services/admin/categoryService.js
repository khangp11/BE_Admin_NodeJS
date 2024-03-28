const DB = require('../../configs/database');

const currentDate = new Date();

const categoryService = {
    findAll: async (options, start, end) => {
        try {
            if (!options) {
                throw new Error('Options are required for findAll.');
            }
            const { status, title } = options;
            let query = DB('categories').limit(end).offset(start)
                .join('categories_lang', 'categories.id', '=', 'categories_lang.cat_id')
                .whereIn('categories_lang.lang_id', [1, 2]);
            if (status) {
                query.where('categories.status', status);
            }

            if (title) {
                query.where('categories_lang.name', 'like', `%${title}%`);
            }
            const categories = await query
                .select(
                    'categories.id',
                    'categories.parent_id',
                    'categories.image',
                    'categories.status',
                    'categories.sort_order',
                    'categories.updated_at',
                    'categories.created_at',
                    'categories.file',
                    DB.raw('MAX(CASE WHEN categories_lang.lang_id = 1 THEN categories_lang.name END) AS name_vn'),
                    DB.raw('MAX(CASE WHEN categories_lang.lang_id = 1 THEN categories_lang.description END) AS description_vn'),
                    DB.raw('MAX(CASE WHEN categories_lang.lang_id = 2 THEN categories_lang.name END) AS name_en'),
                    DB.raw('MAX(CASE WHEN categories_lang.lang_id = 2 THEN categories_lang.description END) AS description_en')
                )
                .groupBy('categories.id');

            return categories.map(category => ({
                id: category.id,
                parent_id: category.parent_id,
                image: category.image,
                status: category.status,
                sort_order: category.sort_order,
                updated_at: category.updated_at,
                created_at: category.created_at,
                file: category.file,
                name: category.name_vn,
                description: category.description_vn,
                name_en: category.name_en,
                description_en: category.description_en
            }));
        } catch (error) {
            console.error('Error fetching news categories:', error);
            return [];
        }
    },



    findById: async (ID) => {
        try {
            const category = await DB('categories')
                .join('categories_lang as cl_vn', function () {
                    this.on('categories.id', '=', 'cl_vn.cat_id').andOn('cl_vn.lang_id', '=', 1);
                })
                .join('categories_lang as cl_en', function () {
                    this.on('categories.id', '=', 'cl_en.cat_id').andOn('cl_en.lang_id', '=', 2);
                })
                .where('categories.id', ID)
                .select(
                    'categories.id',
                    'categories.parent_id',
                    'categories.image',
                    'categories.status',
                    'categories.sort_order',
                    'categories.updated_at',
                    'categories.created_at',
                    'categories.file',
                    'cl_vn.name as name_vn',
                    'cl_vn.description as description_vn',
                    'cl_en.name as name_en',
                    'cl_en.description as description_en'
                )
                .first();

            return {
                id: category.id,
                parent_id: category.parent_id,
                image: category.image,
                status: category.status,
                sort_order: category.sort_order,
                updated_at: category.updated_at,
                created_at: category.created_at,
                file: category.file,
                name: category.name_vn,
                description: category.description_vn,
                name_en: category.name_en,
                description_en: category.description_en
            };
        } catch (error) {
            console.error('Error fetching news category by ID:', error);
            throw error;
        }
    },

    create: async (categoryData) => {
        try {
            const categoriesData = {
                company_id: categoryData.company_id,
                parent_id: categoryData.parent_id,
                image: categoryData.image,
                status: categoryData.status,
                sort_order: categoryData.sort_order,
                updated_at: currentDate,
                created_at: currentDate,
                file: categoryData.file
            }
            const newCategory = await DB('categories').insert(categoriesData).returning('id');

            const categoryId = newCategory[0];

            const dataLang = categoryData.obj_lang;
            for (let item of dataLang) {
                const langData = {
                    company_id: categoryData.company_id,
                    cat_id: categoryId,
                    lang_id: item.lang_id,
                    name: item.name,
                    description: item.description
                };
                const newCategoryLang = await DB('categories_lang').insert(langData).returning('*');
            }
            return { success: true, message: "Danh mục đã được tạo thành công." };
        } catch (error) {
            console.error("Error in create function of categoryService:", error);
            throw error;

        }
    },
    delete: async (id) => {
        try {
            const isCategoryUsedInNews = await DB('news_categories').where({ cat_id: id }).first();
            if (isCategoryUsedInNews) {
                return { status: 400, body: { success: false, message: "Không thể xóa danh mục vì nó đang được sử dụng trong bài tin." } };
            }
            const result1 = await DB('categories').where({ id }).del();
            const result2 = await DB('categories_lang').where({ cat_id: id }).del();
        } catch (error) {
            console.error("Error in delete function of categoryService:", error);
            throw error;
        }
    },
    update: async (id, categoryData) => {
        try {
            const result = await DB('categories').where({ id }).update({
                company_id: categoryData.company_id,
                parent_id: categoryData.parent_id,
                image: categoryData.image,
                status: categoryData.status,
                sort_order: categoryData.sort_order,
                updated_at: currentDate,
                file: categoryData.file
            });

            const dataLang = categoryData.obj_lang;

            for (let item of dataLang) {
                let exitCatLang = await DB('categories_lang').where({ lang_id: item.lang_id, cat_id: id }).first();
                const langData = {
                    company_id: categoryData.company_id,
                    lang_id: item.lang_id,
                    name: item.name,
                    description: item.description
                };
                if (exitCatLang != null) {
                    const result = await DB('categories_lang').where({ id: exitCatLang.id }).update(langData);
                } else {
                    const result = await DB('categories_lang').insert(langData);
                }
            }
            if (result) {
                return { success: true, message: "Danh mục đã được cập nhật thành công." };
            } else {
                return { success: false, message: "Không thể cập nhật danh mục." };
            }
        } catch (error) {
            console.error('Error in update function of categoryService:', error);
            throw error;
        }
    },
    search: async (name, status) => {
        try {
            if (name && status) {
                const data1 = await DB("categories")
                    .innerJoin("categories_lang", "categories.id", "categories_lang.cat_id")
                    .where("categories.status", status)
                    .andWhere("categories_lang.name", "like", `%${name}%`);
                return data1;
            } else if (name) {
                const data2 = DB("categories_lang").where("categories_lang.name", "like", `%${name}%`);
                return data2;
            } else {
                const data3 = DB("categories").where("status", status);
                console.log(data3, "123");
                return data3;
            }
        } catch (error) {
            console.error("Lỗi khi tìm kiếm danh mục:", error);
            throw error;
        }
    }
};
module.exports = categoryService;
