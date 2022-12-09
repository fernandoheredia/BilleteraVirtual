using Entities;
//using Negocio;
using Microsoft.AspNetCore.Mvc;

namespace CryptoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OperacionController : ControllerBase
    {
        // GET: api/<OperacionController>
        [HttpGet]
        public List<Operacion> Get()
        {
            using (var db = new crypto_dbContext())
            {
                return db.Operaciones.ToList();
            }
        }

        // GET api/<OperacionController>/5
        [HttpGet("{id}")]
        public Operacion? Get(int id)
        {
            try
            {
                using (var db = new crypto_dbContext())
                {
                    return db.Operaciones.FirstOrDefault(a => a.IdOperacion == id);
                }
            }
            catch (Exception ex)
            {
                throw;
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
                    db.Operaciones.Add(oOperacion);
                    db.SaveChanges();
                }
            }
            catch (Exception ex)
            { 
                throw;
            }
               
        }

        // DELETE api/<OperacionController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            try
            {
                using (var db = new crypto_dbContext())
                {
                    Operacion? oOperacion = db.Operaciones.FirstOrDefault(a => a.IdOperacion == id);
                    db.Remove(oOperacion);
                    db.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
