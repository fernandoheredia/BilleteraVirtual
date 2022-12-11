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
        public Cuenta? ObtenerCuenta(crypto_dbContext db, int id)
        { 
            return db.Cuentas.FirstOrDefault(a => a.IdCuenta == id);
        }
    }
}
