import bcryptjs from "bcryptjs"

export function hash (input) {
    return bcryptjs.hash(input,12)
}

export function compare (string,hash) {
    return bcryptjs.compare(string,hash)
}