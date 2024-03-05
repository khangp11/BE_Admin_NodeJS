const dashboardService = require('../services/dashboardService');

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
            const dashboard = await dashboardService.findById(req.params.id);
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
            const newDashboard = await dashboardService.create(req.body);
            res.status(201).json(newDashboard);
        } catch (error) {
            console.error("Error in Create function of dashboardController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    Delete: async (req, res) => {
        try {
            const result = await dashboardService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            console.error("Error in Delete function of dashboardController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    Update: async (req, res) => {
        try {
            const updatedDashboard = await dashboardService.update(req.params.id, req.body);
            res.json(updatedDashboard);
        } catch (error) {
            console.error("Error in Update function of dashboardController:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = dashboardController;
