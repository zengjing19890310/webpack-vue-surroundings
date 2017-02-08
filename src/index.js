import Vue from 'vue'

import index from './index.vue';

console.log(1)

new Vue({
    el: '#root',
    render: h => h(index)
})