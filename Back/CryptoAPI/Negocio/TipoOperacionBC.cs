using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Negocio
{
    public class TipoOperacionBC
    {
        public TipoOperacion? ObtenerTipoOperacion(crypto_dbContext db, int id)
        {
            return db.TiposOperaciones.FirstOrDefault(a => a.IdTipoOperacion == id);
        }
    }
}
