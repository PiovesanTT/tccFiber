<template>
  <div id="dashboard-analytics">
    <div class="vx-row">

      <!-- INFORMAÇÃO SOBRE O SISTEMA -->
      <div class="vx-col w-full lg:w-1/2 mb-base">
        <vx-card slot="no-body" class="text-center bg-primary-gradient greet-user">
                    <img src="../assets/images/elements/decore-left.png" class="decore-left" alt="Decore Left" width="200" >
                    <img src="../assets/images/elements/decore-right.png" class="decore-right" alt="Decore Right" width="175">
          <feather-icon icon="AwardIcon" class="p-6 mb-8 bg-primary inline-flex rounded-full text-white shadow" svgClasses="h-8 w-8"></feather-icon>
          <h1 class="mb-6 text-white">Parabéns!</h1>
          <p class="xl:w-3/4 lg:w-4/5 md:w-2/3 w-4/5 mx-auto text-white">Você está utilizado a última versão do <strong>Fiber D.O.P.P.I</strong></p>
        </vx-card>
      </div>

      <!-- TOTAL DE CLIENTES -->
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <statistics-card-line icon="UsersIcon" v-bind:statistic="this.totalClientes" statisticTitle="Usuários"  type="area"></statistics-card-line>
      </div>

      <!-- TOTAL DE PRODUTOS -->
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <statistics-card-line icon="PackageIcon" v-bind:statistic="this.totalProducts" statisticTitle="Produtos"  color="warning" type="area"></statistics-card-line>
      </div>
    </div>

  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
import analyticsData from '../views/ui-elements/card/analyticsData'
import ChangeTimeDurationDropdown from '@/components/ChangeTimeDurationDropdown.vue'
import VxTimeline from '@/components/timeline/VxTimeline'
import { db_firebase } from "./../firebase/firebaseConfig";
export default {
  data () {
    return {
      totalClientes: "",
      totalProducts: "",
      usersStats: [],
      servicesOrderStats: [],
      analyticsData,
    }
  },
  components: {
    VueApexCharts,
    StatisticsCardLine,
    ChangeTimeDurationDropdown,
    VxTimeline
  },
  created () {
    this.$session.start();
      if (this.$session.get("uid") == null) {
        this.$router.replace("pages/login");
    };
    this.recuperarDados();
  },
  methods:{
    recuperarDados(){
      db_firebase
        .collection("clients")
        .get()
        .then(snap => {
          this.totalClientes = snap.size;
        });
      db_firebase
        .collection("products")
        .get()
        .then(snap => {
          this.totalProducts = snap.size;
        });
    }
  }
}
</script>

<style lang="scss">
/*! rtl:begin:ignore */
#dashboard-analytics {
  .greet-user{
    position: relative;

    .decore-left{
      position: absolute;
      left:0;
      top: 0;
    }
    .decore-right{
      position: absolute;
      right:0;
      top: 0;
    }
  }

  @media(max-width: 576px) {
    .decore-left, .decore-right{
      width: 140px;
    }
  }
}
/*! rtl:end:ignore */
</style>
