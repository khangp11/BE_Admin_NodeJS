const categoryService = require('../../services/admin/categoryService');

const categoryController = {
    FindAll: async (req, res) => {
        try {
            const categories = await categoryService.findAll();
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
            const newCategory = await categoryService.create(req.body);
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
            const id = req.body.id;
            const name = req.body.name;
            const status = req.body.status;
            const updatedCategory = await categoryService.update(id, name, status);
            res.json(updatedCategory);
        } catch (error) {
            console.error("Error updating category:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    SearchName: async (req, res) => {
        try {
            const name = req.body.name;
            const data = await categoryService.search(name);
            res.json(data);
        } catch (error) {
            console.error("Error search name category", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
};
module.exports = categoryController;
