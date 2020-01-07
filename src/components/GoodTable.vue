<template>
  <div class="goodTable">
    <h2>{{ title }}</h2>

    <vue-good-table
      :columns="columns"
      :rows="dailyData">

      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'percentage'">
          <loading-progress
            :progress="formatPercent(props.row.percentage)"
            :indeterminate="indeterminate"
            :counter-clockwise="counterClockwise"
            :hide-background="hideBackground"
            shape="line"
            size="200"
            width="200"
            height="6"
          />

          {{ props.row.percentage.toFixed(2) }}%
        </span>
        <span v-else>
          {{props.formattedRow[props.column.field]}}
        </span>
      </template>

      <div slot="table-actions-bottom" style="padding: 10px 0;">
        Total Time: {{ formatDurationToString(calculateTotalDuration()) }}
      </div>
    </vue-good-table>
  </div>
</template>

<script>
const moment = require('moment');
// eslint-disable-next-line
const momentDurationFormatSetup = require('moment-duration-format');

export default {
  name: 'GoodTable',
  props: ['dailyData', 'title'],
  data() {
    return {
      indeterminate: false,
      counterClockwise: false,
      hideBackground: false,
      columns: [
        {
          label: 'Activity',
          field: 'activity',
        },
        {
          label: 'Duration',
          field: 'durationString',
        },
        {
          label: 'Percentage',
          field: 'percentage',
          type: 'percentage',
        },
      ],
    };
  },
  methods: {
    formatPercent(val) {
      // return (val / 100).toFixed(2);
      return (val / 100);
    },
    calculateTotalDuration() {
      return this.dailyData.reduce((accum, dailyData) => accum + dailyData.duration, 0);
    },
    formatDurationToString(duration) {
      return moment.duration(duration, 'seconds').format('h[hrs], m[min]');
    },
  },
};
</script>

<style>
  @import '../../node_modules/vue-progress-path/dist/vue-progress-path.css';
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
  }
  h1,
  h2 {
    font-weight: normal;
  }
  a {
    color: #42b983;
  }
  pre {
    background: #eee;
    padding: 12px;
  }
  h1,
  h2,
  pre,
  .view,
  .settings {
    margin: 32px;
  }
  .view {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .settings {
    padding-top: 32px;
    border-top: solid 1px #eee;
  }
  input[type="range"] {
    width: calc(100vw - 300px);
  }

  .goodTable {
    margin-top: 50px;
  }
</style>
