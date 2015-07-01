 "use strict";

import React from "react";

import "pdfjs-dist/build/pdf";
import "pdfjs-dist/web/pdf_viewer";

import PDFJSWorker from "pdfjs-dist/build/pdf.worker.js";


export default React.createClass({
  getInitialState() {
    return {};
  },

  componentDidMount() {
    let self = this;

    /*eslint-disable */
    PDFJS.workerSrc = PDFJSWorker;
    PDFJS.getDocument(this.props.file).then(function(pdf) {
    /*eslint-enable */
      pdf.getPage(self.props.page).then(function(page) {
        self.setState({pdfPage: page, pdf: pdf});
        self.props.setCountPages(pdf.numPages);
      });
    });
  },

  componentWillReceiveProps(newProps) {
    let self = this;

    if (newProps.page) {
      self.state.pdf.getPage(newProps.page).then(function(page) {
        self.setState({pdfPage: page, pageId: newProps.page});
      });
    }

    this.setState({
      pdfPage: null
    });
  },

  getDefaultProps() {
    return {page: 1};
  },

  render() {
    let self = this;
    if (this.state.pdfPage) {
        setTimeout(function() {
        let canvas = self.getDOMNode(),
            context = canvas.getContext("2d"),
            scale = self.props.scale || 1,
            viewport = self.state.pdfPage.getViewport(scale);
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        let renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        self.state.pdfPage.render(renderContext);
      });
    }
    return this.state.pdfPage ? <canvas></canvas> : <div>Loading pdf..</div>;
  }
});
