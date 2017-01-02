import { Player } from './player'
import { Card } from './card'
import { BoardPosition } from './boardPosition'

export class Action 
{
	type: string
	player: Player
	boardPosition: BoardPosition
	position: number
	card: Card

	constructor(type: string, player: Player) 
	{
		this.type = type
		this.player = player;
	}	
}