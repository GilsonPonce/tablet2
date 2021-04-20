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
    <div v-else-if="obtenerparte == 'informe'">
      <warning @accion="enviarinforme" />
    </div>
    <div v-else>
      <warning />
    </div>
  </div>
  <div class="position-fixed top-0 start-0">
    <button
      type="button"
      class="btn btn-success"
      @click="refresh"
      v-if="getgenerado"
    >
      <i class="fa fa-refresh"></i>
    </button>
  </div>
  <div class="container">
    <div class="row">
      <div class="col">
        <form>
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
                v-for="(item, index) in PersonalDelInforme"
                v-bind:key="index"
              >
                <li
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  {{ item.personal }}
                  <span class="badge badge-primary badge-pill">
                    <button
                      type="button"
                      class="btn btn-danger"
                      @click="llamarwarningpersonal(item.id_registro)"
                    >
                      -
                    </button></span
                  >
                </li>
              </ul>
            </div>
          </div>

          <!-- MATERIA PRIMA -->
          <div class="row mb-3 justify-content-center" v-if="getgenerado">
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
                v-model="materiaprima.id_material"
                :disabled="materiaprima.id_proceso == ''"
              >
                <option
                  v-for="materiales in filtrarMaterial(materiaprima.id_proceso)"
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
                v-model="materiaprima.id_tipo_material"
                :disabled="materiaprima.id_material == ''"
              >
                <option
                  v-for="tipomateriales in filtrarTipoMaterial(
                    materiaprima.id_material
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
                v-model="materiaprima.id_color"
                :disabled="materiaprima.id_material == ''"
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
              >Peso:</label
            >
            <div class="col-sm-4">
              <input
                type="number"
                class="form-control form-control-sm"
                v-model="materiaprima.peso"
                :disabled="materiaprima.id_color == ''"
              />
            </div>
            <button
              type="button"
              class="btn btn-success btn-sm col-sm-1 m-3"
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
                v-for="(item, index) in MateriaPrimaDelInforme"
                v-bind:key="index"
              >
                <li
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  {{
                    item.linea +
                    "   " +
                    item.proceso +
                    "   " +
                    item.material +
                    "  " +
                    item.tipo_material +
                    "  " +
                    item.color +
                    "  " +
                    item.peso
                  }}
                  <span class="badge badge-primary badge-pill">
                    <button
                      type="button"
                      class="btn btn-danger"
                      @click="llamarwarningmateriaprima(item.id_materia_prima)"
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
              >Color:</label
            >
            <div class="col-sm-4">
              <select
                name="selectColor"
                class="form-select form-select-sm"
                id="selectColor"
                v-model="productoterminado.id_color"
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
            <label for="selectTipoPt" class="col-sm-2 col-form-label"
              >Tipo:</label
            >
            <div class="col-sm-4">
              <select
                name="selectTipoPt"
                class="form-select form-select-sm"
                id="selectTipoPt"
                v-model="productoterminado.tipo"
              >
                <option value="CONFORME" selected>CONFORME</option>
                <option value="NO CONFORME">NO CONFORME</option>
              </select>
            </div>
            <label for="selectColor" class="col-sm-2 col-form-label"
              >Peso:</label
            >
            <div class="col-sm-4">
              <input
                type="number"
                class="form-control form-control-sm"
                v-model="productoterminado.peso"
                :disabled="bloquearproductoterminado"
              />
            </div>
            <button
              type="button"
              :disabled="
                productoterminado.tipo == '' ||
                productoterminado.peso == '' ||
                productoterminado.id_color == ''
              "
              @click="addproductoterminado"
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
                v-for="(item, index) in ProductoTerminadoDelInforme"
                v-bind:key="index"
              >
                <li
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  {{
                    item.linea +
                    " " +
                    item.proceso +
                    " " +
                    item.material +
                    " " +
                    item.tipo_material +
                    " " +
                    item.color +
                    " " +
                    item.peso +
                    " " +
                    item.tipo
                  }}
                  <span class="badge badge-primary badge-pill">
                    <button
                      type="button"
                      class="btn btn-danger"
                      @click="
                        llamarwarningproductoterminado(
                          item.id_producto_terminado
                        )
                      "
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
                v-model="scrap.motivo"
              >
                <option
                  v-for="desperdicio in tipoDesperdicio"
                  :key="desperdicio.id_tipo_desperdicio"
                  v-bind:value="desperdicio.nombre"
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
                v-for="(item, index) in ScrapDelInforme"
                v-bind:key="index"
              >
                <li
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  {{ item.motivo + " " + item.sacos + " " + item.peso }}
                  <span class="badge badge-primary badge-pill">
                    <button
                      type="button"
                      class="btn btn-danger"
                      @click="llamarwarningscrap(item.id_scrap)"
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
              ><input type="number" class="" v-model="informe.saldo_anterior" />
              <button
                type="button"
                class="btn btn-warning m-3"
                @click="guardarSaldoAnterior"
              >
                Guardar
              </button>
              <br />
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
                v-model="informe.observacion"
              ></textarea>
            </div>
          </div>

          <!-- BOTON DE CONFIRMACION DE COMPLETADO -->
          <button
            type="button"
            class="btn btn-primary mb-3"
            :disabled="bloquearbotonenviar"
            v-if="getgenerado"
            @click="llamarwarningInforme"
          >
            COMPLETADO
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

    onMounted(async()=>{
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
    store.dispatch("getMateriaPrima");
    store.dispatch("getProductoTerminado");
    store.dispatch("getScrap");
    });

    const codigopersonal = ref("");
    const materiaprima = ref({
      id_linea: "1",
      id_proceso: "1",
      id_material: "",
      id_tipo_material: "",
      id_color: "",
      peso: "",
    });
    const productoterminado = ref({
      id_color: "",
      peso: "",
      tipo: "",
    });
    const scrap = ref({
      motivo: "",
      sacos: "",
      peso: "",
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
    });

    //CARGA LA INFORMACION DEL INFORME PENDIENTE QUE ESTA EN LOCALSTORE
    const informenesPendientes = () => {
      let informenes = JSON.parse(localStorage.getItem("InformenesPendientes"));
      let saldo = localStorage.getItem("saldoAnterior");
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

      if (saldo != null || saldo != undefined) {
        informe.value.saldo_anterior = saldo;
      }
    };
    informenesPendientes();

    //VALIDAR EN GBD QUE ESTE EL MISMO ESTADO DE COMPLETADO
    const validarCompletado = () => {
      store.dispatch("getInforme");
      let infoGBDInforme = store.state.informe.find(
        (obj) => obj.id_informe == informe.value.id_informe
      );
      if (infoGBDInforme != null || infoGBDInforme != undefined) {
        if (infoGBDInforme.completado == 1) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    };

    const PersonalDelInforme = computed(() => {
      if (store.state.generado) {
        return store.state.registro.filter(function(obj){
          if (obj.id_informe == informe.value.id_informe && obj.activo == 1) {
            return obj;
          }
        });
      }
    });

    const MateriaPrimaDelInforme = computed(() => {
      if (store.state.generado) {
        return store.state.materia_prima.filter(function (obj) {
          if (obj.id_informe == informe.value.id_informe) {
            return obj;
          }
        });
      }
    });

    const ProductoTerminadoDelInforme = computed(() => {
      if (store.state.generado) {
        return store.state.producto_terminado.filter((obj) => {
          if (obj.id_informe == informe.value.id_informe) {
            return obj;
          }
        });
      }
    });

    const ScrapDelInforme = computed(() => {
      if (store.state.generado) {
        return store.state.scrap.filter((obj) => {
          if (obj.id_informe == informe.value.id_informe) {
            return obj;
          }
        });
      }
    });

    //PERSONAL
    //AGREGA Y RESGISTRA PERSONAL
    const addpersonal = () => {
      if (codigopersonal.value != "") {
        //busca en la base de datos
        const person = store.state.personal.find(
          (personal) => personal.id_personal == codigopersonal.value
        );

        //busca en el array del objeto informe
        const idpersonexistente = store.state.registro.find(function (obj) {
          if (
            obj.id_personal == codigopersonal.value &&
            obj.activo == 1 &&
            obj.id_informe == informe.value.id_informe
          ) {
            return obj;
          }
        });

        if (idpersonexistente == undefined || idpersonexistente == null) {
          if (person != undefined || person != null) {
            let inforegistro = {
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
      //store.state.valor2 es la id_registro
      store.dispatch("getRegistro");
      let registrosInforme = store.state.registro.filter((obj) => {
        if (obj.id_informe == informe.value.id_informe && obj.activo == 1) {
          return obj;
        }
      });
      let registro = registrosInforme.find(
        (obj) => obj.id_registro == store.state.valor2
      );
      if (registro != null || registro != undefined) {
        if (registro.activo == 1) {
          if (store.state.estadoaviso) {
            store.dispatch("deleteRegistro", store.state.valor2);
            location.reload();
          }
        } else {
          location.reload();
        }
      } else {
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

    const llamarwarningpersonal = (valor) => {
      if (store.state.presentaraviso === false) {
        store.state.presentaraviso = true;
        store.state.mensaje = "¿Seguro que deseas quitar?";
        store.state.tipoaviso = "sino";
        store.state.parte = "personal";
        store.state.valor2 = valor;
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

    const llamarwarningInforme = () => {
      if (store.state.presentaraviso === false) {
        store.state.presentaraviso = true;
        store.state.mensaje = "¿Deseas terminar el Informe?";
        store.state.tipoaviso = "sino";
        store.state.parte = "informe";
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

    //MATERIA PRIMA
    const addmateriaprima = () => {
      let idConfiguracion = store.state.configuracion.find(function (obj) {
        if (
          obj.id_linea == materiaprima.value.id_linea &&
          obj.id_proceso == materiaprima.value.id_proceso &&
          obj.id_material == materiaprima.value.id_material &&
          obj.id_tipo_material == materiaprima.value.id_tipo_material
        ) {
          return obj;
        }
      });

      if (idConfiguracion != null || idConfiguracion != undefined) {
        let info = {
          id_configuracion: idConfiguracion.id_configuracion,
          id_color: materiaprima.value.id_color,
          id_informe: informe.value.id_informe,
          peso: materiaprima.value.peso,
        };
        store.dispatch("postMateriaPrima", info);
        location.reload();
      }

      materiaprima.value.id_material = "";
      materiaprima.value.id_tipo_material = "";
      materiaprima.value.id_color = "";
      materiaprima.value.peso = "";
    };

    const lessmateriaprima = () => {
      if (store.state.estadoaviso) {
        store.dispatch("deleteMateriaPrima", store.state.valor);
        location.reload();
      }
    };

    //PRODUCTO TERMINADO
    const addproductoterminado = () => {
      let info = {
        id_informe: informe.value.id_informe,
        id_color: productoterminado.value.id_color,
        peso: productoterminado.value.peso,
        tipo: productoterminado.value.tipo,
      };
      store.dispatch("postProductoTerminado", info);
      productoterminado.value.id_color = "";
      productoterminado.value.tipo = "";
      productoterminado.value.peso = "";
      location.reload();
    };

    const lessproductoterminado = () => {
      if (store.state.estadoaviso) {
        store.dispatch("deleteProductoTerminado", store.state.valor);
        location.reload();
      }
    };

    // SCRAP
    const addscrap = () => {
      let info = {
        motivo: scrap.value.motivo,
        sacos: scrap.value.sacos,
        peso: scrap.value.peso,
        id_informe: informe.value.id_informe,
      };
      store.dispatch("postScrap", info);
      scrap.value.tipo = "";
      scrap.value.sacos = "";
      scrap.value.peso = "";
      location.reload();
    };

    const lessscrap = () => {
      if (store.state.estadoaviso) {
        store.dispatch("deleteScrap", store.state.valor);
        location.reload();
      }
    };

    //FILTRAR DE CONFIGURACION Y OBTENGO INFORMACION UNICA
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

    //COLORES
    const color = computed(() => {
      return store.state.color;
    });

    //TIPO DE DESPERDICIO (MOTIVO EN SCRAP)
    const tipoDesperdicio = computed(() => {
      return store.state.tipo_desperdicio;
    });

    //CALCULOS
    const totalmateriaprima = computed(() => {
      let suma = 0;
      for (let i = 0; i < store.state.materia_prima.length; i++) {
        if (
          store.state.materia_prima[i].id_informe == informe.value.id_informe
        ) {
          suma += parseFloat(store.state.materia_prima[i].peso);
        }
      }
      return suma;
    });

    const totalproductoterminado = computed(() => {
      let suma = 0;
      for (let i = 0; i < store.state.producto_terminado.length; i++) {
        if (
          store.state.producto_terminado[i].id_informe ==
          informe.value.id_informe
        ) {
          suma += parseFloat(store.state.producto_terminado[i].peso);
        }
      }
      return suma;
    });

    const totalscrap = computed(() => {
      let suma = 0;
      for (let i = 0; i < store.state.scrap.length; i++) {
        if (store.state.scrap[i].id_informe == informe.value.id_informe) {
          suma += parseFloat(store.state.scrap[i].peso);
        }
      }
      return suma;
    });

    const saldomaterial = computed(() => {
      let materiaprimatotal = 0;
      let productoterminadototal = 0;
      let scraptotal = 0;

      for (let i = 0; i < store.state.materia_prima.length; i++) {
        if (
          store.state.materia_prima[i].id_informe == informe.value.id_informe
        ) {
          materiaprimatotal += parseFloat(store.state.materia_prima[i].peso);
        }
      }

      for (let i = 0; i < store.state.producto_terminado.length; i++) {
        if (
          store.state.producto_terminado[i].id_informe ==
          informe.value.id_informe
        ) {
          productoterminadototal += parseFloat(
            store.state.producto_terminado[i].peso
          );
        }
      }

      for (let i = 0; i < store.state.scrap.length; i++) {
        if (store.state.scrap[i].id_informe == informe.value.id_informe) {
          scraptotal += parseFloat(store.state.scrap[i].peso);
        }
      }

      let sumatotal =
        materiaprimatotal +
        parseFloat(informe.value.saldo_anterior) -
        (productoterminadototal + scraptotal);

      if (sumatotal < 0 || isNaN(sumatotal)) {
        return 0;
      } else {
        return sumatotal;
      }
    });

    const bloquearbotonenviar = computed(() => {
      if (
        informe.value.turno == "" ||
        informe.value.id_linea == "" ||
        informe.value.id_proceso == "" ||
        informe.value.id_material == "" ||
        informe.value.id_tipo_material == "" ||
        informe.value.id_color == ""
      ) {
        return true;
      } else {
        return false;
      }
    });

    const bloquearproductoterminado = computed(() => {
      if (
        informe.value.id_linea == "" ||
        informe.value.id_proceso == "" ||
        informe.value.id_material == "" ||
        informe.value.id_tipo_material == "" ||
        informe.value.id_color == ""
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

    const presentaraviso = computed(() => {
      return store.state.presentaraviso;
    });

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

      if (
        informe.value.saldo_anterior == null ||
        informe.value.saldo_anterior == undefined ||
        informe.value.saldo_anterior == ""
      ) {
        informe.value.saldo_anterior = 0;
      }

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

    //AL TERMINAR EL INFORME (LO ACTUALIZA EN GBD)
    const enviarinforme = () => {
      let infoGBDInforme = store.state.informe.find(
        (obj) => obj.id_informe == informe.value.id_informe
      );
      if (infoGBDInforme != null || infoGBDInforme != undefined) {
        if (infoGBDInforme.completado != 1) {
          if (
            informe.value.saldo_anterior == "" ||
            informe.value.saldo_anterior == null ||
            informe.value.saldo_anterior == undefined
          ) {
            informe.value.saldo_anterior = 0;
          }

          let informeAEnviar = {
            id_informe: informe.value.id_informe,
            id: informe.value.id,
            fecha: infoGBDInforme.fecha,
            turno: informe.value.turno,
            saldo_anterior: informe.value.saldo_anterior,
            observacion: informe.value.observacion,
            completado: 1,
            id_proceso: informe.value.id_proceso,
            id_material: informe.value.id_material,
            id_tipo_material: informe.value.id_tipo_material,
          };

          store.dispatch("putInforme", informeAEnviar);

          localStorage.clear();

          location.reload();
        } else {
          localStorage.clear();
          location.reload();
        }
      } else {
        localStorage.clear();
        location.reload();
      }
    };

    const guardarSaldoAnterior = () => {
      if (
        informe.value.saldo_anterior != "" ||
        informe.value.saldo_anterior != null ||
        informe.value.saldo_anterior != undefined
      ) {
        localStorage.setItem("saldoAnterior", informe.value.saldo_anterior);
      } else {
        localStorage.setItem("saldoAnterior", 0);
      }
      store.state.presentaraviso = true;
      store.state.mensaje = "Saldo Guardado";
      store.state.tipoaviso = "aviso";
    };

    const refresh = () => {
      location.reload();
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
      bloquearproductoterminado,
      presentaraviso,
      llamarwarningpersonal,
      llamarwarningmateriaprima,
      llamarwarningproductoterminado,
      llamarwarningscrap,
      llamarwarningInforme,
      obtenerparte,
      getgenerado,
      llamarwarningadvertencia,
      llamarwarningadvertenciaexiste,
      presentarloading,
      generarInforme,
      informenesPendientes,
      generadorID,
      PersonalDelInforme,
      MateriaPrimaDelInforme,
      ProductoTerminadoDelInforme,
      ScrapDelInforme,
      validarCompletado,
      enviarinforme,
      guardarSaldoAnterior,
      refresh,
    };
  },
};
</script>
