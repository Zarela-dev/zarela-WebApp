import { getInput } from '.';
/**
 * transaction input type detector(covered or other types)
 */
export const isValidInput = (input) => {
	if (getInput(input) === 'OtherTypes') return false;
	else if (getInput(input) !== 'OtherTypes') return true;
};
