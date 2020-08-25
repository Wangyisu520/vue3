import { Post, User } from './../types/index';
import { reactive } from "vue";
import { todayPost, thisWeek, thisMonth } from "@/mock/index";
import axios from 'axios'

interface PostState {
    ids: string[],
    all:Record<string,Post>,
    loaded: boolean
}

interface LoginUserState {
    ids: string[],
    all:Record<string,Post>,
    loaded: boolean,
    currentUserId ?: string
}

const initialPostState = (): PostState =>({
    ids:[],
    all:{},
    loaded: false
})

const initialLoginUserState = (): LoginUserState =>({
    ids:[],
    all:{},
    loaded: false,
    currentUserId: undefined
})

interface State {
    loginUser:LoginUserState,
    posts: PostState
}

const initialState = ():State => ({
    posts: initialPostState(),
    loginUser: initialLoginUserState()
})

class Store {
    protected state: State;

    constructor(initialState: State) {
        this.state = reactive(initialState)
    }

    public getState(): State {
        return this.state
    }

    async fetchPosts(){
        const response = await axios.get<Post[]>('/posts');
        // console.log(response)
        // 处理数据
    
        for(const post of response.data){
            if(!this.state.posts.ids.includes(post.id.toString())){
                this.state.posts.ids.push(post.id.toString());
            }
            this.state.posts.all[post.id] = post
        }

        this.state.posts.loaded= true;
    }

    async createPost(post:Post){
        const response = await axios.post<Post>('/posts',post)
        // console.log(response)
        this.state.posts.all[response.data.id] = response.data
        this.state.posts.ids.push(response.data.id.toString())
    }

    async updatePost(post:Post){
        const response = await axios.put<Post>('/posts',post)
        // console.log(response.data)
        this.state.posts.all[response.data.id] = response.data
    }

    async createUser(user:User){
        const response = await axios.post<Post>('/users',user)
        console.log(response)
        this.state.loginUser.all[response.data.id] = response.data
        this.state.loginUser.ids.push(response.data.id.toString())
        this.state.loginUser.currentUserId = response.data.id.toString();

        console.log(this.state)
    }

    async signOut(){
        this.state.loginUser.currentUserId = undefined

        
    }
}

const store = new Store(initialState());

export const useStore = () => store;