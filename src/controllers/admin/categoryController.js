const categoryService = require('../../services/admin/categoryService');
const currentDate = new Date();

const categoryController = {
    FindAll: async (req, res) => {
        try {
            const status = req.body.status;
            const title = req.body.title;
            const start = req.query._start;
            const end = req.query._end;
            const categories = await categoryService.findAll({ status: status, title: title }, start, end);
            res.set('Access-Control-Allow-Credentials', true);
            res.set('Access-Control-Expose-Headers', 'X-Total-Count');
            res.set('X-Total-Count', 100);

            res.json(categories);

        } catch (error) {
            console.error("Error finding categories:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    FindById: async (req, res, ID) => {
        try {
            const ID = req.params.id;
            const category = await categoryService.findById(ID);
            if (!category) {
                return res.status(404).json({ error: "Category not found" });
            }
            res.json(category);
        } catch (error) {
            console.error("Error finding category:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    Create: async (req, res) => {
        try {
            const companyId = req.companyInfo;
            const company_id = companyId;
            const name = req.body.name;
            const description = req.body.description;
            const name_en = req.body.name_en;
            const description_en = req.body.description_en;
            const parent_id = req.body.parent_id;

            const status = req.body.status ? 1 : 0;

            const sort_order = req.body.sort_order;
            const file = req.body.file || "";
            const image = req.body.image;

            const categoryData = {
                company_id: company_id,
                parent_id: parent_id,
                image: image,
                status: status,
                sort_order: sort_order,
                file: file,
                obj_lang: [
                    {
                        lang_id: 1,
                        name: name,
                        description: description,
                    },
                    {
                        lang_id: 2,
                        name: name_en,
                        description: description_en,
                    }
                ]
            };
            const newCategory = await categoryService.create(categoryData);
            res.status(201).json(newCategory);
        } catch (error) {
            console.error("Error creating category:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    Delete: async (req, res) => {
        try {
            await categoryService.delete(req.params.id);
            res.sendStatus(204);
        } catch (error) {
            console.error("Error deleting category:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    Update: async (req, res) => {
        try {
            const id = req.params.id;
            const companyId = req.companyInfo;
            const company_id = companyId;
            const name = req.body.name;
            const description = req.body.description;
            const name_en = req.body.name_en;
            const description_en = req.body.description_en;
            const parent_id = req.body.parent_id;
            const status = req.body.status ? 1 : 0;
            const sort_order = req.body.sort_order;
            const file = req.body.file || "";
            const image = req.body.image;

            const categoryData = {
                company_id: company_id,
                parent_id: parent_id,
                image: image,
                status: status,
                sort_order: sort_order,
                file: file,
                obj_lang: [
                    {
                        lang_id: 1,
                        name: name,
                        description: description,
                    },
                    {
                        lang_id: 2,
                        name: name_en,
                        description: description_en,
                    }
                ]
            };
            const updatedCategory = await categoryService.update(id, categoryData);
            res.json(updatedCategory);
        } catch (error) {
            console.error("Error updating category:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    SearchName: async (req, res) => {
        try {
            const name = req.body.name;
            const status = req.body.status;
            const data = await categoryService.search(name, status);
            res.json(data);
        } catch (error) {
            console.error("Error search name category", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
};
module.exports = categoryController;
