<template>
  <div>
    <form @submit.prevent>
      <input
        class="form-control"
        id="zipcode"
        placeholder="Digite o CEP"
        type="text"
        v-model="zipcode"
      >
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      zipcode: ''
    }
  }
}
</script>
