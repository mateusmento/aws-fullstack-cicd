import axios from "axios";
import { App, AppBuilder } from "../../../app";
import createIssueRoute from "./create-issue.route";
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { DataSource } from "typeorm";
import { Issue } from "../../domain/issue.entity";

let app: App;
let database: StartedPostgreSqlContainer;
let dataSource: DataSource;

beforeEach(async () => {
    database = await new PostgreSqlContainer('postgres:14')
        .withDatabase('test')
        .withUsername('test')
        .withPassword('test')
        .start();

    dataSource = new DataSource({
        type: 'postgres',
        host: database.getHost(),
        port: database.getPort(),
        username: database.getUsername(),
        password: database.getPassword(),
        logging: false,
        logger: 'advanced-console',
        synchronize: true,
        entities: [Issue]
    });

    await dataSource.initialize();

    app = new AppBuilder()
        .withRoutes(createIssueRoute(dataSource.getRepository(Issue)))
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
