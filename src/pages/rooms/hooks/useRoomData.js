import { useMutation, useQuery } from '@tanstack/react-query';
import { getRoom, transferCoin, leaveRoom, closeRoom, summaryRoom } from 'api/rooms';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function useRoomData() {
  const [master, setMaster] = useState([]);
  let { id } = useParams();

  const { isLoading, data } = useQuery({
    queryKey: ['roomData'],
    queryFn: () => getRoom(id)
  });

  useEffect(() => {
    if (!isLoading && data) {
      setMaster(data);
    } else {
      setMaster(data);
    }
  }, [isLoading, data]);

  const transfer = useMutation({
    mutationFn: (data) => transferCoin(data)
  });

  const fetch = useMutation({
    mutationFn: (id) => getRoom(id)
  });

  const handleLeaveRoom = useMutation({
    mutationFn: (data) => leaveRoom(data)
  });

  const handleCloseRoom = useMutation({
    mutationFn: (data) => closeRoom(data)
  });

  const handleSummaryRoom = useMutation({
    mutationFn: (data) => summaryRoom(data)
  });

  const fetchData = async () => {
    try {
      const result = await fetch.mutateAsync(id);
      setMaster(result);
    } catch (err) {
      console.log(err);
      setMaster(null);
      return err;
    }
  };

  const handleSubmitCoin = async (receiverId, senderId, amount, roomId) => {
    try {
      const data = {
        receiverId,
        senderId,
        amount,
        roomId
      };
      const result = await transfer.mutateAsync(data);
      if (result.status == 200) {
        return result;
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const handleSubmitLeaveRoom = async ({ roomId, userId }) => {
    try {
      const data = {
        roomId,
        userId
      };
      const result = await handleLeaveRoom.mutateAsync(data);
      if (result.status == 200) {
        return result;
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const handleSubmitCloseRoom = async ({ roomId, ownerId }) => {
    try {
      const data = {
        roomId,
        ownerId
      };
      const result = await handleCloseRoom.mutateAsync(data);
      if (result.status == 200) {
        return result;
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const handleSubmitSummaryRoom = async ({ roomId, userId }) => {
    try {
      const data = {
        roomId,
        userId
      };
      const result = await handleSummaryRoom.mutateAsync(data);
      if (result.status == 200) {
        return result;
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  return {
    master,
    fetchData,
    handleSubmitCoin,
    handleSubmitLeaveRoom,
    handleSubmitCloseRoom,
    handleSubmitSummaryRoom
  };
}
