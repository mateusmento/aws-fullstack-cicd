import axios from "axios";
import { App, AppBuilder } from "../../../app";
import createIssueRoute from "./create-issue.route";
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';

let app: App;
let database: StartedPostgreSqlContainer;

beforeEach(async () => {
    database = await new PostgreSqlContainer('postgres:14')
        .withDatabase('test')
        .withUsername('test')
        .withPassword('test')
        .start();

    app = new AppBuilder()
        .withRoutes(createIssueRoute)
        .build();

    await app.start();
});

afterEach(async () => {
    await app.close();
    await database.stop();
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

it('should create multiple issues', async () => {
    let result = await axios.post(BASE_URL + '/issues', { title: 'Create issue' });
    expect(result.data.id).toBe(1);
    expect(result.data.title).toBe("Create issue");

    result = await axios.post(BASE_URL + '/issues', { title: 'Remove issue' });
    expect(result.data.id).toBe(2);
    expect(result.data.title).toBe("Remove issue");
});
