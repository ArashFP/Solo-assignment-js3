'use client'

import { Button } from "@/components/ui/button";
import { auth } from "@/firebase/config";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";



export default function EventDetailsPage() {

  const { id } = useParams()
  const [booked, setBooked] = useState(false)
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState(null);
  const userId = auth.currentUser ? auth.currentUser.uid : null;


  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`${"http://localhost:3000/api/events"}/${id}`);
        setEvent(res.data);
        console.log(res.data)
        setBooked(res.data.users && res.data.users.includes(userId));
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

  const BookEvent = async () => {
    const url = `${"http://localhost:3000/api/events"}/${id}`;
    const data = { user: userId, cancel: booked };
  
    try {
      const response = await axios.patch(url, data);
      console.log('Response:', response);
  
      if (response.status === 200) {
        setBooked(!booked);
        const res = await axios.get(`${"http://localhost:3000/api/events"}/${id}`);
        setEvent(res.data);
        setBooked(res.data.users && res.data.users.includes(userId));
      } else {
        console.error('Unexpected status code:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  if (loading) {
    return <p>Loading...</p>;
  }

  if (!event) {
    return <p>Event not found</p>;
  }

  return (
    <div className="flex justify-center mt-20">
      <div className="bg-slate-400 rounded-xl shadow flex flex-col items-center p-4 w-1/3">
        <h1 className="font-bold">{event.eventName}</h1>
        <img src={event.imageURL} alt={event.eventName} className="w-48 h-48 object-cover mt-2 rounded-xl"/>
        <div className="p-4 text-center">
          <p>Description:{event.eventDescription}</p>
          <p>Location:{event.eventLocation}</p>
          <p>Date:{new Date(event.eventDate.seconds * 1000).toLocaleDateString()}</p>
          <p>Time:{event.eventTime}</p>
          <p>Tickets available: {event.availableTickets}</p>
          <p>Price:{event.eventPrice}SEK</p>
          <Button className="mt-5" onClick={BookEvent}>
            {booked ? 'Unbook' : 'Book Now'}
          </Button>
          {event.availableTickets === 0 && 
            <Button disabled>
              No Tickets Left
            </Button>
          }
        </div>
      </div>
    </div>
  );
};