<template>
  <div v-if="presentarloading">
    <loading />
  </div>
  <div v-if="presentaraviso">
    <div v-if="obtenerparte == 'personal'">
      <warning @accion="lesspersonal" />
    </div>
    <div v-else-if="obtenerparte == 'materiaprima'">
      <warning @accion="lessmateriaprima" />
    </div>
    <div v-else-if="obtenerparte == 'productoterminado'">
      <warning @accion="lessproductoterminado" />
    </div>
    <div v-else-if="obtenerparte == 'scrap'">
      <warning @accion="lessscrap" />
    </div>
    <div v-else>
      <warning />
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col">
        <form @submit.prevent="enviarinforme">
          <!-- PRESENTA ID DE INFORME GENERADO -->
          <div
            class="row mb-3 justify-content-center"
            v-if="getgenerado && informe.id != ''"
          >
            <div class="col-sm-12">
              <h5>No. {{ informe.id }}</h5>
            </div>
          </div>

          <!-- PARAMETROS INICIALES DE INFORME -->
          <div class="row mb-3 justify-content-center" v-if="!getgenerado">
            <label for="selectTurno" class="col-sm-2 col-form-label"
              >Turno:</label
            >
            <div class="col-sm-4">
              <select
                name="selectTurno"
                class="form-select form-select-sm"
                id="selectTurno"
                v-model="informe.turno"
              >
                <option value="DIURNO">DIURNO</option>
                <option value="NOCTURNO">NOCTURNO</option>
              </select>
            </div>
          </div>
          <div class="row mb-3" v-if="!getgenerado">
            <label for="selectLinea" class="col-sm-2 col-form-label"
              >Linea:</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="selectLinea"
                name="selectLineaInforme"
                value="Plastico"
                disabled
              />
            </div>
            <label for="selectProceso" class="col-sm-2 col-form-label"
              >Proceso:</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="selectProceso"
                value="Pelletizado"
                disabled
              />
            </div>
            <label for="selectMaterial" class="col-sm-2 col-form-label"
              >Material:</label
            >
            <div class="col-sm-4">
              <select
                name="selectMaterial"
                class="form-select form-select-sm"
                id="selectMaterial"
                :disabled="informe.id_proceso == ''"
                v-model="informe.id_material"
              >
                <option
                  v-for="materiales in filtrarMaterial(informe.id_proceso)"
                  :key="materiales.id_configuracion"
                  v-bind:value="materiales.id_material"
                >
                  {{ materiales.material }}
                </option>
              </select>
            </div>
            <label for="selectTipo" class="col-sm-2 col-form-label"
              >Tipo:</label
            >
            <div class="col-sm-4">
              <select
                name="selectTipo"
                class="form-select form-select-sm"
                id="selectTipo"
                :disabled="informe.id_material == ''"
                v-model="informe.id_tipo_material"
              >
                <option
                  v-for="tipomateriales in filtrarTipoMaterial(
                    informe.id_material
                  )"
                  :key="tipomateriales.id_configuracion"
                  v-bind:value="tipomateriales.id_tipo_material"
                >
                  {{ tipomateriales.tipo_material }}
                </option>
              </select>
            </div>
          </div>

          <!-- BOTON GENERAR -->
          <div class="row m-3 justify-content-center" v-if="!getgenerado">
            <button
              class="col-sm-4 btn btn-success"
              type="button"
              :disabled="bloquearBotonGenerarInforme"
              @click="generarInforme"
            >
              Generar Informe
            </button>
          </div>

          <!-- REGISTRO DE PERSONAL -->
          <div class="row mb-3" v-if="getgenerado">
            <label for="inputPersonal" class="col-sm-4 col-form-label"
              >Codigo personal:</label
            >
            <div class="col-sm-6">
              <input
                type="number"
                class="form-control form-control-sm"
                id="inputPersonal"
                v-model="codigopersonal"
              />
            </div>
            <button
              type="button"
              class="btn btn-success btn-sm col-sm-1"
              :disabled="codigopersonal == ''"
              @click="addpersonal"
            >
              +
            </button>
          </div>
          <div class="row mb-3" v-if="getgenerado">
            <h6 class="text-start">Personal agregado</h6>
            <div class="alert alert-secondary" role="alert">
              <ul
                class="list-group"
                v-for="(item, index) in informe.registro"
                v-bind:key="index"
              >
                <li
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  {{ item.apellido + " " + item.nombre }}
                  <span class="badge badge-primary badge-pill">
                    <button
                      type="button"
                      class="btn btn-danger"
                      @click="llamarwarningpersonal(index, item.id_registro)"
                    >
                      -
                    </button></span
                  >
                </li>
              </ul>
            </div>
          </div>

          <!-- MATERIA PRIMA -->
          <div class="row mb-3" v-if="getgenerado">
            <h4>Materia Prima</h4>
            <label for="selectLinea" class="col-sm-2 col-form-label"
              >Linea:</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="selectLinea"
                value="Plastico"
                disabled
              />
            </div>
            <label for="selectProceso" class="col-sm-2 col-form-label"
              >Proceso:</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="selectProceso"
                value="Pelletizado"
                disabled
              />
            </div>
            <label for="selectMaterial" class="col-sm-2 col-form-label"
              >Material:</label
            >
            <div class="col-sm-4">
              <select
                name="selectMaterial"
                class="form-select form-select-sm"
                id="selectMaterial"
                v-model="materiaprima.material"
                :disabled="materiaprima.proceso == ''"
              >
                <option
                  v-for="materiales in filtrarMaterial(materiaprima.proceso)"
                  :key="materiales.id_configuracion"
                  v-bind:value="materiales.id_material"
                >
                  {{ materiales.material }}
                </option>
              </select>
            </div>
            <label for="selectTipo" class="col-sm-2 col-form-label"
              >Tipo:</label
            >
            <div class="col-sm-4">
              <select
                name="selectTipo"
                class="form-select form-select-sm"
                id="selectTipo"
                v-model="materiaprima.tipo_material"
                :disabled="materiaprima.material == ''"
              >
                <option
                  v-for="tipomateriales in filtrarTipoMaterial(
                    materiaprima.material
                  )"
                  :key="tipomateriales.id_configuracion"
                  v-bind:value="tipomateriales.id_tipo_material"
                >
                  {{ tipomateriales.tipo_material }}
                </option>
              </select>
            </div>
            <label for="selectColor" class="col-sm-2 col-form-label"
              >Color:</label
            >
            <div class="col-sm-4">
              <select
                name="selectColor"
                class="form-select form-select-sm"
                id="selectColor"
                v-model="materiaprima.color"
                :disabled="materiaprima.material == ''"
              >
                <option
                  v-for="color in color"
                  :key="color.id_color"
                  v-bind:value="color.id_color"
                >
                  {{ color.nombre }}
                </option>
              </select>
            </div>
            <label for="selectColor" class="col-sm-2 col-form-label"
              >Propiedad:</label
            >
            <div class="col-sm-4">
              <select
                name="selectColor"
                class="form-select form-select-sm"
                id="selectColor"
                v-model="materiaprima.propiedad"
                :disabled="materiaprima.tipo_material == ''"
              >
                <option
                  v-for="confi in filtrarPropiedad(
                    materiaprima.material,
                    materiaprima.tipo_material
                  )"
                  :key="confi.id_configuracion"
                  v-bind:value="confi.id_propiedad"
                >
                  {{ confi.propiedad }}
                </option>
              </select>
            </div>
            <label for="selectColor" class="col-sm-2 col-form-label"
              >Peso:</label
            >
            <div class="col-sm-4">
              <input
                type="number"
                class="form-control form-control-sm"
                v-model="materiaprima.peso"
                :disabled="materiaprima.propiedad == ''"
              />
            </div>
            <button
              type="button"
              class="btn btn-success btn-sm col-sm-1"
              :disabled="materiaprima.peso == ''"
              @click="addmateriaprima"
            >
              +
            </button>
          </div>
          <div class="row mb-3" v-if="getgenerado">
            <h6 class="text-start">MP agregado</h6>
            <div class="alert alert-secondary" role="alert">
              <ul
                class="list-group"
                v-for="(item, index) in informe.materia_prima"
                v-bind:key="index"
              >
                <li
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  {{
                    nombreLinea(item.linea) +
                    "   " +
                    nombreProceso(item.proceso) +
                    "   " +
                    nombreMaterial(item.material) +
                    "  " +
                    nombreTipoMaterial(item.tipo_material) +
                    "  " +
                    nombrePropiedad(item.propiedad) +
                    "  " +
                    nombreColor(item.color) +
                    "  " +
                    item.peso
                  }}
                  <span class="badge badge-primary badge-pill">
                    <button
                      type="button"
                      class="btn btn-danger"
                      @click="llamarwarningmateriaprima(index)"
                    >
                      -
                    </button></span
                  >
                </li>
              </ul>
            </div>
          </div>

          <!-- PRODUCTO TERMINADO -->
          <div class="row mb-3" v-if="getgenerado">
            <h4>Producto Terminado</h4>
            <label for="selectColor" class="col-sm-2 col-form-label"
              >Peso:</label
            >
            <div class="col-sm-4">
              <input
                type="number"
                class="form-control form-control-sm"
                v-model="productoterminado"
                :disabled="bloquearproductoterminado"
              />
            </div>
            <button
              type="button"
              :disabled="productoterminado == ''"
              @click="addproductoterminado(productoterminado)"
              class="btn btn-success btn-sm col-sm-1"
            >
              +
            </button>
          </div>
          <div class="row mb-3" v-if="getgenerado">
            <h6 class="text-start">PT Agregado</h6>
            <div class="alert alert-secondary" role="alert">
              <ul
                class="list-group"
                v-for="(item, index) in informe.producto_terminado"
                v-bind:key="index"
              >
                <li
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  {{
                    nombreLinea(informe.linea) +
                    " " +
                    nombreProceso(informe.proceso) +
                    " " +
                    nombreMaterial(informe.material) +
                    "  " +
                    nombreTipoMaterial(informe.tipo_material) +
                    "  " +
                    nombreColor(informe.color) +
                    " " +
                    item
                  }}
                  <span class="badge badge-primary badge-pill">
                    <button
                      type="button"
                      class="btn btn-danger"
                      @click="llamarwarningproductoterminado(index)"
                    >
                      -
                    </button></span
                  >
                </li>
              </ul>
            </div>
          </div>

          <!-- SCRAP -->
          <div class="row mb-3" v-if="getgenerado">
            <h4>Scrap</h4>
            <label for="selectColor" class="col-sm-4 col-form-label"
              >Tipo de desperdicio:</label
            >
            <div class="col-sm-8">
              <select
                name="selectColor"
                class="form-select form-select-sm"
                id="selectColor"
                v-model="scrap.tipo"
              >
                <option
                  v-for="desperdicio in tipoDesperdicio"
                  :key="desperdicio.id_tipo_desperdicio"
                  v-bind:value="desperdicio.id_tipo_desperdicio"
                >
                  {{ desperdicio.nombre }}
                </option>
              </select>
            </div>
            <label for="selectColor" class="col-sm-2 col-form-label"
              ># Sacos:</label
            >
            <div class="col-sm-4">
              <input
                type="number"
                class="form-control form-control-sm"
                v-model="scrap.sacos"
              />
            </div>
            <label for="selectColor" class="col-sm-1 col-form-label"
              >Peso:</label
            >
            <div class="col-sm-4">
              <input
                type="number"
                class="form-control form-control-sm"
                v-model="scrap.peso"
              />
            </div>
            <button
              :disabled="scrap.peso == ''"
              @click="addscrap"
              class="btn btn-success btn-sm col-sm-1"
            >
              +
            </button>
          </div>
          <div class="row mb-3" v-if="getgenerado">
            <h6 class="text-start">Scrap agregado</h6>
            <div class="alert alert-secondary" role="alert">
              <ul
                class="list-group"
                v-for="(item, index) in informe.scrap"
                v-bind:key="index"
              >
                <li
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  {{
                    nombreTipoDesperdicio(item.tipo) +
                    "-" +
                    item.sacos +
                    "-" +
                    item.peso
                  }}
                  <span class="badge badge-primary badge-pill">
                    <button
                      type="button"
                      class="btn btn-danger"
                      @click="llamarwarningscrap(index)"
                    >
                      -
                    </button></span
                  >
                </li>
              </ul>
            </div>
          </div>

          <!-- CALCULOS -->
          <div class="row mb-3" v-if="getgenerado">
            <p class="text-start">
              <strong>Total MP: </strong>{{ totalmateriaprima }} Kg<br />
              <strong>Total PT: </strong>{{ totalproductoterminado }} Kg<br />
              <strong>Saldo Anterior: </strong
              ><input
                type="number"
                class=""
                v-model="informe.saldo_anterior"
              /><br />
              <strong>Total SCRAP: </strong>{{ totalscrap }} Kg<br />
              <strong>Saldo Material: </strong>{{ saldomaterial }} Kg<br />
            </p>
          </div>

          <!-- OBSERBACIONES -->
          <div class="row mb-3" v-if="getgenerado">
            <div class="input-group">
              <span class="input-group-text">Observaciones</span>
              <textarea
                class="form-control"
                aria-label="With textarea"
                v-model="informe.observaciones"
              ></textarea>
            </div>
          </div>

          <!-- BOTON DE CONFIRMACION DE COMPLETADO -->
          <button
            type="sumit"
            class="btn btn-primary mb-3"
            :disabled="bloquearbotonenviar"
            v-if="getgenerado"
          >
            COMPLETADO
          </button>
          <br />
          <button
            type="sumit"
            class="btn btn-primary mb-3"
            :disabled="bloquearbotonenviar"
            v-if="getgenerado"
          >
            GENERAR UN NUEVO INFORME
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { computed, onBeforeUpdate, onMounted, onUpdated, ref } from "vue";
import { useStore } from "vuex";
import warning from "../components/warning.vue";
import loading from "../components/Loading.vue";

export default {
  name: "Home",
  components: {
    warning,
    loading,
  },
  setup() {
    const store = useStore();

    store.dispatch("getPersonal");
    store.dispatch("getRegistro");
    store.dispatch("getConfiguracion");
    store.dispatch("getColor");
    store.dispatch("getTipoDesperdicio");
    store.dispatch("getLinea");
    store.dispatch("getProceso");
    store.dispatch("getMaterial");
    store.dispatch("getTipoMaterial");
    store.dispatch("getInforme");
   

    onBeforeUpdate(() => {
      actualizarPersonal();
    });

    const codigopersonal = ref("");
    const materiaprima = ref({
      id_materia_prima: "",
      id_informe: "",
      id_linea: "1",
      id_proceso: "1",
      id_material: "",
      id_tipo_material: "",
      id_color: "",
      id_configuracion: "",
      peso: "",
    });
    const productoterminado = ref({
      id_producto_terminado: "",
      id_informe: "",
      id_color: "",
      peso: "",
      tipo: "",
    });
    const scrap = ref({
      id_scrap: "",
      motivo: "",
      sacos: "",
      peso: "",
      id_informe: "",
    });
    const informe = ref({
      id_informe: "",
      id: "",
      turno: "",
      id_linea: "1",
      id_proceso: "1",
      id_material: "",
      id_tipo_material: "",
      saldo_anterior: 0,
      observacion: "",
      completado: "",
      materia_prima: [], //almacena objeto materia prima
      producto_terminado: [], //almacena objeto producto terminado
      scrap: [], //almacena objeto scrap
      registro: [], //almacena objeto personal
    });

    //CARGA LA INFORMACION DEL INFORME PENDIENTE QUE ESTA EN LOCALSTORE
    const informenesPendientes = () => {
      let informenes = JSON.parse(localStorage.getItem("InformenesPendientes"));

      if (informenes != null || informenes != undefined) {
        if (informenes.items.length == 1) {
          store.state.generado = true;
          informenes.items.map((info) => {
            informe.value.id_informe = info.id_informe;
            informe.value.id = info.id;
            informe.value.turno = info.turno;
            informe.value.saldo_anterior = info.saldo_anterior;
            informe.value.observacion = info.observacion;
            informe.value.completado = info.completado;
            informe.value.id_proceso = info.id_proceso;
            informe.value.id_material = info.id_material;
            informe.value.id_tipo_material = info.id_tipo_material;
          });
        }
      }
    };
    informenesPendientes();
    
    const actualizarPersonal = () => {
      if (store.state.generado) {
        informe.value.registro = [];

        let registrosDeInforme = store.state.registro.filter((obj) => {
          if (obj.id_informe == informe.value.id_informe && obj.activo == 1) {
            return obj;
          }
        });

        if (
          registrosDeInforme != null ||
          registrosDeInforme != undefined ||
          registrosDeInforme != ""
        ) {
          registrosDeInforme.map(function (objinfo) {
            let persona = store.state.personal.find(
              (objper) => objper.id_personal == objinfo.id_personal
            );
            persona.id_registro = objinfo.id_registro;
            informe.value.registro.push(persona);
          });
        }
      }
    };

    //PERSONAL
    //AGREGA Y RESGISTRA PERSONAL
    const addpersonal = () => {
      if (codigopersonal.value != "") {
        //busca en la base de datos
        const person = store.state.personal.find(
          (personal) => personal.id_personal == codigopersonal.value
        );

        //busca en el array del objeto informe
        const idpersonexistente = informe.value.registro.find(
          (obj) => obj.id_personal == codigopersonal.value
        );

        if (idpersonexistente == undefined || idpersonexistente == null) {
          if (person != undefined || person != null) {
            let idRegistro = generadorID("registro");
            let inforegistro = {
              id_registro: idRegistro,
              id_informe: informe.value.id_informe,
              id_personal: person.id_personal,
            };
            store.dispatch("postRegistro", inforegistro);
            location.reload();
          } else {
            llamarwarningadvertencia();
          }
        } else {
          llamarwarningadvertenciaexiste();
        }
        codigopersonal.value = "";
      }
    };

    const lesspersonal = () => {
      if (store.state.estadoaviso) {
        store.dispatch("deleteRegistro", store.state.valor2);
        location.reload();
      }
    };

    //LOADING.........................................
    const presentarloading = computed(() => {
      return store.state.loading;
    });

    //FUNCIONES QUE ACTIVAN LOS AVISOS
    const llamarwarningadvertencia = () => {
      store.state.presentaraviso = true;
      store.state.mensaje = "Personal no registrado";
      store.state.tipoaviso = "aviso";
    };

    const llamarwarningadvertenciaexiste = () => {
      store.state.presentaraviso = true;
      store.state.mensaje = "Personal ya registrado";
      store.state.tipoaviso = "aviso";
    };

    const llamarwarningpersonal = (valor, valor2) => {
      if (store.state.presentaraviso === false) {
        store.state.presentaraviso = true;
        store.state.mensaje = "¿Seguro que deseas quitar?";
        store.state.tipoaviso = "sino";
        store.state.parte = "personal";
        store.state.valor = valor;
        store.state.valor2 = valor2;
      }
    };

    const llamarwarningmateriaprima = (valor) => {
      if (store.state.presentaraviso === false) {
        store.state.presentaraviso = true;
        store.state.mensaje = "¿Seguro que deseas quitar?";
        store.state.tipoaviso = "sino";
        store.state.parte = "materiaprima";
        store.state.valor = valor;
      }
    };

    const llamarwarningproductoterminado = (valor) => {
      if (store.state.presentaraviso === false) {
        store.state.presentaraviso = true;
        store.state.mensaje = "¿Seguro que deseas quitar?";
        store.state.tipoaviso = "sino";
        store.state.parte = "productoterminado";
        store.state.valor = valor;
      }
    };

    const llamarwarningscrap = (valor) => {
      if (store.state.presentaraviso === false) {
        store.state.presentaraviso = true;
        store.state.mensaje = "¿Seguro que deseas quitar?";
        store.state.tipoaviso = "sino";
        store.state.parte = "scrap";
        store.state.valor = valor;
      }
    };

    //GENERADOR DE IDS
    const generadorID = (tabla) => {
      let ids = [];
      if (tabla == "registro") {
        store.dispatch("getRegistro");
        store.state.registro.map((obj) => {
          ids.push(parseInt(obj.id_registro));
        });
      } else if (tabla == "productoTerminado") {
        store.dispatch("getProductoTerminado");
        store.state.producto_terminado.map((obj) => {
          ids.push(parseInt(obj.id_producto_terminado));
        });
      } else if (tabla == "materiaPrima") {
        store.dispatch("getMateriaPrima");
        store.state.materia_prima.map((obj) => {
          ids.push(parseInt(obj.id_materia_prima));
        });
      } else if (tabla == "scrap") {
        store.dispatch("getScrap");
        store.state.scrap.map((obj) => {
          ids.push(parseInt(obj.id_scrap));
        });
      } else if (tabla == "informe") {
        store.dispatch("getInforme");
        store.state.informe.map((obj) => {
          ids.push(parseInt(obj.id_informe));
        });
      }
      let maxId = Math.max(...ids);
      if (maxId != null || maxId != undefined || maxId != "") {
        if (maxId > 0) {
          maxId += 1;
        } else {
          maxId = 1;
        }
      } else {
        maxId = 1;
      }
      return maxId;
    };

    const addmateriaprima = () => {
      let materiapri = new Object();
      materiapri.linea = materiaprima.value.linea;
      materiapri.proceso = materiaprima.value.proceso;
      materiapri.material = materiaprima.value.material;
      materiapri.tipo_material = materiaprima.value.tipo_material;
      materiapri.color = materiaprima.value.color;
      materiapri.propiedad = materiaprima.value.propiedad;
      materiapri.peso = materiaprima.value.peso;
      informe.value.materia_prima.push(materiapri);
      materiaprima.value.material = "";
      materiaprima.value.tipo_material = "";
      materiaprima.value.propiedad = "";
      materiaprima.value.color = "";
      materiaprima.value.peso = "";
    };

    const lessmateriaprima = () => {
      if (store.state.estadoaviso) {
        informe.value.materia_prima.splice(store.state.valor, 1);
      }
    };

    const addproductoterminado = (peso) => {
      informe.value.producto_terminado.push(peso);
      productoterminado.value = "";
    };

    const lessproductoterminado = (valor) => {
      if (store.state.estadoaviso) {
        informe.value.producto_terminado.splice(store.state.valor, 1);
      }
    };

    const addscrap = () => {
      let scrapobj = new Object();
      scrapobj.tipo = scrap.value.tipo;
      scrapobj.sacos = scrap.value.sacos;
      scrapobj.peso = scrap.value.peso;
      informe.value.scrap.push(scrapobj);
      scrap.value.tipo = "";
      scrap.value.sacos = "";
      scrap.value.peso = "";
    };

    const lessscrap = () => {
      if (store.state.estadoaviso) {
        informe.value.scrap.splice(store.state.valor, 1);
      }
    };

    const filtrarMaterial = (valor) => {
      let filtro = store.state.configuracion.filter(
        (confi) => confi.id_proceso == valor
      );

      let config = filtro.map((item) => {
        return [item.id_material, item];
      });

      let configu = new Map(config);

      let unicos = [...configu.values()];

      return unicos;
    };

    const filtrarTipoMaterial = (valor) => {
      let filtro = store.state.configuracion.filter(
        (confi) => confi.id_material == valor
      );

      let config = filtro.map((item) => {
        return [item.id_tipo_material, item];
      });

      let configu = new Map(config);

      let unicos = [...configu.values()];

      return unicos;
    };

    const filtrarPropiedad = (valor1, valor2) => {
      let filtro = store.state.configuracion.filter(
        (confi) =>
          confi.id_material == valor1 && confi.id_tipo_material == valor2
      );

      let config = filtro.map((item) => {
        return [item.id_propiedad, item];
      });

      let configu = new Map(config);

      let unicos = [...configu.values()];

      return unicos;
    };

    const color = computed(() => {
      return store.state.color;
    });

    const tipoDesperdicio = computed(() => {
      return store.state.tipo_desperdicio;
    });

    const totalmateriaprima = computed(() => {
      let suma = 0;
      for (let i = 0; i < informe.value.materia_prima.length; i++) {
        suma += parseFloat(informe.value.materia_prima[i].peso);
      }
      return suma;
    });

    const totalproductoterminado = computed(() => {
      let suma = 0;
      for (let i = 0; i < informe.value.producto_terminado.length; i++) {
        suma += parseFloat(informe.value.producto_terminado[i]);
      }
      return suma;
    });

    const totalscrap = computed(() => {
      let suma = 0;
      for (let i = 0; i < informe.value.scrap.length; i++) {
        suma += parseFloat(informe.value.scrap[i].peso);
      }
      return suma;
    });

    const saldomaterial = computed(() => {
      let materiaprimatotal = 0;
      let productoterminadototal = 0;
      let scraptotal = 0;
      for (let i = 0; i < informe.value.materia_prima.length; i++) {
        materiaprimatotal += parseFloat(informe.value.materia_prima[i].peso);
      }
      for (let i = 0; i < informe.value.producto_terminado.length; i++) {
        productoterminadototal += parseFloat(
          informe.value.producto_terminado[i]
        );
      }
      for (let i = 0; i < informe.value.scrap.length; i++) {
        scraptotal += parseFloat(informe.value.scrap[i].peso);
      }
      let sumatotal =
        materiaprimatotal +
        parseFloat(informe.value.saldo_anterior) -
        (productoterminadototal + scraptotal);
      if (sumatotal < 0) {
        return 0;
      } else {
        return sumatotal;
      }
    });

    const bloquearbotonenviar = computed(() => {
      if (
        informe.value.fecha == "" ||
        informe.value.turno == "" ||
        informe.value.registro.length == 0 ||
        informe.value.linea == "" ||
        informe.value.proceso == "" ||
        informe.value.material == "" ||
        informe.value.tipo_material == "" ||
        informe.value.color == "" ||
        informe.value.materia_prima.length == 0 ||
        informe.value.producto_terminado.length == 0
      ) {
        return true;
      } else {
        return false;
      }
    });

    const bloquearproductoterminado = computed(() => {
      if (
        informe.value.linea == "" ||
        informe.value.proceso == "" ||
        informe.value.material == "" ||
        informe.value.tipo_material == "" ||
        informe.value.color == ""
      ) {
        return true;
      } else {
        return false;
      }
    });

    const bloquearBotonGenerarInforme = computed(() => {
      if (
        informe.value.id_proceso == "" ||
        informe.value.id_material == "" ||
        informe.value.id_tipo_material == "" ||
        informe.value.turno == ""
      ) {
        return true;
      } else {
        return false;
      }
    });

    const obtenerparte = computed(() => {
      return store.state.parte;
    });

    const getgenerado = computed(() => {
      return store.state.generado;
    });

    const nombreLinea = (id) => {
      let lineas = store.state.linea.find((line) => line.id_linea == id);
      return lineas.nombre;
    };

    const nombreProceso = (id) => {
      let proceso = store.state.proceso.find((pro) => pro.id_proceso == id);
      return proceso.nombre;
    };

    const nombreMaterial = (id) => {
      let material = store.state.material.find(
        (mate) => mate.id_material == id
      );
      return material.nombre;
    };

    const nombreTipoMaterial = (id) => {
      let tipomaterial = store.state.tipo_material.find(
        (tipomate) => tipomate.id_tipo_material == id
      );
      return tipomaterial.nombre;
    };

    const nombrePropiedad = (id) => {
      let propied = store.state.propiedad.find(
        (propi) => propi.id_propiedad == id
      );
      return propied.nombre;
    };

    const nombreColor = (id) => {
      let colors = store.state.color.find((co) => co.id_color == id);
      return colors.nombre;
    };

    const nombreTipoDesperdicio = (id) => {
      let desperdicio = store.state.tipo_desperdicio.find(
        (co) => co.id_tipo_desperdicio == id
      );
      return desperdicio.nombre;
    };

    const presentaraviso = computed(() => {
      return store.state.presentaraviso;
    });

    const enviarinforme = () => {
      envinforme();
      envimateriaprima();
      enviproductoterminado();
      envipersonal();
      enviscrap();
    };

    //GENERAR INFORME
    const generarInforme = () => {
      //se genera una id por proceso
      store.dispatch("getInforme");
      let informenesDelProceso = store.state.informe.filter(
        (obj) => obj.id_proceso == informe.value.id_proceso
      );
      let idInformenes = [];
      informenesDelProceso.map((obj) => {
        idInformenes.push(parseInt(obj.id));
      });

      let maxIdInforme = Math.max(...idInformenes);
      if (
        maxIdInforme != null ||
        maxIdInforme != undefined ||
        maxIdInforme != ""
      ) {
        if (maxIdInforme > 0) {
          maxIdInforme += 1;
        } else {
          maxIdInforme = 1;
        }
      } else {
        maxIdInforme = 1;
      }

      let idInformeGBD = generadorID("informe");

      let informeAEnviar = {
        id_informe: idInformeGBD,
        id: maxIdInforme,
        turno: informe.value.turno,
        saldo_anterior: informe.value.saldo_anterior,
        observacion: informe.value.observacion,
        completado: 0,
        id_proceso: informe.value.id_proceso,
        id_material: informe.value.id_material,
        id_tipo_material: informe.value.id_tipo_material,
      };

      informe.value.id = maxIdInforme;
      informe.value.id_informe = idInformeGBD;

      store.dispatch("postInforme", informeAEnviar);

      let data = {};
      let items = [];
      items.push(informeAEnviar);
      data.items = items;
      localStorage.setItem("InformenesPendientes", JSON.stringify(data));

      store.state.generado = true;
    };

    const envinforme = () => {
      let info = {
        fecha: informe.value.fecha,
        turno: informe.value.turno,
        saldo_anterior: informe.value.saldo_anterior,
        observacion: informe.value.observaciones,
        id_proceso: informe.value.proceso,
        id_material: informe.value.material,
        id_tipo_material: informe.value.tipo_material,
        id_color: informe.value.color,
      };
      store.dispatch("postInforme", info);
    };

    const envimateriaprima = () => {
      store.dispatch("getInforme");
      let idinforme = [];
      if (store.state.informe.length != 0) {
        for (let infor in store.state.informe) {
          idinforme.push(parseInt(infor.id_informe));
        }
      }
      let ultimoid = 0;
      if (idinforme.length != 0) {
        ultimoid = Math.max(...idinforme);
      } else {
        ultimoid = 1;
      }

      for (let mate in informe.materia_prima) {
        let config = store.state.configuracion.filter(
          (co) =>
            co.id_proceso == mate.proceso &&
            co.id_material == mate.material &&
            co.id_tipo_material == mate.tipo_material &&
            co.id_propiedad == mate.propiedad &&
            co.estado > 0
        );
        let objetmateriaprima = {
          id_configuracion: config.id_configuracion,
          id_color: mate.color,
          id_informe: ultimoid,
          peso: mate.peso,
        };

        store.dispatch("postMateriaPrima", objetmateriaprima);
      }
    };

    const enviproductoterminado = () => {
      store.dispatch("getInforme");
      let idinforme = [];
      if (store.state.informe.length != 0) {
        for (let infor in store.state.informe) {
          idinforme.push(parseInt(infor.id_informe));
        }
      }
      let ultimoid = 0;
      if (idinforme.length != 0) {
        ultimoid = Math.max(...idinforme);
      } else {
        ultimoid = 1;
      }
      for (let prod in informe.producto_terminado) {
        let productterminado = {
          id_informe: ultimoid,
          peso: prod,
        };

        store.dispatch("postProductoTerminado", productterminado);
      }
    };

    const envipersonal = () => {
      store.dispatch("getInforme");
      let idinforme = [];
      if (store.state.informe.length != 0) {
        for (let infor in store.state.informe) {
          idinforme.push(parseInt(infor.id_informe));
        }
      }
      let ultimoid = 0;
      if (idinforme.length != 0) {
        ultimoid = Math.max(...idinforme);
      } else {
        ultimoid = 1;
      }
      for (let codiper in informe.codigo_personal) {
        let objetoregistro = {
          id_personal: codiper.id_personal,
          id_informe: ultimoid,
        };

        store.dispatch("postRegistro", objetoregistro);
      }
    };

    const enviscrap = () => {
      store.dispatch("getInforme");
      let idinforme = [];
      if (store.state.informe.length != 0) {
        for (let infor in store.state.informe) {
          idinforme.push(parseInt(infor.id_informe));
        }
      }
      let ultimoid = 0;
      if (idinforme.length != 0) {
        ultimoid = Math.max(...idinforme);
      } else {
        ultimoid = 1;
      }
      for (let sc in informe.scrap) {
        let objetoscrap = {
          motivo: sc.tipo,
          sacos: sc.sacos,
          peso: sc.peso,
          id_informe: ultimoid,
        };

        store.dispatch("postScrap", objetoscrap);
      }
    };

    return {
      codigopersonal,
      materiaprima,
      productoterminado,
      scrap,
      informe,
      addpersonal,
      lesspersonal,
      filtrarMaterial,
      filtrarTipoMaterial,
      color,
      filtrarPropiedad,
      addmateriaprima,
      lessmateriaprima,
      addproductoterminado,
      lessproductoterminado,
      tipoDesperdicio,
      lessscrap,
      addscrap,
      totalmateriaprima,
      totalproductoterminado,
      totalscrap,
      saldomaterial,
      bloquearbotonenviar,
      bloquearBotonGenerarInforme,
      nombreLinea,
      nombreProceso,
      nombreMaterial,
      nombreTipoMaterial,
      nombreColor,
      nombrePropiedad,
      bloquearproductoterminado,
      presentaraviso,
      llamarwarningpersonal,
      llamarwarningmateriaprima,
      llamarwarningproductoterminado,
      llamarwarningscrap,
      obtenerparte,
      getgenerado,
      llamarwarningadvertencia,
      llamarwarningadvertenciaexiste,
      nombreTipoDesperdicio,
      presentarloading,
      enviarinforme,
      envinforme,
      envimateriaprima,
      enviproductoterminado,
      envipersonal,
      enviscrap,
      generarInforme,
      informenesPendientes,
      generadorID,
      actualizarPersonal,
    };
  },
};
</script>
