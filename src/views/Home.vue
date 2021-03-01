<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <form>
          <div class="row mb-3">
            <label for="inputFecha" class="col-sm-2 col-form-label"
              >Fecha:</label
            >
            <div class="col-sm-4">
              <input
                type="date"
                class="form-control form-control-sm"
                min="2021-01-01"
                id="inputFecha"
              />
            </div>
            <label for="selectTurno" class="col-sm-2 col-form-label"
              >Turno:</label
            >
            <div class="col-sm-4">
              <select name="selectTurno" class="form-select form-select-sm" id="selectTurno">
                <option value="">DIURNO</option>
                <option value="">NOCTURNO</option>
              </select>
            </div>
          </div>
          <div class="row mb-3">
            <label for="inputPersonal" class="col-sm-4 col-form-label"
              >Codigo personal:</label
            >
            <div class="col-sm-6">
              <input type="number" class="form-control form-control-sm" id="inputPersonal" />
            </div>
            <button class="btn btn-success btn-sm col-sm-1">+</button>
          </div>
          <div class="row mb-3">
            <h6 class="text-start">Personal agregado</h6>
            <div class="alert alert-secondary" role="alert"></div>
          </div>
          <div class="row mb-3">
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
              >
                <option value="">Film</option>
                <option value="">Pead</option>
              </select>
            </div>
            <label for="selectTipo" class="col-sm-2 col-form-label"
              >Tipo:</label
            >
            <div class="col-sm-4">
              <select name="selectTipo" class="form-select form-select-sm" id="selectTipo">
                <option value="">Baja</option>
                <option value="">Alta</option>
              </select>
            </div>
            <label for="selectColor" class="col-sm-2 col-form-label"
              >Color:</label
            >
            <div class="col-sm-4">
              <select name="selectColor" class="form-select form-select-sm" id="selectColor">
                <option value="">Negro</option>
                <option value="">Rojo</option>
              </select>
            </div>
          </div>
          <div class="row mb-3">
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
              >
                <option value="">Film</option>
                <option value="">Pead</option>
              </select>
            </div>
            <label for="selectTipo" class="col-sm-2 col-form-label"
              >Tipo:</label
            >
            <div class="col-sm-4">
              <select name="selectTipo" class="form-select form-select-sm" id="selectTipo">
                <option value="">Baja</option>
                <option value="">Alta</option>
              </select>
            </div>
            <label for="selectColor" class="col-sm-2 col-form-label"
              >Color:</label
            >
            <div class="col-sm-4">
              <select name="selectColor" class="form-select form-select-sm" id="selectColor">
                <option value="">Negro</option>
                <option value="">Rojo</option>
              </select>
            </div>
            <label for="selectColor" class="col-sm-2 col-form-label"
              >Propiedad:</label
            >
            <div class="col-sm-4">
              <select name="selectColor" class="form-select form-select-sm" id="selectColor">
                <option value="">Seco</option>
                <option value="">Mojado</option>
              </select>
            </div>
            <label for="selectColor" class="col-sm-2 col-form-label"
              >Peso:</label
            >
            <div class="col-sm-4">
              <input type="number" class="form-control form-control-sm" />
            </div>
            <button class="btn btn-success btn-sm col-sm-1">+</button>
          </div>
          <div class="row mb-3">
            <h6 class="text-start">MP agregado</h6>
            <div class="alert alert-secondary" role="alert"></div>
          </div>
          <div class="row mb-3">
            <h4>Producto Terminado</h4>
            <label for="selectColor" class="col-sm-2 col-form-label"
              >Peso:</label
            >
            <div class="col-sm-4">
              <input type="number" class="form-control form-control-sm" />
            </div>
            <button class="btn btn-success btn-sm col-sm-1">+</button>
          </div>
          <div class="row mb-3">
            <h6 class="text-start">PT Agregado</h6>
            <div class="alert alert-secondary" role="alert"></div>
          </div>
          <div class="row mb-3">
            <h4>Scrap</h4>
            <label for="selectColor" class="col-sm-4 col-form-label"
              >Tipo de desperdicio:</label
            >
            <div class="col-sm-8">
              <select name="selectColor" class="form-select form-select-sm" id="selectColor">
                <option value="">Opcion 1</option>
                <option value="">Opcion 2</option>
              </select>
            </div>
            <label for="selectColor" class="col-sm-2 col-form-label"
              ># Sacos:</label
            >
            <div class="col-sm-4">
              <input type="number" class="form-control form-control-sm" />
            </div>
            <label for="selectColor" class="col-sm-1 col-form-label"
              >Peso:</label
            >
            <div class="col-sm-4">
              <input type="number" class="form-control form-control-sm" />
            </div>
            <button class="btn btn-success btn-sm col-sm-1">+</button>
          </div>
          <div class="row mb-3">
            <h6 class="text-start">Scrap agregado</h6>
            <div class="alert alert-secondary" role="alert"></div>
          </div>
          <div class="row mb-3">
            <p class="text-start">
              <strong>Total MP:</strong><br />
              <strong>Total PT:</strong><br />
              <strong>Saldo Anterior:</strong
              ><input type="number" class=""/><br/>
              <strong>Total SCRAP:</strong><br />
              <strong>Saldo Material:</strong><br />
            </p>
          </div>
          <div class="row mb-3">
            <div class="input-group">
              <span class="input-group-text">Observaciones</span>
              <textarea
                class="form-control"
                aria-label="With textarea"
              ></textarea>
            </div>
          </div>
          <button class="btn btn-primary mb-3">Enviar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
};
</script>
