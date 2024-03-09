

/**
 * 
 */
/* 
    La plantilla genérica admite un máximo de 10 elementos por mensaje. Asimismo, al menos una de las propiedades debe establecerse en title.
*/
interface PaylGeneryElement{
    title : string;  //El título que se mostrará en la plantilla. Límite de 80 caracteres.
    image_url ?: string; //Opcional. El subtítulo que se mostrará en la plantilla. Límite de 80 caracteres.
    subtitle ?: string; //Opcional. La URL de la imagen que se muestra en la plantilla.
    default_action ?: PaylGeneryElem_defultAction;  //Opcional. La acción predeterminada que se ejecuta cuando se toca la plantilla. Acepta las mismas propiedades que el botón URL, excepto title.
    buttons ?: Button[]; //Opcional. Una matriz de botones que se puede agregar a la plantilla. Se admite un máximo de 3 botones por elemento.
}
interface PaylGeneryElem_defultAction {
    type : string;
    url : string;
    messenger_extensions ?: boolean;
    webview_height_ratio ?: string;
    fallback_url ?: string;
}


interface PayloadTypeGenery {
    template_type : string;
    elements : PaylGeneryElement[];
    sharable ?: boolean; //Se configura como true para activar el botón "Compartir" nativo en Messenger para el mensaje de plantilla. Adopta false como valor predeterminado.
}

interface AttachmentType {
    type : string;
    payload : object;
}



