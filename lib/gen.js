exports.generateGuid = () => {
    const bytes = new Uint8Array(16);

    bytes = crypto.getRandomValues(bytes);
    hex = Buffer.from(bytes).toString('hex');

    return hex;
};

exports.displayGuid = (guid) => {
    //XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
    return (guid.substring(0,7)+'-'+guid.substring(8,11)+'-'+guid.substring(12,15)+'-'+guid.substring(16,19)+'-'+guid.substring(20,31));
}