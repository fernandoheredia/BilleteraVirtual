using Entities;
using Negocio;
using Microsoft.AspNetCore.Mvc;

namespace CryptoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OperacionController : ControllerBase
    {
        // GET: api/<OperacionController> sdafadsfjgdaslkhfga
        [HttpGet]
        public List<Operacion> Get()
        {
            using (var db = new crypto_dbContext())
            {
                return new OperacionBC().ObtenerOperaciones(db);
            }
        }

        // POST api/<OperacionController>
        [HttpPost]
        public void Post([FromBody] Operacion oOperacion)
        {
            try
            {
                using (var db = new crypto_dbContext())
                {
                    new OperacionBC().AgregarOperacion(db, oOperacion);
                }
            }
            catch (Exception ex)
            { 
                throw;
            }
               
        }
    }
}
