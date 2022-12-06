using Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Negocio
{
    public class UsuarioBC
    {
        public Usuario? ObtenerUsuario(crypto_dbContext db, string email,string pwd)
        {
            return db.Usuarios.Include(a => a.Cuenta).FirstOrDefault(a => a.Email == email && a.Password == pwd);
        }

        public Usuario? ObtenerUsuario(crypto_dbContext db, int id)
        {
            return db.Usuarios.Include(a => a.ContactoBancario).FirstOrDefault(a => a.IdUsuario == id);
        }
    }
}
