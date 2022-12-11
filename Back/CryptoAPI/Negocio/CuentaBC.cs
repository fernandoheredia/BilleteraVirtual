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
        public Cuenta? ObtenerCuenta(crypto_dbContext db, int id)
        {
            return db.Cuentas.FirstOrDefault(a => a.IdCuenta == id);
        }
    }
}
