<template>
  <div id="extra-component-chartist-demo">
    <h2 class="mb-4">Relatórios</h2>
    <div class="vx-row">
      <!-- CHART DOS CLIENTES-->
      <div class="vx-col md:w-1/2 w-full mb-base">
        <vx-card title="Clientes" code-toggler>
          <vue-apex-charts
            type="pie"
            height="350"
            :options="this.chartOptions"
            :series="this.seriesClientes"
          ></vue-apex-charts>
        </vx-card>
      </div>

      <!-- CHART DOS PRODUTOS -->
      <div class="vx-col md:w-1/2 w-full mb-base">
        <vx-card title="Produtos" code-toggler>
          <vue-apex-charts
            type="donut"
            height="350"
            :options="this.chartOptions"
            :series="this.seriesProdutos"
          ></vue-apex-charts>
        </vx-card>
      </div>
    </div>
    <div class="vx-row">
      <!-- CHART DOS CLIENTES-->
      <div class="vx-col md:w-1/2 w-full mb-base">
        <vx-card title="Estoque" code-toggler>
          <vue-apex-charts
            type="bar"
            height="350"
            :options="this.chartOptionsBar"
            :series="this.series"
          ></vue-apex-charts>
        </vx-card>
      </div>

      <!-- CHART DOS PRODUTOS -->
      <div class="vx-col md:w-1/2 w-full mb-base">
        <vx-card title="Ordem de Serviços" code-toggler>
          <vue-apex-charts
            type="donut"
            height="350"
            :options="this.chartOptionsOrdemServico"
            :series="this.seriesOrdemServicos"
          ></vue-apex-charts>
        </vx-card>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import apexChatData from "../components/apexChartData";
import { db_firebase } from "./../firebase/firebaseConfig";

export default {
  data() {
    return {
      apexChatData,
      totalClientesAtivos: [],
      totalClientesInativos: [],
      totalOrdemServicosCriado: [],
      totalOrdemServicosAndamento: [],
      totalOrdemServicosConcluido: [],
      clientesAtivos: 0,
      clientesInativos: 0,
      series: [
        {
          data: [666]
        }
      ],
      seriesClientes: [],
      seriesProdutos: [],
      seriesOrdemServicos: [1, 1, 1],
      chartOptionsBar: {
        colors: ["#7367F0", "#28C76F", "#EA5455", "#FF9F43", "#1E1E1E"],
        plotOptions: {
          bar: {
            horizontal: false
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: ['teste']
        }
      },
      chartOptions: {
        labels: ["Ativo", "Inativo"],
        colors: ["#2EA5f0", "#C72831"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      },
      chartOptionsOrdemServico: {
        labels: ["Criado", "Em Andamento", "Concluído"],
        colors: ["#2EA5f0", "#f7e97e", "#45ed8e"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      }
    };
  },
  created() {
    this.graphClientes();
    this.graphProdutos();
    this.graphEstoque();
    this.graphOrdemServico();
  },
  methods: {
    graphClientes() {
      // this.series[0].data.push(111);
      // console.log(this.series[0].data)
      db_firebase
        .collection("clients")
        .where("active", "==", 1)
        .get()
        .then(snap => {
          this.clientesAtivos = snap.size;
          this.seriesClientes.push(this.clientesAtivos);
        });
      db_firebase
        .collection("clients")
        .where("active", "==", 0)
        .get()
        .then(snap => {
          this.clientesInativos = snap.size;
          this.seriesClientes.push(this.clientesInativos);
        });
    },
    graphProdutos() {
      db_firebase
        .collection("products")
        .where("active", "==", 1)
        .get()
        .then(snap => {
          this.clientesAtivos = snap.size;
          this.seriesProdutos.push(this.clientesAtivos);
        });
      db_firebase
        .collection("products")
        .where("active", "==", 0)
        .get()
        .then(snap => {
          this.clientesInativos = snap.size;
          this.seriesProdutos.push(this.clientesInativos);
        });
    },
    graphEstoque() {
      db_firebase
        .collection("products")
        .where("active", "==", 1)
        .onSnapshot(snapshotChange => {
          this.series[0].data.length = 0;
          this.chartOptionsBar.xaxis.categories.length = 0;
          snapshotChange.forEach(doc => {
            this.series[0].data.push(parseInt(doc.data().stock));
            this.chartOptionsBar.xaxis.categories.push(doc.data().name);
          });
        });
    }
  },
  components: {
    VueApexCharts
  }
};
</script>