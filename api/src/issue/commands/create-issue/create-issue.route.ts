import { Router } from "express";

const createIssueRoute = Router();

createIssueRoute.post('/issues', (req, res) => {
    res.json({
        id: 1,
        title: req.body.title
    })
});

export default createIssueRoute;
