import { createStore } from 'vuex'

export default createStore({
  state: {
    token: "Basic YTJhYTA3YWFmYXJ0d2V0c2RBRDUyMzU2RkVER2VGOHpNSTlYQUtGQWNLVG9SWFBUcVRjSElTNVVvRWRlOm8yYW8wN29hZmFydHdldHNkQUQ1MjM1NkZFREdlcTlGeDYxRUdyZlo5LnJvSUxVZnNtMmFaRjhGQ3RwTw==",
    urlLinea: "http://localhost:8080/linea",
    urlProceso: "http://localhost:8080/proceso",
    urlPropiedad: "http://localhost:8080/propiedad",
    urlTipoMaterial: "http://localhost:8080/tipo_material",
    urlMaterial: "http://localhost:8080/material",
    urlConfiguracion: "http://localhost:8080/configuracion",
    urlColor: "http://localhost:8080/color",
    urlInforme: "http://localhost:8080/informe",
    urlMateriaPrima: "http://localhost:8080/materia_prima",
    urlScrap: "http://localhost:8080/scrap",
    urlTipoDesperdicio: "http://localhost:8080/tipo_desperdicio",
    urlProductoTerminado: "http://localhost:8080/producto_terminado",
    urlRegistro: "http://localhost:8080/registro",
    urlPersonal: "http://localhost:8080/personal",
    linea: [],
    proceso: [],
    propiedad: [],
    tipo_material: [],
    material: [],
    configuracion: [],
    informe: [],
    color: [],
    scrap: [],
    tipo_desperdicio: [],
    registro: [],
    personal: [],
    materia_prima:[],
    producto_terminado:[],
    parte: "",
    valor: "",
    valor2:"",
    presentaraviso: false,
    tipoaviso: "aviso",
    estadoaviso: false,
    mensaje: "No hay mensaje",
    loading: false,
    generado:false
  },
  mutations: {
    setPersonal: function (state, payload) {
      state.personal = payload
    },
    setLinea: function (state, payload) {
      state.linea = payload
    },
    setProceso: function (state, payload) {
      state.proceso = payload
    },
    setPropiedad: function (state, payload) {
      state.propiedad = payload
    },
    setTipoMaterial: function (state, payload) {
      state.tipo_material = payload
    },
    setMaterial: function (state, payload) {
      state.material = payload
    },
    setConfiguracion: function (state, payload) {
      state.configuracion = payload
    },
    setColor: function (state, payload) {
      state.color = payload
    },
    setInforme: function (state, payload) {
      state.informe = payload
    },
    setTipoDesperdicio: function (state, payload) {
      state.tipo_desperdicio = payload
    },
    setLoading: function (state, payload) {
      state.loading = payload
    },
    setMateriaPrima: function(state,payload){
      state.materia_prima = payload
    },
    setProductoTerminado: function(state,payload){
      state.producto_terminado = payload
    },
    setScrap: function(state,payload){
      state.scrap = payload
    },
    setRegistro: function(state,payload){
      state.registro = payload
    },
    setGenerado: function(state,payload){
      state.generado = payload
    },
    obtenerInforme: function(state){
      return state.informe
    },
    getMateriaPrima: function(state){
      return state.materia_prima
    },
    getProductoTerminado: function(state){
      return state.producto_terminado
    },
    getScrap: function(state){
      return state.scrap
    },
    getRegistro: function(state){
      return state.registro
    },
    mensajeaviso: function(state,payload) {
      state.presentaraviso = true;
      state.mensaje = payload;
      state.tipoaviso = "aviso";
    },
  },
  actions: {
    
    getLinea: async function ({ commit }) {
      commit('setLoading', true)
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YTJhYTA3YWFmYXJ0d2V0c2RBRDUyMzU2RkVER2VGOHpNSTlYQUtGQWNLVG9SWFBUcVRjSElTNVVvRWRlOm8yYW8wN29hZmFydHdldHNkQUQ1MjM1NkZFREdlcTlGeDYxRUdyZlo5LnJvSUxVZnNtMmFaRjhGQ3RwTw==");

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        const res = await fetch("http://localhost:8080/linea", requestOptions)
        const data = await res.json()
        commit('setLinea', data.detalle)
        commit('setLoading', false)
      } catch (error) {
        console.log(error)
      }
    },
    getProceso: async function ({ commit }) {
      commit('setLoading', true)
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YTJhYTA3YWFmYXJ0d2V0c2RBRDUyMzU2RkVER2VGOHpNSTlYQUtGQWNLVG9SWFBUcVRjSElTNVVvRWRlOm8yYW8wN29hZmFydHdldHNkQUQ1MjM1NkZFREdlcTlGeDYxRUdyZlo5LnJvSUxVZnNtMmFaRjhGQ3RwTw==");

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        const res = await fetch("http://localhost:8080/proceso", requestOptions)
        const data = await res.json()
        commit('setProceso', data.detalle)
        commit('setLoading', false)
      } catch (error) {
        console.log(error)
      }
    },
    getMaterial: async function ({ commit }) {
      commit('setLoading', true)
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YTJhYTA3YWFmYXJ0d2V0c2RBRDUyMzU2RkVER2VGOHpNSTlYQUtGQWNLVG9SWFBUcVRjSElTNVVvRWRlOm8yYW8wN29hZmFydHdldHNkQUQ1MjM1NkZFREdlcTlGeDYxRUdyZlo5LnJvSUxVZnNtMmFaRjhGQ3RwTw==");

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        const res = await fetch("http://localhost:8080/material", requestOptions)
        const data = await res.json()
        commit('setMaterial', data.detalle)
        commit('setLoading', false)
      } catch (error) {
        console.log(error)
      }
    },
    getTipoMaterial: async function ({ commit }) {
      commit('setLoading', true)
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YTJhYTA3YWFmYXJ0d2V0c2RBRDUyMzU2RkVER2VGOHpNSTlYQUtGQWNLVG9SWFBUcVRjSElTNVVvRWRlOm8yYW8wN29hZmFydHdldHNkQUQ1MjM1NkZFREdlcTlGeDYxRUdyZlo5LnJvSUxVZnNtMmFaRjhGQ3RwTw==");

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        const res = await fetch("http://localhost:8080/tipo_material", requestOptions)
        const data = await res.json()
        commit('setTipoMaterial', data.detalle)
        commit('setLoading', false)
      } catch (error) {
        console.log(error)
      }
    },
    getPropiedad: async function ({ commit }) {
      commit('setLoading', true)
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YTJhYTA3YWFmYXJ0d2V0c2RBRDUyMzU2RkVER2VGOHpNSTlYQUtGQWNLVG9SWFBUcVRjSElTNVVvRWRlOm8yYW8wN29hZmFydHdldHNkQUQ1MjM1NkZFREdlcTlGeDYxRUdyZlo5LnJvSUxVZnNtMmFaRjhGQ3RwTw==");

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        const res = await fetch("http://localhost:8080/propiedad", requestOptions)
        const data = await res.json()
        commit('setPropiedad', data.detalle)
        commit('setLoading', false)
      } catch (error) {
        console.log(error)
      }
    },
    getColor: async function ({ commit }) {
      commit('setLoading', true)
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YTJhYTA3YWFmYXJ0d2V0c2RBRDUyMzU2RkVER2VGOHpNSTlYQUtGQWNLVG9SWFBUcVRjSElTNVVvRWRlOm8yYW8wN29hZmFydHdldHNkQUQ1MjM1NkZFREdlcTlGeDYxRUdyZlo5LnJvSUxVZnNtMmFaRjhGQ3RwTw==");

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        const res = await fetch("http://localhost:8080/color", requestOptions)
        const data = await res.json()
        commit('setColor', data.detalle)
        commit('setLoading', false)
      } catch (error) {
        console.log(error)
      }
    },
    getPersonal: async function ({ commit }) {
      commit('setLoading', true)
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YTJhYTA3YWFmYXJ0d2V0c2RBRDUyMzU2RkVER2VGOHpNSTlYQUtGQWNLVG9SWFBUcVRjSElTNVVvRWRlOm8yYW8wN29hZmFydHdldHNkQUQ1MjM1NkZFREdlcTlGeDYxRUdyZlo5LnJvSUxVZnNtMmFaRjhGQ3RwTw==");

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        const res = await fetch("http://localhost:8080/personal", requestOptions)
        const data = await res.json()
        commit('setPersonal', data.detalle)
        commit('setLoading', false)
      } catch (error) {
        console.log(error)
      }
    },
    getConfiguracion: async function ({ commit }) {
      commit('setLoading', true)
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YTJhYTA3YWFmYXJ0d2V0c2RBRDUyMzU2RkVER2VGOHpNSTlYQUtGQWNLVG9SWFBUcVRjSElTNVVvRWRlOm8yYW8wN29hZmFydHdldHNkQUQ1MjM1NkZFREdlcTlGeDYxRUdyZlo5LnJvSUxVZnNtMmFaRjhGQ3RwTw==");

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        const res = await fetch("http://localhost:8080/configuracion", requestOptions)
        const data = await res.json()
        commit('setConfiguracion', data.detalle)
        commit('setLoading', false)
      } catch (error) {
        console.log(error)
      }
    },
    getTipoDesperdicio: async function ({ commit }) {
      commit('setLoading', true)
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YTJhYTA3YWFmYXJ0d2V0c2RBRDUyMzU2RkVER2VGOHpNSTlYQUtGQWNLVG9SWFBUcVRjSElTNVVvRWRlOm8yYW8wN29hZmFydHdldHNkQUQ1MjM1NkZFREdlcTlGeDYxRUdyZlo5LnJvSUxVZnNtMmFaRjhGQ3RwTw==");

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        const res = await fetch("http://localhost:8080/tipo_desperdicio", requestOptions)
        const data = await res.json()
        commit('setTipoDesperdicio', data.detalle)
        commit('setLoading', false)
      } catch (error) {
        console.log(error)
      }
    },
    getInforme: async function ({ commit }) {
      commit('setLoading', true)
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YTJhYTA3YWFmYXJ0d2V0c2RBRDUyMzU2RkVER2VGOHpNSTlYQUtGQWNLVG9SWFBUcVRjSElTNVVvRWRlOm8yYW8wN29hZmFydHdldHNkQUQ1MjM1NkZFREdlcTlGeDYxRUdyZlo5LnJvSUxVZnNtMmFaRjhGQ3RwTw==");

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        const res = await fetch("http://localhost:8080/informe", requestOptions)
        const data = await res.json()
        commit('setInforme', data.detalle)
        commit('setLoading', false)
      } catch (error) {
        console.log(error)
      }
    },
    getRegistro: async function ({ commit }) {
      commit('setLoading', true)
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YTJhYTA3YWFmYXJ0d2V0c2RBRDUyMzU2RkVER2VGOHpNSTlYQUtGQWNLVG9SWFBUcVRjSElTNVVvRWRlOm8yYW8wN29hZmFydHdldHNkQUQ1MjM1NkZFREdlcTlGeDYxRUdyZlo5LnJvSUxVZnNtMmFaRjhGQ3RwTw==");

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        const res = await fetch("http://localhost:8080/registro", requestOptions)
        const data = await res.json()
        commit('setRegistro', data.detalle)
        commit('setLoading', false)
      } catch (error) {
        console.log(error)
      }
    },
    getProductoTerminado: async function ({ commit }) {
      commit('setLoading', true)
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YTJhYTA3YWFmYXJ0d2V0c2RBRDUyMzU2RkVER2VGOHpNSTlYQUtGQWNLVG9SWFBUcVRjSElTNVVvRWRlOm8yYW8wN29hZmFydHdldHNkQUQ1MjM1NkZFREdlcTlGeDYxRUdyZlo5LnJvSUxVZnNtMmFaRjhGQ3RwTw==");

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        const res = await fetch("http://localhost:8080/producto_terminado", requestOptions)
        const data = await res.json()
        commit('setProductoTerminado', data.detalle)
        commit('setLoading', false)
      } catch (error) {
        console.log(error)
      }
    },
    getMateriaPrima: async function ({ commit }) {
      commit('setLoading', true)
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YTJhYTA3YWFmYXJ0d2V0c2RBRDUyMzU2RkVER2VGOHpNSTlYQUtGQWNLVG9SWFBUcVRjSElTNVVvRWRlOm8yYW8wN29hZmFydHdldHNkQUQ1MjM1NkZFREdlcTlGeDYxRUdyZlo5LnJvSUxVZnNtMmFaRjhGQ3RwTw==");

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        const res = await fetch("http://localhost:8080/materia_prima", requestOptions)
        const data = await res.json()
        commit('setMateriaPrima', data.detalle)
        commit('setLoading', false)
      } catch (error) {
        console.log(error)
      }
    },
    getScrap: async function ({ commit }) {
      commit('setLoading', true)
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YTJhYTA3YWFmYXJ0d2V0c2RBRDUyMzU2RkVER2VGOHpNSTlYQUtGQWNLVG9SWFBUcVRjSElTNVVvRWRlOm8yYW8wN29hZmFydHdldHNkQUQ1MjM1NkZFREdlcTlGeDYxRUdyZlo5LnJvSUxVZnNtMmFaRjhGQ3RwTw==");

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        const res = await fetch("http://localhost:8080/scrap", requestOptions)
        const data = await res.json()
        commit('setScrap', data.detalle)
        commit('setLoading', false)
      } catch (error) {
        console.log(error)
      }
    },
    postInforme: async function ({ commit },objetoinforme) {
      commit('setLoading', true)
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YTJhYTA3YWFmYXJ0d2V0c2RBRDUyMzU2RkVER2VGOHpNSTlYQUtGQWNLVG9SWFBUcVRjSElTNVVvRWRlOm8yYW8wN29hZmFydHdldHNkQUQ1MjM1NkZFREdlcTlGeDYxRUdyZlo5LnJvSUxVZnNtMmFaRjhGQ3RwTw==");
    
      
        var formdata = new FormData();
        formdata.append("id_informe", objetoinforme.id_informe);
        formdata.append("id", objetoinforme.id);
        formdata.append("turno", objetoinforme.turno);
        formdata.append("saldo_anterior",objetoinforme.saldo_anterior);
        formdata.append("observacion", objetoinforme.observacion);
        formdata.append("completado", objetoinforme.completado);
        formdata.append("id_proceso", objetoinforme.id_proceso);
        formdata.append("id_material", objetoinforme.id_material);
        formdata.append("id_tipo_material",objetoinforme.id_tipo_material);

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
        };

        const res = await fetch("http://localhost:8080/informe", requestOptions)
        const data = await res.json()
        commit('mensajeaviso', data.detalle)
        commit('setLoading', false)
      } catch (error) {
        console.log(error)
      }
    },

    postMateriaPrima: async function ({ commit },objetomateriaprima) {
      commit('setLoading', true)
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YTJhYTA3YWFmYXJ0d2V0c2RBRDUyMzU2RkVER2VGOHpNSTlYQUtGQWNLVG9SWFBUcVRjSElTNVVvRWRlOm8yYW8wN29hZmFydHdldHNkQUQ1MjM1NkZFREdlcTlGeDYxRUdyZlo5LnJvSUxVZnNtMmFaRjhGQ3RwTw==");

        var formdata = new FormData();
        formdata.append("id_materia_prima",objetomateriaprima.id_materia_prima);
        formdata.append("id_configuracion",objetomateriaprima.id_configuracion);
        formdata.append("id_color",objetomateriaprima.id_color);
        formdata.append("id_informe",objetomateriaprima.id_informe);
        formdata.append("peso",objetomateriaprima.peso);

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
        };

        const res = await fetch("http://localhost:8080/materia_prima", requestOptions)
        const data = await res.json()
        commit('mensajeaviso', data.detalle)
        commit('setLoading', false)
      } catch (error) {
        console.log(error)
      }
    },

    postProductoTerminado: async function ({ commit },objetoproductoterminado) {
      commit('setLoading', true)
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YTJhYTA3YWFmYXJ0d2V0c2RBRDUyMzU2RkVER2VGOHpNSTlYQUtGQWNLVG9SWFBUcVRjSElTNVVvRWRlOm8yYW8wN29hZmFydHdldHNkQUQ1MjM1NkZFREdlcTlGeDYxRUdyZlo5LnJvSUxVZnNtMmFaRjhGQ3RwTw==");

        var formdata = new FormData();
        formdata.append("id_producto_terminado", objetoproductoterminado.id_producto_terminado);
        formdata.append("id_informe", objetoproductoterminado.id_informe);
        formdata.append("peso", objetoproductoterminado.peso);
        formdata.append("id_color", objetoproductoterminado.id_color);
        formdata.append("tipo", objetoproductoterminado.tipo);

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
        };

        const res = await fetch("http://localhost:8080/producto_terminado", requestOptions)
        const data = await res.json()
        commit('mensajeaviso', data.detalle)
        commit('setLoading', false)
      } catch (error) {
        console.log(error)
      }
    },

    postScrap: async function ({ commit },objetoscrap) {
      commit('setLoading', true)
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YTJhYTA3YWFmYXJ0d2V0c2RBRDUyMzU2RkVER2VGOHpNSTlYQUtGQWNLVG9SWFBUcVRjSElTNVVvRWRlOm8yYW8wN29hZmFydHdldHNkQUQ1MjM1NkZFREdlcTlGeDYxRUdyZlo5LnJvSUxVZnNtMmFaRjhGQ3RwTw==");


        var formdata = new FormData();
        formdata.append("id_scrap", objetoscrap.id_scrap);
        formdata.append("motivo", objetoscrap.motivo);
        formdata.append("sacos", objetoscrap.sacos);
        formdata.append("peso", objetoscrap.peso);
        formdata.append("id_informe", objetoscrap.id_informe);

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
        };

        const res = await fetch("http://localhost:8080/scrap", requestOptions)
        const data = await res.json()
        commit('setLoading', false)
      } catch (error) {
        console.log(error)
      }
    },

    postRegistro: async function ({ commit },objetoregistro) {
      commit('setLoading', true)
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YTJhYTA3YWFmYXJ0d2V0c2RBRDUyMzU2RkVER2VGOHpNSTlYQUtGQWNLVG9SWFBUcVRjSElTNVVvRWRlOm8yYW8wN29hZmFydHdldHNkQUQ1MjM1NkZFREdlcTlGeDYxRUdyZlo5LnJvSUxVZnNtMmFaRjhGQ3RwTw==");

        var formdata = new FormData();
        formdata.append("id_registro", objetoregistro.id_registro);
        formdata.append("id_personal", objetoregistro.id_personal);
        formdata.append("id_informe", objetoregistro.id_informe);

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
        };

        const res = await fetch("http://localhost:8080/registro", requestOptions)
        const data = await res.json()
        commit('setLoading', false)
      } catch (error) {
        console.log(error)
      }
    },

    deleteRegistro: async function ({ commit },id) {
      commit('setLoading', true)
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YTJhYTA3YWFmYXJ0d2V0c2RBRDUyMzU2RkVER2VGOHpNSTlYQUtGQWNLVG9SWFBUcVRjSElTNVVvRWRlOm8yYW8wN29hZmFydHdldHNkQUQ1MjM1NkZFREdlcTlGeDYxRUdyZlo5LnJvSUxVZnNtMmFaRjhGQ3RwTw==");

        var requestOptions = {
          method: 'DELETE',
          headers: myHeaders,
          redirect: 'follow'
        };


        const res = await fetch("http://localhost:8080/registro/"+id, requestOptions)
        const data = await res.json()
        commit('setLoading', false)
      } catch (error) {
        console.log(error)
      }
    },

    deleteMateriaPrima: async function ({ commit },id) {
      commit('setLoading', true)
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YTJhYTA3YWFmYXJ0d2V0c2RBRDUyMzU2RkVER2VGOHpNSTlYQUtGQWNLVG9SWFBUcVRjSElTNVVvRWRlOm8yYW8wN29hZmFydHdldHNkQUQ1MjM1NkZFREdlcTlGeDYxRUdyZlo5LnJvSUxVZnNtMmFaRjhGQ3RwTw==");

        var requestOptions = {
          method: 'DELETE',
          headers: myHeaders,
          redirect: 'follow'
        };


        const res = await fetch("http://localhost:8080/materia_prima/"+id, requestOptions)
        const data = await res.json()
        commit('setLoading', false)
      } catch (error) {
        console.log(error)
      }
    },

    deleteProductoTerminado: async function ({ commit },id) {
      commit('setLoading', true)
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YTJhYTA3YWFmYXJ0d2V0c2RBRDUyMzU2RkVER2VGOHpNSTlYQUtGQWNLVG9SWFBUcVRjSElTNVVvRWRlOm8yYW8wN29hZmFydHdldHNkQUQ1MjM1NkZFREdlcTlGeDYxRUdyZlo5LnJvSUxVZnNtMmFaRjhGQ3RwTw==");

        var requestOptions = {
          method: 'DELETE',
          headers: myHeaders,
          redirect: 'follow'
        };


        const res = await fetch("http://localhost:8080/producto_terminado/"+id, requestOptions)
        const data = await res.json()
        commit('setLoading', false)
      } catch (error) {
        console.log(error)
      }
    },

    deleteScrap: async function ({ commit },id) {
      commit('setLoading', true)
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YTJhYTA3YWFmYXJ0d2V0c2RBRDUyMzU2RkVER2VGOHpNSTlYQUtGQWNLVG9SWFBUcVRjSElTNVVvRWRlOm8yYW8wN29hZmFydHdldHNkQUQ1MjM1NkZFREdlcTlGeDYxRUdyZlo5LnJvSUxVZnNtMmFaRjhGQ3RwTw==");

        var requestOptions = {
          method: 'DELETE',
          headers: myHeaders,
          redirect: 'follow'
        };


        const res = await fetch("http://localhost:8080/scrap/"+id, requestOptions)
        const data = await res.json()
        commit('setLoading', false)
      } catch (error) {
        console.log(error)
      }
    },

  },
  getters:{
    obtenerinforme(state){
      return state.informe
    }
  },
  modules: {
  }
})
