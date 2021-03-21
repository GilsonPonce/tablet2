// vue.config.js
module.exports = {
    // options...
    devServer: {
        //'http://apiproduccion.novared.local/',
        proxy: 'http://apiproduccion.novared.local/',
    }
  }