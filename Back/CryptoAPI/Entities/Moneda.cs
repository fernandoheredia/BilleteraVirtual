using System;
using System.Collections.Generic;

namespace Entities
{
    public partial class Moneda
    {
        public Moneda()
        {
            Cuenta = new HashSet<Cuenta>();
        }

        public int IdMoneda { get; set; }
        public string Nombre { get; set; } = null!;
        public string Codigo { get; set; } = null!;

        public virtual ICollection<Cuenta> Cuenta { get; set; }
    }
}
