import { useEffect, useState } from 'react';
import { IGuest } from '../../../../common/IGuest';
import { api } from '../../../../proxies/apiProxy';
import { Room } from './Room';
import { IRoom } from '../interfaces/IRoom';
import { Button, Dropdown, Form } from 'react-bootstrap';
import { Occupant } from './Occupant';
import { getMenuString } from '../../../../common/heleprs';
import { Hotel } from '../../../../common/Hotel.enum';

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
  const [filteredRooms, setFilteredRooms] = useState<Array<IRoom>>([]);

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

  const submitOccupants = async (room: IRoom) => {
    await setDependency()
    api.updateRoom(room)
  }
  useEffect(() => {
    setDependency()

  }, [])
  const noRoom2Nights = noRoomGuests.filter((nG: any) => nG.nights > 1)

  const filterOccupants = async (query?: string) => {
    if (query) {
      if (query === Hotel.ANASTASIA) {
        const anastasiaRooms = rooms.filter(r => r.hotel === Hotel.ANASTASIA)
        return setFilteredRooms(anastasiaRooms)
      }
      if (query === Hotel.UTOPIA) {
        const utopiaRooms = rooms.filter(r => r.hotel === Hotel.UTOPIA)
        return setFilteredRooms(utopiaRooms)
      }
      const foundRoom: any = rooms.find(r => r.occupants.some((o: string) => o === query))
      if (foundRoom) {
        return setFilteredRooms([foundRoom])
      }
      if ("all") {
        return setFilteredRooms(rooms)
      }
    } else {
      return setFilteredRooms([])
    }

  }

  return (
    <div className="row mb-4">
      <h2 className='form-header'>Настаняване !</h2>
      {/* <div className="d-grid offset-lg-3 col-lg-6 col-sm-12 mt-5">
      <Button onClick={() => {}} variant="outline-warning"> {showGuests ? "Скрий гостите" : "Покажи гостите"}</Button>
    </div> */}
      {/*     
    <h1 style={{ color: "green" }}>STATS</h1>
    <h3 style={{ color: "red" }}>Не настанени {noRoomGuests.length -3}</h3>
    <h3 style={{ color: "red" }}>Не настанени повече от ден {noRoom2Nights.length}</h3>
    <h3 style={{ color: "red" }}>Капацитет {getCapacity()}</h3>
    <h3 style={{ color: "red" }}>Свободни легла {getCapacity() - getOccupantsSum()}</h3> */}
      <Form.Group className='offset-lg-3 col-lg-6 col-sm-12'>
        <Form.Label className='info' >Избери гост или разгледай кой къде ще спи :D  </Form.Label>
        <Form.Select
          onChange={(e) => filterOccupants(e.target.value as any)}
          required
        >
          <option value="">Избери...</option>
          <option value="all">Всички гости</option>
          <option value={Hotel.UTOPIA}>Хотел {Hotel.UTOPIA} Forest</option>
          <option value={Hotel.ANASTASIA}>Хотел Св. {Hotel.ANASTASIA}</option>
          {guests.map(g => (
            <option value={g.id} key={g.id}>{g.name + " " + g.lastName}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <div className='row mt-5'>
      {filteredRooms.map(r => r && (
        <Room key={r.room} room={r} guests={guests} noRoomGuests={noRoomGuests} submitOccupants={submitOccupants} />))
      }
      </div>
     
    </div>)
}