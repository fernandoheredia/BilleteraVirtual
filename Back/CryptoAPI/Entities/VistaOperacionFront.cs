using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class VistaOperacionFront
    {
        public int Id { get; set; }
        public int CodigoMovimiento { get; set; }
        public int IdCuentaOrigen { get; set; }
        public DateTime Fecha { get; set; }
        public decimal CotARSvsBTC { get; set; }
        public decimal Haber { get; set; }
        public decimal Debe { get; set; }
        public int? IdContacto { get; set; }
        public int Cuenta { get; set; }
        public int IdUsuario { get; set; }
    }
}
