<template>
  <div class="upload_common">
    <label :for="attributes.id" class="label_upload">
      <Cell>
        <template v-slot:children>
          <Icon :attributes="{ className: attributes.icon, text: attributes.text }" />
        </template>
      </Cell>
    </label>

    <input type="file" :name="attributes.id" :id="attributes.id" class="textfield_upload" @change="onChange" />
  </div>
</template>

<script>
import Icon from '@/components/unit/icon/Index.vue';
import Cell from '@/components/unit/cell/Index.vue';

export default {
  name: 'Upload',
  components: { Icon, Cell },
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
  },
  data() {
    return {
      upload: {
        files: null,
        result: null
      }
    };
  },
  methods: {
    onChange(event) {
      if (window.FileReader) {
        // 이미지 파일만 통과합니다.
        if (!event.target.files[0].type.match(/image\//)) return;

        // 읽기
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

        this.upload.files = event.target.files[0];
        // console.log('this.upload.files: ', this.upload.files);

        // 읽은 후
        reader.onload = (event) => {
          this.upload.result = event.target.result;
          // console.log('this.upload.result: ', this.upload.result);

          const formData = new FormData();
          formData.append('files', this.upload.files);
          formData.append('result', this.upload.result);

          this.$emit('onUpload', formData);
        };
      }
    }
  }
};
</script>

<style scoped>
/* upload_common
---------- ---------- ---------- ---------- ---------- */
.upload_common {
  overflow: hidden;
  border-radius: 100%;
  font-size: 0.1rem;
  line-height: 0;
  color: transparent;
  background-color: #1b3c69;
}

.upload_common .label_upload {
  display: block;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
}

.upload_common .label_upload .cell_common {
  height: 100%;
}

.upload_common .label_upload .icon_common {
  margin: 0 auto;
}

.upload_common .textfield_upload {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 0.1rem;
  height: 0.1rem;
}

/* ========== ========== ========== ========== ==========
////////// ////////// Media Query ////////// //////////
========== ========== ========== ========== ========== */
@media only screen and (max-width: 1023px) {
}
</style>
