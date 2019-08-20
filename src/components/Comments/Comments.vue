<template>
  <div
    class="comments-list"
  >
    <single-comment
      v-for="comment in showComments"
      :key="comment.id"
      :comment="comment"
    />
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
  created () {
    console.log(CommentStore.data)
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
  .comments-list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    button, .comments-load-more {
      font-size: 20px;
      padding: 10px;
      border: 1px solid black;
      color: black;
      background-color: white;
      width: 100%;
      margin-bottom: 30px;
      &:focus {
        outline: none;
      }
    }
    .comments-loaded {
      width: 100%;
      text-align: center;
    }
  }
</style>
