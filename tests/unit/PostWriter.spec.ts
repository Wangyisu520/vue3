import { basePost } from './../../src/mock/index';
import { mount } from '@vue/test-utils';
import PostWriter from '@/components/PostWriter.vue'


describe("PostWriter",() =>{
    it("测试写博客组件",() =>{
        const wrapper = mount(PostWriter,{
            props:{
                post:{...basePost}
            }
        })
        wrapper.find('[data-test="post-title"]').setValue("老子天下第一")
        wrapper.find<HTMLDivElement>('[data-test="markdown"]').element.innerText="### 天下无敌"
        wrapper.find<HTMLDivElement>('[data-test="markdown"]').trigger("input")
        wrapper.find('[data-test="submit-post"]').trigger("click")
        console.log(wrapper.emitted().save)
    })
})