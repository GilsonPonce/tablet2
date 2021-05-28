<template>
  <div class="contenedor">
    <div class="model">
      <div class="contenido">
        <div v-if="obtenerparte1">
          <img src="../assets/pregunta.svg" width="200" alt="">
        </div>
        <div v-else>
          <img src="../assets/advertencia.svg" width="200" alt="">
        </div>
        <p>{{ obtenermensaje }}</p>
      </div>
      <div class="header">
        <div v-if="obtenertipoaviso == 'sino'">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col">
                <button class="btn btn-primary" @click="cambiarestadoavisotrue">
                  SI
                </button>
              </div>
              <div class="col">
                <button class="btn btn-danger" @click="cambiarestadoavisofalse">
                  NO
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="obtenertipoaviso == 'aviso'">
          <button class="btn btn-primary" @click="cambiarestadoavisofalse">
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  Name: "Avisobueno",
  setup(props, context) {
    const store = useStore();
    const cambiarestadoavisotrue = computed(() => {
      store.state.estadoaviso = true
      context.emit("accion")
      store.state.presentaraviso = false;
      store.state.estadoaviso = false
    });
    const cambiarestadoavisofalse = computed(() => {
      store.state.estadoaviso = false;
      store.state.presentaraviso = false;
    });
    const obtenermensaje = computed(() => {
      return store.state.mensaje;
    });
    const obtenertipoaviso = computed(() => {
      return store.state.tipoaviso;
    });
    const obtenerparte1 = computed(()=>{
      if(
        store.state.tipo == "personal" ||
        store.state.tipo == "materiaprima" ||
        store.state.tipo == "productoterminado" ||
        store.state.tipo == "scrap"
        ){
            return true
      }
    });

    return {
      cambiarestadoavisotrue,
      cambiarestadoavisofalse,
      obtenermensaje,
      obtenertipoaviso,
      obtenerparte1
    };
  },
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
.model {
  background: white;
  border-radius: 10px;
  padding: 20px;
  width: auto;
  height: auto;
  margin: 20px auto;
  position: relative;
  top: 18%;
}
.header {
  margin-top: 20px;
}
.btn {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
