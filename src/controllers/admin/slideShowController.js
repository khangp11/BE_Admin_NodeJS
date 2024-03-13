const slideShowService = require('../../services/admin/slideShowService');

const slideShowController = {
    FindAll: async (req, res) => {
        try {
            const slideShow = await slideShowService.findAll();
            res.json(slideShow);
        } catch (error) {
            console.error("Error in FindAll function of slideShowController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    FindById: async (req, res) => {
        try {
            const id = req.params.id;
            const slideShow = await slideShowService.findById(id);
            if (!slideShow) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            console.error("Error in FindById function of slideShowController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    Create: async (req, res) => {
        try {
            const data = req.body;
            const newSlideShow = await slideShowService.create(data);
            res.status(201).json(newSlideShow);
        } catch (error) {
            console.error("Error in Create function of slideShowController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    Delete: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await slideShowService.delete(id);
            res.status(204).send();
        } catch (error) {
            console.error("Error in Delete function of slideShowController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    Update: async (req, res) => {
        try {
            const id = req.params.id;
            const data = req.body;
            const updatedSlideShow = await slideShowService.update(id, data);
            res.json(updatedSlideShow);
        } catch (error) {
            console.error("Error in Update function of slideShowController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = slideShowController;