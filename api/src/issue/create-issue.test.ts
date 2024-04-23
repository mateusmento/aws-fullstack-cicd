import axios from "axios";

const BASE_URL = "http://localhost:3000";

it('should create an issue', async () => {
    const data = { title: 'Create issue' };
    const result = await axios.post(BASE_URL + '/issues', data);
});
