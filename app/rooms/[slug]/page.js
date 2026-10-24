import { notFound } from "next/navigation";
import RoomTemplate from "@/components/RoomTemplate";
import { rooms, getRoom } from "@/data/rooms";

export function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const room = getRoom(slug);
  return {
    title: room ? `${room.title} · Aurelia Archive` : "Aurelia Archive",
  };
}

export default async function RoomPage({ params }) {
  const { slug } = await params;
  const room = getRoom(slug);
  if (!room) notFound();

  return <RoomTemplate key={room.slug} room={room} />;
}