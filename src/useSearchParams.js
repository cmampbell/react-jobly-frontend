const useSearchParams = (request) => {
    const url = new URL(request.url);
    const searchParams = {}
    url.searchParams.forEach((value, key )=> value ? searchParams[key] = value : null)

    return Object.keys(searchParams).length > 0 ? searchParams : false
}

export { useSearchParams }