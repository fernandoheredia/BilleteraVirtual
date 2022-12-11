using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Negocio;

namespace CryptoAPI.Controllers
{
    [Route("api/cuenta")]
    [ApiController]
    public class CuentaController : ControllerBase
    {
        [HttpGet("{idUsuario}")]
        public List<CuentaVista> Get(int idUsuario) //devuelve el listado de cuentas de un Usuario
        {
            List<CuentaVista> listaCuentas = new List<CuentaVista>();

            using(var db = new crypto_dbContext())
            {
                listaCuentas = new CuentaBC().ObtenerCuentasUsuario(db, idUsuario);
            }
            return listaCuentas;
        }

    }
}
