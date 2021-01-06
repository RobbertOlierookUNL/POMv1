import useSWR from 'swr'

function fetcher(url: string) {
  return window.fetch(url).then((res) => res.json())
}

export function useEntries(initialData: object) {
  const { data, error } = useSWR(`/api/data/get-entries`, fetcher, {initialData})

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
  const { data, error } = useSWR(`/api/view/get-users`, fetcher)

  return {
    views: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useEntry(id: string) {
  return useSWR(`/api/data/get-entry?id=${id}`, fetcher)
}

export function useView(view: string, initialData: object) {
  return useSWR(`/api/view/get-view?view=${view}`, fetcher, {initialData})
}

export function useUser(userId: number) {
  return useSWR(`/api/view/get-user?userId=${userId}`, fetcher)
}

export function useUserId(email: string) {
  return useSWR(`/api/view/get-user-id?email=${email}`, fetcher)
}
