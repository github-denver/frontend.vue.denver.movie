<template>
  <div class="field_common">
    <label :for="attributes.id" class="label_field">{{ attributes.title }}</label>

    <div class="box_field">
      <input :type="attributes.type" :id="attributes.id" :class="['textfield_local', attributes.className]" :name="attributes.name" :value="attributes.value" :readonly="attributes.readonly" :refs="attributes.refs" @input="$emit('onInsert', { name: attributes.id, value: $event.target.value })" @keyup="$emit('onEraser', { eraser: attributes.id })" />

      <slot name="confirm"></slot>
    </div>

    <slot name="children"></slot>
  </div>
</template>

<script>
export default {
  name: 'Field',
  props: {
    attributes: {
      type: Object,
      default() {
        return {};
      }
    },
    styles: {
      type: Object
    }
  }
};
</script>

<style scoped>
/* field_common
---------- ---------- ---------- ---------- ---------- */
.field_common .label_field {
  display: inline-block;
  font-size: 1.4rem;
  vertical-align: top;
}

.field_common .label_field + .box_field {
  margin-top: 1.2rem;
}

.field_common ~ .field_common {
  margin-top: 2rem;
}

/* box_field
---------- ---------- ---------- ---------- ---------- */
.box_field {
  overflow: hidden;
  display: block;
  position: relative;
  border: 0.1rem solid #1b3c69;
  border-radius: 0.6rem;
  box-sizing: border-box;
}

.box_field .button_common {
  position: absolute;
  top: -0.1rem;
  right: -0.1rem;
  bottom: -0.1rem;
  z-index: 1;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.box_field .textfield_local {
  width: 100%;
  height: 3.8rem;
  padding: 1rem;
  border: 0 none;
  border-radius: 0.6rem;
  box-sizing: border-box;
  font-size: 1.4rem;
  background-color: #0f223c;
}

.box_field .textfield_local:-webkit-autofill,
.box_field .textfield_local:-webkit-autofill:hover,
.box_field .textfield_local:-webkit-autofill:focus {
  font-size: 1.4rem;
  transition: background-color 4000s ease-in-out 0s;
  -webkit-text-fill-color: #fff;
}

.box_field .textfield_local:autofill,
.box_field .textfield_local:autofill:hover,
.box_field .textfield_local:autofill:focus {
  font-size: 1.4rem;
  transition: background-color 4000s ease-in-out 0s;
  -webkit-text-fill-color: #fff;
}

/* ========== ========== ========== ========== ==========
////////// ////////// :deep ////////// //////////
========== ========== ========== ========== ========== */
/* box_field
---------- ---------- ---------- ---------- ---------- */
.box_field .button_common :deep(.text_local:only-child) {
  vertical-align: top;
}

/* ========== ========== ========== ========== ==========
////////// ////////// Media Query ////////// //////////
========== ========== ========== ========== ========== */
@media only screen and (max-width: 1023px) {
}
</style>
