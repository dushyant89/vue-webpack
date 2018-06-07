import Vue from 'vue';
import MainContent from './views/main-content';

let MainComponent = Vue.extend(MainContent);

new MainComponent().$mount("#mainContent");