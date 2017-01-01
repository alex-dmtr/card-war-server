import { Card } from './card'
import { BoardPosition } from './boardPosition'

export class Action 
{
	type: string
	player_id: number
	boardPosition: BoardPosition
	position: number
	card: Card

	constructor(type: string, player_id: number) 
	{
		this.type = type
		this.player_id = player_id
	}	
}