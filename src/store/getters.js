export default {
  isUserLoggedIn(state) {
    return !!state.token && !!state.user;
  },
  getBaseURL() {
    return 'http://localhost:4000';
  },
  getUploadFolderName() {
    return 'uploads';
  }
};
