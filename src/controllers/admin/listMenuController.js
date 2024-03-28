const listmenuService = require('../../services/admin/listmenuService');

const menuController = {
    FindAll: async (req, res) => {
        try {
            const name = req.body.name;
            const start = req.query._start;
            const end = req.query._end;
            const menus = await listmenuService.findAll(name, start, end);
            res.json(menus);
        } catch (error) {
            console.error("Error in FindAll function of menuController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    FindById: async (req, res) => {
        try {
            const id = req.params.id;
            const menu = await listmenuService.findById(id);
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
            const newMenu = await listmenuService.create(data);
            res.status(201).json(newMenu);
        } catch (error) {
            console.error("Error in Create function of menuController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    Delete: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await listmenuService.delete(id);
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
            const updatedMenu = await listmenuService.update(id, data);
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
            const updateStatus = await listmenuService.updateStatus(id, data);
            res.json(updateStatus);
        } catch (error) {
            console.error("error in update status menus", error);
            res.status(500).json({ error: "internal serrver error" })
        }

    },
};

module.exports = menuController;
