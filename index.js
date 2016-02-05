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
      this.removeDragDrop = dragDrop(this.el(), this.props.onDrag)
    },
    cleanup () {
      this.removeDragDrop && this.removeDragDrop()
      this.removeDragDrop = null
    },
    componentDidMount () { this.update() },
    componentDidUpdate () { this.update() },
    componentWillUnmount () { this.cleanup() },
    render () {
      console.log('calling render')
      return react.createElement('div', {
        className: 'drag-drop',
        ref: 'drag-drop'
      }, this.props.children)
    }
  })
}
