const getters={
    name: state => state.user.name,
    id: state => state.user.id,
    orgId: state => state.user.organizationId,
    avatar: state => state.user.avatar,
    role: state => state.user.role,
    label: state => state.user.label,
    isCollapse: state => state.app.isCollapse,
    topNavState: state => state.app.topNavState,
    leftNavState: state => state.app.leftNavState,
    language: state => state.app.language,
  }
  
  export default getters