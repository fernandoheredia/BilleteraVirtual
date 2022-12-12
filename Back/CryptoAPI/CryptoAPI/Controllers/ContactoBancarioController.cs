using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Negocio;

namespace CryptoAPI.Controllers
{
    [Route("api/contacto")]
    [ApiController]
    public class ContactoBancarioController : ControllerBase
    {
        [HttpGet("{idUsuario}")]
        public List<ContactoBancario> Get(int idUsuario)
        {
            List<ContactoBancario> listaContactos = new List<ContactoBancario>();

            using (var db = new crypto_dbContext())
            {
                listaContactos = new ContactoBancarioBC().ObtenerContactosBancarios(db,idUsuario);
            }
            return listaContactos;
        }
    }
}
