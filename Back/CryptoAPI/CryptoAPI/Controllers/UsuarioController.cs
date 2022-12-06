using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Negocio;

namespace CryptoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        [HttpGet("{email}/{pwd}")]
        public Usuario? Get(string email, string pwd)
        {
            try
            {
                using (var db = new crypto_dbContext())
                {
                    return new UsuarioBC().ObtenerUsuario(db, email, pwd);
                }
            }
            catch (Exception ex)
            {
                throw;
            }
                    
        }

        [HttpGet("{id}")]
        public Usuario? Get(int id)
        {
            try 
            {
                using(var db = new crypto_dbContext())
                {
                    return new UsuarioBC().ObtenerUsuario(db, id);
                }
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        [HttpPost]
        public void Post([FromBody] Usuario usr)
        {
            try
            {
                using (var db = new crypto_dbContext())
                {
                    db.Usuarios.Add(usr);
                    db.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpPut]
        public void Put([FromBody] Usuario usr)
        {
            try
            {
                using (var db = new crypto_dbContext())
                {
                    Usuario? usuarioBaja = db.Usuarios.FirstOrDefault(a => a.IdUsuario == usr.IdUsuario);
                    usuarioBaja.FechaBaja = usr.FechaBaja;
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
