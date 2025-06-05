
import { type SyncCalendarEventsInput, type CalendarEvent } from '../schema';

export declare function syncCalendarEvents(input: SyncCalendarEventsInput): Promise<CalendarEvent[]>;
