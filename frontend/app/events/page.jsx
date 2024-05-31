'use client'

import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import axios from "axios";
import Link from "next/link";

export default function EventsPage() {

  const [events, setEvents] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      setLoading(true)
      console.log("http://localhost:3000/api/events");
      const res = await axios.get("http://localhost:3000/api/events")
      

      setEvents(res.data)
      setLoading(false)
      console.log(res.data)

      
    } catch (err) {
      console.log('Error', err);
      setLoading(false);
      toast.error('Something goes wrong!!');
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  return (
    <div className="flex flex-col h-screen bg-slate-600">
      <div className="">
        <h1 className="text-center my-12 font-bold text-6xl text-white"> Events </h1>
        <div className="grid grid-cols-5 gap-4">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            events.map((event) => (
              <Link key={event.id} href={`/events/${event.id}`}>
                <div className="bg-slate-400 rounded-xl shadow flex flex-col items-center max-h-[350px] mx-3">
                  <img src={event.imageURL} alt={event.eventName} className="w-48 h-48 object-cover mt-2"/>
                  <div className="p-4">
                    <h2 className="font-bold">{event.eventName}</h2>
                    <p>{event.eventLocation}</p>
                    <p>{new Date(event.eventDate.seconds * 1000).toLocaleDateString()}</p>
                    <p>{event.eventTime}</p>
                    <p>Tickets available: {event.availableTickets}</p>
                    <p>Price:{event.eventPrice}SEK</p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}