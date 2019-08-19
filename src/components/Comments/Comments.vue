<template>
  <div
    class="comments"
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
      _.orderBy(this.comments, 'date', 'desc')
      return [...this.comments].splice(0, this.commentsAmount)
    }
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

<style scoped>

</style>
