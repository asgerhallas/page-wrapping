const node = (params) => ({
  parent: null,
  left: params.left,
  top: params.top,
  width: params.width,
  height: params.height,
  break: params.break || false,
  fixed: params.fixed || false,
  children: params.children || [],
  nodeWillWrap: params.nodeWillWrap || null,
  minPresenceAhead: params.minPresenceAhead || null,
  wrap: params.wrap === undefined ? true : params.wrap,
  clone() {
    return node({
      left: this.left,
      top: this.top,
      width: this.width,
      height: this.height,
      break: this.break,
      fixed: this.fixed,
      wrap: this.wrap,
      nodeWillWrap: this.nodeWillWrap,
      minPresenceAhead: this.minPresenceAhead
    });
  },
  onNodeSplit(height, clone) {
    clone.top = 0;
    clone.height -= height;
    this.height = height;
  },
  appendChild(child) {
    child.parent = this;
    this.children.push(child);
  },
  removeChild(child) {
    const index = this.children.indexOf(child);

    if (index !== -1) {
      child.parent = null;
      this.children.splice(index, 1);
    }
  },
  remove() {
    this.parent.removeChild(this);
  },
  isEmpty() {
    return false;
  }
});

export default node;
