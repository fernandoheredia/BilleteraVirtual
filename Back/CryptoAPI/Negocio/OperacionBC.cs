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

        public void AgregarOperacion(crypto_dbContext db, VistaOperacion nuevaOperacion)
        {
            TipoOperacion? tipoOperacion = new TipoOperacionBC().ObtenerTipoOperacion(db, nuevaOperacion.IdTipoOperacion);
            Cuenta? cuentaOrigen = new CuentaBC().ObtenerCuenta(db, nuevaOperacion.IdCuentaOrigen);
            
            Operacion operacion = new();
            operacion.IdTipoOperacion = tipoOperacion.IdTipoOperacion;
            operacion.IdCuentaOrigen = cuentaOrigen.IdCuenta;
            operacion.Haber = nuevaOperacion.Haber;
            operacion.Debe = nuevaOperacion.Debe;
            operacion.Cotizacion = nuevaOperacion.Cotizacion;

            db.Operaciones.Add(operacion);
            db.SaveChanges();
        }
    }
}
