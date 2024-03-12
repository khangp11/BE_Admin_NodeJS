const dashboardService = require('../../services/admin/dashboardService');

const dashboardController = {
    FindAll: async (req, res) => {
        try {
            const dashboards = await dashboardService.findAll();
            res.json(dashboards);
        } catch (error) {
            console.error("Error in FindAll function of dashboardController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    FindById: async (req, res) => {
        try {
            const id = req.params.id;
            const dashboard = await dashboardService.findById(id);
            if (!dashboard) {
                return res.status(404).json({ error: 'Dashboard not found' });
            }
            res.json(dashboard);
        } catch (error) {
            console.error("Error in FindById function of dashboardController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    Create: async (req, res) => {
        try {
            const data = req.body;
            const newDashboard = await dashboardService.create(data);
            res.status(201).json(newDashboard);
        } catch (error) {
            console.error("Error in Create function of dashboardController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    Delete: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await dashboardService.delete(id);
            res.status(204).send();
        } catch (error) {
            console.error("Error in Delete function of dashboardController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    Update: async (req, res) => {
        try {
            const id = req.params.id;
            const data = req.body;
            const updatedDashboard = await dashboardService.update(id, data);
            res.json(updatedDashboard);
        } catch (error) {
            console.error("Error in Update function of dashboardController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    Search: async (req, res) => {
        try {
            const name = req.body.name;
            const status = req.body.status;
            const cat_id = req.body.cat_id;
            const reponse = await dashboardService.search(name, status, cat_id);
            res.json(reponse);
        } catch (error) {
            console.log("Error in Search");
            res.status(500).json({ error: "Internal server error" });
        }
    },
    CalculateTotalPosts: async (req, res) => {
        try {
            const reponse = await dashboardService.calculateTotalPosts();
            res.json(reponse);
        } catch (error) {
            console.log("Error in CalculateTotalPosts");
            res.status(500).json({ error: "Internal server error" });
        }
    },
    AllNews: async (req, res) => {
        try {
            const reponse = await dashboardService.allnews();
            res.json(reponse);
        } catch (error) {
            console.log("Error in AllNews");
            res.status(500).json({ error: "Internal server error" });
        }
    },
    AllUsers: async (req, res) => {
        try {
            const reponse = await dashboardService.allusers();
            res.json(reponse);
        } catch (error) {
            console.log("Error in AllUsers");
            res.status(500).json({ error: "Internal server error" });
        }
    }
};
module.exports = dashboardController;
