using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class VistaOperacionFront
    {
        public int IdOperacion { get; set; }
        public int IdTipoOperacion { get; set; }
        public int IdCuentaOrigen { get; set; }
        public DateTime Fecha { get; set; }
        public decimal Cotizacion { get; set; }
        public decimal Haber { get; set; }
        public decimal Debe { get; set; }
        public int? IdContacto { get; set; }
        public string CodigoOperacion { get; set; }
        public int idMoneda { get; set; }
        public string codigoMoneda { get; set; }
    }
}
