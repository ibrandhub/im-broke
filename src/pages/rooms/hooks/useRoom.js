import { useMutation, useQuery } from '@tanstack/react-query';
import { roomList, userJoinRoom, createRoom } from 'api/rooms';
import { useEffect, useState } from 'react';

export function useRoom() {
  const [master, setMaster] = useState([]);
  const [room, setRoom] = useState([]);

  const { isLoading, data } = useQuery({
    queryKey: ['roomData'],
    queryFn: () => roomList({ page: 1, per_page: 5 })
  });

  useEffect(() => {
    if (!isLoading && data?.data?.length > 0) {
      setMaster(data);
      setRoom(data.data);
    }
  }, [isLoading, data]);

  const searchByPage = useMutation({
    mutationFn: (newSearch) => roomList(newSearch)
  });

  const searchRoom = useMutation({
    mutationFn: (newSearch) => filterRoom(newSearch)
  });

  const joinRoom = useMutation({
    mutationFn: (data) => userJoinRoom(data)
  });

  const createRooms = useMutation({
    mutationFn: (data) => createRoom(data)
  });

  const handleChangePage = async (page, per_page) => {
    const newSearch = {
      page: page,
      per_page: per_page
    };

    const result = await searchByPage.mutateAsync(newSearch);
    setMaster(result);
    setRoom(result.data);
  };

  const handleChangePerPage = async (per_page) => {
    const newSearch = {
      page: 1,
      per_page: per_page
    };

    const result = await searchByPage.mutateAsync(newSearch);
    setMaster(result);
    setRoom(result.data);
  };

  const handleSubmitSearch = async (search) => {
    if (search) {
      const result = await searchRoom.mutateAsync(search);
      setMaster(result);
      setRoom(result);
    } else {
      const newSearch = {
        page: 1,
        per_page: 5
      };
      const result = await searchByPage.mutateAsync(newSearch);
      setMaster(result);
      setRoom(result.data);
    }
  };

  const handleUserJoinRoom = async (roomId, userId) => {
    try {
      const result = await joinRoom.mutateAsync({ roomId, userId });

      return result;
    } catch (err) {
      console.log('err', err);
    }
  };

  const handleCreateRoom = async ({ name, rateDefault, owner_id }) => {
    try {
      const result = await createRooms.mutateAsync({ name, rateDefault: parseFloat(rateDefault), owner_id });

      return result;
    } catch (err) {
      console.log('err', err);
    }
  };

  return {
    master,
    room,
    handleChangePage,
    handleChangePerPage,
    handleSubmitSearch,
    handleUserJoinRoom,
    handleCreateRoom
  };
}
