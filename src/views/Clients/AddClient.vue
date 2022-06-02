<template>
  <vs-sidebar
    click-not-close
    position-right
    parent="body"
    default-index="1"
    color="primary"
    class="add-new-data-sidebar items-no-padding"
    spacer
    v-model="isSidebarActiveLocal"
  >
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>Adicionar Cliente</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component
      :is="scrollbarTag"
      class="scroll-area--data-list-add-new"
      :settings="settings"
      :key="$vs.rtl"
    >
      <div class="p-6">
        <!-- NAME -->
        <vs-input
          label="Nome"
          v-model="dataName"
          class="mt-5 w-full"
          name="item-name"
          v-validate="'required'"
        />

        <vs-input
          label="Telefone"
          v-model="dataPhone"
          class="mt-5 w-full"
          name="item-name"
          v-validate="'required'"
          type="tel" v-mask="'(##) ####-#####'"
        />
        <vs-input
          label="Login"
          v-model="dataLogin"
          class="mt-5 w-full"
          name="item-name"
          v-validate="'required'"
        />
        <vs-input
          label="CPF"
          v-model="dataCPF"
          class="mt-5 w-full"
          name="item-name"
          v-validate="'required'"
          type="tel" v-mask="'###.###.###-##'"
        />
      </div>
    </component>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="mr-6" @click="submitData">Salvar</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancelar</vs-button>
    </div>
  </vs-sidebar>
</template>


<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import { db_firebase } from "../../firebase/firebaseConfig";
import { platform } from "chart.js";
import {TheMask} from 'vue-the-mask'
export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    VuePerfectScrollbar,
    TheMask
  },
  data() {
    return {
      dataId: null,
      dataName: "",
      dataCPF: "",
      dataPhone: "",
      dataLogin: "",
      settings: {
        // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      }
    };
  },
  watch: {
    isSidebarActive(val) {
      if (!val) return;
      if (Object.entries(this.data).length === 0) {
        this.initValues();
        this.$validator.reset();
      } else {
        const { phone, key, CPF, name, login } = JSON.parse(
          JSON.stringify(this.data)
        );
        this.dataId = key;
        this.dataName = name;
        this.dataCPF = CPF;
        this.dataPhone = phone;
        this.dataLogin = login;
        this.initValues();
      }
      // Object.entries(this.data).length === 0 ? this.initValues() : { this.dataId, this.dataName, this.dataCategory, this.dataOrder_status, this.dataPrice } = JSON.parse(JSON.stringify(this.data))
    }
  },
  computed: {
    isSidebarActiveLocal: {
      get() {
        return this.isSidebarActive;
      },
      set(val) {
        if (!val) {
          this.$emit("closeSidebar");
        }
      }
    },

    scrollbarTag() {
      return this.$store.getters.scrollbarTag;
    }
  },
  methods: {
    initValues() {
      if (this.data.key) return;
      this.dataCPF = "";
      this.dataId = null;
      this.dataName = "";
      this.dataPhone = "";
      this.dataLogin = "";
    },
    submitData() {
      if (this.dataId != null) {
        db_firebase
          .collection("clients")
          .doc(this.dataId)
          .update({
            CPF: this.dataCPF,
            name: this.dataName,
            phone: this.dataPhone,
            login: this.dataLogin
          })
          .then(doc => {
            <vs-alert active="true">Bug editado!</vs-alert>;
            this.$emit("closeSidebar");
            this.initValues();
          });
      } else {
        console.log(this.dataCPF);
        console.log(this.dataName);
        console.log(this.dataPhone);
        console.log(this.dataLogin);
        db_firebase
          .collection("clients")
          .add({
            CPF: this.dataCPF,
            name: this.dataName,
            phone: this.dataPhone,
            login: this.dataLogin,
            active: 1
          })
          .then(doc => {
            console.log(doc.id);
            this.$emit("closeSidebar");
            this.initValues();
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    updateCurrImg(input) {
      if (input.target.files && input.target.files[0]) {
        const reader = new FileReader();
        reader.onload = e => {
          this.dataImg = e.target.result;
        };
        reader.readAsDataURL(input.target.files[0]);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.add-new-data-sidebar {
  ::v-deep .vs-sidebar--background {
    z-index: 52010;
  }

  ::v-deep .vs-sidebar {
    z-index: 52010;
    width: 400px;
    max-width: 90vw;

    .img-upload {
      margin-top: 2rem;

      .con-img-upload {
        padding: 0;
      }

      .con-input-upload {
        width: 100%;
        margin: 0;
      }
    }
  }
}

.scroll-area--data-list-add-new {
  // height: calc(var(--vh, 1vh) * 100 - 4.3rem);
  height: calc(var(--vh, 1vh) * 100 - 16px - 45px - 82px);

  &:not(.ps) {
    overflow-y: auto;
  }
}
</style>