import Vue from 'vue';

Vue.component('button-component', {
  render(createElement) {
    return createElement(
      this.attributes.tagName,
      {
        attrs: {
          type: this.attributes.type
        },
        class: `${this.properties.className} ${this.attributes.className}`,
        style: this.style,
        on: this.attributes.event ? { click: this.attributes.event } : null
      },
      this.$slots.default
    );
  },
  props: {
    tagName: {
      type: String,
      default: 'button',
      validator(value) {
        return ['button', 'a'].includes(value);
      }
    },
    attributes: {
      type: Object,
      default() {
        return {};
      }
    },
    styles: {
      type: Object
    }
  },
  data() {
    return {
      properties: {
        className: 'button_common'
      }
    };
  }
});
