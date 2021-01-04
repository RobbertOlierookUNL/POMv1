import useSWR from 'swr'

function fetcher(url: string) {
  return window.fetch(url).then((res) => res.json())
}

export function useEntries() {
  const { data, error } = useSWR(`/api/data/get-entries`, fetcher)

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

export function useEntry(id: string) {
  return useSWR(`/api/data/get-entry?id=${id}`, fetcher)
}

export function useView(view: string) {
  return useSWR(`/api/view/get-view?view=${view}`, fetcher)
}
