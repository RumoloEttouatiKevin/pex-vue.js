<template>
  <div>
    <ScoreBoard 
      :winCount="this.winCount"
      :loseCount="this.loseCount"
    />

    <template v-if="this.question">
      <h1 v-html="this.question"></h1>
  
      <template v-for="(answer, index) in this.answers" :key="'answer_' + index">
        <input
          type="radio"
          name="options"
          :id="'answer_' + index"
          :value="answer"
          :disabled="this.answerSubmitted"
          v-model="this.answerSelected"
        >
        <label
          :for="'answer_' + index"
          v-html="answer
        "></label>
        <br>
      </template>
  
      <button
        class="send"
        type="button"
        v-if="!this.answerSubmitted"
        @click="this.handleSubmitAnswer()"
      >
        Send
      </button>

      <section
        class="results"
        v-if="this.answerSubmitted"
      >
        <h4
          v-if="this.answerSelected === this.correctAnswers"
          v-html="'&#9989; Congratulations, the answer &quot;' + this.correctAnswers + '&quot; is correct.'"
        ></h4>
        <h4
          v-else
          v-html="'&#10060; I\'m sorry, you picked the wrong answer. The correct is &quot;' + this.correctAnswers + '&quot;.'"
        ></h4>
        <button
          class="send"
          type="button"
          @click="this.getNewQuestion()"
        >
          Next question
        </button>
      </section>
    </template>
  </div>
</template>

<script>
import ScoreBoard from './components/ScoreBoard.vue';

export default {
  name: 'App',
  data() {
    return {
      question: undefined,
      incorrectAnswers: undefined,
      correctAnswers: undefined,
      answerSelected: undefined,
      answerSubmitted: false,
      winCount: 0,
      loseCount: 0,
    };
  },
  created() {
    this.getNewQuestion();
  },
  components: {
    ScoreBoard
  },
  computed: {
    answers() {
      let answers = JSON.parse(JSON.stringify(this.incorrectAnswers));
      answers.splice(Math.floor(Math.random() * (answers.length + 1)), 0, this.correctAnswers);
      return answers;
    }
  },
  methods: {
    handleSubmitAnswer() {
      if (!this.answerSelected) {
        alert('Pick one of the options!');
        return;
      }

      this.answerSubmitted = true;

      if (this.answerSelected === this.correctAnswers) {
        this.winCount++;
      } else {
        this.loseCount++;
      }
    },
    getNewQuestion() {
      this.resetQuestionData();
      this.axios
      .get('https://opentdb.com/api.php?amount=1&category=18')
      .then((response) => {
        this.question = response.data.results[0].question;
        this.incorrectAnswers = response.data.results[0].incorrect_answers;
        this.correctAnswers = response.data.results[0].correct_answer;
      });
    },
    resetQuestionData() {
      this.question = undefined;
      this.incorrectAnswers = undefined;
      this.correctAnswers = undefined;
      this.answerSelected = undefined;
      this.answerSubmitted = false;
    },
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
  max-width: 960px;

  input[type=radio] {
    margin: 12px 4px;
  }

  button.send {
    margin-top: 12px;
    height: 40px;
    min-width: 120px;
    padding: 0 16px;
    color: #fff;
    background-color: #1867c0;
    border: #1867c0;
    cursor: pointer;
  }
}
</style>
