const colors = require('colors');

const MESSAGES = {
  BOT_STARTED: 'Aguarde os </commands> serem carregados...',
  MYSQL_CONNECTED: 'Carregando </commmands>...',
  AWAITING_COMMANDS: 'Aguardando comandos...',
  ERROR_MESSAGE: 'Algo deu errado!',
  CACHE_MESSAGE: 'Operação de </commmands> concluída!',
  SUCCESS_MESSAGE: 'Operação bem-sucedida, carregados com sucesso!',
  CLIENT_MESSAGE: 'Cliente conectado!',
  NOTICE_MESSAGE: 'Não há nenhum aviso importante por enquanto!'
};

const TYPES = {
  SYSTEM: 'system',
  COMMANDS: 'commands',
  ERROR: 'error',
  CACHE: 'cache',
  SUCCESS: 'success',
  CLIENT: 'client',
  NOTICE: 'notice'
};

const log = (message, type) => {
  const types = Object.values(TYPES);

  if (!message) {
    message = ' ';
  }

  if (!type || !types.includes(type)) {
    type = types[0];
  }

  const colorFormat = {
    system: ['[ 💻 System ]'.bgBlue, 'blue'],
    commands: ['[ 💻 Commands ]'.bgCyan, 'cyan'],
    error: ['[ 💻 Error ]'.bgRed, 'red'],
    cache: ['[ 💻  Cache ]'.bgGreen, 'green'],
    success: ['[ 💻  Success ]'.bgGreen, 'green'],
    client: ['[ 💻 Client ]'.bgMagenta, 'magenta'],
    notice: ['[ 💻 Notice ]'.bgYellow + '⠀➜ '.italic.red, 'yellow']
  };

  if (!colorFormat[type]) {
    type = types[0];
  }

  const [typeString, color] = colorFormat[type];

  console.log(`${typeString} ${colors[color](message)}`);
};

log(MESSAGES.BOT_STARTED, TYPES.SYSTEM);
log(MESSAGES.CACHE_MESSAGE, TYPES.CACHE);
log(MESSAGES.CLIENT_MESSAGE, TYPES.CLIENT);

module.exports = log;