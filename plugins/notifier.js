export default ({ app, store }, inject) => {
    inject("msg", {
      showMessage({ content = "", color = "" }) {
        store.commit("snackbar/showMessage", { content, color });
      }
    });
  };