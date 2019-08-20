<template>
  <form
    method="get"
    @submit.prevent="addComment"
  >
    <div class="comment-name">
      <label
        for="comment-name"
      >
        Nickname
      </label>
      <input
        id="comment-name"
        v-model="comment.author"
        name="comment-name"
        required
      >
    </div>
    <div class="comment-message">
      <label
        for="comment-message"
      >
        Message:
      </label>
      <textarea
        id="comment-message"
        v-model="comment.message"
        name="comment-message"
        required
      />
    </div>
    <div class="comment-rating">
      <p> Rating: </p>
      <div
        v-for="index in 11"
        :key="index"
        class="comment-rating-radio"
      >
        <label
          for="comment-rating-radio"
        >
          {{ index - 1 }}
        </label>
        <input
          id="comment-rating-radio"
          v-model="comment.rating"
          type="radio"
          name="comment-rating-radio"
          :value="index - 1"
          required
        >
      </div>
    </div>
    <input
      type="submit"
      value="add review"
    >
  </form>
</template>

<script>
import CommentStore from '../../stores/CommentStore'

export default {
  name: 'CommentForm',
  data () {
    return ({
      comment: {
        author: null,
        message: null,
        rating: null,
        date: null
      }
    })
  },
  methods: {
    addComment () {
      this.comment.date = Date.now()
      console.log('wat')
      CommentStore.methods.addComment(this.$route.query.id, this.comment)
    }
  }
}
</script>

<style lang="scss" scoped>
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 75%;
        @media screen and (max-width: 750px) {
            width: 100%;
        }
        input:not([type='radio']), textarea {
            border: 1px solid black;
            font-size: 1.2em;
            padding: 10px;
            &:focus {
                outline: none;
            }
            width: calc(100% - 22px);
            &[type='submit'] {
                width: 50%;
            }
            @media screen and (max-width: 750px) {
                width: calc(100% - 20px);
            }
        }
        textarea {
            resize: vertical
        }
        div {
            margin: 20px 10px;
            width: 50%;
            @media screen and (max-width: 750px) {
                width: calc(100% - 40px);
            }
        }
        label {
            display: flex;
        }
        .comment-name {
            display: block;
        }
        .comment-message {
            display: flex;
            flex-direction: column;
        }
        .comment-rating {
            display: flex;
            align-items: center;
            .comment-rating-radio {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin: 5px;
            }
        }
    }
</style>
