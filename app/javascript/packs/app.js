import Vue from 'vue/dist/vue.esm'
import Chart, { registerables } from 'chart.js/auto';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import RouletteXpCalculator from './components/RouletteXpCalculator'

document.addEventListener('DOMContentLoaded', () => {
  var colors = [
    { border: 'rgba(255,0,0,255)',      background: 'rgba(255,0,0,100)' },     // red
    { border: 'rgba(255,102,255,255)',  background: 'rgba(255,102,255,100)' }, // pink
    { border: 'rgba(204,153,51,255)',   background: 'rgba(204,153,51,100)' },  // brown
    { border: 'rgba(51,153,0,255)',     background: 'rgba(51,153,0,100)' },    // green
    { border: 'rgba(51,102,255,255)',   background: 'rgba(51,102,255,100)' },  // blue
    { border: 'rgba(102,51,255,255)',   background: 'rgba(102,51,255,100)' },  // purple
    { border: 'rgba(0,0,0,255)',        background: 'rgba(0,0,0,100)' },       // brown
  ]

  var navbar = document.getElementById('top-navbar')
  if (navbar !== null) {
    new Vue({ el: navbar })
  }

  var dungeonForm = document.getElementById('dungeon-form')
  if (dungeonForm !== null) {
    new Vue({
      el: dungeonForm,
      data: {
        jobs: JSON.parse(dungeonForm.dataset.jobs),
        instances: JSON.parse(dungeonForm.dataset.instances),
        roulettes: JSON.parse(dungeonForm.dataset.roulettes)
      },
    })
  }

  var rouletteMetrics = document.getElementById('roulette-metrics')
  if (rouletteMetrics !== null) {
    var chartEntries = JSON.parse(rouletteMetrics.dataset.chartEntries)
    new Vue({
      el: rouletteMetrics,
      data: {
        tableEntries: JSON.parse(rouletteMetrics.dataset.tableEntries),
        chartEntries: chartEntries,
        columns: JSON.parse(rouletteMetrics.dataset.columns)
      },
    })

    Object.keys(chartEntries).forEach((graph) => {
      var ctx = document.getElementById(`bubbleplot-${graph}`);
      new Chart(ctx, {
        type: 'bubble',
        data: {
          datasets: Object.keys(chartEntries[graph]).map((k, i) => {
            return ({
              label: k,
              data: chartEntries[graph][k],
              borderColor: colors[i]['border'],
              backgroundColor: colors[i]['background']
            });
          }),
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    });
  }

  var instanceMetrics = document.getElementById('instance-type-metrics')
  if (instanceMetrics !== null) {
    new Vue({
      el: instanceMetrics,
      data: {
      }
    })
  }

  var xpCalculator = document.getElementById('roulette-xp-calculator')
  if (xpCalculator !== null) {
    var roulettes = JSON.parse(document.getElementById('roulette-names').dataset.roulettes)
    new Vue({
      el: xpCalculator,
      components: { RouletteXpCalculator },
      template: `<RouletteXpCalculator v-bind:roulettes="roulettes" />`,
      data: {
        roulettes: roulettes,
      },
    })
  }
})
