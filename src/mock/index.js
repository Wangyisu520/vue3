import moment from 'moment';
moment.locale("zh-cn");
export const basePost = {
    id: 1,
    title: "吃饭",
    markdown: "人生",
    html: "<p>人生列表</p>",
    authorId: 1,
    created: moment(),
};
export const todayPost = {
    ...basePost,
    id: 1,
    title: "今天"
};
export const thisWeek = {
    ...basePost,
    title: "本周",
    id: 2,
    created: moment().subtract(2, 'days'),
};
export const thisMonth = {
    ...basePost,
    title: "本月",
    id: 3,
    created: moment().subtract(2, 'weeks'),
};
//# sourceMappingURL=index.js.map