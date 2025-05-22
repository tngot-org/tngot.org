export interface EventCard {
  title: string;
  description: string;
  image: string[];
}

export interface EventData {
  title: string;
  info: string;
  link: string;
  date: string;
  type: string;
  icon: string;
  color: string;
  card: EventCard;
}

export type EventsMap = {
  [eventId: string]: EventData;
};

export type EventsList = EventsMap[];
