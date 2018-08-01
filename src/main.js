// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

import vuefire from 'vuefire'

Vue.config.productionTip = false
Vue.use(vuefire)

let app
// Initialize Firebase
let config = {
  apiKey: 'AIzaSyCVjJEeWJbS51OmOSvGBK3ykW03lZWluU4',
  authDomain: 'carnetdevoyage-2506.firebaseapp.com',
  databaseURL: 'https://carnetdevoyage-2506.firebaseio.com',
  projectId: 'carnetdevoyage-2506',
  storageBucket: 'carnetdevoyage-2506.appspot.com',
  messagingSenderId: '831263262131'
}

firebase.initializeApp(config)

firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>'
    })
  }
})
