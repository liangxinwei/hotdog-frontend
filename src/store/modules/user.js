import Vue from 'vue';
import {resetRouter} from '@/router';
import Url from '@/utils/url';
import Storage from '@/utils/storage';

const state = {
  name: Storage.get('box_name'),
  userId: Storage.get('box_admin_user_id'),
  telephone: Storage.get('telephone'),
  avatar: Storage.get('box_avatar') || Url.BOX_LOGO,
};

const mutations = {
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_TELEPHONE: (state, telephone) => {
    state.telephone = telephone;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_USER_ID: (state, userId) => {
    state.userId = userId;
  },
};

const actions = {
  login({commit}, userInfo) {
    const {telephone, password} = userInfo;
    return new Promise((resolve, reject) => {
      Vue.prototype.$http.post(Url.LOGIN, {
        telephone: telephone.trim(),
        password: password
      }).then(res => {
        res.access_token = 'token';
        commit('SET_TOKEN', res.access_token);
        commit('SET_ROLES', res.roles);
        commit('SET_ACCOUNT', res.account);
        commit('SET_NAME', res.login_name);
        commit('SET_USER_ID', res.admin_user_id);
        commit('SET_TELEPHONE', res.telephone);
        Auth.setToken(res);
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  },
  logout({commit, state}) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$http.get(Url.LOGOUT).then(() => {
        commit('SET_TOKEN', '');
        commit('SET_ROLES', []);
        commit('SET_AVATAR', Url.BOX_LOGO);
        commit('SET_MENUS', []);
        commit('SET_MODULES', []);
        commit('SET_UIS', []);
        Auth.removeToken();
        resetRouter();
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  },
  resetToken({commit}) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '');
      commit('SET_ROLES', []);
      commit('SET_AVATAR', Url.BOX_LOGO);
      commit('SET_TELEPHONE', null);
      commit('SET_MENUS', []);
      commit('SET_MODULES', []);
      commit('SET_UIS', []);
      Auth.removeToken();
      resetRouter();
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
