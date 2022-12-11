using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public partial class CuentaVista
    {
        public int IdCuenta { get; set; }
        public int IdMoneda { get; set; }
        public int IdUsuario { get; set; }
        public string? Cvu { get; set; }
    }
}
