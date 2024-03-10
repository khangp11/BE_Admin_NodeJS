const langsService = require('../../services/admin/langsService');

const langsController = {
    FindAll: async (req, res) => {
        try {
            const langs = await langsService.findAll();
            res.json(langs);
        } catch (error) {
            console.error("Error in FindAll function of langsController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    FindById: async (req, res) => {
        try {
            const lang = await langsService.findById(req.params.id);
            if (!lang) {
                return res.status(404).json({ error: 'Language not found' });
            }
            res.json(lang);
        } catch (error) {
            console.error("Error in FindById function of langsController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    Create: async (req, res) => {
        try {
            const newLang = await langsService.create(req.body);
            res.status(201).json(newLang);
        } catch (error) {
            console.error("Error in Create function of langsController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    Delete: async (req, res) => {
        try {
            const result = await langsService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            console.error("Error in Delete function of langsController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    Update: async (req, res) => {
        try {
            const updatedLang = await langsService.update(req.params.id, req.body);
            res.json(updatedLang);
        } catch (error) {
            console.error("Error in Update function of langsController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = langsController;
