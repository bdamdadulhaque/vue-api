<template>
  <ScrollTopComponent>
      <a class="btn btn-warning">
        <!-- <font-awesome-icon :icon="['fas', 'angle-double-up']" size="3x" /> -->
        <i class="fas fa-angle-double-up" size="3x"></i>
      </a>
  </ScrollTopComponent>
</template>

<script>
import ScrollTopComponent from './ScrollTop'
export default {
  components: {
    ScrollTopComponent
  }
}
</script>

<style>
.btn {
    border-radius: 8px;
    background-color: rgba(0, 0, 0, 0.55);
    padding-top: 7px;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 5px;
}
</style>