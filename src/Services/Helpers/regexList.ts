export const urlInternalRegex = /^[a-zA-Z0-9,-]{4,}$/;
export const foreginKey = /^[a-z,-]*$/;
export const urlExternalRegex =
  process.env.NODE_ENV === 'production'
    ? /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi
    : /[-a-zA-Z0-9@:%._\+~#=]{1,256}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/gi;
