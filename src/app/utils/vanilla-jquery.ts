export function $offset($element) {
  var rect = $element.getBoundingClientRect();

  return {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX,
  };
}

export function $height($element) {
  return parseFloat(getComputedStyle($element, null).height.replace('px', ''));
}

export function $width($element) {
  return parseFloat(getComputedStyle($element, null).width.replace('px', ''));
}

export function $attribute($element, attr) {
  return $element.getAttribute(attr);
}

export function $data($element, attr) {
  return $attribute($element, 'data-' + attr);
}
