var hyperx = require('hyperx')
var dragDrop = require('drag-drop')

module.exports = create

function create (react, action) {
  var hx = hyperx(react.createElement)
  return react.createClass({
    el () {
      var element = this.refs['drag-drop']
      return element instanceof window.Element ? element : element.getDOMNode()
    },
    update () {
      this.cleanup()
      this.removeDragDrop = dragDrop(this.el(), action)
    },
    cleanup () {
      this.removeDragDrop && this.removeDragDrop()
      this.removeDragDrop = null
    },
    componentDidMount () { this.update() },
    componentDidUpdate () { this.update() },
    componentWillUnmount () { this.cleanup() },
    render () { return hx`<div className="drag-drop" ref="drag-drop"></div>` }
  })
}
