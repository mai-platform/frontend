import React from 'react';

export class MounthField extends React.Component {
	render() {
		return 	<div className={`row  ${this.props.isNeedMargin ? "edit-container__row" : ""}`}>
            		<div className="col-md-3">
                		<label htmlFor={this.props.id} className="control-label">{this.props.visibleName}</label>
            		</div>
            		<div className="col-md-3">
              			<div className="form-group">
                  			<div className="col-sm-12">
                      			<input type="month" onChange={this.props.onChange} value={this.props.children ? this.props.children : "2018-05"} className="form-control " id={this.props.id} placeholder=""/>
                  			</div>
              			</div>
          			</div>
      			</div>
	}
}

export class TextField extends React.Component {
	render(){
		return <div className={`row  ${this.props.isNeedMargin ? "edit-container__row" : ""}`}>
          			<div className="col-md-3">
              			<label htmlFor={this.props.id} className="control-label">{this.props.visibleName}</label>
          			</div>
          			<div className="col-md-9">
              			<div className="form-group">
                  			<div className="col-sm-12">
                    			<input type="text" onChange={this.props.onChange} value={this.props.children} className="form-control " id={this.props.id} placeholder=""/>
                  			</div>
              			</div>
          			</div>
          </div>
	}
}

export class MajorTextField extends React.Component {
	render(){
		return 	<div className={`row  ${this.props.isNeedMargin ? "edit-container__row" : ""}`}>
          			<div className="col-md-3">
              			<label htmlFor={this.props.id} className="control-label">{this.props.visibleName}</label>
          			</div>
          			<div className="col-md-9">
              			<textarea onChange={this.props.onChange} value={this.props.children} className="form-control vacancy-submit__info" id={this.props.id}></textarea>
          			</div>
      			</div>
	}
}