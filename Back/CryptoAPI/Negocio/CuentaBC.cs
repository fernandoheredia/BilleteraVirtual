using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Negocio
{
    public class CuentaBC
    {
        public List<CuentaVista> ObtenerCuentasUsuario(crypto_dbContext db, int userId)
        {
            return db.VistaCuentas.Where(r => r.IdUsuario == userId).ToList();
        } 
        public Cuenta? ObtenerCuenta(crypto_dbContext db, int idUser)
        { 
            return db.Cuentas.FirstOrDefault(a => a.IdUsuario == idUser && a.IdMoneda == 2 && a.Activa == true);
        }

        public void RegistrarCuentas(crypto_dbContext db, int idUsuario)
        {
            bool activa = true;
            int idMoneda;
            string cvu;
            Random rand = new Random();
            for(int i = 1; i <= 2; i++) 
            {
                Cuenta miCuenta = new Cuenta();
                idMoneda = i;
                var x = rand.Next(0,1000000);
                cvu = x.ToString("000000");
                miCuenta.IdUsuario = idUsuario;
                miCuenta.Activa = activa;
                miCuenta.IdMoneda = idMoneda;
                miCuenta.Cvu = cvu;
                db.Cuentas.Add(miCuenta);
                db.SaveChanges();
            }
        }
    }
}
