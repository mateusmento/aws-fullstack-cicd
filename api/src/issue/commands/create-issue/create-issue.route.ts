import { Router } from "express";
import { DataSource } from "typeorm";
import { Issue } from "../../domain/issue.entity";

function createIssueRoute(dataSource: DataSource) {
    const createIssueRoute = Router();
    
    createIssueRoute.post('/issues', async (req, res) => {
        const issue = await dataSource.manager.save(Issue, {
            title: req.body.title
        });
        res.json(issue);
    });

    return createIssueRoute;
}

export default createIssueRoute;
