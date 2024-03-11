import {
  btnPostBack01,
  createButtonPostBack,
  createButtonUrl,
} from './plantillaBotones';
function getGeneryTemplate(payload: PayloadTypeGenery): object {
  const generyTemplate: AttachmentType = {
    type: 'template',
    payload: payload,
  };
  return { attachment: generyTemplate };
}

function PayloadTypeGenery(
  element: PaylGeneryElement[],
  sharable?: boolean,
): PayloadTypeGenery {
  const payload: PayloadTypeGenery = {
    template_type: 'generic',
    elements: element,
  };
  // Verificar y agregar los parámetros opcionales si están definidos
  if (sharable !== undefined) {
    payload.sharable = sharable;
  }
  return payload;
}

function ElementTypeGenery(
  title: string,
  subtitle?: string,
  image_url?: string,
  default_action?: PaylGeneryElem_defultAction,
  buttons?: Button[],
): PaylGeneryElement {
  const element: PaylGeneryElement = {
    title: title,
  };
  // Verificar y agregar los parámetros opcionales si están definidos
  if (subtitle !== undefined) {
    element.subtitle = subtitle;
  }
  if (image_url !== undefined) {
    element.image_url = image_url;
  }
  if (default_action !== undefined) {
    element.default_action = default_action;
  }
  if (buttons !== undefined) {
    element.buttons = buttons;
  }

  return element;
}
function Default_actionGenery(
  url: string,
  messenger_extensions?: boolean,
  webview_height_ratio?: string,
  fallback_url?: string,
): PaylGeneryElem_defultAction {
  const default_action: PaylGeneryElem_defultAction = {
    type: 'web_url',
    url: url,
  };
  // Verificar y agregar los parámetros opcionales si están definidos
  if (messenger_extensions !== undefined) {
    default_action.messenger_extensions = messenger_extensions;
  }
  if (webview_height_ratio !== undefined) {
    default_action.webview_height_ratio = webview_height_ratio;
  }
  if (fallback_url !== undefined) {
    default_action.fallback_url = fallback_url;
  }
  return default_action;
}

// Definir un botón de tipo postback
const postbackButton = createButtonPostBack('Ver detalles', 'btn1');

// Definir un botón de tipo URL
const urlButton = createButtonUrl(
  'Comprar ahora',
  'https://example.com/producto/123',
  'tall',
);

// Definir la acción predeterminada para el elemento genérico
const defaultAction = Default_actionGenery(
  'https://example.com/producto/123',
  true,
  'tall',
);

// Crear un elemento genérico con los botones y la acción predeterminada
const element = ElementTypeGenery(
  'Producto 1',
  'Descripción del producto 1',
  'https://example.com/producto/123.jpg',
  defaultAction,
  [postbackButton, urlButton],
);

// Crear un payload de tipo genérico con el elemento creado
const payload = PayloadTypeGenery([element, btnPostBack01], true);

// Obtener el template genérico utilizando el payload creado
export const genericTemplate = getGeneryTemplate(payload);

console.log(genericTemplate);
