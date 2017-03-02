var dragDrop = require('drag-drop')

module.exports = create

function create (react) {
  return react.createClass({
    el: function el () {
      var element = this.refs['drag-drop']
      return element instanceof window.Element ? element : element.getDOMNode()
    },
    update: function update () {
      this.cleanup()
      this.removeDragDrop = dragDrop(this.el(), this.props)
    },
    cleanup: function cleanup () {
      this.removeDragDrop && this.removeDragDrop()
      this.removeDragDrop = null
    },
    componentDidMount: function componentDidMount () { this.update() },
    componentDidUpdate: function componentDidUpdate () { this.update() },
    componentWillUnmount: function componentWillUnmount () { this.cleanup() },
    render: function render () {
      return react.createElement('div', {
        className: 'drag-drop',
        ref: 'drag-drop'
      }, this.props.children)
    }
  })
}
