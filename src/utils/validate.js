export const isNonEmpty = (v) => String(v || '').trim().length > 0

export const isPlate = (v) => /^[A-Za-z0-9-]+$/.test(String(v || '').trim())

export const isShortText = (v, max = 50) => String(v || '').trim().length <= max
