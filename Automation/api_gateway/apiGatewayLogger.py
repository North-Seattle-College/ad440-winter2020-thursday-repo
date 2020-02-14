import logging

### Logger
TRACE = 5
logging.TRACE = TRACE
logging.addLevelName(TRACE, 'TRACE')
logConfig= '%(asctime)s - %(levelname)s - %(message)s'
logDateConfig='%Y-%m-%d %I:%M:%S %p'
formatter = logging.Formatter(logConfig, logDateConfig)

class NewLogger(logging.Logger):
  def trace(self, msg, *args, **kwargs):
    if self.isEnabledFor(TRACE):
      self._log(TRACE, msg, args, **kwargs)

my_logger = NewLogger(__name__)
logging.Logger.manager.loggerDict[__name__] = my_logger
logger = logging.getLogger(__name__)
logger.setLevel(logging.TRACE)


""" All log to api_gateway_management.log """
default_handler = logging.FileHandler('api_gateway_management.log')
default_handler.setLevel(logging.TRACE)
default_handler.setFormatter(formatter)
logger.addHandler(default_handler)

""" Display warning and critical errors on console """
stream_handler = logging.StreamHandler()
stream_handler.setLevel(logging.WARNING)
stream_handler.setFormatter(formatter)
logger.addHandler(stream_handler)

def inputError(m):
  logger.exception(m + ' stage creation is terminated!')

def inputTrace(m, i):
  logger.trace('INPUT_' + m + ':: ' + i)

def stageInfo(api_id, stg_name):
  logger.info('Stage Creation at -' + api_id + 'for new stage ___' + stg_name )

def generatedDebug(m, output):
  if type(output) != str:
    for o in output:
      logger.debug('Generated_' + m + ':: ' + o)
  else:
    logger.debug('Generated_' + m + ':: ' + output)

def warn(m):
  logger.warning(m)

if __name__ == "__main__":
    main()