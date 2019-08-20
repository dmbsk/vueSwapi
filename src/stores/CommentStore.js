const CommentStore = {
  data: {
    comments: {
      1: [
        {
          author: 'Tom',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque consequat vitae turpis sed eleifend. Fusce condimentum efficitur metus, non vehicula augue commodo ac. Quisque scelerisque mollis varius. Aenean eros eros, dapibus nec laoreet non, cursus mollis purus. Donec imperdiet molestie lorem',
          date: Date.now(),
          rating: 5
        },
        {
          author: 'Adam',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque consequat vitae turpis sed eleifend. Fusce condimentum efficitur metus, non vehicula augue commodo ac. Quisque scelerisque mollis varius. Aenean eros eros, dapibus nec laoreet non, cursus mollis purus. Donec imperdiet molestie lorem',
          date: Date.now(),
          rating: 5
        },
        {
          author: 'Ewa',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque consequat vitae turpis sed eleifend. Fusce condimentum efficitur metus, non vehicula augue commodo ac. Quisque scelerisque mollis varius. Aenean eros eros, dapibus nec laoreet non, cursus mollis purus. Donec imperdiet molestie lorem',
          date: Date.now(),
          rating: 5
        },
        {
          author: 'John',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque consequat vitae turpis sed eleifend. Fusce condimentum efficitur metus, non vehicula augue commodo ac. Quisque scelerisque mollis varius. Aenean eros eros, dapibus nec laoreet non, cursus mollis purus. Donec imperdiet molestie lorem',
          date: Date.now(),
          rating: 5
        },
        {
          author: 'Bartek',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque consequat vitae turpis sed eleifend. Fusce condimentum efficitur metus, non vehicula augue commodo ac. Quisque scelerisque mollis varius. Aenean eros eros, dapibus nec laoreet non, cursus mollis purus. Donec imperdiet molestie lorem',
          date: Date.now(),
          rating: 5
        },
        {
          author: 'Denis',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque consequat vitae turpis sed eleifend. Fusce condimentum efficitur metus, non vehicula augue commodo ac. Quisque scelerisque mollis varius. Aenean eros eros, dapibus nec laoreet non, cursus mollis purus. Donec imperdiet molestie lorem',
          date: Date.now(),
          rating: 5
        },
        {
          author: 'Brock',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque consequat vitae turpis sed eleifend. Fusce condimentum efficitur metus, non vehicula augue commodo ac. Quisque scelerisque mollis varius. Aenean eros eros, dapibus nec laoreet non, cursus mollis purus. Donec imperdiet molestie lorem',
          date: Date.now(),
          rating: 5
        }
      ]
    }
  },
  methods: {
    addComment (filmId, comment) {
      CommentStore.data.comments[filmId].push(comment)
    },
    addKey (filmId) {
      if (CommentStore.data.comments[filmId].length) {
        CommentStore.data.comments[filmId] = []
      }
    }
  }
}

export default CommentStore
