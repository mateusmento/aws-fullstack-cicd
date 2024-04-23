import axios from "axios";
import { App, AppBuilder } from "../../../app";
import createIssueRoute from "./create-issue.route";

const app = new AppBuilder()
    .withRoutes(createIssueRoute)
    .build();

beforeEach(() => {
    app.start();
});

afterEach(() => {
    app.close();
});

const BASE_URL = "http://localhost:3000";

it('should return created issue in response', async () => {
    const data = { title: 'Create issue' };
    const result = await axios.post(BASE_URL + '/issues', data);
    expect(result.status).toBe(200);
    expect(result.data).toBeDefined();
    expect(result.data.id).toBe(1);
    expect(result.data.title).toBe("Create issue");
});
