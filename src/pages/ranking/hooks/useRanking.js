import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { rankingList } from 'api/ranking';
import { transferCoin } from 'api/rooms';

export function useRanking() {
  const [master, setMaster] = useState([]);

  const { isLoading, data } = useQuery({
    queryKey: ['ranking'],
    queryFn: () => rankingList()
  });

  useEffect(() => {
    if (!isLoading && data.ranking.length > 0) {
      setMaster(data.ranking);
    }
  }, [isLoading, data]);

  const transfer = useMutation({
    mutationFn: (data) => transferCoin(data)
  });

  const fetch = useMutation({
    mutationFn: () => rankingList()
  });

  const fetchData = async () => {
    try {
      const result = await fetch.mutateAsync();
      setMaster(result.ranking);
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

  return {
    master,
    fetchData,
    handleSubmitCoin
  };
}
