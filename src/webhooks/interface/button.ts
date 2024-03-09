interface Button {
    type: string;
    title: string;
    payload?: string; // Opcional si es un botón de tipo postback
    url?: string; // Opcional si es un botón de tipo URL
    webview_height_ratio?: string; // Opcional para botones de URL
    messenger_extensions?: boolean; // Opcional para botones de URL
    fallback_url?: string; // Opcional para botones de URL
    webview_share_button?: string; // Opcional para botones de URL
}

interface payloadButton {
    template_type : string;
    text :string;
    buttons: Button[]; 
}


