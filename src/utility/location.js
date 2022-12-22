/**
 * 현재 location객체의 pathName을 반환합니다. "/"를 제거한 값입니다.
 * @returns {string}
 */
export function usePathName() {
  const { pathname } = location;
  if (pathname === "/") {
    return pathname;
  }
  return decodeURI(pathname).replace("/", "");
}

export function useHash() {
  const { hash } = location;
  return decodeURI(hash).replace("/", "");
}
