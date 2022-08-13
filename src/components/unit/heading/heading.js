import Vue from 'vue';

Vue.component('heading-component', {
  render(createElement) {
    return createElement(
      this.attributes.tagName,
      {
        class: this.attributes.className,
        style: this.style
      },
      this.$slots.default
    );
  },
  props: {
    attributes: {
      type: Object,
      default() {
        return {
          className: 'invisible'
        };
      }
    },
    styles: {
      type: Object
    }
  }
});
