using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class VistaOperacion
    {
        public int IdOperacion { get; set; }
        public int IdTipoOperacion { get; set; }
        public int IdCuentaOrigen { get; set; }
        public decimal Haber { get; set; }
        public decimal Debe { get; set; }
    }
}
