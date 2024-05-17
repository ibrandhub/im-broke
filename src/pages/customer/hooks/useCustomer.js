import { useMutation, useQuery } from '@tanstack/react-query';
import { customerList, filterCustomer } from 'api/customer';
import { useEffect, useState } from 'react';

export function useCustomer() {
  const [master, setMaster] = useState([]);
  const [customer, setCustomer] = useState([]);

  const { isLoading, data } = useQuery({
    queryKey: ['customerData'],
    queryFn: () => customerList({ page: 1, per_page: 5 })
  });

  useEffect(() => {
    if (!isLoading && data.data.length > 0) {
      setMaster(data);
      setCustomer(data.data);
    }
  }, [isLoading, data]);

  const searchByPage = useMutation({
    mutationFn: (newSearch) => customerList(newSearch)
  });

  const searchCustomer = useMutation({
    mutationFn: (newSearch) => filterCustomer(newSearch)
  });

  const handleChangePage = async (page, per_page) => {
    const newSearch = {
      page: page,
      per_page: per_page
    };

    const result = await searchByPage.mutateAsync(newSearch);
    setMaster(result);
    setCustomer(result.data);
  };

  const handleChangePerPage = async (per_page) => {
    const newSearch = {
      page: 1,
      per_page: per_page
    };

    const result = await searchByPage.mutateAsync(newSearch);
    setMaster(result);
    setCustomer(result.data);
  };

  const handleSubmitSearch = async (search) => {
    if (search) {
      const result = await searchCustomer.mutateAsync(search);
      setMaster(result);
      setCustomer(result);
    } else {
      const newSearch = {
        page: 1,
        per_page: 5
      };
      const result = await searchByPage.mutateAsync(newSearch);
      setMaster(result);
      setCustomer(result.data);
    }
  };

  return {
    master,
    customer,
    handleChangePage,
    handleChangePerPage,
    handleSubmitSearch
  };
}
