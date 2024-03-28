const menuService = require('../../services/admin/menuService');

const menuController = {
    FindAll: async (req, res) => {
        try {
            const start = req.params._start;
            const end = req.params._end;
            const menus = await menuService.findAll(start, end);
            res.json(menus);
        } catch (error) {
            console.error("Error in FindAll function of menuController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    FindById: async (req, res) => {
        try {
            const id = req.params.id;
            const menu = await menuService.findById(id);
            if (!menu) {
                return res.status(404).json({ error: 'Menu not found' });
            }
            res.json(menu);
        } catch (error) {
            console.error("Error in FindById function of menuController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    FindByIdListMenu: async (req, res) => {
        try {
            const id = req.params.id;
            const menu = await menuService.FindByIdListMenu(id);
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
            const data = req.body;
            console.log(data);
            const newMenu = await menuService.create(data);
            res.status(201).json(newMenu);
        } catch (error) {
            console.error("Error in Create function of menuController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    Delete: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await menuService.delete(id);
            res.status(204).send();
        } catch (error) {
            console.error("Error in Delete function of menuController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    Update: async (req, res) => {
        try {
            const id = req.params.id;
            const data = req.body;
            const updatedMenu = await menuService.update(id, data);
            res.json(updatedMenu);
        } catch (error) {
            console.error("Error in Update function of menuController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    updateStatus: async (req, res) => {
        try {
            const id = req.params.id;
            const data = req.body;
            const updateStatus = await menuService.updateStatus(id, data);
            res.json(updateStatus);
        } catch (error) {
            console.error("error in update status menus", error);
            res.status(500).json({ error: "internal serrver error" })
        }

    },
    allListMenu: async (req, res) => {
        try {
            const listMenu = await menuService.allListMenu();
            res.json(listMenu)
        } catch (error) {

        }
    }
};

module.exports = menuController;
