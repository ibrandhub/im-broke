import { useMutation } from '@tanstack/react-query';
import { transferLogList, readTransferLog, readTransferLogAll } from 'api/transfer-log';
import { useState } from 'react';

export function useNotofication() {
  const [master, setMaster] = useState([]);
  const [read, setRead] = useState(0);

  const logList = useMutation({
    mutationFn: (data) => transferLogList(data)
  });

  const readLog = useMutation({
    mutationFn: (data) => readTransferLog(data)
  });

  const readLogAll = useMutation({
    mutationFn: (data) => readTransferLogAll(data)
  });

  const searchByPage = useMutation({
    mutationFn: (newSearch) => roomList(newSearch)
  });

  const transferLogLists = async ({ userId, page, per_page }) => {
    const data = {
      userId,
      page,
      per_page
    };

    const result = await logList.mutateAsync(data);
    setMaster(result);
    setRead(result?.unread_count);
  };

  const handleReadTransferLog = async (logId) => {
    const result = await readLog.mutateAsync(logId);
    return result;
  };

  const handleReadTransferLogAll = async (userId) => {
    const result = await readLogAll.mutateAsync(userId);
    return result;
  };

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
  };

  const handleSetRead = (count) => {
    setRead(count);
  };

  return {
    read,
    master,
    handleChangePage,
    handleChangePerPage,
    handleSetRead,
    transferLogLists,
    handleReadTransferLog,
    handleReadTransferLogAll
  };
}
