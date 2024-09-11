import qs from 'query-string'
import axios from "axios";


interface Query {
    id?: string;
    categoryId?: string;
    startDate: string;
    endDate: string;
}

const URL = `${process.env.MAIN_URL}/api/room`

export async function fetchRooms(query: Query) {
    const url = qs.stringifyUrl({
        url: URL,
        query: {
            id: query.id,
            categoryId: query.categoryId,
            startDate: query.startDate,
            endDate: query.endDate
        }
    })
    const availableRooms = await axios.get(url)
    return availableRooms.data;
}

export async function getAnonymous(){
    const id = (await axios.get(`${process.env.MAIN_URL}/api/auth/getanonymoususer`)).data
    return id?.user?.id
}