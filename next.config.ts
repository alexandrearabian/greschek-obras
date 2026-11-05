import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: { qualities: [75, 85] },
  async redirects() {
    return [
      { source: "/", destination: "/es", permanent: false },
      // URLs del sitio Squarespace anterior
      { source: "/proyectos", destination: "/es/proyectos", permanent: true },
      { source: "/proyectos/:old", destination: "/es/proyectos", permanent: true },
      { source: "/services", destination: "/es/servicios", permanent: true },
      { source: "/about", destination: "/es/nosotros", permanent: true },
      { source: "/contact", destination: "/es/contacto", permanent: true },
    ];
  },
};

export default nextConfig;
