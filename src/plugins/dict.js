export default {
  custom: {
    email: {
      required: 'Your email is empty' // messages can be strings as well.
    },
    name: {
      required: () => 'Your name is empty'
    }
  }
}
