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
        public Usuario? ObtenerUsuarioCuentas(crypto_dbContext db, int id)
        {
            return db.Usuarios.Include(a => a.Cuenta).FirstOrDefault(a => a.IdUsuario==id);
        }

        public Usuario? ObtenerUsuarioContactos(crypto_dbContext db, int id)
        {
            return db.Usuarios.Include(a => a.ContactoBancario).FirstOrDefault(a => a.IdUsuario == id);
        }

        public VistaUsuario Login(crypto_dbContext db, string email, string pwd)
        {
            return (VistaUsuario?) db.VistaUsuarios.FirstOrDefault(a => a.Email == email && a.Password == pwd);
        }
        public void RegistrarUsuario(crypto_dbContext db, VistaOperacion NuevoRegistro, int idUser)
        {
            Cuenta? cuentaOrigen = new CuentaBC().ObtenerCuenta(db, idUser);
            
            Usuario usuario = new();
            usuario.IdTipoOperacion = nuevaOperacion.IdTipoOperacion;
            usuario.IdCuentaOrigen = cuentaOrigen.IdCuenta;
            usuario.Haber = nuevaOperacion.Haber;
            usuario.Debe = nuevaOperacion.Debe;

            db.Operaciones.Add(operacion);
            db.SaveChanges();
        }
    }
}
