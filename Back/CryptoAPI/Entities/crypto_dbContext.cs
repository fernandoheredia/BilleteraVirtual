using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Entities
{
    public partial class crypto_dbContext : DbContext
    {
        public crypto_dbContext()
        {
        }

        public crypto_dbContext(DbContextOptions<crypto_dbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<ContactoBancario> ContactosBancarios { get; set; } = null!;
        public virtual DbSet<Cuenta> Cuentas { get; set; } = null!;
        public virtual DbSet<Moneda> Monedas { get; set; } = null!;
        public virtual DbSet<Operacion> Operaciones { get; set; } = null!;
        public virtual DbSet<TipoOperacion> TiposOperaciones { get; set; } = null!;
        public virtual DbSet<Usuario> Usuarios { get; set; } = null!;
        public virtual DbSet<Login> Logins { get;set; } = null!;
        public virtual DbSet<VistaUsuario> VistaUsuarios { get; set; } = null!;
        public virtual DbSet<CuentaVista> VistaCuentas { get; set; } = null!;
        public virtual DbSet<VistaRegistro> VistaRegistro { get; set; } = null!;

        public virtual DbSet<VistaOperacionFront> VistaOperacionesFront { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=DESKTOP-4LA7817; Database=crypto_db; user=sa; Password=sa_access; TrustServerCertificate=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ContactoBancario>(entity =>
            {
                entity.HasKey(e => e.IdContacto);

                entity.Property(e => e.IdContacto).HasColumnName("idContacto");

                entity.Property(e => e.Cbu)
                    .HasMaxLength(22)
                    .HasColumnName("cbu");

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.Property(e => e.Beneficiario)
                    .HasMaxLength(50)
                    .HasColumnName("beneficiario");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.ContactoBancario)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ContactoBancario_Usuarios");
            });

            modelBuilder.Entity<Cuenta>(entity =>
            {
                entity.HasKey(e => e.IdCuenta);

                entity.Property(e => e.IdCuenta).HasColumnName("idCuenta");

                entity.Property(e => e.Activa).HasColumnName("activa");

                entity.Property(e => e.Cvu)
                    .HasMaxLength(22)
                    .HasColumnName("cvu");

                entity.Property(e => e.FechaAlta)
                    .HasColumnType("datetime")
                    .HasColumnName("fechaAlta")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IdMoneda).HasColumnName("idMoneda");

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.HasOne(d => d.IdMonedaNavigation)
                    .WithMany(p => p.Cuenta)
                    .HasForeignKey(d => d.IdMoneda)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Cuentas_Monedas");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Cuenta)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Cuentas_Usuarios");
            });

            modelBuilder.Entity<Moneda>(entity =>
            {
                entity.HasKey(e => e.IdMoneda);

                entity.Property(e => e.IdMoneda).HasColumnName("idMoneda");

                entity.Property(e => e.Codigo)
                    .HasMaxLength(10)
                    .HasColumnName("codigo");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(50)
                    .HasColumnName("nombre");
            });

            modelBuilder.Entity<Operacion>(entity =>
            {
                entity.HasKey(e => e.IdOperacion);

                entity.Property(e => e.IdOperacion).HasColumnName("idOperacion");

                entity.Property(e => e.Cotizacion)
                    .HasColumnType("decimal(18, 5)")
                    .HasColumnName("cotizacion");

                entity.Property(e => e.Debe)
                    .HasColumnType("decimal(18, 18)")
                    .HasColumnName("debe");

                entity.Property(e => e.Fecha)
                    .HasColumnType("datetime")
                    .HasColumnName("fecha")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Haber)
                    .HasColumnType("decimal(18, 18)")
                    .HasColumnName("haber");

                entity.Property(e => e.IdContacto).HasColumnName("idContacto");

                entity.Property(e => e.IdCuentaOrigen).HasColumnName("idCuentaOrigen");

                entity.Property(e => e.IdTipoOperacion).HasColumnName("idTipoOperacion");

                entity.HasOne(d => d.IdContactoNavigation)
                    .WithMany(p => p.Operaciones)
                    .HasForeignKey(d => d.IdContacto)
                    .HasConstraintName("FK_Operaciones_ContactosBancarios");

                entity.HasOne(d => d.IdCuentaOrigenNavigation)
                    .WithMany(p => p.Operaciones)
                    .HasForeignKey(d => d.IdCuentaOrigen)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Operaciones_Cuentas_Origen");

                entity.HasOne(d => d.IdTipoOperacionNavigation)
                    .WithMany(p => p.Operaciones)
                    .HasForeignKey(d => d.IdTipoOperacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Operaciones_TipoOperacion");
            });

            modelBuilder.Entity<TipoOperacion>(entity =>
            {
                entity.HasKey(e => e.IdTipoOperacion)
                    .HasName("PK_TipoOperacion");

                entity.Property(e => e.IdTipoOperacion).HasColumnName("idTipoOperacion");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(50)
                    .HasColumnName("nombre");

                entity.Property(e => e.Codigo)
                    .HasMaxLength(10)
                    .HasColumnName("codigo");
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.IdUsuario);

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.Property(e => e.Apellido)
                    .HasMaxLength(50)
                    .HasColumnName("apellido");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .HasColumnName("email");

                entity.Property(e => e.FechaAlta)
                    .HasColumnType("datetime")
                    .HasColumnName("fechaAlta")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.FechaBaja)
                    .HasColumnType("datetime")
                    .HasColumnName("fechaBaja");

                entity.Property(e => e.FechaNacimiento)
                    .HasColumnType("datetime")
                    .HasColumnName("fechaNacimiento");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(50)
                    .HasColumnName("nombre");

                entity.Property(e => e.Password)
                    .HasMaxLength(50)
                    .HasColumnName("password");
            });

            modelBuilder.Entity<Login>(entity => //vista agregada para usr
            {
                entity.HasNoKey();
                entity.ToView("Logins");
                entity.Property(e => e.Email).IsUnicode(false);
                entity.Property(e => e.Password).IsUnicode(false);
            });

            modelBuilder.Entity<VistaUsuario>(entity => //vista agregada para usr
            {
                entity.HasKey(e => e.IdUsuario);
                entity.ToView("VistaUsuarios");
                entity.Property(e => e.IdUsuario);
                entity.Property(e => e.Email).IsUnicode(false);
                entity.Property(e => e.Password).IsUnicode(false);
                entity.Property(e => e.Nombre).IsUnicode(false);
                entity.Property(e => e.Apellido).IsUnicode(false);
            });

            modelBuilder.Entity<VistaRegistro>(entity => //vista agregada para usr
            {
                entity.HasKey(e => e.IdUsuario);
                entity.ToView("VistaRegistro");
                entity.Property(e => e.IdUsuario);
                entity.Property(e => e.Email).IsUnicode(false);
                entity.Property(e => e.Password).IsUnicode(false);
                entity.Property(e => e.Nombre).IsUnicode(false);
                entity.Property(e => e.Apellido).IsUnicode(false);
            });

            modelBuilder.Entity<CuentaVista>(entity =>
            {
                entity.HasKey(e => e.IdCuenta);
                entity.ToView("VistaCuentas");
                entity.Property(e => e.IdCuenta);
                entity.Property(e => e.IdMoneda);
                entity.Property(e => e.IdUsuario);
                entity.Property(e => e.Cvu).IsUnicode(false);
            }
            );

            modelBuilder.Entity<VistaOperacionFront>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToView("VistaOperacionesFront");
                entity.Property(e => e.Id);
                entity.Property(e => e.CodigoMovimiento);
                entity.Property(e => e.IdCuentaOrigen);
                entity.Property(e => e.Fecha);
                entity.Property(e => e.CotARSvsBTC);
                entity.Property(e => e.Haber);
                entity.Property(e => e.Debe);
                entity.Property(e => e.IdContacto);
                entity.Property(e => e.Cuenta);
            }
            );

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
