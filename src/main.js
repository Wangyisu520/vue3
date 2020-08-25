import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import * as mockData from './mock';
import "highlight.js/styles/monokai.css";
import { v4 as uuidv4 } from 'uuid';
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
//@ts-ignore
axios.get = async (url) => {
    if (url === '/posts') {
        await delay(1000);
        return Promise.resolve({
            data: [mockData.todayPost, mockData.thisWeek, mockData.thisMonth]
        });
    }
};
//@ts-ignore
axios.post = async (url, payload) => {
    if (url === '/posts') {
        await delay(1000);
        const id = uuidv4();
        return Promise.resolve({
            data: { ...payload, id }
        });
    }
    if (url === '/users') {
        await delay(1000);
        const id = uuidv4();
        const { id: oldId, password, ...rest } = payload;
        return Promise.resolve({
            data: { ...rest, id }
        });
    }
};
//@ts-ignore
axios.put = async (url, payload) => {
    if (url === '/posts') {
        await delay(1000);
        return Promise.resolve({
            data: { ...payload }
        });
    }
};
createApp(App).use(router).mount('#app');
//# sourceMappingURL=main.js.map