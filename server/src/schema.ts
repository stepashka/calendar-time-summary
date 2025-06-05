
import { z } from 'zod';

// Google Calendar Event schema
export const calendarEventSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  google_event_id: z.string(),
  summary: z.string(),
  description: z.string().nullable(),
  start_time: z.coerce.date(),
  end_time: z.coerce.date(),
  color_id: z.string().nullable(),
  is_public_holiday: z.boolean().default(false),
  calendar_id: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type CalendarEvent = z.infer<typeof calendarEventSchema>;

// User schema for Google Calendar integration
export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  google_access_token: z.string(),
  google_refresh_token: z.string().nullable(),
  token_expires_at: z.coerce.date().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type User = z.infer<typeof userSchema>;

// Calendar Color schema
export const calendarColorSchema = z.object({
  id: z.string(),
  color_id: z.string(),
  background_color: z.string(),
  foreground_color: z.string(),
  name: z.string().nullable(),
  created_at: z.coerce.date()
});

export type CalendarColor = z.infer<typeof calendarColorSchema>;

// Time Summary schema
export const timeSummarySchema = z.object({
  id: z.string(),
  user_id: z.string(),
  color_id: z.string(),
  color_name: z.string().nullable(),
  background_color: z.string(),
  week_start: z.coerce.date(),
  month_start: z.coerce.date(),
  total_duration_minutes: z.number().int(),
  percentage_of_week: z.number(),
  percentage_of_month: z.number(),
  event_count: z.number().int(),
  created_at: z.coerce.date()
});

export type TimeSummary = z.infer<typeof timeSummarySchema>;

// Input schemas
export const syncCalendarEventsInputSchema = z.object({
  user_id: z.string(),
  start_date: z.coerce.date(),
  end_date: z.coerce.date()
});

export type SyncCalendarEventsInput = z.infer<typeof syncCalendarEventsInputSchema>;

export const getTimeSummaryInputSchema = z.object({
  user_id: z.string(),
  start_date: z.coerce.date(),
  end_date: z.coerce.date(),
  group_by: z.enum(['week', 'month']).default('week')
});

export type GetTimeSummaryInput = z.infer<typeof getTimeSummaryInputSchema>;

export const createUserInputSchema = z.object({
  email: z.string().email(),
  google_access_token: z.string(),
  google_refresh_token: z.string().nullable(),
  token_expires_at: z.coerce.date().nullable()
});

export type CreateUserInput = z.infer<typeof createUserInputSchema>;

export const updateUserTokensInputSchema = z.object({
  user_id: z.string(),
  google_access_token: z.string(),
  google_refresh_token: z.string().nullable(),
  token_expires_at: z.coerce.date().nullable()
});

export type UpdateUserTokensInput = z.infer<typeof updateUserTokensInputSchema>;
