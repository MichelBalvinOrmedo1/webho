export function createButtonPostBack(title : string, payload : string) : Button
{
    const buttonParams : Button ={
        type: "postback",
        title: title,
        payload: payload
    }
    return buttonParams; 
}
export function createButtonUrl(
    title: string,
    url: string,
    webview_height_ratio?: string,
    messenger_extensions?: boolean,
    fallback_url?: string,
    webview_share_button?: string
): Button {
    // Crear un objeto para almacenar los parámetros
    const buttonParams: Button = {
        type: "web_url",
        title,
        url,
        
    };

    // Verificar y agregar los parámetros opcionales si están definidos
    if (webview_height_ratio !== undefined) {
        buttonParams.webview_height_ratio = webview_height_ratio;
    }
    if (messenger_extensions !== undefined) {
        buttonParams.messenger_extensions = messenger_extensions;
    }
    if (fallback_url !== undefined) {
        buttonParams.fallback_url = fallback_url;
    }
    if (webview_share_button !== undefined) {
        buttonParams.webview_share_button = webview_share_button;
    }

    // Retornar el objeto con los parámetros definidos
    return buttonParams;
}

export function getButtonTemplate(payload : payloadButton) : object
{
    const buttonTemplate : AttachmentType= {
        type: "template",
        payload : payload
    }
    return buttonTemplate;
}
function PaylodButton(
    text : string,
    buttons : Button[],
) : payloadButton
{
    const payload : payloadButton = {
        template_type : "button",
        text: text,
        buttons : buttons
    }

    return payload;
}

export const btnPostBack01 = createButtonPostBack("boton 1", "btn1")
export const btnPostBack02 = createButtonPostBack("boton 1", "btn2")
const payloadBut = PaylodButton("Este es una prueba", [btnPostBack01, btnPostBack02])

export const getButtonTem =  getButtonTemplate(payloadBut);