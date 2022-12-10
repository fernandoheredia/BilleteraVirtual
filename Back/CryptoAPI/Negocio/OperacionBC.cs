using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Negocio
{
    public class OperacionBC
    {
        public List<Operacion> ObtenerOperaciones(crypto_dbContext db)
        {
            return db.Operaciones.ToList();
        }

        public void AgregarOperacion(crypto_dbContext db, Operacion nuevaOperacion)
        {
            db.Operaciones.Add(nuevaOperacion);
            db.SaveChanges();
        }
    }
}
