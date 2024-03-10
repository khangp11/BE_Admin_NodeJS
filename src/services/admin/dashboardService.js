const DB = require('../../configs/database');

const dashboardService = {
    findAll: async (request) => {
        try {
            const query = DB('news')
                .innerJoin('news_lang', 'news.id', '=', 'news_lang.news_id')
                .innerJoin('news_categories', 'news.id', '=', 'news_categories.news_id')
                .leftJoin('categories_lang', function () {
                    this.on('news_categories.cat_id', '=', 'categories_lang.cat_id')
                        .andOn('categories_lang.lang_id', '=', 1);
                })
                .select(
                    'news.id',
                    'news.image',
                    'news.status',
                    'news.sort_order',
                    DB.raw('MAX(news_lang.name) as name'),
                    DB.raw('MAX(news_lang.description) as description'),
                    DB.raw('MAX(news_lang.content) as content'),
                    DB.raw('MAX(news_lang.meta_description) as meta_description'),
                    DB.raw('GROUP_CONCAT(DISTINCT news_categories.cat_id) as category_id'),
                    DB.raw('GROUP_CONCAT(DISTINCT categories_lang.name) as name_category')
                )
                .groupBy('news.id')
                .orderBy('news.id', 'desc');
            const newsWithLangAndCategories = await query;
            return newsWithLangAndCategories;
        } catch (error) {
            console.error("Error getting news:", error);
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
    },
    allnews: async (req, rep) => {
        try {
            const reponse = await DB("news").count('* as total');
            return {
                data: reponse[0].total
            }
        } catch (error) {
            console.error("Error in update function of dashboardService:", error);
            throw error;
        }
    },
    allusers: async (req, rep) => {
        try {
            const reponse = await DB("users").count('* as total');
            return {
                data: reponse[0].total
            }
        } catch (error) {
            console.error("Error in update function of dashboardService:", error);
            throw error;
        }
    }
};

module.exports = dashboardService;
