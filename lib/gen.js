exports.generateGuid = () =>{
    // XXXXXXXX-XXXX-XXXX-XXXXXXXXXXXX
    const bytes = new Uint8Array(16);

    bytes = crypto.getRandomValues(bytes);
    hex = Buffer.from(bytes).toString('hex');

    return hex;
};