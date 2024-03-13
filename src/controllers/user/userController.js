const userService = require('../../services/admin/userService');

const userController = {
    Create: async (newUserData) => {
        try {
            const newUser = await userService.create(newUserData);
            return newUser;
        } catch (error) {
            console.error("Error in Create function of userController:", error);
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
    },
    FindByUsername: async (email) => {
        try {
            const user = await userService.findByUsername(email);
            return user;
        } catch (error) {
            console.error("Error in findByUsername function of userController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};
module.exports = userController;
