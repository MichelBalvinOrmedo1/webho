interface MediaElement {
  media_type: string;
  attachment_id?: string;
  url?: string;
  buttons?: Button[]; //Una matriz de objetos de botón que se agregarán a la plantilla. Se admite un máximo de 3 botones.
}

interface PayloadMedia {
  url: string;
  sharable?: boolean; //Se configura como true para activar el botón "Compartir" nativo en Messenger para el mensaje de plantilla. Adopta false como valor predeterminado.
}
