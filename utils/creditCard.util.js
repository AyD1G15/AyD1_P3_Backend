module.exports.maskNumber = (maskNumber) => {

    var length = maskNumber.length;

    if(length === 16){
        return {
            error: false,
            maskedNumber: maskNumber.substring(0, 4) + "XXXXXXXX" + maskNumber.substring(length - 4, length)
        }
    } else {
        return {
            error: true,
            message: "Debe ingresar 12 numeros"
        }
    }
}