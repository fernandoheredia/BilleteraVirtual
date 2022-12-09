using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Negocio;

namespace CryptoAPI.Controllers
{
    [Route("api/usuario")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        //[HttpGet("{email}/{pwd}")]
        //public Usuario? Get(string email, string pwd)
        //{
        //    try
        //    {
        //        using (var db = new crypto_dbContext())
        //        {
        //            return new UsuarioBC().Login(db, email, pwd);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        throw;
        //    }
                    
        //}

        [HttpGet("cuentas/{id}")]
        public Usuario? GetCuentas(int id)
        {
            try 
            {
                using(var db = new crypto_dbContext())
                {
                    return new UsuarioBC().ObtenerUsuarioCuentas(db, id);
                }
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        [HttpGet("contactos/{id}")]
        public Usuario? GetContactos(int id)
        {
            try
            {
                using (var db = new crypto_dbContext())
                {
                    return new UsuarioBC().ObtenerUsuarioContactos(db, id);
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("login")]
        public Usuario Post([FromBody] Login login)
        {
            Usuario usuario;
            using (var db = new crypto_dbContext())
            {
                usuario = new UsuarioBC().Login(db, login.Email, login.Password);
            }
            return usuario;
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
