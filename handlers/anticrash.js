const colors = require('colors');

module.exports = client => {
    process.on('unhandledRejection', (reason, p) => {
         console.log(' [antiCrash] :: Unhandled Rejection/Catch'.red);
         console.log(reason, p);
     });
     process.on("uncaughtException", (err, origin) => {
         console.log(' [antiCrash] :: Uncaught Exception/Catch'.yellow);
         console.log(err, origin);
     }) 
     process.on('uncaughtExceptionMonitor', (err, origin) => {
         console.log(' [antiCrash] :: Uncaught Exception/Catch (MONITOR)'.rainbow);
         console.log(err, origin);
     });
     process.on('multipleResolves', (type, promise, reason) => {
         console.log(' [antiCrash] :: Multiple Resolves'.blue);
         console.log(type, promise, reason);
     });
 }