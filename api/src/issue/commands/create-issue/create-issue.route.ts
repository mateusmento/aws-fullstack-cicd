import { Router } from "express";
import { Repository } from "typeorm";
import { Issue } from "../../domain/issue.entity";

function createIssueRoute(issueRepo: Repository<Issue>) {
    const createIssueRoute = Router();
    
    createIssueRoute.post('/issues', async (req, res) => {
        const issue = await issueRepo.save({
            title: req.body.title
        });
        res.json(issue);
    });

    return createIssueRoute;
}

export default createIssueRoute;
