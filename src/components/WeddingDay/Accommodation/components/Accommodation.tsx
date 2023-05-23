import { useEffect, useState } from 'react';
import { IGuest } from '../../../../common/IGuest';
import { api } from '../../../../proxies/apiProxy';
import { Room } from './Room';
import { IRoom } from '../interfaces/IRoom';

const filterFreeGuests = (rooms: Array<IRoom>, guests: Array<IGuest>): Array<IGuest> => {
  const fleered = guests.filter(g => {
    const hasRoom = rooms.some(r => r.occupants.some((o: string) => o === g.id))
    return !hasRoom
  })
  return fleered
}
export const Accommodation = () => {
  const [guests, setGuests] = useState<Array<IGuest>>([]);
  const [noRoomGuests, setNoRoomGuests] = useState<Array<IGuest>>([]);
  const [rooms, setRooms] = useState<Array<IRoom>>([]);

  const setDependency = async () => {
    const guests = await api.getGuests()
    setGuests(guests)

    const rooms = await api.getRooms()
    rooms.forEach((r) => r.occupants = JSON.parse(r.occupants));

    setRooms(rooms)

    setNoRoomGuests(filterFreeGuests(rooms, guests))
    console.log()
  }

  const getCapacity = (): number => {
    let generalCapacity = 0;
    rooms.forEach(r => (generalCapacity = generalCapacity + r.capacity));

    return generalCapacity;
  }

  const getOccupantsSum = (): number => {
    let occupants = 0;
    rooms.forEach(r => (occupants = occupants + r.occupants.length));

    return occupants;
  }

  const submitOccupants = (room: IRoom) => {
    setDependency()
    api.updateRoom(room)
  }
  useEffect(() => {
    setDependency()

  }, [])
  const noRoom2Nights = noRoomGuests.filter((nG: any) => nG.nights > 1)
  return (<div className="row">
    <h1 style={{ color: "green" }}>STATS</h1>
    <h3 style={{ color: "red" }}>Не настанени {noRoomGuests.length -3}</h3>
    <h3 style={{ color: "red" }}>Не настанени повече от ден {noRoom2Nights.length}</h3>
    <h3 style={{ color: "red" }}>Капацитет {getCapacity()}</h3>
    <h3 style={{ color: "red" }}>Свободни легла {getCapacity() - getOccupantsSum()}</h3>
    {rooms.map(r => (
      <Room key={r.room} room={r} guests={guests} noRoomGuests={noRoomGuests} submitOccupants={submitOccupants} />))
    }
  </div>)
}