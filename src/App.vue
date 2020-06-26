<template>
  <div>

    <v-toolbar>
      <v-toolbar-title>Detroit Voter</v-toolbar-title>
    </v-toolbar>

    <v-card class="card-container">
      <vote-graph v-if="chartData" :chart-data="chartData" class="graph"/>
    </v-card>

    <v-card class="vote-card card-container" v-show="!voted">
      <div class="vote-card-title-container">
        <span class="vote-card-title">Vote for the decision</span>
      </div>
      <div class="button-container" v-if="connected">
        <button class="console-button" v-on:click="(e) => onConsoleButtonClick('A', e)"><v-img class="console-button-img" src="./assets/A.svg"></v-img></button>
        <button class="console-button" v-on:click="(e) => onConsoleButtonClick('B', e)"><v-img class="console-button-img" src="./assets/B.svg"></v-img></button>
        <button class="console-button" v-on:click="(e) => onConsoleButtonClick('X', e)"><v-img class="console-button-img" src="./assets/X.svg"></v-img></button>
        <button class="console-button" v-on:click="(e) => onConsoleButtonClick('Y', e)"><v-img class="console-button-img" src="./assets/Y.svg"></v-img></button>
      </div>

    </v-card>
  </div>
</template>

<script>
import VoteGraph from "./components/vote-graph";
import VoterSocketService from './services/VoterSocketService';

export default {
  name: 'App',

  components: {
    VoteGraph
  },

  methods: {
    onConsoleButtonClick: function (button, e) {
      e.preventDefault();
      this.socket.sendAction(button);
      this.voted = true;
    },

    onVotesReceived(votesJSON) {
      this.votes = JSON.parse(votesJSON.data);
      if (this.votes.A === 0 && this.votes.B === 0 && this.votes.X === 0 && this.votes.Y === 0) {
        this.voted = false;
      }
    },

    onConnect() {
      this.connected = true;
      console.log('Connected');
    }
  },

  data: () => ({
    chartData: null,
    votes: null,
    connected: false,
    voted: false
  }),

  watch: {
    votes: function (val) {
      let options = [];
      let values = [];

      for (let k in val) {
        options.push(k);
        values.push(val[k]);
      }

      this.chartData = {
        labels: options,
        datasets: [
          {
            label: 'Votes',
            backgroundColor: '#f87979',
            data: values
          }
        ]
      }
    }

  },

  mounted() {
    this.socket = new VoterSocketService(this.onConnect, this.onVotesReceived);
    this.votes = {
      A: 0, B: 0, X: 0, Y: 0
    };
  },

  beforeDestroy() {
    this.socket.disconnect();
    this.connected = false;
  }

}

</script>

<style>
  .graph {
    padding: 1em 2em 1em 2em;
  }

  .button-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .console-button {
    flex-grow: 1;
    max-width: 8em;
    margin-right: 1em;
    border: none;
    outline: none;
  }

  .vote-card {
    text-align: center;
    padding: 1em 0 1em 0;
  }

  .vote-card-title {
    padding-bottom: 1em;
    font-size: 2em;
    font-family: "Roboto", sans-serif;
  }

  .vote-card-title-container {
    padding-bottom: 1em;
  }

  .console-button-img:hover {
    filter: drop-shadow(0 0 0.75rem crimson);
  }

  .console-button-img:active {
    transform: scale(0.95);
  }

  .card-container {
    margin: 1em;
  }

</style>
