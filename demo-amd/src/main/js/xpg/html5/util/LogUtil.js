/**
 * Creert een logger waarmee gelogged kan worden op de niveaus  "error", "warn", "info", "debug" en "trace".
 * De logger logt a.d.v. de namespace en meegegeven loggerName.
 * 
 * @param namespace - De namespace om onder te loggen.
 * @param loggerName - De naam van de logger die aan de namespace wordt geprepend.
 * @returns - Het loggerobject om mee te loggen
 */
define(["xpg/html5/xpg-log4js"], function(log4javascript) {
	
	function LogUtil() {}
	
	var logLayout = new log4javascript.PatternLayout("%d - %p %c - %m%n");
	var consoleAppender = new log4javascript.BrowserConsoleAppender();
	consoleAppender.setLayout(logLayout);
	
	LogUtil.createLogger = function( loggerName) {
		var logger = log4javascript.getLogger(loggerName);
		logger.removeAllAppenders();
        logger.setLevel(log4javascript.Level.DEBUG);
		logger.addAppender(consoleAppender);
		return logger;
	}
	
	return LogUtil;
});