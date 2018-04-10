import React from 'react';

const containerStyle = {
	paddingTop: 10,
	paddingBottom:10,
	fontFamily: 'OpenSans'
}
const rowStyle = {
	marginTop: 15
}

class MounthField extends React.Component {
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

class TextField extends React.Component {
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

class MajorTextField extends React.Component {
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

export default class ExpChangeForm extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [{beginMouth: '', endMouth: '', companyName: '', postName: '', info: ''}],
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }
  handleChange(i,type,e){
    e.preventDefault();
    const newData = this.state.data.map((dataNode, j) => {
      if (j === i)
        switch (type){
          case "beginMouth":
            dataNode.beginMouth = e.target.value;
            break;
          case "endMouth":
            dataNode.endMouth = e.target.value;
            break;
          case "companyName":
            dataNode.companyName = e.target.value;
            break;
          case "postName":
            dataNode.postName = e.target.value;
            break;
          case "info":
            dataNode.info = e.target.value;
            break;
          }
      return dataNode;
    });
    this.setState({ data: newData });
  }
  handleAdd(e){
    e.preventDefault();
    this.setState({
      data: this.state.data.concat([{beginMouth: '', endMouth: '', companyName: '', postName: '', info: ''}])
    });
  }
  handleRemove(i,e){
    e.preventDefault();
    this.setState({
      data: this.state.data.filter((dataNode, j) => i !== j)
    });
  }
	render(){
		return  <div className="container edit-container">
              {this.state.data.map((dataNode, i) => (
                <div key={i}>
                  <button onClick={(e) => this.handleRemove(i,e)} style={{display: this.state.data.length === 1 ? 'none' : 'inline-block'}} type="button" className="close">&times;</button>
                  <MounthField onChange={(e) => this.handleChange(i,"beginMouth",e)} isNeedMargin={false} id="inputBeginMouth" visibleName="Начало работы">{dataNode.beginMouth}</MounthField>
                  <MounthField onChange={(e) => this.handleChange(i,"endMouth",e)} isNeedMargin={true} id="inputEndMouth" visibleName="Окончание работы">{dataNode.endMouth}</MounthField>
                  <TextField onChange={(e) => this.handleChange(i,"companyName",e)} isNeedMargin={true} id="inputCompany" visibleName="Организация">{dataNode.companyName}</TextField>
                  <TextField onChange={(e) => this.handleChange(i,"postName",e)} isNeedMargin={true} id="inputPost" visibleName="Должность">{dataNode.postName}</TextField>
                  <MajorTextField onChange={(e) => this.handleChange(i,"info",e)} isNeedMargin={true} id="inputInfo" visibleName="Обязанности, функции, достижения">{dataNode.info}</MajorTextField>
                </div>
                  ))}
                  <div className="row">
                    <div className="col-md-9 col-md-offset-3">
                      <a className="edit-profile" onClick={this.handleAdd} style={{fontSize: 14, cursor: "pointer"}}>Добавить место работы</a>
                    </div>
                  </div>
            <div className="col-md-offset-10 col-md-2">
              <button type="submit" className="btn btn-primary btn-lg button-new-vacancy">
                Обновить профиль
              </button>
            </div>
			 	   </div>
	}
}