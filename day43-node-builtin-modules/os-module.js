const os = require("os");
// ** Highly important for SDE roles

// Operating System - It can handle our Both Software and Hardware informations

// Software Informations
console.log("System platform", os.platform());
console.log("OS type", os.type());
console.log("OS architecture", os.arch());
console.log("OS Release Version", os.release());
console.log("OS Version", os.version());

// Hardware Informations
console.log("Total RAM", (os.totalmem() / (1024 ** 3)).toFixed(2));
console.log("Current RAM", (os.freemem() / (1024 ** 3)).toFixed(2));

// Network Informations
console.log("Network Info", os.networkInterfaces());
