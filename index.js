var dragDrop = require('drag-drop')

module.exports = create

function create (react) {
  return react.createClass({
    el () {
      var element = this.refs['drag-drop']
      return element instanceof window.Element ? element : element.getDOMNode()
    },
    update () {
      this.cleanup()
      this.removeDragDrop = dragDrop(this.el(), {
        onDragOver: (e) => {
          e.files = dragDrop.toFiles(e)
          this.props.onDragOver(e)
        },
        onDragLeave: this.props.onDragLeave,
        onDrop: this.props.onDrop
      })
    },
    cleanup () {
      this.removeDragDrop && this.removeDragDrop()
      this.removeDragDrop = null
    },
    componentDidMount () { this.update() },
    componentDidUpdate () { this.update() },
    componentWillUnmount () { this.cleanup() },
    render () {
      return react.createElement('div', {
        className: 'drag-drop',
        ref: 'drag-drop'
      }, this.props.children)
    }
  })
}
