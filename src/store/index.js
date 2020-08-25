import { reactive } from "vue";
import axios from 'axios';
const initialPostState = () => ({
    ids: [],
    all: {},
    loaded: false
});
const initialLoginUserState = () => ({
    ids: [],
    all: {},
    loaded: false,
    currentUserId: undefined
});
const initialState = () => ({
    posts: initialPostState(),
    loginUser: initialLoginUserState()
});
class Store {
    constructor(initialState) {
        this.state = reactive(initialState);
    }
    getState() {
        return this.state;
    }
    async fetchPosts() {
        const response = await axios.get('/posts');
        // console.log(response)
        // 处理数据
        for (const post of response.data) {
            if (!this.state.posts.ids.includes(post.id.toString())) {
                this.state.posts.ids.push(post.id.toString());
            }
            this.state.posts.all[post.id] = post;
        }
        this.state.posts.loaded = true;
    }
    async createPost(post) {
        const response = await axios.post('/posts', post);
        // console.log(response)
        this.state.posts.all[response.data.id] = response.data;
        this.state.posts.ids.push(response.data.id.toString());
    }
    async updatePost(post) {
        const response = await axios.put('/posts', post);
        // console.log(response.data)
        this.state.posts.all[response.data.id] = response.data;
    }
    async createUser(user) {
        const response = await axios.post('/users', user);
        console.log(response);
        this.state.loginUser.all[response.data.id] = response.data;
        this.state.loginUser.ids.push(response.data.id.toString());
        this.state.loginUser.currentUserId = response.data.id.toString();
        console.log(this.state);
    }
    async signOut() {
        this.state.loginUser.currentUserId = undefined;
    }
}
const store = new Store(initialState());
export const useStore = () => store;
//# sourceMappingURL=index.js.map