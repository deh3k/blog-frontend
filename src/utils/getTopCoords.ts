function getTopCoords(elem: Element) {
  let box = elem.getBoundingClientRect();

  return box.top + window.pageYOffset
}

export { getTopCoords }