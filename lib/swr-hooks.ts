import useSWR from 'swr'

function fetcher(url: string) {
  return window.fetch(url).then((res) => res.json())
}


export function useEntries() {
  const { data, error } = useSWR(`/api/data/get-all-entries`, fetcher)

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useUserSpecificEntries(columns: Array<any>, conditions: Object ) {
  const colString = columns ? JSON.stringify(columns) : undefined;
  const conString = conditions ? JSON.stringify(conditions) : undefined;
  console.log(`/api/data/get-entries?columns=${colString}&conditions=${conString}`);

  const { data, error } = useSWR(`/api/data/get-entries?columns=${colString}&conditions=${conString}`, fetcher, {refreshInterval: 1000 })

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useViews() {
  const { data, error } = useSWR(`/api/view/get-views`, fetcher)

  return {
    views: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useUsers() {
  const { data, error } = useSWR(`/api/user/get-users`, fetcher)

  return {
    users: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useRolls() {
  const { data, error } = useSWR(`/api/roll/get-rolls`, fetcher)

  return {
    rolls: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useChains() {
  const { data, error } = useSWR(`/api/chain/get-chains`, fetcher)

  return {
    chains: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useCategories() {
  const { data, error } = useSWR(`/api/category/get-categories`, fetcher)

  return {
    categories: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useTable(tableName: string) {
  switch (tableName) {
    case "data":
      return useSWR(`/api/data/get-entries`, fetcher)
    case "views":
      return useSWR(`/api/view/get-views`, fetcher)
    case "users":
      return useSWR(`/api/user/get-users`, fetcher)
    case "rolls":
      return useSWR(`/api/roll/get-rolls`, fetcher)
    case "chains":
      return useSWR(`/api/chain/get-chains`, fetcher)
    case "categories":
      return useSWR(`/api/category/get-categories`, fetcher)
    default:
      return useSWR(`/api/data/get-entries`, fetcher)
  }
}

export function useEntry(id: string) {
  return useSWR(`/api/data/get-entry?id=${id}`, fetcher)
}

export function useDeal(customer: number, pk: string) {
  return useSWR(`/api/data/get-deals?customer=${customer}&pk=${pk}`, fetcher)
}
export function useReserveLogic(pk: string) {
  return useSWR(`/api/data/get-reserved-cols?pk=${pk}`, fetcher)
}

export function useView(view: string, initialData: object) {
  return useSWR(`/api/view/get-view?view=${view}`, fetcher, {initialData, /*refreshInterval: 1000*/ })
}

export function useRoll(roll: string) {
  return useSWR(`/api/roll/get-roll?roll=${roll}`, fetcher)
}

export function useUser(userId: number) {
  return useSWR(`/api/user/get-user?userId=${userId}`, fetcher)
}

export function useUserId(email: string) {
  return useSWR(`/api/user/get-user-id?email=${email}`, fetcher)
}
