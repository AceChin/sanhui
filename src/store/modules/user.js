export default {
    state:{
      id: "",
      organizationId:"",
      name: "",
      role:"supplier",
      avatar:"",
    },
    mutations: {
      INIT_USER_INFO: (state,infos)=>{
        state.avatar=infos
      },
      SET_TOKEN: (state, token) => {
        state.token = token
      },
      SET_NAME: (state, name) => {
        state.name = name
      },
      SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
      },
      SET_ROLES: (state, roles) => {
        state.roles = roles
      }
    },
    actions:{
      initUserInfo:({ commit },infos)=>{
        if(!infos) return;
        commit("INIT_USER_INFO",infos)
      }
    }
  }