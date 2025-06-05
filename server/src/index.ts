
import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';
import { z } from 'zod';

// Import schemas
import { 
  createUserInputSchema,
  updateUserTokensInputSchema,
  syncCalendarEventsInputSchema,
  getTimeSummaryInputSchema
} from './schema';

// Import handlers
import { createUser } from './handlers/create_user';
import { updateUserTokens } from './handlers/update_user_tokens';
import { syncCalendarEvents } from './handlers/sync_calendar_events';
import { getCalendarEvents } from './handlers/get_calendar_events';
import { getTimeSummary } from './handlers/get_time_summary';
import { getCalendarColors } from './handlers/get_calendar_colors';
import { refreshUserToken } from './handlers/refresh_user_token';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),

  // User management
  createUser: publicProcedure
    .input(createUserInputSchema)
    .mutation(({ input }) => createUser(input)),

  updateUserTokens: publicProcedure
    .input(updateUserTokensInputSchema)
    .mutation(({ input }) => updateUserTokens(input)),

  refreshUserToken: publicProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(({ input }) => refreshUserToken(input.userId)),

  // Calendar events
  syncCalendarEvents: publicProcedure
    .input(syncCalendarEventsInputSchema)
    .mutation(({ input }) => syncCalendarEvents(input)),

  getCalendarEvents: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ input }) => getCalendarEvents(input.userId)),

  // Time summaries
  getTimeSummary: publicProcedure
    .input(getTimeSummaryInputSchema)
    .query(({ input }) => getTimeSummary(input)),

  // Calendar colors
  getCalendarColors: publicProcedure
    .query(() => getCalendarColors()),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`TRPC server listening at port: ${port}`);
}

start();
