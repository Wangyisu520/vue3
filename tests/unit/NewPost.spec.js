import { useStore } from './../../src/store/index';
import { mount } from '@vue/test-utils';
import NewPost from '@/views/NewPost.vue';
const mockRoutes = [];
jest.mock("vue-router", () => ({
    useRouter: () => ({
        push: (url) => {
            mockRoutes.push(url);
        }
    })
}));
jest.mock("axios", () => ({
    post: (url, payload) => {
        return { data: payload };
    }
}));
describe("NewPost", () => {
    it("测试添加博客组件", async () => {
        const store = useStore();
        const wrapper = mount(NewPost, {
            global: {
                provide: { store }
            }
        });
        expect(store.getState().posts.ids).toHaveLength(0);
        await wrapper.find('[data-test="submit-post"]').trigger("click");
        await wrapper.vm.$nextTick();
        // console.log(store.getState().posts)
        // console.log(mockRoutes)
        expect(store.getState().posts.ids).toHaveLength(1);
        expect(mockRoutes).toEqual(["/"]);
    });
});
//# sourceMappingURL=NewPost.spec.js.map