import { btnPostBack01, btnPostBack02 } from './plantillaBotones';
export function getMedia(payload: PayloadMedia, mediaType: string): object {
  const media: AttachmentType = {
    type: mediaType,
    payload: payload,
  };
  return { attachment: media };
}

function mediaPayload(_url: string) {
  const mediaPayload: PayloadMedia = {
    url: _url,
  };

  return mediaPayload;
}

//Enviar con ID de archivo adjunto

// Crea el payload de medios
const payload = mediaPayload(
  'https://scontent.cdninstagram.com/v/t51.29350-15/430191191_338397459196056_5279946599334204595_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMzQ5eDE2ODUuc2RyIn0&_nc_ht=scontent.cdninstagram.com&_nc_cat=1&_nc_ohc=uNa2-x19powAX8dtrXw&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzMxMzYzOTY1MTg4NDIzNDE2NA%3D%3D.2-ccb7-5&oh=00_AfA-x7UFyHhX8exTlR64Vg7HzRSvyDXSBRww6rOlpbKwyw&oe=65EF3CB3&_nc_sid=10d13b',
);

// Obtén el template del media
export const mediaTemplate = getMedia(payload, 'image');
