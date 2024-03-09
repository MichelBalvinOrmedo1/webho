interface payloadCoupon{
    template_type: string;
    title : string; //Título a mostrar en el mensaje. Límite de 80 caracteres.
    subtitle : string; //Subtítulo a mostrar en el mensaje. Límite de 80 caracteres.
    coupon_code : string; //Requerido a menos que coupon_urlesté configurado. El código de cupón para enviar a una persona. No puede haber espacios.
    coupon_url : string; //Requerido a menos que coupon_codeesté configurado. La URL del cupón que permite a una persona utilizar el cupón.
    coupon_url_button_title : string; //El texto del botón que permite a una persona hacer clic en la URL del cupón.
    coupon_pre_message : string; //El mensaje enviado antes del mensaje del cupón.
    image_url : string; //La URL de la imagen que se muestra en el mensaje del cupón.
    payload : string; //Información adicional que se incluirá en la notificación del webhook
}