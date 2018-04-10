import React from 'react';

const containerStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: 'OpenSans'
};
const rowStyle = {
    marginTop: 15
};

class MounthField extends React.Component {
    render() {
        return React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
                'div',
                { className: 'col-md-3' },
                React.createElement(
                    'label',
                    { htmlFor: 'inputPassword', className: 'control-label' },
                    this.props.visibleName
                )
            ),
            React.createElement(
                'div',
                { className: 'col-md-3' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'div',
                        { className: 'col-sm-12' },
                        React.createElement('input', { type: 'month', className: 'form-control ', id: 'inputPassword', placeholder: '', defaultValue: '2018-04' })
                    )
                )
            )
        );
    }
}

class TextField extends React.Component {
    render() {
        return React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
                'div',
                { className: 'col-md-3' },
                React.createElement(
                    'label',
                    { htmlFor: 'inputPassword', className: 'control-label' },
                    this.props.visibleName
                )
            ),
            React.createElement(
                'div',
                { className: 'col-md-9' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'div',
                        { className: 'col-sm-12' },
                        React.createElement('input', { type: 'text', className: 'form-control ', id: 'inputPassword', placeholder: '' })
                    )
                )
            )
        );
    }
}

class MajorTextField extends React.Component {
    render() {
        return React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
                'div',
                { className: 'col-md-3' },
                React.createElement(
                    'label',
                    { htmlFor: 'inputPassword', className: 'control-label' },
                    this.props.visibleName
                )
            ),
            React.createElement(
                'div',
                { className: 'col-md-9' },
                React.createElement('textarea', { className: 'form-control vacancy-submit__info' })
            )
        );
    }
}

class ExpChange extends React.Component {
    render() {
        return React.createElement(
            'div',
            { className: 'container', style: containerStyle },
            React.createElement(MounthField, { visibleName: '\u041D\u0430\u0447\u0430\u043B\u043E \u0440\u0430\u0431\u043E\u0442\u044B' }),
            React.createElement(MounthField, { style: rowStyle, visibleName: '\u041E\u043A\u043E\u043D\u0447\u0430\u043D\u0438\u0435 \u0440\u0430\u0431\u043E\u0442\u044B' }),
            React.createElement(TextField, { style: rowStyle, visibleName: '\u041E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044F' }),
            React.createElement(TextField, { style: rowStyle, visibleName: '\u0414\u043E\u043B\u0436\u043D\u043E\u0441\u0442\u044C' }),
            React.createElement(MajorTextField, { style: rowStyle, visibleName: '\u041E\u0431\u044F\u0437\u0430\u043D\u043D\u043E\u0441\u0442\u0438, \u0444\u0443\u043D\u043A\u0446\u0438\u0438, \u0434\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u044F' })
        );
    }
}