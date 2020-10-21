function myFunction() {

	var form = FormApp.openByUrl('https://docs.google.com/forms/d/14Lj0op63onxDYZ5TAhe4sY_9VeVeFzVzNTEpk7rndmw/edit'); // TODO add your form url
	var res_objs = form.getResponses();
	var items = form.getItems();
	// var possible_options = ['First','Second','Third','Fourth','Fifth','Sixth','Seventh','Eighth']
	var selected_positions = [];

	var options = []

	var item = items[1]
	Logger.log(item.getType());

	if (item.getType() == FormApp.ItemType.MULTIPLE_CHOICE){
		var question = item.asMultipleChoiceItem();
		Logger.log(question.getTitle());

		var choices = question.getChoices();
		choices.forEach(function(c){
			options.push(c.getValue());
		});
	}
	Logger.log("Options on form are:");
	Logger.log(options);

	Logger.log("Response Objects are:");
	Logger.log(res_objs);

	Logger.log("Last response object is:");
	var item_responses = res_objs[res_objs.length-1].getItemResponses()

	var sel_team = item_responses[0].getResponse();
	var sel_opt = item_responses[1].getResponse();

	selected_positions.push(sel_opt);

	var last_opt = selected_positions[selected_positions.length-1];
	options.splice(options.indexOf(last_opt),1);
	Logger.log("Last response was:");
	Logger.log(last_opt);

	form.deleteItem(item)

	var item = form.addMultipleChoiceItem();
	item.setTitle('Do you like hurting people?')
	item.setChoiceValues(options);

}