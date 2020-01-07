<template>
  <div id="app">
    <splitpanes class="default-theme">
      <pane min-size="5">
        <GoodTable :dailyData="daily.jarrod" title="Jarrod"/>
      </pane>
      <pane min-size="5">
        <GoodTable :dailyData="daily.joel" title="Joel"/>
      </pane>
      <pane min-size="5">
        <GoodTable :dailyData="daily.chris" title="Chris"/>
      </pane>
    </splitpanes>

    <splitpanes class="default-theme">
      <pane min-size="5">
        <GoodTable :dailyData="daily.terry" title="Terry"/>
      </pane>
      <pane min-size="5">
        <GoodTable :dailyData="daily.seb" title="Seb"/>
      </pane>
    </splitpanes>
  </div>
</template>

<script>
import { Splitpanes, Pane } from 'splitpanes';
import GoodTable from './components/GoodTable.vue';
import { db } from './db';

import 'splitpanes/dist/splitpanes.css';

const moment = require('moment');

const DATE_FORMAT = process.env.DATEFORMAT || 'YYYYMMDD';
const CURRENT_DATE = process.env.DATE || moment().format(DATE_FORMAT);

export default {
  name: 'app',
  components: {
    GoodTable, Splitpanes, Pane,
  },
  data() {
    return {
      jarrod: [],
      joel: [],
      chris: [],
      terry: [],
      seb: [],
      daily: {
        jarrod: [],
        joel: [],
        chris: [],
        terry: [],
        seb: [],
      },
    };
  },
  firestore: {
    jarrod: db.collection('jalank').doc(CURRENT_DATE),
    joel: db.collection('joelfuller').doc(CURRENT_DATE),
    chris: db.collection('chrislaw').doc(CURRENT_DATE),
    terry: db.collection('terry').doc(CURRENT_DATE),
    seb: db.collection('thesabinator88').doc(CURRENT_DATE),
  },
  watch: {
    jarrod(newDoc) {
      this.daily.jarrod = JSON.parse(JSON.parse(newDoc.dailyOutput));
    },
    joel(newDoc) {
      this.daily.joel = JSON.parse(JSON.parse(newDoc.dailyOutput));
    },
    chris(newDoc) {
      this.daily.chris = JSON.parse(JSON.parse(newDoc.dailyOutput));
    },
    terry(newDoc) {
      this.daily.terry = JSON.parse(JSON.parse(newDoc.dailyOutput));
    },
    seb(newDoc) {
      this.daily.seb = JSON.parse(JSON.parse(newDoc.dailyOutput));
    },
  },
};
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .splitpanes.default-theme .splitpanes__pane {
    background-color: transparent;
  }
  .default-theme.splitpanes--vertical>.splitpanes__splitter,
  .default-theme .splitpanes--vertical>.splitpanes__splitter {
    border-left: 0;
  }
</style>
