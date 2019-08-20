<template>
  <div
    class="comments-wrapper"
  >
    <div class="comments-list">
      <single-comment
        v-for="comment in showComments"
        :key="comment.id"
        :comment="comment"
      />
    </div>
    <button
      v-if="comments.length > commentsAmount"
      class="comments-load-more"
      @click="increaseCommentsAmount"
    >
      load more comments...
    </button>
    <p
      v-if="!(comments.length > commentsAmount)"
      class="comments-loaded comments-load-more"
    >
      There is no more comments to load :/
    </p>
  </div>
</template>

<script>
import SingleComment from './SingleComment'
import CommentStore from '../../stores/CommentStore'
import _ from 'lodash'
export default {
  name: 'Comments',
  components: { SingleComment },
  data () {
    return ({
      comments: CommentStore.data.comments[this.$route.query.id],
      commentsAmount: 2,
      commentsPerLoad: 2
    })
  },
  computed: {
    showComments () {
      return _.orderBy(this.comments, 'date', 'desc').splice(0, this.commentsAmount)
    }
  },
  beforeCreate () {
    CommentStore.methods.addKey(this.$route.query.id)
  },
  methods: {
    increaseCommentsAmount () {
      if (this.comments.length < this.commentsAmount + this.commentsPerLoad) {
        this.commentsAmount = this.comments.length
      } else {
        this.commentsAmount += this.commentsPerLoad
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .comments-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .comments-list {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: center;
      width: 100%;
      margin: 0;
      @media screen and (max-width: 660px) {
        flex-wrap: nowrap;
        flex-direction: column;
      }
    }
    button, .comments-load-more {
      font-size: 20px;
      padding: 10px;
      border: 1px solid black;
      color: black;
      background-color: white;
      margin: 30px auto;
      &:focus {
        outline: none;
      }
      &:not(button){
        border: none;
      }
    }
    .comments-loaded {
      width: 100%;
      text-align: center;
    }
  }
</style>
