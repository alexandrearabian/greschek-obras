// Datos de contacto. Lo que esté vacío no se muestra en el sitio.
export const site = {
  name: "Greschek Obras",
  url: "https://www.greschek-obras.com",
  email: "greschekobras@gmail.com",
  phone: "", // ej: "+54 9 11 1234 5678"
  // PROVISORIO: número inventado hasta que el cliente tenga la línea nueva (PENDIENTES.md). Solo números.
  whatsapp: "5491100000000",
  address: "", // dirección de oficina, si tienen
  instagram: "https://www.instagram.com/greschek_obras",
  founded: 1998,
  houses: 430,
  renovations: 180,
};

export const whatsappUrl = site.whatsapp && `https://wa.me/${site.whatsapp}`;
