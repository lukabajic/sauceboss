const chars = { Š: 'S', š: 's', Đ: 'Dj', đ: 'dj', Ž: 'Z', ž: 'z', Č: 'C', č: 'c', Ć: 'C', ć: 'c' };
export const specialCharsRemove = (str) => str.replace(/[ŠšĐđŽžČčĆć]/g, (m) => chars[m]);
