 function payloadCoupon(
    _title : string,
    _subtitle : string,
    _coupon_code :string,
    _coupon_url : string,
    _coupon_url_button_title : string,
    _coupon_pre_message : string,
    _image_url : string,
    _payload : string

)
{
    const payloadCoupon : payloadCoupon ={
        template_type :"coupon",
        title : _title,
        subtitle : _subtitle,
        coupon_code : _coupon_code,
        coupon_url : _coupon_url,
        coupon_url_button_title : _coupon_url_button_title,
        coupon_pre_message : _coupon_pre_message,
        image_url : _image_url,
        payload : _payload
    }   
 return payloadCoupon;
}

function getCouponTemplate(_payload : payloadCoupon) : object
{
    const couponTemplate : AttachmentType= {
        type: "template",
        payload : _payload
    }
    return couponTemplate;
}

// Crear un cupón utilizando la función payloadCoupon
const cupon = payloadCoupon(
    "Descuento especial",
    "¡Aprovecha esta oferta única!",
    "DESCUENTO20",
    "https://ejemplo.com/cupon",
    "Obtener cupón",
    "¡Aquí tienes un descuento especial para ti!",
    "https://ejemplo.com/imagen.jpg",
    "Información adicional del cupón"
);

// Obtener el template del cupón utilizando la función getCouponTemplate
export const getCoupon = getCouponTemplate(cupon);
