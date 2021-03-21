<template>
  <div class="contenedor"> 
    <div class="d-flex text-center justify-content-center">
      <div class="spinner-border m-5 text-info" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    Name: "Loading"
};
</script>
<style scoped>
.contenedor {
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
</style>
