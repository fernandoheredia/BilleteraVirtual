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

        public void RegistrarUsuario(crypto_dbContext db, VistaRegistro NuevoRegistro)
        {
            //Cuenta? cuentaOrigen = new CuentaBC().ObtenerCuenta(db, idUser);
            
            Usuario usuario = new();
            //usuario.IdUsuario = NuevoRegistro.IdUsuario;
            usuario.Email = NuevoRegistro.Email;
            usuario.Password = NuevoRegistro.Password;
            usuario.Nombre = NuevoRegistro.Nombre;
            usuario.Apellido = NuevoRegistro.Apellido;
            //usuario.FechaNacimiento = NuevoRegistro.FechaNacimiento;
            //usuario.FechaNacimiento = DateTime.Now;
            string fechaCadena = NuevoRegistro.FechaNacimiento;
            DateTime fechaNacimiento = DateTime.Parse(fechaCadena);
            usuario.FechaNacimiento = fechaNacimiento;

            db.Usuarios.Add(usuario);
            db.SaveChanges();

            //buscamos el nuevo usuario
            VistaUsuario miNuevoUsuario = Login(db,NuevoRegistro.Email,NuevoRegistro.Password);

            //creacion de cuentas
            new CuentaBC().RegistrarCuentas(db, miNuevoUsuario.IdUsuario);

            //creacion de contactos
            new ContactoBancarioBC().RegistrarContactos(db, miNuevoUsuario.IdUsuario);
        }
    }
}


