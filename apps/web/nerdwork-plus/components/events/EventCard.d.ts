type EventCardProps = {
    title: string;
    description: string;
    image: string;
};
declare const EventCard: ({ title, description, image }: EventCardProps) => import("react").JSX.Element;
export default EventCard;
