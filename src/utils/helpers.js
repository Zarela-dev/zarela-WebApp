import { getInput } from '.';
/**
 * transaction input type detector(covered or other types)
 */
export const isValidInput = (input) => {
	if (getInput(input) === 'OtherTypes') return false;
	else if (getInput(input) !== 'OtherTypes') return true;
};


export const timeConverter = (UNIX_timestamp) => {
	var a = new Date(UNIX_timestamp);
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var year = a.getFullYear();
	var month = months[a.getMonth()];
	var date = a.getDate();
	var time = date + ' ' + month + ' ' + year;
	return time;
}