/**
 * lib/logger.ts
 * Logger centralizado para debugging y monitoreo
 */

type LogLevel = 'error' | 'warn' | 'info' | 'debug';

interface LogEntry {
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
  error?: Error;
  timestamp: string;
}

class Logger {
  private isDev = typeof window !== 'undefined' ? process.env.NODE_ENV === 'development' : true;
  private logs: LogEntry[] = [];
  private maxLogs = 100;

  private formatTimestamp(): string {
    return new Date().toISOString();
  }

  private createEntry(
    level: LogLevel,
    message: string,
    context?: Record<string, unknown>,
    error?: Error
  ): LogEntry {
    return {
      level,
      message,
      context,
      error,
      timestamp: this.formatTimestamp(),
    };
  }

  private store(entry: LogEntry): void {
    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }
  }

  error(message: string, context?: Record<string, unknown>, error?: Error): void {
    const entry = this.createEntry('error', message, context, error);
    this.store(entry);

    if (this.isDev) {
      console.error(`❌ [${entry.timestamp}] ${message}`, context, error);
    }

    // En producción, enviar a servicio de monitoring (Sentry, etc.)
    if (!this.isDev && error) {
      this.captureException(error, context);
    }
  }

  warn(message: string, context?: Record<string, unknown>): void {
    const entry = this.createEntry('warn', message, context);
    this.store(entry);

    if (this.isDev) {
      console.warn(`⚠️  [${entry.timestamp}] ${message}`, context);
    }
  }

  info(message: string, context?: Record<string, unknown>): void {
    const entry = this.createEntry('info', message, context);
    this.store(entry);

    if (this.isDev) {
      console.log(`ℹ️  [${entry.timestamp}] ${message}`, context);
    }
  }

  debug(message: string, context?: Record<string, unknown>): void {
    const entry = this.createEntry('debug', message, context);
    this.store(entry);

    if (this.isDev) {
      console.debug(`🔍 [${entry.timestamp}] ${message}`, context);
    }
  }

  /**
   * Capture exception para servicios de monitoring (Sentry, etc.)
   * Implementar según tu stack
   */
  private captureException(error: Error, context?: Record<string, unknown>): void {
    // TODO: Integrar con Sentry o servicio equivalente
    // Sentry.captureException(error, { contexts: { custom: context } });
  }

  /**
   * Obtener logs almacenados (para debugging)
   */
  getLogs(level?: LogLevel): LogEntry[] {
    return level ? this.logs.filter((log) => log.level === level) : this.logs;
  }

  /**
   * Limpiar logs
   */
  clear(): void {
    this.logs = [];
  }

  /**
   * Exportar logs como JSON
   */
  export(): string {
    return JSON.stringify(this.logs, null, 2);
  }
}

// Singleton instance
export const logger = new Logger();

// Exports para usar directamente
export const log = {
  error: logger.error.bind(logger),
  warn: logger.warn.bind(logger),
  info: logger.info.bind(logger),
  debug: logger.debug.bind(logger),
  getLogs: logger.getLogs.bind(logger),
  clear: logger.clear.bind(logger),
  export: logger.export.bind(logger),
};
