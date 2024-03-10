const userService = require('../../services/admin/userService');

const userController = {
    FindAll: async (req, res) => {
        try {
            const users = await userService.findAll();
            res.json(users);
        } catch (error) {
            console.error("Error in FindAll function of userController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    FindById: async (req, res) => {
        try {
            const user = await userService.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            console.error("Error in FindById function of userController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    Create: async (req, res) => {
        try {
            const newUser = await userService.create(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            console.error("Error in Create function of userController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    Delete: async (req, res) => {
        try {
            const result = await userService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            console.error("Error in Delete function of userController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    Update: async (req, res) => {
        try {
            const updatedUser = await userService.update(req.params.id, req.body);
            res.json(updatedUser);
        } catch (error) {
            console.error("Error in Update function of userController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = userController;
