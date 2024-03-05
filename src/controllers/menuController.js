const menuService = require('../services/menuService');

const menuController = {
    FindAll: async (req, res) => {
        try {
            const menus = await menuService.findAll();
            res.json(menus);
        } catch (error) {
            console.error("Error in FindAll function of menuController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    FindById: async (req, res) => {
        try {
            const menu = await menuService.findById(req.params.id);
            if (!menu) {
                return res.status(404).json({ error: 'Menu not found' });
            }
            res.json(menu);
        } catch (error) {
            console.error("Error in FindById function of menuController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    Create: async (req, res) => {
        try {
            const newMenu = await menuService.create(req.body);
            res.status(201).json(newMenu);
        } catch (error) {
            console.error("Error in Create function of menuController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    Delete: async (req, res) => {
        try {
            const result = await menuService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            console.error("Error in Delete function of menuController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    Update: async (req, res) => {
        try {
            const updatedMenu = await menuService.update(req.params.id, req.body);
            res.json(updatedMenu);
        } catch (error) {
            console.error("Error in Update function of menuController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = menuController;
