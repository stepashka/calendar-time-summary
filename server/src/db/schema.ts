
import { pgTable, text, timestamp, boolean, integer, real, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const usersTable = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  google_access_token: text('google_access_token').notNull(),
  google_refresh_token: text('google_refresh_token'),
  token_expires_at: timestamp('token_expires_at'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

export const calendarEventsTable = pgTable('calendar_events', {
  id: uuid('id').defaultRandom().primaryKey(),
  user_id: uuid('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
  google_event_id: text('google_event_id').notNull(),
  summary: text('summary').notNull(),
  description: text('description'),
  start_time: timestamp('start_time').notNull(),
  end_time: timestamp('end_time').notNull(),
  color_id: text('color_id'),
  is_public_holiday: boolean('is_public_holiday').default(false).notNull(),
  calendar_id: text('calendar_id').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

export const calendarColorsTable = pgTable('calendar_colors', {
  id: uuid('id').defaultRandom().primaryKey(),
  color_id: text('color_id').notNull().unique(),
  background_color: text('background_color').notNull(),
  foreground_color: text('foreground_color').notNull(),
  name: text('name'),
  created_at: timestamp('created_at').defaultNow().notNull()
});

export const timeSummariesTable = pgTable('time_summaries', {
  id: uuid('id').defaultRandom().primaryKey(),
  user_id: uuid('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
  color_id: text('color_id').notNull(),
  color_name: text('color_name'),
  background_color: text('background_color').notNull(),
  week_start: timestamp('week_start').notNull(),
  month_start: timestamp('month_start').notNull(),
  total_duration_minutes: integer('total_duration_minutes').notNull(),
  percentage_of_week: real('percentage_of_week').notNull(),
  percentage_of_month: real('percentage_of_month').notNull(),
  event_count: integer('event_count').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull()
});

// Relations
export const usersRelations = relations(usersTable, ({ many }) => ({
  calendarEvents: many(calendarEventsTable),
  timeSummaries: many(timeSummariesTable)
}));

export const calendarEventsRelations = relations(calendarEventsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [calendarEventsTable.user_id],
    references: [usersTable.id]
  })
}));

export const timeSummariesRelations = relations(timeSummariesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [timeSummariesTable.user_id],
    references: [usersTable.id]
  })
}));

// Export all tables for proper query building
export const tables = {
  users: usersTable,
  calendarEvents: calendarEventsTable,
  calendarColors: calendarColorsTable,
  timeSummaries: timeSummariesTable
};
