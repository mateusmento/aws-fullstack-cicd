import axios from "axios";
import { App } from "../../../app";

const app = new App();

beforeEach(() => {
    app.start();
});

afterEach(() => {
    app.close();
});

const BASE_URL = "http://localhost:3000";

it('should create an issue', async () => {
    const data = { title: 'Create issue' };
    const result = await axios.post(BASE_URL + '/issues', data);
    expect(result.status).toBe(200);
    expect(result.data).toBeDefined();
    expect(result.data.id).toBe(1);
    expect(result.data.title).toBe("Create issue");
});
