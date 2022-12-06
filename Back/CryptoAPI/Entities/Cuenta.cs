using System;
using System.Collections.Generic;

namespace Entities
{
    public partial class Cuenta
    {
        public Cuenta()
        {
            Operaciones = new HashSet<Operacion>();
        }

        public int IdCuenta { get; set; }
        public int IdMoneda { get; set; }
        public DateTime FechaAlta { get; set; }
        public bool Activa { get; set; }
        public int IdUsuario { get; set; }
        public string? Cvu { get; set; }

        public virtual Moneda IdMonedaNavigation { get; set; } = null!;
        public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
        public virtual ICollection<Operacion> Operaciones { get; set; }
    }
}
