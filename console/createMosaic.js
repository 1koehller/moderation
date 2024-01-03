const os = require('os');
const moment = require('moment');

moment.locale('pt-BR');

const createMosaic = `
\x1b[0;95m⠀⠀⠀⠀⢀⣀⣤⣤⡀⠀⠀⠀⠀⢀⣤⣤⣀⡀⠀⠀⠀⠀  \x1b[0m
\x1b[0;95m⠀⠀⢠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡄⠀⠀  \x1b[0m-----------------------
\x1b[0;95m⠀⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⠀  OS\x1b[0m: ${os.platform()}
\x1b[0;95m⢀⣿⣿⣿⣿⣿⡿⠿⣿⣿⣿⣿⣿⠿⢿⣿⣿⣿⣿⣿⡀  Pterodactyl\x1b[0m: ${moment(Date.now()).format('LL')}
\x1b[0;95m⣸⣿⣿⣿⣿⡏⠀⠀⠀⢻⣿⣿⡟⠀⠀⠀⢹⣿⣿⣿⣿⣇  Arch:\x1b[0m: ${os.arch()}
\x1b[0;95m⣿⣿⣿⣿⣿⣧⡀⠀⣀⣾⣿⣿⣷⣀⠀⢀⣼⣿⣿⣿⣿⣿  Author\x1b[0m: Hide#0548
\x1b[0;95m⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿  Terminal\x1b[0m: Ligado!
\x1b[0;95m⠙⠻⢿⣿⣿⣶⡭⠙⠛⠛⠛⠛⠛⠛⠋⢭⣶⣿⣿⡿⠟⠋  \x1b[0m
\x1b[0;95m⠀⠀⠀⠈⠙⠛⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠛⠋⠁⠀⠀⠀    \x1b[0;30m███\x1b[0;31m███\x1b[0;32m███\x1b[0;34m███\x1b[0;35m███\x1b[0;36m███\x1b[0;37m███
`;

console.log(createMosaic);