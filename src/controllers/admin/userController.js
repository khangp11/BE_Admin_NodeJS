const userService = require('../../services/admin/userService');

const userController = {
    FindAll: async (req, res) => {
        try {
            const infor = req.body.infor;
            const role = req.body.role;
            const start = req.query._start;
            const end = req.query._end;
            const users = await userService.findAll(infor, role, start, end);
            res.json(users);
        } catch (error) {
            console.error("Error in FindAll function of userController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    FindById: async (req, res) => {
        try {
            const id = req.params.id;
            const user = await userService.findById(id);
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
            const data = req.body;
            const newUser = await userService.create(data);
            res.status(201).json(newUser);
        } catch (error) {
            console.error("Error in Create function of userController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    Delete: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await userService.delete(id);
            res.status(204).send();
        } catch (error) {
            console.error("Error in Delete function of userController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    Update: async (req, res) => {
        try {
            const id = req.params.id;
            const data = req.body;
            const updatedUser = await userService.update(id, data);
            res.json(updatedUser);
        } catch (error) {
            console.error("Error in Update function of userController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = userController;
