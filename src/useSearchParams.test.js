import {useSearchParams} from "./useSearchParams";

describe("tests for useSearchParams", () => {
    it("should return an object with key-value pairs of query string", () => {
        const request = {url: 'http://localhost:3000/companies?title=mana'}
        const result = useSearchParams(request)
        expect(result).toEqual({title: 'mana'})
    })
})