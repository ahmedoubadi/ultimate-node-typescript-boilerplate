import {TLogLevel} from 'zerg/dist/types'
import { getGitCommitHash } from './utils/getGitCommitHash'
const packageJSON = require('../package.json')
const toBool = (value: string = '0') => !!+value
export const config = {
    info: {
      gitCommitHash: getGitCommitHash(),
      version: packageJSON.version,
    },
    api: {
      isEnabled: toBool(process.env.API_IS_ENABLED || '0'),
      isCacheEnabled: toBool(process.env.API_IS_CACHE_ENABLED || '0'),
      cacheMaxSize: +(process.env.API_CACHE_MAX_SIZE || 1000),
      ws: {
        isEnabled: toBool(process.env.API_WS_IS_ENABLED || '0'),
        port: +(process.env.API_REST_PORT || 3201),
      },
      rest: {
        isEnabled: toBool(process.env.API_REST_IS_ENABLED || '0'),
        port: +(process.env.API_REST_PORT || 3200),
        apiKey: process.env.API_REST_ACCESS_KEY || '',
        adminApiKey: process.env.API_KEY_ADMIN || '',
        rateLimiter: {
          isEnabled: toBool(process.env.API_RATE_LIMITER_IS_ENABLED || '1'),
          windowMs: +(process.env.API_RATE_LIMITER_WINDOW_MS || 1000 * 60),
          max: +(process.env.API_RATE_LIMITER_MAX || 100),
        },
      },
      json_rpc: {
        isEnabled: toBool(process.env.API_RPC_IS_ENABLED || '1'),
        ethGetLogsLimit: +(process.env.RPC_GET_LOGS_LIMIT || 1024), // Blocks range limit for method "eth_getLogs"
      },
      grpc: {
        isEnabled: toBool(process.env.API_GRPC_IS_ENABLED || '0'),
        port: +(process.env.API_RPC_PORT || 3202),
      },
    },
    store: {
        mysql: {
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: +(process.env.DB_PORT || 3306),
            poolSize: +(process.env.DB_POOL_SIZE || 50),        
        }
    },
    logger: {
        levels: {
            console: (['error', 'info', 'warn', 'debug'] as TLogLevel[]),
            sentry: ['error', 'warn'] as TLogLevel[],
        },
    },
}