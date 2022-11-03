/**
 * An action that causes HTMLElements to not dispatch `click` events when disabled is true.
 *
 * Note: You don't need to use this action on `<button>`s because they don't dispatch
 * `click` events when they have a disabled property i.e. `<button disabled="true">`.
 */
export default function disableClick(node: HTMLElement, disabled: boolean) {
  const handleClick = (e: MouseEvent) => {
    if (disabled) {
      e.stopImmediatePropagation();
      e.preventDefault();
    }
  };

  node.addEventListener('click', handleClick);

  return {
    update(newDisabled: boolean) {
      disabled = newDisabled;
    },
    destroy() {
      node.removeEventListener('click', handleClick);
    },
  };
}
