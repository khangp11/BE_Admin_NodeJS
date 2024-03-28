const dashboardService = require('../../services/admin/dashboardService');


const dashboardController = {
    FindAll: async (req, res) => {
        try {
            const start = req.params._start;
            const end = req.params._end;
            const status = req.body.status;
            const q = req.query.q;
            const cat_id = req.body.cat_id;
            const dashboards = await dashboardService.findAll(status, cat_id, q, start, end);
            res.json(dashboards);
        } catch (error) {
            console.error("Error in FindAll function of dashboardController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    FindById: async (req, res) => {
        try {
            const id = req.params.id;
            const dashboard = await dashboardService.findById(id);
            if (!dashboard) {
                return res.status(404).json({ error: 'Dashboard not found' });
            }
            res.json(dashboard);
        } catch (error) {
            console.error("Error in FindById function of dashboardController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    Create: async (req, res) => {
        try {
            const companyId = req.companyInfo;
            const company_id = companyId;
            const image = req.body.image;
            const status = req.body.status;
            const user_id = req.user_id;
            const view = req.body.view ? null : undefined;
            const tags = req.body.tags || "";
            const icons = req.body.icons || "";
            const sort_order = req.body.sort_order ? null : 1;
            const object_type = req.body.object_type ? null : undefined;
            const file = req.body.file || "";
            //category
            const dataCat = req.body.category_id;
            //news_lang
            const name_en = req.body.name_en;
            const content_en = req.body.content_en;
            const description_en = req.body.description_en;
            const name = req.body.name;
            const content = req.body.content;
            const description = req.body.description;


            const data = {
                company_id: company_id,
                image: image,
                status: status,
                user_id: user_id,
                view: view,
                tags: tags,
                icons: icons,
                sort_order: sort_order,
                object_type: object_type,
                file: file,
                obj_cat: [],
                obj_news_lang: [
                    {
                        lang_id: 2,
                        name: name_en,
                        content: content_en,
                        description: description_en
                    },
                    {
                        lang_id: 1,
                        name: name,
                        content: content,
                        description: description
                    }
                ]
            }
            if (Array.isArray(dataCat)) {
                dataCat.forEach(cat_id => {
                    data.obj_cat.push({ "cat_id": cat_id });
                });
            } else {
                const catIds = dataCat.split(',').map(id => id.trim());
                catIds.forEach(cat_id => {
                    data.obj_cat.push({ "cat_id": cat_id });
                });
            }

            const newDashboard = await dashboardService.create(data);
            res.status(201).json(newDashboard);
        } catch (error) {
            console.error("Error in Create function of dashboardController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    Delete: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await dashboardService.delete(id);
            res.status(204).send();
        } catch (error) {
            console.error("Error in Delete function of dashboardController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    Update: async (req, res) => {
        try {
            const id = req.params.id;

            const companyId = req.companyInfo;
            const company_id = companyId;
            const image = req.body.image;
            const status = req.body.status;
            const user_id = req.user_id;
            const view = req.body.view ? null : undefined;
            const tags = req.body.tags || "";
            const icons = req.body.icons || "";
            const sort_order = req.body.sort_order ? null : 1;
            const object_type = req.body.object_type ? null : undefined;
            const file = req.body.file || "";
            //category
            const dataCat = req.body.category_id;
            //news_lang
            const name_en = req.body.name_en;
            const content_en = req.body.content_en;
            const description_en = req.body.description_en;
            const name = req.body.name;
            const content = req.body.content;
            const description = req.body.description;


            const data = {
                company_id: company_id,
                image: image,
                status: status,
                user_id: user_id,
                view: view,
                tags: tags,
                icons: icons,
                sort_order: sort_order,
                object_type: object_type,
                file: file,
                obj_cat: [],
                obj_news_lang: [
                    {
                        lang_id: 2,
                        name: name_en,
                        content: content_en,
                        description: description_en
                    },
                    {
                        lang_id: 1,
                        name: name,
                        content: content,
                        description: description
                    }
                ]
            }
            if (Array.isArray(dataCat)) {
                dataCat.forEach(cat_id => {
                    data.obj_cat.push({ "cat_id": cat_id });
                });
            } else {
                const catIds = dataCat.split(',').map(id => id.trim());
                catIds.forEach(cat_id => {
                    data.obj_cat.push({ "cat_id": cat_id });
                });
            }
            const updatedDashboard = await dashboardService.update(id, data);
            res.json(updatedDashboard);
        } catch (error) {
            console.error("Error in Update function of dashboardController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    Search: async (req, res) => {
        try {
            const name = req.body.name;
            const status = req.body.status;
            const cat_id = req.body.cat_id;
            const reponse = await dashboardService.search(name, status, cat_id);
            res.json(reponse);
        } catch (error) {
            console.log("Error in Search");
            res.status(500).json({ error: "Internal server error" });
        }
    },
    CalculateTotalPosts: async (req, res) => {
        try {
            const reponse = await dashboardService.calculateTotalPosts();
            res.json(reponse);
        } catch (error) {
            console.log("Error in CalculateTotalPosts");
            res.status(500).json({ error: "Internal server error" });
        }
    },
    AllNews: async (req, res) => {
        try {
            const reponse = await dashboardService.allnews();
            res.json(reponse);
        } catch (error) {
            console.log("Error in AllNews");
            res.status(500).json({ error: "Internal server error" });
        }
    },
    AllUsers: async (req, res) => {
        try {
            const reponse = await dashboardService.allusers();
            res.json(reponse);
        } catch (error) {
            console.log("Error in AllUsers");
            res.status(500).json({ error: "Internal server error" });
        }
    }
};
module.exports = dashboardController;
