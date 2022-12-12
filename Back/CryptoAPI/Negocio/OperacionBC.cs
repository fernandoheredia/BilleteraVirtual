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

        public void AgregarOperacion(crypto_dbContext db, VistaOperacion nuevaOperacion, int idUser)
        {
            Cuenta? cuentaOrigen = new CuentaBC().ObtenerCuenta(db, idUser);
            
            Operacion operacion = new();
            operacion.IdTipoOperacion = nuevaOperacion.IdTipoOperacion;
            operacion.IdCuentaOrigen = cuentaOrigen.IdCuenta;
            operacion.Haber = nuevaOperacion.Haber;
            operacion.Debe = nuevaOperacion.Debe;

            db.Operaciones.Add(operacion);
            db.SaveChanges();
        }

        //este método necesita las ids de ambas cuentas del usuario (ars y btc)
        public List<VistaOperacionFront> ObtenerOperacionesUsuario(crypto_dbContext db, int userId)
        {   
            List<CuentaVista> misCuentas = new CuentaBC().ObtenerCuentasUsuario(db, userId);
            List<VistaOperacionFront> respuesta = new List<VistaOperacionFront>();
            List<VistaOperacionFront> misOperaciones = new List<VistaOperacionFront>();
            //List<int> cuentasIds = new List<int>();
            foreach (var c in misCuentas) 
            {
                respuesta = db.VistaOperacionesFront.Where(r => r.IdCuentaOrigen == c.IdCuenta).ToList();
                foreach (var r in respuesta)
                    misOperaciones.Add(r);
                respuesta.Clear();
            }
                
            return misOperaciones;
        }
    }
}
