import {Action} from './action'
import {Board} from './board'

export class HistoryVar 
{
	action: Action
	board: Board
	constructor(action: Action, board: Board) 
	{
		this.action = action
		this.board = board
	}
}