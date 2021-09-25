function idToUuid (path: string):string{
    return `${path.substr(0, 8)}-${path.substr(8, 4)}-${path.substr(
        12,
        4,
    )}-${path.substr(16, 4)}-${path.substr(20)}`
}

export function parsePageID(id: string):string {
    const rawId = id.replace(/-/g, '').slice(-32)
    return idToUuid(rawId)
}
