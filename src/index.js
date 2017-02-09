"use strict";

import Vue from 'vue';

import index from './index.vue';

new Vue({
    el: "#root",
    render: function (h) {
        return h(index)
    }
})