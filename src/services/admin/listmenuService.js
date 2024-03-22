const DB = require('../../configs/database');

const menuService = {
    findAll: async () => {
        try {
            const result = await DB('menus')
                .select(
                    'menus.id',
                    'menus.name',
                    'menus.sort_order',
                    'menus.status',
                    'menu_type.name as menu_type_name',
                    'categories_lang1.name as name_category1',
                    'categories_lang2.name as name_category2'
                )
                .leftJoin('categories_lang as categories_lang1', 'menus.cat_right', 'categories_lang1.cat_id')
                .leftJoin('categories_lang as categories_lang2', 'menus.cat_right2', 'categories_lang2.cat_id')
                .leftJoin('menu_type', 'menus.type', 'menu_type.id');
            return result;
        } catch (error) {
            console.error('Error fetching menus:', error);
            throw error;
        }
    },
    findById: async (id) => {
        try {
            const data = await DB('menus').where('id', id).first();
            return data;
        } catch (error) {
            console.error("Error in findById:", error);
            throw error;
        }
    },
    FindByIdListMenu: async (id) => {
        try {
            const data = await DB('menus').where('id', id).first();
            return data;
        } catch (error) {
            console.error("Error in findById:", error);
            throw error;
        }
    },
    create: async (data) => {
        try {
            const menuData = {
                company_id: data.company_id,
                name: data.name,
                param: data.param,
                sort_order: data.sort_order,
                is_right: data.is_right,
                is_search: data.is_search,
                cat_right: data.cat_right,
                cat_right2: data.cat_right2,
                type: data.type,
                layout: data.layout,
                parent_id: data.parent_id,
                menu_type: data.menu_type,
                status: data.statuss,
            }
            const menu = await DB('menus').insert(menuData).returning("id");

            const menu_id = menu[0];

            const Menu_Lang_Data = data.obj_menu_lang;
            for (let item of Menu_Lang_Data) {
                const menu_lang = {
                    company_id: data.company_id,
                    menu_id: menu_id,
                    lang_id: item.lang_id,
                    name: item.name
                };
                const menu = await DB('menu_lang').insert(menu_lang);
            }
        } catch (error) {
            console.error("Error in create:", error);
            throw error;
        }
    },
    delete: async (id) => {
        try {
            const result1 = await DB('menus').where('id', id).del();
            const result2 = await DB('menu_lang').where('menu_id', id).del();
        } catch (error) {
            console.error("Error in delete:", error);
            throw error;
        }
    },
    update: async (id, data) => {
        try {
            const menuData = {
                company_id: data.company_id,
                name: data.name,
                param: data.param,
                sort_order: data.sort_order,
                is_right: data.is_right,
                is_search: data.is_search,
                cat_right: data.cat_right,
                cat_right2: data.cat_right2,
                type: data.type,
                layout: data.layout,
                parent_id: data.parent_id,
                menu_type: data.menu_type,
                status: data.statuss,
            }
            const menu = await DB('menus').where('id', id).update(menuData);

            const Menu_Lang_Data = data.obj_menu_lang;

            for (let item of Menu_Lang_Data) {
                const menu_lang = {
                    company_id: data.company_id,
                    menu_id: id,
                    lang_id: item.lang_id,
                    name: item.name
                };
                let exitMenuLang = await DB('menu_lang').where({ menu_id: id, lang_id: item.lang_id }).first();

                if (exitMenuLang != null) {
                    const result = await DB('menu_lang').where({ id: exitMenuLang.id }).update(menu_lang);
                } else {
                    const result = await DB('menu_lang').insert(menu_lang);
                }
            }
        } catch (error) {
            console.error("Error in update:", error);
            throw error;
        }
    },
    updateStatus: async (id, data) => {
        try {
            const result = await DB("menus").where("id", id).update(data);
            return result;
        } catch (error) {
            console.error("Error in updateStatus in menuService", error);
            throw error;
        }
    },
}
module.exports = menuService;
