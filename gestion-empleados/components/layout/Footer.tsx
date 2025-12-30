import Link from "next/link";
import { Sparkles, Mail, Phone, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    producto: [
      { name: "Características", href: "#caracteristicas" },
      { name: "Beneficios", href: "#beneficios" },
      { name: "Cómo Funciona", href: "#como-funciona" },
    ],
    empresa: [
      { name: "Sobre Nosotros", href: "#" },
      { name: "Política de Privacidad", href: "#" },
      { name: "Términos de Servicio", href: "#" },
    ],
    soporte: [
      { name: "Centro de Ayuda", href: "#" },
      { name: "Documentación", href: "#" },
      { name: "Estado del Sistema", href: "#" },
    ],
  };

  return (
    <footer id="contacto" className="relative overflow-hidden border-t border-border/40">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Brand section */}
          <div className="lg:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">
                EyD Group SAS
              </span>
            </Link>
            <p className="mb-4 text-sm text-muted-foreground">
              Sistema de Gestión de Talento Humano para empresas modernas.
            </p>

            {/* Contact info */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a
                  href="mailto:contacto@eydgroup.com"
                  className="hover:text-foreground"
                >
                  contacto@eydgroup.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+57123456789" className="hover:text-foreground">
                  +57 123 456 789
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Bogotá, Colombia</span>
              </div>
            </div>
          </div>

          {/* Links sections */}
          <div className="grid grid-cols-3 gap-8 lg:col-span-3">
            {/* Producto */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-foreground">
                Producto
              </h3>
              <ul className="space-y-2">
                {footerLinks.producto.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Empresa */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-foreground">
                Empresa
              </h3>
              <ul className="space-y-2">
                {footerLinks.empresa.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Soporte */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-foreground">
                Soporte
              </h3>
              <ul className="space-y-2">
                {footerLinks.soporte.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom section */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} EyD Group SAS. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
