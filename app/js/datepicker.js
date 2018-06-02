$(function() {
	var $datepicker = $("#birthday");
	$datepicker.bootstrapMaterialDatePicker({
		format :'DD MMMM YYYY',
		weekStart : 0,
		time: false,
		lang : 'ru',
		cancelText: 'Отменить',
		okText: 'ОК'
	});
});
