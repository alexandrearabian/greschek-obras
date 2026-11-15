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
  // Video de la portada (del terreno a la casa terminada) que avanza con el scroll. Vacío = portada con foto fija.
  // Ej: "/hero/obra.mp4"; al lado va "/hero/obra.jpg" con su primer cuadro. Cómo prepararlo: PENDIENTES.md.
  heroVideo: "",
};

// Foto de la portada: Casa Muelle recortada a 16:9, igual que el video, para que el último cuadro y la foto calcen.
export const heroPhoto = {
  src: "/hero/final.webp",
  w: 2400,
  h: 1350,
  blur: "data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAACwAQCdASoQAAkABUB8JZACdAD5HSXIAP4iSL/DuBgQz5pTCatyChuLpDfQXZaBDwLlgixz8Ktv4h/CAAA=",
};

export const whatsappUrl = site.whatsapp && `https://wa.me/${site.whatsapp}`;
