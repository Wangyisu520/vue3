import { mount } from '@vue/test-utils';
import TimeLine from '@/components/TimeLine.vue';
describe('TimeLine.vue', () => {
    it('测试三个a标签功能', () => {
        const wrapper = mount(TimeLine);
        // console.log(expect(wrapper.html())) 
        const periods = wrapper.findAll('a');
        expect(wrapper.findAll('a')).toH(3);
    });
});
//# sourceMappingURL=TimeLine.js.map