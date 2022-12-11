using System;
using System.Collections.Generic;

namespace Entities
{
    public partial class TipoOperacion
    {
        public TipoOperacion()
        {
            Operaciones = new HashSet<Operacion>();
        }

        public int IdTipoOperacion { get; set; }
        public string Nombre { get; set; } = null!;
        public string Codigo { get; set; } = null!;

        public virtual ICollection<Operacion> Operaciones { get; set; }
    }
}
