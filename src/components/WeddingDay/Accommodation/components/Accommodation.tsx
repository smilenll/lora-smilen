import { useEffect, useState } from 'react';
import { IGuest } from '../../../../common/IGuest';
import { api } from '../../../../proxies/apiProxy';
import { Room } from './Room';
import { IRoom } from '../interfaces/IRoom';
import { Button, Dropdown } from 'react-bootstrap';
import { Occupant } from './Occupant';

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

  const filterOccupants = (occupant?: IGuest) => {
    if (!occupant) {
      setDependency();
    } else {
      const foundRoom: any = rooms.find(r => r.occupants.some((o: string) => o === occupant.id))
      setRooms([foundRoom])
    }
  }

  return (<div className="row">
    <h2 className='form-header'>Настаняване</h2>
    {/* <div className="d-grid offset-lg-3 col-lg-6 col-sm-12 mt-5">
      <Button onClick={() => {}} variant="outline-warning"> {showGuests ? "Скрий гостите" : "Покажи гостите"}</Button>
    </div> */}
    {/*     
    <h1 style={{ color: "green" }}>STATS</h1>
    <h3 style={{ color: "red" }}>Не настанени {noRoomGuests.length -3}</h3>
    <h3 style={{ color: "red" }}>Не настанени повече от ден {noRoom2Nights.length}</h3>
    <h3 style={{ color: "red" }}>Капацитет {getCapacity()}</h3>
    <h3 style={{ color: "red" }}>Свободни легла {getCapacity() - getOccupantsSum()}</h3> */}
    <Dropdown className='mb-4'>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic" className='btn btn-outline-warning'>
        Избери гост...
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item key={Math.random()} onClick={() => filterOccupants()}>Покажи всички</Dropdown.Item>
        {guests.map(g => (
          <Dropdown.Item key={g.id} onClick={() => filterOccupants(g)}>{g.name + " " + g.lastName}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
    <br />
    {rooms.map(r => r && (
      <Room key={r.room} room={r} guests={guests} noRoomGuests={noRoomGuests} submitOccupants={submitOccupants} />))
    }
  </div>)
}