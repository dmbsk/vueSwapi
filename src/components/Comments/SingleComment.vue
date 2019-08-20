<template>
  <div class="comment-single">
    <h2>{{ comment.author }}</h2>
    <p>{{ comment.message }}</p>
    <p class="comment-single-rating">
      {{ comment.rating }} / 10
    </p>
    <p class="comment-single-date">
      {{ prettyDate() }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'SingleComment',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  methods: {
    prettyDate (locales = 'en-US', options = { day: '2-digit', month: 'long', year: 'numeric' }) {
      return new Date(this.comment.date).toLocaleDateString(locales, options)
    }
  }
}
</script>

<style lang="scss" scoped>
    .comment-single {
        margin: 20px;
        width: calc(50% - 40px);
        @media screen and (max-width: 660px) {
          width: calc(100% - 40px);
        }
        p {
            margin: 0 10px;
            &.comment-single-rating {
              text-align: right;
              margin: 0 10px 10px 0;
              font-size: 2em;
            }
            &.comment-single-date {
                text-align: right;
                font-size: 0.8em;
            }
        }
    }
</style>
