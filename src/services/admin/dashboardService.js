const DB = require('../../configs/database');
const currentDate = new Date();
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
            const data = await DB('news')
                .where('news.id', id)
                .innerJoin('news_lang as nl_vn', function () {
                    this.on('news.id', '=', 'nl_vn.news_id').andOn('nl_vn.lang_id', '=', 1);
                })
                .innerJoin('news_lang as nl_en', function () {
                    this.on('news.id', '=', 'nl_en.news_id').andOn('nl_en.lang_id', '=', 2);
                })
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
                    DB.raw('MAX(nl_vn.name) as name_vn'),
                    DB.raw('MAX(nl_vn.description) as description_vn'),
                    DB.raw('MAX(nl_vn.content) as content_vn'),
                    DB.raw('MAX(nl_vn.meta_description) as meta_description_vn'),
                    DB.raw('MAX(nl_en.name) as name_en'),
                    DB.raw('MAX(nl_en.description) as description_en'),
                    DB.raw('MAX(nl_en.content) as content_en'),
                    DB.raw('MAX(nl_en.meta_description) as meta_description_en'),
                    DB.raw('GROUP_CONCAT(DISTINCT news_categories.cat_id) as category_id'),
                    DB.raw('GROUP_CONCAT(DISTINCT categories_lang.name) as name_category')
                )
                .groupBy('news.id')
                .first();

            return {
                id: data.id,
                image: data.image,
                status: data.status,
                sort_order: data.sort_order,
                name: data.name_vn,
                description: data.description_vn,
                content: data.content_vn,
                meta_description_vn: data.meta_description_vn,
                name_en: data.name_en,
                description_en: data.description_en,
                content_en: data.content_en,
                meta_description_en: data.meta_description_en,
                category_id: data.category_id,
                name_category: data.name_category
            };
        } catch (error) {
            console.error("Error in findById function of dashboardService:", error);
            throw error;
        }
    },
    create: async (data) => {
        try {
            const newData = {
                company_id: data.company_id,
                image: data.image,
                status: data.status,
                user_id: data.user_id,
                view: data.view,
                tags: data.tags,
                icons: data.icons,
                sort_order: data.sort_order,
                object_type: data.object_type,
                file: data.file,
                updated_at: currentDate,
                created_at: currentDate
            }
            const news = await DB('news').insert(newData).returning("id");
            const newsID = news[0];
            const dataCat = data.obj_cat;
            for (let item of dataCat) {
                const catData = {
                    company_id: data.company_id,
                    news_id: newsID,
                    cat_id: item.cat_id
                };
                const news_cat = await DB('news_categories').insert(catData).returning('*');
            }
            const new_lang = data.obj_news_lang;
            for (let item of new_lang) {
                const new_lang_Data = {
                    company_id: item.company_id,
                    news_id: newsID,
                    lang_id: item.lang_id,
                    name: item.name,
                    description: item.description,
                    content: item.content,
                    meta_title: item.meta_title,
                    meta_keywords: item.meta_keywords,
                    meta_description: item.meta_description
                };
                const news_lang = await DB('news_lang').insert(new_lang_Data).returning('*');
            }
        } catch (error) {
            console.error("Error in create function of dashboardService:", error);
            throw error;
        }
    },
    delete: async (id) => {
        try {
            const result1 = await DB('news').where('id', id).del();
            const result2 = await DB("news_categories").where('news_id', id).del();
            const result3 = await DB("news_lang").where('news_id', id).del();
        } catch (error) {
            console.error("Error in delete function of dashboardService:", error);
            throw error;
        }
    },
    update: async (id, data) => {
        try {
            const news_Data = {
                company_id: data.company_id,
                image: data.image,
                status: data.status,
                user_id: data.user_id,
                view: data.view,
                tags: data.tags,
                icons: data.icons,
                sort_order: data.sort_order,
                object_type: data.object_type,
                file: data.file,
                updated_at: currentDate
            }
            const news = await DB('news').where('id', id).update(news_Data);
            const news_cat = data.obj_cat;
            for (let item of news_cat) {
                let exitNewsCat = await DB('news_categories').where({ news_id: id, cat_id: item.cat_id }).first();
                const newsCat = {
                    company_id: data.company_id,
                    news_id: id,
                    cat_id: item.cat_id
                };
                if (exitNewsCat != null) {
                    const result = await DB('news_categories').where({ id: exitNewsCat.id }).update(newsCat);
                } else {
                    const result = await DB('news_categories').insert(newsCat);
                }
            }
            const news_lang = data.obj_news_lang;
            for (let item of news_lang) {
                let exitNewsLang = await DB('news_lang').where({ news_id: id, lang_id: item.lang_id }).first();
                const newslang = {
                    company_id: item.company_id,
                    news_id: id,
                    lang_id: item.lang_id,
                    name: item.name,
                    description: item.description,
                    content: item.content,
                    meta_title: item.meta_title,
                    meta_keywords: item.meta_keywords,
                    meta_description: item.meta_description
                };
                if (exitNewsLang != null) {
                    const result = await DB('news_lang').where({ id: exitNewsLang.id }).update(newslang);
                } else {
                    const result = await DB('news_lang').insert(newslang);
                }
            }
        } catch (error) {
            console.error("Error in update function of dashboardService:", error);
            throw error;
        }
    },
    search: async (name, status, cat_id) => {
        try {
            let query = DB("news")
                .select("news.*")
                .leftJoin("news_lang", "news.id", "news_lang.news_id")
                .leftJoin("news_categories", "news.id", "news_categories.news_id");
            if (name) {
                query = query.where("news_lang.name", name);
            }
            if (status !== undefined) {
                query = query.andWhere("news.status", status);
            }
            if (cat_id !== undefined) {
                query = query.andWhere("news_categories.cat_id", cat_id);
            }
            const result = await query;
            return result;
        } catch (error) {
            console.error("Lỗi khi tìm kiếm:", error);
            throw error;
        }
    },
    calculateTotalPosts: async (req, res) => {
        try {
            const posts = await DB("news");

            let totalDisplayPosts = 0;
            let totalDraftPosts = 0;

            for (const post of posts) {
                if (post.status === 1) {
                    totalDisplayPosts++;
                } else if (post.status === 0) {
                    totalDraftPosts++;
                }
            }
            return { totalDisplayPosts, totalDraftPosts };
        } catch (error) {
            console.error("Lỗi khi tính tổng số bài viết:", error);
            res.status(500).json({ error: "Đã xảy ra lỗi khi tính tổng số bài viết" });
        }
    },

    allnews: async (req, rep) => {
        try {
            const reponse = await DB("news").count('* as total');
            return {
                data: reponse[0].total
            }
        } catch (error) {
            console.error("Error in allnews function of dashboardService:", error);
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
            console.error("Error in allUsers function of dashboardService:", error);
            throw error;
        }
    }
};
module.exports = dashboardService;
