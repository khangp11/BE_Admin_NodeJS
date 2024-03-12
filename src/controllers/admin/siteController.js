const siteService = require('../../services/admin/siteService');

const siteController = {
    FindAll: async (req, res) => {
        try {
            const site = await siteService.findAll();
            res.json(site);
        } catch (error) {
            console.error("Error in FindAll function of siteController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    FindById: async (req, res) => {
        try {
            const id = req.params.id;
            const site = await siteService.findById(id);
            if (!site) {
                return res.status(404).json({ error: 'site not found' });
            }
            res.json(site);
        } catch (error) {
            console.error("Error in FindById function of siteController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    Create: async (req, res) => {
        try {
            const data = req.body;
            const newsite = await siteService.create(data);
            res.status(201).json(newsite);
        } catch (error) {
            console.error("Error in Create function of siteController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    Delete: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await siteService.delete(id);
            res.status(204).send();
        } catch (error) {
            console.error("Error in Delete function of siteController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    Update: async (req, res) => {
        try {
            const id = req.params.id;
            const data = req.body;
            const updatedSite = await siteService.update(id, data);
            res.json(updatedSite);
        } catch (error) {
            console.error("Error in Update function of userController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = siteController;
